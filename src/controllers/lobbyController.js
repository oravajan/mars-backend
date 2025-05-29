const {v4: uuidv4} = require('uuid');
const {db} = require('../config/firebase-config');

const Lobby = require('../models/Lobby');
const User = require('../models/User');
const lobbies = new Map();
lobbies.set("abc", new Lobby("abc", "hrac1"));
const players = new Map();
players.set("hrac1", new User("hrac1", "email", "tajnyPan"));

function removeFromPrev(userId) {
  for (const [id, lobby] of lobbies.entries()) {
    lobby.removePlayer(userId);
    if (lobby.players.length === 0) {
      lobbies.delete(id);
      break;
    }
  }
}

async function createUser(userId) {
  if (players.has(userId)) return;

  const userDoc = await db.collection('users').doc(userId).get();
  if (!userDoc.exists) {
    throw new Error(`User ID ${userId} does not exist in database`);
  }

  const data = userDoc.data();
  const user = new User(userId, data.email, data.displayName, data.createdAt);
  players.set(userId, user);
}

function getUserDisplayNames(lobbyPlayers) {
  let res = [];
  for (const userId of lobbyPlayers) {
    res.push(players.get(userId).displayName);
  }
  return res;
}

exports.createLobby = async (req, res) => {
  try {
    const userId = req.user.uid;
    removeFromPrev(userId);
    await createUser(userId);

    const id = uuidv4();
    const lobby = new Lobby(id, userId);
    lobbies.set(id, lobby);

    res.status(201).json({
      message: 'Lobby created',
    });
  } catch (error) {
    console.error('Error creating lobby:', error);
    res.status(500).json({message: 'Failed to create lobby'});
  }
};

exports.joinLobby = async (req, res) => {
  const {id} = req.body;
  if (!lobbies.has(id))
    return res.status(404).json({message: 'Lobby not found'});

  const userId = req.user.uid;
  removeFromPrev(userId);
  await createUser(userId);
  lobbies.get(id).addPlayer(userId);
  res.status(201).json({
    message: 'Joined lobby',
  });
};

exports.listLobbies = (req, res) => {
  const uid = req.user?.uid || null;

  const allLobbies = Array.from(lobbies, ([id, lobby]) => ({
    id: id,
    players: getUserDisplayNames(lobby.players),
    isMember: uid ? lobby.players.some(p => p === uid) : false,
  }));

  res.json(allLobbies);
};
