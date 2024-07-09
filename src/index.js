const createPlayer = require('./models/player');
const { battle } = require('./services/battleService');

const playerA = createPlayer('Player A', 50, 5, 10);
const playerB = createPlayer('Player B', 100, 10, 5);

battle(playerA, playerB);
