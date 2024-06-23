import { Button } from "~/components/atomic/button/button";
import { formatCurrency } from "~/utils/formatter/formatCurrency";

interface LeskoinOfferProps {
  quantity: number;
  priceCents: number;

  onClick: () => void;
}

export const LeskoinOffer = ({
  priceCents,
  quantity,

  onClick,
}: LeskoinOfferProps) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border-1 border-black bg-secondary-200 p-4 shadow-md">
      <p className="text-3xl font-semibold">
        {quantity}
        <span> Leskoins</span>
      </p>

      <p className="text-xl">{formatCurrency({ valueCents: priceCents })}</p>

      <Button onClick={onClick}>Comprar</Button>
    </div>
  );
};
