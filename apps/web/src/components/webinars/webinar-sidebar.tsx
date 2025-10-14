'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  HelpCircle, 
  Users, 
  FileText, 
  Send,
  ThumbsUp,
  BarChart3
} from 'lucide-react';

interface WebinarSidebarProps {
  webinarId: string;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: Date;
  isHost: boolean;
}

interface Question {
  id: string;
  userId: string;
  userName: string;
  question: string;
  timestamp: Date;
  upvotes: number;
  isAnswered: boolean;
  answer?: string;
}

export function WebinarSidebar({ webinarId }: WebinarSidebarProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'qa' | 'participants' | 'notes'>('chat');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch sidebar data from API
    setTimeout(() => {
      setChatMessages([
        {
          id: '1',
          userId: '1',
          userName: 'Dr. Sarah Johnson',
          userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
          message: 'Welcome everyone! We\'ll start with integration by parts.',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          isHost: true,
        },
        {
          id: '2',
          userId: '2',
          userName: 'Alex Thompson',
          userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
          message: 'Thank you! Looking forward to this session.',
          timestamp: new Date(Date.now() - 4 * 60 * 1000),
          isHost: false,
        },
        {
          id: '3',
          userId: '3',
          userName: 'Maria Garcia',
          userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
          message: 'Can you share the slides?',
          timestamp: new Date(Date.now() - 2 * 60 * 1000),
          isHost: false,
        },
      ]);

      setQuestions([
        {
          id: '1',
          userId: '2',
          userName: 'Alex Thompson',
          question: 'When should we use integration by parts vs substitution?',
          timestamp: new Date(Date.now() - 3 * 60 * 1000),
          upvotes: 5,
          isAnswered: false,
        },
        {
          id: '2',
          userId: '4',
          userName: 'James Wilson',
          question: 'Can you explain the LIATE rule?',
          timestamp: new Date(Date.now() - 1 * 60 * 1000),
          upvotes: 3,
          isAnswered: false,
        },
      ]);

      setLoading(false);
    }, 500);
  }, [webinarId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      message: newMessage,
      timestamp: new Date(),
      isHost: false,
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const question: Question = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      question: newQuestion,
      timestamp: new Date(),
      upvotes: 0,
      isAnswered: false,
    };

    setQuestions(prev => [...prev, question]);
    setNewQuestion('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageSquare, count: chatMessages.length },
    { id: 'qa', label: 'Q&A', icon: HelpCircle, count: questions.length },
    { id: 'participants', label: 'People', icon: Users, count: 73 },
    { id: 'notes', label: 'Notes', icon: FileText },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex-1 flex items-center justify-center space-x-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
              {count !== undefined && (
                <span className="bg-gray-200 text-gray-700 text-xs px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' && (
          <div className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((message) => (
                <div key={message.id} className="flex space-x-2">
                  <img
                    src={message.userAvatar}
                    alt={message.userName}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-sm font-medium ${message.isHost ? 'text-blue-600' : 'text-gray-900'}`}>
                        {message.userName}
                      </span>
                      {message.isHost && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                          Host
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'qa' && (
          <div className="h-full flex flex-col">
            {/* Questions */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {questions.map((question) => (
                <div key={question.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {question.userName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTime(question.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{question.question}</p>
                    </div>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs">{question.upvotes}</span>
                    </button>
                  </div>
                  {question.isAnswered && question.answer && (
                    <div className="mt-2 p-2 bg-blue-50 rounded border-l-2 border-blue-500">
                      <p className="text-sm text-blue-900">{question.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Question Input */}
            <form onSubmit={handleAskQuestion} className="p-4 border-t">
              <div className="space-y-2">
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Ask a question..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                >
                  Ask Question
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'participants' && (
          <div className="p-4">
            <div className="text-center text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>Participants list will be shown here</p>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="p-4">
            <textarea
              placeholder="Take notes during the webinar..."
              className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <button className="mt-2 w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors">
              Save Notes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
