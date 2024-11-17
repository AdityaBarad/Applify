// // StatsPage.js
// import React, { useState, useEffect } from 'react';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import './sats.css';

// const StatsPage = () => {
//     const [jobs, setJobs] = useState([]);

//     const userEmail = localStorage.getItem('userEmail'); // or however you store it

//     useEffect(() => {
//         async function fetchJobs() {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/applied-jobs?userEmail=${userEmail}`);
//                 const data = await response.json();
//                 console.log(data);
//                 setJobs(data);
//             } catch (error) {
//                 console.error('Error fetching applied jobs:', error);
//             }
//         }

//         fetchJobs();
//     }, [userEmail]);

//     // Stats calculations
//     const totalJobsApplied = jobs.length;
//     const statusCount = jobs.reduce((acc, job) => {
//         acc[job.status] = (acc[job.status] || 0) + 1;
//         return acc;
//     }, {});

//     const pieData = [
//         { name: 'Total Jobs Applied', value: totalJobsApplied },
//         { name: 'Helped by Applify', value: totalJobsApplied * 0.8 } // assuming 80% success rate by Applify
//     ];

//     const barData = Object.keys(statusCount).map((status) => ({
//         status: status,
//         count: statusCount[status]
//     }));

//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//     return (
//         <div className="stats-container">
//             <h2 className="stats-title">Job Application Stats</h2>
//             <div className="stats-section">
//                 <h3>Total Applications Overview</h3>
//                 <ResponsiveContainer width="50%" height={300}>
//                     <PieChart>
//                         <Pie
//                             data={pieData}
//                             cx="50%"
//                             cy="50%"
//                             labelLine={false}
//                             label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                             outerRadius={100}
//                             fill="#8884d8"
//                             dataKey="value"
//                         >
//                             {pieData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                             ))}
//                         </Pie>
//                         <Tooltip />
//                     </PieChart>
//                 </ResponsiveContainer>
//             </div>

//             <div className="stats-section">
//                 <h3>Job Application Status</h3>
//                 <ResponsiveContainer width="80%" height={400}>
//                     <BarChart data={barData}>
//                         <XAxis dataKey="status" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="count" fill="#82ca9d" />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default StatsPage;


// import React, { useState, useEffect } from 'react';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import './sats.css';

// const StatsPage = () => {
//     const [jobs, setJobs] = useState([]);
//     const [selectedFilter, setSelectedFilter] = useState('all');  // Default filter for 'all' time period

//     const userEmail = localStorage.getItem('userEmail');  // Assuming the user email is stored in localStorage

//     useEffect(() => {
//         async function fetchJobs() {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/applied-jobs?userEmail=${userEmail}`);
//                 const data = await response.json();
//                 setJobs(data);
//             } catch (error) {
//                 console.error('Error fetching applied jobs:', error);
//             }
//         }

//         fetchJobs();
//     }, [userEmail]);

//     // Function to filter jobs based on selected time period
//     const filterJobsByTime = (jobs, filter) => {
//         const currentDate = new Date();

//         if (filter === 'today') {
//             return jobs.filter(job => {
//                 const jobDate = new Date(job.applied_time);
//                 return jobDate.toDateString() === currentDate.toDateString();
//             });
//         } else if (filter === 'weekly') {
//             const oneWeekAgo = new Date();
//             oneWeekAgo.setDate(currentDate.getDate() - 7);
//             return jobs.filter(job => new Date(job.applied_time) >= oneWeekAgo);
//         } else if (filter === 'monthly') {
//             return jobs.filter(job => {
//                 const jobDate = new Date(job.applied_time);
//                 return jobDate.getMonth() === currentDate.getMonth() && jobDate.getFullYear() === currentDate.getFullYear();
//             });
//         } else {
//             return jobs;  // No filter applied, show all
//         }
//     };

//     const filteredJobs = filterJobsByTime(jobs, selectedFilter);

//     const totalJobsApplied = filteredJobs.length;
//     const statusCount = filteredJobs.reduce((acc, job) => {
//         acc[job.status] = (acc[job.status] || 0) + 1;
//         return acc;
//     }, {});

//     const pieData = [
//         { name: 'Total Jobs Applied', value: totalJobsApplied },
//         { name: 'Helped by Applify', value: totalJobsApplied * 0.8 },  // Assuming 80% success rate by Applify
//     ];

//     const barData = Object.keys(statusCount).map(status => ({
//         status: status,
//         count: statusCount[status],
//     }));

//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//     return (
//         <div className="stats-container">
//             <h2 className="stats-title">Job Application Stats</h2>

//             {/* Filter for time period */}
//             <div className="filter-container">
//                 <label>Filter by: </label>
//                 <select onChange={(e) => setSelectedFilter(e.target.value)} value={selectedFilter}>
//                     <option value="all">All Time</option>
//                     <option value="today">Today</option>
//                     <option value="weekly">This Week</option>
//                     <option value="monthly">This Month</option>
//                 </select>
//             </div>

//             {/* Pie Chart for Total Applications Overview */}
//             <div className="stats-section">
//                 <h3>Total Applications Overview</h3>
//                 <ResponsiveContainer width="50%" height={300}>
//                     <PieChart>
//                         <Pie
//                             data={pieData}
//                             cx="50%"
//                             cy="50%"
//                             labelLine={false}
//                             label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                             outerRadius={100}
//                             dataKey="value"
//                         >
//                             {pieData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                             ))}
//                         </Pie>
//                         <Tooltip />
//                     </PieChart>
//                 </ResponsiveContainer>
//             </div>

//             {/* Bar Chart for Job Application Status */}
//             <div className="stats-section">
//                 <h3>Job Application Status</h3>
//                 <ResponsiveContainer width="80%" height={400}>
//                     <BarChart data={barData}>
//                         <XAxis dataKey="status" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="count" fill="#82ca9d" />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default StatsPage;

// import React, { useState, useEffect } from 'react'; 
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import './sats.css';

// const StatsPage = () => {
//     const [jobs, setJobs] = useState([]);

//     const userEmail = localStorage.getItem('userEmail');  // Assuming the user email is stored in localStorage

//     useEffect(() => {
//         async function fetchJobs() {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/applied-jobs?userEmail=${userEmail}`);
//                 const data = await response.json();
//                 setJobs(data);
//             } catch (error) {
//                 console.error('Error fetching applied jobs:', error);
//             }
//         }

//         fetchJobs();
//     }, [userEmail]);

//     // Create data for the graph: count of jobs applied on each day
//     const formatDataForGraph = (jobs) => {
//         const jobCountByDate = jobs.reduce((acc, job) => {
//             const jobDate = new Date(job.applied_time).toDateString(); // Using toDateString() for easier comparison
//             acc[jobDate] = (acc[jobDate] || 0) + 1;
//             return acc;
//         }, {});

//         // Convert jobCountByDate into an array suitable for the graph
//         return Object.keys(jobCountByDate).map(date => ({
//             date,
//             count: jobCountByDate[date]
//         })).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
//     };

//     const graphData = formatDataForGraph(jobs);

//     return (
//         <div className="stats-container">
//             <h2 className="stats-title">Job Application Stats</h2>

//             {/* Bar Chart for Job Applications Over Time */}
//             <div className="stats-section">
//                 <h3>Job Applications Over Time</h3>
//                 <ResponsiveContainer width="80%" height={400}>
//                     <BarChart data={graphData}>
//                         <XAxis dataKey="date" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="count" fill="#82ca9d" />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default StatsPage;


// import React, { useState, useEffect } from 'react';  
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import './stats.css';

// const StatsPage = () => {
//     const [jobs, setJobs] = useState([]);

//     const userEmail = localStorage.getItem('userEmail');

//     useEffect(() => {
//         async function fetchJobs() {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/applied-jobs?userEmail=${userEmail}`);
//                 const data = await response.json();
//                 setJobs(data);
//             } catch (error) {
//                 console.error('Error fetching applied jobs:', error);
//             }
//         }
//         fetchJobs();
//     }, [userEmail]);

//     const formatDataForGraph = (jobs) => {
//         const jobCountByDate = jobs.reduce((acc, job) => {
//             const jobDate = new Date(job.applied_time).toDateString();
//             acc[jobDate] = (acc[jobDate] || 0) + 1;
//             return acc;
//         }, {});

//         return Object.keys(jobCountByDate).map(date => ({
//             date,
//             count: jobCountByDate[date]
//         })).sort((a, b) => new Date(a.date) - new Date(b.date));
//     };

//     const graphData = formatDataForGraph(jobs);

//     const totalJobsApplied = jobs.length;
//     const jobStatusCount = jobs.reduce((acc, job) => {
//         acc[job.status] = (acc[job.status] || 0) + 1;
//         return acc;
//     }, {});

//     const pieData = [
//         { name: 'Total Jobs Applied', value: totalJobsApplied },
//         { name: 'Helped by Applify', value: totalJobsApplied * 0.8 },
//     ];

//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//     const statusPieData = Object.keys(jobStatusCount).map(status => ({
//         name: status,
//         value: jobStatusCount[status],
//     }));

//     return (
//         <div className="stats-container">
//             <h2 className="stats-title">Job Application Dashboard</h2>
//             <div className="stats-grid">
//                 <div className="stats-card">
//                     <h3>Total Jobs Applied</h3>
//                     <p>{totalJobsApplied}</p>
//                     <h3>Jobs Applied (Today)</h3>

//                     <h3>Jobs Applied (This Week)</h3>

//                     <h3>Jobs Applied (This Month)</h3>

//                 </div>

//                 <div className="stats-card">
//                     <h3>Application Overview</h3>
//                     <ResponsiveContainer width="100%" height={250}>
//                         <PieChart>
//                             <Pie
//                                 data={pieData}
//                                 cx="50%"
//                                 cy="50%"
//                                 labelLine={false}
//                                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                                 outerRadius={100}
//                                 innerRadius={60}
//                                 dataKey="value"
//                             >
//                                 {pieData.map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                 ))}
//                             </Pie>
//                             <Tooltip />
//                         </PieChart>
//                     </ResponsiveContainer>
//                 </div>

//                 <div className="stats-card">
//                     <h3>Job Applications Over Time</h3>
//                     <ResponsiveContainer width="100%" height={300}>
//                         <BarChart data={graphData}>
//                             <XAxis dataKey="date" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Bar dataKey="count" fill="#82ca9d" />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>

//                 <div className="stats-card">
//                     <h3>Job Status Distribution</h3>
//                     <ResponsiveContainer width="100%" height={250}>
//                         <PieChart>
//                             <Pie
//                                 data={statusPieData}
//                                 cx="50%"
//                                 cy="50%"
//                                 labelLine={false}
//                                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                                 outerRadius={100}
//                                 innerRadius={60}
//                                 dataKey="value"
//                             >
//                                 {statusPieData.map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                 ))}
//                             </Pie>
//                             <Tooltip />
//                         </PieChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StatsPage;

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './stats.css';

const StatsPage = () => {
    const [jobs, setJobs] = useState([]);

    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await fetch(`http://localhost:5000/api/applied-jobs?userEmail=${userEmail}`);
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching applied jobs:', error);
            }
        }
        fetchJobs();
    }, [userEmail]);

    const getStartOfWeek = () => {
        const now = new Date();
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(now.setDate(diff));
    };

    const getStartOfMonth = () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    };

    const jobsAppliedToday = jobs.filter(job => {
        const jobDate = new Date(job.applied_time).toDateString();
        return jobDate === new Date().toDateString();
    }).length;

    const jobsAppliedThisWeek = jobs.filter(job => {
        const jobDate = new Date(job.applied_time);
        return jobDate >= getStartOfWeek();
    }).length;

    const jobsAppliedThisMonth = jobs.filter(job => {
        const jobDate = new Date(job.applied_time);
        return jobDate >= getStartOfMonth();
    }).length;

    const formatDataForGraph = (jobs) => {
        const jobCountByDate = jobs.reduce((acc, job) => {
            const jobDate = new Date(job.applied_time).toDateString();
            acc[jobDate] = (acc[jobDate] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(jobCountByDate).map(date => ({
            date,
            count: jobCountByDate[date]
        })).sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const graphData = formatDataForGraph(jobs);

    const totalJobsApplied = jobs.length;
    const jobStatusCount = jobs.reduce((acc, job) => {
        acc[job.status] = (acc[job.status] || 0) + 1;
        return acc;
    }, {});

    const pieData = [
        { name: 'Applied', value: totalJobsApplied },
        { name: 'time saved', value: totalJobsApplied * 0.6 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const statusPieData = Object.keys(jobStatusCount).map(status => ({
        name: status,
        value: jobStatusCount[status],
    }));

    // New pie data for jobs applied per day, week, month, and total
    const applicationPieData = [
        { name: 'T', value: jobsAppliedToday },
        { name: 'W', value: jobsAppliedThisWeek },
        { name: 'M', value: jobsAppliedThisMonth },
        { name: 'Total', value: totalJobsApplied }
    ];

    return (
        <div className="stats-container">
            <h2 className="stats-title">Job Application Dashboard</h2>
            <div className="stats-grid">
                <div className="stats-card">
                    <h3>Total Jobs Applied</h3>
                    <p>{totalJobsApplied}</p>
                    <h3>Today</h3>
                    <p>{jobsAppliedToday}</p>
                    <h3>This Week</h3>
                    <p>{jobsAppliedThisWeek}</p>
                    <h3>This Month</h3>
                    <p>{jobsAppliedThisMonth}</p>
                </div>

                <div className="stats-card">
                    <h3>Applications Per Period</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={applicationPieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                innerRadius={60}
                                dataKey="value"
                            >
                                {applicationPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                

                <div className="stats-card">
                    <h3>Job Applications Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={graphData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="stats-card">
                    <h3>Application Overview</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                innerRadius={60}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="stats-card">
                    <h3>Job Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={statusPieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                innerRadius={60}
                                dataKey="value"
                            >
                                {statusPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* New pie chart showing applications by day, week, month, total */}
                
            </div>
        </div>
    );
};

export default StatsPage;




