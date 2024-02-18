import config from 'config';
import { Logger } from 'typeorm';

interface IConfig {
  stage: string;
  postgresql: {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    logger:
      | 'debug'
      | 'advanced-console'
      | 'simple-console'
      | 'file'
      | Logger
      | undefined;
    logging: boolean;
    migrationsRun: boolean;
    synchronize: boolean;
  };
}

export class ConfigProvider {
  private static instance: IConfig;
  static isInitialized = false;

  static async initialize() {
    if (this.isInitialized) {
      return;
    }

    config.util.extendDeep(config, config.util.loadFileConfigs());
    this.isInitialized = true;
  }

  static getConfig(): IConfig {
    if (!this.isInitialized) {
      throw new Error('Not Initialized');
    }
    if (this.instance) {
      return this.instance;
    }
    const instance: IConfig = {
      stage: config.get<string>('stage'),
      postgresql: {
        type: 'postgres',
        host: config.get<string>('postgresql.host'),
        port: config.get<number>('postgresql.port'),
        username: config.get<string>('postgresql.username'),
        password: config.get<string>('postgresql.password'),
        database: config.get<string>('postgresql.database'),
        logger: 'debug',
        logging: true,
        migrationsRun: config.get<boolean>('postgresql.migrationsRun'),
        synchronize: false,
      },
    };

    this.instance = instance;
    return this.instance;
  }
}
