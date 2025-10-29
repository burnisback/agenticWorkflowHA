const { setupServer } = require('msw/node');
const { handlers } = require('./handlers');

const server = setupServer(...handlers);

// Start the server when this script is run.  Playwright tests can import this script to
// ensure the mock API is available.
server.listen({ onUnhandledRequest: 'warn' });
console.log('Mock API server running');

process.on('SIGINT', () => server.close());