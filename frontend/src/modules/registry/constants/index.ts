export const REGISTRY_CONSTANTS = {
  FORM_VALIDATION: {
    MIN_NAME_LENGTH: 2,
    MIN_PASSWORD_LENGTH: 6,
  },
  PHONE_FORMAT: {
    PLACEHOLDER: '(11) 99999-9999',
    MAX_LENGTH: 15,
  },
  ROLE_OPTIONS: [
    {
      value: 'volunteer' as const,
      label: 'Voluntário',
      description: 'Quero ajudar como voluntário',
    },
    {
      value: 'patient' as const,
      label: 'Paciente',
      description: 'Sou um paciente',
    },
    {
      value: 'sponsor' as const,
      label: 'Patrocinador',
      description: 'Quero patrocinar o projeto',
    },
  ],
  MESSAGES: {
    SUCCESS: {
      USER_CREATED: 'Usuário criado com sucesso!',
      WELCOME: 'Bem-vindo',
    },
    ERROR: {
      USER_CREATION_FAILED: 'Erro ao criar usuário',
      LOGIN_FAILED: 'Erro no login automático',
      PASSWORDS_DONT_MATCH: 'As senhas não coincidem',
    },
  },
} as const
