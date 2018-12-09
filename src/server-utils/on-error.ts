import {AddressInfo} from 'net';

export function onError(log: Function, address: AddressInfo | string | number) {
  return (error: NodeJS.ErrnoException) => {
    if (error.syscall !== 'listen') throw error;
    const bind = (typeof address === 'string' || typeof address === 'number') ? `Port ${address}` : `Pipe ${address.port}`;
    switch (error.code) {
      case 'EACCES':
        log(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        log(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
}
