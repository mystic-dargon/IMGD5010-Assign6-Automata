/// VARIATION ON THE GAME OF LIFE: PROBABILISTIC SLIMEMOLD ///

class Cell {
  //Agent initalization
  constructor(init) {
    //Randomly set inital state
    this.state = init;
    //Number of consecutive generations lived or dead
    this.age = 0;
  }
  
}

//Create a 2D array initalized with Cells with state 0
function create2DArray(columns, rows) {
  let arr = new Array(columns);
  for (let i = 0; i < columns; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = new Cell(0);
    }
  }
  return arr;
}

//Size of the cells in pixels
let size = 10;
let canvasX = 700;
let canvasY = 700;

//Variables for creating & modifying the boardstate
let read, write;
let rows, columns;
let time = 0;

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
      //Initalize to approx. 50/50 alive and dead
      read[i][j] = new Cell(round(random()));
    }
  }
}

function draw() {
  randomSeed(time);
  background(220);
  
  //Draw the board
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      
      strokeWeight(1);
      stroke(0);
      
      //Set the color according to the state & age of the cell
      if (read[i][j].state == 1){
        colorMode(HSL);
        fill(constrain(0+(4*read[i][j].age),0,40),100,50);
      }
      else{
        colorMode(HSL);
        fill(210,100,constrain(70+(5*read[i][j].age),70,100));
      }
      
      //Draw the square
      square(i * size, j * size, size);
    }
  }
  
  //Write the new board state based on the current state in read, ignoring the edges
  for (let i = 1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      let neighbors = 0;
      let self = read[i][j].state;
      
      //Add up the number of living neighbors
      for(let shiftA = -1; shiftA <= 1; shiftA++){
        for(let shiftB = -1; shiftB <= 1; shiftB++){
          neighbors += read[i+shiftA][j+shiftB].state;
        }
      }
      //Adjust for self
      neighbors -= self;
      
      //Death (Loneliness)
      if(self == 1 && neighbors <= 1){
        //Has a baseline 95% of dying from loneliness
        //30% less likely if has 1 neighbor
        if(random() <= 0.95-neighbors*0.3){
          write[i][j].state = 0;
          write[i][j].age = 0;
        }
        else{
          write[i][j].state = self;
          write[i][j].age++;
        }
      }
      //Death (Overpopulation)
      else if(self == 1 && neighbors >= 4){
        //Has a baseline 80% of dying from over population
        //5% More likely for each neighbor over 4 it has
        if(random() <= 0.8+(neighbors-4)*0.5){
          write[i][j].state = 0;
          write[i][j].age = 0;
        }
        else{
          write[i][j].state = self;
          write[i][j].age++;
        }
      }
      //Birth
      else if(self == 0 && neighbors == 3){
        //Cells have an 80% chance of reproducing
        if(random() <= 0.8){
          write[i][j].state = 1;
          write[i][j].age = 0;
        }
        else{
          write[i][j].state = self;
          write[i][j].age++;
        }
      }
      //Statis
      else{
        write[i][j].state = self;
        write[i][j].age++;
      }

    }
  }
  
  //Set the new board state to read
  let temp = read;
  read = write;
  write = temp;
  
  //Increment time for random functions
  time++;
}
