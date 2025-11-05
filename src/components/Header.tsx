import React from 'react';
import { GraduationCap, Bell, User } from 'lucide-react';
import { AdminProfile, SystemSettings } from '../types';

interface HeaderProps {
  currentPage: string;
  onShowNotifications: () => void;
  onNavigate: (page: string) => void;
  adminProfile: AdminProfile;
  systemSettings: SystemSettings;
  userRole: 'student' | 'admin';
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onShowNotifications, onNavigate, adminProfile, systemSettings, userRole, userName }) => {

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{systemSettings.siteName}</h1>
              <p className="text-sm text-gray-600">Real-time Complaint Management System</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900 capitalize">{currentPage}</p>
            <p className="text-xs text-gray-500">
              Logged in as: {userName} ({userRole === 'admin' ? 'Administrator' : 'Student'})
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={onShowNotifications}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative"
              title="View Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            {userRole === 'admin' && (
              <button 
                onClick={() => onNavigate('profile')}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Admin Profile"
              >
                <User className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;