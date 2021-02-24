function init() {
  // * grid
  const start = document.querySelector('button')
  const grid = document.querySelector('.grid') // grab grid
  const myPoints = document.querySelector('.points')
  const width = 20 // grid size
  const height = 23 // grid size
  const cellCount = width * height // number of cells
  const cells = []

  // * game elements
  const safetyPadClass = 'safety-pads'
  const safetyPadCells = [1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30, 33, 34, 37, 38]
  // console.log('safetypad cells!', safetyPadCells)

  const waterClass = 'water'
  const waterCells = []
  // console.log('water cells!', waterCells)

  const waterSafetyClass = 'water-safety'
  const waterSafetyCells = []
  // console.log('waterSafety cells!', waterSafetyCells)

  const roadClass = 'road'
  const roadCells = []
  // console.log('road cells!', roadCells)

  const roadSafetyClass = 'road-safety'
  const roadSafetyCells = []
  // console.log('roadSafety cells!', roadSafetyCells)

  


  // let life = 3
  
  
    
  let points = 0
    
  // * froggy froggy 
  const frogClass = 'frog'
  const frogStartPosition = 449
  let frogCurrentPosition = 449
  console.log('frog!', frogCurrentPosition)

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
      // console.log(i)
    }
    for (let i = 220; i < 260; i++) {
      waterSafetyCells.push(i)
      // console.log(i)
    }
    for (let i = 260; i < 420; i++) {
      roadCells.push(i)
      // console.log(i)
    }
    for (let i = 420; i < 460; i++) {
      roadSafetyCells.push(i)
      // console.log(i)
    }

    addSafetyPads(safetyPadCells)
    addFrog(frogStartPosition)
    addWater(waterCells)
    addWaterSafety(waterSafetyCells)
    addRoad(roadCells)
    addRoadSafety(roadSafetyCells)
    
  }
  // * Add Water to grid
  function addWater() {
    waterCells.forEach(position => {
      cells[position].classList.add(waterClass) 
    })
  }
  // * Add safetypads to grid
  function addSafetyPads() {
    safetyPadCells.forEach(position => {
      cells[position].classList.add(safetyPadClass) 
    })
  }
  // * Add waterSafety to grid
  function addWaterSafety() {
    waterSafetyCells.forEach(position => {
      cells[position].classList.add(waterSafetyClass) 
    })
  }
  // * Add road to grid
  function addRoad() {
    roadCells.forEach(position => {
      cells[position].classList.add(roadClass) 
    })
  }
  // * Add roadSafety to grid
  function addRoadSafety() {
    roadSafetyCells.forEach(position => {
      cells[position].classList.add(roadSafetyClass) 
    })
  }
  // * Add frog to grid
  function addFrog(position) { //position makes it reusable, you could add current position or start position or a random index for a random position.
    cells[position].classList.add(frogClass) //add css Frog class
  }
  // * Remove frog from the grid --> so that you don't get a bunch of frogs on the screen evertime you try to move it.
  function removeFrog(position) { 
    cells[position].classList.remove(frogClass)
  }
  // * Move frog
  function handleKeyDown(event) {
    const key = event.keyCode // recognises that you are pressing keys and which key it is

    // * 1. remove frog
    removeFrog(frogCurrentPosition) 

    // * 2. check  what key has been pressed to decide where frog should go
    if (key === 39 /*right*/ && frogCurrentPosition % width !== width - 1) { 
      frogCurrentPosition++
    } else if (key === 37 /*left*/&& frogCurrentPosition % width !== 0) {
      frogCurrentPosition--
    } else if (key === 38 /*up*/ && frogCurrentPosition >= width) {
      frogCurrentPosition -= width
      points += 5
    } else if (key === 40 /*down*/ && frogCurrentPosition + width <= width * height - 1) {
      frogCurrentPosition += width
    } else if (key === 32 /*space*/ && frogCurrentPosition - height !== 0) {
      frogCurrentPosition -= 40
      points += 10
    } else {
      console.log('Illegal move')
    }
    // * 3. add frog to new position
    addFrog(frogCurrentPosition)
    myPoints.innerHTML = points
  }

  // * Obstacles
  const obstacleClass = 'obstacles'
  // const obstacleStartPosition = []
  // let obstacleCurrentPosition = 400

  let obstacleArray = [260, 280, 261, 281, 319, 318, 317, 339, 338, 337, 340, 341, 360, 361, 399, 398, 397, 419, 418, 417]

  function removeObstacles(position) { 
    cells[position].classList.remove(obstacleClass)
  }

  function addObstacles(position) {
    cells[position].classList.add(obstacleClass)
    // console.log('obstacles', obstacleStartPosition)
  }

  function startGame() {
      
    setInterval(() => {
      obstacleArray.forEach((index) => {
        removeObstacles(index) 
      })
      obstacleArray = obstacleArray.map((index) => {
        if (index <= 260 && index >= 299) {
          return index + 1
        } else if (index <= 300 && index >= 339) {
          return index - 1
        } else if (index <= 340 && index >= 379) {
          return index + 1
        } else {
          return index - 1
        }
      })
      obstacleArray = obstacleArray.map((index) => {
        return index + 1
      })

      obstacleArray.forEach((index) => {
        addObstacles(index) 
      })
      console.log('obstacle array', obstacleArray)
    }, 1000)
    
    
  }

  // * objects
  const objectClass = 'objects'
  // const objectStartPosition = 399
  // let objectCurrentPosition = 400

  let objectArray = [60, 61, 62, 63, 106, 107, 108, 153, 154, 155, 156, 188, 189, 190, 191]

  function removeobjects(position) { 
    cells[position].classList.remove(objectClass)
  }

  function addobjects(position) {
    cells[position].classList.add(objectClass)
  }


      
    setInterval(() => {
      objectArray.forEach((index) => {
        removeobjects(index) 
      })
      objectArray = objectArray.map((index) => {
        if (index <= 260 && index >= 299) {
          return index + 1
        } else if (index <= 300 && index >= 339) {
          return index - 1
        } else if (index <= 340 && index >= 379) {
          return index + 1
        } else {
          return index - 1
        }
      })
      objectArray = objectArray.map((index) => {
        return index + 1
      })

      objectArray.forEach((index) => {
        addobjects(index) 
      })
      console.log('object array', objectArray)
    }, 1000)
    
    








  start.addEventListener('click', startGame)
  document.addEventListener('keydown', handleKeyDown)
  createGrid() 
}

window.addEventListener('DOMContentLoaded', init)