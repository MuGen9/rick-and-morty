import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box>
      <Typography>Loading...</Typography>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
