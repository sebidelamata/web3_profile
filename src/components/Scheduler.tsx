import { PopupButton } from "react-calendly";
import React from "react";
import { buttonVariants } from "./components/ui/button";

const Scheduler: React.FC = () => {
  const rootElement = document.getElementById("root") as HTMLElement;

  return (
    <div className="flex gap-4 items-center">
      <div>
        If there's anything you'd like to discuss further, don't hesitate to reach out.
      </div>
      <PopupButton
        url="https://calendly.com/sebidelamata/discoveryourweb3vision"
        className={buttonVariants({ variant: "default", size: "default" })}
        text="Schedule a meetup"
        rootElement={rootElement}
      />
    </div>

  )
}

export default Scheduler