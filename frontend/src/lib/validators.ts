// Email validation
export function validateEmail(email: string): { isValid: boolean; message?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email) {
    return { isValid: false, message: 'Email é obrigatório' }
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Formato de email inválido' }
  }

  // Check for disposable emails
  const disposableDomains = [
    '10minutemail.com',
    'tempmail.org',
    'guerrillamail.com',
    'mailinator.com',
    'throwaway.email',
    'temp-mail.org',
  ]

  const domain = email.split('@')[1].toLowerCase()
  if (disposableDomains.includes(domain)) {
    return { isValid: false, message: 'Emails temporários não são permitidos' }
  }

  return { isValid: true }
}

// Password validation
export function validatePassword(password: string): {
  isValid: boolean
  message?: string
  score: number
  suggestions: string[]
} {
  const suggestions: string[] = []
  let score = 0

  if (!password) {
    return { isValid: false, message: 'Senha é obrigatória', score: 0, suggestions: [] }
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Senha deve ter pelo menos 8 caracteres',
      score: 0,
      suggestions: ['Adicione mais caracteres'],
    }
  }

  // Length check
  if (password.length >= 12) score += 2
  else if (password.length >= 8) score += 1

  // Character variety checks
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasDigit = /\d/.test(password)
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)

  if (!hasUpper) {
    suggestions.push('Adicione letras maiúsculas (A-Z)')
  } else {
    score += 1
  }

  if (!hasLower) {
    suggestions.push('Adicione letras minúsculas (a-z)')
  } else {
    score += 1
  }

  if (!hasDigit) {
    suggestions.push('Adicione números (0-9)')
  } else {
    score += 1
  }

  if (!hasSpecial) {
    suggestions.push('Adicione caracteres especiais (!@#$%^&*)')
  } else {
    score += 1
  }

  // Common password check
  const commonPasswords = [
    'password',
    '123456',
    '123456789',
    'qwerty',
    'abc123',
    'password123',
    'admin',
    'letmein',
    'welcome',
    'monkey',
  ]

  if (commonPasswords.includes(password.toLowerCase())) {
    return {
      isValid: false,
      message: 'Senha muito comum',
      score: 0,
      suggestions: ['Escolha uma senha mais única'],
    }
  }

  // Sequential characters check
  if (hasSequentialChars(password)) {
    score -= 1
    suggestions.push('Evite caracteres sequenciais (abc, 123)')
  }

  const isValid = score >= 3 && suggestions.length === 0

  return {
    isValid,
    message: isValid ? undefined : 'Senha não atende aos critérios de segurança',
    score,
    suggestions,
  }
}

// Phone validation
export function validatePhone(phone: string): {
  isValid: boolean
  message?: string
  formatted?: string
} {
  if (!phone) {
    return { isValid: true } // Phone is optional
  }

  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '')

  // Check if it's a valid length (7-15 digits)
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return { isValid: false, message: 'Número de telefone inválido' }
  }

  // Format phone number
  let formatted = phone
  if (digitsOnly.length === 10) {
    formatted = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`
  } else if (digitsOnly.length === 11 && digitsOnly[0] === '1') {
    formatted = `+1 (${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7)}`
  }

  return { isValid: true, formatted }
}

// Name validation
export function validateName(name: string): { isValid: boolean; message?: string } {
  if (!name || !name.trim()) {
    return { isValid: false, message: 'Nome é obrigatório' }
  }

  if (name.trim().length < 2) {
    return { isValid: false, message: 'Nome deve ter pelo menos 2 caracteres' }
  }

  if (name.trim().length > 200) {
    return { isValid: false, message: 'Nome deve ter no máximo 200 caracteres' }
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/
  if (!nameRegex.test(name.trim())) {
    return { isValid: false, message: 'Nome contém caracteres inválidos' }
  }

  return { isValid: true }
}

// Helper function to check for sequential characters
function hasSequentialChars(str: string): boolean {
  for (let i = 0; i < str.length - 2; i++) {
    const char1 = str.charCodeAt(i)
    const char2 = str.charCodeAt(i + 1)
    const char3 = str.charCodeAt(i + 2)

    if (char2 === char1 + 1 && char3 === char1 + 2) {
      return true
    }
  }
  return false
}

// Form validation helper
export function validateForm<T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, (value: any) => { isValid: boolean; message?: string }>,
): { isValid: boolean; errors: Record<keyof T, string> } {
  const errors: Record<keyof T, string> = {} as Record<keyof T, string>
  let isValid = true

  for (const [field, value] of Object.entries(data)) {
    const rule = rules[field as keyof T]
    if (rule) {
      const result = rule(value)
      if (!result.isValid) {
        errors[field as keyof T] = result.message || 'Campo inválido'
        isValid = false
      }
    }
  }

  return { isValid, errors }
}
