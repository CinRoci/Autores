import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import { useParams, useNavigate } from 'react-router-dom';  
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

const EditAuthor = () => {  
    const { id } = useParams();  
    const navigate = useNavigate();  
    const [author, setAuthor] = useState({ name: '', quote: '' });  
    const [error, setError] = useState('');  
    const [success, setSuccess]= useState('');
    const [loading, setLoading] = useState(true);  
    const [updating, setUpdating] = useState(false);  

    useEffect(() => {  
        const fetchAuthor = async () => {  
            try {  
                const response = await axios.get(`http://localhost:5000/api/authors/${id}`);  
                setAuthor(response.data);  
            } catch (err) {  
                setError("Sorry, but we couldn't find the author you're looking for. Would you like to add this author to our database?");  
            } finally {  
                setLoading(false);  
            }  
        };  

        fetchAuthor();  
    }, [id]);  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        setError('');  
        setUpdating(true);
      

        try {  
            await axios.put(`http://localhost:5000/api/authors/${id}`, author);  
            // Agregar mensaje de éxito o redirigir  
            alert('Author updated successfully.');  
            navigate.push('/authors'); // Redirigir a la lista de autores  
        } catch (err) {  
            setError(err.response.data.errors.map(err => err.msg).join(', '));  
        } finally {  
            setUpdating(false);   
        }  
    };  

    if (loading) {  
        return <div>Loading author...</div>;  
    }  

    return (  
        <form onSubmit={handleSubmit}>  
            <h1>Edit Author</h1>  
            <ErrorMessage message={error}/>
            <SuccessMessage message={success}/>
            <input  
                type="text"  
                value={author.name}  
                onChange={e => setAuthor({ ...author, name: e.target.value })}  
                placeholder="Author Name"  
                required  
            />  
            <input  
                type="text"  
                value={author.quote}  
                onChange={e => setAuthor({ ...author, quote: e.target.value })}  
                placeholder="Author Quote"  
                required  
            />  
            <button type="submit" disabled={updating}>  
                {updating ? 'Updating...' : 'Update Author'}  
            </button>  
        </form>  
    );  
};  

export default EditAuthor;