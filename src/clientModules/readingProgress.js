/**
 * A slim reading-progress bar under the navbar on documentation pages.
 * Pure DOM, so it costs nothing on pages without long content and never blocks rendering.
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

let bar = null;
let ticking = false;

function measure() {
  ticking = false;
  if (!bar) return;
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  bar.style.transform = `scaleX(${progress})`;
  bar.dataset.visible = max > 400 ? 'true' : 'false';
}

function onScroll() {
  if (!ticking) {
    ticking = true;
    window.requestAnimationFrame(measure);
  }
}

function ensureBar() {
  if (bar) return;
  bar = document.createElement('div');
  bar.className = 'ed-reading-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  window.addEventListener('scroll', onScroll, {passive: true});
  window.addEventListener('resize', onScroll, {passive: true});
}

export function onRouteDidUpdate({location}) {
  if (!ExecutionEnvironment.canUseDOM) return;
  ensureBar();
  bar.dataset.page = location.pathname.includes('/docs/') ? 'doc' : 'other';
  // Content (and lazy screenshots) settle after the route change.
  window.requestAnimationFrame(measure);
  window.setTimeout(measure, 400);
}
