import { ViaCepResponse } from "./viacepResponse";

export const formatAddress = (response: ViaCepResponse): string => {
  return `${response.logradouro}, ${response.bairro}. ${response.uf}`;
};
