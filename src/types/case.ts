interface Chapter {
  slug: string;
  title: string;
  content: string;
}

export interface CaseItem {
  id: string;
  title: string;
  summary: string;
  description: string;
  cover: string;
  tags: string[];
  author: string;
  publishedAt: string;
  stats: {
    views: number;
    likes: number;
  };
  chartType?: string;
  chapters?: Chapter[];
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
