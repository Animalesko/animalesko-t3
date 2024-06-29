import { PrivateLayout } from "~/components/organic/private-layout/PrivateLayout";

import { useForm } from "react-hook-form";
import {
  CreatePetData,
  createPetSchema,
} from "~/schemas/router/pets/create-pet-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/form/form";
import { Title } from "~/components/form/title";
import { Input } from "~/components/form/input";
import { api } from "~/utils/api";
import { TextArea } from "~/components/form/textarea";
import toast from "react-hot-toast";
import { Button } from "~/components/atomic/button/button";
import { useEffect, useState } from "react";
import { PetBreed } from "@prisma/client";
import { SelectItem } from "@nextui-org/react";
import { Select } from "~/components/form/select";
import { useRouter } from "next/router";
import { DateTime } from "luxon";
import { env } from "~/env";
import { SingleActionCustomToast } from "~/components/molecular/toast-custom-action/SingleActionCustomToast";
import { useFile } from "~/hooks/use-file";
import { InputFile } from "~/components/form/input-file";
import axios from "axios";
import { R2UploadResponse } from "~/schemas/api/R2UploadResponse";

export default function Cadastro() {
  const { query } = useRouter();
  const petId = query.id as string;

  const { file, mediaType, setFile } = useFile();

  const form = useForm<CreatePetData>({
    resolver: zodResolver(createPetSchema),
  });

  const findByIdQuery = api.pets.findById.useQuery(
    {
      id: petId,
    },
    {
      enabled: !!petId,
    },
  );
  const listBreedsQuery = api.pets.listBreeds.useQuery();
  const updatePetMutation = api.pets.update.useMutation();
  const displayAdoptionMutation = api.adoption.displayAdoption.useMutation();

  const onSubmit = (data: CreatePetData) => {
    toast
      .promise(
        new Promise<string | undefined>(async (resolve, reject) => {
          try {
            if (file === undefined) {
              return resolve(undefined);
            }

            const formData = new FormData();
            formData.append("file", file);

            const {
              data: { imageId },
            } = await axios.post<R2UploadResponse>("/api/r2/upload", formData);

            resolve(imageId);
          } catch (error) {
            reject(error);
          }
        }).then((photoId) => {
          if (!photoId) {
            return updatePetMutation.mutateAsync({ ...data, id: petId });
          }

          return updatePetMutation.mutateAsync({
            ...data,
            id: petId,
            photoId,
          });
        }),
        {
          loading: "Atualizando pet...",
          success: "Pet atualizado com sucesso.",
          error: "Falha ao atualizar pet",
        },
      )
      .then(() => {
        form.reset();
        return findByIdQuery.refetch();
      })
      .catch(console.error);
  };

  const onClickAdoption = async () => {
    toast.custom((t) => (
      <SingleActionCustomToast
        title="Quer enviar para adoção?"
        message={`Essa ação custa ${env.NEXT_PUBLIC_ANNOUNCE_LESKOINS_PRICE} leskoins`}
        onClick={() => {
          toast
            .promise(displayAdoptionMutation.mutateAsync({ petId }), {
              loading: "Enviando para adoção...",
              success: "Enviado para adoção.",
              error: "Não foi possível enviar para adoção",
            })
            .catch(console.error);
        }}
      />
    ));
  };

  const [breedList, setBreedList] = useState<PetBreed[]>([]);

  useEffect(() => {
    if (listBreedsQuery.data) {
      setBreedList(listBreedsQuery.data);
    }
  }, [listBreedsQuery.data]);

  useEffect(() => {
    if (findByIdQuery.data) {
      form.reset({
        name: findByIdQuery.data.name,
        petBreedId: findByIdQuery.data.petBreedId,
        birthdate: DateTime.fromJSDate(findByIdQuery.data.birthdate, {
          zone: "utc",
        }).toFormat("yyyy-MM-dd") as unknown as Date,
        vaccinationCard: findByIdQuery.data.vaccinationCard,
        description: findByIdQuery.data.description,
      });
    }
  }, [findByIdQuery.data]);

  return (
    <PrivateLayout
      isLoading={findByIdQuery.isFetching || listBreedsQuery.isFetching}
    >
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Title title="Editar Pet" />

        {!file && (
          <img
            src={
              findByIdQuery.data?.photoId
                ? `${env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_PATH}/${findByIdQuery.data?.photoId}`
                : undefined
            }
            className="col-span-12 mx-auto max-w-full"
          />
        )}

        <InputFile
          currentFile={file}
          onFileChange={setFile}
          mediaType="image"
          placeholder="Selecione a foto"
          containerClassName="lg:col-span-12 md:w-[300px] mx-auto"
        />

        <Input
          {...form.register("name")}
          label="Nome do pet"
          placeholder="Digite o nome do pet"
          errorMessage={form.formState.errors.name?.message}
        />

        <Select
          {...form.register("petBreedId")}
          selectedKeys={[form.watch("petBreedId")]}
          label="Raça"
          placeholder="Selecione a raça"
          items={breedList}
          errorMessage={form.formState.errors.petBreedId?.message}
        >
          {(breed) => (
            <SelectItem key={breed.id} value={breed.id}>
              {breed.name}
            </SelectItem>
          )}
        </Select>

        <Input
          {...form.register("birthdate")}
          type="date"
          label="Data de nascimento"
          errorMessage={form.formState.errors.birthdate?.message}
        />

        <Input
          {...form.register("vaccinationCard")}
          label="Cartão de vacinação"
          placeholder="Digite a carteira de vacinação do pet"
          errorMessage={form.formState.errors.vaccinationCard?.message}
        />

        <TextArea
          {...form.register("description")}
          label="Descrição"
          placeholder="Digite a descrição do pet"
          errorMessage={form.formState.errors.description?.message}
        />

        <Button
          type="submit"
          color="neutral"
          className="col-span-12 mx-auto w-full sm:w-[360px]"
        >
          Enviar
        </Button>

        {findByIdQuery.data?.announce === false && (
          <Button
            type="button"
            color="primary"
            onClick={onClickAdoption}
            className="col-span-12 mx-auto w-full sm:w-[360px]"
          >
            Colocar para adoção
          </Button>
        )}
      </Form>
    </PrivateLayout>
  );
}
