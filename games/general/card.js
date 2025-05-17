class card {

    printCard() {
        return this.face + " of " + this.suit;
    }

    constructor(face, suit) {
        this.face = face;
        this.suit = suit;
    }

}