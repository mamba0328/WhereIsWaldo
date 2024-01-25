const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    map_id : { type: Schema.Types.ObjectId, ref: 'Maps', required: true, },
    user_id : { type: Schema.Types.ObjectId, ref: 'Users', required: true, },
    score : { type: Schema.Types.Number, required: true, },
})

const Leaderboard = mongoose.model('Score', ScoreSchema);

module.exports = Leaderboard;