const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: false });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const post of postData) {
        await Post.create({
            ...post,
            userId: users[Math.floor(Math.random() * users.length)].id, 
        });
    }

};

// export the seed data so that it is available in the server.js file
module.exports = seedDatabase;