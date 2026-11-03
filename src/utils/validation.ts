// Practical email format check.
//
// The browser's built-in <input type="email"> validation follows the HTML spec,
// which accepts dotless / numeric-TLD hosts such as "user@gmail.com585996".
// This stricter check requires: a local part (no leading/trailing/double dots),
// an "@", one or more valid domain labels, and an alphabetic TLD of 2+ letters.
const EMAIL_REGEX =
  /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

export const isValidEmail = (value: string): boolean => {
  const email = value.trim();
  return email.length <= 254 && EMAIL_REGEX.test(email);
};

/** Returns an error message for an invalid email, or '' when it is valid. */
export const getEmailError = (value: string): string => {
  const email = value.trim();
  if (!email) return 'Email address is required.';
  if (!isValidEmail(email)) return 'Please enter a valid email address (e.g. name@example.com).';
  return '';
};

// ---------------------------------------------------------------------------
// Name
// ---------------------------------------------------------------------------

// Starts with a letter (any script, so Tamil / Hindi / accented names work),
// then letters, combining marks (vowel signs), spaces, apostrophes, dots, hyphens.
const NAME_REGEX = /^\p{L}[\p{L}\p{M}'’.\- ]*$/u;
const NAME_MAX_LENGTH = 60;

/** Trims and collapses repeated spaces. */
export const normalizeName = (value: string): string => value.trim().replace(/\s+/g, ' ');

export const isValidName = (value: string): boolean => {
  const name = normalizeName(value);
  return (
    name.length >= 2 &&
    name.length <= NAME_MAX_LENGTH &&
    !/\d/.test(name) &&
    NAME_REGEX.test(name) &&
    (name.match(/\p{L}/gu) ?? []).length >= 2
  );
};

/** Returns an error message for an invalid name, or '' when it is valid. */
export const getNameError = (value: string): string => {
  const name = normalizeName(value);
  if (!name) return 'Full name is required.';
  if (/^\d+$/.test(name.replace(/\s+/g, ''))) {
    return 'Name cannot be only numbers. Please enter a valid name.';
  }
  if (/\d/.test(name)) {
    return 'Name cannot contain numbers.';
  }
  if (name.length > NAME_MAX_LENGTH) {
    return `Name must be ${NAME_MAX_LENGTH} characters or fewer.`;
  }
  if ((name.match(/\p{L}/gu) ?? []).length < 2) {
    return 'Please enter your full name (at least 2 letters).';
  }
  if (!NAME_REGEX.test(name)) {
    return 'Name can only contain letters, spaces, apostrophes, dots and hyphens.';
  }
  return '';
};

// ---------------------------------------------------------------------------
// Indian mobile / WhatsApp number
// ---------------------------------------------------------------------------

export const PHONE_LENGTH = 10;

/** Typing: digits only, never more than 10. */
export const limitPhoneDigits = (value: string): string => value.replace(/\D/g, '').slice(0, PHONE_LENGTH);

/**
 * Paste / autofill: like limitPhoneDigits, but first drops a country-code or trunk prefix so
 * "+91 98765 43210" and "09876543210" both become "9876543210" instead of being cut mid-number.
 */
export const phoneFromPaste = (text: string): string => {
  const digits = text.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits.slice(0, PHONE_LENGTH);
};

// Optional +91 / 91 / 0 prefix, then exactly 10 digits starting with 6-9.
// Anything else (letters, a "+" mid-number, extra digits) fails this match.
const INDIAN_MOBILE_REGEX = /^(?:\+91|91|0)?([6-9]\d{9})$/;
const PHONE_SEPARATORS_REGEX = /[\s\-().]/g;

/** The 10-digit national number, or '' if the input isn't a valid Indian mobile. */
const getNationalNumber = (value: string): string => {
  const match = value.replace(PHONE_SEPARATORS_REGEX, '').match(INDIAN_MOBILE_REGEX);
  return match ? match[1] : '';
};

/** Formats a valid Indian mobile as "+91 98765 43210". Returns the input unchanged if invalid. */
export const normalizePhone = (value: string): string => {
  const national = getNationalNumber(value);
  return national ? `+91 ${national.slice(0, 5)} ${national.slice(5)}` : value.trim();
};

/** Returns an error message for an invalid Indian mobile number, or '' when it is valid. */
export const getPhoneError = (value: string): string => {
  if (!value.trim()) return 'Phone / WhatsApp number is required.';
  if (!getNationalNumber(value)) {
    return 'Enter a valid 10-digit mobile number (it starts with 6, 7, 8 or 9).';
  }
  return '';
};
