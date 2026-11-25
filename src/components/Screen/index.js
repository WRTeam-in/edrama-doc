import React, {useId, useRef, useState} from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {getWire} from './wires';
import manifest from './manifest.json';
import styles from './styles.module.css';

/**
 * An annotated screen: a real screenshot (or, until one is saved, a wireframe of the
 * screen) with numbered markers, and a numbered explanation of each marker.
 *
 *   <Screen
 *     id="admin-dashboard"          // the screenshot: static/img/screens/admin-dashboard.webp (or .png / .jpg)
 *     type="browser"                // "browser" (Admin Panel, Creator Portal) or "phone" (viewer app)
 *     wire="dashboard"              // which wireframe to draw if there is no screenshot
 *     url="/admin"                  // shown in the browser's address bar
 *     title="Dashboard"
 *     caption="What the screenshot shows"
 *     markers={[{x: 50, y: 20, title: 'Range', text: 'Switch between 7, 30 and 90 days.'}]}
 *   />
 *
 * Marker x and y are percentages of the screenshot, measured to the centre of the marker.
 * Hovering a marker highlights its explanation, and the other way round. Screenshots are
 * listed with their size in manifest.json (`npm run screens`, run before start and build),
 * so each one shows at its real aspect ratio; a full-page screenshot scrolls inside its frame.
 */
const TALL = {browser: 0.8, phone: 2.3};

export default function Screen({
  id,
  type = 'browser',
  wire = 'list',
  url = '',
  title,
  caption,
  markers = [],
  size,
}) {
  const isPhone = type === 'phone';
  const shot = manifest[id];
  const src = useBaseUrl(`/img/screens/${shot ? shot.src : `${id}.png`}`);
  const [active, setActive] = useState(null);
  const legendRef = useRef(null);
  const viewportRef = useRef(null);
  const uid = useId();

  const ratio = shot ? shot.h / shot.w : null;
  const scrolls = shot ? ratio > TALL[isPhone ? 'phone' : 'browser'] : false;
  const label = title ? `${title} screen` : 'Screenshot';

  const focusLegend = (index) => {
    setActive(index);
    const item = legendRef.current?.querySelector(`[data-index="${index}"]`);
    if (item && typeof item.scrollIntoView === 'function') {
      const rect = item.getBoundingClientRect();
      if (rect.top < 80 || rect.bottom > window.innerHeight) {
        item.scrollIntoView({behavior: 'smooth', block: 'nearest'});
      }
    }
  };

  // In a full-page screenshot, bring the marker an explanation talks about into view.
  const revealMarker = (index) => {
    setActive(index);
    const view = viewportRef.current;
    if (!scrolls || !view) return;
    const y = (markers[index].y / 100) * view.scrollHeight;
    if (y < view.scrollTop + 40 || y > view.scrollTop + view.clientHeight - 40) {
      view.scrollTo({top: Math.max(0, y - view.clientHeight / 2), behavior: 'smooth'});
    }
  };

  const activeMarker = active !== null ? markers[active] : null;

  return (
    <figure className={clsx(styles.figure, isPhone ? styles.figurePhone : styles.figureBrowser, size === 'wide' && styles.wide)}>
      <div className={styles.stageWrap}>
        <div className={clsx(styles.device, isPhone ? styles.phone : styles.browser)}>
          {!isPhone && (
            <div className={styles.chrome} aria-hidden="true">
              <span className={styles.lights}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.address}>
                <svg viewBox="0 0 16 16" width="10" height="10" aria-hidden="true">
                  <path d="M4.5 7V5.5a3.5 3.5 0 1 1 7 0V7h.5A1 1 0 0 1 13 8v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h.5Zm1.5 0h4V5.5a2 2 0 1 0-4 0V7Z" fill="currentColor" />
                </svg>
                your-domain.com{url}
              </span>
              {!shot && <span className={styles.wireBadge}>Wireframe</span>}
              {scrolls && <span className={styles.scrollBadge}>Full page · scroll</span>}
            </div>
          )}
          {isPhone && !shot && <span className={styles.notch} aria-hidden="true" />}
          <div ref={viewportRef} className={clsx(styles.canvas, scrolls && styles.scroller)} tabIndex={scrolls ? 0 : undefined} aria-label={scrolls ? `${label}, scrollable` : undefined}>
            <div className={clsx(styles.page, !shot && styles.wireAspect)} style={shot ? {aspectRatio: `${shot.w} / ${shot.h}`} : undefined}>
              {shot ? (
                <img className={styles.shot} src={src} width={shot.w} height={shot.h} alt={label} loading="lazy" decoding="async" />
              ) : (
                <Wireframe name={wire} />
              )}
              {activeMarker?.area && (
                <span
                  className={styles.area}
                  style={{
                    left: `${activeMarker.area[0]}%`,
                    top: `${activeMarker.area[1]}%`,
                    width: `${activeMarker.area[2]}%`,
                    height: `${activeMarker.area[3]}%`,
                  }}
                  aria-hidden="true"
                />
              )}
              {markers.map((m, i) => (
                <button
                  type="button"
                  key={`${uid}-${i}`}
                  className={clsx(styles.marker, active === i && styles.markerActive)}
                  style={{left: `${m.x}%`, top: `${m.y}%`, animationDelay: `${0.08 * i}s`}}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => focusLegend(i)}
                  aria-label={`${i + 1}: ${m.title}`}
                  aria-describedby={`${uid}-item-${i}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
        {isPhone && !shot && <span className={clsx(styles.wireBadge, styles.wireBadgePhone)}>Wireframe · screenshot pending</span>}
        {isPhone && scrolls && <span className={clsx(styles.scrollBadge, styles.wireBadgePhone)}>Full screen · scroll</span>}
      </div>

      {markers.length > 0 && (
        <ol className={styles.legend} ref={legendRef}>
          {markers.map((m, i) => (
            <li
              key={`${uid}-legend-${i}`}
              id={`${uid}-item-${i}`}
              data-index={i}
              className={clsx(styles.item, active === i && styles.itemActive, scrolls && styles.itemReveal)}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={scrolls ? () => revealMarker(i) : undefined}
            >
              <span className={styles.num} aria-hidden="true">
                {i + 1}
              </span>
              <span className={styles.itemBody}>
                <strong>{m.title}</strong>
                {m.text && <span className={styles.itemText}>{m.text}</span>}
              </span>
            </li>
          ))}
        </ol>
      )}

      {(caption || !shot) && (
        <figcaption className={styles.caption}>
          {!shot && (
            <span className={styles.captureTag}>
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path d="M9 3 7.2 5H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.2L15 3H9Zm3 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" fill="currentColor" />
              </svg>
              Screenshot to capture
            </span>
          )}
          {caption && <span>{caption}</span>}
          {!shot && (
            <span className={styles.captureFile}>
              Save it as <code>static/img/screens/{id}.webp</code> or <code>.png</code> ({isPhone ? '1080 × 2400' : '1600 wide'}) and rebuild; it replaces this wireframe automatically.
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function Wireframe({name}) {
  const shapes = getWire(name);
  return (
    <div className={styles.wire} aria-hidden="true">
      {shapes.map((s, i) =>
        s.k === 'none' ? null : (
          <span
            key={i}
            className={clsx(styles.s, styles[`k_${s.k}`])}
            style={{left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%`, height: `${s.h}%`}}
          >
            {s.k === 'chart' && <ChartArt />}
            {s.k === 'wheel' && <WheelArt />}
          </span>
        ),
      )}
    </div>
  );
}

function ChartArt() {
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" width="100%" height="100%">
      <defs>
        <linearGradient id="edChartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c6eb3b" stopOpacity="0.45" />
          <stop offset="1" stopColor="#c6eb3b" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 32 L10 28 L20 30 L30 22 L40 24 L50 16 L60 19 L70 11 L80 14 L90 7 L100 9 L100 40 L0 40 Z" fill="url(#edChartFill)" />
      <path d="M0 32 L10 28 L20 30 L30 22 L40 24 L50 16 L60 19 L70 11 L80 14 L90 7 L100 9" fill="none" stroke="#c6eb3b" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <path d="M0 36 L10 35 L20 34 L30 33 L40 33 L50 30 L60 31 L70 28 L80 29 L90 26 L100 25" fill="none" stroke="#f1ddb3" strokeWidth="1" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function WheelArt() {
  const n = 8;
  return (
    <svg viewBox="-50 -50 100 100" width="100%" height="100%">
      {Array.from({length: n}, (_, i) => {
        const a0 = (i / n) * Math.PI * 2;
        const a1 = ((i + 1) / n) * Math.PI * 2;
        const p = `M0 0 L${46 * Math.cos(a0)} ${46 * Math.sin(a0)} A46 46 0 0 1 ${46 * Math.cos(a1)} ${46 * Math.sin(a1)} Z`;
        return <path key={i} d={p} fill={i % 2 ? '#19191c' : '#2c2c31'} />;
      })}
      {Array.from({length: n}, (_, i) => {
        const a = ((i + 0.5) / n) * Math.PI * 2;
        return <circle key={`c${i}`} cx={30 * Math.cos(a)} cy={30 * Math.sin(a)} r="4.2" fill="#f2c25b" />;
      })}
      <circle r="47" fill="none" stroke="#f2c25b" strokeOpacity="0.55" strokeWidth="1.5" />
      <circle r="9" fill="#0a0a0b" stroke="#c6eb3b" strokeWidth="2" />
    </svg>
  );
}
