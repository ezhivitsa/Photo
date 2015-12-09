var mongoose = require('mongoose');

var PhotoSchema = mongoose.Schema({
    name: String,
    extension: String
});

var Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;