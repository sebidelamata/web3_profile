import emailjs from '@emailjs/browser'
import React, { useRef, useState, useEffect } from 'react'
import SuccessBanner from './SuccessBanner'
import Scheduler from './Scheduler'


const Contacts: React.FC = () => {

    const [successMessage, setSuccessMessage] = useState<boolean>(false)

    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID as string, 
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string, 
            form.current as HTMLFormElement, 
            {
                publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string,
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
            <button className="contact-title"><h2><strong id='contact-title-title'>Get In Touch</strong></h2></button>
            <div id="contact-form">
                <div className="contact-description">
                    <Scheduler></Scheduler>
                    <div className='contact-description-description'>If there is anything you would like to discuss further, don&apos;t hesitate to reach out to me personally.</div>
                </div>
                <form ref={form} onSubmit={sendEmail}>
                    <div className='form-line-one'>
                        <label htmlFor="name">Name</label>
                        <input id="form-name" name="name" placeholder="Rusty Shackleford" required/>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="you@example.com" required/>
                    </div>
                    <label htmlFor="message">Message</label><br/>
                    <textarea id="message" name="message" placeholder="Hello, ..." required/><br/>
                    <input className="form-submit" type="submit" value="Send"/>
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