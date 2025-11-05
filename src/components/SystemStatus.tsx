import React from 'react';
import { Server, Database, Wifi, Shield, Activity, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const SystemStatus: React.FC = () => {
  const systemComponents = [
    {
      name: 'Web Server',
      status: 'online',
      uptime: '99.9%',
      lastCheck: '2 minutes ago',
      icon: Server,
      details: 'All web services running normally'
    },
    {
      name: 'Database',
      status: 'online',
      uptime: '99.8%',
      lastCheck: '1 minute ago',
      icon: Database,
      details: 'Database connections stable'
    },
    {
      name: 'Network',
      status: 'online',
      uptime: '99.9%',
      lastCheck: '30 seconds ago',
      icon: Wifi,
      details: 'Network connectivity excellent'
    },
    {
      name: 'Security',
      status: 'online',
      uptime: '100%',
      lastCheck: '1 minute ago',
      icon: Shield,
      details: 'All security protocols active'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'offline':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'warning':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'offline':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">System Status</h2>
            <p className="text-emerald-100">Real-time monitoring of all system components</p>
          </div>
          <Activity className="w-16 h-16 text-emerald-200" />
        </div>
      </div>

      {/* Overall Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Overall System Health</h3>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-600 font-medium">All Systems Operational</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-2xl font-bold text-emerald-600">99.9%</p>
            <p className="text-sm text-emerald-700">Overall Uptime</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-2xl font-bold text-blue-600">1</p>
            <p className="text-sm text-blue-700">Active Users</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-2xl font-bold text-purple-600">0</p>
            <p className="text-sm text-purple-700">Active Incidents</p>
          </div>
        </div>
      </div>

      {/* Component Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Component Status</h3>
        <div className="space-y-4">
          {systemComponents.map((component, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-4">
                <component.icon className="w-6 h-6 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">{component.name}</h4>
                  <p className="text-sm text-gray-500">{component.details}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{component.uptime} uptime</p>
                  <p className="text-xs text-gray-500">Last check: {component.lastCheck}</p>
                </div>
                <div className={`px-3 py-1 rounded-full border ${getStatusColor(component.status)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(component.status)}
                    <span className="text-sm font-medium capitalize">{component.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent System Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Database backup completed successfully</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">System security scan completed</p>
              <p className="text-xs text-gray-500">6 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Activity className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Server restart completed</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Server Version:</span>
              <span className="text-gray-900 font-medium">v2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Update:</span>
              <span className="text-gray-900 font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Environment:</span>
              <span className="text-gray-900 font-medium">Production</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">CPU Usage:</span>
              <span className="text-emerald-600 font-medium">12%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Memory Usage:</span>
              <span className="text-emerald-600 font-medium">34%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Storage:</span>
              <span className="text-emerald-600 font-medium">67% used</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;