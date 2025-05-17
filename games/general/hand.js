class hand {

    printHand() {
        console.log("Count: " + this.contents.length);

        const container = document.getElementById('player-cards');
        container.innerHTML = '';

        for (let i = this.contents.length - 1; i >= 0; i--) {
            console.log(i + 1 + ": " + this.contents[i].printCard());

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.textContent = this.contents[i].face;
            container.appendChild(cardDiv);
        }

        const points = blackjack.calculateValue(this);
        document.getElementById('player-points').textContent = "Points: " + points;
    }

    printHouse() {
        console.log("House Count: " + this.contents.length);

        const container = document.getElementById('house-cards');
        container.innerHTML = '';

        for (let i = this.contents.length - 1; i >= 0; i--) {
            console.log("House " + (i + 1) + ": " + this.contents[i].printCard());

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.textContent = this.contents[i].face;
            container.appendChild(cardDiv);
        }

        const hPoints = blackjack.calculateValue(this);
        document.getElementById('house-points').textContent = "House Points: " + hPoints;
    }

    constructor() {
        this.contents = [];
    }
}
