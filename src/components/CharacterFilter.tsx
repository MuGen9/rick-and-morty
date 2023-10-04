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
import { useCharacterContext } from "../providers/CharacterContextProvider";
import {
  speciesOptions,
  statusOptions,
  genderOptions,
} from "../utils/filterOptions";

const CharacterFilter = () => {
  const {
    nameFilter,
    setNameFilter,
    speciesFilter,
    setSpeciesFilter,
    statusFilter,
    setStatusFilter,
    genderFilter,
    setGenderFilter,
    setCurrentPage,
  } = useCharacterContext();
  const [localNameFilter, setLocalNameFilter] = useState("");

  const handleClear = () => {
    setLocalNameFilter("");
    setNameFilter("");
    setSpeciesFilter("");
    setStatusFilter("");
    setGenderFilter("");
    setCurrentPage(1);
  };

  useEffect(() => {
    setLocalNameFilter(nameFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setNameFilter(localNameFilter);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localNameFilter]);

  const handleInputChange = (str: string) => {
    if (str.match(/^[a-zA-Z0-9\s-]*$/)) setLocalNameFilter(str);
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
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="species-label">Species</InputLabel>
            <Select
              labelId="species-label"
              label="Species"
              value={speciesFilter}
              onChange={(e) => {
                setSpeciesFilter(e.target.value);
                setCurrentPage(1);
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
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
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
              value={genderFilter}
              onChange={(e) => {
                setGenderFilter(e.target.value);
                setCurrentPage(1);
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

export default CharacterFilter;
