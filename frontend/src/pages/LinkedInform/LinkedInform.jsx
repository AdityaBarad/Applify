import { useState, useEffect } from 'react';
import './LinkedInform.css';
import { FaLock } from 'react-icons/fa';

const LinkedInFormPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    totalJobsToApply: '1', // Default to 1 job
    keywords: '',
    location: '',
    experience: '',
    applyFilter: 'Past week',
    expectedSalary: '',
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(''); // Error state
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [jobsApplied, setJobsApplied] = useState(0); // Number of jobs applied state
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Button disable state

  useEffect(() => {
    const checkIfButtonDisabled = () => {
      const lastAppliedDate = localStorage.getItem('lastAppliedDateLinkedIn'); // Separate key for LinkedIn
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

      if (lastAppliedDate === today) {
        setIsButtonDisabled(false); // Disable button if applied today
      } else {
        setIsButtonDisabled(false);
      }
    };

    checkIfButtonDisabled();
  }, []);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(async () => {
        const response = await fetch('http://localhost:5000/api/puppeteer/job-progress');
        const data = await response.json();
        setJobsApplied(data.jobsApplied);
      }, 2000); // Poll the server every 2 seconds

      return () => clearInterval(interval); // Cleanup interval on unmount or when loading stops
    }
  }, [isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner
    setErrorMessage(''); // Clear previous error
    setSuccessMessage(''); // Clear previous success message
    setJobsApplied(0); // Reset the job count

    // try {
    //   const response = await fetch('http://localhost:5000/api/puppeteer/LinkedIn_apply', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData), // Send all form data to the backend
    //   });
    try {
      // Get the email stored in localStorage
      const storedEmail = localStorage.getItem('userEmail');

      // Merge the stored email into the form data
      const formDataWithStoredEmail = {
          ...formData,
          userEmail: storedEmail || formData.email, // Ensure userEmail is included
      };

      const response = await fetch('http://localhost:5000/api/puppeteer/LinkedIn_apply', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithStoredEmail), // Send form data with stored email to the backend
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Jobs applied successfully: ${data.jobsApplied} jobs applied!`);
        localStorage.setItem('lastAppliedDateLinkedIn', new Date().toISOString().split('T')[0]); // Store today's date specifically for LinkedIn
        setIsButtonDisabled(true); // Disable button after successful apply
      } else {
        const errorData = await response.text();
        throw new Error(errorData || 'Something went wrong');
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during job automation.');
    }

    setIsLoading(false); // Stop loading spinner
  };

  return (
    <div className="linkedin-form-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {!isLoading && successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <h1>LinkedIn Job Application</h1>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <div className="loading-text">Submitting... Please wait</div>
          <div className="progress-text">
            {jobsApplied} jobs applied out of {formData.totalJobsToApply}
          </div> {/* Display real-time job progress */}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
           Linkedin Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Linkedin Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Number of Jobs:
            <select
              name="totalJobsToApply"
              value={formData.totalJobsToApply}
              onChange={handleChange}
              disabled={isButtonDisabled}
            >
              {[...Array(50).keys()].map(num => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </label>
          <label>
            Expected Salary:
            <input
              type="number"
              name="expectedSalary"
              value={formData.expectedSalary}
              onChange={handleChange}
            />
          </label>
          <label>
            Position (Domain):
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <label>
            Experience Level In Entered Domain:
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </label>
          <label>
            Job posted Time:
            <select
              name="applyFilter"
              value={formData.applyFilter}
              onChange={handleChange}
            >
              <option value="Past 24 hours">Past 24 hours</option>
              <option value="Past week">Past week</option>
            </select>
          </label>
          <button className="submitForm" type="submit" disabled={isButtonDisabled}>
            {isButtonDisabled ? <><FaLock /> Locked (opens in 24hrs)</> : 'Start Applying'}
          </button>
        </form>
      )}
    </div>
  );
};

export default LinkedInFormPage;



