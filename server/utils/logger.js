import fs from 'fs';
import path from 'path';

const logDir = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const getLogFile = () => {
  const date = new Date().toISOString().split('T')[0];
  return path.join(logDir, `${date}.log`);
};

export const logger = {
  info: (message, meta = {}) => {
    const logEntry = `[${new Date().toISOString()}] INFO: ${message} ${JSON.stringify(meta)}
`;
    console.log(logEntry.trim());
    fs.appendFileSync(getLogFile(), logEntry);
  },

  error: (message, error = {}, meta = {}) => {
    const logEntry = `[${new Date().toISOString()}] ERROR: ${message} ${error.stack || error.message || ''} ${JSON.stringify(meta)}
`;
    console.error(logEntry.trim());
    fs.appendFileSync(getLogFile(), logEntry);
  },

  warn: (message, meta = {}) => {
    const logEntry = `[${new Date().toISOString()}] WARN: ${message} ${JSON.stringify(meta)}
`;
    console.warn(logEntry.trim());
    fs.appendFileSync(getLogFile(), logEntry);
  },

  debug: (message, meta = {}) => {
    if (process.env.NODE_ENV === 'development') {
      const logEntry = `[${new Date().toISOString()}] DEBUG: ${message} ${JSON.stringify(meta)}
`;
      console.log(logEntry.trim());
    }
  }
};
