import useEth from '../contexts/EthContext/useEth';

import { useEffect, useState } from 'react';

import { Tab } from '@headlessui/react';
import VotersListing from './VotersListing';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function WorkflowTab({
    allVoters,
    allProposals,
    currentVoter,
    winnerProposal,
}) {
    const {
        state: { contract },
    } = useEth();

    let [process] = [
        {
            Voters: allVoters,
            Proposal: allProposals,
            Winner: winnerProposal,
        },
    ];
    console.log(winnerProposal);
    const VoteForProposal = async (proposalId) => {
        return await contract.methods
            .setVote(proposalId)
            .send({ from: currentVoter });
    };

    return (
        <div className="w-full max-w-xl px-2 py-1 mt-7 ">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {Object.keys(process).map((step) => (
                        <Tab
                            key={step}
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-white shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                )
                            }
                        >
                            {step}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {Object.values(process).map((data, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                'rounded-xl blue-glassmorphism p-3',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                            )}
                        >
                            <ul>
                                {data?.map((voter, i) => {
                                    if (data) {
                                        return (
                                            <VotersListing
                                                key={i}
                                                addressOfVoter={voter.address}
                                                proposalOfVoter={
                                                    voter.description
                                                }
                                                voteCount={voter.voteCount}
                                                idOfProposal={voter.id}
                                                winnerProposalId={
                                                    voter.idOfWinner
                                                }
                                                VoteFortheProposal={() =>
                                                    VoteForProposal(voter.id)
                                                }
                                            />
                                        );
                                    }
                                })}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
