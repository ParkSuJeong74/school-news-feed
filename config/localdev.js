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
  },
};
