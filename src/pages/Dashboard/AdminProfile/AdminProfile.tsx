import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { FaPencil , FaCamera, FaCheck} from "react-icons/fa6";

export default function AdminProfile() {
  const auth = useAuth();
  const user = auth?.user;
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "Senior System Administrator | Cloud Infrastructure Specialist",
    location: "San Francisco, CA",
    website: "admin-portal.example.com"
  });
  const [stats, ] = useState({
    posts: 17,
    followers: 9700,
    following: 217
  });

  // Initialize profile data with user info
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.displayName || "Admin User"
      }));
    }
  }, [user]);

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving profile:", profileData);
    setIsEditing(false);
    // Add API call to update user profile
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="max-w-md w-full space-y-6 rounded-2xl bg-white/90 backdrop-blur-sm px-6 py-8 shadow-xl md:max-w-md dark:bg-gray-900/90">
        
        {/* Profile header with background and avatar */}
        <div className="relative">
          <div className="h-40 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1483347756197-71ef80e95f73?q=80&w=2070&auto=format&fit=crop"
              alt="Profile background"
            />
          </div>
          
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <img
                width={100}
                height={100}
                className="h-24 w-24 rounded-full border-4 border-white bg-gray-200 dark:border-gray-900"
                src={user?.photoURL || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop"}
                alt={user?.displayName || "Admin profile"}
              />
              <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors">
                <FaCamera className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile content */}
        <div className="space-y-4 pt-12">
          {/* Name and edit button */}
          <div className="flex justify-between items-center">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{profileData.name}</h1>
            )}
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            >
              {isEditing ? (
                <>
                  <FaCheck className="h-4 w-4" />
                  Save
                </>
              ) : (
                <>
                  <FaPencil className="h-4 w-4" />
                  Edit
                </>
              )}
            </button>
          </div>

          {/* Email */}
          <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>

          {/* Bio */}
          {isEditing ? (
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b-2 border-blue-500 focus:outline-none resize-none"
              rows={2}
            />
          ) : (
            <p className="text-gray-700 dark:text-gray-400">{profileData.bio}</p>
          )}

          {/* Location and website */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="bg-transparent border-b border-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="website"
                  value={profileData.website}
                  onChange={handleInputChange}
                  placeholder="Website"
                  className="bg-transparent border-b border-blue-500 focus:outline-none"
                />
              </>
            ) : (
              <>
                <span>📍 {profileData.location}</span>
                <span>🌐 {profileData.website}</span>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around py-4 border-y border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <h5 className="text-xl font-bold text-gray-800 dark:text-white">{stats.posts}</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
          </div>
          <div className="text-center">
            <h5 className="text-xl font-bold text-gray-800 dark:text-white">{formatNumber(stats.followers)}</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
          </div>
          <div className="text-center">
            <h5 className="text-xl font-bold text-gray-800 dark:text-white">{stats.following}</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
          </div>
        </div>

        {/* Admin Badge */}
        <div className="flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/30 py-2 px-4 rounded-lg">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-blue-600 dark:text-blue-400 font-medium">Administrator</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-500 text-white py-2.5 rounded-lg font-medium hover:bg-blue-600 transition-colors">
            Message
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 dark:text-gray-300 py-2.5 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Share Profile
          </button>
        </div>

        {/* Quick actions for admin */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 dark:text-white mb-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="text-sm bg-white dark:bg-gray-700 py-2 px-3 rounded border hover:bg-gray-50 dark:hover:bg-gray-600">
              Manage Users
            </button>
            <button className="text-sm bg-white dark:bg-gray-700 py-2 px-3 rounded border hover:bg-gray-50 dark:hover:bg-gray-600">
              Analytics
            </button>
            <button className="text-sm bg-white dark:bg-gray-700 py-2 px-3 rounded border hover:bg-gray-50 dark:hover:bg-gray-600">
              Settings
            </button>
            <button className="text-sm bg-white dark:bg-gray-700 py-2 px-3 rounded border hover:bg-gray-50 dark:hover:bg-gray-600">
              Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}