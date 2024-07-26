import React from 'react';  
import {  Routes, Route, BrowserRouter, Link } from 'react-router-dom';  
import AuthorList from './Componentes/AuthorList';  
import AddAuthor from './Componentes/AddAuthor';  
import EditAuthor from './Componentes/EditAuthor';  

function App() {  
    return (  
        <BrowserRouter> 
         <nav>  
                <ul>  
                    <li>  
                        <Link to="/">Inicio</Link>  
                    </li>  
                    <li>  
                        <Link to="/add">Agregar Autor</Link>  
                    </li>  
                </ul>  
            </nav> 
            <Routes>
                <Route path="/" element={<AuthorList/>} />  
                <Route path="/add" element={<AddAuthor/>} />  
                <Route path="/edit/:id" element={<EditAuthor/>} />  
             </Routes>
        </BrowserRouter>  
    );  
}  

export default App;