import emailjs from '@emailjs/browser'
import { useRef, useState, useEffect } from 'react'
import SuccessBanner from './SuccesBanner'
import Scheduler from './Scheduler'


const Contacts = () => {

    const [successMessage, setSuccessMessage] = useState(false)

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID, 
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
            form.current, 
            {
                publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            }
        )
        .then(() => {
            console.log('SUCCESS!')
            setSuccessMessage(true)
            },
            (error) => {
            console.log('FAILED...', error);
            },
        );
    };

    if(successMessage === true){
        setTimeout(() => {
            setSuccessMessage(false)
        }, 5000)
    }


    return(
        <div className="contact-card">
            <button className="contact-title"><strong>Get In Touch</strong></button>
            <Scheduler></Scheduler>
            <div id="contact-form">
                <div className="contact-description">
                    If there is anything you would like to discuss further, don&apos;t hesitate to reach out to me personally.
                </div>
                <form ref={form} onSubmit={sendEmail}>
                    <label htmlFor="name">Name</label><br/>
                    <input id="form-name" name="name" placeholder="Rusty Shackleford"/><br/>
                    <label htmlFor="name">Email</label><br/>
                    <input type="email" name="email" placeholder="you@example.com"/><br/>
                    <label htmlFor="name">Message</label><br/>
                    <textarea id="message" name="message" placeholder="Hello, ..."/><br/>
                    <input type="submit" value="Send"/>
                </form>
            </div>
            {
                successMessage === true &&
                <SuccessBanner></SuccessBanner>
            }
        </div>
    )
}

export default Contacts