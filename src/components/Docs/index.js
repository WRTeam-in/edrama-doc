import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/**
 * Numbered steps with a connecting line. Wrap an ordered Markdown list:
 *
 *   <Steps>
 *
 *   1. **Open Settings.** ...
 *   2. **Save.** ...
 *
 *   </Steps>
 */
export function Steps({children}) {
  return <div className={styles.steps}>{children}</div>;
}

/**
 * Where something is in a panel, as clickable-looking chips:
 *   <Path panel="admin">Settings › Branding</Path>
 */
export function Path({children, panel = 'admin'}) {
  const text = React.Children.toArray(children).join('');
  const parts = text.split('›').map((p) => p.trim()).filter(Boolean);
  const label = {admin: 'Admin Panel', creator: 'Creator Portal', app: 'App', server: 'Server'}[panel] || panel;
  return (
    <span className={clsx(styles.path, styles[`path_${panel}`])}>
      <span className={styles.pathPanel}>{label}</span>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          <span className={styles.pathSep} aria-hidden="true">
            ›
          </span>
          <span className={styles.pathPart}>{p}</span>
        </React.Fragment>
      ))}
    </span>
  );
}

/** A small coloured label: <Pill tone="live">Live</Pill> */
export function Pill({children, tone = 'neutral'}) {
  return <span className={clsx(styles.pill, styles[`pill_${tone}`])}>{children}</span>;
}

/**
 * A status flow, such as a title's statuses:
 *   <Flow steps={['Draft', 'In review', 'Approved', 'Live']} />
 * A step can be {label, tone, note}.
 */
export function Flow({steps = [], caption}) {
  return (
    <div className={styles.flowWrap}>
      <ol className={styles.flow}>
        {steps.map((s, i) => {
          const step = typeof s === 'string' ? {label: s} : s;
          return (
            <li key={i} className={styles.flowItem} style={{animationDelay: `${i * 0.07}s`}}>
              <span className={clsx(styles.flowStep, step.tone && styles[`pill_${step.tone}`])}>{step.label}</span>
              {step.note && <span className={styles.flowNote}>{step.note}</span>}
            </li>
          );
        })}
      </ol>
      {caption && <p className={styles.flowCaption}>{caption}</p>}
    </div>
  );
}

const ICONS = {
  server: 'M4 4h16v6H4zM4 14h16v6H4zM7 7h.01M7 17h.01',
  phone: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2',
  studio: 'M3 5h18v12H3zM8 21h8M12 17v4',
  creator: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  viewer: 'M5 3l14 9-14 9V3z',
  coin: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v10M9 9.5h4.5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H15',
  plug: 'M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0V8zM12 18v4',
  help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01',
  check: 'M20 6 9 17l-5-5',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM20 17v4H6.5',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8z',
  film: 'M4 4h16v16H4zM8 4v16M16 4v16M4 9h4M4 15h4M16 9h4M16 15h4',
  crown: 'M3 18h18l-2-10-5 4-2-6-2 6-5-4-2 10z',
  gift: 'M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H8a2.5 2.5 0 1 1 0-5c3 0 4 5 4 5zM12 7h4a2.5 2.5 0 1 0 0-5c-3 0-4 5-4 5z',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M13.7 21a2 2 0 0 1-3.4 0',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z',
};

export function Icon({name, size = 20}) {
  const d = ICONS[name] || ICONS.book;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/**
 * A grid of linked cards:
 *   <Cards items={[{title, text, to, icon}]} />
 */
export function Cards({items = [], columns = 3}) {
  return (
    <div className={clsx(styles.cards, styles[`cols${columns}`])}>
      {items.map((c, i) => {
        // A card without a destination is a plain box: no arrow, no hover lift.
        const Tag = c.to ? Link : 'div';
        return (
          <Tag key={i} {...(c.to ? {to: c.to} : {})} className={clsx(styles.card, !c.to && styles.cardStatic)} style={{animationDelay: `${i * 0.05}s`}}>
            <span className={clsx(styles.cardIcon, c.tone && styles[`tone_${c.tone}`])}>
              <Icon name={c.icon} />
            </span>
            <span className={styles.cardTitle}>{c.title}</span>
            {c.text && <span className={styles.cardText}>{c.text}</span>}
            {c.to && (
              <span className={styles.cardArrow} aria-hidden="true">
                →
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
}

/** "Need a hand?" banner, the eDrama version of the reference site's install-service banner. */
export function HelpBanner({title = 'Want us to set it up for you?', text, to = '/docs/help/support/', cta = 'Contact support'}) {
  return (
    <aside className={styles.banner}>
      <div className={styles.bannerGlow} aria-hidden="true" />
      <img className={styles.bannerMark} src={require('@site/static/img/brand/mark-192.png').default} alt="" width="56" height="56" />
      <div className={styles.bannerBody}>
        <p className={styles.bannerTitle}>{title}</p>
        <p className={styles.bannerText}>
          {text || 'WRTeam can install the Admin Panel on your server, connect Firebase, the stores and AdMob, and publish your branded app.'}
        </p>
      </div>
      <Link className={styles.bannerCta} to={to}>
        {cta} <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}

/**
 * A compact "who can see this" block for permission-based screens.
 *   <Access area="Titles & episodes" view="See the list" edit="Create and change titles" />
 */
export function Access({area, view, edit, owner}) {
  return (
    <div className={styles.access}>
      <span className={styles.accessIcon}>
        <Icon name="shield" size={18} />
      </span>
      <div>
        <strong>Permission area: {area}</strong>
        <ul>
          {view && (
            <li>
              <Pill tone="neutral">View</Pill> {view}
            </li>
          )}
          {edit && (
            <li>
              <Pill tone="accent">Edit</Pill> {edit}
            </li>
          )}
          {owner && (
            <li>
              <Pill tone="vip">Owner</Pill> {owner}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

/** A labelled value row for defaults: <Defaults rows={[['Welcome bonus', '100 coins']]} /> */
export function Defaults({rows = [], title = 'Out of the box'}) {
  return (
    <div className={styles.defaults}>
      <p className={styles.defaultsTitle}>{title}</p>
      <dl>
        {rows.map(([k, v], i) => (
          <div key={i} className={styles.defaultsRow}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
