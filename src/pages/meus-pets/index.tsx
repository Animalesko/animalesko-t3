import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Title } from "~/components/form/title";
import { PetCardVAccinationCard } from "~/components/molecular/pet-card/PetCardVaccinationCard";
import { PrivateLayout } from "~/components/organic/private-layout/PrivateLayout";
import { api } from "~/utils/api";

export default function MeusPets() {
  const { push } = useRouter();

  const [page, setPage] = useState(1);

  const paginateOwnedQuery = api.pets.paginateOwned.useQuery({
    limit: 10,
    page,
  });

  const totalPages = !!paginateOwnedQuery.data?.total
    ? Math.ceil(paginateOwnedQuery.data.total / 10)
    : 0;

  return (
    <PrivateLayout isLoading={paginateOwnedQuery.isLoading}>
      <Title title="Meus pets" />

      <div className="flex flex-col gap-4 p-3">
        {paginateOwnedQuery.data?.data.map((pet) => (
          <PetCardVAccinationCard
            key={pet.id}
            pet={pet}
            onClick={() => {
              push(`meus-pets/${pet.id}`).catch(console.error);
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
