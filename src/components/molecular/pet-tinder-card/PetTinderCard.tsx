import { Button, Card, CardBody } from "@nextui-org/react";
import { Pet, PetView } from "@prisma/client";
import { DateTime } from "luxon";
import React from "react";
import { HeartIcon } from "lucide-react";

interface PetTinderCardProps {
  pet: Pet;
}

export const PetTinderCard: React.FC<PetTinderCardProps> = ({ pet }) => {
  return (
    <Card>
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
