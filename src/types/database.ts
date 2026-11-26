export interface CarCategory {
  id: string;
  name: string;
  slug: "pickup" | "ppv";
  sort_order: number;
}

export interface CarSpecs {
  engine_displacement: string;
  max_power: string;
  max_torque: string;
  safety: string[];
  exterior: string[];
  interior: string[];
}

export interface CarTrim {
  id: string;
  model_id: string;
  name: string;
  price: number;
  engine: string;
  transmission: string;
  drivetrain: string;
  specs: CarSpecs;
  is_active: boolean;
}

export interface CarColor {
  id: string;
  model_id: string;
  color_name: string;
  hex_code: string;
  extra_price: number;
}

export interface CarModel {
  id: string;
  category_id: string;
  category_slug: CarCategory["slug"];
  name: string;
  slug: string;
  tagline: string;
  description: string;
  starting_price: number;
  brochure_pdf_url: string;
  is_featured: boolean;
  is_active: boolean;
  trims: CarTrim[];
  colors: CarColor[];
}

export interface Promotion {
  id: string;
  title: string;
  slug: string;
  category: "รถกระบะ" | "รถอเนกประสงค์" | "ศูนย์บริการ";
  highlight_badge: string;
  summary: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface Branch {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  line_oa_url: string;
  google_map_url: string;
  map_embed_url?: string;
  business_hours: string;
  is_head_office?: boolean;
  services?: string[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: "ข่าวสารโชว์รูม" | "รีวิวรุ่นรถ" | "เคล็ดลับดูแลรถ" | "กิจกรรมลูกค้า";
  excerpt: string;
  content: string[];
  published_at: string;
  read_time_minutes: number;
  author: string;
  is_featured: boolean;
  is_active: boolean;
}

export interface SalesConsultant {
  id: string;
  branch_id: string;
  branch_name: string;
  full_name: string;
  nickname: string;
  phone: string;
  line_id: string;
  specialty: string;
  is_active: boolean;
}
