function routes(app) {
    app.use('/livro', require('./routes/book.js'));
    return;
}

module.exports = routes;