import { create } from 'zustand';

interface UserProfile {
  avatar?: string;
  username?: string;
}

interface UserState {
  user: UserProfile;
  update: (user: Partial<UserProfile>) => void;
  clear: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: { avatar: "", username: "" },
  update: (user) => {
    set(state => ({
      user: { ...state.user, ...user }
    }));
  },
  clear: () => set({ user: { avatar: "", username: "" } }),
}));

