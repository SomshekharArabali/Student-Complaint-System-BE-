import React from 'react';
import { MessageSquare, CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { Complaint, SystemSettings } from '../types';

interface DashboardProps {
  complaints: Complaint[];
  onNavigate: (page: string) => void;
  systemSettings: SystemSettings;
}

const Dashboard: React.FC<DashboardProps> = ({ complaints, onNavigate, systemSettings }) => {
  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;
  const inProgressComplaints = complaints.filter(c => c.status === 'In Progress').length;
  const closedComplaints = complaints.filter(c => c.status === 'Closed').length;
  const resolutionRate = totalComplaints > 0 ? Math.round((resolvedComplaints / totalComplaints) * 100) : 0;

  const stats = [
    {
      title: 'Total Complaints',
      value: totalComplaints,
      icon: MessageSquare,
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      description: 'All complaints submitted to the system',
    },
    {
      title: 'Pending',
      value: pendingComplaints,
      icon: Clock,
      color: 'bg-amber-500',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      description: 'Complaints awaiting review',
    },
    {
      title: 'In Progress',
      value: inProgressComplaints,
      icon: AlertTriangle,
      color: 'bg-orange-500',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50',
      description: 'Complaints being actively resolved',
    },
    {
      title: 'Resolved',
      value: resolvedComplaints,
      icon: CheckCircle,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      description: 'Successfully resolved complaints',
    },
  ];

  const recentComplaints = complaints.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome to {systemSettings.siteName}</h2>
            <p className="text-blue-100">Real-time complaint management system for {systemSettings.address}</p>
            <div className="mt-2 text-sm text-blue-200">
              Resolution Rate: {resolutionRate}% | Active Cases: {pendingComplaints + inProgressComplaints}
            </div>
            <div className="mt-4 flex space-x-4">
              <button 
                onClick={() => onNavigate('quick-actions')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                Quick Actions
              </button>
              <button 
                onClick={() => onNavigate('system-status')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                System Status
              </button>
              <button 
                onClick={() => onNavigate('public-dashboard')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                Public View
              </button>
            </div>
          </div>
          <TrendingUp className="w-16 h-16 text-blue-200" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <button 
            key={index} 
            onClick={() => onNavigate('view-complaints')}
            className={`${stat.bgColor} rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:scale-105 text-left w-full`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Submit</h3>
          <p className="text-gray-600 text-sm mb-4">Submit complaints for infrastructure, academic, hostel issues</p>
          <div className="text-xs text-gray-500 mb-4">
            Last submission: {complaints.length > 0 ? new Date(complaints[0].created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : 'No submissions yet'}
          </div>
          <button 
            onClick={() => onNavigate('complaint-box')}
            className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors font-medium"
          >
            Submit Complaint
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Report</h3>
          <p className="text-gray-600 text-sm mb-4">Export detailed analytics and statistics of the complaints </p>
          <div className="text-xs text-gray-500 mb-4">
            Available formats: PDF, Excel, CSV | Real-time data
          </div>
          <button 
            onClick={() => onNavigate('generate-report')}
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            Generate Report
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
          <p className="text-gray-600 text-sm mb-4">Configure notifications, security, and user management</p>
          <div className="text-xs text-gray-500 mb-4">
            Email alerts: {systemSettings.emailNotifications ? 'Enabled' : 'Disabled'} | 
            2FA: {systemSettings.twoFactorAuth ? 'Enabled' : 'Disabled'}
          </div>
          <button 
            onClick={() => onNavigate('system-settings')}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Open Settings
          </button>
        </div>
      </div>
      {/* Recent Complaints */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Complaints</h3>
            <button 
              onClick={() => onNavigate('view-complaints')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          {recentComplaints.length > 0 ? (
            <div className="space-y-4">
              {recentComplaints.map((complaint) => (
                <button 
                  key={complaint.id} 
                  onClick={() => onNavigate('view-complaints')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{complaint.subject}</p>
                    <p className="text-sm text-gray-600 mt-1">{complaint.issueType}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(complaint.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    complaint.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                    complaint.status === 'In Progress' ? 'bg-orange-100 text-orange-800' :
                    complaint.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {complaint.status}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No complaints submitted yet</p>
              <p className="mt-2 text-sm text-gray-400">Use the Complaint Box to submit the first complaint</p>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Live System Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{resolutionRate}%</p>
            <p className="text-sm text-blue-700">Resolution Rate</p>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <p className="text-2xl font-bold text-emerald-600">{Math.round((resolvedComplaints / Math.max(totalComplaints, 1)) * 100)}%</p>
            <p className="text-sm text-emerald-700">Success Rate</p>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <p className="text-2xl font-bold text-amber-600">{pendingComplaints + inProgressComplaints}</p>
            <p className="text-sm text-amber-700">Active Cases</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{closedComplaints}</p>
            <p className="text-sm text-purple-700">Closed Cases</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;