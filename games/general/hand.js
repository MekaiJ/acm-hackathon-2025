class hand {

    printHand() {
        const playerContainer = document.getElementById('player-cards');
        playerContainer.innerHTML = '';
        document.getElementById('player-points').textContent = "Points: " + points;

        for (let i = 0; i < this.contents.length; i++) {
            const card = this.contents[i];
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = `
                <div><strong>${card.face}</strong></div>
                <div>${card.suit}</div>
            `;
            playerContainer.appendChild(cardDiv);
        }
    }

    printHouse() {
        const houseContainer = document.getElementById('house-cards');
        houseContainer.innerHTML = '';
        document.getElementById('house-points').textContent = "House Points: " + hPoints;

        for (let i = 0; i < this.contents.length; i++) {
            const card = this.contents[i];
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = `
                <div><strong>${card.face}</strong></div>
                <div>${card.suit}</div>
            `;
            houseContainer.appendChild(cardDiv);
        }
    }

    constructor() {
        this.contents = [];
    }

}
