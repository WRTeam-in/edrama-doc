import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

/** A screenshot with a caption; click it to see it full size. */
export default function Shot({ src, alt, caption, width }) {
  const url = useBaseUrl(src);
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);
  return (
    <figure className={styles.figure}>
      <button type="button" className={styles.thumb} onClick={() => setOpen(true)} aria-label={`Enlarge: ${alt}`}>
        <img src={url} alt={alt} loading="lazy" decoding="async" style={width ? { maxWidth: width } : undefined} />
      </button>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      <dialog ref={dialog} className={styles.dialog} onClose={() => setOpen(false)} onClick={() => setOpen(false)}>
        <img src={url} alt={alt} />
      </dialog>
    </figure>
  );
}
