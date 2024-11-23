import React from 'react';

const StuffContent = ({ heading, description }) => {
  return (
    <div className='w-screen flex items-center justify-center'>
      <div className="flex flex-col w-5/6 xsm:w-[400px] sm:w-[500px]">
        {/* Heading */}
        <p className="relative text-lg xsm:text-2xl text-center bg-orange-600 text-orange-100 rounded-xl translate-y-4">
          {heading}
        </p>

        {/* Description */}
        <div className="flex flex-col pt-8 pb-2 xsm:pb-4 px-4 xsm:px-8 bg-orange-100 text-orange-950 rounded-b-xl min-h-[120px] max-h-[400px] overflow-hidden">
          <p className="text-sm xsm:text-base text-justify">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StuffContent;
