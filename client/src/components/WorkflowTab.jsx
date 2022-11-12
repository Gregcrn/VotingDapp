import { useState } from 'react';
import { Tab } from '@headlessui/react';
import VotersListing from './VotersListing';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function WorkflowTab() {
    let [process] = useState({
        Voters: [
            {
                number: 1,
                address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
                isVoter: true,
            },
            {
                number: 2,
                address: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
                isVoter: true,
            },
            {
                number: 3,
                address: '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',
                isVoter: true,
            },
            {
                number: 4,
                address: '0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB',
                isVoter: true,
            },
        ],
        Proposal: [],
        Winner: [],
    });

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
                                {data.map((post) => (
                                    <VotersListing
                                        addressOfVoter={post.address}
                                        number={post.number}
                                    />
                                ))}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
