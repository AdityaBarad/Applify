import React from 'react';
import './AutoApplyPage.css';
import { useNavigate } from 'react-router-dom';

const AutoApplyPage = () => {

  const navigate = useNavigate();

  // useEffect(() => {
  //     // Get email from query parameter
  //     const params = new URLSearchParams(window.location.search);
  //     const email = params.get('email');

  //     if (email) {
  //         // Store the email in localStorage
  //         localStorage.setItem('userEmail', email);
  //         navigate('/autoapply'); // Redirect to the page without query parameters
  //     }
  // }, [navigate]);

  return (
    <div className="dashboard">
      <section class="articles">
    <article>
      <div class="article-wrapper">
        <figure>
          <img src="intern.jpg" alt="" />
        </figure>
        <div class="article-body">
          <h2>Internshala</h2>
          <p>
          Automate Internshala job applications with just one click. Boost your job search efficiency!
          </p>
          <button className="login-btn3" onClick={() => navigate('/internshala-form')}>AutoApply Internshala</button>
          <button className="login-btn4" onClick={() => navigate('/internshala-form')}>Subscribe</button>
        </div>
      </div>
    </article>

    <article>
  
      <div class="article-wrapper">
        <figure>
          <img src="link (2).png" alt="" />
        </figure>
        <div class="article-body">
          <h2>Linkedin</h2>
          <p>
          Automate LinkedIn job applications with just one click. Boost your job search efficiency!
          </p>
          <button className="login-btn3" onClick={() => navigate('/linkedin-form')}>AutoApply LinkedIn</button>  
          <button className="login-btn4" onClick={() => navigate('/linkedin-form')}>Subscribe</button>  
        </div>
      </div>
    </article>


    <article>
      <div class="article-wrapper">
        <figure>
          <img className="indeed" src="indeed1.png" alt="" />
        </figure>
        <div class="article-body">
          <h2>Indeed</h2>
          <p>
          Automate Indeed job applications with just one click. Boost your job search efficiency!
          </p>
          <button className="login-btn3" onClick={() => navigate('/internshala-form')}>AutoApply Indeed</button>
          <button className="login-btn4" onClick={() => navigate('/internshala-form')}>Subscribe</button>
        </div>
      </div>
    </article>
  </section>
      </div>
  );
};

export default AutoApplyPage;


