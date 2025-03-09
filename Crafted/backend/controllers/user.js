const User = require('../models/userSchema');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//register user 

const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // check if username or email already exists
        //https://www.mongodb.com/docs/manual/reference/operator/query/or/
        const userExists = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (userExists) {
            //https://status.js.org/
            return res.status(409).json({ message: "Username or Email already taken"})
        }
    // hash password
const salt = await bcrypt.genSalt(10);
// https://www.npmjs.com/package/bcrypt
const hashedPassword = await bcrypt.hash(password, salt);


// create user 
const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword
});
if (user) {
    const payload = { username: user.username, _id: user._id };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // return json here instead of schema 
    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token,
    });
}


} catch (err) {
  res.status(500).json({ err: err.message });
    }
}

// login user 

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const payload = { username: user.username, _id: user._id };
        const token = jwt.sign({ payload }, process.env.JWT_SECRET);

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};