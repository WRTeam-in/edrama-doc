import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * A checklist that remembers what the reader ticked, in this browser only.
 *
 *   <Checklist id="launch">
 *     <ChecklistGroup title="1. Server">
 *       <ChecklistItem id="server">Rent a server that meets the [requirements](...).</ChecklistItem>
 *     </ChecklistGroup>
 *   </Checklist>
 *
 * Item ids must be unique within one checklist and should never change, or saved ticks are lost.
 */
const Ctx = createContext(null);

function collectIds(children, out = []) {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type && child.type.isChecklistItem) out.push(child.props.id);
    else if (child.props && child.props.children) collectIds(child.props.children, out);
  });
  return out;
}

export function Checklist({id, children, title = 'Your progress'}) {
  const storageKey = `edrama-docs-checklist:${id}`;
  const ids = useMemo(() => collectIds(children), [children]);
  const [done, setDone] = useState({});

  useEffect(() => {
    try {
      setDone(JSON.parse(window.localStorage.getItem(storageKey) || '{}'));
    } catch {
      setDone({});
    }
  }, [storageKey]);

  // Functional updates, so quick successive clicks never overwrite each other.
  const update = (fn) => {
    setDone((prev) => {
      const next = fn(prev);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        /* Private mode: ticks last until the page is closed. */
      }
      return next;
    });
  };

  const toggle = (itemId) => update((prev) => ({...prev, [itemId]: !prev[itemId]}));
  const reset = () => update(() => ({}));

  const total = ids.length;
  const count = ids.filter((i) => done[i]).length;
  const percent = total ? Math.round((100 * count) / total) : 0;
  const complete = total > 0 && count === total;

  return (
    <Ctx.Provider value={{done, toggle}}>
      <section className={styles.checklist}>
        <div className={clsx(styles.progress, complete && styles.progressDone)}>
          <div className={styles.ring} style={{'--p': `${percent}%`}} aria-hidden="true">
            <span>{percent}%</span>
          </div>
          <div className={styles.progressText}>
            <strong>{complete ? 'Everything is ticked. Ready to launch.' : title}</strong>
            <span>
              {count} of {total} done · saved in this browser
            </span>
            <div className={styles.bar} aria-hidden="true">
              <i style={{width: `${percent}%`}} />
            </div>
          </div>
          {count > 0 && (
            <button type="button" className={styles.reset} onClick={reset}>
              Reset
            </button>
          )}
        </div>
        {children}
      </section>
    </Ctx.Provider>
  );
}

export function ChecklistGroup({title, children}) {
  const ctx = useContext(Ctx);
  const ids = collectIds(children);
  const count = ctx ? ids.filter((i) => ctx.done[i]).length : 0;
  const complete = ids.length > 0 && count === ids.length;
  return (
    <div className={clsx(styles.group, complete && styles.groupDone)}>
      <div className={styles.groupHead}>
        <h3 className={styles.groupTitle}>{title}</h3>
        <span className={styles.groupCount}>
          {count}/{ids.length}
        </span>
      </div>
      <ul className={styles.items}>{children}</ul>
    </div>
  );
}

export function ChecklistItem({id, children}) {
  const ctx = useContext(Ctx);
  const checked = !!(ctx && ctx.done[id]);
  return (
    <li className={clsx(styles.item, checked && styles.itemDone)}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        className={styles.box}
        onClick={() => ctx && ctx.toggle(id)}
        aria-label={checked ? 'Mark as not done' : 'Mark as done'}
      >
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          <path d="M3.5 8.4 6.6 11.5 12.5 4.8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={styles.label}>{children}</div>
    </li>
  );
}
// React 19 has no defaultProps on function components, so items are recognised by this flag.
ChecklistItem.isChecklistItem = true;
