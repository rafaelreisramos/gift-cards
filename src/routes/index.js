export async function routes(api) {
  api.get("/", async (request, reply) => {
    reply.send({ message: "Hello, World!" });
  });
}
