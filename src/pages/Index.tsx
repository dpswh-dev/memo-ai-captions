import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FileDropzone from '@/components/FileDropzone';
import AIChatBot from '@/components/AIChatBot';
import TranscriptionResults from '@/components/TranscriptionResults';
import { HighlightContext } from '@/components/FileDropzone';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";

interface Session {
  id: number;
  file: File;
  highlightedTimestamp?: string;
}

const Index = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null);
  const [showMaxAlert, setShowMaxAlert] = useState(false);
  const [progress, setProgress] = useState(100);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  const handleFileUpload = (uploadedFile: File | null) => {
    if (uploadedFile) {
      const newSession: Session = {
        id: Date.now(),
        file: uploadedFile,
      };
      setSessions(prev => {
        const updated = [...prev, newSession];
        // Show alert when reaching exactly 5 files
        if (updated.length === 5) {
          setShowMaxAlert(true);
          setProgress(100);
        }
        return updated;
      });
      setActiveSessionId(newSession.id);
    }
  };

  // Auto-close alert after 5 seconds with progress bar
  useEffect(() => {
    if (showMaxAlert) {
      const duration = 5000; // 5 seconds
      const interval = 50; // Update every 50ms
      const decrement = (interval / duration) * 100;
      
      const timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - decrement;
          if (newProgress <= 0) {
            clearInterval(timer);
            setShowMaxAlert(false);
            return 100;
          }
          return newProgress;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [showMaxAlert]);

  const setHighlightedTimestamp = (timestamp: string | undefined) => {
    if (activeSessionId) {
      setSessions(prev => prev.map(s => 
        s.id === activeSessionId ? { ...s, highlightedTimestamp: timestamp } : s
      ));
    }
  };

  const handleDeleteSession = (sessionId: number) => {
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== sessionId);
      // If we deleted the active session, set the first session as active
      if (sessionId === activeSessionId && filtered.length > 0) {
        setActiveSessionId(filtered[0].id);
      } else if (filtered.length === 0) {
        setActiveSessionId(null);
      }
      return filtered;
    });
  };

  const handleDeleteAll = () => {
    setSessions([]);
    setActiveSessionId(null);
  };

  return (
    <HighlightContext.Provider value={{ highlightedTimestamp: activeSession?.highlightedTimestamp, setHighlightedTimestamp }}>
      <div className="h-screen flex flex-col overflow-hidden" style={{ background: 'var(--gradient-subtle)' }}>
        <Header 
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSessionChange={setActiveSessionId}
          onFileUpload={handleFileUpload}
          onDeleteSession={handleDeleteSession}
          onDeleteAll={handleDeleteAll}
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

        {/* Max Files Alert Dialog */}
        <AlertDialog open={showMaxAlert} onOpenChange={setShowMaxAlert}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl text-center text-primary">
                Maximum Files Reached
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-base pt-2">
                You have reached the maximum limit of 5 file uploads. Please delete some files if you want to upload more.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="pt-4">
              <Progress value={progress} className="h-2" />
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </HighlightContext.Provider>
  );
};

export default Index;
