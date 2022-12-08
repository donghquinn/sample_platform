import './env';
import { shutdown } from 'utils';
import { KoaServer } from './server';

const server = new KoaServer();

server.start();

process.on('SIGTERM', () => shutdown(server));
