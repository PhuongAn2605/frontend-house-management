import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { SidebarStyles, IconStyle } from "./NavBar";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <SidebarStyles>
      <IconStyle>
        <MenuIcon style={{ fontSize: "400%" }} />
        <Link to='/'><HomeOutlinedIcon fontSize="large" /></Link>
        <SettingsOutlinedIcon fontSize="large" />
        <DateRangeOutlinedIcon fontSize="large" />
      </IconStyle>
    </SidebarStyles>
  );
};

export default NavBar;
