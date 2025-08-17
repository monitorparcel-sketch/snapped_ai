import axios from 'axios';
import Constants from 'expo-constants';

// Adjust baseURL to your server host
const API_BASE_URL = Constants?.expoConfig?.extra?.API_BASE_URL || 'http://127.0.0.1:12000/api/v1';

export const api = axios.create({ baseURL: API_BASE_URL, timeout: 60000 });

export type UploadResponse = {
  image_path: string;
  cloudinary_public_id?: string;
  cloudinary_url?: string;
  message: string;
};

export type ClipResponse = {
  image_path: string;
  original_image_path: string;
  cloudinary_public_id?: string;
  cloudinary_url?: string;
  original_cloudinary_public_id?: string;
  original_cloudinary_url?: string;
  message: string;
};

export type SearchResult = {
  id: number;
  search_id: number;
  title?: string;
  link?: string;
  image_url?: string;
  price?: string;
  brand?: string;
  source?: string;
  description?: string;
  rating?: number;
  reviews_count?: number;
};

export type SearchResponse = {
  search_id: number;
  search_time: string;
  image_path: string;
  original_image_path?: string;
  is_clipped: boolean;
  cloudinary_public_id?: string;
  cloudinary_url?: string;
  original_cloudinary_public_id?: string;
  original_cloudinary_url?: string;
  results: SearchResult[];
  total_results: number;
};

export type SearchList = {
  searches: Array<{
    id: number;
    image_path: string;
    original_image_path?: string;
    is_clipped: boolean;
    search_time: string;
    cloudinary_public_id?: string;
    cloudinary_url?: string;
    original_cloudinary_public_id?: string;
    original_cloudinary_url?: string;
  }>;
  total: number;
  page: number;
  page_size: number;
};

export async function uploadImage(uri: string) {
  const form = new FormData();
  const filename = uri.split('/').pop() || `image.jpg`;
  // @ts-ignore RN uses name/type
  form.append('file', { uri, name: filename, type: 'image/jpeg' });
  form.append('optimize', 'false');
  return api.post<UploadResponse>('/images/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(r => r.data);
}

export async function clipImage(payload: { image_path: string; x: number; y: number; width: number; height: number; cloudinary_public_id?: string; }) {
  const form = new FormData();
  Object.entries(payload).forEach(([k, v]) => form.append(k, String(v)));
  return api.post<ClipResponse>('/images/clip', form).then(r => r.data);
}

export async function searchProducts(params: { image_path: string; original_image_path?: string; is_clipped?: boolean; cloudinary_public_id?: string; cloudinary_url?: string; original_cloudinary_public_id?: string; original_cloudinary_url?: string; }) {
  const form = new FormData();
  Object.entries(params).forEach(([k, v]) => v !== undefined && form.append(k, String(v)));
  return api.post<SearchResponse>('/images/search', form).then(r => r.data);
}

export async function getSearch(searchId: number) {
  return api.get<SearchResponse>(`/images/searches/${searchId}`).then(r => r.data);
}

export async function listSearches() {
  return api.get<SearchList>('/images/searches', { params: { limit: 50 } }).then(r => r.data);
}
