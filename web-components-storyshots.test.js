import { join, dirname } from 'path';

import initStoryshots from '@storybook/addon-storyshots';

// The required import from the @storybook/addon-storyshots-puppeteer addon
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

// Function to customize the snapshot location
const getMatchOptions = ({ context: { fileName } }) => {
  // Generates a custom path based on the file name and the custom directory.
  const snapshotPath = join(
    'packages',
    'component',
    dirname(fileName),
    '__snapshots__'
  );
  return { customSnapshotsDir: snapshotPath };
};

// Delays snapshot, mostly for CI
const beforeScreenshot = (page, { context: { kind, story }, url }) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 500)
  );
};

initStoryshots({
  framework: 'web-components',
  integrityOptions: { cwd: join(__dirname, 'packages', 'component') },
  configPath: join(__dirname, '.storybook'),
  test: imageSnapshot({
    beforeScreenshot,
    getMatchOptions,
  }),
});
