export function normalizePort(value: number|string): number|string|boolean {
  const port = (typeof value === 'string') ? parseInt(value, 10) : value;
  if (isNaN(port)) return value;
  else if (port >= 0) return port;
  return false;
}
