import execa from 'execa';
import 'tsconfig-paths/register';
import { TESTING_CONTAINER_NAME } from './const';

const stopAndRemoveContainer = async () => {
  await execa('docker', ['stop', TESTING_CONTAINER_NAME]);
  await execa('docker', ['rm', '-v', TESTING_CONTAINER_NAME]);
};

const globalTeardown = async () => {
  if (process.env.PREV_NODE_ENV === 'localdev') return;
  await stopAndRemoveContainer();
};

export default globalTeardown;
