import { Account, Transaction } from "../../types/models";

export function getRealBalanceFromAccount(account: Account, allTransactions: Transaction[]) {
  const transfers = allTransactions.filter((t) => t.type === "Transfer");
  const transactions = allTransactions.filter((t) => t.accountId === account.uuid);

  const expenses = transactions.filter((t) => t.type === "Expense").map((t) => t.amount).reduce((acc, curr) => acc + curr, 0);
  const incomes = transactions.filter((t) => t.type === "Income").map((t) => t.amount).reduce((acc, curr) => acc + curr, 0);

  const transfer_expenses = transfers.filter((t) => account?.uuid === t.sourceAccountId).map((t) => t.amount).reduce((acc, curr) => acc + curr, 0);
  const transfer_incomes = transfers.filter((t) => account?.uuid === t.destinationAccountId).map((t) => t.amount).reduce((acc, curr) => acc + curr, 0);

  let total = account.balance;

  total += (incomes + transfer_incomes);
  total -= (expenses + transfer_expenses);

  return [total, incomes, expenses];
}
