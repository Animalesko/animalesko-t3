import { z } from "zod";

export const createUserProfileSchema = z.object({
  birthdate: z.coerce.date(),
  phone: z.string().refine((value) => value !== undefined && value.length > 0, {
    message: "Obrigatório",
  }),

  address: z.object({
    cep: z.string().refine((value) => value !== undefined && value.length > 0, {
      message: "Obrigatório",
    }),
    numero: z
      .string()
      .refine((value) => value !== undefined && value.length > 0, {
        message: "Obrigatório",
      }),
    complemento: z.string(),
  }),
});

export type CreateUserProfileData = z.infer<typeof createUserProfileSchema>;
