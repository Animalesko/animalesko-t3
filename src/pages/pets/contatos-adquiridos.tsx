import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Title } from "~/components/form/title";
import { PetCardVAccinationCard } from "~/components/molecular/pet-card/PetCardVaccinationCard";
import { PrivateLayout } from "~/components/organic/private-layout/PrivateLayout";
import { api } from "~/utils/api";

export default function ContatosAdquiridos() {
  const { push } = useRouter();

  const [page, setPage] = useState(1);

  const paginateOwnedQuery = api.adoption.paginatePetContact.useQuery({
    limit: 10,
    page,
  });

  const totalPages = !!paginateOwnedQuery.data?.total
    ? Math.ceil(paginateOwnedQuery.data.total / 10)
    : 0;

  return (
    <PrivateLayout isLoading={paginateOwnedQuery.isFetching}>
      <Title title="Meus contatos adquiridos" />

      <div className="flex flex-col gap-4 p-3">
        {paginateOwnedQuery.data?.data.map((petContact) => (
          <PetCardVAccinationCard
            key={petContact.id}
            pet={petContact.pet}
            onClick={() => {
              push(`/pets/${petContact.petId}`).catch(console.error);
            }}
          />
        ))}
      </div>

      <Pagination
        classNames={{
          base: "ml-auto",
        }}
        className="flex-end"
        total={totalPages}
        page={page}
        onChange={setPage}
      />
    </PrivateLayout>
  );
}
