const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaderboardSchema = new Schema({
    map_id : { type: Schema.Types.ObjectId, ref: 'Maps', required: true, },
    user_id : { type: Schema.Types.ObjectId, ref: 'Users', required: true, },
    score : { type: Schema.Types.Number, required: true, },
})

const Leaderboard = mongoose.model('Leaderboard', LeaderboardSchema);

module.exports = Leaderboard;