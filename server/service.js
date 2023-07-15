const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user')

mongoose.connect(process.env.MONGO_URL);
const todoDb = mongoose.connection;
todoDb.on('error', console.error.bind(console, 'connection error:'));
todoDb.once('open', () => {
    console.log('Connected to database');
});

app.use(cors());
app.use(express.json())

app.post('/user', async (req, res) => {
    const checkId = req.body.googleId;
    const users = await User.findOne({ userId: checkId });
    if (users === null) {
        const newUserData = {
            "userId": req.body.googleId,
            "userName": req.body.name,
            "userGivenName": req.body.givenName,
            "userImgUrl": req.body.imageUrl,
            "todoCards": [
            ],
            "inProgressCards": [
            ],
            "completedCards": [
            ]
        }
        const newUser = new User(newUserData);
        const response = await newUser.save();
        res.sendStatus(200);
    }
    else {
        res.sendStatus(304);
    }
});

app.post('/updateCards', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
          { userId: req.body.userId },
          { todoCards: req.body.todoCards ,
            inProgressCards: req.body.inProgressCards ,
            completedCards: req.body.completedCards },
          { new: true }
        );
    
        if (!user) {
          return res.status(404).send('User not found');
        }
    
        res.send(user);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
})

app.get('/getUserInfo/:userId', async (req, res) => {
    const userInfo = await User.findOne({ userId: req.params.userId });
    const jsonDataString = JSON.stringify(userInfo);
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.write(jsonDataString);
    res.end();
})



app.listen(8080, () => {
    console.log('listening on port: 8080');
});