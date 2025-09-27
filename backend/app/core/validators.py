import re
from typing import Any, Dict
from pydantic import BaseModel, validator
from email_validator import validate_email, EmailNotValidError


class EmailValidator:
    """Email validation utility."""
    
    @staticmethod
    def validate_email_format(email: str) -> bool:
        """Validate email format."""
        try:
            validate_email(email)
            return True
        except EmailNotValidError:
            return False
    
    @staticmethod
    def is_disposable_email(email: str) -> bool:
        """Check if email is from a disposable email service."""
        disposable_domains = {
            '10minutemail.com', 'tempmail.org', 'guerrillamail.com',
            'mailinator.com', 'throwaway.email', 'temp-mail.org'
        }
        domain = email.split('@')[1].lower()
        return domain in disposable_domains


class PasswordValidator:
    """Password validation utility."""
    
    @staticmethod
    def validate_strength(password: str) -> Dict[str, Any]:
        """Validate password strength and return detailed feedback."""
        feedback = {
            'is_valid': True,
            'score': 0,
            'issues': [],
            'suggestions': []
        }
        
        # Length check
        if len(password) < 8:
            feedback['is_valid'] = False
            feedback['issues'].append('Password must be at least 8 characters long')
        elif len(password) >= 12:
            feedback['score'] += 2
        
        # Character variety checks
        has_upper = any(c.isupper() for c in password)
        has_lower = any(c.islower() for c in password)
        has_digit = any(c.isdigit() for c in password)
        has_special = any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password)
        
        if not has_upper:
            feedback['issues'].append('Password must contain at least one uppercase letter')
            feedback['suggestions'].append('Add uppercase letters (A-Z)')
        else:
            feedback['score'] += 1
            
        if not has_lower:
            feedback['issues'].append('Password must contain at least one lowercase letter')
            feedback['suggestions'].append('Add lowercase letters (a-z)')
        else:
            feedback['score'] += 1
            
        if not has_digit:
            feedback['issues'].append('Password must contain at least one number')
            feedback['suggestions'].append('Add numbers (0-9)')
        else:
            feedback['score'] += 1
            
        if not has_special:
            feedback['issues'].append('Password must contain at least one special character')
            feedback['suggestions'].append('Add special characters (!@#$%^&*)')
        else:
            feedback['score'] += 1
        
        # Common password check
        common_passwords = {
            'password', '123456', '123456789', 'qwerty', 'abc123',
            'password123', 'admin', 'letmein', 'welcome', 'monkey'
        }
        
        if password.lower() in common_passwords:
            feedback['is_valid'] = False
            feedback['issues'].append('Password is too common')
            feedback['suggestions'].append('Choose a more unique password')
        
        # Sequential characters check
        if PasswordValidator._has_sequential_chars(password):
            feedback['score'] -= 1
            feedback['suggestions'].append('Avoid sequential characters (abc, 123)')
        
        return feedback
    
    @staticmethod
    def _has_sequential_chars(password: str) -> bool:
        """Check for sequential characters."""
        for i in range(len(password) - 2):
            if (ord(password[i+1]) == ord(password[i]) + 1 and 
                ord(password[i+2]) == ord(password[i]) + 2):
                return True
        return False


class PhoneValidator:
    """Phone number validation utility."""
    
    @staticmethod
    def validate_phone(phone: str) -> bool:
        """Validate phone number format."""
        # Remove all non-digit characters
        digits_only = re.sub(r'\D', '', phone)
        
        # Check if it's a valid length (7-15 digits)
        if len(digits_only) < 7 or len(digits_only) > 15:
            return False
        
        # Check for valid patterns
        patterns = [
            r'^\d{10}$',  # US format
            r'^\d{11}$',  # US with country code
            r'^\d{13}$',  # International
        ]
        
        return any(re.match(pattern, digits_only) for pattern in patterns)
    
    @staticmethod
    def format_phone(phone: str) -> str:
        """Format phone number to standard format."""
        digits_only = re.sub(r'\D', '', phone)
        
        if len(digits_only) == 10:
            return f"({digits_only[:3]}) {digits_only[3:6]}-{digits_only[6:]}"
        elif len(digits_only) == 11 and digits_only[0] == '1':
            return f"+1 ({digits_only[1:4]}) {digits_only[4:7]}-{digits_only[7:]}"
        
        return phone


class InputSanitizer:
    """Input sanitization utility."""
    
    @staticmethod
    def sanitize_string(value: str) -> str:
        """Sanitize string input."""
        if not isinstance(value, str):
            return str(value)
        
        # Remove null bytes and control characters
        sanitized = re.sub(r'[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]', '', value)
        
        # Trim whitespace
        sanitized = sanitized.strip()
        
        # Limit length
        return sanitized[:1000]
    
    @staticmethod
    def sanitize_email(email: str) -> str:
        """Sanitize email input."""
        if not isinstance(email, str):
            return ""
        
        # Convert to lowercase and trim
        sanitized = email.lower().strip()
        
        # Remove any whitespace
        sanitized = sanitized.replace(' ', '')
        
        return sanitized
