/* eslint-disable indent */
// ? FROGGER

// * HTML
  //// Body
    //// Section
      //// title
      //// start button
      // ! pause button
      // ! difficulty bar
      //// lives
      //// points
      // ! high score
      // ! timer
    //// Grid
    //// Footer
     // Game instructions
     // info - created by/date/GA/etc.

// * CSS
  // Have't decided on theme yet. Will build MVP before making final decision?
    //toggle from frogger to 2020 css

///// * Grid
 //// should have many cells for smoother movement (20 x 20? more? trial by creating empty grid with frog first.)
  //// grid breakup:  
  //// pads: 20-59
  //// water: 0-219
  //// safety: 220-259
  //// road: 260-419
  //// safety: 420-459

///// * Frog Movement
  //// Can move in any direction
  //// Keyup vs keydown (thinking keydown)
  ///// ! space bar for jumps on water objects? space bar key = 2 x cell movement?

// * Car Obstacles
  //// use class for obstacles
  //// new class for each line of moving cars
    // different speeds
    // ! speed to change with difficulty level?
    //// different directions
    //// different sizes --- consider how to group cells together to create objects of different sizes.
 //// timer (setInterval?) for obstacle movement.


// * Water Objects
  //// use classes for objects
    //// different speeds
    // ! speed to change with difficulty level?
    //// different directions (only x-axis)
    //// different sizes --- consider how to group cells together to create objects of different sizes.
  // consider how to connect frog to objects as they are mounted. - give frog class of object? 


// * Safety pads
  //// 4 x safety pads
  //// area surrounding pads can be same class as water to be off limits
  //// new frog introduced when current frog reaches a pad.
  //// 100 points when frog reaches pad? Maybe no points / pass-fail.? unsure.  // ! Speed bonus? is that achievable? Start timer at beginning of game. conditional statement with set bands?
  // pad cannot accommodate more than one frog.
  // ! Sensitivity of pad area could be adjusted by adjusting pad size?
  // ! flies for extra points? could create a class to be assigned randomly to a pad at certain intervals. if frog takes pad space which = fly class more points?
  

// * Off limits areas
 //// use current position for grid edges
    //// conditional statement
 //// use classes for objects?
 //// use classes for water?

// * Lives + points
  //// frog class returns to starting Position when it dies.
  //// 100 points when frog reaches pad.
  //// 5 points for moving up a space?
  //// 3 lifes in total, when all lives gone game over
  //// if life value = 0, stop game

  // when game over, alert final score
  // remove main content and pop up final score + restart button
    // ! remember previous score when game is reset
    //display: none class


  //   function resetGame() {
  //     window.location.reload()
  //   }
  //   reset.addEventListener('click', resetGame)

  //   function startGame() {
  //     clearInterval(randomMole)
  //     start.classList.add('hidden')
  //     main.classList.remove('hidden')
  
  //     function gameOver() {
  //       header.classList.add('hidden')
  //       main.classList.add('hidden')
  //       endScore.innerHTML = points
  //       gameEnd.classList.remove('game-over')
  //       reset.classList.remove('hidden')
  //     }
  //     function resetGame() {
  //       window.location.reload()
  //     }
  //     reset.addEventListener('click', resetGame)
  // }




    // // * SAFETY PADSSS
// const safetyPadClass = 'safety-pads'
// const frogSafeClass = 'safety-with-frog'

// let safetyArrayOne = [1, 2, 21, 22]
// let safetyArrayTwo = [5, 6, 25, 26]
// let safetyArrayThree = [9, 10, 29, 30]
// let safetyArrayFour = [13, 14, 33, 34]
// let safetyArrayFive = [17, 18, 37, 38]

// function addSafety(position) {
//   cells[safetyArrayOne].classList.add(safetyPadClass)
  
// }
// addSafety()
// // console.log(addSafety(safetyArrayOne))


// function startGame() {
  


