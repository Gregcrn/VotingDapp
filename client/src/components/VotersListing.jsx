import React from 'react';
import { SiEthereum } from 'react-icons/si';

const VotersListing = ({ number, addressOfVoter }) => {
    return (
        <>
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                <li className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full border-2 border-teal-800 flex justify-center items-center border-r">
                                <SiEthereum fontSize={12} color="#fff" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Voter {number}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {addressOfVoter}
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    );
};

export default VotersListing;
