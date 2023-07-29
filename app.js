let dotenv = require("dotenv")
dotenv.config()


let express = require("express")
require('express-async-errors')

require("./database")
let app = express()
let cors = require('cors')
let port = process.env.PORT || 4003

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.get("/", (_, res) => {
	res.status(200).json({ message: "TTS Server Online" })
})