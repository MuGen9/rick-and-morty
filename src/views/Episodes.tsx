import { ChangeEvent, useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Pagination,
  TextField,
  Button,
  Typography,
  TableSortLabel,
} from "@mui/material";
import {
  ApiResponse,
  Episode,
  Info,
  PaginationType,
  WatchlistEpisode,
} from "../utils/types";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Loading from "../components/Loading";
import { createSearchParams } from "../utils/shared";
import useLocalStorage from "../hooks/localStorage";

const Episodes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationType>();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [watchlist, setWatchlist] = useState<WatchlistEpisode[]>([]);
  const [debouncedNameFilter, setDebouncedNameFilter] = useState<string>(
    searchParams.get("name") || ""
  );
  const [nameFilter, setNameFilter] = useState<string>(
    searchParams.get("name") || ""
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedColumn, setSortedColumn] = useState<string>("id");
  const { themeName } = useLocalStorage();

  const getEpisodes = async function () {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setError(false);
    setLoading(true);
    setErrorMessage("");

    try {
      const res: ApiResponse<Info<Episode[]>> = await axios.get(
        `${process.env.REACT_APP_API_URL}/episode/`,
        {
          params: {
            page: currentPage,
            name: nameFilter,
          },
        }
      );

      setEpisodes(res?.data.results || []);
      setPagination(res?.data.info);
      setSearchParams(createSearchParams(currentPage, nameFilter));
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.message);
        if (err.response) {
          setErrorMessage(err.response.data.error);
        }
      }
      setError(true);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEpisodes();

    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, nameFilter]);

  const toggleWatchlist = (episode: Episode) => {
    const newEpisodeToWatchlist = {
      id: episode.id,
      name: episode.name,
      episode: episode.episode,
      watched: false,
    };

    const existingEpisodeIndex = watchlist.findIndex(
      (item) => item.id === newEpisodeToWatchlist.id
    );

    if (existingEpisodeIndex !== -1) {
      const updatedWatchlist = [...watchlist];
      updatedWatchlist.splice(existingEpisodeIndex, 1);
      updatedWatchlist.sort((a, b) => a.id - b.id);
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    } else {
      const updatedWatchlist = [...watchlist, newEpisodeToWatchlist];
      updatedWatchlist.sort((a, b) => a.id - b.id);
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    }
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setNameFilter(debouncedNameFilter);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNameFilter]);

  const handleSort = (column: string) => {
    const newSortOrder =
      sortedColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortedColumn(column);

    const sortedEpisodes = [...episodes].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.id < b.id ? -1 : 1;
      } else {
        return b.id < a.id ? -1 : 1;
      }
    });

    setEpisodes(sortedEpisodes);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          sx={{ flexBasis: "50%" }}
          value={debouncedNameFilter}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDebouncedNameFilter(e.target.value)
          }
        />
        <Button variant="contained" onClick={() => setDebouncedNameFilter("")}>
          Clear filter
        </Button>
      </Box>
      {loading && <Loading />}
      {error && !loading && <Typography>{errorMessage}</Typography>}
      {!loading && !error && (
        <TableContainer
          component={Paper}
          sx={{ margin: "0 auto", mt: 3, maxWidth: 1250 }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell key="id">
                  <TableSortLabel
                    active={sortedColumn === "id"}
                    direction={sortOrder}
                    onClick={() => {
                      handleSort("id");
                    }}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Episode</TableCell>
                <TableCell align="right">Air Date</TableCell>
                <TableCell align="right">Watchlist</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {episodes.map((episode) => (
                <TableRow
                  key={episode.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      backgroundColor:
                        themeName === "dark" ? "#272727" : "#f2f2f2",
                    },
                  }}
                >
                  <TableCell component="th" scope="episode">
                    {episode.id}
                  </TableCell>
                  <TableCell align="left">{episode.name}</TableCell>
                  <TableCell align="right">{episode.episode}</TableCell>
                  <TableCell align="right">{episode.air_date}</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "#bfde42" },
                    }}
                    onClick={() => toggleWatchlist(episode)}
                  >
                    {watchlist.some((item) => item.id === episode.id) ? (
                      <Favorite color="secondary" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box
        component="nav"
        sx={{ display: "flex", justifyContent: "center", p: 3 }}
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

export default Episodes;
