import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Pet } from "@prisma/client";
import { DateTime } from "luxon";
import React from "react";
import { env } from "~/env";

interface PetTinderCardProps {
  pet: Pet;
}

export const PetTinderCard: React.FC<PetTinderCardProps> = ({ pet }) => {
  return (
    <Card>
      <CardHeader>
        {pet.photoId && (
          <img
            src={`${env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_PATH}/${pet.photoId}`}
          />
        )}
      </CardHeader>

      <CardBody className="relative">
        <h2 className="text-3xl font-semibold">{pet.name}</h2>

        <p className="mt-">
          {pet.description} -{" "}
          <span>
            {Math.round(
              DateTime.local({ locale: "pt-BR" }).diff(
                DateTime.fromJSDate(pet.birthdate),
                ["years"],
              ).years,
            )}{" "}
            anos
          </span>
        </p>
      </CardBody>
    </Card>
  );
};
