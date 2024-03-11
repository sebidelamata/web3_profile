const Contacts = () => {

    return(
        <div className="contact-card">
            <button className="contact-title"><strong>Get In Touch</strong></button>
            <div id="contact-form">
                <div className="contact-description">
                    If there is anything you would like to discuss further, don't hesitate to reach out to me personally.
                </div>
                <form 
                    method="post"
                    encType="text/plain">
                    <label htmlFor="name">Name</label><br/>
                    <input id="form-name" name="name" placeholder="Rusty Shackleford"/><br/>
                    <label htmlFor="name">Email</label><br/>
                    <input type="email" name="mail" placeholder="you@example.com"/><br/>
                    <label htmlFor="name">Message</label><br/>
                    <textarea id="message" name="message" placeholder="Hello, ..."/><br/>
                    <input type="submit" value="Send"/>
                </form>
            </div>
        </div>
    )
}

export default Contacts