import { ConfigProvider } from '@src/config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const getDataSource = async () => {
  await ConfigProvider.initialize();
  const config = ConfigProvider.getConfig();

  return new DataSource({
    migrationsTableName: 'migrations',
    ...config.postgresql,
    name: 'default',
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
  });
};

export const connectionSource = getDataSource();
