import { useState } from "react";
import { LeskoinOffer } from "~/components/molecular/leskoin-offer/LeskoinOffer";
import { PrivateLayout } from "~/components/organic/private-layout/PrivateLayout";
import { api } from "~/utils/api";
import QRCode from "react-qr-code";
import { Title } from "~/components/form/title";
import { formatCurrency } from "~/utils/formatter/formatCurrency";
import { CopiableCode } from "~/components/molecular/copiable-code/CopiableCode";
export default function Comprar() {
  const createChargeMutation = api.wallet.createCharge.useMutation();

  interface PixPaymentState {
    brCode: string;
    leskoins: number;
    priceCents: number;
  }
  const [state, setState] = useState<PixPaymentState | undefined>(undefined);

  interface onSelectOfferProps {
    leskoins: number;
    priceCents: number;
  }
  const onSelectOffer = ({ leskoins, priceCents }: onSelectOfferProps) => {
    createChargeMutation
      .mutateAsync({
        leskoins,
        priceCents,
      })
      .then(({ brCode }) => {
        setState({
          brCode,
          leskoins,
          priceCents,
        });
      })
      .catch(console.error);
  };

  return (
    <PrivateLayout isLoading={createChargeMutation.isPending}>
      <Title title="Compre leskoins com pix" />

      {state === undefined && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <LeskoinOffer
            onClick={() =>
              onSelectOffer({
                leskoins: 1,
                priceCents: 100,
              })
            }
            quantity={1}
            priceCents={100}
          />
          <LeskoinOffer
            onClick={() =>
              onSelectOffer({
                leskoins: 50,
                priceCents: 4500,
              })
            }
            quantity={50}
            priceCents={4500}
          />
          <LeskoinOffer
            onClick={() =>
              onSelectOffer({
                leskoins: 300,
                priceCents: 25000,
              })
            }
            quantity={300}
            priceCents={25000}
          />
        </div>
      )}

      {!!state && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl">Aponte a camera do celular e page com pix.</p>

          <div className="mx-auto w-fit bg-white p-4">
            <QRCode size={250} value={state.brCode} />
          </div>

          <CopiableCode code={state.brCode} />

          <p className="text-xl">
            {formatCurrency({ valueCents: state.priceCents })}
          </p>
          <p className="text-xl">{state.leskoins} Leskoins</p>
        </div>
      )}
    </PrivateLayout>
  );
}
