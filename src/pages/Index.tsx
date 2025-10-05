import { useState } from 'react';
import Header from '@/components/Header';
import FileDropzone from '@/components/FileDropzone';
import AIChatBot from '@/components/AIChatBot';
import TranscriptionResults from '@/components/TranscriptionResults';
import { HighlightContext } from '@/components/FileDropzone';


const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [highlightedTimestamp, setHighlightedTimestamp] = useState<string | undefined>();

  return (
    <HighlightContext.Provider value={{ highlightedTimestamp, setHighlightedTimestamp }}>
      <div className="min-h-screen" style={{ background: 'var(--gradient-subtle)' }}>
        <Header />
        <main className="container mx-auto px-6 py-16">
          {!file ? (
            <>
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                  AI Audio Transcription
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Transform your audio recordings into accurate text transcriptions with the power of AI
                </p>
              </div>
              <FileDropzone onFileUpload={setFile} />
            </>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
              {/* Left Column: Header + Transcription Results */}
              <div className="space-y-8">
                <div className="text-center">
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                    AI Audio Transcription
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Transform your audio recordings into accurate text transcriptions with the power of AI
                  </p>
                </div>
                <TranscriptionResults highlightedTimestamp={highlightedTimestamp} />
              </div>

              {/* Right Column: Sticky Chat Sidebar */}
              <div className="lg:sticky lg:top-6">
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
