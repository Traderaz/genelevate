export interface Expert {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  order: number;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  expertise?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

