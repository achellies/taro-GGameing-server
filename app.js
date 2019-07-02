var createError = require("http-errors")
var express = require("express")
var path = require("path")
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var indexRouter = require("./app/index")

var debug = require("debug")("myapp:server")
var http = require("http")

var app = express()
const sideThread = require("./sideThread")

// sideThread.parseJSAsync().then(res => {
//     console.log("object", res)
// })
// sideThread()
// console.log(sideThread, typeof sideThread)

const assert = require("assert")
app.get("/", (req, res) => res.send("Hello World!"))

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json())
app.use(
    express.urlencoded({
        extended: false
    })
)
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")))

app.use(indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render("error")
})

// #!/usr/bin/env node

/**
 * Module dependencies.
 */

// var app = require('../app');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3001")
app.set("port", port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

console.log("Express app started on port " + port)

server.listen(port, "0.0.0.0")
server.on("error", onError)
server.on("listening", onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10)

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= 0) {
        // port number
        return port
    }

    return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges")
            process.exit(1)
            break
        case "EADDRINUSE":
            console.error(bind + " is already in use")
            process.exit(1)
            break
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
    debug("Listening on " + bind)
}

// sideThread()
