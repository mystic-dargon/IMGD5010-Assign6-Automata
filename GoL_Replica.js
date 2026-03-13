/// REPLICA OF THE ORIGINAL GAME OF LIFE ///

//Create a 2D array initalized with 0s
function create2DArray(columns, rows) {
  let arr = new Array(columns);
  for (let i = 0; i < columns; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

//Size of the cells in pixels
let size = 10;
let canvasX = 700;
let canvasY = 300;

//Variables for creating & modifying the boardstate
let read, write;
let rows, columns;

function setup() {
  createCanvas(canvasX, canvasY);
  
  //Set the # of columns & rows to fill the canvas
  columns = width / size;
  rows = height / size;
  
  //Initalize the read and write arrays
  read = create2DArray(columns, rows);
  write = create2DArray(columns, rows);
  
  //Set the read array to a random inital boardstate, ignoring the edges
  for (let i = 1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      //Populate with 50/50 living and dead
      read[i][j] = round(random());
    }
  }
}

function draw() {
  background(220);
  
  //Draw the board
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      
      strokeWeight(1);
      stroke(0);
      
      //Set the color according to the value
      if (read[i][j] == 1){fill(0)}
      else{fill(255)}
      
      //Draw the square
      square(i * size, j * size, size);
    }
  }
  
  //Write the new board state based on the current state in read, ignoring the edges
  for (let i = 1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      let neighbors = 0;
      let self = read[i][j];
      
      //Add up the number of living neighbors
      for(let shiftA = -1; shiftA <= 1; shiftA++){
        for(let shiftB = -1; shiftB <= 1; shiftB++){
          neighbors += read[i+shiftA][j+shiftB];
        }
      }
      //Adjust for self
      neighbors -= self;
      
      //Death (loneliness or overpopulation)
      if(self == 1 && (neighbors >= 4 || neighbors <= 1)){write[i][j] = 0;}
      //Birth
      else if(self == 0 && neighbors == 3){write[i][j] = 1;}
      //Statis
      else{write[i][j] = self;}

    }
  }
  
  //Set the new board state to read
  let temp = read;
  read = write;
  write = temp;
}
