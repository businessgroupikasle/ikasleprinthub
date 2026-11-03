import React, { useEffect, useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { ARTWORK_ACCEPT, MAX_ARTWORK_MB, formatFileSize, validateArtworkFile } from '../utils/artwork';
import { MAX_EMAIL_ATTACHMENT_BYTES } from '../utils/emailService';
import { FieldError } from './FieldError';
import './ArtworkUpload.css';

interface ArtworkUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

export const ArtworkUpload: React.FC<ArtworkUploadProps> = ({ file, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const dragDepth = useRef(0); // dragenter/dragleave also fire for child elements
  const latestCheck = useRef(0); // ignore results of a check that was superseded

  // A file dropped *outside* the zone would make the browser navigate to it and lose the form.
  useEffect(() => {
    const blockStrayFileDrops = (e: DragEvent) => {
      if (e.dataTransfer?.types.includes('Files')) e.preventDefault();
    };
    window.addEventListener('dragover', blockStrayFileDrops);
    window.addEventListener('drop', blockStrayFileDrops);
    return () => {
      window.removeEventListener('dragover', blockStrayFileDrops);
      window.removeEventListener('drop', blockStrayFileDrops);
    };
  }, []);

  const openPicker = () => inputRef.current?.click();

  const accept = async (picked: File | undefined) => {
    if (!picked) return;
    const checkId = ++latestCheck.current;
    setError('');
    setIsChecking(true);
    const problem = await validateArtworkFile(picked);
    if (checkId !== latestCheck.current) return;
    setIsChecking(false);
    if (problem) {
      setError(problem); // a previously attached good file stays attached
      return;
    }
    onChange(picked);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    e.target.value = ''; // lets the same file be chosen again after removing it
    void accept(picked);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepth.current = 0;
    setIsDragging(false);
    const dropped = e.dataTransfer.files;
    if (dropped.length > 1) {
      setError('Please add one artwork file at a time.');
      return;
    }
    void accept(dropped[0]);
  };

  const handleRemove = () => {
    latestCheck.current++;
    setError('');
    setIsChecking(false);
    onChange(null);
  };

  const zoneClass = [
    'artwork-dropzone',
    file && 'has-file',
    isDragging && 'is-dragging',
    error && 'has-error',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <label id="artwork-label" style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#05264D', marginBottom: '6px' }}>
        Artwork File (PDF, AI, PNG, PSD, JPG)
      </label>
      <input
        type="file"
        ref={inputRef}
        onChange={handleInputChange}
        accept={ARTWORK_ACCEPT}
        tabIndex={-1}
        aria-hidden="true"
        style={{ display: 'none' }}
      />
      <div
        data-artwork-dropzone
        role="button"
        tabIndex={0}
        aria-labelledby="artwork-label"
        aria-describedby={error ? 'artwork-error' : undefined}
        className={zoneClass}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPicker();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          dragDepth.current++;
          setIsDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'copy';
        }}
        onDragLeave={() => {
          dragDepth.current = Math.max(0, dragDepth.current - 1);
          if (dragDepth.current === 0) setIsDragging(false);
        }}
        onDrop={handleDrop}
      >
        {isChecking ? (
          <Loader2 size={24} className="artwork-spinner" style={{ color: '#216FA3', margin: '0 auto 6px' }} />
        ) : (
          <Upload size={24} style={{ color: '#216FA3', margin: '0 auto 6px' }} />
        )}
        {isChecking ? (
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#05264D' }}>Checking file…</div>
        ) : file ? (
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#05264D', wordBreak: 'break-all' }}>{file.name}</div>
            {file.size > MAX_EMAIL_ATTACHMENT_BYTES ? (
              <div style={{ fontSize: '11.5px', color: '#B45309', marginTop: '2px' }}>
                ✓ Selected · {formatFileSize(file.size)} · Over 3 MB, so please send it on WhatsApp after submitting
              </div>
            ) : (
              <div style={{ fontSize: '11.5px', color: '#2E7D32', marginTop: '2px' }}>
                ✓ Attached · {formatFileSize(file.size)} · Ready for pre-flight
              </div>
            )}
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#05264D' }}>
              {isDragging ? 'Drop your file here' : 'Click to select or drag & drop'}
            </div>
            <div style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '2px' }}>
              PDF, AI, PSD, PNG or JPG · up to {MAX_ARTWORK_MB} MB
            </div>
          </div>
        )}
      </div>

      {file && !isChecking && (
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '8px' }}>
          <button type="button" className="artwork-action" onClick={openPicker}>
            Replace
          </button>
          <button type="button" className="artwork-action danger" onClick={handleRemove} aria-label={`Remove ${file.name}`}>
            Remove
          </button>
        </div>
      )}

      <FieldError id="artwork-error" message={error} marginTop={6} />
    </div>
  );
};
