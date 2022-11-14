import React from 'react';

const NotRegistered = () => {
    return (
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <h1 className="mb-4 text-1xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    Not Registered
                </span>{' '}
            </h1>
            <p className="text-md font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                You are not registered as a voter or owner. <br />
                Please contact the owner to register
            </p>
        </div>
    );
};

export default NotRegistered;
