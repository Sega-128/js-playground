const isProd = process.env.NODE_ENV === 'production';

const loggerOptions = isProd
  ? {}
  : {
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
      serializers: {
        req: req => ({ method: req.method, url: req.url }),
        res: res => ({ statusCode: res.statusCode }),
      },
      customSuccessMessage: (req, res) => `${req.method} ${req.url} -> ${res.statusCode}`,
      customErrorMessage: (req, res, err) =>
        `ERROR ${req.method} ${req.url} -> ${res.statusCode}: ${err.message}`,
    };

module.exports = loggerOptions;