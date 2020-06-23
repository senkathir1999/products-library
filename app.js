const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://test:productdb@cluster0-zdr3w.mongodb.net/test?retries=false', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const product = require('./products')

app.get('/products', function (req, res) {
    product.find(function (err, data) {
        if (err)
            return res.status(500).send(err)
        res.send(data)
    })
})

app.post('/product', function (req, res) {
    if (!req.body)
        return res.status(500).send("Input not provided")
    input = req.body
    product.findOne({ id: input.id }, function (err, data) {
        if (err)
            return res.status(500).send("Product not created .Error - " + err)
        if (data)
            return res.status(500).send("Product already exist.")
        new product(input).save(function (err, data) {
            if (err)
                return res.status(500).send("Product not created .Error - " + err)
            res.send("Product created successfully")
        })
    })
})


app.put('/product/:id', function (req, res) {
    if (!req.params.id)
        return res.status(500).send("Id not specified")
    id = req.params.id
    input = req.body
    product.findOneAndUpdate({ id: id }, input, function (err, data) {
        if (err)
            return res.status(500).send("Unable to update")
        if (data)
            res.send("Updated successfully")
        else
            res.status(500).send("Product not found")
    })
})

app.delete('/product/:id', function (req, res) {
    if (!req.params.id)
        return res.status(500).send("Id not specified")
    product.findOneAndDelete({ id: req.params.id }, function (err, data) {
        if (err)
            return res.status(500).send("Not able to delete")
        if(data)
            return res.send("Deleted successfully")
        else
            res.status(500).send("Product not found")
    })
})

app.listen(process.env.PORT || 8000, function () {
    console.log("App started")
})