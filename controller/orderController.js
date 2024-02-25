const db = require('../db');

module.exports.checkout = async(req,res)=>{
    try{
        const cart = req.session.cart || [];
        if(!cart.length) throw new Error('cart is empty');
        const user_id = req.session.user_id;
        let grandTotal = 0;
        const {address} = req.body;

        for(item of cart){
            grandTotal+=item.price;
            await db.query('INSERT INTO orders (product_id,quantity,price,address,user_id) VALUES($1,$2,$3,$4,$5)',[
                item.prod_id,
                item.quantity,
                item.price,
                address,
                req.session.user_id
            ]);
        }

        req.session.cart=[];


        res.status(200).json({
            status:'success',
            message:`ordered placed successfully, your grandTotal is Rs ${grandTotal}`
        })
        

    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

module.exports.history = async(req,res)=>{
    try{
        const user_id = req.session.user_id;
        const data = await db.query('SELECT * FROM orders WHERE user_id = $1',[
            user_id
        ])
        res.status(200).json({
            status:'success',
            length:data.rowCount,
            data:data.rows
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

module.exports.detail = async(req,res)=>{
    try{
        const order_id = req.params.order_id;
        const user_id = req.session.user_id;
        const data = await db.query('SELECT * FROM orders WHERE order_id = $1 AND user_id = $2',[
            order_id,
            user_id
        ])

        res.status(200).json({
            status:'success',
            length:data.rowCount,
            data:data.rows
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}