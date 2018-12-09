import {onListening} from './on-listening';

test('Should call log with Listening on ...', () => {
  const port = 3000;
  const log = jest.fn();
  onListening(log, port)();
  expect(log.mock.calls).toHaveLength(1);
});

test('Should log listening on pipe with addressInfo', () => {
  const adressInfo = {
    address: '',
    family: '',
    port: 3000,
  };
  const log = jest.fn();
  onListening(log, adressInfo)();
  expect(log.mock.calls[0][0]).toBe('Listening on pipe 3000');
});

test('Should log listening on port with port number', () => {
  const port = 3000;
  const log = jest.fn();
  onListening(log, port)();
  expect(log.mock.calls[0][0]).toBe('Listening on port 3000');
});

test('Should log listening on port with port string', () => {
  const port = '3000';
  const log = jest.fn();
  onListening(log, port)();
  expect(log.mock.calls[0][0]).toBe('Listening on port 3000');
});