import React from "react"

const SuccessBanner: React.FC = () => {
    return (
        <div
            role="status"
            className="fixed bottom-5 right-5 z-50 max-w-xs border border-accent bg-bg-raised p-4 text-sm"
        >
            Thanks for reaching out. We&apos;ll be in touch shortly.
        </div>
    )
}

export default SuccessBanner