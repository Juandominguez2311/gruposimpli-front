import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/addvehicle">
        <button style={{fontSize: "24px", margin: "10px"}}>Add Vehicle</button>
      </Link>
      <Link to="/addaccesory">
        <button style={{fontSize: "24px", margin: "10px"}}>Add Accessory</button>
      </Link>
    </div>
  );
}
