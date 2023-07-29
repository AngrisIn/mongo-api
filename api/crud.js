const express = require("express")
const app = express()
const router = express.Router()
const Video = require("../schemas/VideoSchema")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

router.get("/", (_, res) => {
	res.send({ message: "VIDEO CRUD API Online" })
})

router.get("/all", async (_, res) => {
	let videos = await Video.find({})
	res.send(videos)
})

router.get("/get/:uuid", async (req, res) => {
	let uuid = req.params.uuid
	let video = await Video.findOne({ uuid: uuid })
	res.send(video)
})

router.post("/create", async (req, res) => {
	let { uuid, episodeSynopsis, episodeType, episodeTitle, duration } = req.body

	if (!uuid || !episodeSynopsis || !episodeType || !episodeTitle) {
		return res.status(400).send({ message: "Missing required fields" })
	}

	let video = await Video.findOne({ uuid: uuid })
	if (video) {
		return res.status(400).send({ message: "Video already exists" })
	}

	let newVideo = await Video.create({
		uuid: uuid,
		episodeSynopsis: episodeSynopsis,
		episodeType: episodeType,
		episodeTitle: episodeTitle,
		duration: duration !== undefined ? duration : "1.5",

	})

	res.send(newVideo)
})

router.put("/update/:uuid", async (req, res) => {
	let uuid = req.params.uuid
	let { episodeSynopsis, episodeType, episodeTitle, duration } = req.body

	if (!uuid || !episodeSynopsis || !episodeType || !episodeTitle) {
		return res.status(400).send({ message: "Missing required fields" })
	}

	let video = await Video.findOne({ uuid: uuid })
	if (!video) {
		return res.status(400).send({ message: "Video does not exist" })
	}

	video = await Video.findOneAndUpdate(
		{ uuid: uuid },
		{
			episodeSynopsis: episodeSynopsis,
			episodeType: episodeType,
			episodeTitle: episodeTitle,
			duration: duration !== undefined ? duration : "1.5",
		},
		{ new: true }
	)

	res.send(video)
})

module.exports = router
