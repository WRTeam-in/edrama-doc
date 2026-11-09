import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const KEY = 'edrama-doc-domain';
const EVENT = 'edrama-doc-domain-change';
const FALLBACK = 'your-domain.com';

function readDomain() {
  try {
    return window.localStorage.getItem(KEY) || '';
  } catch {
    return '';
  }
}

function clean(value) {
  return value
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .toLowerCase();
}

function useDomain() {
  const [domain, setDomain] = useState('');
  useEffect(() => {
    setDomain(readDomain());
    const update = () => setDomain(readDomain());
    window.addEventListener(EVENT, update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, []);
  return domain;
}

/** Lets the reader type their Admin Panel domain once; every <ServerUrl> on the site then uses it. */
export function DomainInput({ label = 'Your Admin Panel domain' }) {
  const domain = useDomain();
  const [value, setValue] = useState('');
  useEffect(() => setValue(domain), [domain]);
  const save = (next) => {
    setValue(next);
    try {
      window.localStorage.setItem(KEY, clean(next));
    } catch {
      /* private mode: the URLs keep the placeholder */
    }
    window.dispatchEvent(new Event(EVENT));
  };
  return (
    <div className={styles.box}>
      <label className={styles.label} htmlFor="ed-domain">{label}</label>
      <div className={styles.row}>
        <span className={styles.scheme}>https://</span>
        <input
          id="ed-domain"
          className={styles.input}
          type="text"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          placeholder={FALLBACK}
          value={value}
          onChange={(e) => save(e.target.value)}
        />
      </div>
      <p className={styles.hint}>Every address on these pages fills in with it. It stays in this browser only.</p>
    </div>
  );
}

/** A URL on the buyer's server, e.g. <ServerUrl path="/api/v1/webhooks/video" />. */
export function ServerUrl({ path = '' }) {
  const domain = useDomain();
  const url = `https://${domain || FALLBACK}${path}`;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };
  return (
    <span className={styles.url}>
      <code>{url}</code>
      <button type="button" className={styles.copy} onClick={copy} aria-label={`Copy ${url}`}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </span>
  );
}
