import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import { ColorContext, LinkContext } from "./extras/ColorContext";
import UpMenu from "./components/UpMenu";
import Home from "./pages/HomePage";
import SimpleIntro from "./components/SimpleIntro";
import FaqList from "./components/FaqList";
import NewsLater from "./components/NewsLater";
import NotFound from "./pages/NotFound";
import RedirectionPage from "./pages/RedirectionPage";
import ProfilePage from "./pages/ProfilePage";
import UpdatePage from "./pages/UpdatePage";
import {
  Route,
  Routes,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { LinkDaum } from "./extras/types";
import { useMatch } from "react-router-dom";

function App() {
  const location = useLocation();
  const match = useMatch("/:linkId");
  const [color, setColor] = useState<string>("");
  const [point, setPoint] = useState<number>(0);
  const [linkData, setLinkData] = useState<LinkDaum>();

  const handleColorChange = (color: string) => {
    setColor(color);
  };
  const handlePointChange = (p: number) => {
    setPoint(p);
  };
  const handleLinkChange = (data: LinkDaum) => {
    setLinkData(data);
  };

  function ConditionallyRedirectingRoute() {
    const location = useLocation();
    const pathnameLength = location.pathname.length;
    const navigate = useNavigate();

    useEffect(() => {
      if (pathnameLength >= 5) {
        navigate(`/${location.pathname}`, { replace: false });
      } else {
        navigate("/notfound");
      }
    }, [location.pathname, navigate]);

    return null;
  }

  useEffect(() => {
    console.log(JSON.stringify(location));
    return () => {};
  }, []);

  return (
    <div className="overflow-hidden">
      {!match && <UpMenu />}

      <ColorContext.Provider
        value={{
          color: color,
          point: point,
          setPoint: handlePointChange,
          setColor: handleColorChange,
        }}
      >
        <LinkContext.Provider
          value={{
            linkData: linkData!,
            setLinkData: handleLinkChange,
          }}
        >
          {location.pathname === "/" && (
            <SimpleIntro
              tag="APPNOR.CO®"
              heading="Ultimate App Deep Linking"
              subtitle="Appnor® empowers cutting-edge App Deep Links | URL Shortener | Appstore Links"
              btntext="Create Links"
            />
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<RedirectionPage />} />
            <Route path="/profile-user/:id" element={<ProfilePage />} />
            <Route
              path="/update-link-components/:linkId"
              element={<UpdatePage />}
            />
            <Route
              path="/:linkId"
              element={<ConditionallyRedirectingRoute />}
            />
            <Route path="/notfound" element={<NotFound />} />
          </Routes>
          {/* <Home /> */}
          {/* <NotFound/> */}
          {/* <RedirectionPage /> */}
          {/* <UpdatePage /> */}
          {/* <ProfilePage /> */}
        </LinkContext.Provider>
      </ColorContext.Provider>
      {!match && <FaqList />}
      {!match && <NewsLater />}
      {!match && <Footer />}
    </div>
  );
}

export default App;
