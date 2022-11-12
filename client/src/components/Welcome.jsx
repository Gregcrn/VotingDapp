import React, { useEffect, useState } from 'react';
import useEth from '../contexts/EthContext/useEth';

import { AiOutlineAntCloud } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import Progress from './Progress';
import WorkflowTab from './WorkflowTab';

import { shortenAddress } from '../utils/shortenAddress';

const companyCommonStyles =
    'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

const AddresseVoter = [
    {
        address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
        isVoter: true,
    },
    {
        address: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
        isVoter: true,
    },
    {
        address: '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',
        isVoter: true,
    },
    {
        address: '0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB',
        isVoter: true,
    },
];

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

const StatusInfos = ({ status }) => (
    <div className="w-full">
        <p className="text-2xl text-slate-300 text-left underline decoration-pink-500/30 decoration-4 mb-3 ">
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
                <p className="text-center">{status}</p>
            </div>
        </div>
    </div>
);

const OwnerForm = ({ handleChange, addressOfVoter, addVoter }) => (
    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
        <h1 className="mb-4 text-1xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Admin
            </span>{' '}
        </h1>
        <p className="text-md font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Enter the address of voter
        </p>
        <Input
            placeholder="Address of voter"
            name="addressOfVoter"
            type="text"
            value={addressOfVoter}
            handleChange={handleChange}
        />
        <button
            onClick={addVoter}
            type="button"
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4 shadow-xl shadow-cyan-400/30 "
        >
            Add Voter
        </button>
    </div>
);
const Welcome = () => {
    const [owner, setOwner] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('');
    const [progress, setProgress] = useState(0);

    const {
        state: { contract, accounts },
    } = useEth();

    useEffect(() => {
        async function getOwner() {
            if (contract) {
                const myOwner = await contract.methods.owner().call();
                setOwner(myOwner);
            }
        }
        async function currentAccount() {
            if (accounts) {
                setCurrentAccount(await accounts[0]);
            }
        }
        async function getStatus() {
            if (contract) {
                const status = parseInt(
                    await contract.methods.workflowStatus().call()
                );
                setCurrentStatus(status);
            }
        }
        getStatus();
        getOwner();
        currentAccount();
    }, [contract, accounts]);

    useEffect(() => {
        if (currentAccount === owner) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }
    }, [currentAccount, owner, contract, accounts]);

    useEffect(() => {
        switch (currentStatus) {
            case 0:
                setCurrentStatus('Registering of voters');
                setProgress(1);
                break;
            case 1:
                setCurrentStatus('Proposals registration');
                setProgress(16);
                break;
            case 2:
                setCurrentStatus('End of proposals registration');
                setProgress(33);
                break;
            case 3:
                setCurrentStatus('Voting session started');
                setProgress(50);
                break;
            case 4:
                setCurrentStatus('Voting session ended');
                setProgress(66);
                break;
            case 5:
                setCurrentStatus('Session votes tallied');
                setProgress(100);
        }
    }, [currentStatus]);

    const connectWallet = () => {
        console.log('hello');
    };

    const handleChange = (e) => {
        console.log(e.target.value);
    };

    const addVoter = () => {
        console.log('hello');
    };

    return (
        <>
            <div className="flex w-full justify-center items-center">
                <div className="flex mf:flex-row flex-col items-start justify-between md:p-16 py-7 px-4">
                    <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                        <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                            Make your voice heard <br /> around the world
                        </h1>
                        <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                            The best Voting App for your needs with your ETH
                            Card.
                        </p>
                        <StatusInfos status={currentStatus} />
                        <Progress progress={progress} />
                        <WorkflowTab />
                    </div>
                </div>
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-4 flex justify-end items-start flex-col rounded-xl h-64 my-5 eth-card .white-glassmorphism w-7/12">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            <div>
                                <p className="text-white font-light text-sm">
                                    {shortenAddress(currentAccount)}
                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>
                    {isOwner && (
                        <>
                            <OwnerForm
                                handleChange={handleChange}
                                addVoter={addVoter}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Welcome;
