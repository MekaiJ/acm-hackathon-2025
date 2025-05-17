
class hand {

    printHand() {
        console.log("Count: " + grip.contents.length)

        for (let i = this.contents.length - 1; i >= 0; i--) {

            console.log(i+1 + ": " + this.contents[i].printCard());

        }
    }

    printHouse() {
        console.log("House Count: " + grip.contents.length)

        for (let i = this.contents.length - 1; i >= 0; i--) {

            console.log("House " + i+1 + ": " + this.contents[i].printCard());

        }
    }
    
    constructor() {
        this.contents = [];
    }

}