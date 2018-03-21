(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['dcodeIO'].bcrypt,
      __esModule: true,
    };
  }

  define('bcrypt', [], vendorModule);
})();
