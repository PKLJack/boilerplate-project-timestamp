// index.js
// where your node app starts

//console.log(process.env)

// init project
var express = require("express")
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors")
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html")
})

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" })
})

app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date

  // Current time
  if (dateParam === undefined) {
    const now = new Date()
    return res.json({
      unix: Number(now),
      utc: now.toUTCString(),
    })
  }

  // Provided time
  let date

  if (dateParam.includes("-")) {
    date = new Date(dateParam)
  } else {
    date = new Date(Number(dateParam))
  }

  // Invalid
  if (date.toString() === "Invalid Date") {
    return res.json({
      error: "Invalid Date",
    })
  }

  // Valid
  return res.json({
    unix: Number(date),
    utc: date.toUTCString(),
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port)
})
