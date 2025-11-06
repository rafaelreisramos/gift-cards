import fastify from "fastify";
import { routes } from "./routes/index.js";
import { errorHandler } from "./controllers/index.js";

const loggerEnv = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
    production: true,
    test: false,
  },
};

const app = fastify({ logger: loggerEnv[process.env.NODE_ENV] ?? true });

errorHandler(app);
app.register(routes);

app.listen({ port: 3000 }, function (error, address) {
  if (error) {
    app.log.error(error);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
