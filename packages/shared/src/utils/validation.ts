/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate UK postcode format
 */
export function isValidUKPostcode(postcode: string): boolean {
  const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
  return postcodeRegex.test(postcode.replace(/\s/g, ''));
}

/**
 * Validate phone number (UK format)
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters long');
  } else {
    score += 1;
  }
  
  if (!/[a-z]/.test(password)) {
    feedback.push('Password must contain at least one lowercase letter');
  } else {
    score += 1;
  }
  
  if (!/[A-Z]/.test(password)) {
    feedback.push('Password must contain at least one uppercase letter');
  } else {
    score += 1;
  }
  
  if (!/\d/.test(password)) {
    feedback.push('Password must contain at least one number');
  } else {
    score += 1;
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push('Password should contain at least one special character');
  } else {
    score += 1;
  }
  
  return {
    isValid: score >= 4,
    score,
    feedback
  };
}

/**
 * Validate age based on year group
 */
export function validateAgeForYearGroup(birthDate: Date, yearGroup: string): boolean {
  const age = new Date().getFullYear() - birthDate.getFullYear();
  
  const yearGroupAges: Record<string, [number, number]> = {
    'year-6': [10, 11],
    'year-7': [11, 12],
    'year-8': [12, 13],
    'year-9': [13, 14],
    'year-10': [14, 15],
    'year-11': [15, 16],
    'year-12': [16, 17],
    'year-13': [17, 18]
  };
  
  const [minAge, maxAge] = yearGroupAges[yearGroup] || [0, 100];
  return age >= minAge && age <= maxAge;
}

/**
 * Sanitize HTML content
 */
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

/**
 * Validate file type
 */
export function isValidFileType(fileName: string, allowedTypes: string[]): boolean {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
}

/**
 * Validate file size
 */
export function isValidFileSize(fileSize: number, maxSizeInMB: number): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return fileSize <= maxSizeInBytes;
}

/**
 * Check if URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate credit card number using Luhn algorithm
 */
export function isValidCreditCard(cardNumber: string): boolean {
  const num = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(num)) {
    return false;
  }
  
  let sum = 0;
  let isEven = false;
  
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}
