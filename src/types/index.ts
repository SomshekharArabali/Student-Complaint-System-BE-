export interface Complaint {
  id: string;
  name?: string;
  rollNumber?: string;
  issueType: string;
  subject: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Closed';
  profileImage?: string;
  created_at: string;
  updated_at?: string;
}

export interface Feedback {
  id: string;
  complaintId: string;
  rating: number;
  comment: string;
  submittedBy: string;
  submittedAt: string;
  dateSubmitted: string;
  helpful: number;
  notHelpful: number;
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  rollNumber?: string;
  department?: string;
  created_at: string;
}

export interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  department: string;
  profileImage?: string;
}

export interface SystemSettings {
  siteName: string;
  adminEmail: string;
  contactPhone: string;
  address: string;
  timezone: string;
  language: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
  instantAlerts: boolean;
  maintenanceNotices: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  loginAttempts: number;
  ipWhitelist: boolean;
  auditLogging: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  defaultRole: string;
  maxUsers: number;
  accountApproval: boolean;
  bulkImport: boolean;
  autoBackup: boolean;
  backupFrequency: string;
  retentionPeriod: number;
  compressionEnabled: boolean;
}

export type NavigationItem = {
  id: string;
  label: string;
  icon: string;
  path: string;
}