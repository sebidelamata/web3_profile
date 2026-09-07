import React from "react";

const HelpOutput: React.FC = () => (
    <div className="flex flex-col gap-1">
        <p>available commands:</p>
        <dl className="ml-4 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1">
            <dt className="text-accent">ls stack</dt>
            <dd className="text-fg-dim">list tech stack</dd>
            <dt className="text-accent">ls projects</dt>
            <dd className="text-fg-dim">list all projects</dd>
            <dt className="text-accent">cat &lt;project&gt;</dt>
            <dd className="text-fg-dim">show details for a project</dd>
            <dt className="text-accent">whoami</dt>
            <dd className="text-fg-dim">who&apos;s behind this</dd>
            <dt className="text-accent">clear</dt>
            <dd className="text-fg-dim">clear the screen</dd>
            <dt className="text-accent">contact</dt>
            <dd className="text-fg-dim">send me an email</dd>
            <dt className="text-accent">resume</dt>
            <dd className="text-fg-dim">view my resume</dd>
            <dt className="text-accent">schedule</dt>
            <dd className="text-fg-dim">schedule a meeting</dd>
            <dt className="text-accent">connect</dt>
            <dd className="text-fg-dim">connect Web3 wallet</dd>
            <dt className="text-accent">mint</dt>
            <dd className="text-fg-dim">mint Boxers in Predicaments NFT</dd>
            <dt className="text-accent">--help</dt>
            <dd className="text-fg-dim">show this again</dd>
        </dl>
    </div>
);

export default HelpOutput;