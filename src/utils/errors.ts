export const ERRORS = {
  // Template Errors
  TEMPLATE_INTERNAL_SERVER_ERROR: {
    code: 1,
    message: "Internal server error",
  },
  TEMPLATE_INVALID_ID_FORMAT: {
    code: 2,
    message: "Invalid ID format",
  },
  TEMPLATE_NOT_FOUND: {
    code: 3,
    message: "Template not found",
  },
  TEMPLATE_NAME_REQUIRED: {
    code: 4,
    message: "Name is required",
  },
  TEMPLATE_UPDATE_FAILED: {
    code: 5,
    message: "Failed to update template",
  },
  TEMPLATE_DELETE_FAILED: {
    code: 6,
    message: "Failed to delete template",
  },
  TEMPLATE_CREATE_FAILED: {
    code: 7,
    message: "Failed to create template",
  },

  // Validation Errors
  VALIDATION_ERROR: {
    code: 10,
    message: "Validation failed",
  },

  // Auth Errors
  TOKEN_NOT_PROVIDED: {
    code: 8,
    message: "Token not provided",
  },
  INVALID_TOKEN: {
    code: 9,
    message: "Invalid token",
  },
} as const;

export type ErrorKey = keyof typeof ERRORS;
