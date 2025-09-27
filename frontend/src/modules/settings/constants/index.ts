export const SETTINGS_CONSTANTS = {
  FORM_VALIDATION: {
    MIN_NAME_LENGTH: 2,
    MIN_PASSWORD_LENGTH: 6,
  },
  PHONE_FORMAT: {
    PLACEHOLDER: '(11) 99999-9999',
    MAX_LENGTH: 15,
  },
  PROFILE_IMAGE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  },
  MESSAGES: {
    SUCCESS: {
      PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
      PASSWORD_UPDATED: 'Senha atualizada com sucesso!',
    },
    ERROR: {
      PROFILE_UPDATE_FAILED: 'Erro ao atualizar perfil',
      PASSWORD_UPDATE_FAILED: 'Erro ao atualizar senha',
      PASSWORDS_DONT_MATCH: 'As senhas não coincidem',
      INVALID_IMAGE_TYPE: 'Tipo de arquivo não suportado',
      IMAGE_TOO_LARGE: 'Imagem muito grande (máximo 5MB)',
    },
  },
} as const
