export const config =  {
  port: process.env.PORT,
  databaseUri: process.env.DATABASE_URI,
  databaseUser: process.env.DATABASE_USER,
  databasePwd: process.env.DATABASE_PASSWORD,
  bridgeUri: process.env.BRIDGE_URI,
  bridgeUser: process.env.BRIDGE_USER,
  databaseName: process.env.DATABASE_NAME,
  loggerFormat: process.env.MORGAN_LOGGER_FORMAT,
  logLevel: process.env.LOG_LEVEL,
};
