import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const FileDropzone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const droppedFile = files[0];
      if (droppedFile.type === 'audio/mpeg' || droppedFile.name.endsWith('.mp3')) {
        setFile(droppedFile);
        toast({
          title: 'File uploaded',
          description: `${droppedFile.name} is ready for transcription`,
        });
      } else {
        toast({
          title: 'Invalid file type',
          description: 'Please upload an MP3 file',
          variant: 'destructive',
        });
      }
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.type === 'audio/mpeg' || selectedFile.name.endsWith('.mp3')) {
        setFile(selectedFile);
        toast({
          title: 'File uploaded',
          description: `${selectedFile.name} is ready for transcription`,
        });
      } else {
        toast({
          title: 'Invalid file type',
          description: 'Please upload an MP3 file',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center
          transition-all duration-300 ease-in-out
          ${isDragging 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : file
            ? 'border-primary bg-primary/5'
            : 'border-border bg-card hover:border-primary/50'
          }
        `}
        style={{ boxShadow: 'var(--shadow-soft)' }}
      >
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className={`
              p-6 rounded-full transition-all duration-300
              ${isDragging ? 'bg-primary/20 scale-110' : 'bg-muted'}
            `}>
              <Upload className={`w-12 h-12 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="file-upload">
              <Button
                size="lg"
                className="w-full max-w-xs h-14 text-lg font-semibold relative overflow-hidden group"
                style={{ 
                  background: 'var(--gradient-primary)',
                  boxShadow: 'var(--shadow-elegant)'
                }}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <span className="relative z-10">Upload MP3 file</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".mp3,audio/mpeg"
              onChange={handleFileInput}
              className="hidden"
            />
            
            <p className="text-sm text-muted-foreground pt-2">
              or drop MP3 here
            </p>
          </div>

          {file && (
            <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm font-medium text-foreground">
                Selected file: <span className="text-primary font-semibold">{file.name}</span>
              </p>
              <p className="text-xs text-primary/70 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileDropzone;
