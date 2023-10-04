import { Box, Pagination, Typography } from "@mui/material";
import CharacterCard from "../components/CharacterCard";
import Loading from "../components/Loading";
import CharacterFilter from "../components/CharacterFilter";
import { useCharacterContext } from "../providers/CharacterContextProvider";

const Characters = () => {
  const {
    characters,
    error,
    errorMessage,
    loading,
    pagination,
    currentPage,
    setCurrentPage,
  } = useCharacterContext();

  const results = characters.length ? (
    characters.map((character) => (
      <CharacterCard key={character.id} character={character} />
    ))
  ) : (
    <Typography>No results found</Typography>
  );

  return (
    <>
      <CharacterFilter />
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
            page={currentPage}
            color="primary"
            onChange={(_e: React.ChangeEvent<unknown>, page: number) =>
              setCurrentPage(page)
            }
          />
        )}
      </Box>
    </>
  );
};

export default Characters;
