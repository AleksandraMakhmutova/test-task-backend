const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const dotenv = require('dotenv');
const path = require('path')
const { v4: uuidv4 } = require('uuid');


dotenv.config()

const app = express();

// app.use(express.static(path.resolve('client/build/')))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let	messageStatusOk = {
			"status": "ok",
			"message": {
					"tasks": [
							{
									"id": 1,
									"username": "Test User",
									"email": "test_user_1@example.com",
									"text": "Hello, world!",
									"status": 10,
							},
							{
									"id": 3,
									"username": "Test User 2",
									"email": "test_user_2@example.com",
									"text": "Hello from user 2!",
									"status": 0,
							},
							{
									"id": 4,
									"username": "Test User 3",
									"email": "test_user_3@example.com",
									"text": "Hello from user 3!",
									"status": 0,
							}
					],
					"total_task_count": "5"
			}
		}



app.get('/tasks', (req, res)=>{
		res.send(messageStatusOk)
})

app.post('/create', (req,res)=>{
const {username, email, text} = req.body;

messageStatusOk.message.tasks.push({
	"id": uuidv4(),
	"username": username,
	"email": email,
	"text": text,
	"status": 0
})

res.send(messageStatusOk)
})
// const root = path.join(process.env.PWD, 'client', 'build');
// app.use(express.static(root));
// app.get('*', (req, res) => {
//   res.sendFile('index.html', { root });
// });

const PORT = process.env.PORT || 8080
app.listen(PORT, console.log(`server is work ${PORT}`));




