import React, { useMemo, useState } from 'react';
import styles from './styles.module.css';

/**
 * Mirrors the backend's monthly creator report:
 *   net money         = paid coins × coin value × (1 − store fee ÷ 100)
 *   creator's money   = paid coins × share ÷ 100 × coin value × (1 − store fee ÷ 100)
 * Bonus coins earn nothing. Ad and VIP money come from pools the platform fills in,
 * split by verified ad unlocks and by VIP minutes on locked episodes.
 */

const REGIONS = {
  GLOBAL: { label: 'Global (USD)', currency: 'USD', coinValue: 0.0099 },
  IN: { label: 'India (INR)', currency: 'INR', coinValue: 0.29 },
  CUSTOM: { label: 'My own coin value', currency: 'USD', coinValue: 0.01 },
};

const OWNERS = {
  creator: { label: 'A creator', note: 'Their own share, or the Default creator share (50%).', share: 50 },
  licensed: { label: 'A licensor', note: "The licensor's share from your contract (30% is only an example).", share: 30 },
  original: { label: 'You (your own series)', note: 'No one shares it: you keep all the net money.', share: 0 },
};

function money(value, currency) {
  if (!Number.isFinite(value)) return '-';
  try {
    return new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}

function num(value) {
  return new Intl.NumberFormat('en').format(Math.round(value));
}

function Field({ label, hint, value, onChange, min = 0, max, step = 1, suffix, slider = true }) {
  const id = label.replace(/\W+/g, '-').toLowerCase();
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {hint && <span className={styles.hint}>{hint}</span>}
      </label>
      <div className={styles.inputRow}>
        {slider && max !== undefined && (
          <input
            className={styles.range}
            type="range"
            min={min}
            max={max}
            step={step}
            value={Math.min(value, max)}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-label={label}
          />
        )}
        <div className={styles.numberWrap}>
          <input
            id={id}
            className={styles.number}
            type="number"
            min={min}
            step={step}
            value={value}
            onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
          />
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
      </div>
    </div>
  );
}

export default function EarningsCalculator() {
  const [regionKey, setRegionKey] = useState('GLOBAL');
  const [customValue, setCustomValue] = useState(0.01);
  const [customCurrency, setCustomCurrency] = useState('USD');
  const [owner, setOwner] = useState('creator');
  const [share, setShare] = useState(OWNERS.creator.share);
  const [price, setPrice] = useState(60);
  const [unlocks, setUnlocks] = useState(5000);
  const [bonusPercent, setBonusPercent] = useState(30);
  const [passes, setPasses] = useState(40);
  const [passPrice, setPassPrice] = useState(1200);
  const [fee, setFee] = useState(15);
  const [pools, setPools] = useState(false);
  const [adPool, setAdPool] = useState(500);
  const [adShare, setAdShare] = useState(10);
  const [vipPool, setVipPool] = useState(1000);
  const [vipShare, setVipShare] = useState(5);

  const region = REGIONS[regionKey];
  const coinValue = regionKey === 'CUSTOM' ? customValue : region.coinValue;
  const currency = regionKey === 'CUSTOM' ? customCurrency || 'USD' : region.currency;
  const creatorShare = owner === 'original' ? 0 : share;

  const result = useMemo(() => {
    const unlockCoins = unlocks * price;
    const bonusCoins = unlockCoins * (bonusPercent / 100);
    const paidUnlockCoins = unlockCoins - bonusCoins;
    const passCoins = passes * passPrice;
    const paidCoins = paidUnlockCoins + passCoins;
    const gross = paidCoins * coinValue;
    const storeFees = gross * (fee / 100);
    const net = gross - storeFees;
    const creatorCoins = net * (creatorShare / 100);
    const adPart = pools ? adPool * (adShare / 100) : 0;
    const vipPart = pools ? vipPool * (vipShare / 100) : 0;
    const poolCreator = (adPart + vipPart) * (creatorShare / 100);
    const creatorTotal = creatorCoins + poolCreator;
    const platformTotal = net - creatorCoins + (adPart + vipPart - poolCreator);
    return {
      unlockCoins,
      bonusCoins,
      paidCoins,
      gross,
      storeFees,
      net,
      creatorCoins,
      adPart,
      vipPart,
      poolCreator,
      creatorTotal,
      platformTotal,
    };
  }, [unlocks, price, bonusPercent, passes, passPrice, coinValue, fee, creatorShare, pools, adPool, adShare, vipPool, vipShare]);

  const total = result.storeFees + result.creatorTotal + result.platformTotal;
  const part = (v) => (total > 0 ? `${Math.max(0, (v / total) * 100)}%` : '0%');

  return (
    <div className={styles.calc}>
      <div className={styles.inputs}>
        <fieldset className={styles.group}>
          <legend>Region</legend>
          <div className={styles.segments} role="radiogroup" aria-label="Region">
            {Object.entries(REGIONS).map(([key, r]) => (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={regionKey === key}
                className={styles.segment}
                onClick={() => setRegionKey(key)}
              >
                {r.label}
              </button>
            ))}
          </div>
          {regionKey === 'CUSTOM' ? (
            <div className={styles.twoCols}>
              <Field label="Coin value" hint="One coin in money" value={customValue} onChange={setCustomValue} step={0.0001} slider={false} />
              <div className={styles.field}>
                <label htmlFor="ed-currency" className={styles.label}>
                  Currency<span className={styles.hint}>ISO code, such as EUR</span>
                </label>
                <input
                  id="ed-currency"
                  className={styles.text}
                  maxLength={3}
                  value={customCurrency}
                  onChange={(e) => setCustomCurrency(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                />
              </div>
            </div>
          ) : (
            <p className={styles.note}>
              1 coin = <strong>{coinValue}</strong> {currency} (the value eDrama starts with)
            </p>
          )}
        </fieldset>

        <fieldset className={styles.group}>
          <legend>Who owns the series?</legend>
          <div className={styles.segments} role="radiogroup" aria-label="Owner">
            {Object.entries(OWNERS).map(([key, o]) => (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={owner === key}
                className={styles.segment}
                onClick={() => {
                  setOwner(key);
                  if (key !== 'original') setShare(OWNERS[key].share);
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
          <p className={styles.note}>{OWNERS[owner].note}</p>
          {owner !== 'original' && (
            <Field label={owner === 'creator' ? 'Creator share' : 'Licensor share'} value={share} onChange={(v) => setShare(Math.min(100, v))} max={100} suffix="%" />
          )}
        </fieldset>

        <fieldset className={styles.group}>
          <legend>One month of the series</legend>
          <Field label="Coin price per episode" hint="Creators: 30 to 90 by default" value={price} onChange={setPrice} min={1} max={200} suffix="coins" />
          <Field label="Episodes unlocked with coins" value={unlocks} onChange={setUnlocks} max={100000} step={100} />
          <Field label="Paid with bonus coins" hint="Bonus coins earn nothing" value={bonusPercent} onChange={(v) => setBonusPercent(Math.min(100, v))} max={100} suffix="%" />
          <Field label="Series Passes sold" value={passes} onChange={setPasses} max={2000} step={5} />
          <Field label="Series Pass price" value={passPrice} onChange={setPassPrice} max={5000} step={50} suffix="coins" />
          <Field label="Store fee" hint="Google Play and App Store: 15% by default" value={fee} onChange={(v) => setFee(Math.min(100, v))} max={30} suffix="%" />
        </fieldset>

        <fieldset className={styles.group}>
          <legend>
            <label className={styles.toggle}>
              <input type="checkbox" checked={pools} onChange={(e) => setPools(e.target.checked)} />
              Add ad and VIP money
            </label>
          </legend>
          <p className={styles.note}>
            Ad and VIP money isn't per unlock: your finance team fills in a monthly pool per region from the AdMob and store reports, and
            the report splits it by verified ad unlocks and by VIP minutes on locked episodes. Here the series' part is shared at the same percent as coins.
          </p>
          {pools && (
            <>
              <Field label="Ad pool this month" value={adPool} onChange={setAdPool} max={20000} step={50} suffix={currency} />
              <Field label="This series' share of verified ad unlocks" value={adShare} onChange={(v) => setAdShare(Math.min(100, v))} max={100} suffix="%" />
              <Field label="VIP pool this month" value={vipPool} onChange={setVipPool} max={50000} step={100} suffix={currency} />
              <Field label="This series' share of VIP minutes" value={vipShare} onChange={(v) => setVipShare(Math.min(100, v))} max={100} suffix="%" />
            </>
          )}
        </fieldset>
      </div>

      <div className={styles.results} aria-live="polite">
        <div className={styles.sticky}>
          <p className={styles.resultsTitle}>This month</p>
          <div className={styles.bar} aria-hidden="true">
            <span className={styles.barFee} style={{ width: part(result.storeFees) }} />
            <span className={styles.barCreator} style={{ width: part(result.creatorTotal) }} />
            <span className={styles.barPlatform} style={{ width: part(result.platformTotal) }} />
          </div>
          <dl className={styles.list}>
            <div>
              <dt>Coins spent on unlocks</dt>
              <dd>{num(result.unlockCoins)}</dd>
            </div>
            <div className={styles.muted}>
              <dt>of which bonus coins (earn nothing)</dt>
              <dd>{num(result.bonusCoins)}</dd>
            </div>
            <div>
              <dt>Paid coins, with Series Passes</dt>
              <dd>{num(result.paidCoins)}</dd>
            </div>
            <div>
              <dt>Gross money</dt>
              <dd>{money(result.gross, currency)}</dd>
            </div>
            <div>
              <dt>
                <span className={styles.dotFee} /> Store fees
              </dt>
              <dd>{money(result.storeFees, currency)}</dd>
            </div>
            <div>
              <dt>Net money from coins</dt>
              <dd>{money(result.net, currency)}</dd>
            </div>
            {pools && (
              <div>
                <dt>Series' part of the ad and VIP pools</dt>
                <dd>{money(result.adPart + result.vipPart, currency)}</dd>
              </div>
            )}
          </dl>
          <div className={styles.totals}>
            <div className={styles.total}>
              <span>
                <span className={styles.dotCreator} /> {owner === 'licensed' ? 'Licensor earns' : 'Creator earns'}
              </span>
              <strong>{money(result.creatorTotal, currency)}</strong>
            </div>
            <div className={styles.total}>
              <span>
                <span className={styles.dotPlatform} /> You keep
              </span>
              <strong>{money(result.platformTotal, currency)}</strong>
            </div>
          </div>
          <p className={styles.small}>
            Before your own costs (hosting, video, payment taxes). Store fees vary by store and programme; use the fees you actually pay.
          </p>
        </div>
      </div>
    </div>
  );
}
