'use strict';

// config/server.js

// SERVER CONFIGS
// ============================================================================
var ServerConfig = {
  port: process.env.PORT || 8080,
  ip: process.env.IO || '127.0.0.1',
  token: {
    secret: '12315215jklh21l5jk1h25ljk12gh5ljk12g5lj21g5l12jgui251285628i6589712t527b527o3787%*&(%^$%^$%^%(&^$*$*^$$^$(^@&#^$%(@#&%^@#&%^))))',
    expires: 60 // 60 minutes
  }
};

module.exports = ServerConfig;
