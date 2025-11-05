import React from 'react';
import { MessageSquare, FileText, Settings, Users, Download, Upload, RefreshCw, Shield, CheckCircle, AlertTriangle, Database, Server } from 'lucide-react';

interface QuickActionsProps {
  onNavigate: (page: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onNavigate }) => {
  const [showUserManagement, setShowUserManagement] = React.useState(false);
  const [showDataExport, setShowDataExport] = React.useState(false);
  const [showSystemRefresh, setShowSystemRefresh] = React.useState(false);
  const [showSecurityCenter, setShowSecurityCenter] = React.useState(false);

  const quickActions = [
    {
      title: 'Submit New Complaint',
      description: 'Quickly submit a new complaint to the system',
      icon: MessageSquare,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => onNavigate('complaint-box'),
      details: 'Submit complaints for infrastructure, academic, hostel, or other issues'
    },
    {
      title: 'View All Complaints',
      description: 'Access and manage all submitted complaints',
      icon: FileText,
      color: 'bg-emerald-600 hover:bg-emerald-700',
      action: () => onNavigate('view-complaints'),
      details: 'Filter, search, and update complaint statuses'
    },
    {
      title: 'Generate Reports',
      description: 'Create detailed reports and analytics',
      icon: Download,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => onNavigate('generate-report'),
      details: 'Export daily, weekly, or monthly complaint reports'
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences and options',
      icon: Settings,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => onNavigate('system-settings'),
      details: 'Manage users, notifications, and system configuration'
    },
    {
      title: 'User Management',
      description: 'Manage student and staff accounts',
      icon: Users,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      action: () => setShowUserManagement(!showUserManagement),
      details: 'Full control over user accounts and permissions'
    },
    {
      title: 'Data Export',
      description: 'Export system data in various formats',
      icon: Upload,
      color: 'bg-orange-600 hover:bg-orange-700',
      action: () => setShowDataExport(!showDataExport),
      details: 'Export complaint data in multiple formats'
    },
    {
      title: 'System Refresh',
      description: 'Refresh system cache and data',
      icon: RefreshCw,
      color: 'bg-teal-600 hover:bg-teal-700',
      action: () => setShowSystemRefresh(!showSystemRefresh),
      details: 'Refresh system components and clear cache'
    },
    {
      title: 'Security Center',
      description: 'Monitor and manage system security',
      icon: Shield,
      color: 'bg-red-600 hover:bg-red-700',
      action: () => setShowSecurityCenter(!showSecurityCenter),
      details: 'Comprehensive security monitoring and management'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Quick Actions</h2>
            <p className="text-blue-100">Perform common tasks quickly and efficiently</p>
          </div>
          <Settings className="w-16 h-16 text-blue-200" />
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <div className={`p-3 rounded-lg ${action.color.split(' ')[0]} bg-opacity-10`}>
                <action.icon className={`w-8 h-8 ${action.color.split(' ')[0].replace('bg-', 'text-')}`} />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{action.title}</h3>
            <p className="text-gray-600 text-sm mb-3 text-center">{action.description}</p>
            <p className="text-gray-500 text-xs mb-4 text-center">{action.details}</p>
            <button
              onClick={action.action}
              className={`w-full text-white py-2 px-4 rounded-lg font-medium transition-colors ${action.color}`}
            >
              Execute Action
            </button>
          </div>
        ))}
      </div>

      {/* User Management Details */}
      {showUserManagement && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">User Management Center</h3>
            <button 
              onClick={() => setShowUserManagement(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Account Management</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Total Users</span>
                  <span className="font-medium text-gray-900">1,247</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Active Students</span>
                  <span className="font-medium text-emerald-600">1,156</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Faculty Members</span>
                  <span className="font-medium text-blue-600">78</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Staff Members</span>
                  <span className="font-medium text-purple-600">13</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Recent Activities</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">New user registered</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Bulk import completed</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Password reset requested</p>
                    <p className="text-xs text-gray-500">3 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Export Details */}
      {showDataExport && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Data Export Center</h3>
            <button 
              onClick={() => setShowDataExport(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <FileText className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Export to PDF</p>
              <p className="text-sm text-gray-500">Formatted reports</p>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <Download className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Export to Excel</p>
              <p className="text-sm text-gray-500">Spreadsheet format</p>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Export to CSV</p>
              <p className="text-sm text-gray-500">Raw data format</p>
            </button>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Export Statistics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Total Records:</span>
                <span className="text-blue-900 font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Last Export:</span>
                <span className="text-blue-900 font-medium">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Refresh Details */}
      {showSystemRefresh && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">System Refresh Center</h3>
            <button 
              onClick={() => setShowSystemRefresh(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">System Components</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-gray-700">Web Server</span>
                  </div>
                  <span className="text-emerald-600 font-medium">Online</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-gray-700">Database</span>
                  </div>
                  <span className="text-emerald-600 font-medium">Online</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Refresh Actions</h4>
              <div className="space-y-2">
                <button className="w-full p-3 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors text-left">
                  <p className="font-medium text-teal-900">Clear Cache</p>
                  <p className="text-sm text-teal-700">Remove temporary files</p>
                </button>
                <button className="w-full p-3 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors text-left">
                  <p className="font-medium text-teal-900">Reload Configurations</p>
                  <p className="text-sm text-teal-700">Update system settings</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Center Details */}
      {showSecurityCenter && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Security Center</h3>
            <button 
              onClick={() => setShowSecurityCenter(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Security Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <span className="text-sm text-gray-700">Firewall Status</span>
                  <span className="text-emerald-600 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <span className="text-sm text-gray-700">SSL Certificate</span>
                  <span className="text-emerald-600 font-medium">Valid</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <span className="text-sm text-gray-700">Last Security Scan</span>
                  <span className="text-emerald-600 font-medium">2 hours ago</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Recent Security Events</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Successful login</p>
                    <p className="text-xs text-gray-500">Admin user - 5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Security scan completed</p>
                    <p className="text-xs text-gray-500">No threats detected - 2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Actions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">New complaint submitted</p>
                <p className="text-xs text-gray-500">Infrastructure issue reported</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Weekly report generated</p>
                <p className="text-xs text-gray-500">Complaint analytics exported</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">System settings updated</p>
                <p className="text-xs text-gray-500">Notification preferences changed</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;