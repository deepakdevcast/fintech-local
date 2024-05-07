import express from 'express';
import EnvConfig from './config.js';
import login from './api/login.js';
import register from './api/register.js';
import transaction from './api/transaction.js';
import users from './api/users.js';
import tokenVerify from './api/middleware/auth.js';

const externalPort = parseInt(EnvConfig.get('EXTERNAL_PORT'), 10);
const externalServer = async () => {
  const server = express();
  server.use(express.json());
  server.use('/login', login);
  server.use('/register', register);
  server.use(tokenVerify);
  server.use('/transaction', transaction);
  server.use('/users', users);
  server.listen(externalPort, () => console.log('listening on port ' + externalPort));
}

export default externalServer;