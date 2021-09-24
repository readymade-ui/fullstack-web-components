import './iframe.css';
import './../packages/style/style.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    const channelName = 'in-dialog-channel';
    const broadcastChannel = new BroadcastChannel(channelName);
    broadcastChannel.postMessage({
      type: 'closeAll',
    });
    return Story();
  },
];
