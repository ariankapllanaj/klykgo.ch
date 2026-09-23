export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_PATTERN = '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}';

export function isStrongPassword(value: string) {
  return value.length >= PASSWORD_MIN_LENGTH && /[a-z]/.test(value) && /[A-Z]/.test(value)
    && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);
}
