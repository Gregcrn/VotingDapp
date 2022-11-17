// import useEth from '../contexts/EthContext/useEth';

import { useEffect, useState } from 'react';

import { Tab } from '@headlessui/react';
import VotersListing from './VotersListing';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function WorkflowTab({
    allVoters,
    allProposals,
    currentStatus,
    winnerProposal,
    voteForProposal,
    isOwner,
}) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        switch (currentStatus) {
            case 0:
                setSelectedIndex(0);
                break;
            case 1:
                setSelectedIndex(1);
                break;
            case 2:
                setSelectedIndex(1);
                break;
            case 3:
                setSelectedIndex(1);
                break;
            case 4:
                setSelectedIndex(1);
                break;
            case 5:
                setSelectedIndex(2);
                break;
            default:
                break;
        }
    }, [currentStatus]);

    let [process] = [
        {
            Voters: allVoters,
            Proposal: allProposals,
            Winner: winnerProposal,
        },
    ];

    return (
        <div className="w-full max-w-xl px-2 py-1 mt-7 ">
            <Tab.Group
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
            >
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
                                {Array.isArray(data)
                                    ? data.map((voter, i) => {
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
                                                      voteForProposal(voter.id)
                                                  }
                                                  isOwner={isOwner}
                                                  currentStatus={currentStatus}
                                              />
                                          );
                                      })
                                    : null}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
