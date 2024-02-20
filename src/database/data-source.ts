import { ConfigProvider } from '@src/config';
import { DataSource, EntityManager } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class DataSources {
  private static defaultInstance: DataSource;

  static get instance(): DataSource {
    if (!this.defaultInstance) {
      const connectionOptions: PostgresConnectionOptions = {
        ...ConfigProvider.getConfig().postgresql,
      };

      this.defaultInstance = new DataSource({
        ...connectionOptions,
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: false,
      });
    }
    return this.defaultInstance;
  }
  static setTestInstance(testInstance: DataSource) {
    this.defaultInstance = testInstance;
  }
}

export function getEntityManager(
  source: EntityManager | DataSource,
): EntityManager | DataSource {
  ConfigProvider.initialize();
  return source ?? DataSources.instance;
}
