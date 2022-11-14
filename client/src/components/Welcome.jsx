import React, { useEffect, useState } from 'react';
import useEth from '../contexts/EthContext/useEth';

import { AiOutlineAntCloud } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
// Component
import Progress from './Progress';
import WorkflowTab from './WorkflowTab';
import StatusInfos from './StatusInfos';

import { shortenAddress } from '../utils/shortenAddress';

const companyCommonStyles =
    'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

const OwnerForm = ({
    handleChange,
    value,
    addVoter,
    placeholder,
    type,
    name,
}) => (
    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
        <h1 className="mb-4 text-1xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Admin
            </span>{' '}
        </h1>
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
    </div>
);
const Welcome = () => {
    const [owner, setOwner] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(false);
    const [currentStatusDesc, setCurrentStatusDesc] = useState('');
    const [currentStatus, setCurrentStatus] = useState();
    const [progress, setProgress] = useState(0);
    const [addressOfVoter, setAddressOfVoter] = useState('');
    const [allVoters, setAllVoters] = useState();
    const [nextStatusDescription, setNextStatus] = useState('');

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
                setCurrentStatusDesc(status);
                setCurrentStatus(status);
            }
        }
        getStatus();
        getOwner();
        currentAccount();
        getvoters();
    }, [contract, accounts]);

    useEffect(() => {
        if (currentAccount === owner) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }
    }, [currentAccount, owner, contract, accounts]);

    useEffect(() => {
        switch (currentStatusDesc) {
            case 0:
                setCurrentStatusDesc('Registering of voters');
                setProgress(1);
                setNextStatus('Opening of the proposal session');
                break;
            case 1:
                setCurrentStatusDesc('Proposals registration');
                setProgress(16);
                setNextStatus('Closing of the proposal session');
                break;
            case 2:
                setCurrentStatusDesc('End of proposals registration');
                setProgress(33);
                setNextStatus('Opening of the voting session');
                break;
            case 3:
                setCurrentStatusDesc('Voting session started');
                setProgress(50);
                setNextStatus('Closing of the voting session');
                break;
            case 4:
                setCurrentStatusDesc('Voting session ended');
                setProgress(66);
                setNextStatus('Opening of the results session');
                break;
            case 5:
                setCurrentStatusDesc('Session votes tallied');
                setProgress(100);
                setNextStatus('End of the voting session');
        }
    }, [currentStatusDesc]);

    const handleChange = (e) => {
        e.preventDefault();
        setAddressOfVoter(e.currentTarget.value);
    };

    async function getvoters() {
        if (contract) {
            let allVoters = await contract.getPastEvents('VoterRegistered', {
                fromBlock: 0,
                toBlock: 'latest',
            });
            let voters = [];
            for (const voter of allVoters) {
                voters.push({
                    address: voter.returnValues.voterAddress,
                });
            }
            setAllVoters(voters);
        }
    }

    const addVoter = async () => {
        if (addressOfVoter === '') {
            alert('Please enter a valid address');
            return;
        } else {
            await contract.methods
                .addVoter(addressOfVoter)
                .send({ from: owner });
            getvoters();
        }
    };

    const changeStatus = async (status) => {
        if (status === 0) {
            await contract.methods
                .startProposalsRegistering()
                .send({ from: owner });
        }
        if (status === 1) {
            await contract.methods
                .endProposalsRegistering()
                .send({ from: owner });
        }
        if (status === 2) {
            await contract.methods.startVotingSession().send({ from: owner });
        }
        if (status === 3) {
            await contract.methods.endVotingSession().send({ from: owner });
        }
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
                        <StatusInfos
                            currentStatusDesc={currentStatusDesc}
                            nextStatusDescription={nextStatusDescription}
                            rawStatus={currentStatus}
                        />
                        <Progress progress={progress} />
                        <WorkflowTab allVoters={allVoters} />
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
                                <p className="text-white font-light text-lg">
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
                                placeholder="Enter the address of voter"
                                type="text"
                                value={addressOfVoter}
                                name="addressOfVoter"
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
