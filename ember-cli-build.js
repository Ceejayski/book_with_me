'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'sass'
    }
  });

  app.import('node_modules/bootstrap/dist/css/bootstrap.min.css', { destDir: 'assets' });

  return app.toTree();
};
