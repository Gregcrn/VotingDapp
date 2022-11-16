import React from 'react';
import TallVotes from './TallVotes';

const OwnerForm = ({
    handleChange,
    value,
    addVoter,
    placeholder,
    type,
    name,
    isEnded,
    countingVotes,
}) => {
    return (
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <h1 className="mb-4 text-1xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    Admin
                </span>{' '}
            </h1>

            {!isEnded && (
                <>
                    <p className="text-md font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        Enter the address of voter
                    </p>
                    <input
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        name={name}
                        onChange={(e) => handleChange(e, name)}
                        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                    />
                    <button
                        onClick={addVoter}
                        type="button"
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4 shadow-xl shadow-cyan-400/30 "
                    >
                        Add Voter
                    </button>
                </>
            )}
            {isEnded && <TallVotes TallVotes={countingVotes} />}
        </div>
    );
};

export default OwnerForm;
