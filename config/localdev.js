module.exports = {
  stage: 'localdev',
  postgresql: {
    type: 'postgresql',
    host: '127.0.0.1',
    port: 54326,
    username: 'classting',
    password: 'classting',
    database: 'classting',
    migrationsRun: true,
    entities: ['dist/src/database/entity/*.entity.{ts,js}'],
    migrations: ['dist/src/database/migration/*.{ts,js}'],
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
