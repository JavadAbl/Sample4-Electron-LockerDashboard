import { Link, useLocation } from 'wouter';

export default function NavLink({ href, children, className = '' }) {
  const [location] = useLocation();

  const isActive = location === href;

  const combinedClassName = `${className} ${isActive ? 'bg-base-200' : ''}`.trim();

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
}
