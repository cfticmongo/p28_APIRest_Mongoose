const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    brand: String,
    model: String,
    description: String,
    colors: Array,
    sizes: Array,
    price: Number,
    currentPrice: Number,
    tags: Array,
    gender: Array,
    pic: String
}, {versionKey: false})

module.exports = mongoose.model('Article', ArticleSchema);

