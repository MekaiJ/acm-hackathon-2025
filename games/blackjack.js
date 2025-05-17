//deck
const pile = new deck();
//hands
const grip = new hand();
const house = new hand();

//has the player lost
let bust = false;
let hBust = false;

//first over 21 loses
//If the player presses "Hold", the ai will either hold or hit depending on its AI.
let points = 0;
let hPoints = 0;

/*
Value of each card, if the player holds an Ace (or multiple) and breaks 21, it will
cycle through the hand, changing one ace at a time from 11 to 1 points until it either can't
cycle anymore or gets back under/equal 21.*/ 
let value = {

    '02': 2,
    '03': 3,
    '04': 4,
    '05': 5,
    '06': 6,
    '07': 7,
    '08': 8,
    '09': 9,
    '10': 10,
    'A': 11,
    'J': 10,
    'K': 10,
    'Q': 10

};

//Game
var blackjack = {

    //Starts the game
    boot() {

        //Generate and shuffle a deck of 52 cards (no jokers)
        pile.contents = pile.genDeck();
        pile.shuffle();

        //Draws two cards for both players
        grip.contents[grip.contents.length] = pile.draw();
        house.contents[house.contents.length] = pile.draw();
        grip.contents[grip.contents.length] = pile.draw();
        house.contents[house.contents.length] = pile.draw();

        //Calculates point values for both players.
        points = this.calculateValue(grip);
        hPoints = this.calculateValue(house);
        if (points > 21) {
            console.log("Bust!");
        }else if(hPoints > 21) {
            console.log("House Bust!");
        }

        //Prints the hands and points
        grip.printHand();
        house.printHouse();
        console.log("Points: " + points);
        console.log("House Points: " + hPoints);

    },

    //Calculate the points in a hand -> returns that value
    calculateValue(val) {

        num = 0;
        //Add the value of all cards in hand
        for (let i = val.contents.length-1; i >= 0; i--) {
            num += value[val.contents[i].face];
        }

        //If the hand is over 21, search the hand for an Ace. If there is one, 
        //change its value to 1 and then break the loop.
        if (num > 21) {

            for (let i = val.contents.length-1; i > 0; i--) {

                if (val.contents[i].face == 'A') {
                    num -= 10;
                    break;
                }

            }

        }
        return num;

    },
    
    //The function called when the "Hit me" button is pressed
    hitMe() {

        //draw a card, add the cards value to the point total, and then prints the hand.
        const card = pile.draw();
        grip.contents[grip.contents.length] = card;
        points = this.calculateValue(grip);
        grip.printHand();

        //Loss check
        if (points > 21) {
            console.log("Bust!");
        }


        this.houseCheck();
        console.log("Points: " + points);
        console.log("House Points: " + hPoints);
        
    },

    //A function that governs whether or not the House should hit or hold.
    houseCheck() {

        if (hPoints <= 11) {
            this.aiHit();
            return true;
        }else if(12 <= hPoints && hPoints <= 16 && this.playerCheck()){
            this.aiHit();
            return true;
        }else{
            return false;
        }

    },

    //Used to check if the player has a card of value 7 or higher showing.
    playerCheck() {

        for (let i = grip.contents.length -1; i >= 0; i--) {
            if (value[grip.contents[i].face] >= 7) {
                return true;
            }
        }
        return false;

    },

    //The AI calls a hit.
    aiHit() {

        //draws a card, adds it to the hand, calculates the hands value, then prints the hand.
        const card = pile.draw();
        house.contents[house.contents.length] = card;
        hPoints = this.calculateValue(house);
        house.printHouse();

        if (hPoints > 21) {
            console.log("House Bust!");
        }

    },
    
    //The player Holds.
    hold() {
        //Loops through house check until the AI holds.
        while (this.houseCheck()) {

        }
        console.log("Points: " + points);
        console.log("House Points: " + hPoints);
        
        //Who Wins?
        if (points == hPoints) {
            console.log("Tie!");
        }else if (points > hPoints) {
            console.log("You win!");
        }else {
            console.log("You Lose!");
        }
    }

}