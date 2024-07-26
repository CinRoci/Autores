import React from 'react';  

// Componente para mostrar mensajes de éxito  
const SuccessMessage = ({ message }) => {  
    if (!message) return null; // No mostrar nada si no hay mensaje  

    return (  
        <div style={{  
            color: 'green',   
            border: '1px solid green',   
            borderRadius: '5px',   
            padding: '10px',   
            backgroundColor: '#e6ffe6'  
        }}>  
            {message}  
        </div>  
    );  
};  

export default SuccessMessage;