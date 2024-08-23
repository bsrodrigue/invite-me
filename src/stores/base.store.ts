import { create } from 'zustand';
import { useAsyncStorage } from '../lib/storage';
import Crypto from '../lib/crypto';

interface BaseState<T> {
  items: T[];

  init: (items: T[]) => void;
  create: (item: T) => void;
  update: (item: Partial<T>) => void;
  remove: (uuid: string) => void;

  clear: () => void;
}

const { storeData } = useAsyncStorage();

export default function createBaseStore<T>(namespace: string) {
  return create<BaseState<T>>((set) => ({
    items: [],

    init: (items) => set({ items }),

    create: (item) => {
      const createdAt = new Date().toISOString();
      item.uuid = Crypto.generateRandomUUID();
      item.createdAt = createdAt;
      item.updatedAt = createdAt;
      set((state) => {
        const items = [...state.items, item]
        storeData(namespace, items);
        return {
          items,
        }
      });
    },

    update: (item) => {
      const updatedAt = new Date().toISOString();
      item.updatedAt = updatedAt;

      set((state) => {

        const items = state.items.map((i) => {
          if (i.uuid == item.uuid) {
            i = { ...i, ...item };
          }
          return i;
        });

        storeData(namespace, items);

        return {
          items,
        }
      });
    },

    remove: (uuid) => {
      set((state) => {
        const items = state.items.filter((item) => (item.uuid != uuid))

        storeData(namespace, items);
        return {
          items,
        }
      });
    },

    clear: () => {
      set((state) => {
        storeData(namespace, []);
        return {
          items: []
        };
      })
    }
  }));
};
