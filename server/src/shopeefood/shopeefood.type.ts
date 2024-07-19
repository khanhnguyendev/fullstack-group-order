export type Price = {
  text: string;
  unit: string;
  value: number;
};

export type MenuInfo = {
  dish_type_id: number;
  dish_type_name: string;
  dishes: Dish[];
};

export type Dish = {
  is_deleted: boolean;
  description: string;
  name: string;
  price: Price;
  is_active: boolean;
  total_like: string;
  properties: any[];
  photos: Photo[];
  options: Option[];
  is_available: boolean;
  time: {
    available: any[];
    week_days: any[];
    not_available: any[];
  };
  id: number;
  display_order: number;
  is_group_discount_item: boolean;
  quantity: number;
};

export type Photo = {
  width: number;
  value: string;
  height: number;
};

export type Option = {
  ntop: string;
  mandatory: boolean;
  id: number;
  option_items: any[];
  name: string;
};

export type Restaurant = {
  rating: Rating;
  city_id: number;
  // cuisines: any[];
  restaurant_id: number;
  brand_id: number;
  is_favorite: boolean;
  asap_is_available: boolean;
  contract_type: number;
  // available_times: any[];
  is_city_alert: boolean;
  // price_slash_discounts: any[];
  // delivery_fees: any[];
  vat: null | number;
  service_type: number;
  brand: object;
  delivery: object;
  photos: Photo[];
  is_display_cutlery: boolean;
  price_range: PriceRange;
  foody_service_id: number;
  categories: string[];
  name: string;
  display_order: number;
  delivery_id: number;
  parent_category_id: null | number;
  total_order: number;
  phones: string[];
  district_id: number;
  min_order_value: Price;
  video: null | string;
  id: number;
  location_url: string;
  is_quality_merchant: boolean;
  short_description: string;
  confirm_language: null | string;
  limit_distance: number;
  // delivery_categories: any[];
  user_favorite_count: number;
  // campaigns: any[];
  // confirm_methods: object;
  address: string;
  name_en: string;
  is_now_delivery: boolean;
  is_subscribe: boolean;
  root_category_ids: string[];
  url: string;
  restaurant_url: string;
  is_pickup: boolean;
  // supporting_document_urls: object;
  url_rewrite_name: string;
  position: object;
  res_photos: ResPhotos[];
};

export type ResPhotos = {
  photos: Photo[];
};

export type Rating = {
  total_review: number;
  avg: number;
  display_total_review: string;
  app_link: string;
};

export type PriceRange = {
  min_price: number;
  max_price: number;
};

export type ToppingOption = {
  name: string;
  weight: number;
  price: number;
  partner_option_id: string;
  is_active: boolean;
  rank: number;
  is_default: boolean;
  stock_info: {
    start_time: number;
    is_out_stocked: boolean;
    end_time: number;
  };
  max_qty: number;
  group_id: number;
  id: number;
};

export type ToppingGroup = {
  min_select: number;
  name: string;
  rank: number;
  options: ToppingOption[];
  max_select: number;
  id: number;
  partner_option_group_id: string;
};
