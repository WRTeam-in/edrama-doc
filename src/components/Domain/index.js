import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * Personalised addresses. The reader types their Admin Panel domain once (in any <DomainInput>);
 * every <ServerUrl> on every page then shows their real address, ready to copy. The value stays
 * in this browser only.
 *
 *   <DomainInput />
 *   <ServerUrl path="/api/v1/webhooks/google-play" />
 *   <ServerUrl path="/api/v1/webhooks/video" inline />
 */
const KEY = 'edrama-docs-domain';
const EVENT = 'edrama-docs-domain-change';
export const FALLBACK = 'admin.your-domain.com';

function read() {
  try {
    return window.localStorage.getItem(KEY) || '';
  } catch {
    return '';
  }
}

/** Keeps only the host: no scheme, no path, no spaces. */
function clean(value) {
  return value
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/[/?#].*$/, '')
    .replace(/\s+/g, '')
    .toLowerCase();
}

export function useDomain() {
  const [domain, setDomain] = useState('');
  useEffect(() => {
    const update = () => setDomain(read());
    update();
    window.addEventListener(EVENT, update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, []);
  return domain;
}

export function DomainInput({label = 'Your Admin Panel domain', hint}) {
  const domain = useDomain();
  const [value, setValue] = useState('');
  useEffect(() => setValue(domain), [domain]);

  const save = (next) => {
    setValue(next);
    try {
      const cleaned = clean(next);
      if (cleaned) window.localStorage.setItem(KEY, cleaned);
      else window.localStorage.removeItem(KEY);
    } catch {
      /* Private mode: the addresses keep the placeholder. */
    }
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <div className={styles.box}>
      <div className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 6h-2.9a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8ZM12 4c.8 1.1 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.9 1.9-4ZM4.3 14a8.2 8.2 0 0 1 0-4h3.3a16.5 16.5 0 0 0 0 4H4.3Zm.8 2h2.9c.3 1.3.8 2.5 1.4 3.6A8 8 0 0 1 5.1 16ZM8 8H5.1a8 8 0 0 1 4.3-3.6C8.8 5.5 8.3 6.7 8 8Zm4 12c-.8-1.1-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.9-1.9 4Zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4Zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h2.9a8 8 0 0 1-4.3 3.6Zm1.8-5.6a16.5 16.5 0 0 0 0-4h3.3a8.2 8.2 0 0 1 0 4h-3.3Z" fill="currentColor" />
          </svg>
        </span>
        <label className={styles.label} htmlFor="ed-domain-input">
          {label}
        </label>
        {domain && <span className={styles.saved}>Saved in this browser</span>}
      </div>
      <div className={styles.row}>
        <span className={styles.scheme}>https://</span>
        <input
          id="ed-domain-input"
          className={styles.input}
          type="text"
          inputMode="url"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={FALLBACK}
          value={value}
          onChange={(e) => save(e.target.value)}
        />
        {value && (
          <button type="button" className={styles.clear} onClick={() => save('')} aria-label="Clear the domain">
            ×
          </button>
        )}
      </div>
      <p className={styles.hint}>{hint || 'Every address on these pages fills in with it, ready to copy. It never leaves this browser.'}</p>
    </div>
  );
}

export function ServerUrl({path = '', inline = false}) {
  const domain = useDomain();
  const url = `https://${domain || FALLBACK}${path}`;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const area = document.createElement('textarea');
      area.value = url;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <span className={clsx(styles.url, inline && styles.urlInline, !domain && styles.urlPlaceholder)}>
      <code className={styles.urlText}>{url}</code>
      <button type="button" className={clsx(styles.copy, copied && styles.copied)} onClick={copy} aria-label={`Copy ${url}`}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </span>
  );
}
