import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
//     <div className="homeContainer">
// <header className="homeheader">
//     <div className="header-container">
//         <div className="logo">
//             <img src="fav.png" alt="Applify Logo" className="logo-img" />
//             <h1>Applify</h1>
//         </div>
//         <nav className="nav">
//             <ul className="nav-menu">
//                 <li><a href="#">Home</a></li>
//                 <li><a href="#">Features</a></li>
//                 <li><a href="#">Pricing</a></li>
//                 <li><a href="#">Blog</a></li>
//                 <li><a href="#">Contact</a></li>
//             </ul>
//         </nav>
//         <div className="home-auth-buttons">
//         <Link to="/Register"><button className="home-register-btn">Register</button></Link>
//         <Link to="/login"><button className="home-login-btn">Login</button></Link>
//         </div>
//     </div>
// </header>

//       <main>
//       <section className="hero">
//     <h1>Automate <br /> Job Search with Applify</h1>
//     <p>Applify helps you streamline your job search by automatically applying to jobs on your behalf.<br /> Focus on interviews while we handle the applications.</p>
//     <div className="hero-buttons">
//         <button className="home-register-btn">Register</button>
//         <button className="home-login-btn">Login</button>
//     </div>
//     <div className="decorative-elements">
//         <div className="decorative-circle"></div>
//         <div className="decorative-square"></div>
//         <div className="decorative-triangle"></div>
//     </div>
// </section>
//         <section className="features">
//           <h2>Features provided by Applify</h2>
//           <div className="features-container">
//             <div className="feature-item">
//               <i className="fas fa-robot"></i>
//               <h3>Automated Applications</h3>
//               <p>Loopcv collects new job postings every day, searching for jobs in your desired locations and automatically applies on your behalf. If you don't want to apply automatically you can check all the matched jobs manually and apply with one click!</p>
//             </div>
//             <div className="feature-item">
//               <i className="fas fa-chart-line"></i>
//               <h3>Smart Tracking</h3>
//               <p>We automatically find the email of the recruiter in a company sending a personalised email. You can select an email template from our predefined set or create your own from scratch. Loopcv will use this email to contact companies trying to hire people like you!</p>
//             </div>
//             <div className="feature-item">
//               <i className="fas fa-bell"></i>
//               <h3>Daily Alerts</h3>
//               <p>Loopcv collects statistics such as how many companies opened your email, how many companies replied and which of you CVs got more attention. You can A/B test different CVs, try different keywords and use Loopcv as a tool to optimise your job search</p>
//             </div>
//           </div>
//         </section>
//       </main>

//       <div class="section">
//     <div class="content">
//         <div class="text">
//             <h2>Section One Title</h2>
//             <p>This is some descriptive text for the first section. It provides details about the feature or service being highlighted.</p>
//         </div>
//         <div class="image">
//             <img src="img.png" alt="Decorative Image" />
//         </div>
//     </div>
//     <div class="decorative-elements">
//         <div class="decorative-circle"></div>
//         <div class="decorative-square"></div>
//         <div class="decorative-triangle"></div>
//     </div>
// </div>

// <div class="section section-reverse">
//     <div class="content">
//         <div class="text">
//             <h2>Section Two Title</h2>
//             <p>This is some descriptive text for the second section. It provides additional information and continues the theme of the page.</p>
//         </div>
//         <div class="image">
//             <img src="img.png" alt="Decorative Image" />
//         </div>
//     </div>
//     <div class="decorative-elements">
//         <div class="decorative-circle"></div>
//         <div class="decorative-square"></div>
//         <div class="decorative-triangle"></div>
//     </div>
// </div>

// <div class="section">
//     <div class="content">
//         <div class="text">
//             <h2>Section One Title</h2>
//             <p>This is some descriptive text for the first section. It provides details about the feature or service being highlighted.</p>
//         </div>
//         <div class="image">
//             <img src="img.png" alt="Decorative Image" />
//         </div>
//     </div>
//     <div class="decorative-elements">
//         <div class="decorative-circle"></div>
//         <div class="decorative-square"></div>
//         <div class="decorative-triangle"></div>
//     </div>
// </div>


// <footer class="footer">
//   <div class="container">
//     <div class="footer-top">
//       <div class="logo-footer">
//         <img src="fav.png" alt="Company Favicon" class="favicon-footer"/>
//         <h1>Applify</h1>
//       </div>
//     </div>
//     <div class="row">
//       <div class="footer-col">
//         <h4>Company</h4>
//         <ul>
//           <li><a href="#">About Us</a></li>
//           <li><a href="#">Our Services</a></li>
//           <li><a href="#">Privacy Policy</a></li>
//           <li><a href="#">Affiliate Program</a></li>
//         </ul>
//       </div>
//       <div class="footer-col">
//         <h4>Get Help</h4>
//         <ul>
//           <li><a href="#">FAQ</a></li>
//           <li><a href="#">Shipping</a></li>
//           <li><a href="#">Returns</a></li>
//           <li><a href="#">Order Status</a></li>
//           <li><a href="#">Payment Options</a></li>
//         </ul>
//       </div>
//       <div class="footer-col">
//         <h4>Online Shop</h4>
//         <ul>
//           <li><a href="#">Watch</a></li>
//           <li><a href="#">Bag</a></li>
//           <li><a href="#">Shoes</a></li>
//           <li><a href="#">Dress</a></li>
//         </ul>
//       </div>
//       <div class="footer-col">
//         <h4>Follow Us</h4>
//         <div class="social-links">
//           <a href="#"><i class="fab fa-facebook-f"></i></a>
//           <a href="#"><i class="fab fa-twitter"></i></a>
//           <a href="#"><i class="fab fa-instagram"></i></a>
//           <a href="#"><i class="fab fa-linkedin-in"></i></a>
//         </div>
//       </div>
//     </div>
//   </div>
// </footer>
//     </div>



 <div>
{/* ===============================================*/}
{/*    Navbar*/}
{/* ===============================================*/}
<nav className="navbar navbar-expand-lg navbar-light sticky-top" data-navbar-on-scroll="data-navbar-on-scroll">
  <div className="container">
    <a className="navbar-brand" href="index.html">
      <img className='homeimg' src="Automation.png" height="31" alt="logo" />
    </a>
    <p className="name">Applify</p>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item"><a className="nav-link" aria-current="page" href="#feature">Features</a></li>
        <li className="nav-item"><a className="nav-link" aria-current="page" href="#validation">Functions</a></li>
        <li className="nav-item"><a className="nav-link" aria-current="page" href="#marketing">Connect</a></li> 
        <li className="nav-item"><a className="nav-link" aria-current="page" href="#marketing">Help</a></li> 
      </ul>
      <div className="d-flex ms-lg-4">
        <a className="btn btn-secondary-outline" href="/autoapply">Sign In</a>
        <a className="btn btn-warning ms-3" href="/Register">Sign Up</a>
      </div>
    </div>
  </div>
</nav>

{/* ===============================================*/}
{/*    Hero Section*/}
{/* ===============================================*/}
{/* <section className="pt-7">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-6 text-md-start text-center py-6">
        <h2 className="mb-4 fs-9 fw-bold">Automate & Manage job applications</h2>
        <p className="mb-6 lead text-secondary"> 🔸 Automate your job applications on top platforms.<br></br>

<br className="d-none d-xl-block" /> 🔸 Apply for jobs in bulk in just one click.<br className="d-none d-xl-block" /><br></br> 🔸 Track and manage your job applications <br className="d-none d-xl-block" /> 🔸 Optimize job hunt by saving time and efforts<br className="d-none d-xl-block" /></p>
        <br className="d-none d-xl-block" />
        <div className="text-center text-md-start">
        <a className="btn btn-secondary-outline" href="/autoapply">Sign In</a>
        <a className="btn btn-warning ms-3" href="/Register">Sign Up</a>
        </div>
      </div>
      <div className="col-md-6 text-end">
        <img className="pt-7 pt-md-0 img-fluid" src="home.png" alt="" />
      </div>
    </div>
  </div>
</section> */}
<section className="pt-7">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-6 text-md-start text-center py-6">
        <h2 className="mb-4 fs-9 fw-bold">Automate & Manage Job Applications</h2>
        <p className="mb-6 lead text-secondary">
          🔸 Automate your job applications on top platforms.<br />
          🔸 Apply for jobs in bulk with just one click.<br />
          🔸 Track and manage your job applications.<br />
          🔸 Optimize your job hunt by saving time and effort.
        </p>
        <div className="text-center text-md-start">
          <a className="btn btn-secondary-outline" href="/autoapply">Sign In</a>
          <a className="btn btn-warning ms-3" href="/Register">Sign Up</a>
        </div>
      </div>
      <div className="col-md-6 text-md-end text-center">
        <img className="pt-7 pt-md-0 img-fluid" src="new.svg" alt="Job Application Illustration" />
      </div>
    </div>
  </div>
</section>


{/* ===============================================*/}
{/*    Features Section*/}
{/* ===============================================*/}
<section className="pt-4 pt-md-9 mb-6" id="feature">
  <div className="bg-holder z-index--1 bottom-0 d-none d-lg-block" style={{ backgroundImage: 'url(assets/img/category/shape.png)', opacity: 0.5 }}></div>
  <div className="container">
    <h2 className="fs-9 fw-bold mb-4 text-center">Features<br className="d-none d-xl-block" /></h2>
    <div className="row">
      <div className="col-lg-3 col-sm-6 mb-2">
        <img className="mb-3 ms-n3" src="automation (1).png" width="75" alt="Feature" />
        <h4 className="mb-3">Automate Jobs</h4>
        <p className="mb-0 fw-medium text-secondary">Simplify job hunt with Applify! Automate applications across platforms and let opportunities come to you.</p>
      </div>
      <div className="col-lg-3 col-sm-6 mb-2">
        <img className="mb-3 ms-n3" src="proposal.png" width="75" alt="Feature" />
        <h4 className="mb-3">Manage applied jobs</h4>
        <p className="mb-0 fw-medium text-secondary">Track and manage all your applications effortlessly with Applify, so you never miss an opportunity!</p>
      </div>
      <div className="col-lg-3 col-sm-6 mb-2">
        <img className="mb-3 ms-n3" src="bar-chart.png" width="75" alt="Feature" />
        <h4 className="mb-3">Check statistics</h4>
        <p className="mb-0 fw-medium text-secondary">Check your application statistics with Applify! Gain insights into your job search and optimize your strategy.</p>
      </div>
      <div className="col-lg-3 col-sm-6 mb-2">
        <img className="mb-3 ms-n3" src="user.png" width="75" alt="Feature" />
        <h4 className="mb-3">clean user Experience</h4>
        <p className="mb-0 fw-medium text-secondary">Experience a clean interface with Applify! Navigate easily and focus on landing your dream job.</p>
      </div>
    </div>
    <br className="d-none d-xl-block" />
    <div className="text-center">
      <a className="btn btn-warning" href="#!" role="button">SIGN UP NOW</a>
    </div>
  </div>
</section>



{/* =============================================== */}
{/*    Manager Section*/}
{/* ===============================================*/}
 {/* <section className="pt-5" id="manager">
   <div className="container">
    <div className="row">
      <div className="col-lg-6">
         <img className="img-fluid" src="img.png" alt="" />
    </div>
     <div className="col-lg-6">
      <h5 className="text-secondary">Easier decision making for</h5>
        <p className="fs-7 fw-bold mb-2">Product Managers</p>
        <p className="mb-4 fw-medium text-secondary">
         The Myspace page defines the individual, his or her characteristics, traits, personal choices and the overall<br />personality of the person.
       </p>       <div className="d-flex align-items-center mb-3">
        <img className="me-sm-4 me-2" src="assets/img/manager/tick.png" width="35" alt="tick" />
           <p className="fw-medium mb-0 text-secondary">Never worry about overpaying for your<br />energy again.</p>
        </div>
        <div className="d-flex align-items-center mb-3">
          <img className="me-sm-4 me-2" src="assets/img/manager/tick.png" width="35" alt="tick" />
          <p className="fw-medium mb-0 text-secondary">We will only switch you to the best plan for your<br />needs and budget.</p>
         </div>
         <a className="btn btn-warning" href="#!" role="button">Start Now</a> 
       </div>
     </div>
   </div>
 </section>  */}
{/* ===============================================*/}
{/*    Marketing Section*/}
{/* ===============================================*/}
<section className="pt-5" id="marketing">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <h5 className="text-secondary">Experience seamless job hunting</h5>
        <h2 className="mb-4 fs-7 fw-bold"> Auto Apply Across Platforms</h2>
        <p className="mb-4 fw-medium text-secondary">
        Effortlessly submit your applications to multiple job postings across various platforms without the hassle of repetitive form-filling.
        </p>
        <div className="d-flex align-items-center mb-3">
          <img className="me-sm-4 me-2" src="true-orange.svg" width="35" alt="tick" />
          <p className="fw-medium mb-0 text-secondary">Bulk Applications: Apply to multiple jobs in one click.</p>
        </div>
        <div className="d-flex align-items-center mb-3">
          <img className="me-sm-4 me-2" src="true-orange.svg" width="35" alt="tick" />
          <p className="fw-medium mb-0 text-secondary">Maximize Opportunities: Submit applications effortlessly.</p>
        </div>
        {/* <a className="btn btn-warning" href="#!" role="button">Get Started</a> */}
      </div>
      <div className="col-lg-6">
        <img className="img-fluid" src="3.png" alt="" />
      </div>
    </div>
  </div>
</section>


{/* ===============================================*/}
{/*    Validation Section*/}
{/* ===============================================*/}
<section className="pt-5" id="validation">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <h5 className="text-secondary">Take control of your job search with Applify!</h5>
        <h2 className="mb-2 fs-7 fw-bold">Manage, Optimize, and Track Jobs</h2>
        <p className="mb-4 fw-medium text-secondary">
        Keep all your applications organized in one place.
        </p>
        <h4 className="fs-1 fw-bold"> Optimize Your Search</h4>
        <p className="mb-4 fw-medium text-secondary">Get insights and tips to improve your applications.</p>
        <h4 className="fs-1 fw-bold">Track Progress</h4>
        <p className="mb-4 fw-medium text-secondary">Monitor your application status and follow-ups easily.</p>
        {/* <h4 className="fs-1 fw-bold">Custom Design designers</h4>
        <p className="mb-4 fw-medium text-secondary">If you are looking for a new way to promote your business<br />that won't cost you more money,</p> */}
      </div>
      <div className="col-lg-6">
        <img className="img-fluid" src="2.png" alt="" />
      </div>
    </div>
  </div>
</section>


{/* ===============================================*/}
{/*    Marketing Section*/}
{/* ===============================================*/}
<section className="pt-5" id="marketing">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <h5 className="text-secondary">Gain insights into your job search with Applify!</h5>
        <h2 className="mb-4 fs-7 fw-bold"> Stats Section </h2>
        <p className="mb-4 fw-medium text-secondary">
        Make data-driven decisions in your job hunt!
        </p>
        <div className="d-flex align-items-center mb-3">
          <img className="me-sm-4 me-2" src="true-orange.svg" width="35" alt="tick" />
          <p className="fw-medium mb-0 text-secondary">Application Metrics: Track the number of applications sent.</p>
        </div>
        <div className="d-flex align-items-center mb-3">
          <img className="me-sm-4 me-2" src="true-orange.svg" width="35" alt="tick" />
          <p className="fw-medium mb-0 text-secondary">Success Rates: Monitor interview and offer statistics.</p>
        </div>
        {/* <a className="btn btn-warning" href="#!" role="button">Get Started</a> */}
      </div>
      <div className="col-lg-6">
        <img className="img-fluid" src="1.png" alt="" />
      </div>
    </div>
  </div>
</section>

{/* ===============================================*/}
{/*    Footer*/}
{/* ===============================================*/}
<footer className="py-6 bg-dark text-white">
  <div className="container">
    <div className="row">
      <div className="col-lg-3 col-sm-6 mb-4">
        {/* <a className="navbar-brand" href="index.html">
          <img className="logo" src="auto-apply.svg" height="31" alt="logo" />
        </a> */}
        
        {/* <p className="mt-4 mb-4">The Myspace page defines the individual, his or her characteristics, traits, personal choices and the overall personality of the person.</p> */}
        <div className="d-flex align-items-center">
          {/* <a className="btn btn-warning btn-icon rounded-circle me-2" href="#!"> */}
          <img  className="logo" src="instagram.svg" height="31" alt="logo" />
            <img className="logo" src="linkedin-original.svg" height="31" alt="logo" />
            <img className="logo" src="gmail.svg" height="31" alt="logo" />
            <img className="logo" src="twitter.svg" height="31" alt="logo" />
            {/* <span className="fab fa-facebook-f"></span> */}
          {/* </a> */}
          {/* <a className="btn btn-warning btn-icon rounded-circle me-2" href="#!">
            <span className="fab fa-twitter"></span>
          </a>
          <a className="btn btn-warning btn-icon rounded-circle me-2" href="#!">
            <span className="fab fa-linkedin-in"></span>
          </a>
          <a className="btn btn-warning btn-icon rounded-circle" href="#!">
            <span className="fab fa-instagram"></span>
          </a> */}
        </div>
      </div>
      <div className="col-lg-2 col-sm-6 mb-4">
        <h5 className="text-warning">Company</h5>
        <ul className="list-unstyled">
          <li><a className="text-white" href="#!">About</a></li>
          <li><a className="text-white" href="#!">Careers</a></li>
          <li><a className="text-white" href="#!">Press</a></li>
          <li><a className="text-white" href="#!">Investors</a></li>
        </ul>
      </div>
      <div className="col-lg-2 col-sm-6 mb-4">
        <h5 className="text-warning">Product</h5>
        <ul className="list-unstyled">
          <li><a className="text-white" href="#!">Features</a></li>
          <li><a className="text-white" href="#!">Pricing</a></li>
          <li><a className="text-white" href="#!">Support</a></li>
          <li><a className="text-white" href="#!">Documentation</a></li>
        </ul>
      </div>
      <div className="col-lg-2 col-sm-6 mb-4">
        <h5 className="text-warning">Resources</h5>
        <ul className="list-unstyled">
          <li><a className="text-white" href="#!">Blog</a></li>
          <li><a className="text-white" href="#!">Tutorials</a></li>
          <li><a className="text-white" href="#!">FAQ</a></li>
          <li><a className="text-white" href="#!">Community</a></li>
        </ul>
      </div>
      <div className="col-lg-3 col-sm-6 mb-4">
        <h5 className="text-warning">Subscribe to our newsletter</h5>
        <form>
          <div className="input-group">
            {/* <input type="email" className="form-control" placeholder="Your email" /> */}
            <button className="btn btn-warning" type="submit">Subscribe</button>
          </div>
        </form>
      </div>
    </div>
    {/* <div className="text-center mt-4">
      <p className="mb-0">&copy; {new Date().getFullYear()} Productly. All Rights Reserved.</p>
    </div> */}
  </div>
</footer>
</div>

  );
}

export default HomePage;