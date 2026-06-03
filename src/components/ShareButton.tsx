import { useState } from 'react';
import type { FC } from 'react';

interface Props {
  onCopy: () => Promise<void>;
}

export const ShareButton: FC<Props> = ({ onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await onCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: nothing
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
        ${copied
          ? 'bg-green-600 text-white'
          : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
        }
      `}
    >
      {copied ? (
        <>✓ コピーしました</>
      ) : (
        <>🔗 シェアURL生成</>
      )}
    </button>
  );
};
