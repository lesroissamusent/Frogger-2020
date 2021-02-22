function init() {
  // * grid
  const grid = document.querySelector('.grid') // grab grid
  const width = 20 // grid size
  const height = 23 // grid size
  const cellCount = width * height // number of cells
  const cells = []
  // console.log('Grid>>>', grid)


  // * game elements
  const safetyPads = document.querySelector('div.grid')
  const waterSafety = 220 - 259
  const road = 260 - 419
  const roadSafety = 420 - 459
  console.log('picked cells!', safetyPads)

  // let obstacles
  // let objects
  
  // * froggy froggy 
  const frogClass = 'frog'
  const frogStartPosition = 449
  let frogCurrentPosition = 449
  console.log('frog!', frogCurrentPosition)

  const waterClass = 'water'
  const waterCells = []
  console.log('water cells!', waterCells)

  // * Make a grid
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i //innerText
      grid.appendChild(cell)
      cells.push(cell) //add cells to array 'cells'
    }
    for (let i = 0; i < 220; i++) {
      waterCells.push(i)
      console.log(i)
    }
    console.log(waterCells)
    addFrog(frogStartPosition)
    addWater(waterCells)
    // addWater(waterCells)
  }
  function addWater() {
    waterCells.forEach(position => {
      cells[position].classList.add(waterClass) 
    })
  }
  // * Add Frog to grid
  function addFrog(position) { //position makes it reusable, you could add current position or start position or a random index for a random position.
    cells[position].classList.add(frogClass) //add css Frog class
  }

  // * Remove Frog from the grid --> so that you don't get a bunch of frogs on the screen evertime you try to move it.
  function removeFrog(position) { 
    cells[position].classList.remove(frogClass)
  }

  // * Move Frog
  function handleKeyDown(event) {
    const key = event.keyCode // recognises that you are pressing keys and which key it is

    removeFrog(frogCurrentPosition) // 1. remove frog


    // 2. check  what key has been pressed to decide where frog should go
    if (key === 39 /*right*/ && frogCurrentPosition % width !== width - 1) { 
      frogCurrentPosition++
    } else if (key === 37 /*left*/&& frogCurrentPosition % width !== 0) {
      frogCurrentPosition--
    } else if (key === 38 /*up*/ && frogCurrentPosition >= width) {
      frogCurrentPosition -= width
    } else if (key === 40 /*down*/ && frogCurrentPosition + width <= width * height - 1) {
      frogCurrentPosition += width
    } else if (key === 32 && frogCurrentPosition - height !== 0) {
      frogCurrentPosition -= 40
    } else {
      console.log('Illegal move')
    }
    // 3. add frog to new position
    addFrog(frogCurrentPosition)
  }


  document.addEventListener('keydown', handleKeyDown)

  createGrid() 













}




window.addEventListener('DOMContentLoaded', init)