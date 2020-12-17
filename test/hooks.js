import { Application } from 'spectron';
import { should, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import electron from 'electron';

global.before(() => {
  should();
  use(chaiAsPromised);
});

export async function startApp() {
  const app = new Application({
    path: electron,
    args: ['.', '--no-sandbox']
  })
  chaiAsPromised.transferPromiseness = app.transferPromiseness;
  return app.start();
}

export async function stopApp(app) {
  if (app && app.isRunning()) {
    await app.stop();
  }
}


// based on the scriptshttps://github.com/StephenDavidson/electron-spectron-example