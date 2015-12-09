var express = require('express');
var router = express.Router();

var Photo = require('../lib/models/photo');

/* GET home page. */
router.get('/', function(req, res, next) {
	Photo
		.find({})
		.exec(function (err, photos) {
			if (err) return next(err);
			photos = photos.map(function (photo) {
				return {
					title: photo.name,
					src: photo._id + '.' + photo.extension,
					id: photo._id
				};
			});

			res.render('index', {
				title: 'Photos',
				photos: photos
			});
		});
});

module.exports = router;
