var board = 
  [ [0,2,0,0],
  [0,0,0,0],
  [0,0,2,0],
  [0,0,0,0] ]
const boardState = document.querySelector("[data-game-grid]")
var hasLost = false;
function startInteraction(){
  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("click", handleMouseClick);
}
startInteraction();
representGameboard(board);
function handleMouseClick(e) {
  if  (e.target.matches("[data-new-game]")){
    board = [ [0,2,0,0],
              [0,0,0,0],
              [0,0,2,0],
              [0,0,0,0] ]
    representGameboard(board);
    document.querySelector("[data-score]").innerHTML = "0"
  }
}

function representGameboard(board){
  const tileArray = boardState.querySelectorAll(".tile")
  for(let i = 0; i < board.length; i ++){
    for(j = 0; j < board.length; j++){
      const tile = tileArray[i * 4 + j];
      tile.innerHTML = board[i][j];
      tile.setAttribute("data-state", board[i][j].toString())
    }
  }
}

function handleKeyPress(e){
  if (e.key == "q"){
    document.getElementById("comment").hidden = !document.getElementById("comment").hidden;
  }
  if (e.key == "e"){
    console.log(board)
  }
  if (e.keyCode == '37'){
    //left
    rowSlide(board)
    // integrate this for loop into rowMerge
    for(let i = 0; i < board.length; i++){
      board[i] = rowMerge(board[i])
    }
    rowSlide(board)
    newTile(board)
    representGameboard(board)
  }
  if (e.keyCode == '39'){
    //right
    rowSlide(board, "r")
    // integrate this for loop into rowMerge
    for(let i = 0; i < board.length; i++){
      board[i] = rowMerge(board[i].reverse()).reverse()
    }
    rowSlide(board, "r")
    newTile(board)
    representGameboard(board)
  }
  if (e.keyCode == '38'){
    //up
    columnSlide(board)
    columnMergeUp(board)
    columnSlide(board)
    newTile(board)
    representGameboard(board)
  }
  if (e.keyCode == '40'){
    //down
    columnSlide(board, "d")
    columnMergeDown(board)
    columnSlide(board, "d")
    newTile(board)
    representGameboard(board)
  }
  if (e.key == "r"){
    newTile(board)
  }
}
function slide(arr){
  var zeroes = 0
  const slid = [];
  var returnArr = [0,0,0,0];
  for(let i = 0; i < arr.length; i++){
    if (arr[i] === 0){
      zeroes += 1;
    }
    slid.push(zeroes)
  }
  for(let j = 0; j < arr.length; j++){
    if(arr[j] !== 0){
      returnArr[j - slid[j]] = arr[j];
    }
  }
  return(returnArr)
}

function rowSlide(grid, dir = "l"){
  for (let i = 0; i < grid.length; i++){
    if (dir == "r"){
      grid[i] = slide(grid[i].reverse()).reverse();
    } else {
    grid[i] = slide(grid[i]);
    }
  }
}

function columnSlide(grid, dir = "u"){
  var tempColumn = [0,0,0,0]
  for(let i = 0; i < grid.length; i++){
    for(let j = 0; j < grid[i].length; j++){
      tempColumn[j] = grid[j][i]
    }
    if (dir == "d"){
      tempColumn = slide(tempColumn.reverse()).reverse()
    } else {
    tempColumn = slide(tempColumn)
    }
    for(let k = 0; k < grid[i].length; k ++){
      grid[k][i] = tempColumn[k]
    }
    tempColumn = [0,0,0,0]
  }
}

function rowMerge(arr){
  for(let i = 0; i < arr.length-1; i++){
    if(arr[i] == arr[i+1] && !arr[i] == 0){
      arr[i] = arr[i]*2
      arr[i+1] = 0
      document.querySelector("[data-score]").innerHTML = (parseInt(document.querySelector("[data-score]").innerHTML) + arr[i]*4).toString()
    }
  }
  return arr;
}

function columnMergeUp(grid){
  for(let j = 0; j < grid[0].length; j++){
    for(let i = 0; i < grid.length-1; i ++){
      if(grid[i][j] == grid[i+1][j] && !grid[i][j] == 0){
        grid[i][j] = grid[i][j]*2
        grid[i+1][j] = 0
        document.querySelector("[data-score]").innerHTML = (parseInt(document.querySelector("[data-score]").innerHTML) + grid[i][j]*4).toString()
      }
    }
  }
  return grid
}

function columnMergeDown(grid){
  for(let j = 0; j < grid[0].length; j++){
    for(let i = grid.length-1; i > 0; i --){
      if(grid[i][j] == grid[i-1][j] && !grid[i][j] == 0){
        grid[i][j] = grid[i][j]*2
        grid[i-1][j] = 0
        document.querySelector("[data-score]").innerHTML = (parseInt(document.querySelector("[data-score]").innerHTML) + grid[i][j]*4).toString()
      }
    }
  }
  return grid
}

function showAlert(text, duration = 1000){
  const alertContainer = document.querySelector("[data-alert-container]");
  const alert = document.createElement("div");
  alert.textContent = text;
  alert.classList.add("alert");
  alertContainer.prepend(alert);
  if (duration == null) return
  setTimeout(()=>{
    alert.classList.add("hide")
    alert.addEventListener("transitionend", () =>{
      alert.remove();
    })
  }, duration)
}

function newTile(grid){
  const empties = []
  for(var i = 0; i < grid.length; i ++){
    for(var j = 0; j < grid[i].length; j++){
      if (grid[i][j] == 0){
        empties.push([i,j]);
      }
    }
  }
  console.log(empties)
  if (empties.length != 0){
    const randomEmptyCoord = empties[Math.floor(Math.random()*empties.length)]
    grid[randomEmptyCoord[0]][randomEmptyCoord[1]] = Math.floor(Math.random()*2 + 1) * 2
    
  }
}