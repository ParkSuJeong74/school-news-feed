const path = require('path');
module.exports = {
  stage: 'test',
  postgresql: {
    type: 'postgresql',
    host: '127.0.0.1',
    port: 55556,
    username: 'classting',
    password: 'classting',
    database: 'classting',
    migrationsRun: true,
    entities: [path.resolve(__dirname, '../src/database/entity/*.entity.ts')],
    migrations: [path.resolve(__dirname, '../src/database/migration/*.ts')],
  },
  jwt: {
    access: {
      secret: 'classting_access_secret',
      expiresIn: '2h',
    },
    refresh: {
      secret: 'classting_refresh_secret',
      expiresIn: '30d',
    },
  },
};
