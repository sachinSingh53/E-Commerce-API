const db = require('../db');


module.exports.index = async(req,res)=>{
    try{
        const data = await db.query('SELECT * FROM categories');
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
        const {name,description} = req.body;
        const data = await db.query('INSERT INTO categories (name,description) VALUES ($1,$2) returning *',[name,description]);
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
        const category_id = req.params.id;
        const data = await db.query('SELECT * FROM categories WHERE category_id = $1 ',[category_id]);
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
        const {name,description} = req.body;
        const category_id = req.params.id;
        const data = await db.query('UPDATE categories SET name = $1, description = $2 WHERE category_id = $3 returning *',[name,description,category_id]);
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
        const {name,description} = req.body;
        const category_id = req.params.id;
        const data = await db.query('DELETE FROM categories WHERE category_id = $1',[category_id]);
        res.status(200).json({
            status:'success',
        })

    }catch(err){
        res.status(400).json({
            status:'fail',
            error:err.message
        })
    }
}