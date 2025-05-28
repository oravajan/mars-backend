const {v4: uuidv4} = require('uuid');

const Lobby = require('../models/Lobby');
const lobbies = new Map();

function removeFromPrev(userId) {
  for (const [id, lobby] of lobbies.entries()) {
    if (lobby.removePlayer(userId)) {
      lobbies.delete(id);
      break;
    }
  }
}

exports.createLobby = (req, res) => {
  try {
    const userId = req.user.uid;
    removeFromPrev(userId);

    const id = uuidv4();
    const lobby = new Lobby(userId);
    lobbies.set(id, lobby);

    res.status(201).json({
      message: 'Lobby created',
    });
  } catch (error) {
    console.error('Error creating lobby:', error);
    res.status(500).json({message: 'Failed to create lobby'});
  }
};

exports.joinLobby = (req, res) => {
  const {id} = req.body;
  if (!lobbies.has(id))
    return res.status(404).json({message: 'Lobby not found'});

  const userId = req.user.uid;
  removeFromPrev(userId);
  lobbies.get(id).addPlayer(userId);
  res.status(201).json({
    message: 'Joined lobby',
  });
};

exports.listLobbies = (req, res) => {
  const allLobbies = Array.from(lobbies, ([id, lobby]) => ({
    id: id,
    players: lobby.players,
  }));

  res.json(allLobbies);
};

