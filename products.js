const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    created: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Product', ProductSchema);