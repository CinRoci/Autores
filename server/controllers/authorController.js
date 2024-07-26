const Author = require('../models/Author');  
const { validationResult } = require('express-validator');  

exports.getAllAuthors = async (req, res) => {  
    try {  
        const authors = await Author.find().sort({ name: 1 });  
        res.json(authors);  
    } catch (error) {  
        res.status(500).send('Server error');  
    }  
};  

exports.createAuthor = async (req, res) => {  
    const errors = validationResult(req);  
    if (!errors.isEmpty()) {  
        return res.status(400).json({ errors: errors.array() });  
    }  

    const { name, quote } = req.body;  
    try {  
        const newAuthor = new Author({ name, quote });  
        await newAuthor.save();  
        res.status(201).json(newAuthor);  
    } catch (error) {  
        res.status(500).send('Server error');  
    }  
};  

exports.updateAuthor = async (req, res) => {  
    const errors = validationResult(req);  
    if (!errors.isEmpty()) {  
        return res.status(400).json({ errors: errors.array() });  
    }  

    const { id } = req.params;  
    const { name, quote } = req.body;  

    try {  
        const author = await Author.findByIdAndUpdate(  
            id,  
            { name, quote },  
            { new: true, runValidators: true }  // Devuelve el autor actualizado y corre las validaciones  
        );  

        if (!author) {  
            return res.status(404).json({ msg: 'Author not found' });  
        }  

        res.json(author);  
    } catch (error) {  
        res.status(500).send('Server error');  
    }  
};  

exports.deleteAuthor = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const author = await Author.findByIdAndRemove(id);  

        if (!author) {  
            return res.status(404).json({ msg: 'Author not found' });  
        }  

        res.json({ msg: 'Author removed', author });  
    } catch (error) {  
        res.status(500).send('Server error');  
    }  
};