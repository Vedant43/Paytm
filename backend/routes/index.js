//app can definately be used without using router but for better structure router is used, Router is used in defining prefix (url that is fixed). Suppose /xyz does something but in future we need xyz need to do something other stuff then api/v1 and api.v2 would have come handy

const express = require('express');

const router = express.Router();

//now router.get() is enough
// const userRouter = require("./user")
// router.use("/user", userRouter)

module.exports = router;