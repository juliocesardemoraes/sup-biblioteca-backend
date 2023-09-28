const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: 'é obrigatório',
        },
        synopsis: {
            type: Number,
            required: 'é obrigatório',
        },
        paginas: {
            type: Number,
            required: 'é obrigatório',
        },
        isbn: {
            type: String,
            required: 'é obrigatório',
        },
        editora: {
            type: String,
            required: 'é obrigatório',
        },
    },
    {
        timestamps: true
    }
);

const SchemaBook = mongoose.models.Livro || mongoose.model('Livro', schema);
module.exports = SchemaBook;