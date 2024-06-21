export interface CreateWebhookInput {
  name: string;
  event:
    | "OPENPIX:CHARGE_CREATED"
    | "OPENPIX:CHARGE_COMPLETED"
    | "OPENPIX:CHARGE_EXPIRED"
    | "OPENPIX:TRANSACTION_RECEIVED"
    | "OPENPIX:TRANSACTION_REFUND_RECEIVED"
    | "OPENPIX:MOVEMENT_CONFIRMED"
    | "OPENPIX:MOVEMENT_FAILED"
    | "OPENPIX:MOVEMENT_REMOVED";
  url: string;
  authorization: string;
  isActive: boolean;
}

export interface CreateWebhookOutput {
  id: string;
  name: string;
  event:
    | "OPENPIX:CHARGE_CREATED"
    | "OPENPIX:CHARGE_COMPLETED"
    | "OPENPIX:CHARGE_EXPIRED"
    | "OPENPIX:TRANSACTION_RECEIVED"
    | "OPENPIX:TRANSACTION_REFUND_RECEIVED"
    | "OPENPIX:MOVEMENT_CONFIRMED"
    | "OPENPIX:MOVEMENT_FAILED"
    | "OPENPIX:MOVEMENT_REMOVED";
  url: string;
  authorization: string;
  isActive: boolean;
}
