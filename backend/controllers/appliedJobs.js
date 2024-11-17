import db from '../db.js'; // Import the pool with ES6 syntax

export async function getAppliedJobs(req, res) {
    const { userEmail } = req.query;

    try {
        // Check if the user exists using simple db.query structure
        const userResult = await db.query('SELECT id FROM users WHERE email = $1', [userEmail]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userId = userResult.rows[0].id;

        // Retrieve the applied jobs for the user
        const result = await db.query(
            'SELECT job_title, company_name, job_url, applied_time, status FROM applied_jobs WHERE user_id = $1',
            [userId]
        );

        // Send the retrieved job data
        res.json(result.rows);

    } catch (error) {
        console.error('Error retrieving jobs:', error);
        res.status(500).json({ message: 'Error retrieving jobs' });
    }
}



