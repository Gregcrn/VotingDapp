import React from 'react';
import { SiEthereum } from 'react-icons/si';

const VotersListing = ({
    addressOfVoter,
    proposalOfVoter,
    voteCount,
    idOfProposal,
    VoteFortheProposal,
    winnerProposalId,
}) => {
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
                            {addressOfVoter && (
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Voter
                                </p>
                            )}
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {addressOfVoter}
                            </p>
                            {proposalOfVoter && !winnerProposalId && (
                                <p className="tex-md text-gray-500 truncate dark:text-gray-400">
                                    Proposition n° : {idOfProposal} -{' '}
                                    <span className="text-emerald-500">
                                        {proposalOfVoter}
                                    </span>
                                </p>
                            )}
                            {winnerProposalId && (
                                <p className="tex-md text-gray-500 truncate dark:text-gray-400">
                                    Winner Proposition n° : {winnerProposalId}{' '}
                                    <span className="text-emerald-500">
                                        {proposalOfVoter}
                                    </span>
                                    <br />
                                    Congratulations !
                                </p>
                            )}
                            {proposalOfVoter && voteCount && (
                                <>
                                    <p className="text-sm text-gray-800 truncate dark:text-gray-400">
                                        Number of votes for the proposal :{' '}
                                        <span className="text-lg font-semibold text-gray-800 truncate dark:text-gray-400">
                                            {voteCount}
                                        </span>
                                    </p>
                                    <button
                                        onClick={VoteFortheProposal}
                                        type="button"
                                        className="mt-6 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2 -ml-1 text-[#626890]"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fab"
                                            data-icon="ethereum"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
                                            ></path>
                                        </svg>
                                        Vote
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </li>
            </ul>
        </>
    );
};

export default VotersListing;
