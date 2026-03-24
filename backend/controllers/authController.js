const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SIGNUP
const signup = async(req,res) => {
    try {
        const { email, password } = req.body ;
    
        if(!email || !password){
            return res.status(400).json({error:"Email and password are required."});
        }
    
        // check if user already exists
        const existingUser = await User.findOne({email});
    
        if (existingUser) {
            return res.status(400).json({error:"User already exists."});
        }
    
        // hash password
        const hashedPassword = await bcrypt.hash(password,10);
    
        // save user
        const user = new User({ email, password:hashedPassword });
        await user.save();
    
        return res.status(201).json({message:"User registered successfully !"});
    
    } catch(err) {
        console.log("Error:",err)
        res.status(500).json({error:"Server Error"});
    }
};

//LOGIN
const login = async (req,res) => {
    try {
        let { email, password } = req.body ;
    
        email = (email || "").trim();
        password = (password || "").trim();
    
        if(email === "" || password === ""){
            return res.status(400).json({error:"Email and password are required."});
        }
    
        const user = await User.findOne({ email });
    
        if ( !user ) {
            return res.status(400).json({error:"User not found "});
        }
    
        const isMatch = await bcrypt.compare( password , user.password );
        if(!isMatch) return res.status(400).json({error:"Wrong password !"});
    
        // create token
        const token = jwt.sign ({ id:user._id } , process.env.JWT_SECRET) ;
    
        res.json({ token , userId: user._id});
    
    } catch (err) {
        console.log("Error:",err);
        res.status(500).json({error:"Server Error"});
    }
};

module.exports = { signup, login} ;