import fastify from "fastify";
import { routes } from "./routes/index.js";
import { createNotFoundHandler, errorHandler } from "./controllers/index.js";

const app = fastify({ logger: true });

app.register(routes);
app.setNotFoundHandler(createNotFoundHandler(app));
app.setErrorHandler(errorHandler);

app.listen({ port: 3000 }, function (error, address) {
  if (error) {
    app.log.error(error);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
