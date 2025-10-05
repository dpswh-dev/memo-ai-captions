import Header from '@/components/Header';
import FileDropzone from '@/components/FileDropzone';

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-subtle)' }}>
      <Header />
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            AI Audio Transcription
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your audio recordings into accurate text transcriptions with the power of AI
          </p>
        </div>
        
        <FileDropzone />
      </main>
    </div>
  );
};

export default Index;
