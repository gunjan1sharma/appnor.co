import React from "react";
import { LinkDaum, sampleAllLinks } from "./types";

interface ColorContextValue {
  color: string;
  setColor: (color: string) => void;
  point: number;
  setPoint: (p: number) => void;
}

interface LinkContextValue {
  linkData: LinkDaum | undefined;
  setLinkData: (d: LinkDaum) => void;
}


export const LinkContext = React.createContext<LinkContextValue>({
  linkData: undefined,
  setLinkData: (data) => {},
});

export const ColorContext = React.createContext<ColorContextValue>({
  color: "",
  setColor: (color) => {},
  point: 0,
  setPoint: (p) => {},
});

// export { ColorContext, LinkContext };
