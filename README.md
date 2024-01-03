# Battleship Task

A simple Battleship game against a computer opponent

## Dependencies

Run `npm install` to install dependencies


Clone the project. In the project directory battleships, you can run he following command to run the application:

### `npm start`

# Thought Process and Implementation details

1) Since the ships have to be stored in 10x10 grid, The data structure chosen for this is a 2D array.
   
2) The setup of grid and ships are stored in file `setup.js` inside Utils folder.
   
3) Inside Utils, there is a repository folder which contains `battleship.js`. This file includes helper functions.

4) 0 in the array means that the index is available and not been hit yet and ships can be placed here.
   
5) The isShipPlaceable function in [battleship.js](src/Utils/Repository/battleship.js) checks for grid bounds and      
   overlapping logic. If the grid value is not 0 then this means that index is occupied. So then call the random function
   again to find new free indexes. Keep repeating the process until a placeable index is found. Therefore the ships placement in `Battleship.jsx` uses recursion.

6) This implementation makes use of Randomness and Recursion to find the index, that is free and not occupied by 
   any other ship.

7) For hit miss and sink logic, I decided to create a separate object that will keep track of indexes occupied by ships.
   There is also a copy of that object to check the length. This object will update when a hit occurs. And when the length
   of shipsLocation array in object is 0, then this means that all indexes of a particular ship has been hit and thus sink the ship. Later on, those stored indexes in original object are then used to sink the ship. For sinking, the grid cells at those indexes will have purple color. Thats how a user can know that a ship has been sunk. The the original board is also used to check for hit and miss logic. If the index is not 0 then this means that it can have either -1 for miss,
   10 for a hit and 11 for sink. These values are helpful in visual representation of the grid.
   
8) When all shipLocation indexes are hit, the original object will have no stored indexes, This means that the game is over.

# Improvements

1) Right now, I think that the randomness is enough for a simple implementation. But the randomness logic can be improved.
   Instead of recursion, I can also check the board and find the next free slot. This strategy also has its pro and cons as
   I would need to keep checking the board either vertically or horizontally until a placeable index is found. This might be better in performance as compared to recursion but I think that the placement of ships can then be predictable and narrower. However, this could be considered as an alternate strategy.

2) Right now all ships show purple on sink, So it is possible, that the user might not be able to tell which ship is left and 
   which one is sunk. I believe for simplicity purpose and to get the idea across, using one color is enough.