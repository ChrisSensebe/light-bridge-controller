import {onError} from './on-error';

test('should throw an error', () => {
  const log = console.log;
  const port = 3000;
  const appliedOnError = onError(log, port);
  const error = {
    errno: 0,
    code: '',
    path: '',
    syscall: '',
    stack: '',
    name: '',
    message: '',
  };
  expect(() => {
    appliedOnError(error);
  }).toThrow();
});

test('should throw an error when syscall === listen and code === ""', () => {
  const log = console.log;
  const port = 3000;
  const appliedOnError = onError(log, port);
  const error = {
    errno: 0,
    code: '',
    path: '',
    syscall: 'listen',
    stack: '',
    name: '',
    message: '',
  };
  expect(() => {
    appliedOnError(error);
  }).toThrow();
});

test('should call process.exit(1) when syscall === listen and code === "EACCES"', () => {
  const realProcess = process;
  const exitMock = jest.fn();
  global.process = {...realProcess, exit: exitMock}
  const log = console.log;
  const port = 3000;
  const appliedOnError = onError(log, port);
  const error = {
    errno: 0,
    code: 'EACCES',
    path: '',
    syscall: 'listen',
    stack: '',
    name: '',
    message: '',
  };
  appliedOnError(error);
  expect(exitMock).toHaveBeenCalledWith(1);
  global.process = realProcess;
});

test('should call process.exit(1) when syscall === listen and code === "EADDRINUSE"', () => {
  const realProcess = process;
  const exitMock = jest.fn();
  global.process = {...realProcess, exit: exitMock}
  const log = console.log;
  const port = 3000;
  const appliedOnError = onError(log, port);
  const error = {
    errno: 0,
    code: 'EADDRINUSE',
    path: '',
    syscall: 'listen',
    stack: '',
    name: '',
    message: '',
  };
  appliedOnError(error);
  expect(exitMock).toHaveBeenCalledWith(1);
  global.process = realProcess;
});

test('should log Port 3000 requires elevated privileges', () => {
  const realProcess = process;
  const exitMock = jest.fn();
  global.process = {...realProcess, exit: exitMock}
  const log = jest.fn();
  const port = 3000;
  const appliedOnError = onError(log, port);
  const error = {
    errno: 0,
    code: 'EADDRINUSE',
    path: '',
    syscall: 'listen',
    stack: '',
    name: '',
    message: '',
  };
  appliedOnError(error);
  expect(log.mock.calls[0][0]).toBe('Port 3000 is already in use');
  global.process = realProcess;
});

test('should log Port 3000 requires elevated privileges', () => {
  const realProcess = process;
  const exitMock = jest.fn();
  global.process = {...realProcess, exit: exitMock}
  const log = jest.fn();
  const pipe = {
    address: '',
    family: '',
    port: 3000
  };
  const appliedOnError = onError(log, pipe);
  const error = {
    errno: 0,
    code: 'EADDRINUSE',
    path: '',
    syscall: 'listen',
    stack: '',
    name: '',
    message: '',
  };
  appliedOnError(error);
  expect(log.mock.calls[0][0]).toBe('Pipe 3000 is already in use');
  global.process = realProcess;
});