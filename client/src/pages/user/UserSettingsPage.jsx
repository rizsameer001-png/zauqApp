// client/src/pages/user/UserSettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Lock, CreditCard, Globe, Shield, Save, Camera } from 'lucide-react';
import axios from 'axios';

const UserSettingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
    preferences: {
      language: 'en',
      theme: 'light',
      notifications: true
    }
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.data);
      setFormData({
        name: response.data.data.name || '',
        email: response.data.data.email || '',
        bio: response.data.data.bio || '',
        avatar: response.data.data.avatar || '',
        preferences: response.data.data.preferences || {
          language: 'en',
          theme: 'light',
          notifications: true
        }
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-64 bg-gray-900 p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={formData.avatar || `https://ui-avatars.com/api/?name=${formData.name}&background=6366f1&color=fff`}
                    alt={formData.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-primary-500"
                  />
                  <button className="absolute bottom-0 right-0 bg-primary-600 rounded-full p-1.5">
                    <Camera className="h-4 w-4 text-white" />
                  </button>
                </div>
                <h3 className="text-white font-semibold mt-3">{formData.name || 'User'}</h3>
                <p className="text-gray-400 text-sm">{formData.email}</p>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-8">
              <form onSubmit={handleSubmit}>
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-600">Receive updates via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.preferences.notifications}
                            onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={() => navigate('/change-password')}
                        className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">Change Password</h3>
                            <p className="text-sm text-gray-600">Update your password</p>
                          </div>
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'subscription' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscription Settings</h2>
                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={() => navigate('/subscription')}
                        className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">Manage Subscription</h3>
                            <p className="text-sm text-gray-600">View and manage your plan</p>
                          </div>
                          <CreditCard className="h-5 w-5 text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'preferences' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={formData.preferences.language}
                          onChange={(e) => handlePreferenceChange('language', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="en">English</option>
                          <option value="hi">Hindi</option>
                          <option value="ur">Urdu</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Theme
                        </label>
                        <select
                          value={formData.preferences.theme}
                          onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="system">System</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                    <Save className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;