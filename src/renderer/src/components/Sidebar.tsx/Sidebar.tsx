import { useState } from 'react';
import styles from './Sidebar.module.css';
import { Home, User, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import NavLink from '../NavLink/NavLink';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((value) => !value);
  };

  const menuItems = [
    { name: 'تردد', href: '/', icon: <Home size={21} /> },
    { name: 'لاکر', href: '/Lockers', icon: <User size={21} /> },
  ];

  return (
    <div
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}  bg-info h-screen flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="border-b border-base-300 flex items-center justify-between p-4">
        {!collapsed && <h1 className="font-bold text-xl">روزنگار یوجیم</h1>}
        <button
          onClick={toggleSidebar}
          className="btn btn-ghost btn-sm rounded-full"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1">
        <ul className="menu p-4 w-full">
          {menuItems.map((item) => (
            <li className="mb-3" key={item.name}>
              <NavLink href={item.href} className={`flex items-center text-lg `}>
                <span className="mr-3">{item.icon}</span>
                {!collapsed && item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="border-base-300 border-t p-4">
        {!collapsed ? (
          <button className="btn btn-primary w-full">
            <Plus size={20} className="mr-2" />
            New Project
          </button>
        ) : (
          <button className="btn btn-circle btn-ghost">
            <Plus size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
