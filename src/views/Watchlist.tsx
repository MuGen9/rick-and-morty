import { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TableSortLabel,
} from "@mui/material";
import { WatchlistEpisode } from "../utils/types";
import { DeleteForever, Visibility, VisibilityOff } from "@mui/icons-material";
import useLocalStorage from "../hooks/localStorage";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistEpisode[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedColumn, setSortedColumn] = useState<string>("id");
  const { themeName } = useLocalStorage();

  useEffect(() => {
    const loadLocalStorage = async () => {
      const savedWatchlist = await localStorage.getItem("watchlist");
      let savedWatchlistParsed;

      if (savedWatchlist) {
        savedWatchlistParsed = await JSON.parse(savedWatchlist);
      }

      if (Array.isArray(savedWatchlistParsed)) {
        setWatchlist(savedWatchlistParsed);
      } else setWatchlist([]);
    };
    loadLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleWatched = (id: number) => {
    const updatedWatchlist = [...watchlist];
    const episodeIndex = updatedWatchlist.findIndex(
      (episode) => episode.id === id
    );

    if (episodeIndex !== -1) {
      updatedWatchlist[episodeIndex].watched =
        !updatedWatchlist[episodeIndex].watched;
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    }
  };

  const deleteEpisode = (id: number) => {
    const updatedWatchlist = [...watchlist].filter(
      (episode) => episode.id !== id
    );

    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const handleSort = (column: string) => {
    const newSortOrder =
      sortedColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortedColumn(column);

    const sortedWatchlist = [...watchlist].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.id < b.id ? -1 : 1;
      } else {
        return b.id < a.id ? -1 : 1;
      }
    });

    setWatchlist(sortedWatchlist);
  };

  return (
    <>
      {watchlist.length === 0 && (
        <Typography>Add episodes to the watchlist</Typography>
      )}
      {watchlist.length > 0 && (
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
                <TableCell align="right">Watched</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {watchlist.map((episode) => (
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
                  <TableCell
                    align="right"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "#bfde42" },
                    }}
                    onClick={() => toggleWatched(episode.id)}
                  >
                    {episode.watched ? (
                      <Visibility color="secondary" />
                    ) : (
                      <VisibilityOff />
                    )}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ cursor: "pointer", "&:hover": { color: "#FB6467" } }}
                    onClick={() => deleteEpisode(episode.id)}
                  >
                    <DeleteForever />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Watchlist;
