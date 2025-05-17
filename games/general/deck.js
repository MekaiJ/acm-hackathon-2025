const face = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'A', 'J', 'K', 'Q'];
const suit = ['hearts', 'spades', 'clubs', 'diamonds'];
const back = document.getElementById('assets/card/card_back');

class deck {

    genDeck() {

        let faceNum = 0;
        let suitNum = 0;
        const temp = [];

        for (let i = 0; i < 52; i++) {

            //should fit the 
            const item = new card(face[faceNum], suit[suitNum], document.getElementById('assets/card_' + suit[suitNum] + "_" + face[faceNum]));
            temp[i] = item;

            faceNum += 1; 
            if (faceNum == 13) {

                suitNum += 1;
                faceNum = 0;

            }

        }

        return temp;

    }

    shuffle() {

        for (let i = this.contents.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i+1));
            [this.contents[i], this.contents[j]] = [this.contents[j], this.contents[i]];

        }

    }

    printDeck() {

        console.log('Printing Deck');

        for (let i = this.contents.length - 1; i >= 0; i--) {

            console.log(i+1 + ": " + this.contents[i].printCard());

        }

    }

    draw() {

        console.log('Drawing Card');
        return this.contents.pop();

    }

    constructor() {
        
        this.contents = [];

    }

}

class card {

    printCard() {
        return this.face + " of " + this.suit;
    }

    constructor(face, suit) {
        this.face = face;
        this.suit = suit;
    }

}