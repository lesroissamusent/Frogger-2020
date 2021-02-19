function init() {
  const grid = document.querySelector('.grid') // grab grid
  
  const width = 20 // grid size
  const height = 23
  
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
  // console.log('frog>>>', grid)

  // * Add Frog to grid
  function addFrog(position) { //position makes it reusable, you could add current position or start position or a random index for a random position.
    cells[position].classList.add(frogClass) //add css Frog class
  }

  // * Remove Frog from the grid --> so that you don't get a bunch of cats on the screen evertime you try to move it.
  function removeFrog(position) { 
    cells[position].classList.remove(frogClass)
  }

  // * Move Frog

  function handleKeyDown(event) {
    const key = event.keyCode // recognises that you are pressing keys and which key it is

    removeFrog(frogCurrentPosition) // 1. remove cat


    // 2. check  what key has been pressed to decide where cat should go
    if (key === 39 /*right*/ && frogCurrentPosition % width !== width - 1) { 
      frogCurrentPosition++
    } else if (key === 37 /*left*/&& frogCurrentPosition % width !== 0) {
      frogCurrentPosition--
    } else if (key === 38 /*up*/ && frogCurrentPosition >= width) {
      frogCurrentPosition -= width
    } else if (key === 40 /*down*/ && frogCurrentPosition + width <= width * height - 1) {
      frogCurrentPosition += width
    } else {
      console.log('Illegal move')
    }
    
    // 3. add cat to new position
    addFrog(frogCurrentPosition)
  }


  document.addEventListener('keydown', handleKeyDown)

  createGrid() 
  console.log('cells>>>', grid)












}




window.addEventListener('DOMContentLoaded', init)