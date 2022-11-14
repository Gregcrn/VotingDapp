import React from 'react';
import { Navbar, Welcome, NoticeWrongNetwork, NoticeNoArtifact } from './index';
import useEth from '../contexts/EthContext/useEth';

const Interface = () => {
    const { state } = useEth();
    return (
        <div className="min-h-screen">
            <div className="gradient-bg-welcome min-h-screen">
                {!state.artifact ? null : !state.contract ? (
                    <NoticeWrongNetwork />
                ) : (
                    <>
                        <>
                            <Navbar />
                            <Welcome />
                        </>
                    </>
                )}
            </div>
        </div>
    );
};

export default Interface;
