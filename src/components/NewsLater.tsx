import { Button, Checkbox, TextField } from "@mui/material";
import LogoImage from "../assets/images/appnorr.png";
import { useState } from "react";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function NewsLater(props: any) {
  const [email, setEmail] = useState("");
  const [isTermsAggred, setIsTermsAggred] = useState(true);

  function subscribeNewsLater() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Conditions");
      return;
    }

    if (email === "" || !emailRegex.test(email)) {
      alert("A valid email address is required..");
      return;
    }

    alert("Congrats! Now you are subscribed to our NewsLater");
    setEmail("You are Subscribed Now..");
  }

  function handleCheckboxChange(checked: boolean) {
    setIsTermsAggred(checked);
  }

  return (
    <div className="w-fit md:w-full flex flex-col items-center mr-3 ml-3  mt-20">
      <div className="sm:w-4/5 lg:w-1/2 p-5 flex flex-col items-center justify-center border border-blue-800 shadow-lg">
        <div className="flex items-center justify-between">
          <img className="w-5 h-5" alt="" src={LogoImage} />
          <h1 className="font-bold text-sm font-mono ml-3">
            Subscribe To Oue NewsLater
          </h1>
        </div>

        <div className="flex flex-col items-center">
          <TextField
            sx={{ marginTop: "15px", marginBottom: "15px" }}
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="url-input"
            label="Enter your email here"
            variant="outlined"
          />
          <Button
            sx={{ width: "200px" }}
            onClick={subscribeNewsLater}
            variant="contained"
          >
            Subscribe
          </Button>

          <div className="flex items-center justify-center mt-4">
            <Checkbox
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              defaultChecked
            />
            <h3 className="text-xs text-center font-mono">
              By subscribing you agree to our terms & conditions for data usages
              and privay policy.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsLater;
