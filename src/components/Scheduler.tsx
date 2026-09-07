import { PopupButton } from "react-calendly";
import React from "react";
import { buttonVariants } from "./components/ui/button";

const Scheduler: React.FC = () => {
  const rootElement = document.getElementById("root") as HTMLElement;

  return (
    <PopupButton
      url="https://calendly.com/sebidelamata/discoveryourweb3vision"
      className={buttonVariants({ variant: "accent", size: "default" })}
      text="Schedule a meetup"
      rootElement={rootElement}
    />
  )
}

export default Scheduler