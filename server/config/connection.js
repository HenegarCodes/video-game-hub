const { connect, connection } = require('mongoose');

// const connectionString = 'mongodb+srv://bkness:ziggy@cluster0.pf0alen.mongodb.net/game_db'
 
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/game_db'
  );

module.exports = connection;
