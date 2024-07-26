import React from 'react';  

// Componente para mostrar mensajes de error  
const ErrorMessage = ({ message }) => {  
    if (!message) return null; // No mostrar nada si no hay mensaje  

    return (  
        <div style={{  
            color: 'red',   
            border: '1px solid red',   
            borderRadius: '5px',   
            padding: '10px',   
            backgroundColor: '#ffe6e6'  
        }}>  
            {message}  
        </div>  
    );  
};  

export default ErrorMessage;