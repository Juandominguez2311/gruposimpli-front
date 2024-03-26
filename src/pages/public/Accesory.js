import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AccesoryCard from "../../components/AccesoryCard/AccesoryCard";

export default function Accesory() {
  const [accesory, serAccesory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [modelFilters, setModelFilters] = useState({
    SUV: false,
    Auto: false,
    "Pick-Up": false,
    Commertial: false,
  });
  const [sortOrder, setSortOrder] = useState("asc");

  const getAccesory = async () => {
    try {
      let url = "http://localhost:3000/api/accesory";
      if (searchValue) {
        url = `http://localhost:3000/api/accesory/search/${searchValue}`;
      }
      const { data } = await axios.get(url);
      serAccesory(data);
    } catch (error) {
      console.error("Error fetching accesory:", error);
    }
  };

  useEffect(() => {
    getAccesory();
  }, [searchValue]);

  const filterAccesoryByModel = () => {
    const selectedModels = Object.entries(modelFilters)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    let filteredaccesory = accesory;

    if (selectedModels.length > 0) {
      filteredaccesory = filteredaccesory.filter((accesory) =>
        selectedModels.includes(accesory.model)
      );
    }

    return filteredaccesory;
  };

  const groupAccesoryByModel = (filteredaccesory) => {
    const groupedaccesory = {};
    filteredaccesory.forEach((accesory) => {
      if (!groupedaccesory[accesory.model]) {
        groupedaccesory[accesory.model] = [];
      }
      groupedaccesory[accesory.model].push(accesory);
    });

    return groupedaccesory;
  };

  const handleModelFilterChange = (model) => {
    setModelFilters((prevFilters) => ({
      ...prevFilters,
      [model]: !prevFilters[model],
    }));
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortProducts = (products) => {
    if (sortOrder === "asc") {
      return products.slice().sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      return products.slice().sort((a, b) => b.price - a.price);
    } else {
      return products;
    }
  };

  const renderProductCards = (products) => {
    const productGroups = [];
    for (let i = 0; i < products.length; i += 4) {
      productGroups.push(products.slice(i, i + 4));
    }

    return productGroups.map((group, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        {group.map((prod) => (
          <div key={prod._id} style={{ flex: "1 0 23%" }}>
            <Link to={`/Accesories/Detail/${prod._id}`}>
              <AccesoryCard prod={prod} />
            </Link>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {/* Filter Column */}
      <div
        style={{
          flex: "10%",
          marginTop: "20px",
          padding: "0 20px",
          textAlign: "left",
        }}
      >
        
        <Typography variant="body1" color="textSecondary">
          Filtros
        </Typography>
        <Typography
          variant="body1"
          color="#212121"
          style={{ fontWeight: "bold" }}
        >
          Carroceria
        </Typography>
        {Object.entries(modelFilters).map(([model, checked]) => (
          <div key={model}>
            <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleModelFilterChange(model)}
              />
              {model}
            </label>
          </div>
        ))}
      </div>

      {/* Vehicle Column */}
      <div style={{ flex: "80%", display: "flex", flexDirection: "column" }}>
        <div
          style={{ alignSelf: "flex-end", margin: "20px", textAlign: "center" }}
        >
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={searchValue}
              placeholder=" Buscar por nombre"
              onChange={(e) => setSearchValue(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <button
              onClick={() => getAccesory()}
              style={{ marginBottom: "10px", marginLeft: "10px" }}
            >
              Buscar
            </button>
          </div>

          {/* Sort */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormControl style={{ minWidth: "140px", marginRight: "20px" }}>
              <Select
                labelId="sort-label"
                value={sortOrder}
                onChange={handleSortChange}
                style={{ minWidth: "auto" }}
              >
                <MenuItem value="asc">Menor a Mayor</MenuItem>
                <MenuItem value="desc">Mayor a Menor</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Accesory Renders */}
        {Object.entries(groupAccesoryByModel(filterAccesoryByModel()))
          .sort(([modelA], [modelB]) => {
            const order = ["SUV", "Auto", "Pick-Up", "Commertial"];
            return order.indexOf(modelA) - order.indexOf(modelB);
          })
          .map(([model, products]) => (
            <div key={model} style={{ width: "100%" }}>
              <h2>{model}</h2>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {renderProductCards(sortProducts(products))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
