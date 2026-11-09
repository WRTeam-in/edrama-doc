import React, { useState } from 'react';
import styles from './styles.module.css';

/** The five accents the app ships with (lib/core/theme/theme_colors.dart). */
export const ACCENTS = [
  { name: 'Greenlight', fill: '#C6EB3B', onLight: '#4A7300' },
  { name: 'Ember', fill: '#FF8A4C', onLight: '#B4410E' },
  { name: 'Iris', fill: '#9B8CFF', onLight: '#4F3FD0' },
  { name: 'Rosé', fill: '#FF7FA8', onLight: '#B21C55' },
  { name: 'Aqua', fill: '#4FDCCB', onLight: '#0B6E64' },
];

/** Pick an accent and see it on a small mock of the app's unlock button. */
export default function AccentPreview() {
  const [active, setActive] = useState(ACCENTS[0]);
  return (
    <div className={styles.wrap} style={{ '--pick': active.fill, '--pick-on-light': active.onLight }}>
      <div className={styles.swatches} role="radiogroup" aria-label="Accent colour">
        {ACCENTS.map((accent) => (
          <button
            key={accent.name}
            type="button"
            role="radio"
            aria-checked={accent.name === active.name}
            className={styles.swatch}
            style={{ background: accent.fill }}
            onClick={() => setActive(accent)}
            title={accent.name}
          >
            <span className={styles.sr}>{accent.name}</span>
          </button>
        ))}
      </div>
      <div className={styles.phones}>
        <div className={styles.phone} data-mode="dark">
          <span className={styles.chip}>Episode 12 · Locked</span>
          <span className={styles.cta}>Unlock with coins</span>
          <span className={styles.link}>Watch one ad instead</span>
        </div>
        <div className={styles.phone} data-mode="light">
          <span className={styles.chip}>Episode 12 · Locked</span>
          <span className={styles.cta}>Unlock with coins</span>
          <span className={styles.link}>Watch one ad instead</span>
        </div>
      </div>
      <p className={styles.caption}>
        <strong>{active.name}</strong>: <code>{active.fill}</code> on dark, <code>{active.onLight}</code> on light.
      </p>
    </div>
  );
}
