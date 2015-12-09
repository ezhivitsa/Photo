var express = require('express');
var multiparty = require('connect-multiparty');
var mv = require('mv');
var path = require('path');

var join = path.join;
var router = express.Router();
var dir = '';

var Photo = require('../lib/models/photo');

var fileNameRegexp = /(.+)\.(.+)$/,
	getFileName = function (name) {
		var match = name.match(fileNameRegexp);
		return {
			name: match[1],
			extension: match[2]
		};
	};

var saveFile = function (req, res, file, filename, id, next) {
	mv(file.path, join(dir, id + '.' + filename.extension), function (err) {
		if (err) return next(err);
		res.redirect('/');
	});
};

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('upload', {
		title: 'Image upload'
	});
});

router.post('/', multiparty(), function (req, res, next) {
	var file = req.files.photo.file,
		filename = getFileName(file.originalFilename);
	filename.name = req.body.photo.name || filename.name;

	var photo = new Photo({ 
		name: filename.name,
		extension: filename.extension
	});
	photo.save(function (err, savedPhoto) {
		if (err) return next(err);
		saveFile(req, res, file, filename, savedPhoto.id, next);
	});
});

module.exports = function (directory) {
	dir = directory;
	return router;
};
