import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const defaultTheme = createTheme();

export default function CreateVehicle(id) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const price = formData.get("price");
    const img = formData.get("img");
    let jwt = localStorage.getItem('token');
    jwt = jwt.replace(/"/g, '');
    let dealerId = localStorage.getItem('id');
    dealerId = dealerId.replace(/"/g, '');
    const tipe = formData.get("tipe");
    try {

      const response = await axios.post(
        `http://localhost:3000/api/dealer/${dealerId}/vehicle`,
        {
          name,
          price,
          img,
          dealerId,
          tipe,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` }
      }
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Vehicle
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Vehicle Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Vehicle price"
              name="price"
              autoComplete="price"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="img"
              label="img url"
              name="img"
              autoComplete="img"
              autoFocus
            />

            <Select
              margin="normal"
              required
              fullWidth
              id="model"
              label="Vehicle model"
              name="model"
              autoComplete="model"
              autoFocus
              defaultValue=""
            >
              <MenuItem value="SUV">SUV</MenuItem>
              <MenuItem value="Auto">Auto</MenuItem>
              <MenuItem value="Pick-up">Pick-up</MenuItem>
              <MenuItem value="Comercial">Comercial</MenuItem>
            </Select>

            <Select
              margin="normal"
              required
              fullWidth
              id="tipe"
              label="Vehicle tipe"
              name="tipe"
              autoComplete="tipe"
              autoFocus
              defaultValue=""
            >
              <MenuItem value="Híbridos">Híbridos</MenuItem>
              <MenuItem value="Deportivos">Deportivos</MenuItem>
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add vehicle
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
