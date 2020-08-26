import express from 'express';
import bodyParser from 'body-parser';
import {users} from './users-mock';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const port = 12345;

// GET all users in json
app.get('/', (req, res) => {
    console.log("GET - getting all users");
    console.log(req.body);
    res.contentType('application/json');
    res.json(users)
});

// GET user in json
app.get('/:id', (req, res) => {
    console.log("GET - getting user by id");
    console.log(req.body);
    res.contentType('application/json');
    res.json(
        users.filter((user) => {
            return user.id === Number.parseInt(req.params['id']);
        })[0]
    );
});

// POST new user
app.post('/', bodyParser.json(), (req, res) => {
    console.log("POST - adding new user");
    const newUser = req.body;
    users.push(newUser);
    res.send();
});

// PUT user data update by userId
app.put('/:id', bodyParser.json(), (req, res) => {
    console.log('PUT - updating user by id');
    const changes = req.body;
    const userIdInList = users.indexOf(users.filter((user) => {
        return user.id === Number.parseInt(req.params['id']);
    })[0]);
    users[userIdInList] = {...users[userIdInList], ...changes};
    res.send();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log(users)
});
