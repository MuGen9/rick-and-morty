import { Paper, Box, Typography, Stack } from "@mui/material";
import { LocationOn, ChildCare } from "@mui/icons-material/";
import { Character } from "../utils/types";
import {
  capitalizeFirstLetter,
  renderGenderIcon,
  renderStatusIcon,
} from "../utils/shared";
import { useState } from "react";
import MyModal from "./MyModal";

interface CharacterProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { name, origin, image, species, gender, status } = character;

  const handleOpen = function () {
    if (!open) setOpen(true);
  };

  const handleClose = function () {
    if (open) setOpen(false);
  };

  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        gap: 1,
        borderRadius: 2,
        pb: 1.5,
        cursor: "pointer",
      }}
      onClick={handleOpen}
    >
      <Box
        component="img"
        alt="Character photo"
        src={image}
        sx={{
          width: "300px",
          height: "300px",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      ></Box>
      <Typography variant="h6">{name}</Typography>
      <Stack direction="row" spacing={0.2} justifyContent="center">
        <LocationOn />
        <Typography>{capitalizeFirstLetter(origin.name)}</Typography>
      </Stack>
      <Stack direction="row" spacing={0.2} justifyContent="center">
        <ChildCare />
        <Typography>{capitalizeFirstLetter(species)}</Typography>
      </Stack>
      <Stack direction="row" spacing={0.2} justifyContent="center">
        {renderGenderIcon(gender)}
        <Typography>{capitalizeFirstLetter(gender)}</Typography>
      </Stack>

      <Stack direction="row" spacing={0.2} justifyContent="center">
        {renderStatusIcon(status)}
        <Typography>{capitalizeFirstLetter(status)}</Typography>
      </Stack>
      <MyModal character={character} open={open} closeModal={handleClose} />
    </Paper>
  );
};

export default CharacterCard;
