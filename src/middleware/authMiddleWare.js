const admin = require('../config/firebase-config');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({message: 'Missing or invalid token'});
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    res.status(401).json({message: 'Unauthorized'});
  }
};
