import Navbar from "../components/Navbar"
import React from "react"

const Resume: React.FC = () => {
    return(
        <>
            <Navbar></Navbar>
            <div>
               <iframe 
               src="https://sebidelamata.github.io/datascienceblog/assets/delaMataResume.pdf" 
               frameBorder="0"
               className="resume-doc"></iframe>
            </div>
        </>
    )
}

export default Resume