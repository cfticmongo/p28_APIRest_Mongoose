const express = require('express');
const { getArticles } = require('../services/articles');
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


module.exports = app;