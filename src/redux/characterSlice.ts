import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CharacterReduxType,
  Character,
  PaginationType,
  CharacterStatus,
  CharacterGender,
} from "../utils/types";

const query = new URLSearchParams(window.location.search);

const initialState: CharacterReduxType = {
  characters: [],
  loading: false,
  error: false,
  errorMessage: "",
  filters: {
    page: Number(query.get("page")) || 1,
    name: query.get("name") || "",
    species: query.get("species") || "",
    status: (query.get("status") as CharacterStatus) || "",
    gender: (query.get("gender") as CharacterGender) || "",
  },
  pagination: undefined,
};

export const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
      state.loading = false;
      state.error = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<CharacterReduxType["filters"]>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (
      state,
      action: PayloadAction<PaginationType | undefined>
    ) => {
      state.pagination = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setCharacters,
  setLoading,
  setError,
  setFilters,
  setPagination,
  setErrorMessage,
} = characterSlice.actions;

export default characterSlice.reducer;
