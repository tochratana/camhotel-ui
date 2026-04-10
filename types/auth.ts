export type LoginResponse = {
  message?: string;
  accessToken?: string;
  data?: {
    accessToken?: string;
  };
};

export type LoginRequest = {
  email: string;
  password: string;
};


export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type UpdateMyProfilePayload = {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  profileImage?: string;
};

export type RoleResponse = {
  id: number;
  name: "ADMIN" | "STAFF" | "CUSTOMER";
  description: string | null;
};

export type UserResponse = {
  id: number;
  role: RoleResponse;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  profileImage?: string | null;
  createdAt: string;
  isDeleted: boolean;
};

export type AuthResponse = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  profileImage?: string | null;
  role: RoleResponse;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
};

export type FileMetadataResponse = {
  id: number | null;
  fileName: string;
  filePath: string;
  fileType: string;
  entityType: "USER" | "ROOM" | null;
  entityId: number | null;
  createdAt: string;
};
