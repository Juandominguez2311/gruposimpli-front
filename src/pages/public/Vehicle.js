import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function Vehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [modelFilters, setModelFilters] = useState({
    SUV: false,
    Auto: false,
    "Pick-Up": false,
    Commertial: false,
  });
  const [otherFilters, setOtherFilters] = useState({
    Híbridos: false,
    Deportivos: false,
  });
  const [sortOrder, setSortOrder] = useState("asc");

  const getVehicles = async () => {
    try {
      let url = "http://localhost:3000/api/vehicle";
      if (searchValue) {
        url = `http://localhost:3000/api/vehicle/search/${searchValue}`;
      }
      const {
        data: { result },
      } = await axios.get(url);
      setVehicles(result);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    getVehicles();
  }, [searchValue]); 

  const filterVehiclesByModel = () => {
    const selectedModels = Object.entries(modelFilters)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    const selectedOtherFilters = Object.entries(otherFilters)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    let filteredVehicles = vehicles;

    if (selectedModels.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        selectedModels.includes(vehicle.model)
      );
    }

    if (selectedOtherFilters.length > 0) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        selectedOtherFilters.includes(vehicle.tipe)
      );
    }

    return filteredVehicles;
  };

  const groupVehiclesByModel = (filteredVehicles) => {
    const groupedVehicles = {};

    filteredVehicles.forEach((vehicle) => {
      if (!groupedVehicles[vehicle.model]) {
        groupedVehicles[vehicle.model] = [];
      }
      groupedVehicles[vehicle.model].push(vehicle);
    });

    return groupedVehicles;
  };

  const handleModelFilterChange = (model) => {
    setModelFilters((prevFilters) => ({
      ...prevFilters,
      [model]: !prevFilters[model],
    }));
  };

  const handleOtherFilterChange = (filter) => {
    setOtherFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
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
      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {group.map((prod) => (
          <div key={prod._id} style={{ flex: '1 0 23%' }}>
            <Link to={`/Detail/${prod._id}`}>
              <ProductCard prod={prod} />
            </Link>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      {/* Filter Columns */}
      <div style={{ flex: "10%", marginTop: "20px", padding: "0 20px", textAlign: "left" }}>
        <Typography variant="body1" color="textSecondary">
          Filtros
        </Typography>
        <Typography variant="body1" color="#212121" style={{ fontWeight: 'bold' }}>
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
        <Typography variant="body1" color="#212121" style={{ fontWeight: 'bold', marginTop: '10px' }}>
          Otros Filtros
        </Typography>
        {Object.entries(otherFilters).map(([filter, checked]) => (
          <div key={filter}>
            <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleOtherFilterChange(filter)}
              />
              {filter}
            </label>
          </div>
        ))}
      </div>

     {/* Vehicle Columns */}
     <div style={{ flex: "80%", display: "flex", flexDirection: "column" }}>
        <div style={{ alignSelf: "flex-end", margin: "20px", textAlign: "center" }}>
           {/* Search */}
           <div style={{ display: "flex", alignItems: "center" }}>
              <input 
                type="text" 
                value={searchValue} 
                placeholder=" Buscar por nombre"
                onChange={(e) => setSearchValue(e.target.value)} 
                style={{ marginBottom: '10px' }} 
              />
              <button onClick={() => getVehicles()} style={{ marginBottom: '10px', marginLeft: '10px' }}>Buscar</button>
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

        {/* Vehicle Render */}
        {Object.entries(groupVehiclesByModel(filterVehiclesByModel())).sort(([modelA], [modelB]) => {
          const order = ['SUV', 'Auto', 'Pick-Up', 'Commertial'];
          return order.indexOf(modelA) - order.indexOf(modelB);
        }).map(
          ([model, products]) => (
            <div key={model} style={{ width: "100%" }}>
              <h2>{model}</h2>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {renderProductCards(sortProducts(products))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
      