// -- Import express, mongoose and my own shortURL module
const express = require("express")
const mongoose = require("mongoose")
const ShortUrl = require("./models/shortUrl")

// -- Import environment variables into process global
require("dotenv").config()

// -- Initialise express
const app = express()

// -- Access my mongoose database
mongoose.connect(process.env.mongoDBConnectionString, {
})

// -- Set up view engine to seemlesly carry data into front end
app.set('view engine', 'ejs')

// -- Url encode express
app.use(express.urlencoded({ extended: false }))

// -- Get for index page which shows home page, populates the url if a previous one was added and shows a second input with a shrunk url if needed
app.get("/", async (req, res) => {
        
    // -- If the url was passed to the get, retrieve the host url to prepend to the shrunk string from the db to display full shrunk url to user
    if(req.query.url != null)
    {
        const protocol = req.protocol;
        const host = req.hostname;
        const port = process.env.PORT || 1234;

        var FullhostUrl = `${protocol}://${host}:${port}/`

        res.render('index', {url: req.query.url, ShrunkUrl: FullhostUrl+req.query.ShrunkUrl, Error: null})
    }

    // -- Regular page get so return null for url and shrunk url
    res.render('index', {url: null, ShrunkUrl: null, Error: null})
})

// -- Short url post that creates a db entry to store the users url, the shrunk version and the amount of clicks this url has
app.post("/shortUrls", async (req, res) => {
    try
    {
        await ShortUrl.create({ full: req.body.fullUrl })
    }
    catch(e)
    {
        res.render('index', {url: null, ShrunkUrl: null, Error: e})
    }

    // -- Get the created url to return the short url to the user
    const shortUrl = await ShortUrl.findOne({ full:req.body.fullUrl })

    res.redirect("/?url=" + req.body.fullUrl + "&ShrunkUrl=" + shortUrl.short);
})

// -- Get that provides a page showing a table displaying the database, allowing the user to access previously loaded links
app.get("/dbCopyTable", async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('dbCopyTable', {shortUrls: shortUrls})
})

// -- Route that encapulates anything that has information directly after the first slash (must be last so it doesn't trigger before above routes)
app.get("/:shortUrl", async (req, res) => {

    // -- Grab a short url that matches the string from the users url
    const shortUrl = await ShortUrl.findOne({ short:req.params.shortUrl })

    // -- Check if it exists in the database, if we didn't find it return 404 not found
    if(shortUrl == null) return res.sendStatus(404)

    // -- If we are here it was found so increment clicks and save
    shortUrl.clicks++
    shortUrl.save()

    // -- Redirect to the full url saved in the the database that corresponds with the entered short url 
    res.redirect(shortUrl.full)
})

// -- Listen on the environment port
app.listen(process.env.PORT || 1234);
