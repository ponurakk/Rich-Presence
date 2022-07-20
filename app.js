const client = require('discord-rich-presence')('discord-app-id');
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
		const { stdout, stderr } = await exec('mocp --format %song');
		song = stdout;
	} catch (e) {
		console.error(e)
	}
}
async function artistFunc() {
	try {
		const { stdout, stderr } = await exec('mocp --format %artist');
		artist = stdout;
	} catch (e) {
		console.error(e)
	}
}
async function albumFunc() {
	try {
		const { stdout, stderr } = await exec('mocp --format %album');
		album = stdout;
	} catch (e) {
		console.error(e)
	}
}
async function currentTime() {
	try {
		const { stdout, stderr } = await exec('mocp --format %cs');
		time = stdout;
	} catch (e) {
		console.error(e)
	}
}
function replaceDc(item) {
	item = item.toLowerCase()
				.replaceAll(" ", "_")
				.replaceAll(".", "_")
				.replaceAll("ę", "_")
				.replaceAll("ó", "_")
				.replaceAll("ą", "_")
				.replaceAll("ś", "_")
				.replaceAll("ł", "_")
				.replaceAll("ż", "_")
				.replaceAll("ź", "_")
				.replaceAll("ć", "_")
				.replaceAll("ń", "_");

	// For repeated invalid characters
	for (var i = 0; i < 10; i++) {
		item = item.replaceAll("__", "_");
	}
	return item;
}
function readDir() {
	fs.readdir("/home/ponurakk/Public/Album covers", function (err, files) {
		if (err) throw err;
		let images = [];
		files.forEach((item, i) => {
			let image = item.slice(0, -5);
			image = replaceDc(image)
			images.push(image)
		});

		albums = images;
	});
}

readDir();

setInterval(() => {
	songFunc();
	artistFunc();
	albumFunc();
	currentTime();

	console.clear();


	let tmp_album = replaceDc(album);
	let cover = "default";

	if (albums.includes(tmp_album.trim())) {
		cover = tmp_album.trim()
	}
	if (album.length < 2) {
		album = "No Album"
	}

	console.log(`Song: ${song}`);
	console.log(`Artist: ${artist}`);
	console.log(`Time: ${time}`);
	console.log(`Album: ${album}`);
	console.log(`Cover ${cover}`);
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
