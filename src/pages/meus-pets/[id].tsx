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

export default function Cadastro() {
  const { query } = useRouter();
  const petId = query.id as string;

  const form = useForm<CreatePetData>({
    resolver: zodResolver(createPetSchema),
  });

  const fingByIdQuery = api.pets.findById.useQuery(
    {
      id: petId,
    },
    {
      enabled: !!petId,
    },
  );
  const listBreedsQuery = api.pets.listBreeds.useQuery();
  const createPetMutation = api.pets.update.useMutation();

  const onSubmit = (data: CreatePetData) => {
    toast
      .promise(
        createPetMutation
          .mutateAsync({ ...data, id: petId })
          .catch(console.error),
        {
          loading: "Atualizando pet...",
          success: "Pet atualizado com sucesso.",
          error: "Falha ao atualizar pet",
        },
      )
      .then(() => {
        form.reset();
      })
      .catch(console.error);
  };

  const [breedList, setBreedList] = useState<PetBreed[]>([]);

  useEffect(() => {
    if (listBreedsQuery.data) {
      setBreedList(listBreedsQuery.data);
    }
  }, [listBreedsQuery.data]);

  useEffect(() => {
    if (fingByIdQuery.data) {
      form.reset({
        name: fingByIdQuery.data.name,
        petBreedId: fingByIdQuery.data.petBreedId,
        birthdate: DateTime.fromJSDate(fingByIdQuery.data.birthdate, {
          zone: "utc",
        }).toFormat("yyyy-MM-dd") as unknown as Date,
        vaccinationCard: fingByIdQuery.data.vaccinationCard,
        description: fingByIdQuery.data.description,
      });
    }
  }, [fingByIdQuery.data]);

  return (
    <PrivateLayout
      isLoading={fingByIdQuery.isFetching || listBreedsQuery.isFetching}
    >
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Title title="Editar Pet" />

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
          className="col-span-12 mx-auto w-full sm:w-[360px]"
        >
          Enviar
        </Button>
      </Form>
    </PrivateLayout>
  );
}
