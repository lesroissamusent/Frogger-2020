function init() {
  // * VARIABLES
  const start = document.querySelector('.start-screen')
  const startButton = document.querySelector('.start')
  const header = document.querySelector('header')
  const main = document.querySelector('main')
  const footer = document.querySelector('footer')
  const gameEnd = document.querySelector('.game-end')
  const finalScore = document.querySelector('.final-score')
  const resetButton = document.querySelector('.reset')
  const grid = document.querySelector('.grid') // grab grid
  const myPoints = document.querySelector('.points')
  const myLives = document.querySelector('.lives')
  const width = 20 // grid size
  const height = 23 // grid size
  const cellCount = width * height // number of cells
  const cells = []

  const safetyPadClass = 'safety-pads'
  const safetyPadCells = [ 21, 22, 25, 26, 29, 30, 33, 34, 37, 38]

  const waterClass = 'water'
  const waterCells = []

  const waterSafetyClass = 'water-safety'
  const waterSafetyCells = []

  const roadClass = 'road'
  const roadCells = []

  const roadSafetyClass = 'road-safety'
  const roadSafetyCells = []

  const frogClass = 'frog'
  const frogStartPosition = 449
  let frogCurrentPosition = 449

  let lives = 3
  let points = 0

  function atStart() {
    header.classList.add('hidden')
    main.classList.add('hidden')
    footer.classList.add('hidden')
    gameEnd.classList.add('hidden')
  }

  // * GRIDDDDDDD

  // Make a grid
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.textContent = i //innerText
      grid.appendChild(cell)
      cells.push(cell) //add cells to array 'cells'
    }
    for (let i = 0; i < 220; i++) {
      waterCells.push(i)
    }
    for (let i = 220; i < 260; i++) {
      waterSafetyCells.push(i)
    }
    for (let i = 260; i < 420; i++) {
      roadCells.push(i)
    }
    for (let i = 420; i < 460; i++) {
      roadSafetyCells.push(i)
    }

    addSafetyPads(safetyPadCells)
    addFrog(frogStartPosition)
    addWater(waterCells)
    addWaterSafety(waterSafetyCells)
    addRoad(roadCells)
    addRoadSafety(roadSafetyCells)
    
  }
  // Add Water to grid
  function addWater() {
    waterCells.forEach(position => {
      cells[position].classList.add(waterClass) 
    })
  }
  // Add safetypads to grid
  function addSafetyPads() {
    safetyPadCells.forEach(position => {
      cells[position].classList.add(safetyPadClass) 
    })
  }
  // Add waterSafety to grid
  function addWaterSafety() {
    waterSafetyCells.forEach(position => {
      cells[position].classList.add(waterSafetyClass) 
    })
  }
  // Add road to grid
  function addRoad() {
    roadCells.forEach(position => {
      cells[position].classList.add(roadClass) 
    })
  }
  // Add roadSafety to grid
  function addRoadSafety() {
    roadSafetyCells.forEach(position => {
      cells[position].classList.add(roadSafetyClass) 
    })
  }
  // Add frog to grid
  function addFrog(position) { 
    cells[position].classList.add(frogClass) //add css Frog class
  }
  // Remove frog from the grid 
  function removeFrog(position) { 
    cells[position].classList.remove(frogClass)
  }
  // Move frog
  function handleKeyDown(event) {
    const key = event.keyCode 

    // * 1. remove frog
    removeFrog(frogCurrentPosition) 

    // * 2. check  what key has been pressed to decide where frog should go
    if (key === 39/*right*/ && frogCurrentPosition % width !== width - 1) { 
      frogCurrentPosition++
    } else if (key === 37/*left*/ && frogCurrentPosition % width !== 0) {
      frogCurrentPosition--
    } else if (key === 38/*up*/ && frogCurrentPosition >= width) {
      frogCurrentPosition -= width
      points += 5
    } else if (key === 40/*down*/ && frogCurrentPosition + width <= width * height - 1) {
      frogCurrentPosition += width
    } else if (key === 74/*J*/ && frogCurrentPosition - height !== 0) {
      frogCurrentPosition -= width * 2
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

  let obstacleArrayOne = [261, 262, 281, 282, 290, 291, 276, 277, 278]
  let obstacleArrayTwo = [319, 318, 317, 339, 338, 337, 312, 313, 332, 333, 325, 324, 300, 301]
  let obstacleArrayThree = [340, 341, 360, 361, 370, 371, 377]
  let obstacleArrayFour = [382, 383, 384, 384, 388, 402, 403, 404, 399, 398, 397, 419, 418, 417]

  function removeObstacles(position) {
    cells[position].classList.remove(obstacleClass)
  }

  function addObstacles(position) {
    cells[position].classList.add(obstacleClass)
  }

  function obstacleRowOneTimer() {
    
    setInterval(() => {
      obstacleArrayOne.forEach((index) => {
        removeObstacles(index) 
      })

      obstacleArrayOne = obstacleArrayOne.map((index) => {
        if ((index + 1) % width === 0) {
          return index - (width - 1)
        } else {
          return index + 1
        } 
      })
      obstacleArrayOne.forEach((index) => {
        addObstacles(index) 
        gameRules()
      })
    }, 300)
  }

  function obstacleRowTwoTimer() {
    setInterval(() => {
      obstacleArrayTwo.forEach((index) => {
        removeObstacles(index) 
      })

      obstacleArrayTwo = obstacleArrayTwo.map((index) => {
        if (index % width === 0) { 
          return index + (width - 1)
        } else {
          return index - 1
        } 
      })
      obstacleArrayTwo.forEach((index) => {
        addObstacles(index) 
      })
    }, 600)
  }

  function obstacleRowThreeTimer() {
    setInterval(() => {
      obstacleArrayThree.forEach((index) => {
        removeObstacles(index) 
      })

      obstacleArrayThree = obstacleArrayThree.map((index) => {
        if ((index + 1) % width === 0) {
          return index - (width - 1)
        } else {
          return index + 1
        } 
      })
      obstacleArrayThree.forEach((index) => {
        addObstacles(index) 
      })
    }, 400)
  }

  function obstacleRowFourtimer() {
    setInterval(() => {
      obstacleArrayFour.forEach((index) => {
        removeObstacles(index) 
      })

      obstacleArrayFour = obstacleArrayFour.map((index) => {
        if (index % width === 0) { 
          return index + (width - 1)
        } else {
          return index - 1
        } 
      })
      obstacleArrayFour.forEach((index) => {
        addObstacles(index) 
      })
    }, 300)
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
    setInterval(() => {
      objectArrayOne.forEach((index) => {
        removeObjects(index) 
      })

      objectArrayOne = objectArrayOne.map((index) => {
        if ((index + 1) % width === 0) {
          return index - (width - 1)
        } else {
          return index + 1
        } 
      })
      objectArrayOne.forEach((index) => {
        addObjects(index) 
      })
    }, 300)
  }
  function objectRowTwoTimer() {
    setInterval(() => {
      objectArrayTwo.forEach((index) => {
        removeObjects(index) 
      })

      objectArrayTwo = objectArrayTwo.map((index) => {
        if (index % width === 0) { 
          return index + (width - 1)
        } else {
          return index - 1
        } 
      })
      objectArrayTwo.forEach((index) => {
        addObjects(index) 
      })
    }, 700)
  }
  function objectRowThreeTimer() {
    setInterval(() => {
      objectArrayThree.forEach((index) => {
        removeObjects(index) 
      })

      objectArrayThree = objectArrayThree.map((index) => {
        if ((index + 1) % width === 0) {
          return index - (width - 1)
        } else {
          return index + 1
        } 
      })
      objectArrayThree.forEach((index) => {
        addObjects(index) 
      })
    }, 600)
  }
  function objectRowFourTimer() {
    setInterval(() => {
      objectArrayFour.forEach((index) => {
        removeObjects(index) 
      })

      objectArrayFour = objectArrayFour.map((index) => {
        if (index % width === 0) { 
          return index + (width - 1)
        } else {
          return index - 1
        } 
      })
      objectArrayFour.forEach((index) => {
        addObjects(index) 
      })
    }, 500)
  }

  // * GAAMEEEE
  function startGame() {
    start.classList.add('hidden')
    header.classList.remove('hidden')
    main.classList.remove('hidden')
    footer.classList.remove('hidden')

    obstacleRowOneTimer()
    obstacleRowTwoTimer()
    obstacleRowThreeTimer()
    obstacleRowFourtimer()

    objectRowOneTimer()
    objectRowTwoTimer()
    objectRowThreeTimer()
    objectRowFourTimer()
  }
  function gameRules() {
    if (lives < 1) {
      gameOver()

      // OBSTACLES
    } else if (cells[frogCurrentPosition].classList.contains('obstacles')) {
      console.log('ouch')
      removeFrog(frogCurrentPosition) 
      addFrog(frogStartPosition)
      frogCurrentPosition = 449
      lives -= 1
      points -= 10
      console.log('points', points)

      // SAFETYPADS
    } else if (cells[frogCurrentPosition].classList.contains('water') && cells[frogCurrentPosition].classList.contains('safety-pads')) {
      removeFrog(frogCurrentPosition) 
      addFrog(frogStartPosition)
      frogCurrentPosition = 449
      points += 50

      // WATER
    } else if (cells[frogCurrentPosition].classList.contains('water')) {
      console.log('glug glug')
      removeFrog(frogCurrentPosition) 
      addFrog(frogStartPosition)
      frogCurrentPosition = 449
      lives -= 1
      points -= 10
    } else {
      console.log('nothing to see here')
    }
  
    myPoints.innerHTML = points
    myLives.innerHTML = lives
  }
  function gameOver() {
    header.classList.add('hidden')
    main.classList.add('hidden')
    footer.classList.add('hidden')
    finalScore.innerHTML = points
    console.log('final points', points)
    gameEnd.classList.remove('hidden')
  }
  function resetGame() {
    window.location.reload()
  }

  // * EVENT LISTENERS AND FUNCTIONS
  resetButton.addEventListener('click', resetGame)
  startButton.addEventListener('click', startGame)
  document.addEventListener('keydown', handleKeyDown)
  createGrid() 
  atStart()
}

window.addEventListener('DOMContentLoaded', init)