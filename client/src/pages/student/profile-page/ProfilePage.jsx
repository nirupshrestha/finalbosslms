import React, { useState, useEffect } from 'react';
import { User, Save, Edit, XCircle, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { 
  getProfileService, 
  updateProfileService, 
  changePasswordService 
} from '@/services'; // Adjust path if necessary

const ProfilePage = () => {
  // State for user data
  const [profile, setProfile] = useState({
    userName: '',
    userEmail: ''
  });
  
  // UI states
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Password change form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Track if the form has been modified to prevent unnecessary API calls
  const [formModified, setFormModified] = useState(false);

  // Fetch user profile data when component mounts
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await getProfileService();
      
      if (response.success && response.data) {
        setProfile({
          userName: response.data.userName || '',
          userEmail: response.data.userEmail || ''
        });
        setError(null);
      } else {
        setError(response.message || 'Failed to load profile data');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
    setFormModified(true);
    
    // Clear error when user starts editing
    if (error) setError(null);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing again
    if (error) setError(null);
  };

  const handleUpdateProfile = async () => {
    // Don't submit if nothing has changed
    if (!formModified) {
      setIsEditing(false);
      return;
    }
    
    setLoading(true);
    try {
      const response = await updateProfileService(profile);
      
      if (response && response.message) {
        setSuccessMessage(response.message);
        setIsEditing(false);
        setError(null);
        setFormModified(false);
        
        // Refresh profile data after update
        fetchUserProfile();
      } else {
        setError('Failed to update profile: Unknown response');
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match!');
      return;
    }
    
    // Basic password strength validation
    if (passwordData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    setLoading(true);
    try {
      const response = await changePasswordService({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      if (response && response.message) {
        setSuccessMessage(response.message);
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setError(null);
      } else {
        setError('Failed to change password: Unknown response');
      }
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Password change error:', err);
      setError(err.response?.data?.message || 'Failed to change password. Please verify your current password.');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    fetchUserProfile(); // Revert any changes by fetching original data
    setIsEditing(false);
    setFormModified(false);
    setError(null);
  };

  const cancelPasswordChange = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsChangingPassword(false);
    setError(null);
  };

  if (loading && !profile.userName) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with avatar and title */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <div className="flex items-center">
            <div className="bg-white p-4 rounded-full shadow-md">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-white">{profile.userName}</h1>
              <p className="text-blue-100">Manage your account information</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 mb-6 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-6 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Tab style navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => isChangingPassword && setIsChangingPassword(false)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  !isChangingPassword 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => !isChangingPassword && setIsChangingPassword(true)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  isChangingPassword 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Security
              </button>
            </nav>
          </div>
          
          {!isChangingPassword ? (
            /* Profile Information Tab */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="userName"
                      value={profile.userName}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your username"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                      <p className="text-gray-800">{profile.userName || 'Not set'}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="userEmail"
                      value={profile.userEmail}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                      <p className="text-gray-800">{profile.userEmail || 'Not set'}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="pt-4">
                {isEditing ? (
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm flex items-center justify-center disabled:opacity-50 transition-colors"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin h-4 w-4 mr-2 border-2 border-white rounded-full border-t-transparent"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2 rounded-lg font-medium shadow-sm flex items-center justify-center transition-colors"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm flex items-center justify-center transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2 rounded-lg font-medium flex items-center justify-center transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Password Change Tab */
            <form onSubmit={handleChangePassword} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Create a new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm flex items-center justify-center disabled:opacity-50 transition-colors"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white rounded-full border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </button>
                <button
                  type="button"
                  onClick={cancelPasswordChange}
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2 rounded-lg font-medium shadow-sm flex items-center justify-center transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

