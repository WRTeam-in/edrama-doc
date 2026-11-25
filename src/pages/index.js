import React, {useEffect, useRef} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {Icon} from '@site/src/components/Docs';
import styles from './index.module.css';

const PATHS = [
  {icon: 'server', title: 'Server installation', text: 'Requirements, the four-step web installer, cron, queues and ffmpeg.', to: '/docs/installation/overview/'},
  {icon: 'phone', title: 'Mobile app setup', text: 'Package name, Firebase, your server, your brand, then the store builds.', to: '/docs/app-setup/overview/'},
  {icon: 'globe', title: 'Website setup', text: 'Run the Next.js website, connect it to your panel and deploy it.', to: '/docs/website/overview/'},
  {icon: 'studio', title: 'Admin Panel', text: 'Every screen of the Studio: content, creators, users, money and settings.', to: '/docs/admin/overview/'},
  {icon: 'creator', title: 'Creator Portal', text: 'How invited creators upload series, get reviewed, schedule and earn.', to: '/docs/creator/overview/', tone: 'vip'},
  {icon: 'viewer', title: 'Viewer App', text: 'What viewers see: Home, the player, unlocking, Rewards, VIP and Wallet.', to: '/docs/viewer-app/overview/', tone: 'info'},
  {icon: 'coin', title: 'Monetization', text: 'Coins, Series Pass, VIP, rewarded ads, regions, refunds and payouts.', to: '/docs/monetization/overview/', tone: 'coin'},
  {icon: 'plug', title: 'Integrations', text: 'Firebase, the stores, AdMob, S3 and Cloudflare, with every callback address.', to: '/docs/integrations/overview/'},
  {icon: 'check', title: 'Launch checklist', text: 'Every step to go live, in order, with your progress saved as you tick.', to: '/docs/getting-started/launch-checklist/'},
];

const SERVICES = ['Firebase', 'Google Play', 'App Store', 'AdMob', 'Cloudflare', 'Amazon S3', 'Gemini', 'YouTube'];

/**
 * The hero's poster reels: key art for series from eDrama's demo catalogue
 * (static/img/hero, made with Gemini). Each column repeats its list twice so
 * the scroll loops without a jump.
 */
const POSTERS = [
  {slug: 'heiress-returns', title: 'The Heiress Returns', ep: 12, badge: 'free'},
  {slug: 'vows-of-the-don', title: 'Vows of the Don', ep: 7, coins: 60},
  {slug: 'moonbound', title: 'Moonbound', ep: 3, badge: 'new'},
  {slug: 'ceo-contract-wife', title: "The CEO's Contract Wife", ep: 18, coins: 45},
  {slug: 'bodyguard-clause', title: 'The Bodyguard Clause', ep: 9, badge: 'free'},
  {slug: 'glass-crown', title: 'Glass Crown', ep: 21, coins: 75},
  {slug: 'sindoor-ka-badla', title: 'Sindoor Ka Badla', ep: 5, badge: 'free'},
  {slug: 'divorce-day', title: 'Divorce Day', ep: 14, coins: 30},
  {slug: 'seoul-after-midnight', title: 'Seoul After Midnight', ep: 2, badge: 'new'},
  {slug: 'wrong-billionaire', title: 'Married to the Wrong Billionaire', ep: 11, coins: 60},
];

const REELS = [
  [0, 2, 4, 6, 8],
  [1, 3, 5, 7, 9],
  [5, 0, 9, 2, 7],
];

const PROMISES = [
  {icon: 'coin', title: 'Price shown before every unlock', text: 'In coins and in the viewer’s own money.'},
  {icon: 'shield', title: 'Price lock per viewer', text: 'Once a series is started, its price can’t rise for them.'},
  {icon: 'bolt', title: 'Auto-unlock off by default', text: 'And always held to the daily spend limit.'},
  {icon: 'crown', title: 'VIP without surprises', text: 'No free trial that turns into a charge, a reminder before renewal.'},
];

const ICON_PATHS = [
  'M8 5v14l11-7z',
  'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4v10',
  'M12 21s-7-4.4-9.3-8.6C1 9.1 2.8 5 6.6 5c2.1 0 3.6 1.2 5.4 3.2C13.8 6.2 15.3 5 17.4 5 21.2 5 23 9.1 21.3 12.4 19 16.6 12 21 12 21z',
];

function useCursorBurst(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let last = {x: 0, y: 0};
    let budget = 0;
    const spawn = (x, y, vx = 0, vy = 0) => {
      const node = document.createElement('span');
      const kind = Math.floor(Math.random() * ICON_PATHS.length);
      const size = 12 + Math.random() * 8;
      const color = kind === 1 ? '#f2c25b' : kind === 2 ? '#ff4f6e' : '#c6eb3b';
      node.className = styles.burst;
      node.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${kind === 1 ? 'none' : color}" stroke="${color}" stroke-width="${kind === 1 ? 2 : 0}"><path d="${ICON_PATHS[kind]}"/></svg>`;
      const a = Math.random() * Math.PI * 2;
      const d = 6 + Math.random() * 18;
      node.style.left = `${x + Math.cos(a) * d}px`;
      node.style.top = `${y + Math.sin(a) * d}px`;
      document.body.appendChild(node);
      requestAnimationFrame(() => {
        node.style.transform = `translate(${(Math.random() - 0.5) * 60 + vx}px, ${-30 - Math.random() * 50 + vy}px) rotate(${(Math.random() - 0.5) * 160}deg) scale(1)`;
        node.style.opacity = '0';
      });
      setTimeout(() => node.remove(), 900);
    };
    const onMove = (e) => {
      const vx = e.clientX - last.x;
      const vy = e.clientY - last.y;
      last = {x: e.clientX, y: e.clientY};
      budget += Math.hypot(vx, vy);
      if (budget > 46) {
        budget = 0;
        spawn(e.clientX, e.clientY, vx * 0.6, vy * 0.6);
      }
    };
    const onEnter = (e) => {
      last = {x: e.clientX, y: e.clientY};
      for (let i = 0; i < 6; i += 1) setTimeout(() => spawn(e.clientX, e.clientY), i * 45);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
    };
  }, [ref]);
}

function Hero() {
  const ref = useRef(null);
  useCursorBurst(ref);
  const logo = useBaseUrl('/img/brand/logo-dark-lg.png');
  const posterBase = useBaseUrl('/img/hero/');
  return (
    <header ref={ref} className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.reels} aria-hidden="true">
        {REELS.map((list, c) => (
          <div key={c} className={clsx(styles.reel, styles[`reel${c}`])}>
            {[...list, ...list].map((index, i) => {
              const p = POSTERS[index];
              return (
                <span key={i} className={styles.poster} style={{backgroundImage: `url(${posterBase}${p.slug}.jpg)`}}>
                  <i className={styles.posterShade} />
                  {p.badge === 'free' && <i className={styles.posterFree}>Free</i>}
                  {p.badge === 'new' && <i className={styles.posterNew}>New</i>}
                  {p.coins && <i className={styles.posterCoin}>{p.coins}</i>}
                  <b className={styles.posterTitle}>{p.title}</b>
                  <i className={styles.posterEp}>E{p.ep}</i>
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <div className={clsx('container', styles.heroInner)}>
        <img className={styles.heroLogo} src={logo} alt="eDrama" width="270" height="63" />
        <p className={styles.eyebrow}>
          <span className={styles.liveDot} /> Documentation
        </p>
        <h1 className={styles.headline}>
          Every scene of eDrama,
          <br />
          <em>explained.</em>
        </h1>
        <p className={styles.sub}>
          Install the server, publish your branded app, run the Admin Panel and the Creator Portal, and set up coins, VIP and ads. Written step by step, with
          every screen marked and explained.
        </p>
        <div className={styles.ctas}>
          <Link className={styles.ctaPrimary} to="/docs/getting-started/launch-checklist/">
            Start the launch checklist <span aria-hidden="true">→</span>
          </Link>
          <Link className={styles.ctaGhost} to="/docs/intro/">
            What is eDrama?
          </Link>
        </div>
        <p className={styles.searchHint}>
          Looking for something? Press <kbd>Ctrl</kbd> + <kbd>K</kbd> (<kbd>⌘</kbd> + <kbd>K</kbd> on a Mac) to search every page.
        </p>
      </div>
    </header>
  );
}

function PathCards() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className={styles.kicker}>Choose your path</p>
        <h2 className={styles.h2}>Where do you want to start?</h2>
        <div className={styles.grid}>
          {PATHS.map((p, i) => (
            <Link key={p.title} to={p.to} className={styles.pathCard} style={{animationDelay: `${0.06 * i}s`}}>
              <span className={clsx(styles.pathIcon, p.tone && styles[`tone_${p.tone}`])}>
                <Icon name={p.icon} size={22} />
              </span>
              <span className={styles.pathTitle}>{p.title}</span>
              <span className={styles.pathText}>{p.text}</span>
              <span className={styles.pathGo}>
                Open guide <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <p className={styles.kicker}>How it fits together</p>
        <h2 className={styles.h2}>One server, three ways in.</h2>
        <p className={styles.lead}>
          Your server runs the Admin Panel, the Creator Portal and the API. The mobile app, the creators and your team all reach the same data, so a price changed
          in the panel is the price viewers see.
        </p>
        <div className={styles.arch}>
          <div className={clsx(styles.node, styles.nodeApp)}>
            <Icon name="phone" />
            <strong>Viewer app</strong>
            <span>Android & iOS</span>
          </div>
          <div className={styles.link} aria-hidden="true">
            <span />
          </div>
          <div className={clsx(styles.node, styles.nodeCore)}>
            <Icon name="server" />
            <strong>Your server</strong>
            <span>Admin Panel · API · Creator Portal</span>
          </div>
          <div className={styles.link} aria-hidden="true">
            <span />
          </div>
          <div className={clsx(styles.node, styles.nodeCreator)}>
            <Icon name="creator" />
            <strong>Creators & team</strong>
            <span>in the browser</span>
          </div>
        </div>
        <div className={styles.services}>
          {SERVICES.map((s) => (
            <span key={s} className={styles.service}>
              {s}
            </span>
          ))}
        </div>
        <div className={styles.archLinks}>
          <Link to="/docs/getting-started/how-it-works/">How eDrama works →</Link>
          <Link to="/docs/integrations/overview/">All integrations →</Link>
        </div>
      </div>
    </section>
  );
}

function Promises() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className={styles.kicker}>Fair pricing, built in</p>
        <h2 className={styles.h2}>The rules your viewers can trust.</h2>
        <div className={styles.promises}>
          {PROMISES.map((p) => (
            <div key={p.title} className={styles.promise}>
              <span className={styles.promiseIcon}>
                <Icon name={p.icon} />
              </span>
              <strong>{p.title}</strong>
              <span>{p.text}</span>
            </div>
          ))}
        </div>
        <Link className={styles.inlineLink} to="/docs/monetization/fair-play-rules/">
          Read every fair-play rule →
        </Link>
      </div>
    </section>
  );
}

function HelpRow() {
  const items = [
    {title: 'FAQs', text: 'Quick answers to the questions buyers ask most.', to: '/docs/help/faqs/', icon: 'help'},
    {title: 'Troubleshooting', text: 'Symptoms, causes and the fix, step by step.', to: '/docs/help/troubleshooting/', icon: 'settings'},
    {title: 'Support', text: 'How to reach WRTeam and what to send us.', to: '/docs/help/support/', icon: 'users'},
  ];
  return (
    <section className={clsx(styles.section, styles.sectionHelp)}>
      <div className="container">
        <div className={styles.helpGrid}>
          {items.map((it) => (
            <Link key={it.title} to={it.to} className={styles.helpCard}>
              <Icon name={it.icon} />
              <span>
                <strong>{it.title}</strong>
                <em>{it.text}</em>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout title="Documentation" description="The complete guide to eDrama: server installation, the mobile app, the Admin Panel, the Creator Portal and monetization.">
      <Hero />
      <main>
        <PathCards />
        <Architecture />
        <Promises />
        <HelpRow />
      </main>
    </Layout>
  );
}
