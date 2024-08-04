// USER REGISTRATION FORM DATA
type RegisterFormValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// USER LOGIN FORM DATA
type SignInFromValueType = {
  email: string;
  password: string;
};

// Define the UserType type, representing the structure of a user object.
type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// CREATE HOTEL FORM DATA
type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  adultCount: number;
  childCount: number;
  imageFiles: FileList;
  imageUrls: string[];
};

// HOTEL DATA
type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

// PAGINATED HOTEL SEARCH RESPONSE
type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
  };
};

// Define a type for the search variable - search slice state and searchbar variables
type SearchVariables = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId?: string;
};

type SearchContextValue = SearchVariables & {saveSearchValues:(
  destination: string,
  checkIn: Date,
  checkOut: Date,
  adultCount: number,
  childCount: number,
  hotelId?: string,
 ) => void
 }
 

type SearchActionKind = "DESTINATION" | "CHECKIN" | "CHECKOUT" | "ADULTCOUNT" | "CHILDCOUNT" | "HOTELID"

type SearchAction = {
  type: SearchActionKind;
  payload: string | Date | number;
};

//Define a type for search query parameters to send to backend - match variables with backend
type SearchQueryParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

// BOOKING FORM DATA
type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

// GUEST BOOK NOW FORM DATA
type GuestBookNowFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

// MANAGE HOTEL FORM PROPS DATA
type ManageHotelFormProps = {
  onSave: (hotelFormData: FormData) => void;
  isPending: boolean;
  hotel?: HotelType;
};

// SEARCH RESULTS CARD PROPS
type SearchResultsCardProps = {
  hotel: HotelType;
};

// PAGINATION PROPS
type PaginationProps = {
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

// FACILITIES, STAR RATING, TYPES FILTER PROPS
type FSTProps = {
  selection: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// MAX PRICE FILTER PROPS
type PriceProps = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

// HOTEL DETAIL PROPS
type HotelDetailsProps = {
  data: HotelType;
};
// BOOK NOW FORM PROPS
type BookNowProps = {
  pricePerNight: number;
  hotelId: string;
};

// BOOKING DETAIL SUMMARY PROPS
type BookingDetailSummaryProps = {
  // checkIn: Date;
  // checkOut: Date;
  // adultCount: number;
  // childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

// BOOKING FORM PROPS
type BookingFormProps = {
  currentUser: UserType;
  paymentIntentData: PaymentIntentResponse;
};

// Define the Payment intend response type, representing the structure of payment intend result
type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};

// Define the BookingType type, representing the structure of a Booking object.
export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

type StripeState = {
  stripePromise: Promise<Stripe | null>;
};

type HotelsProps = {
  hotels: HotelType[];
};
