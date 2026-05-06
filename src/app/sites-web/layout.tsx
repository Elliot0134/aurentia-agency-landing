// src/app/sites-web/layout.tsx
// No metadata here: each child page sets its own via pageMeta() helper, which
// keeps the root title template "%s | Aurentia Agency" applied uniformly.
export default function SitesWebLayout({ children }: { children: React.ReactNode }) {
  return children;
}
