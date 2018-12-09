import {normalizePort} from './normalize-port';

test('expect normalizePort 3000 to return 3000', () => {
  expect(normalizePort(3000)).toBe(3000);
});

test('expect normalizePort "8080" to return 8080', () => {
  expect(normalizePort('8080')).toBe(8080);
});

test('expect normalizePort "yop" to return false', () => {
  expect(normalizePort('yop')).toBe('yop');
});

test('expect normalizePort -1 to return false', () => {
  expect(normalizePort(-1)).toBe(false);
});