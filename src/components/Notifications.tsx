import React from 'react';
import { Bell, X, AlertCircle, CheckCircle, Info, Clock } from 'lucide-react';
import { Complaint } from '../types';

interface NotificationsProps {
  onClose: () => void;
  complaints: Complaint[];
}

const Notifications: React.FC<NotificationsProps> = ({ onClose, complaints }) => {
  const recentComplaints = complaints.slice(0, 3);
  const pendingCount = complaints.filter(c => c.status === 'Pending').length;
  const resolvedToday = complaints.filter(c => 
    c.status === 'Resolved' && 
    new Date(c.created_at).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }) === new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  ).length;

  const notifications = [
    {
      id: 1,
      type: 'info',
      title: `${recentComplaints.length} New Complaints`,
      message: `Latest: ${recentComplaints[0]?.subject || 'No recent complaints'} - ${recentComplaints[0]?.issueType || ''}`,
      time: '2 minutes ago',
      icon: Info,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 2,
      type: 'warning',
      title: `${pendingCount} Pending Complaints`,
      message: `${pendingCount} complaints require immediate attention and review.`,
      time: '1 hour ago',
      icon: AlertCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      id: 3,
      type: 'success',
      title: `${resolvedToday} Resolved Today`,
      message: `${resolvedToday} complaints have been successfully resolved today.`,
      time: '3 hours ago',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 4,
      type: 'info',
      title: 'System Status: Online',
      message: `Total complaints: ${complaints.length}. All systems operational.`,
      time: '6 hours ago',
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Weekly Report Due',
      message: 'Weekly complaint analysis report generation is scheduled for tomorrow.',
      time: '1 day ago',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{notifications.length}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${notification.bgColor} ${notification.borderColor} hover:shadow-sm transition-shadow`}
            >
              <div className="flex items-start space-x-3">
                <notification.icon className={`w-5 h-5 mt-0.5 ${notification.color}`} />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {notification.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;