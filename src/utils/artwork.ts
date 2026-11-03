// Client-side checks for the artwork upload on the quote form.

const ALLOWED_EXTENSIONS: readonly string[] = ['pdf', 'ai', 'psd', 'png', 'jpg', 'jpeg'];

/** Value for <input accept="…"> so the OS picker only offers supported files. */
export const ARTWORK_ACCEPT = ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(',');

export const MAX_ARTWORK_MB = 25;
const MAX_ARTWORK_BYTES = MAX_ARTWORK_MB * 1024 * 1024;

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// Browsers report unreliable MIME types for .ai / .psd, so check the file's first bytes instead.
// This catches e.g. a text file or .exe that was simply renamed to "artwork.pdf".
const startsWith = (head: Uint8Array, signature: number[]) => signature.every((byte, i) => head[i] === byte);
const asText = (head: Uint8Array) => new TextDecoder('latin1').decode(head);

const SIGNATURE_CHECKS: Record<string, (head: Uint8Array) => boolean> = {
  // PDF header may be preceded by a few junk bytes, so look for it anywhere in the first 1 KB.
  pdf: (head) => asText(head).includes('%PDF-'),
  // Illustrator files are PDF-compatible (CS and later) or, for very old files, PostScript.
  ai: (head) => {
    const text = asText(head);
    return text.includes('%PDF-') || text.startsWith('%!PS');
  },
  psd: (head) => startsWith(head, [0x38, 0x42, 0x50, 0x53]), // "8BPS"
  png: (head) => startsWith(head, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  jpg: (head) => startsWith(head, [0xff, 0xd8, 0xff]),
  jpeg: (head) => startsWith(head, [0xff, 0xd8, 0xff]),
};

/** Returns an error message if the file can't be accepted, or '' when it is fine. */
export const validateArtworkFile = async (file: File): Promise<string> => {
  const dot = file.name.lastIndexOf('.');
  const extension = dot > 0 ? file.name.slice(dot + 1).toLowerCase() : '';

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return `"${file.name}" is not a supported format. Please upload a PDF, AI, PSD, PNG or JPG file.`;
  }
  if (file.size === 0) {
    return `"${file.name}" is empty. Please choose a valid file.`;
  }
  if (file.size > MAX_ARTWORK_BYTES) {
    return `"${file.name}" is ${formatFileSize(file.size)}. The maximum size is ${MAX_ARTWORK_MB} MB.`;
  }

  let head: Uint8Array;
  try {
    head = new Uint8Array(await file.slice(0, 1024).arrayBuffer());
  } catch {
    return `We couldn't read "${file.name}". Please try selecting it again.`;
  }
  if (!SIGNATURE_CHECKS[extension](head)) {
    return `"${file.name}" doesn't look like a valid ${extension.toUpperCase()} file. Please re-export it and try again.`;
  }
  return '';
};
