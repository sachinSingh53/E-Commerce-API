require('dotenv').config();
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const categoriesRoutes = require('./routes/categoriesRoutes');
const productsRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');



const app = express();
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));



app.use(session({
  secret: 'thisismysecret',
  resave: false,
  saveUninitialized: true
}));





app.get('/createTables',async(req,res)=>{
  try{
    await db.createTables();
    res.status(200).json({
      stauts:'Tables created successfully'
    })

  }catch(err){
    res.status(400).json({
      status:'fail',
      message:err.message
    })
  }
});

app.use('/api/v1/categories',categoriesRoutes);
app.use('/api/v1/categories/:id/products',productsRoutes);
app.use('/api/v1/categories/:id/products/:prod_id/cart',cartRoutes);
app.use('/api/v1/auth',userRoutes);



app.use('*', (req, res) => {
    res.status(404); 
    res.json({
      message:"Page not found"
    });
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listning on port ${PORT}`);
})