export interface PickerCardProps {
  heading: string;
  description: string;
  openClick: (picker: string) => void;
  knowClick: () => void;
  borderColor: string;
}

export interface SingleColorProps {
  color: string;
  colorValue: any;
  id: string;
  deleteColor: (id: string) => void;
}

export interface IPGeolocationResponse {
  ip: string;
  isp: string;
  org: string;
  hostname: string;
  latitude: number;
  longitude: number;
  postal_code: string;
  city: string;
  country_code: string;
  country_name: string;
  continent_code: string;
  continent_name: string;
  region: string;
  district: string;
  timezone_name: string;
  connection_type: string;
  asn_number: number;
  asn_org: string;
  asn: string;
  currency_code: string;
  currency_name: string;
  success: boolean;
  premium: boolean;
}

export type ResponseKeyValueArray = [string, any][];

export interface SimpleIntroProps {
  tag?: string;
  heading: string;
  subtitle: string;
  btntext: string;
}

export interface Root {
  status: string;
  message: string;
  shortedLinkData: ShortedLinkData;
}

export interface ShortedLinkData {
  link_type: string;
  created_at: CreatedAt;
  link_intent: string;
  last_click_at: LastClickAt;
  total_click: number;
  linkId: string;
  user_id: string;
  link_original: string;
  updated_at: UpdatedAt;
  link_title: string;
  link_platfrom: string;
  completeShortLink: string;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface LastClickAt {
  seconds: number;
  nanoseconds: number;
}

export interface UpdatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface RootProfile {
  status: string;
  message: string;
  totalLinks: number;
  linkData: LinkDaum[];
}

export interface LinkDaum {
  updated_at: UpdatedAt;
  link_original: string;
  created_at: CreatedAt;
  total_click: number;
  user_id: string;
  link_platfrom: string;
  linkId: string;
  last_click_at: LastClickAt;
  link_intent: string;
  completeShortLink: string;
  link_type?: string;
  link_title?: string;
  long_original?: string;
}

export interface UpdatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface LastClickAt {
  seconds: number;
  nanoseconds: number;
}

export const sampleAllLinks : RootProfile = {
  status: "success",
  message: "Link Data Fetched successfully..",
  totalLinks: 5,
  linkData: [
    {
      user_id: "87gyt66666666",
      last_click_at: {
        seconds: 1705497560,
        nanoseconds: 250000000,
      },
      link_original:
        "https://www.instagram.com/reel/C1oIRlopjig/?igsh=MTFmcmxjazdyZmdtbg==",
      completeShortLink: "https://appnor.co/_i_am_brinda",
      link_intent:
        "intent://www.instagram.com/reel/C1oIRlopjig/?igsh=MTFmcmxjazdyZmdtbg==/#Intent;scheme=https;S.browser_fallback_url=https://www.instagram.com/reel/C1oIRlopjig/?igsh=MTFmcmxjazdyZmdtbg==;package=com.instagram.android;end",
      linkId: "_i_am_brinda",
      link_platfrom: "Instagram",
      total_click: 0,
      created_at: {
        seconds: 1705497560,
        nanoseconds: 250000000,
      },
      updated_at: {
        seconds: 1705497560,
        nanoseconds: 250000000,
      },
    },
    {
      created_at: {
        seconds: 1705497509,
        nanoseconds: 401000000,
      },
      total_click: 0,
      linkId: "india@economy#",
      link_platfrom: "Youtube",
      updated_at: {
        seconds: 1705497509,
        nanoseconds: 401000000,
      },
      link_original:
        "https://www.youtube.com/watch?v=HqziS_NHq80&ab_channel=SochbyMohakMangal",
      user_id: "87gyt66666666",
      completeShortLink: "https://appnor.co/india@economy#",
      last_click_at: {
        seconds: 1705497509,
        nanoseconds: 401000000,
      },
      link_intent:
        "intent://www.youtube.com/watch?v=HqziS_NHq80&ab_channel=SochbyMohakMangal/#Intent;scheme=https;S.browser_fallback_url=https://www.youtube.com/watch?v=HqziS_NHq80&ab_channel=SochbyMohakMangal;package=com.google.android.youtube;end",
    },
    {
      updated_at: {
        seconds: 1705497445,
        nanoseconds: 974000000,
      },
      link_original:
        "https://www.facebook.com/profile.php?id=100017200444857&mibextid=2JQ9oc",
      completeShortLink: "https://appnor.co/my_facebook",
      created_at: {
        seconds: 1705497445,
        nanoseconds: 974000000,
      },
      link_platfrom: "Facebook",
      total_click: 0,
      last_click_at: {
        seconds: 1705497445,
        nanoseconds: 974000000,
      },
      link_intent:
        "intent://www.facebook.com/profile.php?id=100017200444857&mibextid=2JQ9oc/#Intent;scheme=https;S.browser_fallback_url=https://www.facebook.com/profile.php?id=100017200444857&mibextid=2JQ9oc;package=com.facebook.katana;end",
      user_id: "87gyt66666666",
      linkId: "my_facebook",
    },
    {
      link_intent:
        "intent://youtu.be/OtIoaI2CFh4?si=1ChO40CqSQD1vn5a/#Intent;scheme=https;S.browser_fallback_url=https://youtu.be/OtIoaI2CFh4?si=1ChO40CqSQD1vn5a;package=com.google.android.youtube;end",
      last_click_at: {
        seconds: 1705566898,
        nanoseconds: 346000000,
      },
      link_original: "https://youtu.be/OtIoaI2CFh4?si=1ChO40CqSQD1vn5a",
      link_type: "DEEPLINK",
      completeShortLink: "https://appnor.co/sam_altman",
      updated_at: {
        seconds: 1705566898,
        nanoseconds: 346000000,
      },
      long_original: "https://youtu.be/OtIoaI2CFh4?si=1ChO40CqSQD1vn5a",
      link_platfrom: "Youtube",
      link_title: "Sam Altman speaking about what should do [updated again]",
      created_at: {
        seconds: 1705566898,
        nanoseconds: 346000000,
      },
      total_click: 0,
      user_id: "87gyt66666666",
      linkId: "sam_altman",
    },
    {
      updated_at: {
        seconds: 1705582117,
        nanoseconds: 508000000,
      },
      link_title: "",
      created_at: {
        seconds: 1705582117,
        nanoseconds: 508000000,
      },
      total_click: 0,
      link_type: "DEEPLINK",
      link_platfrom: "Youtube",
      link_original: "https://youtu.be/OtIoaI2CFh4?si=1ChO40CqSQD1vn5a",
      completeShortLink: "https://appnor.co/sam_altmany",
      user_id: "87gyt66666666",
      link_intent:
        "intent://youtu.be/62pIL_f0Fx0?si=8EBFtVj_jC_OZ9nX/#Intent;package=com.google.android.youtube;scheme=https;end",
      last_click_at: {
        seconds: 1705582117,
        nanoseconds: 508000000,
      },
      linkId: "sam_altmany",
    },
  ],
};

