import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import DocBanner from '@site/src/components/DocBanner/DocBanner';
import Reveal from '@site/src/components/Reveal';
import { ACCENTS, inkOn } from '@site/src/components/AccentPreview';
import HeroPhone from '@site/src/components/HeroPhone';
import styles from './index.module.css';

/** Icon paths for the cursor trail: clapperboard, play, coin, heart. */
const TRAIL_ICONS = [
  'M4 11h16v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8Z M4 11 3.2 7.1a1 1 0 0 1 .8-1.2l13.7-2.6a1 1 0 0 1 1.2.8L19.6 7 M7.5 5.2l2.6 3.6 M12.3 4.3l2.6 3.6',
  'M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z',
  'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7.5l1.3 2.7 3 .4-2.2 2.1.5 3-2.6-1.4-2.6 1.4.5-3-2.2-2.1 3-.4L12 7.5Z',
  'M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z',
];
const TRAIL_COLOURS = ['#C6EB3B', '#D5F070', '#F2C25B', '#FF4F6E'];
const TRAIL_POOL = 18;
const TRAIL_SPACING = 34;

/**
 * Small icons that drift away from the cursor over the hero. A fixed pool of
 * elements is reused, each moved with transform only and animated by the
 * browser's compositor (Web Animations), so the page never re-lays out while
 * the mouse moves. New icons appear every few dozen pixels of travel, at most
 * once a frame. Off on touch screens and for readers who prefer less motion.
 */
function useCursorTrail(ref) {
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof Element.prototype.animate !== 'function') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.matchMedia('(hover: none)').matches) return undefined;

    const layer = document.createElement('div');
    layer.className = styles.trailLayer;
    layer.setAttribute('aria-hidden', 'true');
    const pool = Array.from({ length: TRAIL_POOL }, (_, n) => {
      const i = n % TRAIL_ICONS.length;
      const el = document.createElement('div');
      el.className = styles.trail;
      el.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="${TRAIL_ICONS[i]}" stroke="${TRAIL_COLOURS[i]}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      layer.appendChild(el);
      return el;
    });
    document.body.appendChild(layer);

    let next = 0;
    let frame = 0;
    let pending = null;
    let last = null;
    let travelled = 0;

    const spawn = (x, y, dx, dy) => {
      const el = pool[next];
      next = (next + 1) % pool.length;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len;
      const uy = dy / len;
      const spread = (Math.random() - 0.5) * 40;
      const driftX = -ux * 26 + -uy * spread;
      const driftY = -uy * 26 + ux * spread - 24;
      const size = 0.7 + Math.random() * 0.4;
      const turn = (Math.random() - 0.5) * 120;
      el.getAnimations().forEach((a) => a.cancel());
      el.animate(
        [
          { transform: `translate3d(${x}px, ${y}px, 0) scale(0.2) rotate(0deg)`, opacity: 0 },
          { transform: `translate3d(${x + driftX * 0.3}px, ${y + driftY * 0.3}px, 0) scale(${size}) rotate(${turn * 0.3}deg)`, opacity: 0.95, offset: 0.25 },
          { transform: `translate3d(${x + driftX}px, ${y + driftY}px, 0) scale(${size * 0.85}) rotate(${turn}deg)`, opacity: 0 },
        ],
        { duration: 1100, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)', fill: 'forwards' },
      );
    };

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { x, y } = pending;
      pending = null;
      if (!last) {
        last = { x, y };
        return;
      }
      const dx = x - last.x;
      const dy = y - last.y;
      travelled += Math.hypot(dx, dy);
      if (travelled >= TRAIL_SPACING) {
        travelled = 0;
        spawn(x - 10, y - 10, dx, dy);
      }
      last = { x, y };
    };

    const onMove = (e) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(flush);
    };
    const onLeave = () => {
      last = null;
      travelled = 0;
    };

    node.addEventListener('pointermove', onMove, { passive: true });
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
      layer.remove();
    };
  }, [ref]);
}

function Hero() {
  const { siteConfig } = useDocusaurusContext();
  const ref = useRef(null);
  const [accent, setAccent] = useState(ACCENTS[0].fill.toLowerCase());
  const logo = useBaseUrl('/images/brand/logo-horizontal-dark.svg');
  useCursorTrail(ref);
  return (
    <header ref={ref} className={styles.hero} style={{ '--hero-accent': accent, '--hero-ink': inkOn(accent) }}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroText}>
          <img className={styles.heroLogo} src={logo} alt="eDrama" width="230" height="53" />
          <h1 className={styles.heroTitle}>
            Short dramas,
            <br />
            <em>set up your way.</em>
          </h1>
          <p className={styles.heroTagline}>{siteConfig.tagline}</p>
          <div className={styles.heroButtons}>
            <Link className={clsx('button button--lg', styles.primaryButton)} to="/admin-panel/">
              Start with the Admin Panel
            </Link>
            <Link className={clsx('button button--lg', styles.ghostButton)} to="/features/earnings-calculator/">
              Try the earnings calculator
            </Link>
          </div>
          <div className={styles.accentRow}>
            <span>Your brand colour, in a minute:</span>
            {ACCENTS.map((a) => (
              <button
                key={a.name}
                type="button"
                className={styles.accentDot}
                style={{ background: a.fill }}
                aria-pressed={a.fill.toLowerCase() === accent}
                aria-label={`Preview ${a.name}`}
                title={a.name}
                onClick={() => setAccent(a.fill.toLowerCase())}
              />
            ))}
            <label className={styles.customColour} title="Any colour">
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                aria-label="Pick any brand colour"
              />
              <span aria-hidden="true">+</span>
            </label>
          </div>
          <p className={styles.accentNote}>
            Set it in Admin Panel › Settings › Branding and the app, panels and website all switch, with no new release.
          </p>
        </div>
        <div className={styles.heroArt}>
          <HeroPhone />
        </div>
      </div>
    </header>
  );
}

const SECTIONS = [
  {
    to: '/admin-panel/',
    title: 'Admin Panel',
    text: 'Server requirements, the install wizard, background jobs, and every setting: payments, video, Firebase, email and more.',
    icon: 'M3 4h18v12H3z M8 20h8 M12 16v4',
  },
  {
    to: '/website/',
    title: 'Website',
    text: 'Put the public website live on Vercel or any Node host. It reads everything from your Admin Panel.',
    icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M3 12h18 M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z',
  },
  {
    to: '/mobile-app/',
    title: 'Mobile App',
    text: 'Point the Flutter app at your server, re-brand it, connect Firebase, ads and store billing, and build for release.',
    icon: 'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z M11 18h2',
  },
  {
    to: '/creator-portal/',
    title: 'Creator Portal',
    text: 'Let approved creators upload their own series. Every episode is reviewed by your team before it goes live.',
    icon: 'M4 20v-1a6 6 0 0 1 12 0v1 M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M18 8v6 M15 11h6',
  },
  {
    to: '/features/',
    title: 'Features',
    text: 'What every menu does, how unlocks and coins work, and how creators and the platform earn.',
    icon: 'M4 6h16 M4 12h16 M4 18h10',
  },
];

function Sections() {
  return (
    <section className={styles.sections}>
      <div className="container">
        <Reveal>
          <h2 className={styles.sectionTitle}>Pick a part to set up</h2>
          <p className={styles.sectionLead}>
            eDrama is four parts that share one backend. Most buyers start with the Admin Panel, then the website and the app.
          </p>
        </Reveal>
        <div className={styles.grid}>
          {SECTIONS.map((s, i) => (
            <Reveal key={s.to} delay={i * 60} className={styles.cardWrap}>
              <Link to={s.to} className={styles.card}>
                <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d={s.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className={styles.cardMore}>Open guide →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section className={styles.arch}>
      <div className="container">
        <Reveal>
          <h2 className={styles.sectionTitle}>How it fits together</h2>
          <p className={styles.sectionLead}>
            One Laravel backend runs the Admin Panel and the Creator Portal, and serves the app and the website through its API.
          </p>
        </Reveal>
        <Reveal>
          <svg className={styles.diagram} viewBox="0 0 760 300" role="img" aria-label="The app, website and Creator Portal all talk to the backend, which uses Firebase, your video storage (this server, Amazon S3 or Cloudflare Stream) and the app stores.">
            <g className={styles.lines}>
              <path d="M150 70 C 260 70, 260 150, 330 150" />
              <path d="M150 150 L 330 150" />
              <path d="M150 230 C 260 230, 260 150, 330 150" />
              <path d="M430 150 C 500 150, 500 70, 610 70" />
              <path d="M430 150 L 610 150" />
              <path d="M430 150 C 500 150, 500 230, 610 230" />
            </g>
            {[
              ['Mobile app', 20, 45],
              ['Website', 20, 125],
              ['Creator Portal', 20, 205],
            ].map(([label, x, y]) => (
              <g key={label}>
                <rect x={x} y={y} width="130" height="50" rx="12" className={styles.node} />
                <text x={x + 65} y={y + 30} textAnchor="middle" className={styles.nodeText}>{label}</text>
              </g>
            ))}
            <rect x="330" y="110" width="100" height="80" rx="16" className={styles.core} />
            <text x="380" y="146" textAnchor="middle" className={styles.coreText}>Backend</text>
            <text x="380" y="166" textAnchor="middle" className={styles.coreSub}>+ Admin Panel</text>
            {[
              ['Firebase', 610, 45],
              ['Video storage', 610, 125],
              ['Play · App Store', 610, 205],
            ].map(([label, x, y]) => (
              <g key={label}>
                <rect x={x} y={y} width="130" height="50" rx="12" className={styles.node} />
                <text x={x + 65} y={y + 30} textAnchor="middle" className={styles.nodeText}>{label}</text>
              </g>
            ))}
          </svg>
        </Reveal>
      </div>
    </section>
  );
}

function Help() {
  return (
    <section className={styles.help}>
      <div className="container">
        <Reveal>
          <h2 className={styles.sectionTitle}>Need help?</h2>
          <p className={styles.sectionLead}>Our team is ready to help with installation, configuration and re-branding.</p>
        </Reveal>
        <div className={styles.helpButtons}>
          <Link className={clsx('button button--lg', styles.primaryButton)} to="/support/">
            Contact support
          </Link>
          <Link className={clsx('button button--lg', styles.ghostButtonPlain)} to="/faqs/">
            Read the FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <Hero />
      <main>
        <Sections />
        <Architecture />
        <div className="container">
          <DocBanner />
        </div>
        <Help />
      </main>
    </Layout>
  );
}
