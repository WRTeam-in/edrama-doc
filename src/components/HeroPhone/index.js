import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

/**
 * A small looping tour of the app inside the hero's phone: Home, a series page,
 * the vertical player and the unlock sheet. It moves on by itself every few
 * seconds; a tap (or a label below) jumps ahead. It stays put for readers who
 * prefer less motion, and pauses while it's off-screen.
 */

const SCREENS = ['Home', 'Series', 'Player', 'Unlock'];
const STEP_MS = 3400;
const POSTERS = [
  ['#3a1f4d', '#c13b6b'],
  ['#14324a', '#2f8fbf'],
  ['#3d2a12', '#d08a2e'],
  ['#1d3b2a', '#56b06f'],
  ['#40141c', '#e0525e'],
  ['#2a2148', '#7d64e0'],
];

function Poster({ index, className, children }) {
  const [a, b] = POSTERS[index % POSTERS.length];
  return (
    <div className={clsx(styles.poster, className)} style={{ background: `linear-gradient(160deg, ${b}, ${a} 70%)` }}>
      {children}
    </div>
  );
}

function HomeScreen({ icon }) {
  return (
    <div className={styles.screenInner}>
      <div className={styles.topBar}>
        <img src={icon} alt="" className={styles.topIcon} />
        <span className={styles.bell} />
      </div>
      <Poster index={0} className={styles.heroPoster}>
        <span className={styles.pill}>Top 10 today</span>
        <span className={styles.lineWide} />
        <span className={styles.lineShort} />
      </Poster>
      <span className={styles.rowLabel}>Continue watching</span>
      <div className={styles.row}>
        {[1, 2, 3].map((i) => (
          <Poster key={i} index={i} className={styles.rowPoster}>
            <span className={styles.posterProgress}>
              <span style={{ width: `${30 + i * 20}%` }} />
            </span>
          </Poster>
        ))}
      </div>
      <span className={styles.rowLabel}>New releases</span>
      <div className={styles.row}>
        {[4, 5, 0].map((i) => (
          <Poster key={i} index={i} className={styles.rowPoster} />
        ))}
      </div>
    </div>
  );
}

function SeriesScreen() {
  return (
    <div className={styles.screenInner}>
      <Poster index={2} className={styles.banner}>
        <span className={styles.pill}>5 free episodes</span>
      </Poster>
      <span className={styles.titleLine} />
      <span className={styles.lineMuted} />
      <span className={styles.rowLabel}>Episodes</span>
      <div className={styles.episodes}>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={clsx(styles.episode, i === 0 && styles.episodeNow, i >= 5 && styles.episodeLocked)}>
            {i >= 5 ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            ) : (
              i + 1
            )}
          </span>
        ))}
      </div>
      <span className={styles.cta}>Play episode 1</span>
    </div>
  );
}

function PlayerScreen({ active }) {
  return (
    <div className={clsx(styles.screenInner, styles.player)}>
      <div className={clsx(styles.playerFrames, active && styles.playerSwipe)}>
        <Poster index={4} className={styles.frame} />
        <Poster index={5} className={styles.frame} />
      </div>
      <div className={styles.rail}>
        <span className={clsx(styles.railIcon, active && styles.heartPop)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z" />
          </svg>
        </span>
        <span className={styles.railIcon}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 5h16v11H8l-4 4z" />
          </svg>
        </span>
        <span className={styles.railIcon}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14 4l6 6-6 6M20 10H9a5 5 0 0 0-5 5v4" />
          </svg>
        </span>
      </div>
      <div className={styles.playerFooter}>
        <span className={styles.pill}>Episode 3 · Free</span>
        <span className={styles.lineWide} />
        <span className={styles.track}>
          <span className={clsx(active && styles.trackPlay)} />
        </span>
      </div>
      <span className={clsx(styles.swipeHint, active && styles.swipeHintOn)} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M6 14l6-6 6 6" />
        </svg>
      </span>
    </div>
  );
}

function UnlockScreen({ active }) {
  return (
    <div className={clsx(styles.screenInner, styles.player)}>
      <Poster index={1} className={clsx(styles.frame, styles.dimmed)} />
      <div className={clsx(styles.sheet, active && styles.sheetUp)}>
        <span className={styles.grabber} />
        <span className={styles.sheetTitle}>Episode 6 is locked</span>
        <span className={clsx(styles.option, styles.optionPicked)}>
          <span className={styles.coin} />
          Coins
          <b>60</b>
        </span>
        <span className={styles.option}>
          <span className={styles.adIcon} />
          Watch one ad
          <b>Free</b>
        </span>
        <span className={styles.option}>
          <span className={styles.passIcon} />
          Series Pass
        </span>
        <span className={styles.option}>
          <span className={styles.vipIcon} />
          VIP
        </span>
        <span className={styles.cta}>Unlock with 60 coins</span>
      </div>
    </div>
  );
}

export default function HeroPhone() {
  const icon = useBaseUrl('/images/brand/icon.svg');
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const root = useRef(null);
  const timer = useRef(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % SCREENS.length), []);

  // Auto-play only while the phone is visible and the reader hasn't asked for less motion.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !root.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(root.current);
    const onVisibility = () => {
      if (document.hidden) setRunning(false);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    window.clearTimeout(timer.current);
    if (running) timer.current = window.setTimeout(next, STEP_MS);
    return () => window.clearTimeout(timer.current);
  }, [running, index, next]);

  return (
    <div ref={root} className={styles.wrap}>
      <button type="button" className={styles.phone} onClick={next} aria-label={`App preview: ${SCREENS[index]}. Tap for the next screen.`}>
        <span className={styles.notch} aria-hidden="true" />
        <span className={styles.screen} aria-hidden="true">
          {SCREENS.map((name, i) => (
            <span
              key={name}
              className={clsx(styles.layer, i === index && styles.layerActive, i < index && styles.layerPast)}
            >
              {name === 'Home' && <HomeScreen icon={icon} />}
              {name === 'Series' && <SeriesScreen />}
              {name === 'Player' && <PlayerScreen active={i === index} />}
              {name === 'Unlock' && <UnlockScreen active={i === index} />}
            </span>
          ))}
        </span>
        <span className={styles.tapHint} aria-hidden="true">
          Tap
        </span>
      </button>
      <div className={styles.tabs} role="tablist" aria-label="App preview screens">
        {SCREENS.map((name, i) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={clsx(styles.tab, i === index && styles.tabActive)}
            onClick={() => setIndex(i)}
          >
            <span className={styles.tabBar}>
              <span className={clsx(i === index && running && styles.tabFill)} style={{ animationDuration: `${STEP_MS}ms` }} />
            </span>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
