import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchData: {
    language: "",
  },
  setSearchData: (value) =>
    set((state) => ({
      ...state,
      searchData: { ...state?.searchData, ...value },
    })),
}));

export default useSearchStore;
