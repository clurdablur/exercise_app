var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
    username: { type: String, required: true },
    id: { type: Number, required: true },
    wokrout: { type: Object, required: false}
});

var History = mongoose.model('History', HistorySchema);

module.exports = History;