import React, { useEffect, useState } from 'react';
import '../Styles/Battleships.css';
import { initialGrid, orientation, ships } from '../Utils/setup';
import { GridCell } from './GridCell';
import { isShipPlaceable, getRandomIndexAndDirection } from '../Utils/Repository/battleship';
import { Legend } from './Legend';
import { Message } from './Message';
import { Button } from './Button';

export const Battleships = () => {

    const [board, setBoard] = useState(initialGrid);
    const [shipsLocation, setShipsLocation ] = useState({});
    const [sinkLocations, setSinkLocation] = useState({});

    useEffect(() => {

      for(let i=0 ; i < ships.length; i++)
      {    
        spreadShip(ships[i]);
      }
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    // Get the random index to spread the ship either horizontally or vertically. 
    // If slot is free and non overlapping, proceed with the rest of the logic to store in shipLocations and sinkLocations array
    // Used functions are in battleship.js 
    const spreadShip = (ship) => {

      let {rowIndex, columnIndex, direction} = getRandomIndexAndDirection(board, orientation);
      let newBoard = [...board];
  
      let shipId = ship.id;

      try
      {
        if(isShipPlaceable(board, ship, rowIndex, columnIndex, orientation[direction]))
        {
          let coordinates = [];

          for (let i = 0; i < ship.shipLength; i++) {
            if (orientation[direction] === 'horizontal') {
              newBoard[rowIndex][columnIndex + i] = shipId;
              coordinates.push(`${rowIndex}${columnIndex + i}`);
            } else if (orientation[direction] === 'vertical') {
              newBoard[rowIndex + i][columnIndex] = shipId;
              coordinates.push(`${rowIndex + i}${columnIndex}`);
            }
          }
    
          setShipsLocation((prevShipsLocation) => ({
            ...prevShipsLocation,
            [shipId]: [...(prevShipsLocation[shipId] || []), ...coordinates]
          }));

          setSinkLocation((prevSinkLocation) => ({
            ...prevSinkLocation,
            [shipId]: [...(prevSinkLocation[shipId] || []), ...coordinates]
          }));

          setBoard(newBoard);
        }
        else
        {
          spreadShip(ship);
        }
      }catch(e)
      {
        console.log(e.message);
      }
    };

    // 0 => Free slot, -1 => miss, 10 => Hit, 11 => Sink the following coordinates
    const handleClick = (item, outerIndex, index) => {
      const newBoard = [...board];
      const boardIndex = `${outerIndex}${index}`;

      if(board[outerIndex][index] === 0)
      {
        newBoard[outerIndex][index] = -1;
      }
      else
      {
        let updatedShipsLocation = [...shipsLocation[item]].filter(shipIndex => shipIndex !== boardIndex);
        
        if(updatedShipsLocation.length > 0 )
        {
          newBoard[outerIndex][index] = 10;
        }
        else
        {
          for (let shipIndex of sinkLocations[item])
          {
            newBoard[shipIndex[0]][shipIndex[1]] = 11;
          }
        }  
        setShipsLocation(prevState => ({...prevState, [item]: updatedShipsLocation }));
      }

      setBoard(newBoard); 
    }

    return (
      <>
      <div className="grid-row">
        {Array.from({length:10}).map((_, index) => (
          <div key={index}>{String.fromCharCode(65 + index)}</div>
        ))}
     </div>

      <div className="grid-container">
        {board.map((row, outerIndex ) => (
            row.map((item , index) => (
             item === -1 ? (
             <GridCell isDisabled={true} key={index}/>
            ): item === 10 || item === 11 ? <GridCell isDisabled={true} item={item} key={index}/>:
             <GridCell isDisabled={false} key={index} item={item} onClickHandler={() => handleClick(item, outerIndex, index)} />
            ))
          ))
        }
      </div>

      <div className="grid-column">
        {Array.from({length:10}).map((_, index) => (
          <div key={index}>{index + 1}</div>
        ))}
      </div>
      
      <Legend />
      <Button />
      {Object.values(shipsLocation).every(shipIndex => shipIndex.every(item => item.length === 0)) && <Message  />}
      </>
    );
  };
