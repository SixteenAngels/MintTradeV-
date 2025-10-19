export type LedgerEntry = {
  id?: string;
  userId: string;
  amount: number;
  currency: 'GHS';
  type: 'deposit' | 'withdraw' | 'trade' | 'fee';
  status: 'pending' | 'completed' | 'failed';
  provider?: 'zeepay';
  providerRef?: string;
  createdAt: FirebaseFirestore.FieldValue | number;
};
