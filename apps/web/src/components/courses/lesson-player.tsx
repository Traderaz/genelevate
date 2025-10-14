'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  SkipBack, 
  SkipForward,
  Settings,
  Subtitles,
  RotateCcw,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react';

interface LessonPlayerProps {
  courseSlug: string;
  lessonId: string;
}

interface LessonData {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'text' | 'interactive' | 'quiz';
  content: any;
  duration: number;
  pointsValue: number;
  isCompleted: boolean;
  progress: number;
}

export function LessonPlayer({ courseSlug, lessonId }: LessonPlayerProps) {
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // TODO: Fetch lesson data from API
    setTimeout(() => {
      setLesson({
        id: lessonId,
        title: 'Understanding Limits',
        description: 'Learn what limits are and how to calculate them in this comprehensive video lesson.',
        type: 'video',
        content: {
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          transcript: 'This is a sample transcript...',
          subtitles: 'Sample subtitles...',
        },
        duration: 30, // 30 minutes
        pointsValue: 40,
        isCompleted: false,
        progress: 0,
      });
      setLoading(false);
    }, 1000);
  }, [lessonId]);

  // Video event handlers
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      // Update progress
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      // TODO: Send progress update to API
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(videoRef.current.duration, currentTime + seconds));
      handleSeek(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Auto-hide controls
  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  useEffect(() => {
    const handleMouseMove = () => resetControlsTimeout();
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          isPlaying ? handlePause() : handlePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skip(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          skip(10);
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, currentTime]);

  if (loading) {
    return (
      <div className="flex-1 bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex-1 bg-black flex items-center justify-center">
        <div className="text-white text-lg">Lesson not found</div>
      </div>
    );
  }

  if (lesson.type === 'video') {
    return (
      <div 
        ref={playerRef}
        className="flex-1 relative bg-black group"
        onMouseMove={resetControlsTimeout}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={lesson.content.videoUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => {
            setIsPlaying(false);
            // TODO: Mark lesson as completed
          }}
        />

        {/* Video Controls Overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <h2 className="text-lg font-semibold">{lesson.title}</h2>
                <p className="text-sm text-gray-300">{lesson.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-black/50 rounded-lg px-3 py-1">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">{lesson.pointsValue} pts</span>
                </div>
                {lesson.isCompleted && (
                  <div className="flex items-center space-x-2 bg-green-600 rounded-lg px-3 py-1">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Completed</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center Play Button */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlay}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-all duration-200"
              >
                <Play className="w-12 h-12 text-white ml-1" />
              </button>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="relative">
                <div className="w-full h-1 bg-white/30 rounded-full">
                  <div 
                    className="h-1 bg-blue-500 rounded-full transition-all duration-100"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>

                <button
                  onClick={() => skip(-10)}
                  className="hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={() => skip(10)}
                  className="hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-20"
                  />
                </div>

                <div className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Playback Speed */}
                <select
                  value={playbackRate}
                  onChange={(e) => handlePlaybackRateChange(Number(e.target.value))}
                  className="bg-white/20 text-white text-sm rounded px-2 py-1 border-none outline-none"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>

                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`hover:bg-white/20 rounded-full p-2 transition-colors ${
                    showSubtitles ? 'bg-white/20' : ''
                  }`}
                >
                  <Subtitles className="w-5 h-5" />
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subtitles */}
        {showSubtitles && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/80 text-white px-4 py-2 rounded text-center max-w-2xl">
              Sample subtitle text would appear here...
            </div>
          </div>
        )}
      </div>
    );
  }

  // Handle other lesson types (text, interactive, quiz)
  return (
    <div className="flex-1 bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
          <p className="text-gray-600">{lesson.description}</p>
        </div>

        {lesson.type === 'text' && (
          <div className="prose prose-lg max-w-none">
            <p>This is where the text content would be rendered...</p>
            {/* TODO: Render markdown content */}
          </div>
        )}

        {lesson.type === 'interactive' && (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-600">Interactive content would be embedded here...</p>
            {/* TODO: Embed interactive content */}
          </div>
        )}

        {lesson.type === 'quiz' && (
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-4">Quiz: {lesson.title}</h2>
            <p className="text-gray-600">Quiz component would be rendered here...</p>
            {/* TODO: Render quiz component */}
          </div>
        )}
      </div>
    </div>
  );
}
