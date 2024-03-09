require('dotenv').config({ path: '.env.development' });
const express = require('express');
const userRoutes = require('./src/routes/user.route')
const eventRoutes = require('./src/routes/event.route')
const app = express();
const port = 3000;

const { authMiddleware } = require('./src/middlewares/auth.middleware')

require('./src/configs/db.config')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes)
app.use('/events', authMiddleware, eventRoutes)


const server = app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


module.exports = server;