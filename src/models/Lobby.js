class Lobby {
  constructor(id, userId) {
    this.id = id;
    this.players = [userId];
  }

  addPlayer(userId) {
    const exists = this.players.find(id => id === userId);
    if (!exists) {
      this.players.push(userId);
    }
  }

  removePlayer(userId) {
    this.players = this.players.filter(id => id !== userId);
  }
}

module.exports = Lobby;
