const db = require('../db');


module.exports.index = async(req,res)=>{
    try{
        const data = await db.query('SELECT * FROM products');
        res.status(200).json({
            status:'success',
            length:data.rows.length,
            data: data.rows
        })

    }catch(err){
        res.status(400).json({
            status:'fail',
            error:err.message
        })
    } 
}
module.exports.create = async(req,res)=>{
    try{
        const {name,description,price,availability} = req.body;
        const category_id = req.params.id;
        const data = await db.query('INSERT INTO products (name,description,price,availability,category_id) VALUES ($1,$2,$3,$4,$5) returning *',[
            name,
            description,
            price,
            availability,
            category_id
        ]);
        res.status(200).json({
            status:'success',
            length:data.rows.length,
            data: data.rows[0]
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            error:err.message
        })
    }
}
module.exports.read = async(req,res)=>{
    try{
        const product_id = req.params.prod_id;
        const data = await db.query('SELECT * FROM products WHERE product_id = $1',[
            product_id
        ]);
        res.status(200).json({
            status:'success',
            length:data.rows.length,
            data: data.rows[0]
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            error:err.message
        })
    }
}
module.exports.update = async(req,res)=>{
    try{
        const {name,description,price,availability} = req.body;
        const category_id = req.params.id;
        const product_id = req.params.prod_id;
        const data = await db.query('UPDATE products SET name = $1, description = $2, price = $3, availability = $4, category_id = $5 WHERE product_id = $6 returning *',[
            name,
            description,
            price,
            availability,
            category_id,
            product_id
        ]);
        res.status(200).json({
            status:'success',
            length:data.rows.length,
            data: data.rows[0]
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            error:err.message
        })
    }
}
module.exports.delete = async(req,res)=>{
    try{
        const product_id = req.params.prod_id;
        const data = await db.query('DELETE FROM products WHERE product_id = $1 returning *',[
            product_id
        ]);
        res.status(200).json({
            status:'success',
            length:data.rows.length,
            data: data.rows[0]
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            error:err.message
        })
    }
}


