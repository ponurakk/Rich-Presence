const config = require('./config.json');
const client = require('discord-rich-presence')(config.clientId);
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
var song = "undefined";
var artist = "undefined";
var album = "undefined";
var time = 0;
var albums = [];

async function songFunc() {
	try {
		const { stdout, stderr } = await exec(config.songCmd);
		song = stdout;
	} catch (e) {
		console.error(e)
	}
}
async function artistFunc() {
	try {
		const { stdout, stderr } = await exec(config.artistCmd);
		artist = stdout;
	} catch (e) {
		console.error(e)
	}
}
async function albumFunc() {
	try {
		const { stdout, stderr } = await exec(config.albumCmd);
		album = stdout;
	} catch (e) {
		console.error(e)
	}
}
async function currentTime() {
	try {
		const { stdout, stderr } = await exec(config.currentTimeCmd);
		time = stdout;
	} catch (e) {
		console.error(e)
	}
}
function replaceDc(item) {
	item = item.trim().toLowerCase()

	var regex = /\W/gi

	arr = item.split('');

	for (var i = 0; i < arr.length; i++) {
		if (arr[i].match(regex)) {
			arr[i] = "_";
		} else if (arr[i] == "_") {
			arr[i] = "=";
		}
	}

	item = arr.join('');
	for (var i = 0; i < item.length*2; i++) {
		item = item.replaceAll("__", "_");
	}
	for (var i = 0; i < item.length; i++) {
		item = item.replaceAll("=", "_");
	}
	return item;
}
function readDir() {
	if (config.useImg) {
		fs.readdir(config.imgDir, function (err, files) {
			if (err) throw err;
			let images = [];
			files.forEach(item => {
				let image = item.split(".");
				image.splice(-1);
				image = image.join('')
				image = replaceDc(image)
				images.push(image)
			});

			albums = images;
		});
	} else {
		if (config.covers.length > 0) {
			let images = [];
			config.covers.forEach(item => {
				let image = replaceDc(item)
				images.push(image)
			});
			albums = images
		} else {
			console.error("You must give at least one album cover");
		}
	}
}

readDir();

setInterval(() => {
	songFunc();
	artistFunc();
	albumFunc();
	currentTime();

	console.clear();

	let tmp_album = replaceDc(album);
	let cover = config.default;

	if (albums.includes(tmp_album)) {
		cover = tmp_album.trim()
	}
	if (album.length < 2) {
		album = "No Album"
	}

	console.log(`Song: ${song}`);
	console.log(`Artist: ${artist}`);
	console.log(`Time: ${time}`);
	console.log(`Album: ${album}`);
	console.log(`Cover: ${cover}\n`);
	console.log(`Timestamp:`);
	console.log(Math.round(Date.now()/1000)-time);
	client.updatePresence({
		state: `Artist: ${artist}`,
		details: `Song: ${song}`,
		startTimestamp: Math.round(Date.now()/1000)-time,
		largeImageKey: cover,
		largeImageText: album,
		smallImageKey: 'moc',
		smallImageText: "Music on console",
		instance: true
	});

}, 1000);

console.log("Rich Presence Started");
