import { useState, useContext } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HighlightContext } from './FileDropzone';

interface AIChatBotProps {
  isSidebar?: boolean;
}

const AIChatBot = ({ isSidebar = false }: AIChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can help you with questions about your meeting summary. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const { setHighlightedTimestamp } = useContext(HighlightContext);

  // Mock responses with timestamp references
  const getMockResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('ai') || lowerInput.includes('transcription') || lowerInput.includes('accuracy')) {
      return {
        content: 'The AI transcription feature achieved a 95% accuracy rate. You can read more about this at timestamp 05:42.',
        timestamp: '05:42'
      };
    }
    if (lowerInput.includes('budget') || lowerInput.includes('hiring') || lowerInput.includes('engineer')) {
      return {
        content: 'The budget for hiring two senior engineers and one product designer was approved. Check timestamp 12:30 for details.',
        timestamp: '12:30'
      };
    }
    if (lowerInput.includes('marketing') || lowerInput.includes('campaign') || lowerInput.includes('launch')) {
      return {
        content: 'The marketing campaign is scheduled to launch on November 15th. See timestamp 18:05 for the full strategy.',
        timestamp: '18:05'
      };
    }
    if (lowerInput.includes('mobile') || lowerInput.includes('app') || lowerInput.includes('beta')) {
      return {
        content: 'The mobile app beta launch is planned for end of Q4. More details at timestamp 28:50.',
        timestamp: '28:50'
      };
    }
    if (lowerInput.includes('roadmap') || lowerInput.includes('product') || lowerInput.includes('q4')) {
      return {
        content: 'The Q4 product roadmap focuses on AI-powered features and mobile app development. See timestamp 02:15.',
        timestamp: '02:15'
      };
    }
    return {
      content: 'I can help you find information in the meeting. Try asking about the AI features, budget, marketing campaign, or product roadmap!',
      timestamp: undefined
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', content: input }]);
    const userQuestion = input;
    setInput('');
    
    // Mock response with timestamp highlighting
    setTimeout(() => {
      const response = getMockResponse(userQuestion);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.content
      }]);
      
      // Highlight the referenced timestamp
      if (response.timestamp) {
        setHighlightedTimestamp(response.timestamp);
        // Clear highlight after 10 seconds
        setTimeout(() => setHighlightedTimestamp(undefined), 10000);
      }
    }, 500);
  };

  // Sidebar mode: always visible
  if (isSidebar) {
    return (
      <Card className="h-full flex flex-col border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden" style={{ boxShadow: 'var(--shadow-soft)' }}>
        {/* Header */}
        <div className="p-4 border-b border-primary/20 bg-primary/5">
          <h3 className="font-semibold text-lg text-primary">Meeting Assistant</h3>
          <p className="text-sm text-muted-foreground">Ask questions about your meeting</p>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input - Sticky at bottom */}
        <div className="p-4 border-t border-primary/20 bg-background rounded-b-xl">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Popup mode: floating button + slide-in panel
  return (
    <>
      {/* Floating Button - only show when closed */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Panel */}
      <div
        className={`fixed bottom-0 right-0 h-[600px] w-full md:w-[400px] bg-background border-l border-t shadow-2xl transition-transform duration-300 ease-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Card className="h-full flex flex-col border-0 rounded-none">
          {/* Header */}
          <div className="p-4 border-b border-primary/20 bg-primary/5 flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg text-primary">Meeting Assistant</h3>
              <p className="text-sm text-muted-foreground">Ask questions about your meeting</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-primary/20">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AIChatBot;
