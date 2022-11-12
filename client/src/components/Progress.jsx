import React from 'react';

const Progress = ({ progress }) => {
    return (
        <div className="w-full bg-gray-200 rounded-br-lg rounded-bl-lg h-2.5 dark:bg-gray-800">
            <div
                className="bg-blue-600 h-2.5 "
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default Progress;
