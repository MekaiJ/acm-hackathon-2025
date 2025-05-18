class Card {
  constructor(face, suit) {
    this.face = face;
    this.suit = suit;
  }

  printCard() {
    return this.face + " of " + this.suit;
  }
}

class Deck {
  constructor() {
    this.contents = [];
  }

  genDeck() {
    const suits = ["♠", "♥", "♦", "♣"];
    const faces = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];
    const cards = [];

    for (let suit of suits) {
      for (let face of faces) {
        cards.push(new Card(face, suit));
      }
    }

    return cards;
  }

  shuffle() {
    for (let i = this.contents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.contents[i], this.contents[j]] = [this.contents[j], this.contents[i]];
    }
  }

  draw() {
    return this.contents.pop();
  }
}

class Hand {
  constructor(owner) {
    this.contents = [];
    this.owner = owner; // "player" or "house"
  }

  print() {
    const container = document.getElementById(`${this.owner}-cards`);
    container.innerHTML = "";
    for (let card of this.contents) {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.innerHTML = `<div>${card.face}</div><div>${card.suit}</div>`;
      container.appendChild(cardDiv);
    }
  }

  add(card) {
    this.contents.push(card);
    this.print();
  }

  getPoints() {
    const valueMap = {
      "02": 2, "03": 3, "04": 4, "05": 5, "06": 6, "07": 7,
      "08": 8, "09": 9, "10": 10, "J": 10, "Q": 10, "K": 10, "A": 11
    };

    let total = 0;
    let aces = 0;

    for (let card of this.contents) {
      total += valueMap[card.face];
      if (card.face === "A") aces++;
    }

    while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
    }

    return total;
  }

  updatePointsDisplay() {
    document.getElementById(`${this.owner}-points`).textContent =
      (this.owner === "player" ? "Points: " : "House Points: ") + this.getPoints();
  }
}

const deck = new Deck();
deck.contents = deck.genDeck();
deck.shuffle();

const playerHand = new Hand("player");
const houseHand = new Hand("house");

const blackjack = {
  start() {
    playerHand.add(deck.draw());
    houseHand.add(deck.draw());
    playerHand.add(deck.draw());
    houseHand.add(deck.draw());

    playerHand.updatePointsDisplay();
    houseHand.updatePointsDisplay();
  },

  hitMe() {
    playerHand.add(deck.draw());
    playerHand.updatePointsDisplay();

    if (playerHand.getPoints() > 21) {
      document.getElementById("status").textContent = "You busted!";
    } else {
      this.houseTurn();
    }
  },

  hold() {
    while (houseHand.getPoints() < 17) {
      houseHand.add(deck.draw());
    }

    houseHand.updatePointsDisplay();
    this.checkWinner();
  },

  houseTurn() {
    if (houseHand.getPoints() < 17) {
      houseHand.add(deck.draw());
      houseHand.updatePointsDisplay();

      if (houseHand.getPoints() > 21) {
        document.getElementById("status").textContent = "House busted! You win!";
      }
    }
  },

  checkWinner() {
    const playerPoints = playerHand.getPoints();
    const housePoints = houseHand.getPoints();

    if (playerPoints > 21) {
      document.getElementById("status").textContent = "You busted!";
    } else if (housePoints > 21) {
      document.getElementById("status").textContent = "House busted! You win!";
    } else if (playerPoints > housePoints) {
      document.getElementById("status").textContent = "You win!";
    } else if (playerPoints < housePoints) {
      document.getElementById("status").textContent = "House wins!";
    } else {
      document.getElementById("status").textContent = "It's a tie!";
    }
  }
};

window.onload = () => {
  blackjack.start();
  document.getElementById("hit").onclick = () => blackjack.hitMe();
  document.getElementById("hold").onclick = () => blackjack.hold();
};
