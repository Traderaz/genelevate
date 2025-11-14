export interface Founder {
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
  achievements?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

