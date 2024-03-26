import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('token');
    setIsAuthenticated(isLoggedIn);
  }, []);

  console.log(isAuthenticated)
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login", { replace: true })
    handleMenuClose();
  };

  const handleLogIn = () => {
    navigate("/login", { replace: true })
    handleMenuClose();
  };

  return (
    <div className="z-[99999] sticky h-[60px] mb-5%">
      <div className="p-3 px-4 gap-6 flex items-center justify-between" style={styles.body}>
        {/* Centered content */}
        <div className="flex items-center gap-10 text-[1.5rem] px-2 hidden lg:flex justify-center" style={styles.linkContainer}>
          <div>
            {isAuthenticated ? (
              <div>
                <Link to="/addvehicle" style={{ color: "white" }}>Add Vehicle</Link>
              </div>
            ) : (
              <div>
                <Link to="/" style={{ color: "white" }}>Vehicles</Link>  
              </div>
            )}
          </div>
          {isAuthenticated ? (
            <div>
              <Link to="/home" style={{ color: "white" }}>Vehicles</Link>
            </div>
          ) : null}
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

        {/* Right-aligned content */}
        <div style={styles.iconContainer}>
          {isAuthenticated ? (
            <React.Fragment>
              <AccountCircleIcon onClick={handleMenuOpen} style={{ cursor: "pointer", color: "white" }} />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <AccountCircleIcon onClick={handleMenuOpen} style={{ cursor: "pointer", color: "white" }} />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogIn}>LogIn</MenuItem>
              </Menu>
            </React.Fragment>

          )}
        </div>
      </div>
    </div>
  );
}
