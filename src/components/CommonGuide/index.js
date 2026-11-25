import React from 'react';
import styles from './styles.module.css';

/**
 * A link to WRTeam's common app guide (https://wrteam-in.github.io/common_app_doc/), which covers the steps that
 * are the same for every WRTeam Flutter app, with screenshots of the store and console screens.
 *
 *   <CommonGuide to="GeneralSettings/firebase" title="Firebase setup" text="Create the project …" />
 */
export const COMMON_GUIDE = 'https://wrteam-in.github.io/common_app_doc/';

export default function CommonGuide({to = '', title = 'Common app guide', text}) {
  return (
    <a className={styles.card} href={`${COMMON_GUIDE}${to}`} target="_blank" rel="noopener noreferrer">
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v16H6.5a.5.5 0 0 0 0 1H20v3H6.5A2.5 2.5 0 0 1 4 19.5v-15ZM8 6v2h8V6H8Zm0 4v2h6v-2H8Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className={styles.body}>
        <span className={styles.kicker}>WRTeam common app guide</span>
        <span className={styles.title}>{title}</span>
        {text && <span className={styles.text}>{text}</span>}
      </span>
      <span className={styles.go} aria-hidden="true">
        <svg viewBox="0 0 16 16" width="14" height="14">
          <path d="M6 3h7v7h-1.6V5.7l-6.8 6.8-1.1-1.1 6.8-6.8H6V3Z" fill="currentColor" />
        </svg>
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
