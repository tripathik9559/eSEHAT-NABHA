import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Monitor,
  Users,
  MessageSquare,
  Settings,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Camera,
  CameraOff
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const VideoCall = ({ doctorInfo, consultationId, onEndCall }) => {
  const { t } = useLanguage();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState('connecting'); // connecting, connected, ended
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const containerRef = useRef(null);

  // Simulate call connection
  useEffect(() => {
    const timer = setTimeout(() => {
      setCallStatus('connected');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Call duration timer
  useEffect(() => {
    if (callStatus === 'connected') {
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [callStatus]);

  // Format call duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle video
  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  // Toggle audio
  const handleToggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  // Toggle speaker
  const handleToggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
  };

  // End call
  const handleEndCall = () => {
    setCallStatus('ended');
    if (onEndCall) {
      onEndCall();
    }
  };

  // Toggle fullscreen
  const handleToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // Switch camera (front/back on mobile)
  const handleSwitchCamera = () => {
    // Mock camera switch
    console.log('Switching camera...');
  };

  return (
    <div ref={containerRef} className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">
              {doctorInfo?.name?.charAt(0) || 'D'}
            </span>
          </div>
          <div>
            <h3 className="font-semibold">{doctorInfo?.name || 'Dr. Unknown'}</h3>
            <div className="flex items-center gap-2 text-xs">
              {callStatus === 'connecting' && (
                <>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-yellow-400">{t?.connecting || 'Connecting...'}</span>
                </>
              )}
              {callStatus === 'connected' && (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400">{formatDuration(callDuration)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title={t?.participants || 'Participants'}
          >
            <Users className="w-5 h-5" />
          </button>
          <button
            onClick={handleToggleFullScreen}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title={isFullScreen ? t?.exitFullScreen : t?.fullScreen}
          >
            {isFullScreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Video Container */}
      <div className="flex-1 relative bg-black">
        {/* Remote Video (Doctor) */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="video-container w-full h-full">
            {callStatus === 'connected' ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-bold">
                      {doctorInfo?.name?.charAt(0) || 'D'}
                    </span>
                  </div>
                  <p className="text-lg font-semibold">{doctorInfo?.name || 'Dr. Unknown'}</p>
                  <p className="text-sm text-gray-300">{doctorInfo?.specialty || 'General Physician'}</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-lg">{t?.connectingCall || 'Connecting to call...'}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Local Video (Self View) */}
        <div className="absolute bottom-20 right-4 w-32 h-40 md:w-40 md:h-48 bg-gray-800 rounded-lg overflow-hidden shadow-xl border-2 border-gray-700">
          {isVideoOn ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs opacity-70">{t?.you || 'You'}</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <CameraOff className="w-8 h-8 text-gray-500" />
            </div>
          )}
        </div>

        {/* Connection Quality Indicator */}
        {callStatus === 'connected' && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-1 h-3 bg-green-500 rounded"></div>
              <div className="w-1 h-4 bg-green-500 rounded"></div>
              <div className="w-1 h-5 bg-green-500 rounded"></div>
            </div>
            <span className="text-xs text-white font-medium">
              {t?.goodConnection || 'Good'}
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-3">
          {/* Microphone */}
          <button
            onClick={handleToggleAudio}
            className={`p-4 rounded-full transition-colors ${
              isAudioOn
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            title={isAudioOn ? t?.muteMic : t?.unmuteMic}
          >
            {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </button>

          {/* Video */}
          <button
            onClick={handleToggleVideo}
            className={`p-4 rounded-full transition-colors ${
              isVideoOn
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            title={isVideoOn ? t?.stopVideo : t?.startVideo}
          >
            {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </button>

          {/* End Call */}
          <button
            onClick={handleEndCall}
            className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
            title={t?.endCall || 'End Call'}
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          {/* Speaker */}
          <button
            onClick={handleToggleSpeaker}
            className={`p-4 rounded-full transition-colors ${
              isSpeakerOn
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-600 hover:bg-gray-500 text-white'
            }`}
            title={isSpeakerOn ? t?.muteSpeaker : t?.unmuteSpeaker}
          >
            {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>

          {/* Chat */}
          <button
            onClick={() => setShowChat(!showChat)}
            className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
            title={t?.chat || 'Chat'}
          >
            <MessageSquare className="w-6 h-6" />
          </button>

          {/* Screen Share */}
          <button
            className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
            title={t?.shareScreen || 'Share Screen'}
          >
            <Monitor className="w-6 h-6" />
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
            title={t?.settings || 'Settings'}
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute bottom-24 right-4 bg-gray-800 text-white rounded-lg shadow-xl p-4 w-64 border border-gray-700">
          <h4 className="font-semibold mb-3">{t?.callSettings || 'Call Settings'}</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">{t?.switchCamera || 'Switch Camera'}</span>
              <button
                onClick={handleSwitchCamera}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
              >
                {t?.switch || 'Switch'}
              </button>
            </div>
            <div className="text-xs text-gray-400">
              <p>{t?.consultationId || 'Consultation ID'}: {consultationId || 'N/A'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;