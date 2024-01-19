export const API_BASE_URLL = "https://appnor-backend.onrender.com/";
export const SHORTLINK = "appnor/v1/api/link/shortLink?";
export const CHECKIDAVAILABILITY = "appnor/v1/api/link/checkIdAvailability?";
export const FETCH_LINK = "appnor/v1/api/link/fetchLink?";
export const FETCHUSERALLLINK = "appnor/v1/api/link/fetchUserAllLink?";
export const UPDATELINK = "appnor/v1/api/link/updateLink?";
export const DELETELINK = "appnor/v1/api/link/deleteLink?";

export const sampleLinkShortedResponse = {
  status: "success",
  message: "Link shorted successfully..",
  shortedLinkData: {
    link_type: "DEEPLINK",
    created_at: {
      seconds: 1705596623,
      nanoseconds: 477000000,
    },
    link_intent: "developer.android.com/training/applinks",
    last_click_at: {
      seconds: 1705596623,
      nanoseconds: 477000000,
    },
    total_click: 0,
    linkId: "12345",
    user_id: "0n078Qm08UZ5iPD9XGP7WfFPULr1",
    link_original: "https://developer.android.com/training/applinks",
    updated_at: {
      seconds: 1705596623,
      nanoseconds: 477000000,
    },
    link_title: "",
    link_platfrom: "Web",
    completeShortLink: "https://appnor.co/12345",
  },
};
