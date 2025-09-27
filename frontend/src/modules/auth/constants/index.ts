export const AUTH_CONSTANTS = {
  FORM_VALIDATION: {
    MIN_PASSWORD_LENGTH: 6,
  },
  SOCIAL_PROVIDERS: [
    {
      name: 'Google',
      icon: 'google',
      href: '/auth/google',
      color: 'bg-red-500 hover:bg-red-600',
    },
    {
      name: 'Facebook',
      icon: 'facebook',
      href: '/auth/facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'GitHub',
      icon: 'github',
      href: '/auth/github',
      color: 'bg-gray-800 hover:bg-gray-900',
    },
  ],
  MESSAGES: {
    SUCCESS: {
      LOGIN_SUCCESS: 'Login realizado com sucesso!',
    },
    ERROR: {
      LOGIN_FAILED: 'Erro no login',
      INVALID_CREDENTIALS: 'Credenciais inválidas',
    },
  },
} as const
