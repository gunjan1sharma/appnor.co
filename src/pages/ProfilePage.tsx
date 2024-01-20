import React, { useEffect, useState } from "react";
import ProfileImage from "../assets/images/user.png";
import SingleLink from "../components/SingleLink";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URLL, FETCHUSERALLLINK } from "../utills/APIHelper";
import { LinkDaum, RootProfile, sampleAllLinks } from "../extras/types";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

function ProfilePage(props: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [isFetchSuccess, setIsFetchSuccess] = useState(false);
  const [links, setLinks] = useState<LinkDaum[]>();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPersistedUser();
    setIsFetchSuccess(true);
    fetchLinks();
    return () => {};
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, [location.pathname]);

  function fetchLinks() {
    handleOpen();
    axios
      .get<RootProfile>(
        API_BASE_URLL + FETCHUSERALLLINK + `userId=${localStorage.key(0)}`
      )
      .then((res) => {
        setLinks(res.data.linkData);
        setIsFetchSuccess(true);
        closeBackdrop();
        // console.log(
        //   `All Links fetched successfully : ${JSON.stringify(res.data)}`
        // );
      })
      .catch((err) => {
        console.log(`Something went wrong while fetching Link!! ${err}`);
        closeBackdrop();
      });
  }

  function fetchPersistedUser() {
    if (localStorage.key(0) !== null && localStorage.key(0)!.length > 15) {
      const LoggedInUser = localStorage.getItem(
        localStorage.key(0)!.toString()
      );
      //console.log(`LoggedInUser : ${JSON.parse(LoggedInUser!)["email"]}`);
      setEmail(JSON.parse(LoggedInUser!)["email"]);
      setId(JSON.parse(LoggedInUser!)["uid"]);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function closeBackdrop() {
    setTimeout(() => {
      handleClose();
    }, 3000);
  }

  function signOut(params: any) {
    if (localStorage.key(0) !== null) {
      localStorage.clear();
      alert("Logout Successfull..");
      window.location.reload();
    }
  }

  function refreshPage() {
    //window.location.reload();
  }

  const NoLinks = (
    <React.Fragment>
      <div className="flex flex-col items-center border-2 border-blue-500 m-3 p-5 border-dashed">
        <h4 className="text-black font-bold mt-5 mb-5 lg:mt-10">
          You don't have any Deep Links yet..
        </h4>

        <Button
          onClick={refreshPage}
          id="open-link"
          sx={{ width: "200px" }}
          variant="contained"
        >
          Sync Profile Again
        </Button>
        <Link to={"/"}>
          <Button sx={{ width: "200px", marginTop: "15px" }} variant="outlined">
            Create Links
          </Button>
        </Link>
        <h3 className="text-center font-mono text-xs mt-5 mb-5">
          Please wait while we fetch your all Deep Links created on Appnor.co,
          you can manually refresh the page if realtime sync is not working.
        </h3>
      </div>
    </React.Fragment>
  );

  const backdrop = (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
          <h1 className="font-extrabold m-2 text-white text-xl">
            Communicating with server...
          </h1>
        </div>
      </Backdrop>
    </React.Fragment>
  );

  return (
    <div className="flex flex-col items-center mt-5">
      {backdrop}
      <div className="flex w-fit items-center border-2 border-dotted border-blue-500 m-3 shadow-lg flex-col p-5">
        <div className="flex items-center justify-between">
          <img
            alt=""
            className="w-20 h-20 md:w-14 md:h-14"
            src={ProfileImage}
          />
          <div className="ml-5">
            <h3 className="font-bold">{email.split("@")[0].toUpperCase()}</h3>
            <h3>{email}</h3>
            <h3 className="text-xs">ID : {id.substring(0, 20)}</h3>
          </div>
        </div>
      </div>
      <br />
      <br />

      <div className="">
        <h4 className="text-black text-center font-bold mt-5 lg:mt-10 mb-4">
          Your Deep Links
        </h4>

        <br />

        {isFetchSuccess &&
          links?.length !== 0 &&
          links?.map((link) => {
            return <SingleLink key={link.linkId} link={link} />;
          })}

        {links?.length === 0 && NoLinks}
      </div>
    </div>
  );
}

export default ProfilePage;
