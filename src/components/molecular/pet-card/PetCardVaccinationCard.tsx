import { Card, CardBody } from "@nextui-org/react";
import { Pet } from "@prisma/client";
import React from "react";
import { DateTime } from "luxon";

interface PetCardVAccinationCardProps {
  pet: Pet;
  onClick?: () => void;
}

export const PetCardVAccinationCard: React.FC<PetCardVAccinationCardProps> = ({
  pet,
  onClick,
}) => {
  return (
    <Card onClick={onClick} isPressable={!!onClick}>
      <CardBody className="flex flex-row items-center gap-4 truncate p-3">
        <p className="font-semibold">{pet.name}</p>

        <div className="h-4 w-[1px] bg-gray-900"></div>

        <p>{pet.vaccinationCard}</p>

        <div className="h-4 w-[1px] bg-gray-900"></div>

        <p>{DateTime.fromJSDate(pet.birthdate).toFormat("dd/MM/yyyy")}</p>

        <div className="h-4 w-[1px] bg-gray-900"></div>

        <p className="truncate">{pet.description}</p>
      </CardBody>
    </Card>
  );
};
