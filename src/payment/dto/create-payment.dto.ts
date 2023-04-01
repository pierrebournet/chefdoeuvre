export class CreatePaymentDto {
    transactionId: string;
    status: string;
    amount: number;
    createdAt: Date;
    orderId: number;
  }
  