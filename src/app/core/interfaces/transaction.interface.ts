export interface Transaction{
    id?: number;
    amount: number;
    transactionType: string;
    date: Date;
    category: number;
    description: string;
}
