'use client';

export interface NavItem {
  label: string;
  target: string;
}

export interface NavBarProps {
  items: NavItem[];
}

export default function NavBar({ items }: NavBarProps) {
  if (items.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', `#${target}`);
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6 overflow-x-auto">
        {items.map((item, i) => (
          <a
            key={i}
            href={`#${item.target}`}
            onClick={(e) => handleClick(e, item.target)}
            className="text-slate-700 hover:text-blue-600 font-medium whitespace-nowrap transition-colors text-sm"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
