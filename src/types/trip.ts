export interface Attraction {
  id: string;
  nameCn: string;
  nameEn: string;
  type: string;
  historicalContext?: string;
  experience?: string;
  insight?: string;
  relatedPeople?: string[];
  historicalPeriod?: string;
  imageKeyword?: string;
}

export interface DayItinerary {
  day: number;
  date?: string;
  title: string;
  cities: string[];
  attractions: Attraction[];
  summary?: string;
}

export interface Trip {
  id: string;
  title: string;
  subtitle: string;
  traveler: string;
  date: string;
  days: DayItinerary[];
}

export interface TripCollection {
  trips: Trip[];
  currentTripId: string;
}

export interface HistoricalPeriod {
  period: string;
  timeRange: string;
  keyLocation?: string;
  keyFigures?: string[];
  majorEvents?: string;
  significance?: string;
  relatedDays?: number[];
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface ReflectionSection {
  heading?: string;
  content: string;
  table?: TableData;
  list?: string[];
  quote?: string;
}

export interface Reflection {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  summary: string;
  sections: ReflectionSection[];
}

export interface CoreFramework {
  title: string;
  items: string[];
}
