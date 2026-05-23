export type ShiftSlot = {
  date: string;
  dayOfWeek: "月" | "火" | "水" | "木" | "金" | "土" | "日";
  startTime: string;
  endTime: string;
  capacity: number;
  filled: number;
};

export type Farm = {
  id: string;
  name: string;
  location: string;
  prefecture: string;
  crops: string[];
  description: string;
  image: string;
  shiftSlots: ShiftSlot[];
  features: string[];
  rating: number;
  acceptCount: number;
};

export type Company = {
  id: string;
  name: string;
  category: "AI" | "バイオ" | "農薬" | "IoT" | "ドローン" | "ロボット";
  tagline: string;
  description: string;
  technologies: string[];
  targetCrops: string[];
  logoColor: string;
  website: string;
  established: number;
};

export type Testimonial = {
  id: string;
  role: "student" | "farmer" | "company";
  name: string;
  affiliation: string;
  comment: string;
  avatar: string;
};
