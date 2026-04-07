const AUTH_STORAGE_KEY = "camhotel_basic_auth_token";
export const AUTH_CHANGED_EVENT = "camhotel-auth-changed";

export type AppRole = "ADMIN" | "STAFF" | "CUSTOMER";

interface LoginRequest {
  email: string;
  password: string;
}

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

export function normalizeRole(role: string | null | undefined): AppRole | null {
  if (!role) return null;

  const normalizedRole = role.toUpperCase();
  if (
    normalizedRole === "ADMIN" ||
    normalizedRole === "STAFF" ||
    normalizedRole === "CUSTOMER"
  ) {
    return normalizedRole;
  }

  return null;
}

export function getDashboardPathByRole(role: string): string {
  const normalizedRole = normalizeRole(role);

  switch (normalizedRole) {
    case "ADMIN":
      return "/admin";
    case "STAFF":
      return "/staff";
    case "CUSTOMER":
      return "/customer";
    default:
      return "/";
  }
}

export async function LoginAdmin(loginData: LoginRequest) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message =
      errorData && typeof errorData.error === "string"
        ? errorData.error
        : "Login failed";
    throw new Error(message);
  }

  return res.json();
}

export async function getAdminData(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message =
      errorData && typeof errorData.error === "string"
        ? errorData.error
        : "Failed to fetch admin data";
    throw new Error(message);
  }

  return res.json();
}
