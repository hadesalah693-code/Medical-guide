export interface Doctor {
  name: string;
  clinic?: string;
  address?: string;
  neighborhood?: string;
  phones?: string[];
  qualifications?: string;
  services?: string;
  days?: string;
  days_fallujah?: string;
  days_branches?: string;
  hours?: string;
  off?: string;
  notes?: string;
  extras?: string;
  gmap_rating?: number;
  gmap_count?: number;
  gmap_phone?: string;
  gmap_note?: string;
  rating?: number;
  review_count?: number;
  gps?: { lat: number; lng: number };
  is_featured?: boolean;
  priority?: number;
  is_pending_info?: boolean;
  source?: string;
}

export interface Category {
  label: string;
  icon: string;
  expected_count?: number;
  description?: string;
  doctors?: Doctor[];
  items?: Doctor[];
}

export interface FlatRecord extends Doctor {
  _category: string;
  _categoryLabel: string;
  _categoryIcon: string;
}
