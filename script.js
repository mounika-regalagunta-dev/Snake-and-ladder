let players = [
  { name: 'Aarushi', color: "goldenrod", score: 0 },
  { name: 'Riya', color: "purple", score: 0 },
  { name: 'Thanvi', color: "limegreen", score: 0 },
  { name: 'Vyshu', color: "dodgerblue", score: 0 }
];

const snakes = {
  40: 3,
  43: 18,
  27: 5,
  54: 31,
  66: 45,
  76: 58,
  99: 41,
  89: 53
};

const ladders = {
  4: 25,
  13: 46,
  33: 49,
  50: 69,
  42: 63,
  62: 81,
  74: 92
};

// Create board
let board = document.getElementById("board");
for (let row = 10; row >= 1; row--) {
  if (row % 2 === 0) {
    for (let col = 10; col >= 1; col--) {
      let num = (row - 1) * 10 + col;
      let div = document.createElement("div");
      div.classList = "cell";
      div.id = `cell${num}`;
      div.textContent = num;
      board.appendChild(div);
    }
  } else {
    for (let col = 1; col <= 10; col++) {
      let num = (row - 1) * 10 + col;
      let div = document.createElement("div");
      div.classList = "cell";
      div.id = `cell${num}`;
      div.textContent = num;
      board.appendChild(div);
    }
  }
}

// Create player buttons
let buttonContainer = document.getElementById("buttons");

players.forEach(player => {
  let btn = document.createElement("button");
  btn.textContent = `${player.name} ${player.score}`;
  btn.style.backgroundColor = player.color;
  btn.classList = "btn";

  btn.onclick = function () {
    let dice = Math.ceil(Math.random() * 6);
    alert(`🎲 ${player.name} takes the roll... and it’s a **${dice}**!`);

    // Keep rolling if dice = 6
    while (dice === 6) {
      alert(`✨ Jackpot! ${player.name} got a **6** — that means an **extra roll**!`);
      dice = Math.ceil(Math.random() * 6);
      alert(`🎲 Extra roll for ${player.name}: **${dice}**`);
    }

    let oldToken = document.getElementById(`person${player.name}`);
    if (oldToken) oldToken.remove();

    player.score += dice;
    if (player.score > 100) player.score = 100;

    if (snakes[player.score]) {
      alert(`🐍 Oh no! A sneaky snake caught ${player.name} — sliding down to **${snakes[player.score]}**`);
      player.score = snakes[player.score];
    }

    if (ladders[player.score]) {
      alert(`🪜 Awesome! ${player.name} found a ladder and climbs straight up to **${ladders[player.score]}** 🚀`);
      player.score = ladders[player.score];
    }

    btn.textContent = `${player.name} ${player.score}`;

    let token = document.createElement("div");
    token.classList = "person";
    token.id = `person${player.name}`;
    token.style.backgroundColor = player.color;

    let parentCell = document.getElementById(`cell${player.score}`);
    if (parentCell) parentCell.appendChild(token);

    // WIN CONDITION 🎉
    if (player.score === 100) {
      setTimeout(() => { 
        alert(`🏆 Hurray! ${player.name} has reached **100**. What a climb — crowned the Champion of Snakes & Ladders! 🎉🥳`); 
      }, 200);
      return;
    }
  };

  buttonContainer.appendChild(btn);
});



