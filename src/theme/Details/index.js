import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Details from '@theme-original/Details';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

/**
 * Every <details> in a page. One with an `id` can be linked to directly:
 * opening page/#<id> expands it and scrolls to it, and a Share button copies
 * that link.
 */

function hashId(hash) {
  if (!hash) return null;
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  }
}

function ShareButton({id}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const {origin, pathname, search} = window.location;
    await copy(`${origin}${pathname}${search}#${encodeURIComponent(id)}`);
    window.history.replaceState(null, '', `#${encodeURIComponent(id)}`);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type="button" className={clsx(styles.share, copied && styles.copied)} onClick={onClick} aria-label="Copy a direct link to this answer">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {copied ? (
          <polyline points="20 6 9 17 4 12" />
        ) : (
          <>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </>
        )}
      </svg>
      <span>{copied ? 'Copied' : 'Share'}</span>
    </button>
  );
}

export default function DetailsWrapper(props) {
  const {id, summary} = props;
  const {hash} = useLocation();
  const [current, setCurrent] = useState(hash || '');
  const [openToken, setOpenToken] = useState(0);

  useEffect(() => {
    setCurrent(window.location.hash || hash || '');
    const onHash = () => setCurrent(window.location.hash || '');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [hash]);

  const isTarget = Boolean(id) && hashId(current) === id;

  useEffect(() => {
    if (!isTarget) return undefined;
    setOpenToken((t) => t + 1);
    const scroll = () => document.getElementById(id)?.scrollIntoView({behavior: 'smooth', block: 'start'});
    const a = setTimeout(scroll, 80);
    const b = setTimeout(scroll, 260);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [isTarget, id]);

  const withShare = React.isValidElement(summary)
    ? React.cloneElement(summary, undefined, ...React.Children.toArray(summary.props.children), id ? <ShareButton key="share" id={id} /> : null)
    : (
      <summary>
        <span>{summary ?? 'Details'}</span>
        {id ? <ShareButton id={id} /> : null}
      </summary>
    );

  return (
    <Details
      key={openToken}
      {...props}
      summary={withShare}
      open={openToken > 0 ? true : props.open}
      className={clsx(props.className, styles.details, id && styles.anchored, isTarget && styles.target)}
    />
  );
}
