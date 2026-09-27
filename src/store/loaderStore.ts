import { create } from 'zustand';

interface LoaderState {
  hasLoaded: boolean;
  setHasLoaded: (loaded: boolean) => void;
}

/**
 * In-memory loader store:
 * - Resets on full page reload / tab refresh (so the cinematic intro plays on every fresh load)
 * - Persists during client-side SPA navigation between pages (so navigating away and coming back doesn't replay the loader)
 */
export const useLoaderStore = create<LoaderState>((set) => ({
  hasLoaded: false,
  setHasLoaded: (loaded) => set({ hasLoaded: loaded }),
}));
