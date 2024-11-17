
import React, { useState, useEffect } from 'react';
import './ManageJobsPage.css';

const ManageJobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [stats, setStats] = useState({
        totalJobs: 0,
        weeklyJobs: 0,
        monthlyJobs: 0,
        todayJobs: 0,  // New state for today's jobs
    });
    const [selectedDate, setSelectedDate] = useState('monthly');  // Default to 'monthly'

    const userEmail = localStorage.getItem('userEmail');

    // useEffect(() => {
    //     async function fetchJobs() {
    //         try {
    //             const response = await fetch(`http://localhost:5000/api/applied-jobs?userEmail=${userEmail}`);
    //             const data = await response.json();
    //             console.log(data); // Ensure data is fetched
    //             setJobs(data);
    //             calculateStatistics(data);
    //         } catch (error) {
    //             console.error('Error fetching applied jobs:', error);
    //         }
    //     }

    //     fetchJobs();
    // }, [userEmail]);
    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await fetch(`http://localhost:5000/api/applied-jobs?userEmail=${userEmail}`);
                const data = await response.json();
                
                // Sort the jobs by applied_time in descending order
                const sortedJobs = data.sort((a, b) => new Date(b.applied_time) - new Date(a.applied_time));
                
                console.log(sortedJobs); // Ensure sorted data is fetched
                setJobs(sortedJobs);
                calculateStatistics(sortedJobs);
            } catch (error) {
                console.error('Error fetching applied jobs:', error);
            }
        }
    
        fetchJobs();
    }, [userEmail]);
    

    const calculateStatistics = (data) => {
        const totalJobs = data.length;

        // Count jobs applied today
        const todayJobs = data.filter(job => {
            const jobDate = new Date(job.applied_time);
            const currentDate = new Date();
            return jobDate.toDateString() === currentDate.toDateString();
        }).length;

        const weeklyJobs = data.filter(job => {
            const jobDate = new Date(job.applied_time);
            const currentDate = new Date();
            const diffInDays = Math.floor((currentDate - jobDate) / (1000 * 60 * 60 * 24));
            return diffInDays <= 7;
        }).length;

        const monthlyJobs = data.filter(job => {
            const jobDate = new Date(job.applied_time);
            const currentDate = new Date();
            return jobDate.getMonth() === currentDate.getMonth() && jobDate.getFullYear() === currentDate.getFullYear();
        }).length;

        setStats({ totalJobs, weeklyJobs, monthlyJobs, todayJobs });
        console.log('Statistics:', { totalJobs, weeklyJobs, monthlyJobs, todayJobs }); // Ensure stats are calculated
    };

    const handleDateFilterChange = (e) => {
        setSelectedDate(e.target.value);
        console.log('Selected Date:', e.target.value);  // Log to ensure selected value is correct
    };

    const filteredJobs = selectedDate === 'monthly'
        ? jobs.filter(job => {
            const jobDate = new Date(job.applied_time);
            const currentDate = new Date();
            return jobDate.getMonth() === currentDate.getMonth() && jobDate.getFullYear() === currentDate.getFullYear();
        })
        : selectedDate === 'weekly'
        ? jobs.filter(job => {
            const jobDate = new Date(job.applied_time);
            const currentDate = new Date();
            const diffInDays = Math.floor((currentDate - jobDate) / (1000 * 60 * 60 * 24));
            return diffInDays <= 7;
        })
        : selectedDate === 'today'
        ? jobs.filter(job => {
            const jobDate = new Date(job.applied_time);
            const currentDate = new Date();
            return jobDate.toDateString() === currentDate.toDateString();
        })
        : jobs; // Show all jobs for 'all' option

    return (
        <div className="manage-jobs-container">
             <p className="manage">Manage Applied Jobs</p>

             {/* <div className="stats-container1">
                 <div className="stats-card">
                     <h3>Total Jobs Applied</h3>
                     <p>{stats.totalJobs}</p>
                 </div>
                 <div className="stats-card">
             <h3>Jobs Applied (Today)</h3>
                     <p>{stats.todayJobs}</p> 
                 </div>
                 <div className="stats-card">
                     <h3>Jobs Applied (This Week)</h3>
                     <p>{stats.weeklyJobs}</p>
                </div>
                <div className="stats-card">
                    <h3>Jobs Applied (This Month)</h3>
                     <p>{stats.monthlyJobs}</p>
                 </div>
             </div> */}

            <div className="filter-container">
                <select onChange={handleDateFilterChange} value={selectedDate}>
                    <option value="monthly">This Month</option>
                    <option value="weekly">This Week</option>
                    <option value="today">Today</option> {/* Added "Today" option */}
                    <option value="all">All Time</option>
                </select>
            </div>

            <table className="jobs-table">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company Name</th>
                        <th>Job URL</th>
                        <th>Applied Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredJobs.map((job, index) => (
                        <tr key={index}>
                            <td>{job.job_title}</td>
                            <td>{job.company_name}</td>
                            <td><a href={job.job_url} target="_blank" rel="noopener noreferrer">Job Link</a></td>
                            <td>{new Date(job.applied_time).toLocaleString()}</td>
                            <td>{job.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageJobsPage;

