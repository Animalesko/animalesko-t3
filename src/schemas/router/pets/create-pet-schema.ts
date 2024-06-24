import { z } from "zod";

export const createPetSchema = z.object({
  name: z
    .string()
    .refine((value) => !!value && value.length > 1, { message: "Obrigatório" }),
  petBreedId: z
    .string()
    .refine((value) => !!value && value.length > 1, { message: "Obrigatório" }),
  birthdate: z.coerce.date(),
  vaccinationCard: z
    .string()
    .refine((value) => !!value && value.length > 1, { message: "Obrigatório" }),

  photoId: z.string().optional(),

  description: z
    .string()
    .refine((value) => !!value && value.length > 1, { message: "Obrigatório" }),
});

export type CreatePetData = z.infer<typeof createPetSchema>;
