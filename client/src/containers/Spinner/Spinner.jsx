import React from 'react';
import spinner from './Spinner.gif';

const spinnerContainer = {width:"80vw", height:"70vh", padding:"5em",margin:"5em auto"} 

const spinnerImg = {margin:"2em auto"}

function Spinner() {
    return (
        <div style={spinnerContainer}>
            <img style={spinnerImg} src={spinner} />
        </div>
    )
}

export default Spinner
