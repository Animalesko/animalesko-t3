import { Accordion, AccordionItem } from "@nextui-org/react";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { Button } from "~/components/atomic/button/button";
import { Title } from "~/components/form/title";
import { PrivateLayout } from "~/components/organic/private-layout/PrivateLayout";
import { api } from "~/utils/api";
import { formatCurrency } from "~/utils/formatter/formatCurrency";
import { chargeStatusMapper } from "~/utils/mapper/charge-status-mapper";

export default function MinhaCarteira() {
  const router = useRouter();

  const getLastChargesQuery = api.wallet.getLastCharges.useQuery();
  const getWalletQuery = api.wallet.get.useQuery();

  return (
    <PrivateLayout
      isLoading={getLastChargesQuery.isFetching || getWalletQuery.isFetching}
    >
      <Title title="Minha Carteira" />

      <div className="flex flex-row gap-2">
        <h2 className="text-2xl">Total:</h2>
        <p className="text-2xl font-semibold">
          ${getWalletQuery.data?.leskoins}
        </p>
      </div>

      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Últimas compras de leskoins"
          className="mt-6"
          classNames={{
            title: "font-semibold",
            indicator: "text-black",
            base: "border-1 bg-secondary-200 p-2 rounded-lg border-gray-900 shadow-md",
          }}
        >
          {getLastChargesQuery.data?.length === 0 && (
            <p>Não há compras realizadas.</p>
          )}

          <table>
            <tr>
              <th className="px-4">Valor</th>
              <th className="px-4">Status</th>
              <th className="px-4">leskoins</th>
              <th className="px-4">Data</th>
            </tr>

            {getLastChargesQuery.data?.map((charge) => (
              <tr key={charge.id}>
                <td className="px-4">
                  {formatCurrency({
                    valueCents: charge.value,
                  })}
                </td>
                <td className="px-4">{chargeStatusMapper[charge.status]}</td>
                <td className="px-4">{charge.leskoins}</td>
                <td className="px-4">
                  {DateTime.fromJSDate(charge.updatedAt).toFormat("dd/MM/yyyy")}
                </td>
              </tr>
            ))}
          </table>
        </AccordionItem>
      </Accordion>

      <Button
        onClick={() => router.push("/minha-carteira/comprar")}
        className="mx-auto mt-6 lg:w-[300px]"
        color="primary"
      >
        Comprar mais Leskoins
      </Button>
    </PrivateLayout>
  );
}
