interface GeneralDataState {
  lastOrder: OrderItem | null;
  isOrderToCopy: boolean;
}
interface GeneralDataPayload {
  lastOrder?: OrderItem | null;
  isOrderToCopy?: boolean;
}
