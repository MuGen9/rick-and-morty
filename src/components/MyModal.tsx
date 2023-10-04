import { LocationOn, ChildCare } from "@mui/icons-material";
import {
  Dialog,
  Box,
  Paper,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import {
  capitalizeFirstLetter,
  renderGenderIcon,
  renderStatusIcon,
} from "../utils/shared";
import { Character } from "../utils/types";

interface CharacterProps {
  character: Character;
  open: boolean;
  closeModal: any;
}

const MyModal = ({ character, open, closeModal }: CharacterProps) => {
  const { name, origin, image, species, gender, status, location, episode } =
    character;

  const episodeList = episode.reduce((listOfEpisodes, link, index) => {
    const episodeNumber = link.split("/").slice(-1)[0];
    listOfEpisodes += `${episodeNumber}, `;

    if ((index + 1) % 8 === 0) {
      listOfEpisodes = listOfEpisodes.slice(0, -2);
      listOfEpisodes += "\n";
    }

    return listOfEpisodes;
  }, "");

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ textAlign: "center" }}>
        <Paper
          elevation={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "400px",
            gap: 1,
            borderRadius: 2,
            pb: 1.5,
            cursor: "pointer",
          }}
        >
          <Box
            component="img"
            alt="Character photo"
            src={image}
            sx={{
              width: "400px",
              height: "400px",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          ></Box>
          <Typography variant="h5">{name}</Typography>
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
          <Divider />
          <Typography>
            Current Location: <br />
            {location.name}
          </Typography>
          <Divider />
          <Typography sx={{ whiteSpace: "pre-line" }}>
            Appears in episode(s):
            <br />
            {episodeList.slice(0, -2)}
          </Typography>
          <Divider />
          <Button color="primary" onClick={closeModal}>
            Close
          </Button>
        </Paper>
      </Box>
    </Dialog>
  );
};

export default MyModal;
