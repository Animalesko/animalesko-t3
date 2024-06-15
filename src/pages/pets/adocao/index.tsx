import { Button } from "@nextui-org/react";
import { ChevronRightCircleIcon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { PetTinderCard } from "~/components/molecular/pet-tinder-card/PetTinderCard";
import { PrivateLayout } from "~/components/organic/private-layout/PrivateLayout";
import { api } from "~/utils/api";
import ChevronIcon from "~/assets/icons/ChevronIcon.svg";

export default function Adocao() {
  const nextQuery = api.petviews.next.useQuery();
  const viewMutation = api.petviews.view.useMutation();
  const likeMutation = api.petviews.like.useMutation();

  useEffect(() => {
    if (nextQuery.data) {
      viewMutation
        .mutateAsync({
          petId: nextQuery.data.petId,
        })
        .catch(console.error);
    }
  }, [nextQuery.data]);

  return (
    <PrivateLayout isLoading={nextQuery.isFetching}>
      {nextQuery.data && (
        <div className="flex w-[600px] flex-col gap-4">
          <PetTinderCard
            petview={nextQuery.data}
            onLike={() => {
              toast
                .promise(
                  likeMutation
                    .mutateAsync({
                      petId: nextQuery.data.petId,
                    })
                    .catch(console.error),
                  {
                    loading: "Enviando like...",
                    success: "Like enviado com sucesso",
                    error: "Falha ao enviar like",
                  },
                )
                .then(() => nextQuery.refetch())
                .catch(console.error);
            }}
          />
          <div className="flex flex-row justify-end">
            <Button
              isIconOnly
              className="bg-transparent"
              onClick={() => {
                nextQuery.refetch().catch(console.error);
              }}
            >
              <Image
                src={ChevronIcon as string}
                width={50}
                height={50}
                alt="chevron"
                className="h-12 w-12"
              />
            </Button>
          </div>
        </div>
      )}
    </PrivateLayout>
  );
}
