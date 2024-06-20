import { Button } from "@nextui-org/react";
import { ChevronRightIcon, ContactRoundIcon } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { PetTinderCard } from "~/components/molecular/pet-tinder-card/PetTinderCard";
import { PrivateLayout } from "~/components/organic/private-layout/PrivateLayout";
import { api } from "~/utils/api";
import { SingleActionCustomToast } from "~/components/molecular/toast-custom-action/SingleActionCustomToast";
import { env } from "~/env";
import { useRouter } from "next/router";

export default function Adocao() {
  const router = useRouter();

  const nextQuery = api.petviews.next.useQuery();
  const viewMutation = api.petviews.view.useMutation();
  const getContactMutation = api.adoption.requestContact.useMutation();

  const onClickGetContact = async () => {
    toast.custom((t) => (
      <SingleActionCustomToast
        title="Quer pegar contato do dono do pet?"
        message={`Essa ação custa ${env.NEXT_PUBLIC_ANNOUNCEMENT_LESKOINS_PRICE} leskoins`}
        onClick={() => {
          const petId = nextQuery.data?.petId;
          if (!petId) {
            return;
          }

          toast
            .promise(getContactMutation.mutateAsync({ petId }), {
              loading: "Buscando contato do pet...",
              success: "Contato encontrado.",
              error: "Não foi possível buscar o contato do pet.",
            })
            .then(() => router.push(`/pets/${petId}`))
            .catch(console.error);
        }}
      />
    ));
  };

  return (
    <PrivateLayout isLoading={nextQuery.isFetching}>
      {nextQuery.data && (
        <div className="mx-auto flex flex-col gap-4 lg:w-[600px]">
          <PetTinderCard pet={nextQuery.data.pet} />
          <div className="flex flex-row justify-center gap-6">
            <Button
              isIconOnly
              className="h-fit w-fit rounded-full border-5  border-primary-900 bg-transparent p-2"
              onClick={onClickGetContact}
            >
              <ContactRoundIcon className="h-16 w-16 text-primary-900" />
            </Button>

            <Button
              isIconOnly
              className="h-fit w-fit rounded-full border-5  border-primary-900 bg-transparent p-2"
              onClick={() => {
                viewMutation
                  .mutateAsync({
                    petId: nextQuery.data.petId,
                  })
                  .then(() => nextQuery.refetch())
                  .catch(console.error);
              }}
              disabled={viewMutation.isPending}
            >
              <ChevronRightIcon className="h-16 w-16 text-primary-900" />
            </Button>
          </div>
        </div>
      )}
    </PrivateLayout>
  );
}
