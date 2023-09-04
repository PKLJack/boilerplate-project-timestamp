// index.js
// where your node app starts

// require("dotenv").config()
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
  console.log(req.params)

  // No  input -> undefined -> now
  // Yes input -> parse     -> timestamp -> Valid date
  //                        -> NaN       -> Invalid date

  // Current time
  if (req.params.date === undefined) {
    const now = new Date()
    return res.json({
      unix: Number(now),
      utc: now.toUTCString(),
    })
  }

  // Not current time
  const parseResult = Date.parse(req.params.date)

  // Invalid
  if (isNaN(parseResult)) {
    return res.json({
      error: "Invalid Date",
    })
  }

  // Valid
  const date = new Date(parseResult)
  return res.json({
    unix: Number(date),
    utc: date.toUTCString(),
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port)
})
