const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VideoSchema = new Schema({
	
    uuid: { type: String, required: true, unique: true },
    episodeSynopsis: { type: String, required: true },
    episodeType: { type: String, required: true },
    episodeTitle: { type: String, required: true }

}, { timestamps: true });

let Video = mongoose.model('Video', VideoSchema)
module.exports = Video;