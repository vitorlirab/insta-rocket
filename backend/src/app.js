import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import { createServer, Server } from 'http';
import socket from 'socket.io';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = Server(this.app);
    this.io = socket(this.server);

    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use((req, res, next) => {
      req.io = this.io;

      next();
    });
    this.app.use(express.json());
    this.app.use(
      '/files',
      express.static(resolve(__dirname, '..', 'uploads', 'resized'))
    );
    this.app.use(cors());
  }

  routes() {
    this.app.use(routes);
  }

  sockets() {
    this.server = createServer(this.app);
    this.io = socket(this.server);
  }
}
export default new App().server;
