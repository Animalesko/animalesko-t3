import { PetTinderCard } from "~/components/molecular/pet-tinder-card/PetTinderCard";
import { PrivateLayout } from "~/components/organic/private-layout/PrivateLayout";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Image from "next/image";

import WhatsappIcon from "~/assets/icons/whatsapp.svg";

export default function Adocao() {
  const { query } = useRouter();
  const petId = query.id as string;

  const findPetByIdQuery = api.pets.findById.useQuery(
    {
      id: petId,
    },
    { enabled: !!petId },
  );
  const findContactQuery = api.adoption.findByPetId.useQuery(
    {
      petId,
    },
    { enabled: !!petId },
  );

  return (
    <PrivateLayout
      isLoading={findContactQuery.isFetching || findPetByIdQuery.isFetching}
    >
      {!!findContactQuery.data && (
        <div className="mx-auto my-6 flex flex-col gap-4 rounded-lg bg-secondary-500 p-4 shadow-md">
          <div className="flex flex-row gap-4">
            <p>
              Telefone:{" "}
              <a
                href={`tel:+55${findContactQuery.data.phone.replaceAll(/[^\d]/g, "")}`}
                className="cursor-pointer font-semibold"
              >
                {findContactQuery.data.phone}
              </a>
            </p>
            <a
              href={`https://wa.me/55${findContactQuery.data.phone.replaceAll(/[^\d]/g, "")}?text=Quero%20adotar%20o%20${findContactQuery.data.pet.name.replaceAll(" ", "%20")}!%20Pode%20me%20passar%20mais%20informa%C3%A7%C3%B5es?`}
            >
              <Image
                src={WhatsappIcon as string}
                height={20}
                width={20}
                alt="whatsapp-icon"
                className="h-5 w-5"
              />
            </a>
          </div>

          <div className="flex flex-row gap-4">
            <p>
              E-mail:{" "}
              <a
                href={`mailto:${findContactQuery.data.email}`}
                className="cursor-pointer font-semibold"
              >
                {findContactQuery.data.email}
              </a>
            </p>
          </div>
        </div>
      )}

      {findPetByIdQuery.data && (
        <div className="mx-auto flex flex-col gap-4 lg:w-[600px]">
          <PetTinderCard pet={findPetByIdQuery.data} />
        </div>
      )}
    </PrivateLayout>
  );
}
