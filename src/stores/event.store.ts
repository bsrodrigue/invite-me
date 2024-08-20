import { UserEvent } from '../types/models';
import createBaseStore from './base.store';

export const useEventStore = createBaseStore<UserEvent>("user-events");
