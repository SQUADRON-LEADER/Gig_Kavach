import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserRole = "admin" | "user";

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
  name: string;
  login: (role: UserRole, name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: null,
      name: "",
      login: (role, name) =>
        set({
          isAuthenticated: true,
          role,
          name,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          role: null,
          name: "",
        }),
    }),
    {
      name: "gig-sahayata-auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
