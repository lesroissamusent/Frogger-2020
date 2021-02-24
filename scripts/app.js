function init() {
  // * grid
  const start = document.querySelector('.start')
  const pause = document.querySelector('.pause')
  const grid = document.querySelector('.grid') // grab grid
  const myPoints = document.querySelector('.points')
  const myLives = document.querySelector('.lives')
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

  let life = 3
  console.log(life)
  let points = 0
    
  // * froggy froggy 
  const frogClass = 'frog'
  const frogStartPosition = 449
  let frogCurrentPosition = 449


  // * Make a grid
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i //innerText
      myLives.textContent = life
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
  // * Remove frog from the grid 
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
    console.log('frog!', frogCurrentPosition)
  }

  // * OBSTACLESSSSSS
  const obstacleClass = 'obstacles'

  let obstacleArrayOne = [260, 280, 261, 281]
  let obstacleArrayTwo = [319, 318, 317,339, 338, 337]
  let obstacleArrayThree = [340, 341, 360, 361]
  let obstacleArrayFour = [399, 398, 397,419, 418, 417]

  function removeObstacles(position) { 
    cells[position].classList.remove(obstacleClass)
  }

  function addObstacles(position) {
    cells[position].classList.add(obstacleClass)
    // console.log('obstacles', obstacleStartPosition)
  }

  function ObstacleRowOneTimer() {
    
    const obstacleTimer = setInterval(() => {
      obstacleArrayOne.forEach((index) => {
        removeObstacles(index) 
      })

      obstacleArrayOne = obstacleArrayOne.map((index) => {
        if ((index + 1) % width === 0) {
          // console.log('here')
          return index - (width - 1)
        } else {
          return index + 1
        } 
      })
      obstacleArrayOne.forEach((index) => {
        addObstacles(index) 
        collision()
      })
      // console.log('obstacle array One', obstacleArrayOne)
    }, 500)
    function pauseGame() {
      clearInterval(obstacleTimer)
      // clearInterval(obstacleTimer)
    }
    pause.addEventListener('click', pauseGame)
  }

  function obstacleRowTwoTimer() {
    const obstacleTimer = setInterval(() => {
      obstacleArrayTwo.forEach((index) => {
        removeObstacles(index) 
      })

      obstacleArrayTwo = obstacleArrayTwo.map((index) => {
        if ((index - 1) % width === 0) { 
          // console.log('here')
          return index + (width - 1)
        } else {
          return index - 1
        } 
      })
      obstacleArrayTwo.forEach((index) => {
        addObstacles(index) 
      })
      // console.log('obstacle array Two', obstacleArrayTwo)
    }, 500)
    function pauseGame() {
      clearInterval(obstacleTimer)
      // clearInterval(obstacleTimer)
    }
    pause.addEventListener('click', pauseGame)
  }

  function obstacleRowThreeTimer() {
    const obstacleTimer = setInterval(() => {
      obstacleArrayThree.forEach((index) => {
        removeObstacles(index) 
      })

      obstacleArrayThree = obstacleArrayThree.map((index) => {
        if ((index + 1) % width === 0) {
          // console.log('here')
          return index - (width - 1)
        } else {
          return index + 1
        } 
      })
      obstacleArrayThree.forEach((index) => {
        addObstacles(index) 
      })
      // console.log('obstacle array Three', obstacleArrayThree)
    }, 500)
    function pauseGame() {
      clearInterval(obstacleTimer)
      // clearInterval(obstacleTimer)
    }
    pause.addEventListener('click', pauseGame)
  }

  function obstacleRowFourtimer() {
    const obstacleTimer = setInterval(() => {
      obstacleArrayFour.forEach((index) => {
        removeObstacles(index) 
      })

      obstacleArrayFour = obstacleArrayFour.map((index) => {
        if ((index - 1) % width === 0) { 
          // console.log('here')
          return index + (width - 1)
        } else {
          return index - 1
        } 
      })
      obstacleArrayFour.forEach((index) => {
        addObstacles(index) 
      })
      // console.log('obstacle array Four', obstacleArrayFour)
    }, 500)
    function pauseGame() {
      clearInterval(obstacleTimer)
      // clearInterval(obstacleTimer)
    }
    pause.addEventListener('click', pauseGame)
  }

  // * OBJECTSSSSSS
  const objectClass = 'objects'

  let objectArrayOne = [60, 61, 62, 63]
  let objectArrayTwo = [106, 107, 108]
  let objectArrayThree = [153, 154, 155, 156]
  let objectArrayFour = [188, 189, 190, 191]

  function removeObjects(position) { 
    cells[position].classList.remove(objectClass)
  }
  function addObjects(position) {
    cells[position].classList.add(objectClass)
  }
  function objectRowOneTimer() {
    const objectTimer = setInterval(() => {
      objectArrayOne.forEach((index) => {
        removeObjects(index) 
      })

      objectArrayOne = objectArrayOne.map((index) => {
        if ((index + 1) % width === 0) {
        // console.log('here')
          return index - (width - 1)
        } else {
          return index + 1
        } 
      })
      objectArrayOne.forEach((index) => {
        addObjects(index) 
      })
      // console.log('object array One', objectArrayOne)
    }, 500)
    function pauseGame() {
      clearInterval(objectTimer)
      // clearInterval(obstacleTimer)
    }
    pause.addEventListener('click', pauseGame)
  }
  function objectRowTwoTimer() {
    const objectTimer = setInterval(() => {
      objectArrayTwo.forEach((index) => {
        removeObjects(index) 
      })

      objectArrayTwo = objectArrayTwo.map((index) => {
        if ((index - 1) % width === 0) { 
          // console.log('here')
          return index + (width - 1)
        } else {
          return index - 1
        } 
      })
      objectArrayTwo.forEach((index) => {
        addObjects(index) 
      })
      // console.log('object array Two', objectArrayTwo)
    }, 500)
    function pauseGame() {
      clearInterval(objectTimer)
      // clearInterval(obstacleTimer)
    }
    pause.addEventListener('click', pauseGame)
  }
  function objectRowThreeTimer() {
    const objectTimer = setInterval(() => {
      objectArrayThree.forEach((index) => {
        removeObjects(index) 
      })

      objectArrayThree = objectArrayThree.map((index) => {
        if ((index + 1) % width === 0) {
        // console.log('here')
          return index - (width - 1)
        } else {
          return index + 1
        } 
      })
      objectArrayThree.forEach((index) => {
        addObjects(index) 
      })
      // console.log('object array Three', objectArrayThree)
    }, 500)
    function pauseGame() {
      clearInterval(objectTimer)
      // clearInterval(obstacleTimer)
    }
    pause.addEventListener('click', pauseGame)
  }
  function objectRowFourTimer() {
    const objectTimer = setInterval(() => {
      objectArrayFour.forEach((index) => {
        removeObjects(index) 
      })

      objectArrayFour = objectArrayFour.map((index) => {
        if ((index - 1) % width === 0) { 
          // console.log('here')
          return index + (width - 1)
        } else {
          return index - 1
        } 
      })
      objectArrayFour.forEach((index) => {
        addObjects(index) 
      })
      // console.log('object array Four', objectArrayFour)
    }, 500)
    function pauseGame() {
      clearInterval(objectTimer)
      // clearInterval(obstacleTimer)
    }
    pause.addEventListener('click', pauseGame)
  }
  
  function startGame() {
    
    ObstacleRowOneTimer()
    obstacleRowTwoTimer()
    obstacleRowThreeTimer()
    obstacleRowFourtimer()

    objectRowOneTimer()
    objectRowTwoTimer()
    objectRowThreeTimer()
    objectRowFourTimer()
  }

  function collision() {
    
    if (cells[frogCurrentPosition].classList.contains('obstacles')) {
      console.log('ouch')
      life--
      removeFrog(frogCurrentPosition) 
      addFrog(frogStartPosition)
      frogCurrentPosition = 449
    } else if (cells[frogCurrentPosition].classList.contains('water')) {
      console.log('glug glug')
      life--
      removeFrog(frogCurrentPosition) 
      addFrog(frogStartPosition)
      frogCurrentPosition = 449
    } else {
      console.log('nothing to see here')
    }
  }



  start.addEventListener('click', startGame)
  document.addEventListener('keydown', handleKeyDown)
  createGrid() 
}

window.addEventListener('DOMContentLoaded', init)