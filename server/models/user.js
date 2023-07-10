const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userId: String,
        userName: String,
        userGivenName: String,
        userImgUrl: String,
        todoCards: [{
            cardId: String,
            cardTitle: String,
            cardDescription: String,
            cardType: String,
        }],
        inProgressCards: [{
            cardId: String,
            cardTitle: String,
            cardDescription: String,
            cardType: String,
        }],
        completedCards: [{
            cardId: String,
            cardTitle: String,
            cardDescription: String,
            cardType: String,
        }]
    }
)
const User = mongoose.model('User', userSchema);
module.exports = User;