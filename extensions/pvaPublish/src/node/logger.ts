import defaultLogger from 'debug';

export const logger = {
  log: defaultLogger('composer:extension:pva-publish'),
};

export const setLogger = (customLogger) => {
  if (customLogger && typeof customLogger === 'function') {
    logger.log = customLogger;
  }
};
