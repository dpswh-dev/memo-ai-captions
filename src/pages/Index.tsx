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
      <div className="h-screen flex flex-col overflow-hidden" style={{ background: 'var(--gradient-subtle)' }}>
        <Header />
        <main className="container mx-auto px-6 flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col py-6 overflow-hidden">
            {!file ? (
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
              <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-hidden">
                {/* Top Row: Upload File + Chatbot */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-shrink-0">
                  <FileDropzone onFileUpload={handleFileUpload} uploadedFile={file} />
                  <AIChatBot isSidebar={true} />
                </div>

                {/* Bottom Row: Meeting Summary + Key Points (Full Width) */}
                <div className="flex-1 min-h-0 overflow-hidden">
                  <TranscriptionResults highlightedTimestamp={highlightedTimestamp} />
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
