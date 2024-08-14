import { Budget, Transaction } from "../../types/models";

export function getRealBalanceFromBudget(budget: Budget, allTransactions: Transaction[]) {
  const transactions = allTransactions.filter((t) => t.budgetId === budget.uuid);

  const expenses = transactions.filter((t) => t.type === "Expense").map((t) => t.amount).reduce((acc, curr) => acc + curr, 0);
  const incomes = transactions.filter((t) => t.type === "Income").map((t) => t.amount).reduce((acc, curr) => acc + curr, 0);

  let total = budget.balance;

  total += incomes;
  total -= expenses;

  return [total, incomes, expenses];
}
