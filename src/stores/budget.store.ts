import { Budget } from '../types/models';
import createBaseStore from './base.store';

export const useBudgetStore = createBaseStore<Budget>("budgets");
