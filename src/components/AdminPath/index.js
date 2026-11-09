import React from 'react';
import styles from './styles.module.css';

/** A menu path, e.g. <AdminPath path="System › Settings › Payments" />. */
export default function AdminPath({ path, root = 'Admin Panel' }) {
  const parts = [root, ...path.split('›').map((p) => p.trim())].filter(Boolean);
  return (
    <span className={styles.path} aria-label={parts.join(', then ')}>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className={styles.sep} aria-hidden="true">›</span>}
          <span className={i === 0 ? styles.root : styles.part}>{part}</span>
        </React.Fragment>
      ))}
    </span>
  );
}
