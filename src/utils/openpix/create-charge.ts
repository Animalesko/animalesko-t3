export interface CreateChargeInput {
  correlationID: string;
  value: number;
  comment?: string;

  customer: {
    name: string;
    email: string;
  };
}

export interface CreateChargeOutput {
  correlationId: string;
  brCode: string;
  charge: {
    correlationID: string;
    value: number;
    comment?: string;

    customer: {
      name: string;
      email: string;

      correlationId: string;
    };
  };
}
