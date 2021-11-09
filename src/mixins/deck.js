/**
 * Array of arrays containing 4 groups of playing cards.
 * spades, clubs, diamonds, hearts
 */
export let deck = [
    ['2-clubs', 2],
    ['3-clubs', 3],
    ['4-clubs', 4],
    ['5-clubs', 5],
    ['6-clubs', 6],
    ['7-clubs', 7],
    ['8-clubs', 8],
    ['9-clubs', 9],
    ['10-clubs', 10],
    ['A-clubs', 11],
    ['J-clubs', 10],
    ['Q-clubs', 10],
    ['K-clubs', 10],

    ['2-diamonds', 2],
    ['3-diamonds', 3],
    ['4-diamonds', 4],
    ['5-diamonds', 5],
    ['6-diamonds', 6],
    ['7-diamonds', 7],
    ['8-diamonds', 8],
    ['9-diamonds', 9],
    ['10-diamonds', 10],
    ['A-diamonds', 11],
    ['J-diamonds', 10],
    ['Q-diamonds', 10],
    ['K-diamonds', 10],


    ['2-hearts', 2],
    ['3-hearts', 3],
    ['4-hearts', 4],
    ['5-hearts', 5],
    ['6-hearts', 6],
    ['7-hearts', 7],
    ['8-hearts', 8],
    ['9-hearts', 9],
    ['10-hearts', 10],
    ['A-hearts', 11],
    ['J-hearts', 10],
    ['Q-hearts', 10],
    ['K-hearts', 10],


    ['2-spades', 2],
    ['3-spades', 3],
    ['4-spades', 4],
    ['5-spades', 5],
    ['6-spades', 6],
    ['7-spades', 7],
    ['8-spades', 8],
    ['9-spades', 9],
    ['10-spades', 10],
    ['A-spades', 11],
    ['J-spades', 10],
    ['Q-spades', 10],
    ['K-spades', 10],
];

/**
 * 
 * @returns returns a random number between 0 and 51
 */
export let randomCardIndex = () => {
    return Math.floor(Math.random() * 51 )
}