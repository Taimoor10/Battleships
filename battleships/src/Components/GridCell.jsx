import React from 'react';
import '../Styles/Battleships.css';

export const GridCell = ({isDisabled, item, onClickHandler}) => {
  return (
    isDisabled ? 
    <div className = "box" style={item === 10 ? {backgroundColor: 'orange', pointerEvents: 'none', opacity:0.8}:
      item === 11 ? {backgroundColor: 'purple', pointerEvents: 'none', opacity:0.8}:
      {pointerEvents: 'none', opacity:0.7}}></div>:
    <div className="box" onClick={onClickHandler}></div>
  )
}
