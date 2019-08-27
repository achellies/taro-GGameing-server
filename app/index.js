var express = require("express")
var router = express.Router()
const user = require("./controllers/user")
const keepList = require("./controllers/keepList")
const messages = require("./controllers/messages")
const shell = require("./controllers/shell")
const appleid = require("./controllers/appleidList")

// user

/* GET home page. */
router.get("/a", (req, res) => res.send("Hello World! aaa"))
router.post("/api/v1/addUser", user.addUser)
router.post("/api/v1/addKeepItem", keepList.addKeepItem)
router.get("/api/v1/keepList", keepList.keepList)
router.post("/api/v1/updateStatus", keepList.updateStatus)
router.get("/api/v1/messageList", messages.messageList)
router.post("/api/v1/sendMessage", messages.sendMessage)
router.post("/api/doshell", shell.doshell)
router.get("/api/appleidList", appleid.appleidList)

module.exports = router
