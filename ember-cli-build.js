'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'sass'
    },
    'ember-cli-babel': {
      includePolyfill: true
    }
  });

  app.import('node_modules/bootstrap/dist/css/bootstrap.min.css', { destDir: 'assets' });

  return app.toTree();
};
