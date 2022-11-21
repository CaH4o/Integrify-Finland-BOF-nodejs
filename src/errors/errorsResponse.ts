import { tError } from "../types/tError";

export const errorResponse: tError = {
  user400: {
    error: {
      status: 400,
      message: "Bad Request",
    },
  },
  user403: {
    error: {
      status: 403,
      message: "User Already Exists",
    },
  },
  user404: {
    error: {
      status: 404,
      message: "User Not Found",
    },
  },
  server503: {
    error: {
      status: 503,
      message: "Service Unavailable",
    },
  },
  page404: {
    error: {
      status: 404,
      message: "Page Not Found",
    },
  },
};
