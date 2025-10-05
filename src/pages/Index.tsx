import { useState } from 'react';
import Header from '@/components/Header';
import FileDropzone from '@/components/FileDropzone';
import AIChatBot from '@/components/AIChatBot';
import TranscriptionResults from '@/components/TranscriptionResults';
import { HighlightContext } from '@/components/FileDropzone';


const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [highlightedTimestamp, setHighlightedTimestamp] = useState<string | undefined>();

  const handleFileUpload = (uploadedFile: File | null) => {
    console.log('File uploaded:', uploadedFile);
    setFile(uploadedFile);
  };


  console.log('Current file state:', file);

  return (
    <HighlightContext.Provider value={{ highlightedTimestamp, setHighlightedTimestamp }}>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--gradient-subtle)' }}>
        <Header />
        <main className="container mx-auto px-6 flex-1 flex flex-col">
          <div className="flex-1 flex flex-col py-8 overflow-hidden">
            {!file ? (
              <>
                {/* Title Section */}
                <div className="text-center mb-8 flex-shrink-0">
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                    AI Audio Transcription
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Transform your audio recordings into accurate text transcriptions with the power of AI
                  </p>
                </div>
                <div className="w-full max-w-2xl mx-auto">
                  <FileDropzone onFileUpload={handleFileUpload} />
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 h-full min-h-0">
                {/* Left Column: Upload + Transcription Results */}
                <div className="flex flex-col h-full min-h-0 space-y-6 max-w-4xl mx-auto w-full">
                  <div className="flex-shrink-0">
                    <FileDropzone onFileUpload={handleFileUpload} uploadedFile={file} />
                  </div>
                  <div className="flex-1 min-h-0 overflow-y-auto">
                    <TranscriptionResults highlightedTimestamp={highlightedTimestamp} />
                  </div>
                </div>

                {/* Right Column: Chat Sidebar */}
                <div className="sticky top-8 h-[calc(100vh-8rem)]">
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
