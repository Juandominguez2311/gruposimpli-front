import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function CreateAccesory() {
  const { idaccesory } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    img: "",
    model: "",
    tipe: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (idaccesory) {
        try {
          let jwt = localStorage.getItem("token").replace(/"/g, "");
          let dealerId = localStorage.getItem("id").replace(/"/g, "");

          const response = await axios.get(
            `http://localhost:3000/api/dealer/${dealerId}/accesory/${idaccesory}`,
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          );

          const accesoryData = response.data;
          setFormData({
            name: accesoryData.name,
            price: accesoryData.price,
            img: accesoryData.img,
            model: accesoryData.model,
            tipe: accesoryData.tipe,
          });
        } catch (error) {
          console.error("Error fetching accesory data:", error);
        }
      }
    };

    fetchData();
  }, [idaccesory]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const price = formData.get("price");
    const img = formData.get("img");
    const model = formData.get("model");
    let jwt = localStorage.getItem("token").replace(/"/g, "");
    let dealerId = localStorage.getItem("id").replace(/"/g, "");
    const tipe = formData.get("tipe");

    try {
      let url = `http://localhost:3000/api/dealer/${dealerId}/accesory`;
      if (idaccesory) {
        url += `/${idaccesory}`;
      }

      const response = await axios.post(
        url,
        {
          name,
          price,
          img,
          dealerId,
          tipe,
          model,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      navigate("/home");
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
            {idaccesory ? "Edit Accesory" : "Create Accesory"}
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
              label="Accesory Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Accesory price"
              name="price"
              autoComplete="price"
              autoFocus
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
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
              value={formData.img}
              onChange={(e) =>
                setFormData({ ...formData, img: e.target.value })
              }
            />

            <Select
              margin="normal"
              required
              fullWidth
              id="model"
              label="Accesory model"
              name="model"
              autoComplete="model"
              autoFocus
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
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
              label="Accesory tipe"
              name="tipe"
              autoComplete="tipe"
              autoFocus
              value={formData.tipe}
              onChange={(e) =>
                setFormData({ ...formData, tipe: e.target.value })
              }
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
              {idaccesory ? "Edit Accesory" : "Add Accesory"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
