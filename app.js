const board = document.getElementById("board")
const player_score = document.getElementById("player-score")
const ties_score = document.getElementById("ties-score")
const ai_score = document.getElementById("ai-score")
const player_icon = document.getElementById("player-icon")
const ai_icon = document.getElementById("ai-icon")
const player_turn = document.getElementById("player-turn")
const ai_turn = document.getElementById("ai-turn")

//Global variables
let occupied_spaces
let available_spaces
let player_letter
let player_image
let ai_letter
let ai_image
let player_points = 0
let ai_points = 0
let ties_points = 0
let body


function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function check_if_win(letter) {
  if (occupied_spaces[0] == letter && occupied_spaces[1] == letter && occupied_spaces[2] == letter) {
    body[0].style.backgroundColor = "yellow"
    body[1].style.backgroundColor = "yellow"
    body[2].style.backgroundColor = "yellow"
    return true
  }
  else if (occupied_spaces[3] == letter && occupied_spaces[4] == letter && occupied_spaces[5] == letter) {
    body[3].style.backgroundColor = "yellow"
    body[4].style.backgroundColor = "yellow"
    body[5].style.backgroundColor = "yellow"
    return true
  }
  else if (occupied_spaces[6] == letter && occupied_spaces[7] == letter && occupied_spaces[8] == letter) {
    body[6].style.backgroundColor = "yellow"
    body[7].style.backgroundColor = "yellow"
    body[8].style.backgroundColor = "yellow"
    return true
  }
  else if (occupied_spaces[0] == letter && occupied_spaces[3] == letter && occupied_spaces[6] == letter) {
    body[0].style.backgroundColor = "yellow"
    body[3].style.backgroundColor = "yellow"
    body[6].style.backgroundColor = "yellow"
    return true
  }
  else if (occupied_spaces[1] == letter && occupied_spaces[4] == letter && occupied_spaces[7] == letter) {
    body[1].style.backgroundColor = "yellow"
    body[4].style.backgroundColor = "yellow"
    body[7].style.backgroundColor = "yellow"
    return true
  }
  else if (occupied_spaces[2] == letter && occupied_spaces[5] == letter && occupied_spaces[8] == letter) {
    body[2].style.backgroundColor = "yellow"
    body[5].style.backgroundColor = "yellow"
    body[8].style.backgroundColor = "yellow"
    return true
  }
  else if (occupied_spaces[0] == letter && occupied_spaces[4] == letter && occupied_spaces[8] == letter) {
    body[0].style.backgroundColor = "yellow"
    body[4].style.backgroundColor = "yellow"
    body[8].style.backgroundColor = "yellow"
    return true
  }
  else if (occupied_spaces[2] == letter && occupied_spaces[4] == letter && occupied_spaces[6] == letter) {
    body[2].style.backgroundColor = "yellow"
    body[4].style.backgroundColor = "yellow"
    body[6].style.backgroundColor = "yellow"
    return true
  }
  else {
    return false
  }
}

function set_ai() {
  ai_turn.style.visibility = "hidden"
  player_turn.style.visibility = "visible"
  let index = parseInt(choose(available_spaces))
  available_spaces = available_spaces.filter(item => item != index.toString())
  occupied_spaces[index] = ai_letter
  body[index].style.backgroundImage = ai_image
  body[index].removeEventListener("click", set_player)
  if (check_if_win(ai_letter)) {
    Swal.fire({
      title: 'AI Wins! ',
      showCancelButton: true,
      confirmButtonText: 'Play Again',
    }).then((result) => {
      if (result.isConfirmed) {
        reset()
      }
    })
    ai_points += 1
    ai_score.innerHTML = ai_points
    return
  }
  if (available_spaces.length == 0) {
    Swal.fire({
      title: 'Draw! ',
      showCancelButton: true,
      confirmButtonText: 'Play Again',
    }).then((result) => {
      if (result.isConfirmed) {
        reset()
      }
    })
    ties_points += 1
    ties_score.innerHTML = ties_points
    return
  }

}

const set_player = function (evento) {
  ai_turn.style.visibility = "visible"
  player_turn.style.visibility = "hidden"
  let index = parseInt(this.id)
  available_spaces = available_spaces.filter(item => item != index.toString())
  occupied_spaces[index] = player_letter
  body[index].style.backgroundImage = player_image
  body[index].removeEventListener("click", set_player)
  if (check_if_win(player_letter)) {
    Swal.fire({
      title: 'Player Wins! ',
      showCancelButton: true,
      confirmButtonText: 'Play Again',
    }).then((result) => {
      if (result.isConfirmed) {
        reset()
      }
    })
    player_points += 1
    player_score.innerHTML = player_points
    return
  }
  if (available_spaces.length == 0) {
    Swal.fire({
      title: 'Draw ! ',
      showCancelButton: true,
      confirmButtonText: 'Play Again',
    }).then((result) => {
      if (result.isConfirmed) {
        reset()
      }
    })
    ties_points += 1
    ties_score.innerHTML = ties_points
    return
  }

  setTimeout(() => {
    set_ai()
  }, 500);

}

function decided_who_start() {
  let players = ["player", "ai"]
  let starts = choose(players)
  if (starts == "player") {
    player_letter = "x"
    player_image = "url('images/letter-x.png')"
    player_icon.src = 'images/letter-x.png'
    player_turn.style.backgroundColor = "red"
    ai_letter = "o"
    ai_image = "url('images/letter-o.png')"
    ai_icon.src = 'images/letter-o.png'
    ai_turn.style.backgroundColor = "blue"
    let timerInterval
    Swal.fire({
      title: ' Player Starts',
      timer: 500,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
    })
    ai_turn.style.visibility = "hidden"
    player_turn.style.visibility = "visible"
  }
  else {
    player_letter = "o"
    player_image = "url('images/letter-o.png')"
    player_icon.src = 'images/letter-o.png'
    player_turn.style.backgroundColor = "blue"
    ai_letter = "x"
    ai_image = "url('images/letter-x.png')"
    ai_icon.src = 'images/letter-x.png'
    ai_turn.style.backgroundColor = "red"
    let timerInterval
    Swal.fire({
      title: ' AI Starts',
      timer: 500,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
    })
    set_ai()
  }
}

///initialize
function initialize() {
  occupied_spaces = ["", "", "", "", "", "", "", "", ""]
  available_spaces = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]
  player_letter = ""
  player_image = ""
  ai_letter = ""
  ai_image = ""
  body = []

  /* Create Board Elements */
  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("div")
    cell.id = i
    cell.addEventListener("click", set_player);
    board.appendChild(cell)
    body.push(cell)
  }
}

///reset
function reset() {
  //clear board
  while (board.hasChildNodes()) {
    board.removeChild(board.firstChild);
  }

  initialize()
  decided_who_start()
}

window.onload = function () {
  initialize()
  decided_who_start()
}

