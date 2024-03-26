import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const styles = {
  body: {
    backgroundColor: "#222",
    color: "white",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1rem",
    padding: "1rem",
    borderTop: "1px solid gray",
  },
  linkContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
  },
};

const FooterComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('token');
    setIsAuthenticated(isLoggedIn);
  }, []);
  
  return (
    <footer style={styles.body}>
      <div className="z-[99999] sticky h-[60px] mb-5%">
        <div className="p-3 px-4 gap-6 flex items-center justify-between" style={styles.body}>
          {/* Centered content */}
          <div className="flex items-center gap-10 text-[1.5rem] px-2 hidden lg:flex justify-center" style={styles.linkContainer}>
            <div>
              { isAuthenticated ? (
                <Link to="/addvehicle" style={{ color: "white" }}>Add Vehicle</Link>
              ) : (
                <Link to="/" style={{ color: "white" }}>Vehicles</Link>
              )}
            </div>
            {isAuthenticated ? (
            <div>
              <Link to="/home" style={{ color: "white" }}>Home</Link>
            </div>
          ) : 
          null}
           {isAuthenticated ? (
            <div>
              <Link to="/homeaccesory" style={{ color: "white" }}>Accesories</Link>
            </div>
          ) : null}
            {isAuthenticated ? (
              <div>
                <Link to="/addaccesory" style={{ color: "white" }}>Add Accessory</Link>
              </div>
            ) : (
              <div>
                <Link to="/accesories" style={{ color: "white" }}>Accessories</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={styles.iconContainer}>
        <InstagramIcon data-testid="InstagramIcon" />
        <FacebookIcon data-testid="FacebookIcon" />
        <TwitterIcon data-testid="TwitterIcon" />
        <YouTubeIcon data-testid="YouTubeIcon" />
      </div>
    </footer>
  );
};

export default FooterComponent;
