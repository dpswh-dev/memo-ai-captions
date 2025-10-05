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
          {!file ? (
            <div className="flex-1 flex flex-col justify-center py-16">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                  AI Audio Transcription
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Transform your audio recordings into accurate text transcriptions with the power of AI
                </p>
              </div>
              <FileDropzone onFileUpload={handleFileUpload} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start py-8 h-[calc(100vh-5rem)]">
              {/* Left Column: Header + Transcription Results */}
              <div className="flex flex-col h-full overflow-hidden">
                <div className="text-center mb-6 flex-shrink-0">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    AI Audio Transcription
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Transform your audio recordings into accurate text transcriptions with the power of AI
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <TranscriptionResults highlightedTimestamp={highlightedTimestamp} />
                </div>
              </div>

              {/* Right Column: Sticky Chat Sidebar */}
              <div className="h-full">
                <AIChatBot isSidebar={true} />
              </div>
            </div>
          )}
        </main>
      </div>
    </HighlightContext.Provider>
  );
};

export default Index;
