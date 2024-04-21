import { NavLink } from 'react-router-dom';

interface NavItemProps {
  children: React.ReactNode;
  to: string;
}

export default function NavItem(props: NavItemProps) {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) => {
        return isActive
          ? 'bg-blue-300 hover:no-underline focus:no-underline active:no-underline no-underline group inline-flex h-10 w-max items-center justify-center bg-background px-4 py-2 transition-colors  disabled:pointer-events-none disabled:opacity-50 text-black rounded-xl font-roboto'
          : 'bg-blue-400 hover:bg-blue-300 group inline-flex h-10 w-max items-center justify-center bg-background px-4 py-2 transition-colors  disabled:pointer-events-none disabled:opacity-50 text-black rounded-xl font-roboto';
      }}
    >
      <span className='text-black'>{props.children}</span>
    </NavLink>
  );
}
