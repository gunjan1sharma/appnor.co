import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  API_BASE_URLL,
  DELETELINK,
  FETCH_LINK,
  UPDATELINK,
} from "../utills/APIHelper";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContext } from "../extras/ColorContext";
import { LinkDaum, RootProfile } from "../extras/types";

interface UpdatePageProps {
  longLink: string;
  shortLink: string;
  title: string;
}

function UpdatePage(props: any) {
  const linkContext = useContext(LinkContext);
  const navigate = useNavigate();
  const { linkId } = useParams();
  const [longLink, setLongLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [open, setOpen] = useState(false);

  const [longLink1, setLongLink1] = useState("");
  const [shortLink1, setShortLink1] = useState("");
  const [linkTitle1, setLinkTitle1] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    handleNullLinkContext();
    return () => {};
  }, []);

  async function fetchLink() {
    handleOpen();
    axios
      .get(API_BASE_URLL + FETCH_LINK + `id=${linkId}`)
      .then((res) => {
        console.log(
          `Link fetched successfully..${res.data["shortedLinkData"]["link_original"]}`
        );
        setLongLink(res.data["shortedLinkData"]["link_original"]);
        setShortLink(res.data["shortedLinkData"]["linkId"]);
        setLinkTitle(res.data["shortedLinkData"]["link_title"]);
        closeBackdrop();
      })
      .catch((err) => {
        console.log(`Error occured while fetching Link..${err}`);
        closeBackdrop();
      });
  }

  function handleNullLinkContext() {
    if (linkContext.linkData === undefined || linkContext.linkData === null) {
      setLongLink("");
      setShortLink("");
      //fetchLink();
    } else if (linkContext.linkData !== null && linkContext.linkData) {
      setLongLink(linkContext.linkData!.link_original);
      setShortLink(linkContext.linkData!.linkId);
      setLinkTitle(linkContext.linkData!.link_title!);
    }
  }

  function isDataChanged() {
    if (longLink === longLink1 && linkTitle === linkTitle1) {
      alert("Link data is unchanged..");
    } else alert(`Link Data is updateable..`);
  }

  function updateLinkComponent() {
    if (
      longLink === "" ||
      linkTitle === "" ||
      linkTitle === undefined ||
      longLink.length > 200 ||
      linkTitle.length > 50
    ) {
      alert(`Valid Long Link and Short Link is required..`);
      return;
    }

    const query = `longLink=${longLink}&linkId=${linkId}&userId=${localStorage.key(
      0
    )}&title=${linkTitle}`;
    console.log(query);
    handleOpen();

    axios
      .put(API_BASE_URLL + UPDATELINK + query)
      .then((res) => {
        console.log(`Link updated successfully : ${res}`);
        alert(`Link Updated successfully..`);
        closeBackdrop();
        navigate("/profile");
      })
      .catch((err) => {
        console.log(`Error occured while updating Link :${err}`);
        alert(`Error occured while updating Link :${err}`);
        closeBackdrop();
      });
  }

  function deleteLink() {
    handleOpen();
    axios
      .delete(
        API_BASE_URLL +
          DELETELINK +
          `linkId=${linkId}&userId=${localStorage.key(0)}`
      )
      .then((res) => {
        console.log(`Link deleted successfully : ${res}`);
        alert(`Link deleted successfully..`);
        closeBackdrop();
        navigate("/profile");
      })
      .catch((err) => {
        console.log(`Error occured while deleted Link :${err}`);
        alert(`Error occured while deleted Link :${err}`);
        closeBackdrop();
      });
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
            Communicating with server...Hold On
          </h1>
        </div>
      </Backdrop>
    </React.Fragment>
  );

  return (
    <div className="lg:w-1/2 ml-auto mr-auto mt-16">
      {backdrop}
      <div
        className={`flex flex-col items-center m-3 border border-gray-400 shadow-lg p-4`}
      >
        <h4 className="text-gray-800 font-bold mt-5 lg:mt-10 mb-4">
          Update Deep Link Components
        </h4>
        <TextField
          fullWidth
          value={longLink}
          onChange={(e) => setLongLink(e.target.value)}
          id="longLink"
          type="url"
          label="Enter or paste Long Link here"
          variant="outlined"
        />
        <br />
        <TextField
          fullWidth
          disabled={true}
          value={shortLink}
          onChange={(e) => setShortLink(e.target.value)}
          id="linkId"
          type="text"
          label="Enter custom LinkID"
          variant="outlined"
        />
        <br />
        <TextField
          fullWidth
          value={linkTitle}
          onChange={(e) => setLinkTitle(e.target.value)}
          id="linkTitle"
          type="text"
          label="Enter Link Title here"
          variant="outlined"
        />
        <br />

        <Button
          onClick={updateLinkComponent}
          sx={{ width: "200px" }}
          variant="contained"
        >
          Update Link
        </Button>

        <Button
          onClick={deleteLink}
          sx={{ marginTop: "15px", marginBottom: "10px", width: "200px" }}
          variant="outlined"
        >
          Delete Link
        </Button>
        <h3 className="text-center sm:w-1/2 md:w-1/2 text-xs mt-5 mb-5">
          <strong>
            Appnor.co offers powerful and free Link component update
          </strong>{" "}
          to give you more control. Updating Link will reflect instantly.
          Deleted Link cannot be recovered later.
        </h3>
      </div>
    </div>
  );
}

export default UpdatePage;
