import NotFoundIcon from "../assets/images/notfoundimage.svg";
import { Button, Typography } from "@mui/material";
import LogoImage from "../assets/images/appnorr.png";
import { Link } from "react-router-dom";



function NotFound(props) {
  return (
    <div className="flex flex-col items-center justify-center mt-10 p-5">
      <div className="flex items-center justify-center">
        <img alt="" src={LogoImage} className="w-10 h-10 md:w-14 md:h-14" />
        <h1
          style={{ color: "#4081EB" }}
          className="p-5 text-center font-bold text-xl sm:text-4xl"
        >
          Appnor.co®
        </h1>
      </div>
      <Typography sx={{ fontSize: "16px", fontWeight: "260", color: "black" }}>
        Looks Like You Got Lost
      </Typography>
      <Typography sx={{ fontSize: "28px", fontWeight: "700", color: "black" }}>
        PAGE NOT FOUND!
      </Typography>
      <img width="400px" height="400px" src={NotFoundIcon} alt="" />

      <Link
        style={{
          textDecoration: "none",
          color: "inherit",
          width: "350px",
          display: "flex",
          justifyContent: "center",
        }}
        to="/"
      >
        <Button
          sx={{
            marginLeft: "30px",
            marginRight: "30px",
          }}
          fullWidth
          variant="contained"
        >
          GO HOME!
        </Button>
      </Link>
     
    </div>
  );
}

export default NotFound;
