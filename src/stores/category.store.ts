import { TransactionCategory } from '../types/models';
import createBaseStore from './base.store';

export const useCategoryStore = createBaseStore<TransactionCategory>("categories");
