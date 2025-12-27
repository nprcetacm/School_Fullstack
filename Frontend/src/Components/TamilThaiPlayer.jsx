import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import tamilthaivazhthu from '../schoolassets/tamilthaivazhthu/thamizhthaivazhthu.mp3'

const TamilThaiPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-gray-700" fill="currentColor" />
            ) : (
              <Play className="w-4 h-4 text-gray-700" fill="currentColor" />
            )}
          </button>

          {/* Text */}
          <span className="text-sm text-gray-700">தமிழ்த்தாய் வாழ்த்து</span>

          {/* Duration Display */}
          {duration > 0 && (
            <span className="text-xs text-gray-500">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          )}
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={tamilthaivazhthu}
          onEnded={handleAudioEnd}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          preload="auto"
        />
      </div>
    </div>
  );
};

export default TamilThaiPlayer;