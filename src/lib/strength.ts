// lib/strength.ts
// Robust, local-only password strength estimator.
// No external network calls. OK to tweak thresholds for your UX.

export type CrackTimes = {
  online: number;     // 100 guesses/sec
  slowHash: number;   // 10^4 guesses/sec
  fastHash: number;   // 10^10 guesses/sec (GPU)
};

export type StrengthResult = {
  score: 0 | 1 | 2 | 3 | 4;
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Excellent';
  entropyBits: number;
  bar: number; // 0..100 for UI
  crackTimes: CrackTimes;
  flags: {
    tooShort: boolean;
    onlyLetters: boolean;
    onlyDigits: boolean;
    dictionary: boolean;
    common: boolean;
    repeated: boolean;
    sequence: boolean;
    keyboardSeq: boolean;
    datePattern: boolean;
    lowDiversity: boolean;
    passphraseLikely: boolean;
  };
  suggestions: string[];
};

const COMMON = new Set([
  'password','123456','123456789','qwerty','111111','123123','abc123','iloveyou',
  'admin','welcome','monkey','dragon','letmein','football','princess','qwertyuiop'
]);

// Keyboard rows for simple sequence detection
const ROWS = ['1234567890', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

// Unicode letter detection
const LETTER = /\p{L}/u;

// Normalize "l33t" to help dictionary checks
function deLeet(s: string): string {
  return s
    .toLowerCase()
    .replace(/@/g,'a')
    .replace(/\$/g,'s')
    .replace(/0/g,'o')
    .replace(/1/g,'l')
    .replace(/3/g,'e')
    .replace(/7/g,'t')
    .replace(/\!/g,'i');
}

function hasLower(s: string) { return /[a-z]/.test(s); }
function hasUpper(s: string) { return /[A-Z]/.test(s); }
function hasDigit(s: string) { return /\d/.test(s); }
function hasSymbol(s: string) { return /[^\p{L}\d\s]/u.test(s); }
function hasSpace(s: string) { return /\s/.test(s); }
function hasUnicodeLetter(s: string) { return LETTER.test(s); }

function countCharspace(pw: string): number {
  let cs = 0;
  if (hasLower(pw)) cs += 26;
  if (hasUpper(pw)) cs += 26;
  if (hasDigit(pw)) cs += 10;
  if (hasSymbol(pw)) cs += 33; // approx printable symbols
  if (hasSpace(pw)) cs += 1;
  // If there are non-ASCII letters, add a bonus charspace bucket
  if (/[^\x00-\x7F]/.test(pw) && hasUnicodeLetter(pw)) cs += 200;
  return Math.max(cs, 1);
}

function isSequential(s: string, min = 4): boolean {
  const L = s.toLowerCase();
  // alpha or numeric ascending/descending
  const alpha = 'abcdefghijklmnopqrstuvwxyz';
  const num = '0123456789';

  const hay = [alpha, [...alpha].reverse().join(''), num, [...num].reverse().join('')];
  for (const h of hay) if (h.includes(L)) return L.length >= min;

  // sliding check inside the string
  for (let i = 0; i <= L.length - min; i++) {
    const seg = L.slice(i, i + min);
    if (alpha.includes(seg) || [...alpha].reverse().join('').includes(seg) ||
        num.includes(seg) || [...num].reverse().join('').includes(seg)) return true;
  }
  return false;
}

function hasKeyboardSeq(pw: string, min = 4): boolean {
  const L = pw.toLowerCase();
  for (const row of ROWS) {
    for (let i = 0; i <= row.length - min; i++) {
      const seg = row.slice(i, i + min);
      if (L.includes(seg) || L.includes([...seg].reverse().join(''))) return true;
    }
  }
  return false;
}

function hasRepeat(pw: string, times = 3): boolean {
  const L = pw.toLowerCase();
  // aaa, 1111, ababab, etc.
  if (/(.)\1{2,}/.test(L)) return true;
  if (/(\w{2,})\1{1,}/.test(L)) return true;
  return false;
}

function looksLikeDate(pw: string): boolean {
  // DDMMYYYY, MMDDYYYY, YYYYMMDD, with or without separators
  return /\b(19|20)\d{2}[-\/]?(0[1-9]|1[0-2])[-\/]?(0[1-9]|[12]\d|3[01])\b/.test(pw) ||
         /\b(0[1-9]|[12]\d|3[01])[-\/]?(0[1-9]|1[0-2])[-\/]?(19|20)\d{2}\b/.test(pw);
}

function entropyBits(pw: string): number {
  // baseline entropy = log2(charspace^length)
  const cs = countCharspace(pw);
  const base = Math.log2(cs) * pw.length;
  // deductions for patterns
  let penalty = 0;
  if (isSequential(pw)) penalty += 10;
  if (hasKeyboardSeq(pw)) penalty += 10;
  if (hasRepeat(pw)) penalty += 8;
  if (looksLikeDate(pw)) penalty += 8;
  // very common/dictionary penalty
  const norm = deLeet(pw);
  if (COMMON.has(norm)) penalty += 20;
  if (/^[a-z]+$/.test(norm) && norm.length <= 8) penalty += 6;

  return Math.max(0, base - penalty);
}

function secondsToHuman(s: number): string {
  if (!isFinite(s) || s <= 0) return 'instantly';
  const units: [number, string][] = [
    [365*24*3600, 'years'],
    [30*24*3600, 'months'],
    [7*24*3600, 'weeks'],
    [24*3600, 'days'],
    [3600, 'hours'],
    [60, 'minutes'],
    [1, 'seconds'],
  ];
  for (const [sec, name] of units) {
    const v = Math.floor(s / sec);
    if (v >= 2) return `${v} ${name}`;
    if (v === 1) return `1 ${name.slice(0,-1)}`;
  }
  return 'seconds';
}

export function estimateCrackTimes(bits: number): CrackTimes {
  // guesses needed ≈ 2^bits / 2 (expected)
  const guesses = Math.pow(2, Math.max(bits - 1, 0));
  return {
    online: guesses / 100,           // 100 guesses/sec
    slowHash: guesses / 1e4,         // 10k/sec
    fastHash: guesses / 1e10         // 10^10/sec
  };
}

export function analyzePassword(pw: string): StrengthResult {
  const len = pw.length;

  const diversityCount =
    (hasLower(pw) ? 1 : 0) +
    (hasUpper(pw) ? 1 : 0) +
    (hasDigit(pw) ? 1 : 0) +
    (hasSymbol(pw) ? 1 : 0) +
    (hasSpace(pw) ? 1 : 0) +
    ((/[^\x00-\x7F]/.test(pw) && hasUnicodeLetter(pw)) ? 1 : 0);

  const flags = {
    tooShort: len < 12,
    onlyLetters: /^[A-Za-z]+$/.test(pw),
    onlyDigits: /^\d+$/.test(pw),
    dictionary: /^[A-Za-z]+$/.test(deLeet(pw)) && deLeet(pw).length >= 4,
    common: COMMON.has(deLeet(pw)),
    repeated: hasRepeat(pw),
    sequence: isSequential(pw),
    keyboardSeq: hasKeyboardSeq(pw),
    datePattern: looksLikeDate(pw),
    lowDiversity: diversityCount <= 2,
    passphraseLikely: pw.split(/[^A-Za-z]+/).filter(Boolean).length >= 3 && len >= 16
  };

  const bits = entropyBits(pw);
  const times = estimateCrackTimes(bits);

  // Scoring thresholds tuned for UX; adjust to taste
  let score: StrengthResult['score'] = 0;
  if (bits >= 75 && !flags.common && !flags.repeated && !flags.sequence && !flags.keyboardSeq) score = 4;
  else if (bits >= 60) score = 3;
  else if (bits >= 45) score = 2;
  else if (bits >= 28) score = 1;
  else score = 0;

  // Strength bar rough mapping
  const bar = Math.min(100, Math.max(0, Math.round((bits / 80) * 100)));

  const label =
    score === 4 ? 'Excellent' :
    score === 3 ? 'Strong' :
    score === 2 ? 'Fair' :
    score === 1 ? 'Weak' : 'Very Weak';

  const suggestions: string[] = [];
  if (flags.tooShort) suggestions.push('Use at least 12–16 characters.');
  if (flags.lowDiversity) suggestions.push('Mix lower/upper, digits, and symbols.');
  if (flags.onlyLetters) suggestions.push('Avoid letters-only passwords.');
  if (flags.onlyDigits) suggestions.push('Avoid numbers-only passwords.');
  if (flags.sequence || flags.keyboardSeq) suggestions.push('Avoid sequences like abcd, 1234, qwerty.');
  if (flags.repeated) suggestions.push('Avoid repeated patterns like aaa or abcabc.');
  if (flags.datePattern) suggestions.push('Avoid dates or years.');
  if (flags.common) suggestions.push('This password is too common.');
  if (flags.passphraseLikely) suggestions.push('Passphrases are great—ensure 4+ random words and add separators/symbols.');

  return { score, label, entropyBits: Math.round(bits), bar, crackTimes: times, flags, suggestions };
}

// Useful helper if you want human text in the UI:
export function humanizeCrackTimes(t: CrackTimes) {
  return {
    online: secondsToHuman(t.online),
    slowHash: secondsToHuman(t.slowHash),
    fastHash: secondsToHuman(t.fastHash),
  };
}
