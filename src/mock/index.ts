import { Account, Budget, Transaction } from "../types/models";

export const accounts: Account[] = [
  {
    title: "Orange Money",
    type: "Mobile Money",
    balance: 65_025,
  },
  {
    title: "Moov Money",
    type: "Mobile Money",
    balance: 25_350,
  },
  {
    title: "Base Money",
    type: "Cash",
    balance: 5_750,
  },
];

export const budgets: Budget[] = [
  {
    title: "Daily Food",
    balance: 175_000,
    linkedAccount: "Orange Money",
  },
  {
    title: "Electricity Bills",
    balance: 20_000,
  },
  {
    title: "FromSoftware future DLC releases",
    balance: 50_000,
  },
];

export const transactions: Transaction[] = [
  {
    title: "Build a budget management application",
    category: "Sofware Engineering Gig",
    type: "Income",
    amount: 175_000,
  },
  {
    title: "Elden Ring DLC",
    category: "Gaming",
    type: "Expense",
    amount: 20_000,
  },
  {
    title: "Software Architecture Books",
    category: "Self Education",
    type: "Expense",
    amount: 50_000,
  },
  {
    title: "Spotify Subscription",
    category: "Music Subscription",
    type: "Expense",
    amount: 5_000,
  },
];
