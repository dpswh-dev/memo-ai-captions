import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Session {
  id: number;
  file: File;
}

interface HeaderProps {
  sessions?: Session[];
  activeSessionId?: number | null;
  onSessionChange?: (id: number) => void;
  onFileUpload?: (file: File) => void;
  onDeleteSession?: (id: number) => void;
  onDeleteAll?: () => void;
}

const Header = ({ sessions = [], activeSessionId, onSessionChange, onFileUpload, onDeleteSession, onDeleteAll }: HeaderProps) => {
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.type === 'audio/mpeg' || selectedFile.name.endsWith('.mp3')) {
        onFileUpload?.(selectedFile);
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
    // Reset input value to allow uploading the same file again
    e.target.value = '';
  };
  const truncateFilename = (filename: string, maxLength: number = 150) => {
    if (filename.length <= maxLength) return filename;
    const ext = filename.split('.').pop();
    const nameWithoutExt = filename.slice(0, filename.lastIndexOf('.'));
    const truncated = nameWithoutExt.slice(0, maxLength - ext!.length - 4);
    return `${truncated}...${ext}`;
  };

  return (
    <header className="w-full py-8 px-6 border-b border-border bg-card">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT: Logo */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Memo.ai
            </h1>
          </div>

          {/* MIDDLE: Session Buttons */}
          {sessions.length > 0 && (
            <div className="flex gap-2 items-center justify-center">
            {sessions.map((session, index) => {
              const isActive = session.id === activeSessionId;
              return (
                <button
                  key={session.id}
                  onClick={() => onSessionChange?.(session.id)}
                  className={`
                    flex items-center justify-center gap-1
                    border-2 font-semibold
                    hover:shadow-md
                    ${isActive 
                      ? 'rounded-full px-4 h-10 min-w-[2.5rem] bg-primary text-primary-foreground border-primary shadow-lg' 
                      : 'rounded-full w-10 h-10 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 text-primary hover:border-primary/50'
                    }
                  `}
                  style={{ boxShadow: isActive ? 'var(--shadow-elegant)' : 'none' }}
                >
                  {isActive ? (
                    <>
                      <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        {truncateFilename(session.file.name)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession?.(session.id);
                        }}
                        className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
              );
            })}
            
            {/* Add New File Button */}
            <button
              onClick={() => document.getElementById('header-file-upload')?.click()}
              className="
                flex items-center justify-center
                rounded-full px-4 h-10 whitespace-nowrap
                border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10
                text-primary font-semibold text-sm
                cursor-pointer
                hover:border-primary/60
              "
            >
              Upload more
            </button>
            <input
              id="header-file-upload"
              type="file"
              accept=".mp3,audio/mpeg"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
          )}

          {/* RIGHT: Delete All Button or Spacer */}
          <div className="flex-1 flex justify-end">
            {sessions.length > 0 ? (
              <Button
                onClick={onDeleteAll}
                variant="ghost"
                className="gap-2 text-destructive hover:bg-transparent hover:text-destructive/80 border-2 border-destructive/30 rounded-full hover:border-destructive/50"
              >
                Delete all
              </Button>
            ) : (
              <div /> 
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
