export const TESTING_CONTAINER_NAME = 'jest-classting-postgresql';

export enum CONTAINER_HEALTH_STATUS {
  HEALTHY = 'running',
  UNHEALTHY = 'unhealthy',
}

export const HealthCheckTimeout = 60000;
export const HealthCheckInterval = 1000;
