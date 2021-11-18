const express = require('express');
const { getArticles, searchArticles } = require('../services/articles');
const app = express();



app.get('/', async (req, res, next) => {
    try {
        const {documents} = await getArticles();
        res.status(200).json({
            articles: documents
        })
    } catch(err) {
        return next(err);
    }
})

app.get('/filter/:brands/:gender/:tags', async (req, res, next) => {
    try {
        const {documents} = await searchArticles(req.params.brands,req.params.gender,req.params.tags);
        res.status(200).json({
            articles: documents
        })
    } catch(err) {
        return next(err);
    }
})


module.exports = app;