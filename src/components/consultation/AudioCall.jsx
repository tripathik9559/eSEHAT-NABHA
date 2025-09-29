import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useNotifications } from '../../hooks/useNotifications';
import {
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageSquare,
  UserPlus,
  Settings,
  Pause,
  Play,
  MoreVertical
} from 'lucide-react';

const AudioCall = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { showNotification } = useNotifications();

  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isOnHold, setIsOnHold] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [showChat, setShowChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [audioLevel, setAudioLevel] = useState(0);

  // Mock doctor info
  const doctorInfo = {
    name: 'Dr. Sarah Smith',
    specialization: 'General Physician',
    phone: '+1 (555) 123-4567'
  };

  useEffect(() => {
    // Simulate connection process
    const connectionTimer = setTimeout(() => {
      setConnectionStatus('connected');
      showNotification(t('audioCallConnected'), 'success');
    }, 3000);

    // Call duration timer
    const durationTimer = setInterval(() => {
      if (connectionStatus === 'connected' && !isOnHold) {
        setCallDuration(prev => prev + 1);
      }
    }, 1000);

    // Simulate audio level animation
    const audioTimer = setInterval(() => {
      if (connectionStatus === 'connected' && !isMuted) {
        setAudioLevel(Math.random() * 100);
      } else {
        setAudioLevel(0);
      }
    }, 100);

    return () => {
      clearTimeout(connectionTimer);
      clearInterval(durationTimer);
      clearInterval(audioTimer);
    };
  }, [connectionStatus, isMuted, isOnHold, t, showNotification]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    showNotification(t('callEnded'), 'info');
    navigate('/consultation-history');
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    showNotification(
      isMuted ? t('micUnmuted') : t('micMuted'),
      'info'
    );
  };

  const handleToggleHold = () => {
    setIsOnHold(!isOnHold);
    showNotification(
      isOnHold ? t('callResumed') : t('callOnHold'),
      'info'
    );
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: 'You',
        message: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDoctor: false
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');

      // Simulate doctor response
      setTimeout(() => {
        const doctorResponse = {
          id: chatMessages.length + 2,
          sender: 'Dr. Smith',
          message: 'I can see your message. Let me respond to that during our call.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDoctor: true
        };
        setChatMessages(prev => [...prev, doctorResponse]);
      }, 2000);
    }
  };

  const getStatusColor = () => {
    if (connectionStatus === 'connecting') return 'text-yellow-400';
    if (isOnHold) return 'text-orange-400';
    return 'text-green-400';
  };

  const getStatusText = () => {
    if (connectionStatus === 'connecting') return t('connecting');
    if (isOnHold) return t('onHold');
    return t('connected');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Connection Status Overlay */}
      {connectionStatus === 'connecting' && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <PhoneCall className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400" />
            </div>
            <p className="text-2xl font-medium mb-2">{t('connectingCall')}</p>
            <p className="text-gray-300">{t('pleaseWait')}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="mb-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()} bg-black bg-opacity-30`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor().replace('text-', 'bg-')} animate-pulse`}></div>
              {getStatusText()}
            </span>
          </div>
          {connectionStatus === 'connected' && (
            <p className="text-lg font-medium text-gray-300">
              {formatTime(callDuration)}
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Doctor Avatar */}
          <div className="relative mb-8">
            <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-6xl font-bold text-white">
                {doctorInfo.name.charAt(3)}
              </span>
            </div>
            
            {/* Audio Visualization */}
            {connectionStatus === 'connected' && !isOnHold && (
              <div className="absolute inset-0 rounded-full border-4 border-white border-opacity-30">
                <div 
                  className="absolute inset-0 rounded-full border-4 border-blue-400 transition-all duration-150"
                  style={{
                    transform: `scale(${1 + (audioLevel / 500)})`,
                    opacity: 0.6 + (audioLevel / 200)
                  }}
                ></div>
              </div>
            )}

            {/* Hold Indicator */}
            {isOnHold && (
              <div className="absolute inset-0 bg-orange-500 bg-opacity-80 rounded-full flex items-center justify-center">
                <Pause className="w-12 h-12 text-white" />
              </div>
            )}
          </div>

          {/* Doctor Info */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{doctorInfo.name}</h1>
            <p className="text-xl text-blue-200 mb-4">{doctorInfo.specialization}</p>
            {isOnHold && (
              <p className="text-orange-300 font-medium">{t('callOnHold')}</p>
            )}
          </div>

          {/* Audio Controls */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* Mute Toggle */}
            <div className="text-center">
              <button
                onClick={handleToggleMute}
                className={`w-16 h-16 rounded-full transition-all duration-200 ${
                  !isMuted
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-red-600 hover:bg-red-700'
                } shadow-lg`}
                title={isMuted ? t('unmute') : t('mute')}
              >
                {!isMuted ? <Mic className="w-8 h-8 mx-auto" /> : <MicOff className="w-8 h-8 mx-auto" />}
              </button>
              <p className="text-sm mt-2 text-gray-300">
                {isMuted ? t('muted') : t('microphone')}
              </p>
            </div>

            {/* Speaker Toggle */}
            <div className="text-center">
              <button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`w-16 h-16 rounded-full transition-all duration-200 ${
                  isSpeakerOn
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-yellow-600 hover:bg-yellow-700'
                } shadow-lg`}
                title={isSpeakerOn ? t('muteSpeaker') : t('unmuteSpeaker')}
              >
                {isSpeakerOn ? <Volume2 className="w-8 h-8 mx-auto" /> : <VolumeX className="w-8 h-8 mx-auto" />}
              </button>
              <p className="text-sm mt-2 text-gray-300">
                {isSpeakerOn ? t('speaker') : t('muted')}
              </p>
            </div>

            {/* Hold Toggle */}
            <div className="text-center">
              <button
                onClick={handleToggleHold}
                className={`w-16 h-16 rounded-full transition-all duration-200 ${
                  !isOnHold
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-orange-600 hover:bg-orange-700'
                } shadow-lg`}
                title={isOnHold ? t('resumeCall') : t('holdCall')}
              >
                {isOnHold ? <Play className="w-8 h-8 mx-auto" /> : <Pause className="w-8 h-8 mx-auto" />}
              </button>
              <p className="text-sm mt-2 text-gray-300">
                {isOnHold ? t('resume') : t('hold')}
              </p>
            </div>

            {/* Chat Toggle */}
            <div className="text-center">
              <button
                onClick={() => setShowChat(!showChat)}
                className={`w-16 h-16 rounded-full transition-all duration-200 ${
                  showChat
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-700 hover:bg-gray-600'
                } shadow-lg`}
                title={t('toggleChat')}
              >
                <MessageSquare className="w-8 h-8 mx-auto" />
              </button>
              <p className="text-sm mt-2 text-gray-300">
                {t('chat')}
              </p>
            </div>
          </div>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full transition-all duration-200 shadow-2xl transform hover:scale-105"
            title={t('endCall')}
          >
            <PhoneOff className="w-10 h-10 mx-auto" />
          </button>
        </div>

        {/* Additional Controls */}
        <div className="p-6">
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 mr-2" />
              {t('settings')}
            </button>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="fixed right-0 top-0 h-full w-80 bg-gray-800 border-l border-gray-700 flex flex-col z-30">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{t('chat')}</h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-1">{t('chatDuringCall')}</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t('noChatMessages')}</p>
                <p className="text-sm">{t('startChatting')}</p>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isDoctor ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      msg.isDoctor
                        ? 'bg-gray-700 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-75 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t('typeMessage')}
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors"
              >
                {t('send')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-xl p-6 w-80 shadow-2xl z-30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">{t('audioSettings')}</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-white"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('microphone')}</label>
              <select className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>{t('defaultMicrophone')}</option>
                <option>{t('bluetoothHeadset')}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">{t('speaker')}</label>
              <select className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>{t('defaultSpeaker')}</option>
                <option>{t('bluetoothHeadset')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('audioQuality')}</label>
              <select className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>{t('auto')}</option>
                <option>{t('high')}</option>
                <option>{t('medium')}</option>
                <option>{t('low')}</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Controls */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 p-4">
        <div className="flex items-center justify-around">
          <button
            onClick={handleToggleMute}
            className={`p-3 rounded-full ${
              !isMuted ? 'bg-gray-700' : 'bg-red-600'
            }`}
          >
            {!isMuted ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          
          <button
            onClick={handleToggleHold}
            className={`p-3 rounded-full ${
              !isOnHold ? 'bg-gray-700' : 'bg-orange-600'
            }`}
          >
            {isOnHold ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
          
          <button
            onClick={handleEndCall}
            className="p-4 bg-red-600 rounded-full"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`p-3 rounded-full ${
              isSpeakerOn ? 'bg-gray-700' : 'bg-yellow-600'
            }`}
          >
            {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          
          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-3 rounded-full ${
              showChat ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioCall;