import execa from 'execa';
import 'tsconfig-paths/register';
import {
  CONTAINER_HEALTH_STATUS,
  HealthCheckInterval,
  HealthCheckTimeout,
  TESTING_CONTAINER_NAME,
} from './const';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const getRunningDockerStatus = async () => {
  const childProcess = await execa('docker', [
    'inspect',
    '--format',
    '{{.State.Status}}',
    TESTING_CONTAINER_NAME,
  ]);
  const status = childProcess.stdout.toString();
  return status;
};

const inspectDockerContainer = async () => {
  const status = await getRunningDockerStatus();
  if (status !== CONTAINER_HEALTH_STATUS.HEALTHY) {
    throw new Error('Status not healthy');
  }
};

const startDockerContainer = async () => {
  console.log('Start Docker Container');
  await execa('docker-compose', [
    '-f',
    './testDocker/test-docker-compose.yml',
    'up',
    '-d',
    '--build',
  ]);
};

const waitForContainerReady = async () => {
  let countdown = HealthCheckTimeout;
  const step = HealthCheckInterval;
  const { DataSources } = require('@src/database/data-source');
  console.log('postgres booting...');
  while (countdown > 0) {
    const status = await getRunningDockerStatus();

    try {
      await DataSources.instance.initialize();
    } catch (e) {}
    if (
      status === CONTAINER_HEALTH_STATUS.HEALTHY &&
      DataSources.instance.isInitialized
    ) {
      console.log('postgres initialized');
      break;
    }
    if (status === CONTAINER_HEALTH_STATUS.UNHEALTHY)
      throw Error('Container failed to start.');
    countdown -= step;
    await sleep(step);
  }
  console.log('postgres activated');
};

const setupWrapper = async () => {
  const { ConfigProvider } = require('@src/config');
  await ConfigProvider.initialize();
  try {
    await inspectDockerContainer();
    console.log('Container healthy, running test cases...');
  } catch (err) {
    console.log(
      'Container not running normally, trying to start a new container...',
    );
    await startDockerContainer();
  }
  await waitForContainerReady();
};

export default setupWrapper;
