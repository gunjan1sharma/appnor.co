import { Button } from "@mui/material";
import LogoImage from "../assets/images/appnorr.png";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import axios, { AxiosResponse } from "axios";
import { isAndroid, isDesktop, isIOS } from "react-device-detect";
import {
  API_BASE_URLL,
  FETCH_LINK,
  sampleLinkShortedResponse,
} from "../utills/APIHelper";
import { Root } from "../extras/types";
import { Link } from "react-router-dom";
var title =
  "Appnor.co® | Smart App Deep Linking | App Download Links | URL Shortener |  Appnor.co®";

function RedirectionPage(props: any) {
  const scrollRef = useRef<any>(null);
  const btnRef = useRef<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [audioResponse, setAudioResponse] = useState<Root>(
    sampleLinkShortedResponse
  );

  useEffect(() => {
    console.log(
      `path in redirection page : ${location.pathname.replace("/", "")}`
    );
    if (location.pathname.replace("/", "").length < 5) {
      navigate("/notfound");
    } else {
      fetchLinkAndRedirect();
    }
    return () => {};
  }, [location.pathname]);

  function redirectionLogic(data: Root): any {
    if (isAndroid) {
      console.log(`Andoroid OS`);
      window.location.replace(data.shortedLinkData.link_intent);
      return;
    }
    if (isDesktop) {
      console.log("another os");
      window.location.replace(data.shortedLinkData.link_original);
      return;
    }
    window.location.replace(data.shortedLinkData.link_intent);
  }

  function fetchLinkAndRedirect() {
    axios
      .get<Root>(
        API_BASE_URLL + FETCH_LINK + `id=${location.pathname.replace("/", "")}`
      )
      .then((res) => {
        console.log("Link fetched successfully : ");
        setAudioResponse(res.data);
        if (res.status === 200 && res.data.shortedLinkData === null) {
          navigate("/notfound");
        }

        if (res.status === 200 && res.data.shortedLinkData !== null) {
          document.title = `${res.data.shortedLinkData.link_title} | ` + title;
          redirectionLogic(res.data);
          setAudioResponse(res.data);
          // btnRef.current.click();
        }
      })
      .catch((err) => {
        console.log(`Something went wrong while fetching Link : ${err}`);
        alert(`Something went wrong while fetching Link : ${err}`);
      });
  }

  return (
    <div
      ref={scrollRef}
      className="flex flex-col items-center md:mt-10 md:ml-auto md:mr-auto md:w-1/2 border-2 border-blue-500 m-3 p-5 border-dashed"
    >
      <Link to="/">
        <div className="flex items-center justify-center">
          <img alt="" src={LogoImage} className="w-10 h-10 md:w-14 md:h-14" />
          <h1
            style={{ color: "#4081EB" }}
            className="text-center ml-2 font-bold text-xl sm:text-4xl"
          >
            Appnor.co®
          </h1>
        </div>
      </Link>

      <h4 className="text-black text-sm  mt-5 lg:mt-10">
        This Deep Link is powered by Appnor.co
      </h4>
      <h4 className="text-black mt-1 text-sm lg:mt-10">
        Redirecting you shortly....
      </h4>
      <br />
      <Button
        id="open-link"
        ref={btnRef}
        onClick={() => redirectionLogic(audioResponse)}
        sx={{ width: "200px" }}
        variant="outlined"
      >
        Open Link
      </Button>
      {/* <Link to={"/"}>
        {" "}
        <Button sx={{ width: "200px", marginTop: "15px" }} variant="outlined">
          Create Links
        </Button>
      </Link> */}
      <h3 className="text-center font-mono text-xs md:w-1/2 mt-5 mb-5">
        Please wait while our engine automatically redirects you to target Link.
        Alternatively you can manually go on Link as well.
      </h3>
    </div>
  );
}

export default RedirectionPage;
