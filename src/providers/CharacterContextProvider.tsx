import { createContext, useContext, useState, useEffect } from "react";
import {
  Character,
  PaginationType,
  CharacterContextType,
} from "../utils/types";
import { useSearchParams } from "react-router-dom";
import { createSearchParams } from "../utils/shared";

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export const CharacterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationType>();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );

  const [nameFilter, setNameFilter] = useState<string>(
    searchParams.get("name") || ""
  );
  const [speciesFilter, setSpeciesFilter] = useState<string>(
    searchParams.get("species") || ""
  );
  const [statusFilter, setStatusFilter] = useState<string>(
    searchParams.get("status") || ""
  );
  const [genderFilter, setGenderFilter] = useState<string>(
    searchParams.get("gender") || ""
  );

  const getCharacters = async function () {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setError(false);
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/character/?` +
          new URLSearchParams({
            page: currentPage.toString(),
            name: nameFilter,
            species: speciesFilter,
            status: statusFilter,
            gender: genderFilter,
          })
      );

      const data = await res.json();
      if (!res.ok) throw Error(data.error);

      setSearchParams(
        createSearchParams(
          currentPage,
          nameFilter,
          speciesFilter,
          statusFilter,
          genderFilter
        )
      );

      setCharacters(data.results);
      setPagination(data.info);
    } catch (err) {
      setError(true);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, nameFilter, speciesFilter, statusFilter, genderFilter]);

  return (
    <CharacterContext.Provider
      value={{
        characters,
        error,
        errorMessage,
        loading,
        pagination,
        currentPage,
        setCurrentPage,
        nameFilter,
        setNameFilter,
        speciesFilter,
        setSpeciesFilter,
        statusFilter,
        setStatusFilter,
        genderFilter,
        setGenderFilter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error(
      "useCharacterContext must be used within a CharacterContextProvider"
    );
  }
  return context;
};
