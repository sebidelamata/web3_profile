import React from "react"

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-border py-10">
            <div className="mx-auto flex max-w-content flex-col items-start gap-3 px-5 text-sm text-fg-dim sm:flex-row sm:items-center sm:justify-between">
                <span>&copy; 2026 Sebi de la Mata Web3 Development, LLC</span>
                <div className="flex gap-4">
                    <a href="https://t.me/sebidelamata" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">telegram</a>
                    <a href="https://github.com/sebidelamata" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">github</a>
                    <a href="https://sebidelamata.github.io/datascienceblog/assets/delaMataResume.pdf" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">resume</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer