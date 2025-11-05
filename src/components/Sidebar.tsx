import React from 'react';
import { Home, MessageSquare, User, ChevronRight, Eye, MessageCircle, LogOut } from 'lucide-react';
import { NavigationItem } from '../types';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: 'student' | 'admin';
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, userRole, onLogout }) => {
  const studentNavigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', icon: 'Home', path: 'home' },
    { id: 'complaint-box', label: 'Complaint Box', icon: 'MessageSquare', path: 'complaint-box' },
    { id: 'public-dashboard', label: 'Public Dashboard', icon: 'Eye', path: 'public-dashboard' },
    { id: 'feedback-module', label: 'Feedback Module', icon: 'MessageCircle', path: 'feedback-module' },
  ];

  const adminNavigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', icon: 'Home', path: 'home' },
    { id: 'profile', label: 'Admin Profile', icon: 'User', path: 'profile' },
  ];

  const navigationItems = userRole === 'admin' ? adminNavigationItems : studentNavigationItems;

  const getIcon = (iconName: string) => {
    const icons = {
      Home: Home,
      MessageSquare: MessageSquare,
      User: User,
      Eye: Eye,
      MessageCircle: MessageCircle,
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
  };

  return (
    <aside className="bg-gray-50 border-r border-gray-200 w-64 min-h-screen flex flex-col">
      <div className="p-6 flex-1">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.path)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-all duration-200 group ${
                currentPage === item.path
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                {getIcon(item.icon)}
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight 
                className={`w-4 h-4 transition-transform ${
                  currentPage === item.path ? 'rotate-90' : 'group-hover:translate-x-1'
                }`} 
              />
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-6 mt-auto">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-800 font-medium mb-1">
            {userRole === 'admin' ? 'Admin Panel' : 'Need Help?'}
          </p>
          <p className="text-xs text-blue-600">
            {userRole === 'admin' ? 'System Management' : 'Contact admin for assistance'}
          </p>
          <button 
            onClick={userRole === 'admin' ? () => alert('Admin Features:\n• Manage Complaints\n• View Analytics\n• System Settings\n• User Management') : () => alert('Admin Contact: admin@sits.edu.in\nPhone: +91 8734 290 290\nOffice Hours: 9 AM - 5 PM')}
            className="mt-2 w-full bg-blue-600 text-white py-1 px-3 rounded text-xs hover:bg-blue-700 transition-colors mb-2"
          >
            {userRole === 'admin' ? 'Admin Tools' : 'Contact Admin'}
          </button>
          <button 
            onClick={onLogout}
            className="w-full bg-red-600 text-white py-1 px-3 rounded text-xs hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <LogOut className="w-3 h-3 mr-1" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;