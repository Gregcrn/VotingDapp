import React from 'react';
import { useEffect } from 'react';
import useEth from '../contexts/EthContext/useEth';

const StatusInfos = ({
    rawStatus,
    currentStatusDesc,
    nextStatusDescription,
}) => {
    const {
        state: { contract },
    } = useEth();

    async function startProposalsRegistering() {
        return await contract.methods
            .startProposalsRegistering()
            .send({ from: contract.methods.owner().call() });
    }
    async function endProposalsRegistering() {
        return await contract.methods
            .endProposalsRegistering()
            .send({ from: contract.methods.owner().call() });
    }
    async function startVotingSession() {
        return await contract.methods
            .startVotingSession()
            .send({ from: contract.methods.owner().call() });
    }
    async function endVotingSession() {
        return await contract.methods
            .endVotingSession()
            .send({ from: contract.methods.owner().call() });
    }
    async function startResultsSession() {
        return await contract.methods
            .tallyVotes()
            .send({ from: contract.methods.owner().call() });
    }

    useEffect(() => {
        switch (rawStatus) {
            case 0:
                console.log('Next: Openning proposals registration');
                break;
            case 1:
                console.log('Next :Proposals Registration ended');
                break;
            case 2:
                console.log('Next : Openning voting session');
                break;
            case 3:
                console.log('Next : Voting session ended');
                break;
            case 4:
                console.log('Next : Opening results session');
                break;
            default:
                break;
        }
    }, [contract]);

    // console.log('changeStatus', changeStatus);
    // console.log('rawStatus', rawStatus);

    return (
        <div className="w-full">
            <p className="text-lg text-slate-300 text-left underline decoration-pink-500/30 decoration-4 mb-3 ">
                Session :{' '}
            </p>
            <div
                id="toast-simple"
                className="flex items-center p-4 space-x-4 w-full text-gray-500 bg-white rounded-tl-lg rounded-tr-lg divide-x divide-gray-200 shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
                role="alert"
            >
                <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-blue-600 dark:text-blue-500"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="paper-plane"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <path
                        fill="currentColor"
                        d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
                    ></path>
                </svg>

                <div className="text-sm font-normal w-full">
                    <p className="text-center">{currentStatusDesc}</p>
                </div>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        {nextStatusDescription}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default StatusInfos;
