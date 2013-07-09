/**
 * 基于host资源访问的基本功能
 */

var Path = require('path'),
	mime = require('mime'),
	connect = require('connect'),
	utils = require('../utils');


/**
 * Options:
 *	`root`	根目录
 */
module.exports = function(req, res, next) {
	var config = req.config;
	config.root ? 
		process(req, res, next, config) :
		next();
};


function process(req, res, next, config) {
	req.filepath = Path.join(config.root, req.url.replace(/\?.*$/, ''));
	req.fileext = Path.extname(req.filepath);

	if (req.fileext === '.htm' || req.fileext === '.html') {
		console.log(req.fileext);
		res.setHeader('Content-Type', 'text/html');
	}

	res.setHeader('File-Path', req.filepath);

	var app = connect()
		.use(connect.directory(config.root))
		.use(connect.static(config.root));

	app(req, res, next);
}

