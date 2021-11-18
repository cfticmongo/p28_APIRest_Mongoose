const Article = require('../models/article');


const getArticles = async () => {
    try {
        const documents = await Article.find({});
        return {
            documents
        }
    } catch(err) {

    }
}

module.exports = {
    getArticles
}