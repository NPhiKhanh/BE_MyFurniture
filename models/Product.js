const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    populate: { type: Boolean, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema);