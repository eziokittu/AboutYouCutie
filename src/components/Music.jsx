import React, { useState, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';

const Music = () => {
  const [autoPlayStarted, setAutoPlayStarted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const playerRef = useRef();

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.audio.current.play().catch((error) => {
        console.log('Playing music failed:', error);
        setAutoPlayStarted(false);
        setMusicPlaying(false);
      });
      if (autoPlayStarted === true) {
        setMusicPlaying(true);
      }
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.audio.current.pause();
      setMusicPlaying(false);
    }
  };

  return (
    <div className=''
      onMouseOver={() => {
        if (!autoPlayStarted) {
          handlePlay();
          setAutoPlayStarted(true);
          setMusicPlaying(true);
        }
      }}
    >
      {/* Audio player button */}
      <div className="fixed z-50 bottom-0 flex">
        <div className="flex flex-col bg-orange-200 rounded-tr-3xl text-orange-500 justify-center">
          <p className="pl-1 pr-3 text-lg font-bold">Music</p>
          <div className="flex flex-row justify-center text-4xl pb-1">
            {musicPlaying ? (
              <div className="cursor-pointer" onClick={handlePause}>
                <svg className='w-10 h-10' fill="currentColor" viewBox="-1 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>pause [#1010]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-67.000000, -3765.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M11,3613 L13,3613 L13,3605 L11,3605 L11,3613 Z M15,3613 L17,3613 L17,3605 L15,3605 L15,3613 Z" id="pause-[#1010]"> </path> </g> </g> </g> </g>
                </svg>
              </div>
            ) : (
              <div className="cursor-pointer" onClick={handlePlay}>
                <svg className='w-10 h-10' fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 96.155 96.155">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M20.972,95.594l57.605-45.951c0.951-0.76,0.951-2.367,0-3.127L20.968,0.56c-0.689-0.547-1.716-0.709-2.61-0.414 c-0.186,0.061-0.33,0.129-0.436,0.186c-0.65,0.35-1.056,1.025-1.056,1.764v91.967c0,0.736,0.405,1.414,1.056,1.762 c0.109,0.06,0.253,0.127,0.426,0.185C19.251,96.305,20.281,96.144,20.972,95.594z"></path> </g> </g>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Audio Player object */}
      <AudioPlayer
        className="w-0 h-0 opacity-"
        ref={playerRef}
        loop
        volume={0.09}
        src="../Music/music2.mp3"
        customAdditionalControls={[]}
        customVolumeControls={[]}
        showJumpControls={false}
      />
    </div>
  );
};

export default Music;
