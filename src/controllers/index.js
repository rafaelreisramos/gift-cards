export function errorHandler(app) {
  app.setNotFoundHandler(function notFoundHandler(req, reply) {
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
      app.hasRoute?.({ method, url: rawUrl })
    );

    if (allowed.length > 0) {
      const methodNotAllowedError = {
        statusCode: 405,
        error: "Method Not Allowed",
        message: `Method ${req.method} not allowed on ${req.url}`,
        action: `Allowed methods: ${allowed.join(", ")}`,
      };
      req.log.warn(methodNotAllowedError.message);
      return reply
        .header("Allow", allowed.join(", "))
        .code(methodNotAllowedError.statusCode)
        .send(methodNotAllowedError);
    }

    const notFoundError = {
      statusCode: 404,
      error: "Not Found",
      message: `Route ${req.url} not found`,
      action: "Check the URL",
    };
    req.log.warn(notFoundError.message);
    return reply.code(notFoundError.statusCode).send(notFoundError);
  });

  app.setErrorHandler(function (err, req, reply) {
    const statusCode = err.statusCode || 500;
    req.log.error(err);
    return reply.code(statusCode).send({
      statusCode: statusCode,
      error: "Internal Server Error",
      message: "An unexpected error occurred",
      action: "Contact support if the problem persists.",
    });
  });
}
