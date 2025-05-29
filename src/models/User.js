class User {
  constructor(id, email, displayName, createdAt) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.createdAt = createdAt;
    this.inGame = false;
    this.ready = false;
  }
}

module.exports = User;
