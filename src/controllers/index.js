export function createNotFoundHandler(api) {
  return function notFoundHandler(req, reply) {
    const rawUrl = req.raw?.url?.split("?")[0] ?? req.url;
    const httpMethods = [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "HEAD",
      "OPTIONS",
    ];

    const allowed = httpMethods.filter((method) =>
      api.hasRoute?.({ method, url: rawUrl })
    );

    if (allowed.length > 0) {
      return reply
        .header("Allow", allowed.join(", "))
        .code(405)
        .send({
          statusCode: 405,
          error: "Method Not Allowed",
          message: `Method ${req.method} not allowed on ${req.url}`,
          action: `Allowed methods: ${allowed.join(", ")}`,
          name: "MethodNotAllowedError",
        });
    }

    return reply.code(404).send({
      statusCode: 404,
      error: "Not Found",
      message: `Route ${req.url} not found`,
      action: "Check the URL or method used",
      name: "NotFoundError",
    });
  };
}

export function errorHandler(err, req, reply) {
  const statusCode = err.statusCode || 500;
  const errorName = err.name || "InternalServerError";
  const errorMessage = err.message || "An unexpected error occurred";
  return reply.code(statusCode).send({
    statusCode: statusCode,
    error: errorName.replace(/([a-z])([A-Z])/g, "$1 $2"),
    message: errorMessage,
    name: errorName,
  });
}
