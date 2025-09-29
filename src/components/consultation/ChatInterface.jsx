import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useNotifications } from '../../hooks/useNotifications';
import {
  Send,
  Paperclip,
  Image,
  Mic,
  MicOff,
  Phone,
  Video,
  MoreVertical,
  ChevronLeft,
  Smile,
  MapPin,
  Calendar,
  FileText,
  Camera,
  Clock,
  CheckCheck,
  User
} from 'lucide-react';

const ChatInterface = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { showNotification } = useNotifications();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Dr. Sarah Smith',
      message: 'Hello! I\'m Dr. Smith. How can I help you today?',
      time: '10:00 AM',
      isDoctor: true,
      type: 'text',
      status: 'read'
    },
    {
      id: 2,
      sender: 'Dr. Sarah Smith',
      message: 'Please feel free to describe your symptoms or concerns.',
      time: '10:01 AM',
      isDoctor: true,
      type: 'text',
      status: 'read'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Mock doctor info
  const doctorInfo = {
    name: 'Dr. Sarah Smith',
    specialization: 'General Physician',
    status: 'online',
    lastSeen: 'now'
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDoctor: false,
        type: 'text',
        status: 'sent'
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Show doctor typing
      setIsTyping(true);

      // Simulate doctor response
      setTimeout(() => {
        setIsTyping(false);
        const doctorResponses = [
          'Thank you for sharing that information. Can you tell me more about when this started?',
          'I understand. How long have you been experiencing these symptoms?',
          'That sounds concerning. Have you tried any treatments so far?',
          'Based on what you\'ve described, I\'d recommend a few things. Let me explain...',
          'I see. Are there any other symptoms you\'ve noticed?'
        ];

        const doctorResponse = {
          id: messages.length + 2,
          sender: 'Dr. Sarah Smith',
          message: doctorResponses[Math.floor(Math.random() * doctorResponses.length)],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDoctor: true,
          type: 'text',
          status: 'read'
        };

        setMessages(prev => [...prev, doctorResponse]);

        // Update message status to delivered then read
        setTimeout(() => {
          setMessages(prev => prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
          ));
        }, 1000);

        setTimeout(() => {
          setMessages(prev => prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
          ));
        }, 2000);
      }, 2000 + Math.random() * 3000);
    }
  };

  const handleFileUpload = (type) => {
    setShowAttachmentMenu(false);
    
    const fileMessage = {
      id: messages.length + 1,
      sender: 'You',
      message: type === 'image' ? 'Photo sent' : type === 'document' ? 'Document sent' : 'File sent',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDoctor: false,
      type: type,
      status: 'sent',
      fileName: type === 'image' ? 'symptoms_photo.jpg' : type === 'document' ? 'medical_report.pdf' : 'file.txt'
    };

    setMessages(prev => [...prev, fileMessage]);
    showNotification(t('fileSent'), 'success');

    // Doctor response to file
    setTimeout(() => {
      const doctorResponse = {
        id: messages.length + 2,
        sender: 'Dr. Sarah Smith',
        message: type === 'image' ? 'Thank you for the photo. I can see the area you\'re concerned about.' : 'I\'ve received your document. Let me review it.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDoctor: true,
        type: 'text',
        status: 'read'
      };
      setMessages(prev => [...prev, doctorResponse]);
    }, 3000);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      showNotification(t('recordingStarted'), 'info');
      
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        const voiceMessage = {
          id: messages.length + 1,
          sender: 'You',
          message: 'Voice message',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDoctor: false,
          type: 'voice',
          status: 'sent',
          duration: '0:03'
        };
        setMessages(prev => [...prev, voiceMessage]);
        showNotification(t('voiceMessageSent'), 'success');
      }, 3000);
    } else {
      showNotification(t('recordingStopped'), 'info');
    }
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-600" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const renderMessage = (msg) => {
    const isOwnMessage = !msg.isDoctor;
    
    return (
      <div key={msg.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
          isOwnMessage
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}>
          {msg.type === 'text' && (
            <p className="text-sm">{msg.message}</p>
          )}
          
          {msg.type === 'image' && (
            <div>
              <div className="w-48 h-32 bg-gray-300 rounded-lg mb-2 flex items-center justify-center">
                <Image className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-xs">{msg.fileName}</p>
            </div>
          )}
          
          {msg.type === 'document' && (
            <div className="flex items-center space-x-2">
              <FileText className="w-6 h-6" />
              <div>
                <p className="text-sm font-medium">{msg.fileName}</p>
                <p className="text-xs opacity-75">PDF • 2.1 MB</p>
              </div>
            </div>
          )}
          
          {msg.type === 'voice' && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <div className="flex space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-1 bg-white bg-opacity-60 rounded-full animate-pulse" style={{height: `${Math.random() * 16 + 8}px`}}></div>
                  ))}
                </div>
                <p className="text-xs opacity-75 mt-1">{msg.duration}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-1">
            <span className={`text-xs ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}>
              {msg.time}
            </span>
            {isOwnMessage && getMessageStatusIcon(msg.status)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/doctors')}
              className="text-gray-600 hover:text-gray-800 transition-colors md:hidden"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {doctorInfo.name.charAt(3)}
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{doctorInfo.name}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                <span>{isOnline ? t('online') : t('lastSeenRecently')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/audio-call')}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title={t('audioCall')}
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/video-call')}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title={t('videoCall')}
            >
              <Video className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title={t('moreOptions')}
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Date Header */}
        <div className="text-center mb-4">
          <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
            {t('today')}
          </span>
        </div>

        {/* Messages List */}
        {messages.map(renderMessage)}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-end space-x-2">
          {/* Attachment Button */}
          <div className="relative">
            <button
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            {/* Attachment Menu */}
            {showAttachmentMenu && (
              <div className="absolute bottom-12 left-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-48">
                <button
                  onClick={() => handleFileUpload('image')}
                  className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Image className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">{t('photo')}</span>
                </button>
                <button
                  onClick={() => handleFileUpload('document')}
                  className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="text-sm">{t('document')}</span>
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Camera className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">{t('camera')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={t('typeMessage')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="1"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>

          {/* Voice/Send Button */}
          {message.trim() ? (
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleVoiceRecord}
              className={`p-2 rounded-lg transition-colors ${
                isRecording 
                  ? 'bg-red-600 text-white animate-pulse' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          )}
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="flex items-center justify-center mt-2 text-red-600">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm font-medium">{t('recording')}</span>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*,application/pdf,.doc,.docx"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            const file = e.target.files[0];
            const isImage = file.type.startsWith('image/');
            handleFileUpload(isImage ? 'image' : 'document');
          }
        }}
      />

      {/* Quick Actions Bar (Mobile) */}
      <div className="md:hidden bg-gray-100 px-4 py-2">
        <div className="flex items-center justify-around">
          <button
            onClick={() => navigate('/consultation-booking')}
            className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Calendar className="w-5 h-5 mb-1" />
            <span className="text-xs">{t('book')}</span>
          </button>
          <button
            onClick={() => handleFileUpload('image')}
            className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Camera className="w-5 h-5 mb-1" />
            <span className="text-xs">{t('photo')}</span>
          </button>
          <button
            onClick={() => navigate('/health-records')}
            className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FileText className="w-5 h-5 mb-1" />
            <span className="text-xs">{t('records')}</span>
          </button>
          <button
            onClick={() => navigate('/symptom-checker')}
            className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">{t('symptoms')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;