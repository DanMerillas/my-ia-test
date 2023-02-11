import React from "react";
import './App.css';

export default function LoadingSpinner() {
    return (
        <>

            <div className="spinner-container text-center">
                <div className="loading-spinner" style={{marginLeft:'44%', marginTop:'100px'}}>

                </div>

            </div>
            <p className="mt-3" style={{marginLeft:'42%'}}>
                Cargando...
            </p>
        </>
    );
}