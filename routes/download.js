var express = require('express');
var router = express.Router();
var path = require('path');
var join = path.join;

var Photo = require('../lib/models/photo');

var dir = '';

router.get('/:id', function (req, res, next) {
	Photo.findById(req.params.id, function (err, photo) {
		if (err) return next(err);
		var path = join(dir, photo._id + '.' + photo.extension);
		res.download(path, photo.name + '.' + photo.extension);
	});
});

module.exports = function (direction) {
	dir = direction;
	return router;
};