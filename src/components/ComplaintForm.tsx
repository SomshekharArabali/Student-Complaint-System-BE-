import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';
import { Complaint } from '../types';

interface ComplaintFormProps {
  onSubmit: (complaint: Omit<Complaint, 'id' | 'dateSubmitted' | 'status'>) => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    issueType: '',
    subject: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const issueTypes = [
    'Infrastructure Problems',
    'Hostel & Food Complaints',
    'Academic Concerns',
    'Bullying/Ragging Reports',
    'Suggestion Box',
    'Other',
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.issueType) {
      newErrors.issueType = 'Please select an issue type';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setFormData({
        name: '',
        rollNumber: '',
        issueType: '',
        subject: '',
        description: '',
      });
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Submit a Complaint</h2>
          <p className="text-blue-100">Your voice matters. Help us improve the college experience.</p>
        </div>

        {showSuccess && (
          <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 m-6 rounded-r-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
              <p className="text-emerald-800 font-medium">Complaint submitted successfully!</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Roll Number (Optional)
              </label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your roll number"
              />
            </div>
          </div>

          <div>
            <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-2">
              Issue Type <span className="text-red-500">*</span>
            </label>
            <select
              id="issueType"
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.issueType ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select an issue type</option>
              {issueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.issueType && (
              <div className="flex items-center mt-2 text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{errors.issueType}</span>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject/Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.subject ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Brief summary of your complaint"
            />
            {errors.subject && (
              <div className="flex items-center mt-2 text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{errors.subject}</span>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Provide detailed information about your complaint..."
            />
            {errors.description && (
              <div className="flex items-center mt-2 text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{errors.description}</span>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {formData.description.length}/500 characters
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Note:</strong> Your complaint will be reviewed by the administration team.
            </p>
            <p className="text-xs text-gray-500">
              Date of submission will be automatically recorded. All submissions are confidential.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Complaint</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;