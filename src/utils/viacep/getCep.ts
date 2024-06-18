import axios from "axios";
import { ViaCepResponse } from "./viacepResponse";

export const getCEP = async (postalCode: string) => {
  const address = await axios.get<ViaCepResponse>(
    `https://viacep.com.br/ws/${postalCode}/json/`,
  );
  return address.data;
};
