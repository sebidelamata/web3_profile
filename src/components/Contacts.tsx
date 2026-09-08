import emailjs from '@emailjs/browser'
import React, { useRef, useState } from 'react'
import SuccessBanner from './SuccessBanner'

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
                    className="w-fit text-left text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent text-xl"
                />
            </form>
            {successMessage && <SuccessBanner />}
        </div>
    )
}

export default Contacts