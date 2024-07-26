import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import { Link } from 'react-router-dom'; 
import ErrorMessage from './ErrorMessage';

const AuthorList = () => {  
    const [authors, setAuthors] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState('');  

    useEffect(() => {  
        const fetchAuthors = async () => {  
            try {  
                const response = await axios.get('http://localhost:5000/api/authors');  
                setAuthors(response.data);  
            } catch (err) {  
                setError('Error fetching authors. Please try again later.');  
            } finally {  
                setLoading(false);  
            }  
        };  
        fetchAuthors();  
    }, []);  

    const handleDelete = async (id) => {  
        if (window.confirm('Are you sure you want to delete this author?')) {  
            try {  
                await axios.delete(`http://localhost:5000/api/authors/${id}`);  
                setAuthors(authors.filter(author => author._id !== id));  
            } catch (err) {  
                setError('Failed to delete the author. Please try again.');  
            }  
        }  
    };  

    if (loading) {  
        return <div>Loading authors...</div>;  
    }  

    return (  
        <div>  
            <h1>Authors</h1>  
            <ErrorMessage message={error}/>
            <Link to="/add">Add Author</Link>  
            {authors.length === 0 ? (  
                <p>No authors found.</p>  
            ) : (  
                <ul>  
                    {authors.map(author => (  
                        <li key={author._id}>  
                            {author.name} - "{author.quote}"  
                            <Link to={`/edit/${author._id}`}>Edit</Link>  
                            <button onClick={() => handleDelete(author._id)}>Delete</button>  
                        </li>  
                    ))}  
                </ul>  
            )}  
        </div>  
    );  
};  

export default AuthorList;