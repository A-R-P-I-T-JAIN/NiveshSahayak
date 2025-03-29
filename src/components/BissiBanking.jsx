import { useState } from 'react';

const BissiBanking = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Community Farmers Group',
      members: 12,
      cycle: 'Monthly',
      contribution: 2000,
      currentPot: 24000,
      nextDraw: '15 Nov 2023'
    },
    {
      id: 2,
      name: 'Women Entrepreneurs Circle',
      members: 8,
      cycle: 'Bi-weekly',
      contribution: 1500,
      currentPot: 12000,
      nextDraw: '22 Nov 2023'
    }
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, date: '01 Nov 2023', amount: 2000, type: 'Contribution', group: 'Community Farmers' },
    { id: 2, date: '15 Oct 2023', amount: 24000, type: 'Received', group: 'Women Entrepreneurs' },
    { id: 3, date: '01 Oct 2023', amount: 2000, type: 'Contribution', group: 'Community Farmers' }
  ]);

  const [newGroup, setNewGroup] = useState({
    name: '',
    members: '',
    cycle: 'Monthly',
    contribution: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroup.name || !newGroup.members || !newGroup.contribution) return;
    
    const group = {
      id: groups.length + 1,
      name: newGroup.name,
      members: parseInt(newGroup.members),
      cycle: newGroup.cycle,
      contribution: parseInt(newGroup.contribution),
      currentPot: 0,
      nextDraw: 'TBD'
    };
    
    setGroups([...groups, group]);
    setNewGroup({
      name: '',
      members: '',
      cycle: 'Monthly',
      contribution: ''
    });
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Bissi Banking System</h2>
        
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 font-medium ${activeTab === 'about' ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-600'}`}
          >
            About Bissi
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-4 py-2 font-medium ${activeTab === 'groups' ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-600'}`}
          >
            My Groups
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 font-medium ${activeTab === 'transactions' ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-600'}`}
          >
            Transactions
          </button>
        </div>
        
        {activeTab === 'about' && (
          <div>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2">What is the Bissi System?</h3>
              <p className="text-gray-700">
                The Bissi System is a traditional, interest-free method of saving and borrowing money 
                practiced in parts of India, particularly among Muslim communities in Maharashtra and Gujarat. 
                It involves a group of people pooling funds regularly, with members taking turns receiving 
                the collected amount.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-semibold mb-2">1. Group Formation</h4>
                <p className="text-gray-600 text-sm">
                  A trusted group of people (usually 10-20) come together and agree on contribution amount and frequency.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-semibold mb-2">2. Regular Contributions</h4>
                <p className="text-gray-600 text-sm">
                  Each member contributes a fixed amount at regular intervals (weekly, monthly, etc.).
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-semibold mb-2">3. Rotating Payout</h4>
                <p className="text-gray-600 text-sm">
                  One member receives the entire pool each cycle until all members have received their turn.
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Benefits of Bissi System</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Interest-free saving and borrowing</li>
                <li>Encourages regular savings habits</li>
                <li>Builds trust and community bonds</li>
                <li>Provides access to lump sums without formal banking</li>
                <li>Flexible terms decided by the group</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'groups' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Create New Group</h3>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newGroup.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Members</label>
                    <input
                      type="number"
                      name="members"
                      value={newGroup.members}
                      onChange={handleInputChange}
                      min="2"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contribution Cycle</label>
                    <select
                      name="cycle"
                      value={newGroup.cycle}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contribution Amount (₹)</label>
                    <input
                      type="number"
                      name="contribution"
                      value={newGroup.contribution}
                      onChange={handleInputChange}
                      min="100"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Create Group
                </button>
              </form>
            </div>
            
            <h3 className="text-lg font-semibold mb-3">My Bissi Groups</h3>
            <div className="space-y-4">
              {groups.map(group => (
                <div key={group.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{group.name}</h4>
                      <p className="text-sm text-gray-600">{group.members} members • {group.cycle} cycle</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Active
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-500">Contribution</p>
                      <p className="font-semibold">₹{group.contribution}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-500">Current Pot</p>
                      <p className="font-semibold">₹{group.currentPot}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-500">Next Draw</p>
                      <p className="font-semibold">{group.nextDraw}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition">
                      Contribute
                    </button>
                    <button className="px-3 py-1 border border-indigo-600 text-indigo-600 text-sm rounded hover:bg-indigo-50 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'transactions' && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Transaction History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map(txn => (
                    <tr key={txn.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.date}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${txn.type === 'Received' ? 'text-green-600' : 'text-gray-900'}`}>
                        {txn.type === 'Received' ? '+' : '-'}₹{txn.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.group}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BissiBanking;