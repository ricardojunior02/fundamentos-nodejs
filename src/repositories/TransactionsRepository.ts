import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const listTransaction = this.transactions;

    return listTransaction;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transation: Transaction) => {
        switch (transation.type) {
          case 'income':
            accumulator.income += transation.value;
            break;
          case 'outcome':
            accumulator.outcome += transation.value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const createTransaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(createTransaction);

    return createTransaction;
  }
}

export default TransactionsRepository;
