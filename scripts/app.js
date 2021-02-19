function init() {
  const grid = document.querySelector('.grid') // grab grid
  
  const width = 10 // grid size
  const height = 10
  const cellCount = width * height // number of cells
  const cells = []
  // console.log('Grid>>>', grid)

  const frogClass = 'frog'
  const frogStartPosition = 0
  let frogCurrentPosition = 0

  // * Make a grid
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i //innerText
      grid.appendChild(cell)
      cells.push(cell) //add cells to array 'cells'
    }
    addFrog(frogStartPosition)
  }
  console.log('frog>>>', grid)

// * Add Frog to grid
function addFrog(position) { //position makes it reusable, you could add current position or start position or a random index for a random position.
  cells[position].classList.add(frogClass) //add css Frog class
}



  createGrid() 
  console.log('cells>>>', grid)












}




window.addEventListener('DOMContentLoaded', init)