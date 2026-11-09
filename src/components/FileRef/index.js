import React, { useState } from 'react';
import styles from './styles.module.css';

/** A file path or value with a copy button. */
export default function FileRef({ path, children }) {
  const value = path ?? children;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked: the text can still be selected */
    }
  };
  return (
    <span className={styles.ref}>
      <code>{value}</code>
      <button type="button" className={styles.copy} onClick={copy} aria-label={`Copy ${value}`}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </span>
  );
}
