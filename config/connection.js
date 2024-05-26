// const Sequelize = require('sequelize');
// require('dotenv').config();

// let sequelize;

// if (process.env.DB_URL) {
//     sequelize = new Sequelize(process.env.DB_URL);
// } else {
//     sequelize = new Sequelize(
//         process.env.DB_NAME,
//         process.env.DB_USER,
//         process.env.DB_PASSWORD,
//         {
//             host: 'localhost',
//             dialect: 'postgres'
//         }
//     )
// }

const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Adjust based on your DB provider's requirements
            }
        }
    });
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'postgres',
            dialectOptions: {
                ssl: process.env.DB_SSL === 'true' ? {
                    require: true,
                    rejectUnauthorized: false
                } : false
            }
        }
    );
}

module.exports = sequelize;
