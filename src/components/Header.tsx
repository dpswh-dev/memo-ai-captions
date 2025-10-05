import { Button } from '@/components/ui/button';
import { FileUp, FileX } from 'lucide-react';

interface HeaderProps {
  showUpload?: boolean;
  onToggleUpload?: () => void;
  hasFile?: boolean;
}

const Header = ({ showUpload = true, onToggleUpload, hasFile = false }: HeaderProps) => {
  return (
    <header className="w-full py-8 px-6 border-b border-border bg-card">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Memo.ai
        </h1>
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
