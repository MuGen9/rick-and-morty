import { ChangeEvent, useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Box,
  TextField,
} from "@mui/material";
import { setFilters } from "../redux/characterSlice";
import {
  speciesOptions,
  statusOptions,
  genderOptions,
} from "../utils/filterOptions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CharacterGender, CharacterStatus } from "../utils/types";

const CharacterFilterRedux = () => {
  const [localNameFilter, setLocalNameFilter] = useState<string | undefined>(
    ""
  );
  const [error, setError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const filters = useAppSelector((state) => state.characters.filters);
  const dispatch = useAppDispatch();

  const handleClear = () => {
    setLocalNameFilter("");
    dispatch(
      setFilters({
        page: 1,
        name: "",
        species: "",
        status: "",
        gender: "",
      })
    );
    setError("");
    setIsValid(true);
  };

  useEffect(() => {
    setLocalNameFilter(filters.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      if (localNameFilter !== filters.name) {
        dispatch(setFilters({ name: localNameFilter, page: 1 }));
      }
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localNameFilter]);

  const handleInputChange = (str: string) => {
    setError("");
    setIsValid(true);

    if (str.match(/^[a-zA-Z0-9\s-'.]*$/)) {
      setLocalNameFilter(str);
    } else {
      setError(
        "English letters, numbers, dots, spaces, dashes or single quotes"
      );
      setIsValid(false);
    }
  };

  return (
    <>
      <Grid container spacing={2} padding={3}>
        <Grid item xs={12} sm={6} md={3} color="primary">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={localNameFilter}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e.target.value)
            }
            error={!isValid}
            helperText={error}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="species-label">Species</InputLabel>
            <Select
              labelId="species-label"
              label="Species"
              value={filters.species}
              onChange={(e) => {
                dispatch(setFilters({ species: e.target.value, page: 1 }));
              }}
            >
              {speciesOptions.map((specie) => (
                <MenuItem key={specie.value} value={specie.value}>
                  {specie.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              label="Status"
              value={filters.status}
              onChange={(e) => {
                dispatch(
                  setFilters({
                    status: e.target.value as CharacterStatus,
                    page: 1,
                  })
                );
              }}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              label="Gender"
              value={filters.gender}
              onChange={(e) => {
                dispatch(
                  setFilters({
                    gender: e.target.value as CharacterGender,
                    page: 1,
                  })
                );
              }}
            >
              {genderOptions.map((gender) => (
                <MenuItem key={gender.value} value={gender.value}>
                  {gender.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Button color="primary" variant="contained" onClick={handleClear}>
          Clear Filters
        </Button>
      </Box>
    </>
  );
};

export default CharacterFilterRedux;
