import { Button } from '@/components/ui/button';
import { FileUp, FileX } from 'lucide-react';

interface Session {
  id: number;
  file: File;
}

interface HeaderProps {
  sessions?: Session[];
  activeSessionId?: number | null;
  onSessionChange?: (id: number) => void;
  showUpload?: boolean;
  onToggleUpload?: () => void;
  hasFile?: boolean;
}

const Header = ({ sessions = [], activeSessionId, onSessionChange, showUpload = true, onToggleUpload, hasFile = false }: HeaderProps) => {
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
          </div>
        )}

        {hasFile && onToggleUpload && (
          <Button 
            onClick={onToggleUpload} 
            variant="outline"
            className="gap-2"
          >
            {showUpload ? (
              <>
                <FileX className="h-4 w-4" />
                Hide Upload
              </>
            ) : (
              <>
                <FileUp className="h-4 w-4" />
                Show Upload
              </>
            )}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
