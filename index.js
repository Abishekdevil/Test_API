// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');
const data = require("./data.json");
const { json } = require('body-parser');

const app = express();
const port = 3010;

app.use(express.json())
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post("/check",(req,res)=>{
  const {threshold} = req.body
  if (typeof threshold !=="number" || isNaN(threshold)){
    return res.status(400).json({error:"Invalid input threshold must be a number "})
  }
  const filteredStudents = data.filter(e => e.total > threshold);

  const response = {
    count : filteredStudents.length,
    students : filteredStudents.map(e => ({
      name: e.name,
      total: e.total
    }))
  };
  res.json(response)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});