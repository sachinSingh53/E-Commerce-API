const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const maxAge = 3 * 24 * 60 * 60;
// here id is a payload 
const createToken = (id) => {
    return jwt.sign({ id }, 'my_secret', {
        expiresIn: maxAge
    });
}




module.exports.register = async (req, res) => {
    try {
        let { username, password, email, full_name } = req.body;
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        const user = await db.query('INSERT INTO users (username,password,email,full_name) VALUES ($1,$2,$3, $4) returning *', [
            username,
            password,
            email,
            full_name
        ]);
        const token = createToken(user.rows[0].id);
        //the httpOnly is used so that the cookie can only be modify by http requests
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }).status(200).json({
            status: 'success',
            message:'Registered Successfully'
        });

    } catch (err) {
        res.status(400).json({
            message: 'fail',
            error: err.message
        })
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db.query('SELECT * from users WHERE email = $1',[
            email
        ])

        // res.json(user);

        if (user.rows.length>0){
            const auth = await bcrypt.compare(password, user.rows[0].password);
            if (auth) {
                const token = createToken(user.rows[0].id);
                return res.cookie('jwt',token,{ httpOnly: true,maxAge:maxAge*1000}).status(200).json({
                    status:'success',
                    message:'Login Sussessfully'
                })
            }
            throw Error('incorrect email or password');
        }
        else{
            throw Error('incorrect email or password');
        }
        


    } catch (err) {
        res.status(400).json({
            message: 'fail',
            error: err.message
        })
    }

}

module.exports.logout = async (req, res) => {
    try{
        res.cookie('jwt','',{maxAge:1}).status(200).json({
            message:'goodbye'
        })
    }
    catch(err){
        res.status(400).json({
            message:'fail',
            error:err.message
        })
    }
} 