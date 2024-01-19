import { Button } from "@mui/material";
import { useContext, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link, useNavigate } from "react-router-dom";
import { LinkContext } from "../extras/ColorContext";
import { LinkDaum } from "../extras/types";

const staticLinks: string =
  " https://firebase.google.com/ https://firebase.google.com";

interface SingleLinkProps {
  link: LinkDaum;
  // longLink: string;
  // shortLink: string;
  // lastClicked: string;
  // platform: string;
  // totalClick: string;
  // title: string;
}

function SingleLink(props: SingleLinkProps) {
  const navigate = useNavigate();
  const linkContext = useContext(LinkContext);

  useEffect(() => {
    return () => {};
  }, []);

  function updateLink() {
    linkContext.setLinkData(props.link);
    navigate(`/update-link-components/${props.link.linkId}`);
  }

  function getEllipseText(link: string): string {
    if (link.length > 30) {
      return link.substring(0, 30) + "...";
    } else return link;
  }

  return (
    <div>
      <div className="flex w-fit flex-col border border-gray-400 shadow-xl m-4 p-4">
        <h1 className="text-sm ">
          <strong>Long Link</strong> :{" "}
          {getEllipseText(props.link.link_original)}
        </h1>

        <h1 className="text-sm">
          <strong>Deep Link</strong> :{" "}
          {getEllipseText(props.link.completeShortLink)}
        </h1>
        <h1 className="text-sm">
          <strong>Last Clicked</strong> : {props.link.last_click_at.nanoseconds}
        </h1>
        <h1 className="text-sm">
          <strong>Link Platfrom</strong> : {props.link.link_platfrom}
        </h1>
        <h1 className="text-sm">
          <strong>Total Click</strong> : {props.link.total_click}
        </h1>
        <h1 className="text-sm">
          <strong>Link Title</strong> : {props.link.link_title}
        </h1>

        <div className="flex items-center justify-around mt-5">
          <CopyToClipboard
            text={props.link.completeShortLink}
            onCopy={() =>
              alert(
                `Link [ ${props.link.completeShortLink.replace(
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
          {/* <Link to="/update-link-components"> */}
          <Button
            onClick={updateLink}
            sx={{ width: "140px", marginLeft: "30px" }}
            variant="contained"
          >
            Update Link
          </Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default SingleLink;
