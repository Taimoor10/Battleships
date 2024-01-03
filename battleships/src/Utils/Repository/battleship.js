export const getRandomIndexAndDirection = (board, orientation) => {

    let rowIndex, columnIndex;
    
    do {
        rowIndex = Math.floor(Math.random() * board.length);
        columnIndex = Math.floor(Math.random() * board[0].length);
    } while (board[rowIndex][columnIndex] !== 0);

    const direction = Math.floor(Math.random() * orientation.length);
    return { rowIndex, columnIndex, direction };
}

export const checkGridBounds = (indexToCheck) => {
    if(!(indexToCheck >= 0 && indexToCheck < 10)) {
        
        return false;
      }
    return true;
}

export const isShipPlaceable = (board,ship, rowIndex, columnIndex, direction) => {
        
    if(direction === 'horizontal')
    {
      for(let i=1; i < ship.shipLength; i++)
      {
        
        if(!checkGridBounds(columnIndex + i) || board[rowIndex][columnIndex + i] !== 0)
          return false;
      }
    }
    else if(direction === 'vertical')
    {
      for(let i=1; i < ship.shipLength; i++)
      {
        
        if(!checkGridBounds(rowIndex + i) || board[rowIndex + i][columnIndex] !== 0)
          return false;
      }
    }
  
  return true;
}