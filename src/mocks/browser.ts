import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

const worker = setupWorker(...handlers);

worker.start().then(() => {
  console.log('Mock Service Worker started.');
}).catch(err => {
  console.error('Failed to start Mock Service Worker:', err);
});
