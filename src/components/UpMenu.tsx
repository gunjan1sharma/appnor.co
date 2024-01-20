import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputAdornment,
  InputBaseClasses,
  InputLabel,
  List,
  Menu,
  MenuItem,
  Modal,
  OutlinedInput,
  OutlinedInputClasses,
  Typography,
} from "@mui/material";
import ColorImage from "../assets/images/colour.png";
import LogoImage from "../assets/images/appnorr.png";
import ProfileImage from "../assets/images/user.png";
import { ColorContext } from "../extras/ColorContext";
import MenuIcon from "@mui/icons-material/Menu";
import SingleColor from "./SingleColor";
import { Link, useLocation } from "react-router-dom";

const hexColors: string[] = [
  "#E91E63", // Pink
  "#9C27B0", // Purple
  "#673AB7", // Deep Purple
  "#3F51B5", // Indigo
  "#2196F3", // Blue
  "#03A9F4", // Light Blue
  "#00BCD4", // Cyan
  "#009688", // Teal
  "#4CAF50", // Green
  "#8BC34A", // Light Green
  "#CDDC39", // Lime
  "#FFEB3B", // Yellow
  "#FFC107", // Amber
  "#FF9800", // Orange
  "#FF5722", // Deep Orange
  "#795548", // Brown
  "#9E9E9E", // Grey
  "#607D8B", // Blue Grey
  "#F44336", // Red
  "#E53935", // Red
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #000000",
  boxShadow: 24,
  p: 1,
};

function UpMenu(props: any) {
  const headerRef = useRef<any>(null);
  const location = useLocation();
  const [headingColor, setHeadingColor] = useState("");
  const [deleted, setDeleted] = useState(false);
  const { setColor } = useContext(ColorContext);
  const [open, setOpen] = useState(false);
  const [profModel, setProfModel] = useState(false);
  const [loggedUser, setLoggedUser] = useState<any>();
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [persistedNotes, setPersistedNotes] = useState<{ [key: string]: any }>(
    []
  );

  function deleteColor(): void {
    console.log("deleteColor triggered in [UpMenu]");
    setDeleted(!deleted);
  }

  function fetchPersistedNotes(): { [key: string]: any } {
    const allValues: { [key: string]: any } = {};
    for (const key of Object.keys(localStorage)) {
      const value = localStorage.getItem(key);
      const parsedValue = JSON.parse(value!) || value;
      allValues[key] = parsedValue;
    }
    return allValues;
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const header = headerRef.current;
      if (scrollPosition >= window.innerHeight / 3) {
        header.classList.add("fixed", "top-0", "z-50", "bg-white");
        header.classList.remove(
          "bg-gradient-to-r",
          "from-yellow-200",
          "via-gray-100",
          "to-yellow-200"
        );
      }
      if (scrollPosition === 0) {
        header.classList.remove("fixed", "top-0");
        header.classList.add(
          "bg-gradient-to-r",
          "from-yellow-200",
          "via-gray-100",
          "to-yellow-200"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setProfModel(false);
  }, [location.pathname]);

  useEffect(() => {
    fetchPersistedUser();

    return () => {};
  }, [deleted]);

  function handleDialogOpen() {
    console.log("dialog clc1iked");
    if (localStorage.key(0) !== null) {
      console.log("dialog clciked");
      setProfModel(true);
    } else {
      alert("No Logged User Found!!");
    }
  }

  function fetchPersistedUser() {
    if (localStorage.key(0) !== null && localStorage.key(0)!.length > 15) {
      const LoggedInUser = localStorage.getItem(
        localStorage.key(0)!.toString()
      );
      console.log(`LoggedInUser : ${JSON.parse(LoggedInUser!)["email"]}`);
      setEmail(JSON.parse(LoggedInUser!)["email"]);
      setId(JSON.parse(LoggedInUser!)["uid"]);
    }
  }

  function signOut(params: any) {
    if (localStorage.key(0) !== null) {
      localStorage.clear();
      alert("Logout Successfull..");
      setProfModel(false);
      window.location.reload();
    }
  }

  const toggleDrawer = () => (event: { type: string; key: string }) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };

  const drawerItemList = () => (
    <Box>
      <Box>
        <div className="m-5 p-2 flex items-center flex-col border-2 border-gray-500">
          <h1 className=" text-bold text-xl font-extrabold">
            Your Saved Colors
          </h1>
          <h4>Click on color tile to copy or delete it</h4>
        </div>
        <br />
        {Object.entries(persistedNotes)
          .sort()
          .map(([key, value]) => (
            <SingleColor
              key={key}
              id={key}
              color={value["hex"]}
              colorValue={value}
              deleteColor={deleteColor}
            />
          ))}
      </Box>
    </Box>
  );

  function updateColor(): NodeJS.Timer {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * hexColors.length);
      const randomColor = hexColors[randomIndex];
      setHeadingColor(randomColor);
      setColor(randomColor);
    }, 1000);
    return intervalId;
  }

  const profileModel = (
    <React.Fragment>
      <Modal
        open={profModel}
        onClose={() => setProfModel(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center flex-col p-5">
            <div className="flex items-center justify-between">
              <img
                alt=""
                className="w-20 h-20 md:w-14 md:h-14"
                src={ProfileImage}
              />
              <div className="ml-5">
                <h3 className="font-bold">
                  {email.split("@")[0].toUpperCase()}
                </h3>
                <h3>{email}</h3>
                <h3 className="text-xs">ID : {id.substring(0, 20)}</h3>
              </div>
            </div>
            <br />
            <br />

            <div className="flex items-center justify-between">
              <Link
                to={`/profile-user/${localStorage.key(0)?.substring(0, 5)}`}
              >
                <Button sx={{ width: "140px" }} variant="outlined">
                  View Profile
                </Button>
              </Link>
              <Button
                onClick={signOut}
                sx={{ width: "140px", marginLeft: "15px" }}
                variant="contained"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
  return (
    <div>
      {profileModel}
      <div
        ref={headerRef}
        className="w-full flex items-center justify-between p-2 shadow-md bg-gradient-to-r from-yellow-200 via-gray-100 to-yellow-200"
      >
        {/* <div>
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon className="ml-2 md:ml-6" fontSize="large" />
          </IconButton>
        </div> */}

        <div className="flex ml-2 items-center justify-center">
          <img alt="" src={LogoImage} className="w-8 h-8" />
          <Link to="/">
            <h1
              style={{ color: "#4081EB" }}
              className="text-center ml-2 text-xl sm:trext-4xl"
            >
              Appnor.co®
            </h1>
          </Link>
        </div>

        <IconButton onClick={handleDialogOpen}>
          <img alt="" className="w-7 h-7 " src={ProfileImage} />
        </IconButton>
      </div>
    </div>
  );
}

export default UpMenu;
