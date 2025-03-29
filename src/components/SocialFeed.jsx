import { useState } from 'react';
import {
  HeartIcon,
  ChartBarIcon,
  XMarkIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const SocialFeed = () => {
  // Sample posts data with insights
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Amir Khan',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      message: '...',
      image: 'https://imgs.search.brave.com/-QqWiDxYVRDI6uQyxq3_9KrBv_jPWMmfjAdZ5YfEWH0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jaXR5ZWxlY3Ry/aWNzdXBwbHkuY29t/L21lZGlhL21jZy9s/c2x2MDAwNGMxMDAt/Mi9pbWFnZXMvbWNn/X2xzbHYwMDA0YzEw/MDJfcF9tZWQud2Vi/cA',
      supports: 24,
      earns: 5,
      supported: false,
      views: 356,
      reach: 1200,
      engagementRate: '8.2%',
      timestamp: '2h ago'
    },
    {
      id: 2,
      user: 'Rahul Patel',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      message: '...',
      image: 'https://imgs.search.brave.com/eFBK0wfnHxTb9AYZlBkM70_B5BXztC8v4xdeZa-PeAM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jaXR5ZWxlY3Ry/aWNzdXBwbHkuY29t/L21lZGlhL2R1cmFj/ZWxsL3BjMTYwNC9p/bWFnZXMvZHVyYWNl/bGxfcGMxNjA0X3Bf/bWVkLndlYnA',
      supports: 15,
      earns: 2,
      supported: true,
      views: 289,
      reach: 950,
      engagementRate: '6.7%',
      timestamp: '5h ago'
    }
  ]);

  // New post state
  const [newPost, setNewPost] = useState({
    text: '',
    image: null,
    preview: ''
  });

  // UI states
  const [isDragging, setIsDragging] = useState(false);
  const [showInsights, setShowInsights] = useState(null);

  // Handle drag events for image upload
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewPost({
          ...newPost,
          image: file,
          preview: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file selection via button
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewPost({
          ...newPost,
          image: file,
          preview: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setNewPost({
      ...newPost,
      image: null,
      preview: ''
    });
  };

  // Submit new post
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.text.trim() && !newPost.image) return;
    
    const newPostData = {
      id: posts.length + 1,
      user: 'You',
      avatar: 'https://randomuser.me/api/portraits/lego/5.jpg',
      message: newPost.text,
      image: newPost.preview || null,
      supports: 0,
      earns: 0,
      supported: false,
      views: Math.floor(Math.random() * 100) + 50,
      reach: Math.floor(Math.random() * 500) + 300,
      engagementRate: `${(Math.random() * 5 + 3).toFixed(1)}%`,
      timestamp: 'Just now'
    };
    
    setPosts([newPostData, ...posts]);
    setNewPost({
      text: '',
      image: null,
      preview: ''
    });
  };

  // Toggle support on a post
  const toggleSupport = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { 
        ...post, 
        supported: !post.supported,
        supports: post.supported ? post.supports - 1 : post.supports + 1,
        earns: post.supported ? post.earns - 1 : post.earns + 1
      } : post
    ));
  };

  // Toggle insights panel
  const toggleInsights = (postId) => {
    setShowInsights(showInsights === postId ? null : postId);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Create Post Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
        <form onSubmit={handlePostSubmit}>
          <div className="flex space-x-3">
            <img 
              src="https://randomuser.me/api/portraits/lego/5.jpg" 
              alt="User" 
              className="w-11 h-11 rounded-full object-cover border-2 border-indigo-100"
            />
            <div className="flex-1">
              <textarea
                value={newPost.text}
                onChange={(e) => setNewPost({...newPost, text: e.target.value})}
                placeholder="What's happening in your community?"
                className="w-full p-3 text-gray-800 placeholder-gray-400 bg-gray-50 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 border border-gray-200 resize-none"
                rows="3"
              />
              
              {/* Drag & Drop Area */}
              <div 
                className={`mt-3 border-2 border-dashed rounded-lg p-4 text-center ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'} transition-colors`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {newPost.preview ? (
                  <div className="relative">
                    <img 
                      src={newPost.preview} 
                      alt="Preview" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <PhotoIcon className="h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {isDragging ? 'Drop image here' : 'Drag & drop an image or click to upload'}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label 
                      htmlFor="image-upload"
                      className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer px-3 py-1 rounded-md bg-indigo-50 transition"
                    >
                      Select Image
                    </label>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={!newPost.text.trim() && !newPost.image}
                  className={`px-5 py-2 rounded-full font-medium text-white ${(newPost.text.trim() || newPost.image) ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-400 cursor-not-allowed'} transition`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-5">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Post Header */}
            <div className="p-5 pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={post.avatar} 
                    alt={post.user} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.user}</h3>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition">
                  <EllipsisHorizontalIcon className="w-5 h-5" />
                </button>
              </div>
              
              {/* Post Content */}
              <div className="mt-4">
                <p className="text-gray-800 whitespace-pre-line">{post.message}</p>
              </div>
            </div>
            
            {/* Post Image */}
            {post.image && (
              <div className="mt-4 max-h-96 overflow-hidden flex items-center justify-center">
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-[70%] h-[70%] object-fit"
                />
              </div>
            )}
            
            {/* Post Actions */}
            <div className="p-4 pt-3">
              <div className="flex justify-between text-gray-500 max-w-md mx-auto">
                {/* Support Button */}
                <button 
                  onClick={() => toggleSupport(post.id)}
                  className={`flex items-center space-x-1 group ${post.supported ? 'text-rose-500' : ''}`}
                >
                  <div className="p-2 rounded-full group-hover:bg-rose-50 transition">
                    {post.supported ? (
                      <HeartIconSolid className="w-5 h-5" />
                    ) : (
                      <HeartIcon className="w-5 h-5 group-hover:text-rose-500 transition" />
                    )}
                  </div>
                  <span className={`text-sm ${post.supported ? 'text-rose-500' : 'group-hover:text-rose-500'} transition`}>
                    {post.supports}
                  </span>
                </button>
                
                {/* Insights Button */}
                <button 
                  onClick={() => toggleInsights(post.id)}
                  className={`flex items-center space-x-1 group ${showInsights === post.id ? 'text-indigo-600' : ''}`}
                >
                  <div className="p-2 rounded-full group-hover:bg-indigo-50 transition">
                    <ChartBarIcon className={`w-5 h-5 ${showInsights !== post.id && 'group-hover:text-indigo-600'} transition`} />
                  </div>
                  <span className={`text-sm ${showInsights === post.id ? 'text-indigo-600' : 'group-hover:text-indigo-600'} transition`}>
                    Insights
                  </span>
                </button>
              </div>
            </div>

            {/* Insights Panel */}
            {showInsights === post.id && (
              <div className="border-t border-gray-200 p-5 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">Post Insights</h3>
                  <button 
                    onClick={() => setShowInsights(null)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Views */}
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <EyeIcon className="w-4 h-4" />
                      <span className="text-xs font-medium">Views</span>
                    </div>
                    <p className="text-xl font-semibold">{post.views}</p>
                  </div>
                  
                  {/* Reach */}
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <UserGroupIcon className="w-4 h-4" />
                      <span className="text-xs font-medium">Reach</span>
                    </div>
                    <p className="text-xl font-semibold">{post.reach}</p>
                  </div>
                  
                  {/* Engagement */}
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <ArrowTrendingUpIcon className="w-4 h-4" />
                      <span className="text-xs font-medium">Engagement</span>
                    </div>
                    <p className="text-xl font-semibold">{post.engagementRate}</p>
                  </div>
                  
                  {/* Supports */}
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <HeartIcon className="w-4 h-4" />
                      <span className="text-xs font-medium">Supports</span>
                    </div>
                    <p className="text-xl font-semibold">{post.supports}</p>
                  </div>
                </div>
                
                {/* Earnings Potential */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <CurrencyRupeeIcon className="w-4 h-4" />
                      <span className="text-xs font-medium">Earnings Potential</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">₹{post.earns}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${Math.min(post.supports * 4, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Potential to earn ₹{Math.floor(post.supports * 1.5)} more
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper component for the ellipsis icon
const EllipsisHorizontalIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
  </svg>
);

export default SocialFeed;