import { Button, Card, CardBody } from "@nextui-org/react";
import { Pet, PetView } from "@prisma/client";
import { DateTime } from "luxon";
import React from "react";
import { HeartIcon } from "lucide-react";

interface PetTinderCardProps {
  petview: PetView & { pet: Pet };

  onLike: () => void;
}

export const PetTinderCard: React.FC<PetTinderCardProps> = ({
  petview,
  onLike,
}) => {
  return (
    <Card>
      <CardBody className="relative">
        <h2 className="text-3xl font-semibold">{petview.pet.name}</h2>

        <p className="mt-">
          {petview.pet.description} -{" "}
          <span>
            {Math.round(
              DateTime.local({ locale: "pt-BR" }).diff(
                DateTime.fromJSDate(petview.pet.birthdate),
                ["years"],
              ).years,
            )}{" "}
            anos
          </span>
        </p>

        <Button
          isIconOnly
          onClick={onLike}
          className="absolute right-3 top-3 bg-transparent"
        >
          <HeartIcon
            className={petview.like ? "text-red-500" : undefined}
            fill={petview.like ? "red" : "transparent"}
          />
        </Button>
      </CardBody>
    </Card>
  );
};
