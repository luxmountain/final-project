export interface Event {
  id: string;
  title: string;
  description: string;
  bannerUrl: string;
  startDate: string;
  endDate: string;
  venue: string;
  city: string;
  category: string;
  organizer: string;
  ticketClasses: TicketClass[];
  status: "draft" | "pending" | "approved" | "cancelled";
}

export interface TicketClass {
  id: string;
  name: string;
  price: number;
  quota: number;
  sold: number;
}

export interface Seat {
  id: string;
  zone: string;
  row: string;
  number: number;
  status: "available" | "locked" | "sold";
  ticketClassId: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  zone: string;
  row: string;
  seatNumber: number;
  ticketClass: string;
  status: "active" | "used" | "refunded" | "frozen";
  qrCode?: string;
}

export interface CartItem {
  id: string;
  type: "ticket" | "merchandise";
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface Merchandise {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  eventId: string;
}
