const express = require('express');  
const { body, param } = require('express-validator');  
const {  
    getAllAuthors,  
    createAuthor,  
    updateAuthor,  
    deleteAuthor  
} = require('../controllers/authorController');  

const router = express.Router();  

// Obtener todos los autores  
router.get('/', getAllAuthors);  

// Crear un nuevo autor  
router.post('/',   
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),  
    body('quote').isLength({ min: 3 }).withMessage('Quote must be at least 3 characters long'),  
    createAuthor  
);  

// Actualizar autor por ID  
router.put('/:id',  
    param('id').isMongoId().withMessage('Invalid author ID'),  // Validar que el ID es un ID de MongoDB  
    body('name').optional().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),  
    body('quote').optional().isLength({ min: 3 }).withMessage('Quote must be at least 3 characters long'),  
    updateAuthor  
);  

// Eliminar autor por ID  
router.delete('/:id',  
    param('id').isMongoId().withMessage('Invalid author ID'),  // Validar que el ID es un ID de MongoDB  
    deleteAuthor  
);  

module.exports = router;