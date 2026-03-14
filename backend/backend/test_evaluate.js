async function testEvaluation() {
  try {
    const response = await fetch('http://localhost:5001/api/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        courseId: 'web-development',
        day: 1,
        task_scenario: 'Test scenario for web design.',
        answer_text: 'I would use semantic HTML and CSS Grid to create a responsive layout that is accessible and performant.'
      })
    });
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testEvaluation();
