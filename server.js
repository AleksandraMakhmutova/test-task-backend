const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const session = require("express-session")
const dotenv = require('dotenv');
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const userRouter = require('./src/routes/user')


dotenv.config()

const app = express();

// app.use(express.static(path.resolve('client/build/')))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
	secret: process.env.SESSION_KEY
}))

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


app.use('/', userRouter)

app.get('/tasks', (req, res)=>{
		res.send(messageStatusOk)
})

app.post('/create', (req,res)=>{
let {username, email, text} = req.body;

messageStatusOk.message.tasks.push({
	"id": uuidv4(),
	"username": username,
	"email": email,
	"text": text,
	"status": 0
})

res.send(messageStatusOk)
})

let id
app.get('/edit/:id', (req, res)=>{
	id = req.params.id
const oneTask =	messageStatusOk.message.tasks.filter(el => (`:${el.id}` == id) && el)
res.send(oneTask)
})
app.post('/edit/:id', (req, res)=>{
	id = req.params.id
const usernameEdit = req.body.username;
const emailEdit= req.body.email;
const textEdit= req.body.text;
messageStatusOk.message.tasks.map(el =>{
	if(`:${el.id}` == id){
el.username = usernameEdit,
el.email = emailEdit,
el.text = textEdit
	}
return el
} 

)
res.sendStatus(200)
})
app.get("/logout", (req, res) => {
	console.log("LOGOUT");
	console.log(localStorage);
localStorage.clear()

return res.status(200).end()

})
// const root = path.join(process.env.PWD, 'client', 'build');
// app.use(express.static(root));
// app.get('*', (req, res) => {
//   res.sendFile('index.html', { root });
// });

const PORT = process.env.PORT || 8080
app.listen(PORT, console.log(`server is work ${PORT}`));




