import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ mt: { xs: 3, sm: 6 } }}>
      <img src="rickmorty.gif" alt="greetings" style={{ maxWidth: "90%" }} />
      <Typography sx={{ p: 2 }}>
        Created by Justin Roiland and Dan Harmon
      </Typography>
    </Box>
  );
};

export default Home;
