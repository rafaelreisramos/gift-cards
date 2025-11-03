export async function routes(api) {
  api.get("/", async (req, reply) => {
    reply.send({ message: "Hello, World!" });
  });
}
