import { Account } from '../types/models';
import createBaseStore from './base.store';

export const useAccountStore = createBaseStore<Account>("accounts");
