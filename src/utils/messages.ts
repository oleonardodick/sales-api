export const Messages = {
  errors: {
    userNotFound: 'User not found.',
    invalidCredentials: 'E-mail or password invalid.',
    invalidToken: 'Invalid JWT token.',
    fieldRequired: (field: string) => `The ${field} is required.`,
    invalidRole: 'The role must be either ADMIN or USER',
    invalidEmail: 'The e-mail must have an e-mail format.',
    invalidPasswordMatch:
      'The password must have at least 8 characters with one lowercase letter, one uppercase letter and one number.',
    notStringValue: (field: string) =>
      `The field ${field} only accepts text value.`,
  },
};
