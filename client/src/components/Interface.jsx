import React from 'react';
import {
    Navbar,
    Welcome,
    Footer,
    Services,
    Transactions,
    NoticeWrongNetwork,
    NoticeNoArtifact,
} from './index';
import useEth from '../contexts/EthContext/useEth';

const Interface = () => {
    const { state } = useEth();
    return (
        <div className="min-h-screen">
            <div className="gradient-bg-welcome">
                {!state.artifact ? (
                    <NoticeNoArtifact />
                ) : !state.contract ? (
                    <NoticeWrongNetwork />
                ) : (
                    <>
                        <>
                            <Navbar />
                            <Welcome />
                        </>
                        <Services />
                        <Transactions />
                        <Footer />
                    </>
                )}
            </div>
        </div>
    );
};

export default Interface;
