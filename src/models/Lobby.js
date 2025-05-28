class Lobby {
  constructor(playerId) {
    this.players = [playerId];
  }

  addPlayer(userId) {
    if (!this.players.includes(userId)) {
      this.players.push(userId);
    }
  }

  removePlayer(userId) {
    this.players = this.players.filter(p => p !== userId);
    return this.players.length === 0;
  }
}

module.exports = Lobby;
