import React from 'react'
import Spinner from "./Spinner.jsx";

const LoadingOverlay = ({show}) => {
    return (
        show === true ? (
            <div className="fixed inset-0 flex w-screen items-center justify-center p-10 bg-white/20">
                <Spinner/>
            </div>
        ) : null
    )
}
export default LoadingOverlay
