export enum FirebaseErrorMessage {
  EMAIL_EXISTS = 'Email already exists',
  INVALID_EMAIL = 'Invalid email',
  USER_DELETED = 'User not found, please register first',
  INVALID_PASSWORD = 'Invalid password',
  TOO_MANY_ATTEMPTS_TRY_LATER = 'Temporarily disabled due to many failed login attempts. Please, try again later',
  NEED_CONFIRMATION = 'Account exists with different credential. Please try another login method',
  POPUP_BLOCKED = 'The pop-up window is blocked by the browser. Please allow pop-ups in your browser and try again',
  DEFAULT = 'Login failed, please try again',
}
