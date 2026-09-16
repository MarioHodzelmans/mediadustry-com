'use client'

import errorImg from '../../public/assets/img/error/fixing-bugs.jpg';
import { useEffect } from "react";
import Image from 'next/image';

//global boundary error
export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);
    return (
        <main>
            <div className="tp-error-area pt-190 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="tp-error-wrapper text-center">
                                <Image src={errorImg} alt="error" />
                                <h1 className="title">Something went wrong</h1>
                                <p className="text">
                                    {error?.message}
                                </p>
                                <div className="tp-error-content">
                                    <button className='tp-btn' onClick={() => reset()}>
                                        Try again
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}