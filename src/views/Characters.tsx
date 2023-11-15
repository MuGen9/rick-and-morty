import { useEffect } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import CharacterCard from "../components/CharacterCard";
import Loading from "../components/Loading";
import CharacterFilterRedux from "../components/CharcterFilterRedux";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setCharacters,
  setError,
  setErrorMessage,
  setFilters,
  setLoading,
  setPagination,
} from "../redux/characterSlice";
import { useSearchParams } from "react-router-dom";
import { createSearchParams } from "../utils/shared";

const Characters = () => {
  const [, setSearchParams] = useSearchParams();

  const { characters, filters, error, loading, errorMessage, pagination } =
    useAppSelector((state) => state.characters);
  const dispatch = useAppDispatch();

  const getCharacters = async function () {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(setError(false));
    dispatch(setErrorMessage(""));
    dispatch(setLoading(true));

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/character/?` +
          new URLSearchParams({
            page: filters.page.toString() || "",
            name: filters.name || "",
            species: filters.species || "",
            status: filters.status || "",
            gender: filters.gender || "",
          })
      );

      const data = await res.json();
      if (!res.ok) throw Error(data.error);

      setSearchParams(
        createSearchParams(
          filters.page,
          filters.name,
          filters.species,
          filters.status,
          filters.gender
        )
      );

      dispatch(setPagination(data.info));
      dispatch(setCharacters(data.results));
    } catch (err) {
      setError(true);
      if (err instanceof Error) {
        dispatch(setErrorMessage(err.message));
      }
      dispatch(setCharacters([]));
      dispatch(setPagination(undefined));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const results = characters.length ? (
    characters.map((character) => (
      <CharacterCard key={character.id} character={character} />
    ))
  ) : (
    <Typography>No results found</Typography>
  );

  return (
    <>
      <CharacterFilterRedux />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          padding: 3,
        }}
      >
        {loading && <Loading />}
        {error && !loading && <Typography>{errorMessage}</Typography>}
        {!loading && !error && results}
      </Box>
      <Box
        component="nav"
        sx={{ display: "flex", justifyContent: "center", pb: 3 }}
      >
        {pagination && !loading && !error && (
          <Pagination
            count={pagination.pages}
            page={filters.page}
            color="primary"
            onChange={(_e: React.ChangeEvent<unknown>, page: number) => {
              dispatch(setFilters({ page: page }));
            }}
          />
        )}
      </Box>
    </>
  );
};

export default Characters;
