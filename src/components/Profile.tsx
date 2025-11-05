import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Edit, Save, X, Camera, Server, Database, Wifi, Shield, Activity, CheckCircle, AlertTriangle, Clock, FileText, Eye, Trash2, Filter, Search } from 'lucide-react';
import { AdminProfile, Complaint } from '../types';

interface ProfileProps {
  adminProfile: AdminProfile;
  onUpdateProfile: (profile: AdminProfile) => void;
  complaints: Complaint[];
  onUpdateStatus: (id: string, status: Complaint['status']) => void;
  onDeleteComplaint: (id: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ adminProfile, onUpdateProfile, complaints, onUpdateStatus, onDeleteComplaint }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [showQuickStats, setShowQuickStats] = React.useState(false);
  const [showCollegeInfo, setShowCollegeInfo] = React.useState(false);
  const [showSupport, setShowSupport] = React.useState(false);
  const [showHelpResources, setShowHelpResources] = React.useState(false);
  const [showSystemStatus, setShowSystemStatus] = React.useState(false);
  const [showComplaints, setShowComplaints] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('All');
  const [selectedComplaint, setSelectedComplaint] = React.useState<Complaint | null>(null);
  const [profileData, setProfileData] = React.useState<AdminProfile>(adminProfile);

  const statusOptions: Complaint['status'][] = ['Pending', 'In Progress', 'Resolved', 'Closed'];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (complaint.name && complaint.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || complaint.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800';
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSaveProfile = () => {
    onUpdateProfile(profileData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setProfileData(adminProfile);
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const updatedProfile = { ...profileData, profileImage: imageUrl };
        setProfileData(updatedProfile);
        onUpdateProfile(updatedProfile);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const getSystemStatusColor = (status: string) => {
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden">
                {profileData.profileImage ? (
                  <img 
                    src={profileData.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-gray-50 transition-colors">
                <Camera className="w-4 h-4 text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Admin Profile</h2>
              <p className="text-blue-100">Complaint Management System Administrator</p>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg font-medium transition-all"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              {isEditing && (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleSaveProfile}
                    className="flex items-center space-x-1 bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-emerald-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button 
                    onClick={handleCancelEdit}
                    className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="text-gray-900 font-medium bg-gray-50 border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.name}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="text-gray-900 font-medium bg-gray-50 border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.email}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="text-gray-900 font-medium bg-gray-50 border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  {isEditing ? (
                    <select
                      value={profileData.department}
                      onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                      className="text-gray-900 font-medium bg-gray-50 border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="Administration">Administration</option>
                      <option value="IT Department">IT Department</option>
                      <option value="Academic Affairs">Academic Affairs</option>
                      <option value="Student Affairs">Student Affairs</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.department}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">System Access</h3>
            </div>
            <div className="space-y-4">
              <div className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Complaint Management</p>
                  <p className="text-sm text-gray-500">Full access to view and manage complaints</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                  Active
                </span>
              </div>
              <div className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">User Management</p>
                  <p className="text-sm text-gray-500">Manage student and staff accounts</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                  Active
                </span>
              </div>
              <div className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">System Reports</p>
                  <p className="text-sm text-gray-500">Generate and export system reports</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Admin Complaints Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Admin Complaints Management</h3>
              <button 
                onClick={() => setShowComplaints(!showComplaints)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {showComplaints ? 'Hide' : 'Show'} Complaints ({complaints.length})
              </button>
            </div>
            
            {showComplaints && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search complaints..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="All">All Status</option>
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Complaints List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((complaint) => (
                      <div key={complaint.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{complaint.subject}</h4>
                            <p className="text-sm text-blue-600 mt-1">{complaint.issueType}</p>
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{complaint.description}</p>
                            <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                              <span>ID: #{complaint.id.slice(-6)}</span>
                              <span>Date: {complaint.dateSubmitted}</span>
                              <span>By: {complaint.name || 'Anonymous'}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <select
                              value={complaint.status}
                              onChange={(e) => onUpdateStatus(complaint.id, e.target.value as Complaint['status'])}
                              className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(complaint.status)}`}
                            >
                              {statusOptions.map(status => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                            <button
                              onClick={() => setSelectedComplaint(complaint)}
                              className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete this complaint?\n\nID: ${complaint.id}\nSubject: ${complaint.subject}\n\nThis action cannot be undone.`)) {
                                  onDeleteComplaint(complaint.id);
                                }
                              }}
                              className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p>No complaints found matching your filters</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
              <button 
                onClick={() => setShowQuickStats(!showQuickStats)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {showQuickStats ? 'Hide' : 'Show'} Details
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Account Created</span>
                <div className="flex items-center text-gray-900">
                  <Calendar className="w-4 h-4 mr-2" />
                  Jan 2024
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Login</span>
                <span className="text-gray-900">Today</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Role</span>
                <span className="text-gray-900">System Admin</span>
              </div>
              {showQuickStats && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Detailed Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Total Logins:</span>
                      <span className="text-blue-900 font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Session Duration:</span>
                      <span className="text-blue-900 font-medium">2h 34m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Permission Level:</span>
                      <span className="text-blue-900 font-medium">Full Access</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Security Status:</span>
                      <span className="text-emerald-600 font-medium">Secure</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">College Info</h3>
              <button 
                onClick={() => setShowCollegeInfo(!showCollegeInfo)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {showCollegeInfo ? 'Hide' : 'Show'} Info
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Sinhgad Institute Of Technology</p>
                  <p className="text-sm text-gray-500">Narhe, Pune</p>
                </div>
              </div>
              {showCollegeInfo && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">College Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Established:</span>
                      <span className="text-gray-900 font-medium">2001</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Affiliation:</span>
                      <span className="text-gray-900 font-medium">SPPU</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Accreditation:</span>
                      <span className="text-gray-900 font-medium">NAAC A Grade</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Website:</span>
                      <span className="text-blue-600 font-medium">www.sits.ac.in</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Students:</span>
                      <span className="text-gray-900 font-medium">3,500+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Faculty:</span>
                      <span className="text-gray-900 font-medium">200+</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* System Status Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
              <button 
                onClick={() => setShowSystemStatus(!showSystemStatus)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {showSystemStatus ? 'Hide' : 'Show'} Status
              </button>
            </div>
            
            {showSystemStatus && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                
                <div className="space-y-3">
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
                        <div className={`px-3 py-1 rounded-full border ${getSystemStatusColor(component.status)}`}>
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
            )}
          </div>

        </div>
      </div>

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Complaint Details</h3>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors text-xl font-bold"
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">ID</label>
                <p className="text-lg font-mono">#{selectedComplaint.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Subject</label>
                <p className="text-lg">{selectedComplaint.subject}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Issue Type</label>
                <p className="text-lg">{selectedComplaint.issueType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedComplaint.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Submitted By</label>
                  <p>{selectedComplaint.name || 'Anonymous'}</p>
                  {selectedComplaint.rollNumber && (
                    <p className="text-sm text-gray-500">{selectedComplaint.rollNumber}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date Submitted</label>
                  <p>{new Date(selectedComplaint.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedComplaint.status)}`}>
                  {selectedComplaint.status}
                </span>
              </div>
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => {
                    const newStatus = prompt('Update Status:\n1. Pending\n2. In Progress\n3. Resolved\n4. Closed\n\nEnter new status:');
                    if (newStatus && statusOptions.includes(newStatus as any)) {
                      onUpdateStatus(selectedComplaint.id, newStatus as Complaint['status']);
                      setSelectedComplaint(null);
                    }
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Update Status
                </button>
                <button 
                  onClick={() => setSelectedComplaint(null)}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Section at Bottom */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
        <p className="text-blue-700 text-sm mb-4">
          Contact technical support for system issues or questions.
        </p>
        
        {showSupport && (
          <div className="mb-4 p-4 bg-white rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Technical Support Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Email:</span>
                <span className="text-blue-900 font-medium">support@sits.edu.in</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Phone:</span>
                <span className="text-blue-900 font-medium">+91 9284134430</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Availability:</span>
                <span className="text-blue-900 font-medium">24/7 Ticket System</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Response Time:</span>
                <span className="text-blue-900 font-medium">Within 2 hours</span>
              </div>
            </div>
          </div>
        )}

        {showHelpResources && (
          <div className="mb-4 p-4 bg-white rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Available Help Resources</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-blue-700">User Manual (PDF)</span>
                <span className="text-emerald-600 font-medium">Available</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Video Tutorials</span>
                <span className="text-emerald-600 font-medium">12 Videos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-700">FAQ Section</span>
                <span className="text-emerald-600 font-medium">50+ Questions</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-700">System Documentation</span>
                <span className="text-emerald-600 font-medium">Complete</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Training Materials</span>
                <span className="text-emerald-600 font-medium">Updated</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button 
            onClick={() => setShowSupport(!showSupport)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {showSupport ? 'Hide' : 'Show'} Contact Support
          </button>
          <button 
            onClick={() => setShowHelpResources(!showHelpResources)}
            className="w-full bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
          >
            {showHelpResources ? 'Hide' : 'Show'} Help Resources
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;