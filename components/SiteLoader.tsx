/**
 * Welcome loader shown for about a second on a full page load. Pure CSS: it fades itself out
 * even if scripts are slow or blocked, never covers the page afterwards, and is skipped for
 * people who prefer reduced motion. The page content is already in the HTML, so search engines
 * and screen readers are not affected.
 */
export function SiteLoader() {
  return (
    <div className="site-loader" aria-hidden="true">
      <div className="site-loader__glow" />
      <div className="site-loader__center">
        <div className="site-loader__mark">
          <svg viewBox="0 0 120 120" className="site-loader__ring">
            <circle cx="60" cy="60" r="54" className="site-loader__track" />
            <circle cx="60" cy="60" r="54" className="site-loader__arc" />
          </svg>
          <span className="site-loader__e">e</span>
        </div>
        <div className="site-loader__word" dir="ltr">Portal</div>
        <div className="site-loader__bar"><span /></div>
      </div>
    </div>
  );
}
