const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const projectsFile = path.join(__dirname, 'data', 'projects.json');

// Função para ler os projetos do arquivo
function readProjects() {
    try {
        const data = fs.readFileSync(projectsFile);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Função para escrever os projetos no arquivo
function writeProjects(projects) {
    fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
}

// Endpoint para obter todos os projetos
app.get('/api/projects', (req, res) => {
    const projects = readProjects();
    res.json(projects);
});

// Endpoint para adicionar um novo projeto
app.post('/api/projects', (req, res) => {
    const projects = readProjects();
    const newProject = {
        id: projects.length + 1,
        title: req.body.title,
        links: req.body.links || []
    };
    projects.push(newProject);
    writeProjects(projects);
    res.status(201).json(newProject);
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    const userExists = users.some(user => user.username === username);

    if (userExists) {
        return res.sendFile(path.join(__dirname, 'public', 'register-failure.html'));
    }

    users.push({ username, password });
    res.sendFile(path.join(__dirname, 'public', 'success.html'));
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.sendFile(path.join(__dirname, 'public', 'login-failure.html'));
    }

    res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
