const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobsim');
  try { 
    await User.create({name: 'Test', email: 'test3@test.com', password: 'testpassword'}); 
    console.log('Success!');
  } catch (e) { 
    console.error('Full error:', e); 
  }
  mongoose.disconnect();
}
run();
