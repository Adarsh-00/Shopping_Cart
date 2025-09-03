const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = 8080;

mongoose.connect('mongodb://127.0.0.1:27017/ShoppingCart')
    .then(()=>console.log("Connection Successful"))
    .catch((err)=>console.error(err.message));

//Product Schema
const Product = mongoose.model('product',{
    name: {type: String, required: true},
    description: String,
    price: {type: Number, required: true}
});


app.get('/items', async (req, res) => {
    try {
        const items = await Product.find();
        if(items.length > 0){
            res.status(200).send(items);
        } else {
            res.json({message: "No items Available"});
        }
    } catch (error) {
        res.status(500).send({message: 'Something went wrong', details: error.message});
    }
});

app.post('/items', async (req, res) => {
    try {
        const item = new Product(req.body);
        const createdItem = await item.save();
        res.status(201).send(createdItem);
    } catch (error) {
        res.status(500).send({message: 'Something went wrong', details: error.message});
    }
});

app.put('/item-update/:id', async (req, res) => {
    try {
        const updatedItem = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updatedItem) {
            return res.status(404).json({message: 'Item not found'});
        }
        res.status(200).send(updatedItem);
    } catch (error) {
        res.status(500).send({message: 'Something went wrong', details: error.message});
    }
});

app.delete('/item-remove/:id', async (req, res) => {
    try {
        const deleteItem = await Product.findByIdAndDelete(req.params.id);
        if(!deleteItem){
            return res.status(404).json({message: "Item not found"});
        }
        res.status(200).send('item deleted');
    } catch (error) {
        res.status(500).send({message: 'Something went wrong', details: error.message});
    }
});

app.listen(PORT, ()=>{console.log(`live at http://localhost:${PORT}`)});
