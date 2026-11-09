import React, { useEffect } from 'react';

/** Adds a thin reading-progress bar under the navbar on long pages. */
export default function Root({ children }) {
  useEffect(() => {
    const bar = document.createElement('div');
    bar.className = 'ed-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 200 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      bar.remove();
    };
  }, []);
  return <>{children}</>;
}
