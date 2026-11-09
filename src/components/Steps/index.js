import React, { Children } from 'react';
import styles from './styles.module.css';

/** Numbered steps joined by a line. Each child is one step. */
export default function Steps({ children }) {
  return (
    <ol className={styles.steps}>
      {Children.toArray(children).map((child, index) => (
        <li key={index} className={styles.step}>
          <span className={styles.number} aria-hidden="true">{index + 1}</span>
          <div className={styles.body}>{child}</div>
        </li>
      ))}
    </ol>
  );
}

/** One step. Use inside <Steps>. */
export function Step({ title, children }) {
  return (
    <>
      {title && <p className={styles.title}>{title}</p>}
      {children}
    </>
  );
}
