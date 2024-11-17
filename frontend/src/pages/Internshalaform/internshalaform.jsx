// import { useState, useEffect } from 'react';
// import './Internshalaform.css';
// import { FaLock } from 'react-icons/fa';

// const InternshalaformPage = () => {
//   const [formData, setFormData] = useState({
//     id: '',
//     pass: '',
//     totalJobs: '1', // Default to 1 job
//     FILTER1: '',
//     FILTER2: '',
//     FILTER3: '',
//     coverletter: '',
//   });

//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const [errorMessage, setErrorMessage] = useState(''); // Error state
//   const [successMessage, setSuccessMessage] = useState(''); // Success message state
//   const [jobsApplied, setJobsApplied] = useState(0); // Number of jobs applied state
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Button disable state

//   useEffect(() => {
//     const checkIfButtonDisabled = () => {
//       const lastAppliedDate = localStorage.getItem('lastAppliedDate');
//       const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

//       if (lastAppliedDate === today) {
//         setIsButtonDisabled(true); // Disable button if applied today
//       } else {
//         setIsButtonDisabled(false);
//       }
//     };

//     checkIfButtonDisabled();
//   }, []);

//   useEffect(() => {
//     if (isLoading) {
//       const interval = setInterval(async () => {
//         const response = await fetch('http://localhost:5000/api/Ipuppeteer/job-progress');
//         const data = await response.json();
//         setJobsApplied(data.jobsApplied);
//       }, 2000); // Poll the server every 2 seconds

//       return () => clearInterval(interval); // Cleanup interval on unmount or when loading stops
//     }
//   }, [isLoading]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Start loading spinner
//     setErrorMessage(''); // Clear previous error
//     setSuccessMessage(''); // Clear previous success message
//     setJobsApplied(0); // Reset the job count

//     try {
//       const response = await fetch('http://localhost:5000/api/Ipuppeteer/Internshala_apply', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData), // Send all form data to the backend
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSuccessMessage(`Jobs applied successfully: ${data.jobsApplied} jobs applied!`);
//         localStorage.setItem('lastAppliedDate', new Date().toISOString().split('T')[0]); // Store today's date
//         setIsButtonDisabled(true); // Disable button after successful apply
//       } else {
//         const errorData = await response.text();
//         throw new Error(errorData || 'Something went wrong');
//       }
//     } catch (error) {
//       setErrorMessage(error.message || 'An error occurred during job automation.');
//     }

//     setIsLoading(false); // Stop loading spinner
//   };

//   return (
//     <div className="linkedin-form-container">
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       {!isLoading && successMessage && (
//         <div className="success-message">{successMessage}</div>
//       )}
//       <h1>Internshala Job Application</h1>
//       {isLoading ? (
//         <div className="spinner-container">
//           <div className="spinner"></div>
//           <div className="loading-text">Submitting... Please wait</div>
//           <div className="progress-text">
//             {jobsApplied} jobs applied out of {formData.totalJobs}
//           </div> {/* Display real-time job progress */}
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <label>
//             Email:
//             <input
//               type="email"
//               name="id"
//               value={formData.id}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//           pass:
//             <input
//               type="password"
//               name="pass"
//               value={formData.pass}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Number of Jobs:
//             <select
//               name="totalJobs"
//               value={formData.totalJobs}
//               onChange={handleChange}
//               disabled={isButtonDisabled}
//             >
//               {[...Array(30).keys()].map(num => (
//                 <option key={num + 1} value={num + 1}>
//                   {num + 1}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <label>
//           FILTER1:
//             <input
//               type="text"
//               name="FILTER1"
//               value={formData.FILTER1}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//           FILTER2:
//             <input
//               type="text"
//               name="FILTER2"
//               value={formData.FILTER2}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//           FILTER3 Level:
//             <input
//               type="text"
//               name="FILTER3"
//               value={formData.FILTER3}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//           coverletter:
//             <input
//               type="text"
//               name="coverletter"
//               value={formData.coverletter}
//               onChange={handleChange}
//             />
//           </label>
//           <button type="submit" disabled={isButtonDisabled}>
//             {isButtonDisabled ? <><FaLock /> Locked (opens in 24hrs)</> : 'Start Applying'}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default InternshalaformPage;



import { useState, useEffect } from 'react';
import './Internshalaform.css';
import { FaLock } from 'react-icons/fa';

const InternshalaformPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    pass: '',
    totalJobs: '1', // Default to 1 job
    FILTER1: '',
    FILTER2: '',
    FILTER3: '',
    coverletter: '',
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(''); // Error state
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [jobsApplied, setJobsApplied] = useState(0); // Number of jobs applied state
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Button disable state

  useEffect(() => {
    const checkIfButtonDisabled = () => {
      const lastAppliedDate = localStorage.getItem('lastAppliedDateInternshala'); // Separate key for Internshala
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

      if (lastAppliedDate === today) {
        setIsButtonDisabled(true); // Disable button if applied today
      } else {
        setIsButtonDisabled(false);
      }
    };

    checkIfButtonDisabled();
  }, []);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(async () => {
        const response = await fetch('http://localhost:5000/api/Ipuppeteer/job-progress');
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

    try {
      const response = await fetch('http://localhost:5000/api/Ipuppeteer/Internshala_apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send all form data to the backend
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Jobs applied successfully: ${data.jobsApplied} jobs applied!`);
        localStorage.setItem('lastAppliedDateInternshala', new Date().toISOString().split('T')[0]); // Store today's date specifically for Internshala
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
    <div className="internshala-form-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {!isLoading && successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <h2>Internshala Job Application</h2>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <div className="loading-text">Submitting... Please wait</div>
          <div className="progress-text">
            {jobsApplied} jobs applied out of {formData.totalJobs}
          </div> {/* Display real-time job progress */}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Internshala Email ID:
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </label>
          <label>
          Internshala Password:
            <input
              type="password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Number of Jobs:
            <select
              name="totalJobs"
              value={formData.totalJobs}
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
            Cover Letter:
            <input
              type="text"
              name="coverletter"
              value={formData.coverletter}
              onChange={handleChange}
            />
          </label>
          <label>
            Job Domain - Filter 1:
            <input
              type="text"
              name="FILTER1"
              value={formData.FILTER1}
              onChange={handleChange}
            />
          </label>
          <label>
          Job Domain - Filter 2:
            <input
              type="text"
              name="FILTER2"
              value={formData.FILTER2}
              onChange={handleChange}
            />
          </label>
          <label>
          Job Domain - Filter 3:
            <input
              type="text"
              name="FILTER3"
              value={formData.FILTER3}
              onChange={handleChange}
            />
          </label>
          <button className="submitForm" type="submit" disabled={isButtonDisabled}>
            {isButtonDisabled ? <><FaLock /> Locked (opens in 24hrs)</> : 'Start Applying'}
          </button>
        </form>
      )}
    </div>
  );
};

export default InternshalaformPage;
