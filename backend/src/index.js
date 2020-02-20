import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import http from 'http';
import socket from 'socket.io';
import routes from './routes';

import './database';

const app = express();

const server = http.Server(app);
const io = socket(server);

app.use((req, res, next) => {
  req.io = io;

  next();
});

app.use(cors());

app.use(
  '/files',
  express.static(resolve(__dirname, '..', 'uploads', 'resized'))
);

app.use(routes);

server.listen(3333);
