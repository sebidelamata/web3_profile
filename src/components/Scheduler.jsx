import { PopupButton } from "react-calendly";

const Scheduler = () => {
    return(
        <PopupButton
        url="https://calendly.com/sebidelamata/discoveryourweb3vision"
        className="scheduler-button"
        text="Let's Meetup"
        /*
         * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
         * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
         */
        rootElement={document.getElementById("root")}
      />
    )
}

export default Scheduler