import React from 'react';
import "../Styles/Button.css";

export const Button = () => {
  return (
    <div>
       <button className="button" onClick={() => window.location.reload()}> New Game</button>
    </div>
  )
}
