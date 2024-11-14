import React, { useEffect, useState } from 'react';
import { databases } from '../AppwriteConfig';
import * as XLSX from 'xlsx';
import { FaFileExport, FaTrash, FaSearch } from 'react-icons/fa';

const AdminPanel = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [workDetailsData, setWorkDetailsData] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [filteredWorkDetails, setFilteredWorkDetails] = useState([]);
  const [uniqueEmails, setUniqueEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('attendance');
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const defaultPassword = 'akm';

  // Check password on submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === defaultPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  // Fetch Attendance Data
  const fetchAttendanceData = async () => {
    try {
      const response = await databases.listDocuments('6730c1950007c16da598', 'attendance');
      setAttendanceData(response.documents);
      setFilteredAttendance(response.documents);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      alert('Failed to fetch attendance data.');
    }
  };

  // Fetch Work Details Data
  const fetchWorkDetailsData = async () => {
    try {
      const response = await databases.listDocuments('6730c1950007c16da598', 'workdetailscollection');
      setWorkDetailsData(response.documents);
      setFilteredWorkDetails(response.documents);
      extractUniqueEmails(response.documents);
    } catch (error) {
      console.error('Error fetching work details data:', error);
      alert('Failed to fetch work details data.');
    }
  };

  // Extract Unique Emails from Work Details and Attendance Data
  const extractUniqueEmails = (data) => {
    const emails = data
      .map((item) => item.employeeId || 'Unknown')
      .filter((email) => email !== 'Unknown');
    setUniqueEmails([...new Set(emails)]);
  };

  useEffect(() => {
    Promise.all([fetchAttendanceData(), fetchWorkDetailsData()]).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  // Filter emails based on search term
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    const filteredEmails = uniqueEmails.filter((email) =>
      email.toLowerCase().includes(query)
    );
    setUniqueEmails(filteredEmails);
  };

  // Filter data by selected email
  const handleFilterByEmail = () => {
    const filteredAttendance = attendanceData.filter((item) =>
      item.employeeId === selectedEmail
    );
    const filteredWorkDetails = workDetailsData.filter((item) =>
      item.employeeId === selectedEmail
    );
    setFilteredAttendance(filteredAttendance);
    setFilteredWorkDetails(filteredWorkDetails);
  };

  const exportToExcel = (data, sheetName) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${sheetName}.xlsx`);
  };

  const deleteDocument = async (documentId, collectionId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await databases.deleteDocument('6730c1950007c16da598', collectionId, documentId);
        alert('Document deleted successfully!');
        fetchWorkDetailsData(); // Refresh after deletion
        fetchAttendanceData(); // Refresh after deletion
      } catch (error) {
        console.error('Error deleting document:', error);
        alert('Failed to delete document.');
      }
    }
  };

  // Paginate function
  const paginate = (data) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Password authentication form
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handlePasswordSubmit} className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Enter Admin Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out w-full"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex space-x-8 p-8">
      {/* Left Panel: User List and Search */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 rounded-lg w-full"
            placeholder="Search by email"
          />
          <FaSearch className="ml-2 text-gray-600" />
        </div>

        <ul className="space-y-2">
          {uniqueEmails.map((email) => (
            <li
              key={email}
              className="cursor-pointer hover:bg-blue-100 p-2 rounded"
              onClick={() => {
                setSelectedEmail(email);
                handleFilterByEmail();
              }}
            >
              {email}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel: Work Details / Attendance */}
      <div className="w-3/4 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Work Details for {selectedEmail || 'all users'}</h1>

        {/* Tab Selection */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setSelectedTab('attendance')}
            className={selectedTab === 'attendance' ? 'font-bold' : ''}
          >
            Attendance
          </button>
          <button
            onClick={() => setSelectedTab('workdetails')}
            className={selectedTab === 'workdetails' ? 'font-bold' : ''}
          >
            Work Details
          </button>
        </div>

        {/* Export Button */}
        <button
          onClick={() =>
            selectedTab === 'attendance'
              ? exportToExcel(filteredAttendance, 'Attendance')
              : exportToExcel(filteredWorkDetails, 'Work Details')
          }
          className="flex items-center bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600 transition duration-200 ease-in-out"
          disabled={loading || (selectedTab === 'attendance' ? filteredAttendance.length === 0 : filteredWorkDetails.length === 0)}
        >
          <FaFileExport className="mr-2" /> Export to Excel
        </button>

        {/* Attendance Table */}
        {selectedTab === 'attendance' && (
          <div>
            <h2 className="text-xl font-semibold">Employee Attendance</h2>
            <table className="w-full text-left border border-gray-200 mt-4">
              <thead>
                <tr>
                  <th className="p-2 border-b">Employee ID</th>
                  <th className="p-2 border-b">Timestamp</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginate(filteredAttendance).map((item) => (
                  <tr key={item.$id}>
                    <td className="p-2 border-b">{item.employeeId}</td>
                    <td className="p-2 border-b">{new Date(item.timestamp).toLocaleString()}</td>
                    <td className="p-2 border-b">
                      <button
                        onClick={() => deleteDocument(item.$id, 'attendance')}
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200 ease-in-out"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
              >
                Prev
              </button>
              <span className="mx-3">{page}</span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={filteredAttendance.length <= page * itemsPerPage}
                className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Work Details Table */}
        {selectedTab === 'workdetails' && (
          <div>
            <h2 className="text-xl font-semibold">Employee Work Details</h2>
            <table className="w-full text-left border border-gray-200 mt-4">
              <thead>
                <tr>
                  <th className="p-2 border-b">Date</th>
                  <th className="p-2 border-b">Employee Email</th>
                  <th className="p-2 border-b">Task Description</th>
                  <th className="p-2 border-b">Time Spent</th>
                  <th className="p-2 border-b">Priority</th>
                  <th className="p-2 border-b">Progress (%)</th>
                  <th className="p-2 border-b">Issues</th>
                  <th className="p-2 border-b">Achievements</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginate(filteredWorkDetails).map((item) => (
                  <tr key={item.$id}>
                    <td className="p-2 border-b">{item.date}</td>
                    <td className="p-2 border-b">{item.employeeId || 'No Email'}</td>
                    <td className="p-2 border-b">{item.taskDescription}</td>
                    <td className="p-2 border-b">{item.timeSpent}</td>
                    <td className="p-2 border-b">{item.priority}</td>
                    <td className="p-2 border-b">{item.progress}</td>
                    <td className="p-2 border-b">{item.issues}</td>
                    <td className="p-2 border-b">{item.achievements}</td>
                    <td className="p-2 border-b">
                      <button
                        onClick={() => deleteDocument(item.$id, 'workdetailscollection')}
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200 ease-in-out"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
              >
                Prev
              </button>
              <span className="mx-3">{page}</span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={filteredWorkDetails.length <= page * itemsPerPage}
                className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
