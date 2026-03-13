const axios = require('axios');

async function testSignup() {
  try {
    const res = await axios.post('http://localhost:5001/api/auth/signup', {
      name: 'Test User',
      email: 'test' + Date.now() + '@example.com',
      password: 'password123'
    });
    console.log('Signup Result:', res.data);
  } catch (err) {
    if (err.response) {
      console.error('Signup Failed with Status:', err.response.status);
      console.error('Data:', err.response.data);
    } else {
      console.error('Signup Failed. No response from server. Error:', err.message);
    }
  }
}

testSignup();
