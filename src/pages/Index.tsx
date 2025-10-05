import { useState } from 'react';
import Header from '@/components/Header';
import FileDropzone from '@/components/FileDropzone';
import AIChatBot from '@/components/AIChatBot';
import TranscriptionResults from '@/components/TranscriptionResults';
import { HighlightContext } from '@/components/FileDropzone';

interface Session {
  id: number;
  file: File;
  highlightedTimestamp?: string;
}

const Index = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  const handleFileUpload = (uploadedFile: File | null) => {
    if (uploadedFile) {
      const newSession: Session = {
        id: Date.now(),
        file: uploadedFile,
      };
      setSessions(prev => [...prev, newSession]);
      setActiveSessionId(newSession.id);
    }
  };

  const setHighlightedTimestamp = (timestamp: string | undefined) => {
    if (activeSessionId) {
      setSessions(prev => prev.map(s => 
        s.id === activeSessionId ? { ...s, highlightedTimestamp: timestamp } : s
      ));
    }
  };

  return (
    <HighlightContext.Provider value={{ highlightedTimestamp: activeSession?.highlightedTimestamp, setHighlightedTimestamp }}>
      <div className="h-screen flex flex-col overflow-hidden" style={{ background: 'var(--gradient-subtle)' }}>
        <Header 
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSessionChange={setActiveSessionId}
          onFileUpload={handleFileUpload}
        />
        <main className="container mx-auto px-6 flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col py-6 overflow-hidden">
            {sessions.length === 0 ? (
              <>
                {/* Title Section */}
                <div className="text-center mb-6 flex-shrink-0">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    AI Audio Transcription
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Transform your audio recordings into accurate text transcriptions with the power of AI
                  </p>
                </div>
                <div className="w-full max-w-2xl mx-auto">
                  <FileDropzone onFileUpload={handleFileUpload} />
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 flex-1 min-h-0 overflow-hidden">
                {/* Left Column: Transcription Results */}
                <div className="flex flex-col h-full min-h-0 w-full overflow-hidden">
                  <div className="flex-1 min-h-0 overflow-y-auto">
                    <TranscriptionResults highlightedTimestamp={activeSession?.highlightedTimestamp} showUpload={false} />
                  </div>
                </div>

                {/* Right Column: Chat Sidebar */}
                <div className="h-full min-h-0 overflow-hidden">
                  <AIChatBot isSidebar={true} />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </HighlightContext.Provider>
  );
};

export default Index;
