export function routes(app) {
  app.get("/", (req, reply) => {
    reply.send({ message: "Hello, World!" });
  });

  app.get("/bad", () => {
    throw new Error("Bad route error");
  });
}
