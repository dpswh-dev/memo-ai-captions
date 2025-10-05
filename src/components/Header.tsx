import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
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
}

const Header = ({ sessions = [], activeSessionId, onSessionChange, onFileUpload }: HeaderProps) => {
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
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Memo.ai
        </h1>

        {/* Session Buttons */}
        {sessions.length > 0 && (
          <div className="flex gap-2 items-center">
            {sessions.map((session, index) => {
              const isActive = session.id === activeSessionId;
              return (
                <button
                  key={session.id}
                  onClick={() => onSessionChange?.(session.id)}
                  className={`
                    flex items-center justify-center
                    border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10
                    font-semibold text-primary
                    transition-all duration-300 ease-in-out
                    hover:border-primary/50 hover:shadow-md
                    ${isActive 
                      ? 'rounded-full px-4 h-10 min-w-[2.5rem]' 
                      : 'rounded-full w-10 h-10'
                    }
                  `}
                  style={{ boxShadow: isActive ? 'var(--shadow-soft)' : 'none' }}
                >
                  {isActive ? (
                    <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      {truncateFilename(session.file.name)}
                    </span>
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
                rounded-full w-10 h-10
                border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10
                text-primary
                transition-all duration-300 ease-in-out
                hover:border-primary/50 hover:shadow-md hover:scale-105
              "
            >
              <Plus className="h-5 w-5" />
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
      </div>
    </header>
  );
};

export default Header;
