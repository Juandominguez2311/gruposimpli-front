import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
const styles = {
  body: {
    backgroundColor: "#222",
    color: "white",
  },
  linkContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
  },
};

export default function NavbarComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('token');
    setIsAuthenticated(isLoggedIn);
  }, []);


  return (
    <div className="z-[99999] sticky h-[60px] mb-5%">
      <div className="p-3 px-4 gap-6 flex items-center justify-between" style={styles.body}>
        {/* Centered content */}
        <div className="flex items-center gap-10 text-[1.5rem] px-2 hidden lg:flex justify-center" style={styles.linkContainer}>
          <div>
           { isAuthenticated ? (
            <div>
              <Link to="/addvehicle" style={{ color: "white" }}>Add Vehicle</Link>
            </div>
          ): <div>
           <Link to="/" style={{ color: "white" }}>Vehicles</Link>  
          </div>}
          </div>
          {isAuthenticated ? (
            <div>
              <Link to="/addaccesory" style={{ color: "white" }}>Add Accessory</Link>
            </div>
          ) : 
          <div> <Link to="/accesories" style={{ color: "white" }}>Accessories</Link>
          </div>}
        </div>
      </div>
    </div>
  );
}

