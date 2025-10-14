import { z } from 'zod';

export const yearGroupSchema = z.enum([
  'year-6',
  'year-7', 
  'year-8',
  'year-9',
  'year-10',
  'year-11',
  'year-12',
  'year-13'
]);

export const subjectSchema = z.enum([
  'mathematics',
  'english',
  'science',
  'history',
  'geography',
  'modern-languages',
  'computer-science',
  'business',
  'economics',
  'psychology',
  'sociology',
  'philosophy',
  'art',
  'music',
  'drama',
  'physical-education',
  'life-skills',
  'careers',
  'wellbeing'
]);

export const subscriptionTierSchema = z.enum(['free', 'basic', 'premium', 'school']);

export const userRoleSchema = z.enum(['student', 'teacher', 'parent', 'admin', 'super-admin']);

export const timestampSchema = z.object({
  seconds: z.number(),
  nanoseconds: z.number()
});

export const baseEntitySchema = z.object({
  id: z.string(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema
});

export const paginationParamsSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20)
});

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number(),
      hasNext: z.boolean(),
      hasPrev: z.boolean()
    })
  });
