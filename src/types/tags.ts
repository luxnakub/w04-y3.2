export interface Tags {
  id: number;
  tag_name: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface CreateTagsBody {
  tag_name: string;
}

export interface UpdateTagsBody {
  tag_name: string;
}

export interface ApiResponse {
  message: string;
  status: number;
  tag?: {
    id: number | string;
    tag_name?: string;
  };
}