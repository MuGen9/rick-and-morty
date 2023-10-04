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
  Typography,
  Button,
  TextField,
  TableSortLabel,
} from "@mui/material";
import { ApiResponse, Info, Location, PaginationType } from "../utils/types";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import useLocalStorage from "../hooks/localStorage";
import { createSearchParams } from "../utils/shared";

const Locations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationType>();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [debouncedNameFilter, setDebouncedNameFilter] = useState<string>(
    searchParams.get("name") || ""
  );
  const [nameFilter, setNameFilter] = useState<string>(
    searchParams.get("name") || ""
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedColumn, setSortedColumn] = useState<string>("id");
  const { themeName } = useLocalStorage();

  const getLocations = async function () {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setError(false);
    setLoading(true);

    try {
      const res: ApiResponse<Info<Location[]>> = await axios.get(
        `${process.env.REACT_APP_API_URL}/location/`,
        {
          params: {
            page: currentPage,
            name: nameFilter,
          },
        }
      );

      setLocations(res?.data.results || []);
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
    getLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, nameFilter]);

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

    const sortedLocations = [...locations].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.id < b.id ? -1 : 1;
      } else {
        return b.id < a.id ? -1 : 1;
      }
    });

    setLocations(sortedLocations);
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
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Dimension</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((location) => (
                <TableRow
                  key={location.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      backgroundColor:
                        themeName === "dark" ? "#272727" : "#f2f2f2",
                    },
                  }}
                >
                  <TableCell component="th" scope="location">
                    {location.id}
                  </TableCell>
                  <TableCell align="left">{location.name}</TableCell>
                  <TableCell align="right">{location.type}</TableCell>
                  <TableCell align="right">{location.dimension}</TableCell>
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

export default Locations;
