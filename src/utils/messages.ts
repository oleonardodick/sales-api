export const Messages = {
  errors: {
    userNotFound: 'Usuário não encontrado.',
    invalidCredentials: 'E-mail ou senha inválido.',
    invalidToken: 'Token JWT inválido.',
    fieldRequired: (field: string) => `O campo ${field} é obrigatório.`,
    invalidRole: 'O papel deve ser USUARIO ou ADMINISTRADOR.',
    invalidEmail: 'Formato do e-mail inválido.',
    invalidPasswordMatch:
      'A senha deve conter pelo menos 8 caracteres com uma letra minúscula, uma letra maiúscula e um número.',
    notStringValue: (field: string) =>
      `O campo ${field} apenas aceita valores de texto.`,
    notDateValue: (field: string) => `O campo ${field} apenas aceita data.`,
    notIntValue: (field: string) =>
      `O campo ${field} apenas aceita números inteiros.`,
    forbidenAccess: 'O usuário não possui acesso a esta funcionalidade.',
  },
};
