// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

module.exports = {
    initialize: (composer) => {
      console.log('Register webchat Directline server route middleware');

      composer.addWebMiddleware((req, res, next) => {
        console.log('> ', req.url);
        next();
      });

      composer.addWebRoute('post', '/directline/service', (req, res) => {
        res.send('...');
      });
    },
  };
