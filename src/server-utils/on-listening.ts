import {AddressInfo} from 'net';

export function onListening(log: Function, address: AddressInfo | string | number) {
  return () => {
    const bind = (typeof address === 'string' || typeof address === 'number') ? `port ${address}` : `port ${address.port}`;
    log(`Listening on ${bind}`);
  };
}
