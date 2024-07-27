import React, { useState } from 'react';  
import axios from 'axios';  
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

const AddAuthor = () => {  
    const [name, setName] = useState('');  
    const [quote, setQuote] = useState('');  
    const [error, setError] = useState('');  
    const [success, setSuccess] = useState(''); // Para mostrar el mensaje de éxito  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        setError('');  
        setSuccess(''); // Reiniciar mensaje de éxito  

        // Validación de campos  
        if (!name || !quote) {  
            setError('Por favor, llena todos los campos.');  
            return;  
        }  

        try {  
            await axios.post('http://localhost:5000/api/authors', { name, quote });  
            setSuccess('Autor agregado con éxito!'); // Mensaje de éxito  
            setName(''); // Limpiar campo  
            setQuote(''); // Limpiar campo  
        } catch (err) {  
            const serverErrors = err.response?.data?.errors || [];  
            const errorMessage = serverErrors.length > 0   
                ? serverErrors.map(err => err.msg).join(', ')   
                : 'Error al agregar el autor.';  
            setError(errorMessage);  
        }  
    };  

    return (  
        <form onSubmit={handleSubmit}>  
            <h1>Add Author</h1>  
            <ErrorMessage message={error}/>
            <SuccessMessage message={success}/>
            <input   
                type="text"   
                value={name}   
                onChange={e => setName(e.target.value)}   
                placeholder="Author Name"   
            />  
            <input   
                type="text"   
                value={quote}   
                onChange={e => setQuote(e.target.value)}   
                placeholder="Author Quote"   
            />  
            <button type="submit">Add Author</button>  
        </form>  
    );  
};  

export default AddAuthor;