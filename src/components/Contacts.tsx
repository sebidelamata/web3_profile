import emailjs from '@emailjs/browser'
import React, { useRef, useState } from 'react'
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
            { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string }
        ).then(() => {
            setSuccessMessage(true)
            setTimeout(() => setSuccessMessage(false), 5000)
        }, (error) => {
            console.log('FAILED...', error);
        });
    };

    const inputClasses = "border border-border bg-bg-raised px-3 py-2 text-sm text-fg placeholder:text-fg-dim/60 focus:border-accent focus:outline-none";

    return (
        <div className="flex flex-col gap-6">
            <span className="prompt-label text-sm text-accent">contact --new</span>
            <h2 className="text-xl font-bold">Get in touch</h2>
            <p className="text-fg-dim">
                If there&apos;s anything you&apos;d like to discuss further, don&apos;t hesitate to reach out.
            </p>
            <Scheduler />
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="form-name" className="text-sm text-fg-dim">name</label>
                    <input id="form-name" name="name" type="text" placeholder="Rusty Shackleford" required className={inputClasses} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="form-email" className="text-sm text-fg-dim">email</label>
                    <input id="form-email" name="email" type="email" placeholder="you@example.com" required className={inputClasses} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="message" className="text-sm text-fg-dim">message</label>
                    <textarea id="message" name="message" placeholder="Hello, ..." required rows={5} className={`${inputClasses} resize-y`} />
                </div>
                <input
                    type="submit"
                    value="Send"
                    className="w-fit cursor-pointer border border-accent px-4 py-2 text-accent transition-colors hover:bg-accent hover:text-bg"
                />
            </form>
            {successMessage && <SuccessBanner />}
        </div>
    )
}

export default Contacts