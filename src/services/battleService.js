const { rollDice } = require('./diceService');

function calculateDamage(attacker, defender) {
    const attackRoll = rollDice();
    const defenseRoll = rollDice();
    const attackDamage = attacker.attack * attackRoll;
    const defenseValue = defender.strength * defenseRoll;
    const damageDealt = Math.max(0, attackDamage - defenseValue);
    defender.takeDamage(damageDealt);
    return {
        attacker: attacker.name,
        attackRoll,
        attackDamage,
        defender: defender.name,
        defenseRoll,
        defenseValue,
        damageDealt,
        defenderHealth: defender.health
    };
}

function determineFirstAttacker(playerA, playerB) {
    if (playerA.health < playerB.health) {
        return [playerA, playerB];
    } else if (playerA.health > playerB.health) {
        return [playerB, playerA];
    } else {
        const coinToss = Math.floor(Math.random() * 2);
        return coinToss === 0 ? [playerA, playerB] : [playerB, playerA];
    }
}

function battle(playerA, playerB) {
    let [firstAttacker, secondAttacker] = determineFirstAttacker(playerA, playerB);
    console.log(`${firstAttacker.name} attacks first.`);

    while (playerA.isAlive() && playerB.isAlive()) {
        if (playerA.health === playerB.health) {
            [firstAttacker, secondAttacker] = determineFirstAttacker(playerA, playerB);
        }

        const firstAttackResult = calculateDamage(firstAttacker, secondAttacker);
        console.log(firstAttackResult);
        if (!secondAttacker.isAlive()) break;

        const secondAttackResult = calculateDamage(secondAttacker, firstAttacker);
        console.log(secondAttackResult);
    }

    if (playerA.isAlive()) {
        console.log(`${playerA.name} wins!`);
    } else {
        console.log(`${playerB.name} wins!`);
    }
}

module.exports = { battle, calculateDamage, determineFirstAttacker };
