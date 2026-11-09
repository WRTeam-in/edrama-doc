import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/**
 * A list the reader can tick off. Progress is remembered in this browser.
 * items: [{ id, label, to? }]
 */
export default function Checklist({ id, items }) {
  const key = `edrama-doc-checklist-${id}`;
  const [done, setDone] = useState({});
  useEffect(() => {
    try {
      setDone(JSON.parse(window.localStorage.getItem(key) || '{}'));
    } catch {
      setDone({});
    }
  }, [key]);
  const save = (next) => {
    setDone(next);
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* not remembered in private mode */
    }
  };
  const count = items.filter((item) => done[item.id]).length;
  const percent = Math.round((count / items.length) * 100);
  return (
    <div className={styles.box}>
      <div className={styles.head}>
        <strong>
          {count} of {items.length} done
        </strong>
        <button type="button" className={styles.reset} onClick={() => save({})}>
          Reset
        </button>
      </div>
      <div className={styles.track} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className={styles.fill} style={{ transform: `scaleX(${percent / 100})` }} />
      </div>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={done[item.id] ? styles.checked : undefined}>
            <label className={styles.item}>
              <input
                type="checkbox"
                checked={!!done[item.id]}
                onChange={(e) => save({ ...done, [item.id]: e.target.checked })}
              />
              <span>{item.label}</span>
            </label>
            {item.to && (
              <Link className={styles.link} to={item.to}>
                Guide
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
