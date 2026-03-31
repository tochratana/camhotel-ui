const AUTH_STORAGE_KEY = "camhotel_basic_auth_token";
export const AUTH_CHANGED_EVENT = "camhotel-auth-changed";

export function getStoredBasicToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_STORAGE_KEY);
}

export function setStoredBasicToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, token);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function clearStoredBasicToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

export function toBasicToken(email: string, password: string): string {
  return btoa(`${email}:${password}`);
}
