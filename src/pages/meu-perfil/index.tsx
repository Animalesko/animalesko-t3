import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Form } from "~/components/form/form";
import { Input } from "~/components/form/input";
import { Title } from "~/components/form/title";
import { PrivateLayout } from "~/components/organic/private-layout/PrivateLayout";
import {
  CreateUserProfileData,
  createUserProfileSchema,
} from "~/schemas/router/user-profile/create-user-profile";
import { api } from "~/utils/api";
import { useHookFormMask } from "use-mask-input";
import { ChangeEventHandler, useEffect, useState } from "react";
import { ViaCepResponse } from "~/utils/viacep/viacepResponse";
import { getCEP } from "~/utils/viacep/getCep";
import { formatAddress } from "~/utils/viacep/formatAddress";
import { Button } from "~/components/atomic/button/button";
import { DateTime } from "luxon";

export default function MeuPerfil() {
  const [cepResponse, setCepResponse] = useState<ViaCepResponse | undefined>(
    undefined,
  );

  const form = useForm<CreateUserProfileData>({
    resolver: zodResolver(createUserProfileSchema),
  });

  const { register } = form;
  const registerWithMask = useHookFormMask(register);

  const userProfileQuery = api.userProfile.get.useQuery();

  const upsertUserProfileMutation = api.userProfile.upsert.useMutation();

  const onSubmit = (data: CreateUserProfileData) => {
    toast
      .promise(upsertUserProfileMutation.mutateAsync(data), {
        loading: "Enviando perfil de usuário...",
        success: "Perfil enviado com sucesso.",
        error: "Falha ao enviar perfil de usuário.",
      })
      .catch(console.error);
  };

  const handleChangeCep: ChangeEventHandler<HTMLInputElement> = (e) => {
    const cep = e.target.value.replaceAll(/[^\d]+/g, "");

    if (cep.length === 8) {
      getCEP(cep)
        .then((response) => {
          setCepResponse(response);
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    if (userProfileQuery.data) {
      form.reset({
        phone: userProfileQuery.data.phone,
        birthdate: DateTime.fromJSDate(userProfileQuery.data.birthdate, {
          zone: "utc",
        }).toFormat("yyyy-MM-dd") as unknown as Date,
        address: {
          ...userProfileQuery.data.address,
        },
      });
    }
  }, [userProfileQuery.data]);

  return (
    <PrivateLayout>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Title title="Meu perfil" />

        <Input
          {...registerWithMask("phone", ["(99) 99999-9999"])}
          label="Telefone"
          placeholder="Digite o telefone"
          errorMessage={form.formState.errors.phone?.message}
        />

        <Input
          {...form.register("birthdate")}
          label="Data de nascinmento"
          placeholder="Digite a data de nascimento"
          type="date"
          errorMessage={form.formState.errors.birthdate?.message}
        />

        <Input
          {...registerWithMask("address.cep", ["99999-999"], {
            onChange: handleChangeCep,
          })}
          label="CEP"
          placeholder="Digite o CEP"
          errorMessage={form.formState.errors.address?.cep?.message}
        />

        {!!cepResponse && <p>{formatAddress(cepResponse)}</p>}

        <Input
          {...form.register("address.numero")}
          label="Número"
          placeholder="Digite o número"
          errorMessage={form.formState.errors.address?.numero?.message}
        />

        <Input
          {...form.register("address.complemento")}
          label="Complemento"
          placeholder="Digite o complemento"
          errorMessage={form.formState.errors.address?.complemento?.message}
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
