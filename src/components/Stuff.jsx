import React, { useState, useEffect, useRef } from 'react';
import contentData from "../data/contentData.json";
import StuffContent from '../reusable/StuffContent';

const Stuff = () => {
  const [contentIndex, setContentIndex] = useState(0); // Index of current content
  const [descriptionIndex, setDescriptionIndex] = useState(0); // Index of current description
  const timeoutRef = useRef(null); // Reference for the timer to manage clear/reset operations
  const contentSwitchTime = 1000*8;

  // Calculate total descriptions for progress bar
  const totalDescriptions = contentData.contents.reduce(
    (total, content) => total + content.descriptions.length,
    0
  );

  // Find the overall progress index for the active description
  const currentProgressIndex = contentData.contents
    .slice(0, contentIndex)
    .reduce((acc, content) => acc + content.descriptions.length, 0) + descriptionIndex;

  const clearExistingTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear any existing timeout
  };

  const startAutoSwitch = () => {
    clearExistingTimeout(); // Ensure no duplicate timers
    timeoutRef.current = setTimeout(nextContent, contentSwitchTime); // Start a new timer
  };

  useEffect(() => {
    startAutoSwitch();
    return clearExistingTimeout; // Cleanup on component unmount
  }, [descriptionIndex, contentIndex]);

  const prevContent = () => {
    clearExistingTimeout(); // Reset timer on manual navigation
    setDescriptionIndex((prevDescIndex) => {
      if (prevDescIndex > 0) {
        return prevDescIndex - 1;
      } else {
        setContentIndex((prevContentIndex) => {
          const newContentIndex = (prevContentIndex - 1 + contentData.contents.length) % contentData.contents.length;
          return newContentIndex;
        });
        const newContentIndex = (contentIndex - 1 + contentData.contents.length) % contentData.contents.length;
        const newDescriptionLength = contentData.contents[newContentIndex].descriptions.length;
        return newDescriptionLength - 1;
      }
    });
  };

  const nextContent = () => {
    clearExistingTimeout(); // Reset timer on manual navigation
    const currentContentDescriptions = contentData.contents[contentIndex].descriptions.length;
    setDescriptionIndex((prevDescIndex) => {
      if (prevDescIndex < currentContentDescriptions - 1) {
        return prevDescIndex + 1;
      } else {
        setContentIndex((prevContentIndex) => {
          return (prevContentIndex + 1) % contentData.contents.length;
        });
        return 0;
      }
    });
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4 '>
      <div className="relative flex flex-col items-center justify-center h-full mt-40">
        {/* Progress Bar */}
        <div className="fixed top-20 left-0 w-full h-2 flex">
          {Array.from({ length: totalDescriptions }).map((_, index) => (
            <div
              key={index}
              className={`flex-1 mx-0.5 rounded-full ${index === currentProgressIndex ? "bg-orange-600" : "bg-orange-200"
                }`}
            ></div>
          ))}
        </div>

        {/* Left Button */}
        <div
          onClick={prevContent}
          className="z-10 bg-transparent hover:bg-gradient-to-r hover:from-black/30 to-transparent w-1/2 fixed h-full -translate-x-1/2 cursor-pointer"
        ></div>

        {/* Right Button */}
        <div
          onClick={nextContent}
          className="z-10 bg-transparent hover:bg-gradient-to-l hover:from-black/30 to-transparent w-1/2 fixed h-full translate-x-1/2 cursor-pointer"
        ></div>

        {/* Content */}
        {contentData && contentData.contents.length > 0 && (
          <div className=' -translate-y-24'>
            <StuffContent
              heading={contentData.contents[contentIndex].heading}
              description={contentData.contents[contentIndex].descriptions[descriptionIndex]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Stuff;
