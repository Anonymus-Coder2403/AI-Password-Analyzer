/**
 * K-anonymity breach check using Have I Been Pwned API
 * Only sends first 5 characters of SHA-1 hash - password never leaves browser
 */

/**
 * Calculate SHA-1 hash of password
 */
async function sha1(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.toUpperCase();
}

/**
 * Check if password appears in known breaches using k-anonymity model
 * Returns number of times password has been seen in breaches (0 = safe)
 */
export async function checkPasswordBreach(password: string): Promise<{
  breached: boolean;
  count: number;
  error?: string;
}> {
  try {
    if (!password) {
      return { breached: false, count: 0 };
    }
    
    // Get SHA-1 hash of password
    const hash = await sha1(password);
    
    // Only send first 5 characters (k-anonymity)
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);
    
    // Query HIBP API with hash prefix only
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      method: 'GET',
      headers: {
        'Add-Padding': 'true', // Helps prevent timing attacks
      },
    });
    
    if (!response.ok) {
      throw new Error('Breach check service unavailable');
    }
    
    const text = await response.text();
    
    // Parse response - each line is: SUFFIX:COUNT
    const lines = text.split('\n');
    for (const line of lines) {
      const [hashSuffix, countStr] = line.split(':');
      if (hashSuffix.trim() === suffix) {
        const count = parseInt(countStr.trim(), 10);
        return {
          breached: true,
          count,
        };
      }
    }
    
    // Not found in breaches
    return { breached: false, count: 0 };
    
  } catch (error) {
    console.error('Breach check error:', error);
    return {
      breached: false,
      count: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
