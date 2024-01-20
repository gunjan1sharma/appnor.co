import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  FacebookIcon,
  EmailIcon,
  InstapaperIcon,
  LinkedinIcon,
  LivejournalIcon,
  PinterestIcon,
  WorkplaceIcon,
  WhatsappIcon,
  VKIcon,
  ViberIcon,
  TwitterIcon,
  TumblrIcon,
  TelegramIcon,
  RedditIcon,
} from "react-share";
import DownloadImage from "../assets/images/download.png";
import FeatureImage from "../assets/images/comingsoon.png";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import app from "../firebase-config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import FeatureIntro from "../components/FeatureIntro";
import { ColorContext } from "../extras/ColorContext";
import FeatureListPage from "../components/FeatureListPage";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  API_BASE_URLL,
  CHECKIDAVAILABILITY,
  FETCHTITLE,
  SHORTLINK,
  sampleLinkShortedResponse,
} from "../utills/APIHelper";
import { Root } from "../extras/types";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function HomePage(props: any) {
  const colorContex = useContext(ColorContext);
  const [audioResponse, setAudioResponse] = useState<Root>(
    sampleLinkShortedResponse
  );
  const [isTermsAggred, setIsTermsAggred] = useState(false);
  const [isDownloadSuccess, setIsDownloadSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isCustomLinkId, setIsCustomLinkId] = useState(true);
  const scrollRef = useRef<any>(null);
  const linkResultRef = useRef<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [longLink, setLongLink] = useState("");
  const [linkId, setLinkId] = useState("");
  const [finalDeepLink, setFinalDeepLink] = useState("");
  const [isCreateAccount, setIsCreateAccount] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  const [advanceLinkOptions, setAdvanceLinkOptions] = useState(false);
  const [title, setTitle] = useState<string | null>("");
  const [mobileTarget, setMobileTarget] = useState("");
  const [tabletTarget, setTabletTarget] = useState("");
  const [desktopTarget, setDesktopTarget] = useState("");
  const [iosTarget, setIosTarget] = useState("");
  const [androidTarget, setAndroidTarget] = useState("");
  const [windowsTarget, setWindowsTarget] = useState("");
  const [macTarget, setMacTarget] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    scrollToDiv();
    return () => {};
  }, [colorContex.point]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      requestSiteMetaFromServer();
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [longLink]);

  function persistUser(data: string, userId: string) {
    if (localStorage.getItem(userId) === null) {
      localStorage.setItem(userId, data);
      console.log("User persisted successfully");
    } else {
      console.log("User is already present");
    }
  }

  function signUp() {
    console.log("clicked1");
    if (!isTermsAggred) {
      alert("Agree to our terms & conditions before procedings..");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please Enter Valid Email Address");
    }

    if (password.length < 7 || password !== repeatPassword) {
      alert("Password should be 7 digit and both password should match");
      return;
    }

    handleOpen();
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        persistUser(JSON.stringify(user), user.uid);
        console.log("user registered sucessfully..");
        console.log(`user(createdUser) : ${user}`);
        alert(`Account create successfully and you are Logged In`);
        window.location.reload();
        handleClose();
      })
      .catch((error) => {
        console.log(`Error while signIn : ${error}`);
        alert(`Something went wrong while creating account`);
        handleClose();
      });
  }

  function signIn() {
    console.log("clicked2");
    if (!isTermsAggred) {
      alert("Agree to our terms & conditions before procedings..");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please Enter Valid Email Address");
    }
    if (password.length < 7) {
      alert("Password should be 7 digit long");
      return;
    }

    handleOpen();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        persistUser(JSON.stringify(user), user.uid);
        console.log("User Logged in sucessfully..");
        console.log(`user(Loged In User) : ${user}`);
        alert(`Logged In successfully as ${user.email}`);
        window.location.reload();
        handleClose();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        handleClose();
        alert(`Error while signIn : ${errorMessage} | code : ${errorCode}`);
        console.log(
          `Error while signIn : ${errorMessage} | code : ${errorCode}`
        );
      });
  }

  async function signOutUser() {
    const auth = getAuth(app);
    if (auth.currentUser !== null) {
      try {
        await auth.signOut();
        console.log("User Logged out successfully..");
      } catch (error) {
        console.log(`"Error occured while logging out User : ${error}`);
      }
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

  function handleLinkType(checked: boolean): any {
    setIsCustomLinkId(checked);
    if (!checked) {
      setLinkId(generateRandomString());
    }
  }

  function longLinkString(link: string) {
    if (link.length > 25) {
      return link.substring(0, 25) + ".....";
    } else return link;
  }

  function handleCheckboxChange(checked: boolean) {
    setIsTermsAggred(checked);
  }

  async function checkLinkIdAvailiblity() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }
    if (linkId === "" || linkId.length < 5) {
      alert("A Valid LinkId with Min-Max[5-25] is required..");
      return;
    }

    const status = await axios.get(
      API_BASE_URLL + CHECKIDAVAILABILITY + `id=${linkId}`
    );
    return status;
  }

  function requestShortLink() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }
    if (longLink === "" || !longLink.startsWith("https")) {
      alert("A Valid Website URL [https://www.] is Required!!");
      handleClose();
      return;
    }

    const query_params = `longLink=${longLink}&linkId=${linkId}&userId=${localStorage.key(
      0
    )}&title=${title}`;
    axios
      .post<Root>(API_BASE_URLL + SHORTLINK + query_params)
      .then((response) => {
        // console.log(
        //   `Link shorted successfully : ${JSON.stringify(response.data)}`
        // );
        setAudioResponse(response.data);
        setIsDownloadSuccess(true);
        setFinalDeepLink(response.data.shortedLinkData.completeShortLink);
        setLongLink("");
        setLinkId("");
        closeBackdrop();
        scrollToLink();
      })
      .catch((error) => {
        console.log(`Error occured while shorting Link : ${error}`);
        alert(`Error occured while shorting Link : ${error}`);
        handleClose();
      });
  }

  async function initProcess() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }
    if (linkId === "" || linkId.length < 5) {
      alert("A Valid LinkId with Min-Max[5-25] is required..");
      return;
    }

    handleOpen();
    axios
      .get(API_BASE_URLL + CHECKIDAVAILABILITY + `id=${linkId}`)
      .then((res) => {
        if (res!.data["isIdAvailable"] && res!.status === 200) {
          alert(`Link ID ${linkId} is already taken..choose another one`);
          console.log(`status : ${JSON.stringify(res!.data)}`);
          handleClose();
          return;
        } else {
          console.log(`status : ${JSON.stringify(res!.data)}`);
          requestShortLink();
        }
      })
      .catch((err) => {
        alert(`checking LinkId error occured : ${err}`);
        handleClose();
      });
  }

  function generateRandomString(length = 5) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  function scrollToDiv() {
    if (colorContex.point !== 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      colorContex.setPoint(0);
    }
  }

  function scrollToLink() {
    linkResultRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function requestSiteMetaFromServer() {
    if (longLink === "" || longLink.length < 7) {
      return;
    }
    axios
      .get(API_BASE_URLL + FETCHTITLE + `siteUrl=${longLink}`)
      .then((res) => {
        console.log(`Title fetched successfully ${res.data["title"]}`);
        setTitle(res.data["title"]);
      })
      .catch((err) => {
        console.log(`Something went while fetching title : ${err}`);
      });
  }

  function testLink() {
    const link = audioResponse?.shortedLinkData.completeShortLink;
    if (link === "" || link.length < 5 || link === undefined) {
      alert("First you have to short the Link before you can test it..");
      return;
    }
    window.open(link, "_blank");
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
            Communicating with server...
          </h1>
        </div>
      </Backdrop>
    </React.Fragment>
  );

  const loginAccountCard = (
    <React.Fragment>
      <h4 className="text-gray-800 font-bold lg:mt-10 mb-4">
        LogIn Your Account
      </h4>
      <TextField
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email-input"
        type="email"
        label="Enter email address"
        variant="outlined"
      />
      <br />
      <TextField
        fullWidth
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        id="password-input"
        label="Enter password"
        variant="outlined"
      />
      <br />

      <Button
        onClick={signIn}
        sx={{ marginTop: "20px", marginBottom: "10px", width: "200px" }}
        variant="contained"
      >
        Login Account
      </Button>

      <Button
        onClick={() => setIsCreateAccount(!isCreateAccount)}
        sx={{ marginTop: "5px", marginBottom: "10px", width: "200px" }}
        variant="outlined"
      >
        Create Account
      </Button>

      <h3 className="text-xs text-center w-80 m-2">
        Please remember your password currently we are not offering password
        reset and email verification feature. We are working towrads it.
      </h3>
      <div className="flex items-center justify-center">
        <Checkbox
          value={isTermsAggred}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
        />
        <h3 className="text-xs text-center">
          By creating your account and shorting Links you agree to our terms &
          conditions for fair usages policy
        </h3>
      </div>
      <Divider color="black" />
    </React.Fragment>
  );

  const advnceToogle = (
    <React.Fragment>
      <div
        onClick={() => setAdvanceLinkOptions(!advanceLinkOptions)}
        className="flex items-center cursor-pointer text-start w-full mb-3 mt-3"
      >
        <h2 className="text-sm font-bold">Advance Link Options</h2>
        <IconButton>
          {!advanceLinkOptions ? (
            <ExpandMoreOutlinedIcon />
          ) : (
            <ExpandLessOutlinedIcon />
          )}
        </IconButton>
      </div>
    </React.Fragment>
  );

  const linkAdvanceUI = (
    <React.Fragment>
      <TextField
        fullWidth
        value={title}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        id="input-title"
        label="Enter Custom Link Title"
        variant="outlined"
      />
      <br />

      <TextField
        fullWidth
        value={mobileTarget}
        type="text"
        onChange={(e) => setMacTarget(e.target.value)}
        id="input-mobile"
        label="Target Link on Mobile Devices (default)"
        variant="outlined"
      />
      <br />

      <TextField
        fullWidth
        value={tabletTarget}
        type="text"
        onChange={(e) => setTabletTarget(e.target.value)}
        id="input-tablet"
        label="Target Link on Tablet Devices"
        variant="outlined"
      />
      <br />

      <TextField
        fullWidth
        value={desktopTarget}
        type="text"
        onChange={(e) => setDesktopTarget(e.target.value)}
        id="input-desktop"
        label="Target Link on Desktop Computers"
        variant="outlined"
      />
      <br />

      <h2 className="text-sm text-start w-full mb-3 font-bold">
        Advance OS Targetings
      </h2>
      <TextField
        fullWidth
        value={androidTarget}
        type="text"
        onChange={(e) => setAndroidTarget(e.target.value)}
        id="input-android"
        label="Target Link on Android OS"
        variant="outlined"
      />
      <br />

      <TextField
        fullWidth
        value={iosTarget}
        type="text"
        onChange={(e) => setIosTarget(e.target.value)}
        id="input-ios"
        label="Target Link on iOS"
        variant="outlined"
      />
      <br />

      <TextField
        fullWidth
        value={windowsTarget}
        type="text"
        onChange={(e) => setWindowsTarget(e.target.value)}
        id="input-windows"
        label="Target Link on Windows OS"
        variant="outlined"
      />
      <br />

      <TextField
        fullWidth
        value={macTarget}
        type="text"
        onChange={(e) => setMacTarget(e.target.value)}
        id="input-mac"
        label="Target Link on MacOS (Apple)"
        variant="outlined"
      />
      <h2 className="text-xs text-gray-700 leading-relaxed text-start w-full mb-3 mt-3">
        Note OS target will always override device type target Links. For
        example, Android OS Target = abc & Tablet Target = mnk and if device is
        Android Tablet then target Link will be 'abc'.
      </h2>
      <br />
    </React.Fragment>
  );

  const createAccountCard = isCreateAccount ? (
    <React.Fragment>
      <h4 className="text-gray-800 font-bold lg:mt-10 mb-5">
        Create Quick Account
      </h4>
      <TextField
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email-input"
        type="email"
        label="Enter email address"
        variant="outlined"
      />
      <br />
      <TextField
        fullWidth
        value={password}
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        id="password-input"
        label="Enter password"
        variant="outlined"
      />
      <br />
      <TextField
        fullWidth
        value={repeatPassword}
        type="password"
        onChange={(e) => setRepeatPassword(e.target.value)}
        id="password-repeat-input"
        label="Repeat password"
        variant="outlined"
      />

      <Button
        onClick={signUp}
        sx={{ marginTop: "20px", marginBottom: "10px", width: "200px" }}
        variant="contained"
      >
        Create Account
      </Button>

      <Button
        onClick={() => setIsCreateAccount(!isCreateAccount)}
        sx={{ marginTop: "5px", marginBottom: "10px", width: "200px" }}
        variant="outlined"
      >
        LogIn Account
      </Button>

      <h3 className="text-xs text-center w-80 m-2">
        Please remember your password currently we are not offering password
        reset and email verification feature. We are working towrads it.
      </h3>
      <div className="flex items-center justify-center">
        <Checkbox
          value={isTermsAggred}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
        />
        <h3 className="text-xs text-center">
          By creating your account and shorting Links you agree to our terms &
          conditions for fair usages policy
        </h3>
      </div>
      <Divider color="black" />
    </React.Fragment>
  ) : (
    loginAccountCard
  );

  const createLinkCard = (
    <React.Fragment>
      <h4 className="text-gray-800 font-bold mt-5 lg:mt-10 mb-4">
        Create Deep Link
      </h4>
      <TextField
        fullWidth
        value={longLink}
        onChange={(e) => setLongLink(e.target.value)}
        id="link-input"
        type="url"
        label="Enter or paste Long Link here"
        variant="outlined"
      />
      <br />
      <TextField
        fullWidth
        value={linkId}
        type="text"
        onChange={(e) => setLinkId(e.target.value)}
        id="linkid-input"
        label="Enter Link ID"
        variant="outlined"
      />

      {advnceToogle}
      {advanceLinkOptions && linkAdvanceUI}

      <br />

      <h3 className="text-sm text-black font-mono font-bold text-center">
        Resulting Deep Link : appnor.co/{linkId.replace(/\s+/g, "")}
      </h3>

      <div className="flex items-center justify-center mt-4">
        <Checkbox
          value={isCustomLinkId}
          defaultChecked={true}
          onChange={(e) => handleLinkType(e.target.checked)}
        />
        <h3 className="text-sm text-black text-center">
          {isCustomLinkId ? "Create Custom LinkID" : "Create Automatic LinkID"}
        </h3>
      </div>

      <Button
        onClick={initProcess}
        id="create-deep-link"
        sx={{ marginTop: "20px", marginBottom: "10px", width: "200px" }}
        variant="contained"
      >
        Create Link
      </Button>

      <h3 className="text-xs text-center w-80 m-2">
        Choose your own Link Id with Appnor. You can always update and delete
        any content of your short Links in your profile section.
      </h3>
      <div className="flex items-center justify-center">
        <Checkbox
          value={isTermsAggred}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
        />
        <h3 className="text-xs text-center">
          By creating your account and shorting Links you agree to our terms &
          conditions for fair usages policy
        </h3>
      </div>
      <Divider color="black" />
    </React.Fragment>
  );

  const appdownloadLink = (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <img
          className="w-16 h-16 mb-4 mr-6"
          alt="coming-soon"
          src={FeatureImage}
        />
        <h4 className="text-gray-800 font-bold mt-5 lg:mt-10 mb-4">
          Create App Download Link
        </h4>
      </div>
      <TextField
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email-input"
        type="link1"
        label="Enter app store Link"
        variant="outlined"
      />
      <br />
      <TextField
        fullWidth
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        id="link2"
        label="Enter Playstore Link"
        variant="outlined"
      />
      <br />
      <TextField
        fullWidth
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        id="link3"
        label="Enter web URL"
        variant="outlined"
      />

      <Button
        onClick={signIn}
        sx={{ marginTop: "20px", marginBottom: "10px", width: "200px" }}
        variant="contained"
      >
        Create Link
      </Button>

      <h3 className="text-xs text-center w-80 m-2">
        Please remember your password currently we are not offering password
        reset and email verification feature. We are working towrads it.
      </h3>
      <div className="flex items-center justify-center">
        <Checkbox
          value={isTermsAggred}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
        />
        <h3 className="text-xs text-center">
          By creating your account and shorting Links you agree to our terms &
          conditions for fair usages policy
        </h3>
      </div>
      <Divider color="black" />
    </React.Fragment>
  );

  const generatedLink = (
    <React.Fragment>
      <h4 className="text-black font-bold mt-5 lg:mt-10 mb-4">
        Link Generated Successfully
      </h4>
      <h3 className="text-sm text-black">
        Long Link :{" "}
        {longLinkString(audioResponse!.shortedLinkData.link_original)}
      </h3>
      <h3 className="text-sm text-black font-bold">
        Shorted Link :{" "}
        {audioResponse?.shortedLinkData.completeShortLink.replace(
          "https://",
          ""
        )}
      </h3>

      <div className="flex items-center justify-around mt-5">
        <CopyToClipboard
          text={audioResponse?.shortedLinkData.completeShortLink.replace(
            "https://",
            ""
          )}
          onCopy={() =>
            alert(
              `Link [ ${audioResponse?.shortedLinkData.completeShortLink.replace(
                "https://",
                ""
              )} ] Copied to Clipboard..`
            )
          }
        >
          <Button sx={{ width: "140px" }} variant="outlined">
            Copy Link
          </Button>
        </CopyToClipboard>

        <Button
          onClick={testLink}
          sx={{ width: "140px", marginLeft: "30px" }}
          variant="contained"
        >
          Test Link
        </Button>
      </div>
      <br />

      <div className="p-2 container mx-auto grid grid-cols-5 md:grid-cols-7 md:gap-3 gap-2">
        <FacebookShareButton url={finalDeepLink}>
          <FacebookIcon round size={30} />
        </FacebookShareButton>

        <EmailShareButton url={JSON.stringify(finalDeepLink)}>
          <EmailIcon round size={30} />
        </EmailShareButton>

        <InstapaperShareButton url={JSON.stringify(finalDeepLink)}>
          <InstapaperIcon round size={30} />
        </InstapaperShareButton>

        <LinkedinShareButton url={JSON.stringify(finalDeepLink)}>
          <LinkedinIcon round size={30} />
        </LinkedinShareButton>

        <LivejournalShareButton url={JSON.stringify(finalDeepLink)}>
          <LivejournalIcon round size={30} />
        </LivejournalShareButton>

        <PinterestShareButton url={JSON.stringify(finalDeepLink)} media={""}>
          <PinterestIcon round size={30} />
        </PinterestShareButton>

        <WorkplaceShareButton url={JSON.stringify(finalDeepLink)}>
          <WorkplaceIcon round size={30} />
        </WorkplaceShareButton>

        <WhatsappShareButton url={JSON.stringify(finalDeepLink)}>
          <WhatsappIcon round size={30} />
        </WhatsappShareButton>

        <VKShareButton url={JSON.stringify(finalDeepLink)}>
          <VKIcon round size={30} />
        </VKShareButton>

        <ViberShareButton url={JSON.stringify(finalDeepLink)}>
          <ViberIcon round size={30} />
        </ViberShareButton>

        <TwitterShareButton url={JSON.stringify(finalDeepLink)}>
          <TwitterIcon round size={30} />
        </TwitterShareButton>

        <TumblrShareButton url={JSON.stringify(finalDeepLink)}>
          <TumblrIcon round size={30} />
        </TumblrShareButton>

        <TelegramShareButton url={JSON.stringify(finalDeepLink)}>
          <TelegramIcon round size={30} />
        </TelegramShareButton>

        <RedditShareButton url={JSON.stringify(finalDeepLink)}>
          <RedditIcon round size={30} />
        </RedditShareButton>
      </div>
    </React.Fragment>
  );

  return (
    <div className="md:m-10 sm:m-5 flex flex-col items-center justify-center">
      {backdrop}
      <FeatureIntro
        heading="Your All-in-One Solution for Seamless Deep Linking & Link Management"
        desc="Tired of juggling multiple tools for app deep linking, URL shortening, and download links? AppNor simplifies your life with a powerful, unified platform that streamlines engagement and boosts your app's visibility."
        subdesc="Effortlessly create branded download links for all major app stores. AppNor takes the hassle out of the process, ensuring your users can find and install your app with just a tap."
      />

      <FeatureListPage />

      {localStorage.key(0) !== null && (
        <Tabs
          value={tabValue}
          sx={{ marginBottom: "15px" }}
          onChange={handleTabChange}
          aria-label="disabled tabs example"
        >
          <Tab
            sx={{ color: "blue", fontWeight: "bold", fontFamily: "monospace" }}
            label="Deep Link"
          />
          <Tab
            sx={{ color: "blue", fontWeight: "bold", fontFamily: "monospace" }}
            label="App Download Link"
          />
        </Tabs>
      )}

      <div
        ref={scrollRef}
        className={`flex flex-col ${
          tabValue === 1 && "pointer-events-none opacity-80"
        } items-center border border-gray-400 shadow-lg  ml-4 mr-4 p-4`}
      >
        {localStorage.key(0) === null
          ? createAccountCard
          : tabValue === 0
          ? createLinkCard
          : appdownloadLink}
      </div>

      <br />
      <br />
      {isDownloadSuccess && (
        <div className="border-2 m-3 text-center border-blue-500 shadow-sm p-4 mb-8">
          <div className="flex flex-col items-center md:flex-row font-mono mb-5 justify-center">
            <h3 className="font-bold text-xl">Link Shorted Successfully</h3>
            <img
              className="m-2"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
            <img
              className="animate-ping"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
          </div>
        </div>
      )}

      {isDownloadSuccess && (
        <div
          ref={linkResultRef}
          className="flex w-fit flex-col border border-gray-400 shadow-lg p-4"
        >
          {generatedLink}
        </div>
      )}

      <br ref={linkResultRef} />
      <br />
      <br />
      <br />
    </div>
  );
}

export default HomePage;
