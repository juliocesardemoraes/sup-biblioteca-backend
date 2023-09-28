const express = require('express');
const router = express.Router();
const conectarBancoDados = require('../middlewares/conectDB');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const SchemaBook = require('../models/book');

router.post('/criar', conectarBancoDados, async function(req, res, next) {
    try{
        // #swagger.tags = ['Book']
        let {titulo, paginas, isbn, editora} = req.body;
        const respostaBD = await SchemaBook.create({titulo, paginas, isbn, editora});

        res.status(200).json({
            status: "OK",
            statusMensagem: "Livro criado com sucesso.",
            resposta: respostaBD
        });
    }catch(error){
        return tratarErrosEsperados(res, error);
    }
});

router.put('/editar/:id', conectarBancoDados, async function(req, res, next) {
    try{
        // #swagger.tags = ['Book']
        let idLivro = req.params.id;
        let {titulo, paginas, isbn, editora} = req.body;
        const checkLivro = await SchemaBook.findOne({ _id: idLivro});
        if(!checkLivro) {
            throw new Error("Livro não encontrado.");
        }

        const livroAtualizado = await SchemaBook.updateOne({_id: idLivro}, {titulo, paginas, isbn, editora});

        if(livroAtualizado.modifiedCount > 0){
            const dadosTarefa = await SchemaBook.findOne({_id: idLivro});
            
            res.status(200).json({
                status: "OK",
                statusMensagem: "Livro atualizado com sucesso.",
                resposta: dadosTarefa
            });
        }
    }catch(error){
        return tratarErrosEsperados(res, error);
    }
});

router.get('/obter-livros', conectarBancoDados, async function(req, res, next) {
    try{
        // #swagger.tags = ['Book']
        const respostaBD = await SchemaBook.find();

        res.status(200).json({
            status: "OK",
            statusMensagem: "Livros listados na resposta com sucesso.",
            resposta: respostaBD
        });
    }catch(error){
        return tratarErrosEsperados(res, error);
    }
});

// Campo de Busca

// router.get('/obter-livro/:id', conectarBancoDados, async function(req, res, next) {
//     try{
//         // #swagger.tags = [Book']
//         let idLivro = req.params.id;

//         const checkLivro = await SchemaBook.findOne({ _id: idLivro});
//         if(!checkLivro) {
//             throw new Error("Livro não encontrado.");
//         }

//         const respostaBD = await SchemaBook.findOne({ _id: idLivro});

//         res.status(200).json({
//             status: "OK",
//             statusMensagem: "Livro listado na resposta com sucesso.",
//             resposta: respostaBD
//         });
//     }catch(error){
//         return tratarErrosEsperados(res, error);
//     }
// });

router.delete('/deletar/:id', conectarBancoDados, async function(req, res, next) {
    try{
        // #swagger.tags = ['Book']
        let idLivro = req.params.id;

        const checkLivro = await SchemaBook.findOne({ _id: idLivro});
        if(!checkLivro) {
            throw new Error("Livro não encontrado.");
        }

        const respostaBD = await SchemaBook.deleteOne({ _id: idLivro});

        res.status(200).json({
            status: "OK",
            statusMensagem: "Livro excluído com sucesso.",
            resposta: respostaBD
        });
    }catch(error){
        return tratarErrosEsperados(res, error);
    }
});

module.exports = router;