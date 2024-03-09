const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) throw new Error('DB Url not set.')

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));