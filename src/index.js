const express = require('express');

const { v4: uuid, validate } = require('uuid');

const app = express();

app.use(express.json());

const repositories = [];

app.get('/repositories', (request, response) => {
  return response.json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repository);
  return response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryFound = repositories.find(
    (repository) => repository.id === id
  );

  if (!repositoryFound) {
    return response.status(404).json({ error: 'Repository not found' });
  }

  repositoryFound.title = title;
  repositoryFound.url = url;
  repositoryFound.techs = techs;

  return response.json(repositoryFound);
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const repositoryFound = repositories.find(
    (repository) => repository.id === id
  );

  if (!repositoryFound) {
    return response.status(404).json({ error: 'Repository not found' });
  }

  repositories.splice(repositoryFound, 1);

  return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;

  const repositoryFound = repositories.find(
    (repository) => repository.id === id
  );

  if (!repositoryFound) {
    return response.status(404).json({ error: 'Repository not found' });
  }

  const likes = (repositoryFound.likes = parseInt(repositoryFound.likes) + 1);

  return response.json({ likes: likes });
});

module.exports = app;
