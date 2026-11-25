import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * One month of a series' paid unlocks, split between the stores, the creator (or licensor) and the platform,
 * with the same formula as the monthly creator report:
 *   net money     = paid coins × paid coin value × (1 − store fee ÷ 100)
 *   creator money = net money × creator share ÷ 100
 * Starting values are eDrama's defaults.
 */
const REGIONS = [
  {code: 'GLOBAL', label: 'Global · USD', currency: 'USD', coinValue: 0.0099},
  {code: 'IN', label: 'India · INR', currency: 'INR', coinValue: 0.29},
  {code: 'CUSTOM', label: 'Your own', currency: '', coinValue: null},
];

function Field({label, hint, value, onChange, min, max, step, suffix, slider = true}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldHead}>
        <span className={styles.fieldLabel}>{label}</span>
        <span className={styles.fieldValue}>
          <input
            type="number"
            inputMode="decimal"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          />
          {suffix && <em>{suffix}</em>}
        </span>
      </span>
      {slider && (
        <input
          className={styles.range}
          type="range"
          min={min}
          max={max}
          step={step}
          value={Number(value) || 0}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{'--fill': `${(100 * ((Number(value) || 0) - min)) / (max - min)}%`}}
        />
      )}
      {hint && <span className={styles.hint}>{hint}</span>}
    </label>
  );
}

export default function EarningsCalculator() {
  const [region, setRegion] = useState('GLOBAL');
  const [customValue, setCustomValue] = useState(0.01);
  const [customCurrency, setCustomCurrency] = useState('EUR');
  const [price, setPrice] = useState(60);
  const [unlocks, setUnlocks] = useState(1000);
  const [passCoins, setPassCoins] = useState(0);
  const [fee, setFee] = useState(15);
  const [share, setShare] = useState(50);

  const r = REGIONS.find((x) => x.code === region);
  const coinValue = r.coinValue ?? (Number(customValue) || 0);
  const currency = r.currency || customCurrency || '';

  const result = useMemo(() => {
    const coins = (Number(unlocks) || 0) * (Number(price) || 0) + (Number(passCoins) || 0);
    const gross = coins * coinValue;
    const storeFee = gross * ((Number(fee) || 0) / 100);
    const net = gross - storeFee;
    const creator = net * ((Number(share) || 0) / 100);
    const platform = net - creator;
    return {coins, gross, storeFee, net, creator, platform};
  }, [unlocks, price, passCoins, coinValue, fee, share]);

  const fmt = (n) =>
    `${n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}${currency ? ` ${currency}` : ''}`;
  const pct = (n) => (result.gross > 0 ? (100 * n) / result.gross : 0);

  return (
    <div className={styles.calc}>
      <div className={styles.inputs}>
        <div className={styles.regions} role="radiogroup" aria-label="Region">
          {REGIONS.map((x) => (
            <button
              key={x.code}
              type="button"
              role="radio"
              aria-checked={region === x.code}
              className={clsx(styles.region, region === x.code && styles.regionOn)}
              onClick={() => setRegion(x.code)}
            >
              {x.label}
            </button>
          ))}
        </div>
        {region === 'CUSTOM' && (
          <div className={styles.customRow}>
            <Field label="Coin value" value={customValue} onChange={setCustomValue} min={0.0001} max={1} step={0.0001} slider={false} hint="What one coin is worth in your currency." />
            <label className={styles.field}>
              <span className={styles.fieldHead}>
                <span className={styles.fieldLabel}>Currency</span>
                <span className={styles.fieldValue}>
                  <input type="text" maxLength={3} value={customCurrency} onChange={(e) => setCustomCurrency(e.target.value.toUpperCase())} />
                </span>
              </span>
            </label>
          </div>
        )}
        <Field label="Coin price per episode" value={price} onChange={setPrice} min={1} max={200} step={1} suffix="coins" hint="Creators choose 30 to 90 coins by default." />
        <Field label="Paid unlocks this month" value={unlocks} onChange={setUnlocks} min={0} max={100000} step={100} hint="Episodes unlocked with paid coins. Bonus coins earn nothing." />
        <Field label="Series Pass paid coins" value={passCoins} onChange={setPassCoins} min={0} max={500000} step={500} suffix="coins" hint="Optional: paid coins spent on this series' Series Pass." />
        <Field label="Store fee" value={fee} onChange={setFee} min={0} max={30} step={1} suffix="%" hint="Google Play and App Store: 15% by default (Settings › Payments)." />
        <Field label="Creator share" value={share} onChange={setShare} min={0} max={100} step={1} suffix="%" hint="Default creator share is 50%. A licensed title uses its licensor share." />
      </div>

      <div className={styles.output} aria-live="polite">
        <span className={styles.outLabel}>Paid coins this month</span>
        <strong className={styles.coins}>{result.coins.toLocaleString()} coins</strong>
        <span className={styles.sub}>× {coinValue.toLocaleString(undefined, {maximumFractionDigits: 6})} {currency} per coin = {fmt(result.gross)} gross</span>

        <div className={styles.split} aria-hidden="true">
          <i className={styles.segFee} style={{width: `${pct(result.storeFee)}%`}} />
          <i className={styles.segCreator} style={{width: `${pct(result.creator)}%`}} />
          <i className={styles.segYou} style={{width: `${pct(result.platform)}%`}} />
        </div>

        <ul className={styles.rows}>
          <li>
            <span className={clsx(styles.dot, styles.dotFee)} /> Store fees ({Number(fee) || 0}%)
            <b>{fmt(result.storeFee)}</b>
          </li>
          <li className={styles.rowNet}>
            Net money
            <b>{fmt(result.net)}</b>
          </li>
          <li>
            <span className={clsx(styles.dot, styles.dotCreator)} /> Creator ({Number(share) || 0}%)
            <b>{fmt(result.creator)}</b>
          </li>
          <li className={styles.rowYou}>
            <span className={clsx(styles.dot, styles.dotYou)} /> You keep
            <b>{fmt(result.platform)}</b>
          </li>
        </ul>
        <p className={styles.note}>Assumes full-price packs and no refunds. Ads and VIP are shared separately, from monthly pools.</p>
      </div>
    </div>
  );
}
