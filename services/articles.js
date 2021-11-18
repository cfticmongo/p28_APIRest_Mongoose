const Article = require('../models/article');


const getArticles = async () => {
    try {
        const documents = await Article.find({});
        return {
            documents
        }
    } catch(err) {
        if(err) {
            throw new ErrorHandler(500, 'Database server error')
        }
    }
}

const searchArticles = async (brands, gender, tags) => {
    try {
        const brandsQuery = brands === 'todos' ? /./ : JSON.parse(brands); // Si llega 'todos' sustituimos por regex de todos los valores
        const genderQuery = gender === 'todos' ? /./ : gender;
        const tagsQuery = tags === 'todos' ? /./ : JSON.parse(tags);
        const documents = await Article.find({
                                            $and: [
                                                {brand: {$in: brandsQuery}}, // Devuelve los docs que en brand tengan alguno de los valores del array
                                                {gender: genderQuery}, // En este caso genderQuery solo tiene un valor y no hace falta operador
                                                {tags: {$in: tagsQuery}}
                                            ]
                                        });
        return {
            documents
        }
    } catch(err) {
        if(err) {
            throw new ErrorHandler(500, 'Database server error')
        }
    }
}

module.exports = {
    getArticles,
    searchArticles
}