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

export type BookingPolicy = {
  id: number;
  cancellationWindowHours: number;
  maxBookingDays: number;
  leadTimeHours: number;
  updatedAt: string;
};

export type RatingResponse = {
  id: number;
  stars: number;
  description: string;
  name: string;
  jobTitle?: string | null;
  profileImage?: string | null;
  createdAt: string;
  updatedAt: string;
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
  keyword?: string;
  roomTypeId?: number;
  capacity?: number;
  minPrice?: number;
  maxPrice?: number;
  floorNumber?: number;
  status?: RoomStatus;
  amenities?: string;
  checkInDate?: string;
  checkOutDate?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
};

export type BookingsQuery = PaginationQuery & {
  status?: BookingStatus;
};

export type CreateBookingPayload = {
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
};

export type UpdateBookingStatusPayload = {
  id: number;
  status: BookingStatus;
};

export type UpdateRoomStatusPayload = {
  id: number;
  status: RoomStatus;
};

export type RoomPayload = {
  floorNumber: number;
  roomNumber: string;
  currentPrice: number;
  imageUrl: string;
  rating: number;
  status?: RoomStatus;
  roomTypeId: number;
};

export type RoomTypePayload = {
  name: string;
  description?: string;
  amenities?: string;
  basePrice: number;
  capacity: number;
};

export type CreateStaffPayload = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
};

export type UpdateUserRolePayload = {
  id: number;
  role: "ADMIN" | "STAFF" | "CUSTOMER";
};

export type MyRatingPayload = {
  stars: number;
  description: string;
  jobTitle?: string;
};

export type AdminRatingPayload = {
  stars: number;
  description: string;
  name: string;
  jobTitle?: string;
  profileImage?: string;
};

export type FacilitiesData = {
  exquisiteHeader: string;
  exquisiteBody: string;
  accommodationsHeader: string;
  accommodationsBody: string;
  accommodationsType: string[];
  accommodationsImage: string;
  leisureHeader: string;
  leisureBody: string;
  leisureImage: string;
  gastronomyHeader: string;
  gastronomyBody: string;
  gastronomyImage: string[];
};

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type PaymentMethod = "CASH" | "KHQR" | "STRIPE" | "PAYPAL" | "BANK_TRANSFER";

export type PaymentResponse = {
  id: number;
  booking: BookingResponse;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  releaseAt: string;
  paidAt: string | null;
};

export type PaymentsQuery = PaginationQuery & {
  status?: PaymentStatus;
  keyword?: string;
};

export type UpdatePaymentPayload = {
  bookingId: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
};

export type UpdatePaymentStatusPayload = {
  id: number;
  paymentStatus: PaymentStatus;
};
