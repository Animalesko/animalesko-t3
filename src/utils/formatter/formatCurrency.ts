interface formatCurrencyProps {
  valueCents: number;
}

export const formatCurrency = ({ valueCents }: formatCurrencyProps): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueCents / 100);
};
