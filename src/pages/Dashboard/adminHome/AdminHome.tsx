

const AdminHome = () => {
    return (
        <div className="min-h-screen  p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Hi, Welcome</h1>
                <p className="text-gray-600">Here's what's happening today</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition-shadow">
                    <p className="text-gray-500 text-sm">TODAY'S MONEY</p>
                    <h2 className="text-2xl font-bold">$53,000</h2>
                    <span className="text-green-500 text-sm">+55% since yesterday</span>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition-shadow">
                    <p className="text-gray-500 text-sm">TODAY'S USERS</p>
                    <h2 className="text-2xl font-bold">2,300</h2>
                    <span className="text-green-500 text-sm">+3% since last week</span>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition-shadow">
                    <p className="text-gray-500 text-sm">NEW CLIENTS</p>
                    <h2 className="text-2xl font-bold">+3,462</h2>
                    <span className="text-red-500 text-sm">-2% since last quarter</span>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition-shadow">
                    <p className="text-gray-500 text-sm">SALES</p>
                    <h2 className="text-2xl font-bold">$103,430</h2>
                    <span className="text-green-500 text-sm">+5% than last month</span>
                </div>
            </div>
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl p-6 shadow">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold">John Snow</h3>
                                        <p className="text-gray-500 text-sm">3 days ago</p>
                                    </div>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                                        FOLLOW
                                    </button>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    Personal profiles are the perfect way for you to grab their attention and persuade recruiters to continue reading your CV because you're telling them from the off exactly why they should hire you.
                                </p>
                                <div className="flex gap-4">
                                    <div className="text-center">
                                        <p className="font-bold">150</p>
                                        <p className="text-gray-500 text-sm">Friends</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold">36</p>
                                        <p className="text-gray-500 text-sm">Photos</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold">12</p>
                                        <p className="text-gray-500 text-sm">Comments</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h4 className="font-bold mb-3">Name</h4>
                                <p className="mb-4">John Snow</p>
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">ACTIVE</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Projects Table */}
                    <div className="bg-white rounded-2xl p-6 shadow overflow-x-auto">
                        <h3 className="text-xl font-bold mb-4">Projects</h3>
                        <table className="w-full min-w-[500px]">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 text-gray-600 font-medium">PROJECT</th>
                                    <th className="text-left py-3 text-gray-600 font-medium">BUDGET</th>
                                    <th className="text-left py-3 text-gray-600 font-medium">STATUS</th>
                                    <th className="text-left py-3 text-gray-600 font-medium">COMPLETION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-3">Spotify</td>
                                    <td className="py-3">$2,500</td>
                                    <td className="py-3">
                                        <span className="text-blue-500">working</span>
                                    </td>
                                    <td className="py-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                                        </div>
                                        <span className="text-xs">60%</span>
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3">Invision</td>
                                    <td className="py-3">$5,000</td>
                                    <td className="py-3">
                                        <span className="text-green-500">done</span>
                                    </td>
                                    <td className="py-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                                        </div>
                                        <span className="text-xs">100%</span>
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3">Jira</td>
                                    <td className="py-3">$3,400</td>
                                    <td className="py-3">
                                        <span className="text-red-500">canceled</span>
                                    </td>
                                    <td className="py-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-red-600 h-2 rounded-full" style={{width: '30%'}}></div>
                                        </div>
                                        <span className="text-xs">30%</span>
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3">Slack</td>
                                    <td className="py-3">$1,000</td>
                                    <td className="py-3">
                                        <span className="text-red-500">canceled</span>
                                    </td>
                                    <td className="py-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-red-600 h-2 rounded-full" style={{width: '0%'}}></div>
                                        </div>
                                        <span className="text-xs">0%</span>
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3">Webdev</td>
                                    <td className="py-3">$14,000</td>
                                    <td className="py-3">
                                        <span className="text-blue-500">working</span>
                                    </td>
                                    <td className="py-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '80%'}}></div>
                                        </div>
                                        <span className="text-xs">80%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3">Adobe XD</td>
                                    <td className="py-3">$2,300</td>
                                    <td className="py-3">
                                        <span className="text-green-500">done</span>
                                    </td>
                                    <td className="py-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                                        </div>
                                        <span className="text-xs">100%</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-6">
                    {/* Team Members */}
                    <div className="bg-white rounded-2xl p-6 shadow">
                        <h3 className="text-xl font-bold mb-4">Team Members</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                        JM
                                    </div>
                                    <div>
                                        <p className="font-medium">John Michael</p>
                                        <span className="text-green-500 text-sm">ONLINE</span>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                                        AS
                                    </div>
                                    <div>
                                        <p className="font-medium">Alex Smith</p>
                                        <span className="text-yellow-500 text-sm">IN MEETING</span>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                                        SI
                                    </div>
                                    <div>
                                        <p className="font-medium">Samantha Ivy</p>
                                        <span className="text-gray-500 text-sm">OFFLINE</span>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                        JM
                                    </div>
                                    <div>
                                        <p className="font-medium">John Michael</p>
                                        <span className="text-green-500 text-sm">ONLINE</span>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-500">Add</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* To Do List */}
                    <div className="bg-white rounded-2xl p-6 shadow">
                        <h3 className="text-xl font-bold mb-4">To Do List</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Call with Dave</p>
                                    <span className="text-gray-500 text-sm">09:30 AM</span>
                                </div>
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Brunch Meeting</p>
                                    <span className="text-gray-500 text-sm">11:00 AM</span>
                                </div>
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Argon Dashboard Launch</p>
                                    <span className="text-gray-500 text-sm">02:00 PM</span>
                                </div>
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Winter Hackaton</p>
                                    <span className="text-gray-500 text-sm">10:30 AM</span>
                                </div>
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Progress Track */}
                    <div className="bg-white rounded-2xl p-6 shadow">
                        <h3 className="text-xl font-bold mb-4">Progress Track</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium">React Material Dashboard</span>
                                    <span className="text-gray-500">70%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '70%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium">Argon Design System</span>
                                    <span className="text-gray-500">50%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '50%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium">Vuejs Now UI Kit PRO</span>
                                    <span className="text-gray-500">90%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{width: '90%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium">Soft UI Dashboard</span>
                                    <span className="text-gray-500">30%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-red-600 h-2 rounded-full" style={{width: '30%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Balance Card */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 shadow text-white">
                        <h3 className="text-xl font-bold mb-2">$3,300</h3>
                        <p className="text-blue-100 mb-4">Your current balance</p>
                        <p className="mb-6">+15% ($250) since last week</p>
                        <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg">
                            Add credit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;