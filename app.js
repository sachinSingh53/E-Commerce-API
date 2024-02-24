require('dotenv').config();
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const categoriesRoutes = require('./routes/categoriesRoutes');
const productsRoutes = require('./routes/productsRoutes');


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))





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