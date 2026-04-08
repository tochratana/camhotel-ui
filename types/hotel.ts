import { ApiResponse, UserResponse } from "@/types/auth";

export type RoomStatus = "AVAILABLE" | "OCCUPIED" | "CLEANING" | "MAINTENANCE";

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CHECKED_IN"
  | "CHECKED_OUT"
  | "CANCELLED";

export type RoomTypeResponse = {
  id: number;
  name: string;
  description: string;
  amenities: string;
  basePrice: number;
  capacity: number;
};

export type RoomResponse = {
  id: number;
  floorNumber: number;
  roomNumber: string;
  currentPrice: number;
  imageUrl: string | null;
  rating: number;
  status: RoomStatus;
  roomType: RoomTypeResponse;
};

export type BookingResponse = {
  id: number;
  user: UserResponse;
  room: RoomResponse;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
};

export type SpringPage<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type ApiPageResponse<T> = ApiResponse<SpringPage<T>>;

export type PaginationQuery = {
  page?: number;
  size?: number;
};

export type RoomsQuery = PaginationQuery & {
  roomTypeId?: number;
  status?: RoomStatus;
  checkInDate?: string;
  checkOutDate?: string;
};

export type BookingsQuery = PaginationQuery & {
  status?: BookingStatus;
};

export type UpdateBookingStatusPayload = {
  id: number;
  status: BookingStatus;
};

export type UpdateRoomStatusPayload = {
  id: number;
  status: RoomStatus;
};
