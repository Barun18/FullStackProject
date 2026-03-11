import { create } from "zustand";

type SearchState = {
    search: string;
    setSearch : (value: string) => void;
};

const useSearhStore = create<SearchState> ((set) =>({
    search: "",
    setSearch:(value) => set({ search: value }),
}));

export default useSearhStore;
