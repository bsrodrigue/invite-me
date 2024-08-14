import { Transaction } from '../types/models';
import createBaseStore from './base.store';

export const useTransactionStore = createBaseStore<Transaction>("transactions");
