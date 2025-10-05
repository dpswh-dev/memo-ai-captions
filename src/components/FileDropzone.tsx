import { useState, useCallback, createContext } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export const HighlightContext = createContext<{
  highlightedTimestamp: string | undefined;
  setHighlightedTimestamp: (timestamp: string | undefined) => void;
}>({
  highlightedTimestamp: undefined,
  setHighlightedTimestamp: () => {},
});

interface FileDropzoneProps {
  onFileUpload: (file: File | null) => void;
  uploadedFile?: File | null;
}

const FileDropzone = ({ onFileUpload, uploadedFile }: FileDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

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
        onFileUpload(droppedFile);
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
        onFileUpload(selectedFile);
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
    <div className="w-full mx-auto">
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative border-2 border-primary/30 rounded-2xl p-8 text-center
          transition-all duration-300 ease-in-out
          bg-gradient-to-br from-primary/5 to-primary/10
          ${isDragging ? 'scale-[1.02] border-primary' : 'hover:border-primary/50'}
        `}
        style={{ boxShadow: 'var(--shadow-soft)' }}
      >
          <div className="space-y-4">
            {uploadedFile ? (
              <div className="flex items-center justify-center gap-3">
                <Upload className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  <div className={`
                    p-4 rounded-full transition-all duration-300 bg-primary/20
                    ${isDragging ? 'scale-110' : ''}
                  `}>
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="file-upload">
                    <Button
                      size="lg"
                      className="w-full max-w-xs h-12 text-base font-semibold relative overflow-hidden group"
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
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

export default FileDropzone;
