const db = require('../db');

module.exports.index = (req,res)=>{
    try{

        let cart = req.session.cart || [];

        res.status(200).json({
            status:'success',
            length:cart.length,
            data: cart
        })

    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

module.exports.add =  (req, res) => {
    try {
        
        let cart = req.session.cart || [];
        const { prod_id } = req.params;
        const quantity = Number(req.body.qty);

        const existingItemIndex = cart.findIndex(item => item.prod_id === prod_id);
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ prod_id, quantity });
        }
        req.session.cart = cart;

        res.status(200).json({
            status:'added successfully'
        })

    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

module.exports.remove = (req,res)=>{
    try{
        let cart = req.session.cart || [];
        const prod_id = req.params.prod_id
        cart = cart.filter(item => item.prod_id !== prod_id);
        req.session.cart = cart;
        res.status(200).json({
            status:'success',
            message:'removed from cart'
        })

    }catch (err) {
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}
