'use strict';

// config/server.js

// SERVER CONFIGS
// ============================================================================
var ServerConfig = {
  port: process.env.PORT || 8080,
  ip: process.env.IO || '127.0.0.1',
};

module.exports = ServerConfig;
