function createPlayer(name, health, strength, attack) {
    return {
        name,
        health,
        strength,
        attack,
        isAlive: function () {
            return this.health > 0;
        },
        takeDamage: function (damage) {
            this.health -= damage;
            if (this.health < 0) {
                this.health = 0;
            }
        }
    };
}

module.exports = createPlayer;
