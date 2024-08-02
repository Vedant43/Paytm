const express = require("express")
const zod = require("zod")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config") 
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

const router = express.Router()

const signupBody = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string(),
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

router.post("/signup",async (req,res)=>{
    
    const parsedPayload = signupBody.safeParse(req.body) 

    if(!parsedPayload.success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(401).json({
            message: "Email already taken/Incorrect inputs "
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id

    await Account.create({
        userId,
        balance:1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET)

    console.log(token)

    return res.json({
        message: "User created successfully",
        token:token
    })
})


router.post("/signin", async (req,res)=>{
    const {success} = signinBody.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password    
    })


    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET)

        res.json({
            token
        })
    }
})

router.put("/",authMiddleware, async (req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    
    try {
        await User.updateOne({ _id: req.userId }, req.body);
        res.json({
            message: "User information updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user information"
        })};
})

router.get("/bulk",authMiddleware ,async (req,res)=>{
    const query = req.query.filter || ''
    console.log(req.userId)
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": query
            }
        }, {
            lastName: {
                "$regex": query
            }
        }, 
        ],
        _id : {$ne:req.userId}
    })

    return res.json({
        users : users.map((user)=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.delete("/delete" ,authMiddleware ,async (req,res)=>{
    await User.findByIdAndDelete(req.userId)

    return res.json({
        msg: "user deleted successfully"
    })
})

module.exports = router