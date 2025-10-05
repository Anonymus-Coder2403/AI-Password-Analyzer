/**
 * Local password strength analyzer
 * All analysis happens client-side - passwords never leave the browser
 */

// Common weak passwords (small embedded list)
const COMMON_PASSWORDS = new Set([
  'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', '1234567',
  'letmein', 'trustno1', 'dragon', 'baseball', 'iloveyou', 'master', 'sunshine',
  'ashley', 'bailey', 'passw0rd', 'shadow', '123123', '654321', 'superman',
  'qazwsx', 'michael', 'football', 'password1', 'welcome', 'jesus', 'ninja',
]);

// Common patterns
const PATTERNS = {
  sequential: /(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i,
  repeating: /(.)\1{2,}/,
  keyboard: /(?:qwer|asdf|zxcv|qaz|wsx|edc)/i,
  dates: /(?:19|20)\d{2}/,
};

export interface PasswordAnalysis {
  password: string;
  score: number; // 0-5
  strength: 'very-weak' | 'weak' | 'fair' | 'good' | 'strong';
  entropy: number;
  crackTimes: {
    onlineThrottled: string;
    onlineUnthrottled: string;
    offlineSlowHash: string;
    offlineFastHash: string;
  };
  feedback: {
    warning: string;
    suggestions: string[];
  };
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
    noCommon: boolean;
    noPatterns: boolean;
  };
}

/**
 * Calculate password entropy (in bits)
 */
function calculateEntropy(password: string): number {
  if (!password) return 0;
  
  let charsetSize = 0;
  
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32; // symbols
  
  return Math.log2(Math.pow(charsetSize, password.length));
}

/**
 * Estimate crack time based on entropy and attack scenario
 */
function estimateCrackTime(entropy: number): {
  onlineThrottled: string;
  onlineUnthrottled: string;
  offlineSlowHash: string;
  offlineFastHash: string;
} {
  const guesses = Math.pow(2, entropy);
  
  // Attack speeds (guesses per second)
  const speeds = {
    onlineThrottled: 10, // 10 attempts per second (rate-limited)
    onlineUnthrottled: 100, // 100 attempts per second
    offlineSlowHash: 1e4, // 10K attempts per second (bcrypt)
    offlineFastHash: 1e10, // 10B attempts per second (MD5)
  };
  
  const formatTime = (seconds: number): string => {
    if (seconds < 1) return 'instant';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
    if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
    return 'centuries';
  };
  
  return {
    onlineThrottled: formatTime(guesses / speeds.onlineThrottled / 2),
    onlineUnthrottled: formatTime(guesses / speeds.onlineUnthrottled / 2),
    offlineSlowHash: formatTime(guesses / speeds.offlineSlowHash / 2),
    offlineFastHash: formatTime(guesses / speeds.offlineFastHash / 2),
  };
}

/**
 * Check password against various criteria
 */
function checkPassword(password: string) {
  const lowerPassword = password.toLowerCase();
  
  return {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[^a-zA-Z0-9]/.test(password),
    noCommon: !COMMON_PASSWORDS.has(lowerPassword),
    noPatterns: !Object.values(PATTERNS).some(pattern => pattern.test(password)),
  };
}

/**
 * Generate feedback based on analysis
 */
function generateFeedback(checks: ReturnType<typeof checkPassword>, password: string): {
  warning: string;
  suggestions: string[];
} {
  const suggestions: string[] = [];
  let warning = '';
  
  if (!checks.noCommon) {
    warning = 'This is a very common password.';
    suggestions.push('Avoid using common passwords that appear in breach databases.');
  }
  
  if (!checks.noPatterns) {
    warning = warning || 'Contains predictable patterns.';
    suggestions.push('Avoid sequential characters, repeated patterns, or keyboard walks.');
  }
  
  if (!checks.length) {
    suggestions.push('Use at least 12 characters for better security.');
  }
  
  if (!checks.uppercase || !checks.lowercase) {
    suggestions.push('Mix uppercase and lowercase letters.');
  }
  
  if (!checks.numbers) {
    suggestions.push('Include numbers for added complexity.');
  }
  
  if (!checks.symbols) {
    suggestions.push('Add special symbols (!@#$%^&*) for extra strength.');
  }
  
  if (suggestions.length === 0) {
    suggestions.push('Your password is strong! Consider using a password manager.');
  }
  
  return { warning, suggestions };
}

/**
 * Calculate overall score (0-5)
 */
function calculateScore(checks: ReturnType<typeof checkPassword>, entropy: number): number {
  if (!checks.noCommon) return 0;
  if (entropy < 28) return 1;
  if (entropy < 36) return 2;
  if (entropy < 60) return 3;
  if (entropy < 128) return 4;
  return 5;
}

/**
 * Map score to strength label
 */
function getStrength(score: number): PasswordAnalysis['strength'] {
  if (score === 0) return 'very-weak';
  if (score === 1) return 'very-weak';
  if (score === 2) return 'weak';
  if (score === 3) return 'fair';
  if (score === 4) return 'good';
  return 'strong';
}

/**
 * Main analyzer function
 */
export function analyzePassword(password: string): PasswordAnalysis {
  if (!password) {
    return {
      password: '',
      score: 0,
      strength: 'very-weak',
      entropy: 0,
      crackTimes: {
        onlineThrottled: 'N/A',
        onlineUnthrottled: 'N/A',
        offlineSlowHash: 'N/A',
        offlineFastHash: 'N/A',
      },
      feedback: {
        warning: '',
        suggestions: ['Enter a password to analyze its strength.'],
      },
      checks: {
        length: false,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
        noCommon: true,
        noPatterns: true,
      },
    };
  }
  
  const entropy = calculateEntropy(password);
  const checks = checkPassword(password);
  const score = calculateScore(checks, entropy);
  const strength = getStrength(score);
  const crackTimes = estimateCrackTime(entropy);
  const feedback = generateFeedback(checks, password);
  
  return {
    password,
    score,
    strength,
    entropy: Math.round(entropy * 10) / 10,
    crackTimes,
    feedback,
    checks,
  };
}
