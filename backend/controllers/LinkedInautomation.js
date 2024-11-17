// import puppeteer from 'puppeteer';

// export async function runPuppeteer(req, res) {
//     const {
//         email,
//         password,
//         numberOfJobs,
//         keywords,
//         location,
//         experience,
//         applyFilter
//     } = req.body;

//     // Define default values
//     const data = {
//         baseURL: "https://www.linkedin.com/login",
//         email,
//         password,
//         keyword: keywords,
//         location,
//         AvgExperience: experience,
//         Period: applyFilter,
//         resolution: "--window-size=1300,700",
//         numberOfPagination: 1,
//         numberOfOffersPerPage: numberOfJobs,
//         browserPath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
//     };

//     let page = "";
//     let browser = "";

//     async function logs() {
//         console.log("mydata is: " + JSON.stringify(data));
//     }

//     async function Login() {
//         await findTargetAndType('[name="session_key"]', data.email);
//         await findTargetAndType('[name="session_password"]', data.password);
//         await page.keyboard.press("Enter");
//     }

//     async function initiliazer() {
//         browser = await puppeteer.launch({
//             headless: false,
//             executablePath: data.browserPath,
//             args: [data.resolution],
//             defaultViewport: null,
//         });
//         page = await browser.newPage();
//         const pages = await browser.pages();
//         if (pages.length > 1) {
//             await pages[0].close();
//         }
//         await page.goto(data.baseURL);
//     }

//     async function findTargetAndType(target, value) {
//         const f = await page.$(target);
//         await f.type(value);
//     }

//     async function waitForSelectorAndType(target, value) {
//         const typer = await page.waitForSelector(target, { visible: true });
//         await typer.type(value);
//     }

//     async function buttonClick(selector) {
//         await page.waitForSelector(selector);
//         const buttonClick = await page.$(selector);
//         await buttonClick.click();
//     }

//     function wait(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//     }

//     async function jobCriteriaByTime() {
//         await buttonClick(".search-reusables__filter-binary-toggle"); // select EASY APPLY
//         await wait(2000);

//         // dropmenu to choose the period (Last 24 hours / Past week)
//         await buttonClick(
//             "ul.search-reusables__filter-list>li:nth-child(4)>div>span>button"
//         );

//         if (data.Period === "Last 24 hours") {
//             await wait(2000);
//             await buttonClick(
//                 "form > fieldset > div.pl4.pr6 > ul > li:nth-child(4) > label"
//             );
//             await wait(2000);
//             await buttonClick("button[aria-label*='Apply current filter to show']");
//         } else {
//             // Past week
//             await wait(2000);
//             await buttonClick(
//                 "form > fieldset > div.pl4.pr6 > ul > li:nth-child(3) > label"
//             );
//             await wait(2000);
//             await buttonClick(".artdeco-button__text");
//         }
//     }

//     async function Scrolling() {
//         console.log('Scrolling the page N°1');

//         try {
//             // Wait for the new selector to be available
//             await page.waitForSelector('ul.scaffold-layout__list-container', { timeout: 3000 });

//             // Scroll the page if necessary
//             await page.evaluate(() => {
//                 window.scrollBy(0, window.innerHeight);
//             });
//         } catch (error) {
//             console.error('Error in scrolling:', error);
//         }
//     }

//     async function FillAndApply() {
//         let i = 1;
//         let lastIndexForPagination = 1;
//         while (i <= data.numberOfPagination) {
//             console.log("Scrolling the page N°" + i);

//             for (let index = 1; index <= data.numberOfOffersPerPage; index++) {
//                 let state = true;
//                 await wait(3000);
//                 await Scrolling(); // Call scrolling function
//                 console.log(`Apply N°[${index}]`);

//                 try {
//                     await page.waitForSelector(
//                         `li[class*="jobs-search-results__list-item"]:nth-child(${index})>div>div>div>div+div>div`,
//                         { timeout: 30000 }
//                     );
//                     await buttonClick(
//                         `li[class*="jobs-search-results__list-item"]:nth-child(${index})>div>div>div>div+div>div`
//                     );
//                 } catch (error) {
//                     console.error(`Timeout on job ${index}:`, error.message);
//                     continue; // Skip to next job
//                 }

//                 if (index === data.numberOfOffersPerPage) lastIndexForPagination++;

//                 await wait(2000);
//                 if ((await page.$(".jobs-apply-button")) != null) {
//                     await buttonClick(".jobs-apply-button");

//                     while (state === true) {
//                         await wait(2000);

//                         try {
//                             // Check for and click the "Next" or "Submit" button
//                             const nextButton = await page.$(
//                                 '.artdeco-button--primary.ember-view'
//                             );

//                             if (nextButton) {
//                                 await nextButton.click();
//                             } else {
//                                 // No next button means the process is done, break the loop
//                                 state = false;
//                                 console.log("No more steps, application complete.");
//                             }
//                         } catch (error) {
//                             console.log("Error during application process:", error.message);
//                             state = false; // Break out of the loop in case of an error
//                         }
//                         await wait(3000);
//                     }
//                 }
//             }

//             // Navigate to the next page of results
//             try {
//                 await buttonClick(
//                     `ul[class="artdeco-pagination__pages artdeco-pagination__pages--number"]>li:nth-child(${lastIndexForPagination})`
//                 );
//             } catch (error) {
//                 console.error("Error navigating to next page:", error.message);
//             }

//             i++;
//             console.log("Finished scrolling page N°" + (i - 1));
//         }
//     }

//     async function jobsApply() {
//         await buttonClick("#global-nav > div > nav > ul > li:nth-child(3)");
//         await waitForSelectorAndType('[id^="jobs-search-box-keyword-id"]', data.keyword);
//         await waitForSelectorAndType('[id^="jobs-search-box-location-id"]', data.location);
//         await wait(1000);
//         await page.keyboard.press("Enter");
//         await jobCriteriaByTime();
//         await wait(3000);
//         await wait(2000);
//         await FillAndApply();
//     }

//     async function main() {
//         logs();
//         await initiliazer();
//         await Login();
//         await jobsApply();
//         await browser.close();
//     }

//     main();
// }



// import puppeteer from 'puppeteer';

// export async function runPuppeteer(req, res) {
//     const {
//         email,
//         password,
//         totalJobsToApply,
//         keywords,
//         location,
//         experience,
//         applyFilter,
//         expectedSalary
//     } = req.body;

//     // Define default values
//     const data = {
//         baseURL: "https://www.linkedin.com/login",
//         email,
//         password,
//         keyword: keywords,
//         location,
//         AvgExperience: experience,
//         Period: applyFilter,
//         resolution: "--window-size=1300,700",
//         totalJobsToApply: totalJobsToApply,
//         browserPath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
//         expectedSalary: expectedSalary
//     };

//     let page = "";
//     let browser = "";

//     async function logs() {
//         console.log("mydata is: " + JSON.stringify(data));
//     }

//     async function Login() {
//         await findTargetAndType('[name="session_key"]', data.email);
//         await findTargetAndType('[name="session_password"]', data.password);
//         await page.keyboard.press("Enter");
//     }

//     async function initiliazer() {
//         browser = await puppeteer.launch({
//             headless: false,
//             executablePath: data.browserPath,
//             args: [data.resolution],
//             defaultViewport: null,
//         });
//         page = await browser.newPage();
//         const pages = await browser.pages();
//         if (pages.length > 1) {
//             await pages[0].close();
//         }
//         await page.goto(data.baseURL);
//     }

//     async function findTargetAndType(target, value) {
//         const f = await page.$(target);
//         await f.type(value);
//     }

//     async function waitForSelectorAndType(target, value) {
//         const typer = await page.waitForSelector(target, { visible: true });
//         await typer.type(value);
//     }

//     async function buttonClick(selector) {
//         await page.waitForSelector(selector);
//         const buttonClick = await page.$(selector);
//         await buttonClick.click();
//     }

//     function wait(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//     }

//     async function jobCriteriaByTime() {
//         await buttonClick(".search-reusables__filter-binary-toggle"); // select EASY APPLY
//         await wait(2000);

//         // dropmenu to choose the period (Last 24 hours / Past week)
//         await buttonClick(
//             "ul.search-reusables__filter-list>li:nth-child(4)>div>span>button"
//         );

//         if (data.Period === "Past 24 hours") {
//             await wait(2000);
//             await buttonClick(
//                 "form > fieldset > div.pl4.pr6 > ul > li:nth-child(4) > label"
//             );
//             await wait(2000);
//             await buttonClick("button[aria-label*='Apply current filter to show']");
//         } else {
//             // Past week
//             await wait(2000);
//             await buttonClick(
//                 "form > fieldset > div.pl4.pr6 > ul > li:nth-child(3) > label"
//             );
//             await wait(2000);
//             await buttonClick(".artdeco-button__text");
//         }
//     }

//     async function Scrolling() {
//         console.log('Scrolling the page N°1');

//         try {
//             // Wait for the new selector to be available
//             await page.waitForSelector('ul.scaffold-layout__list-container', { timeout: 10000 });

//             // Scroll the page if necessary
//             await page.evaluate(() => {
//                 window.scrollBy(0, window.innerHeight);
//             });
//         } catch (error) {
//             console.error('Error in scrolling:', error);
//         }
//     }

//     async function FillAndApply() {
//         let i = 1;
//         let lastIndexForPagination = 1;
//         while (i <= data.numberOfPagination) {
//             console.log("Scrolling the page N°" + i);

//             for (let index = 1; index <= data.numberOfOffersPerPage; index++) {
//                 let state = true;
//                 await wait(3000);
//                 await Scrolling(); // Call scrolling function
//                 console.log(`Apply N°[${index}]`);

//                 try {
//                     await page.waitForSelector(
//                         `li[class*="jobs-search-results__list-item"]:nth-child(${index})>div>div>div>div+div>div`,
//                         { timeout: 10000 }
//                     );
//                     await buttonClick(
//                         `li[class*="jobs-search-results__list-item"]:nth-child(${index})>div>div>div>div+div>div`
//                     );
//                 } catch (error) {
//                     console.error(`Timeout on job ${index}:`, error.message);
//                     continue; // Skip to next job
//                 }

//                 if (index === data.numberOfOffersPerPage) lastIndexForPagination++;

//                 await wait(2000);
//                 if ((await page.$(".jobs-apply-button")) != null) {
//                     await buttonClick(".jobs-apply-button");

//                     while (state === true) {
//                         await wait(2000);

//                         try {
//                             // Check for and click the "Next" or "Submit" button
//                             const nextButton = await page.$(
//                                 '.artdeco-button--primary.ember-view'
//                             );

//                             if (nextButton) {
//                                 await nextButton.click();
//                             } else {
//                                 // No next button means the process is done, break the loop
//                                 state = false;
//                                 console.log("No more steps, application complete.");
//                             }
//                         } catch (error) {
//                             console.log("Error during application process:", error.message);
//                             state = false; // Break out of the loop in case of an error
//                         }
//                         await wait(3000);
//                     }
//                 }
//             }

//             // Navigate to the next page of results
//             try {
//                 await buttonClick(
//                     `ul[class="artdeco-pagination__pages artdeco-pagination__pages--number"]>li:nth-child(${lastIndexForPagination})`
//                 );
//             } catch (error) {
//                 console.error("Error navigating to next page:", error.message);
//             }

//             i++;
//             console.log("Finished scrolling page N°" + (i - 1));
//         }
//     }

//     async function jobsApply() {
//         await buttonClick("#global-nav > div > nav > ul > li:nth-child(3)");
//         await waitForSelectorAndType('[id^="jobs-search-box-keyword-id"]', data.keyword);
//         await waitForSelectorAndType('[id^="jobs-search-box-location-id"]', data.location);
//         await wait(1000);
//         await page.keyboard.press("Enter");
//         await jobCriteriaByTime();
//         await wait(3000);
//         await wait(2000);
//         await FillAndApply();
//     }

//     async function main() {
//         logs();
//         await initiliazer();
//         await Login();
//         await jobsApply();
//         await browser.close();
//     }

//     main();
// }












// import puppeteer from 'puppeteer';

// export async function runPuppeteer(req, res) {
//     const {
//         email,
//         password,
//         totalJobsToApply,
//         keywords,
//         location,
//         experience,
//         applyFilter,
//         expectedSalary
//     } = req.body;

//     // Define default values
//     const data = {
//         baseURL: "https://www.linkedin.com/login",
//         email,
//         password,
//         keyword: keywords,
//         location,
//         AvgExperience: experience,
//         Period: applyFilter,
//         resolution: "--window-size=1300,700",
//         totalJobsToApply: totalJobsToApply,
//         browserPath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
//         expectedSalary: expectedSalary
//     };

//     let page = "";
// let browser = "";
// let totalApplied = 0;

// async function logs() {
//   console.log("mydata is: " + JSON.stringify(data));
// }

// async function Login() {
//   await findTargetAndType('[name="session_key"]', email);
//   await findTargetAndType('[name="session_password"]', password);
//   await page.keyboard.press("Enter");
// }

// async function initiliazer() {
//   browser = await puppeteer.launch({
//     headless: false,
//     executablePath: data.browserPath,
//     args: [data.resolution],
//     defaultViewport: null,
//   });
//   page = await browser.newPage();
//   const pages = await browser.pages();
//   if (pages.length > 1) {
//     await pages[0].close();
//   }
//   await page.goto(data.baseURL, { waitUntil: "networkidle2" });
// }

// async function findTargetAndType(target, value) {
//   const f = await page.$(target);
//   await f.type(value);
// }

// async function waitForSelectorAndType(target, value) {
//   const typer = await page.waitForSelector(target, { visible: true });
//   await typer.type(value);
// }

// async function buttonClick(selector) {
//   await page.waitForSelector(selector);
//   const buttonClick = await page.$(selector);
//   await buttonClick.click();
// }

// async function jobCriteriaByTime() {
//   await buttonClick(".search-reusables__filter-binary-toggle"); // select EASY APPLY
//   await page.waitForTimeout(2000);

//   await buttonClick(
//     "ul.search-reusables__filter-list>li:nth-child(4)>div>span>button"
//   );

//   if (periodOfTime == "Past 24 hours") {
//     await page.waitForTimeout(2000);
//     await buttonClick(
//       "form > fieldset > div.pl4.pr6 > ul > li:nth-child(4) > label"
//     );
//     await page.waitForTimeout(2000);
//     await buttonClick("button[aria-label*='Apply current filter to show']");
//   } else {
//     await page.waitForTimeout(2000);
//     await buttonClick(
//       "form > fieldset > div.pl4.pr6 > ul > li:nth-child(3) > label"
//     );
//     await page.waitForTimeout(2000);
//     await buttonClick("button[aria-label*='Apply current filter to show']");
//   }
// }

// async function Scrolling(page) {
//     console.log("Scrolling the page N°1");
  
//     try {
//       await page.waitForSelector('ul.scaffold-layout__list-container', { timeout: 10000 });
//       await page.evaluate(() => {
//         window.scrollBy(0, window.innerHeight);
//       });
//     } catch (error) {
//       console.error("Error in scrolling:", error);
//     }
//   }


// async function FillAndApply() {
//   let pageIndex = 1;

//   while (totalApplied < totalJobsToApply) {
//     console.log(`Processing page ${pageIndex}`);

//     // Get all job elements on the page
//     const jobItems = await page.$$('li.jobs-search-results__list-item');
//     const jobCount = jobItems.length;
//     console.log(`Found ${jobCount} jobs on page ${pageIndex}`);

//     // Calculate how many jobs to apply on this page
//     const jobsToApplyOnPage = Math.min(jobCount, totalJobsToApply - totalApplied);

//     for (let index = 1; index <= jobsToApplyOnPage; index++) {
//       await page.waitForTimeout(3000); // Wait for jobs to load properly
//       await Scrolling(); // Ensure the page is fully scrolled
//       console.log(`Applying to job N° ${totalApplied + 1} on page ${pageIndex}`);

//       try {
//         const jobSelector = `li.ember-view.jobs-search-results__list-item.occludable-update.p0.relative.scaffold-layout__list-item:nth-child(${index})`;
//         // Add retry mechanism
//         await page.waitForSelector(jobSelector, { timeout: 20000 });
//         const jobElement = await page.$(jobSelector);

//         if (jobElement) {
//           await jobElement.click(); // Click the job link
//         } else {
//           console.log(`Job N°${index} not found, skipping.`);
//           continue;
//         }
//       } catch (error) {
//         console.error(`Error on job ${index}:`, error.message);
//         continue; // Skip to the next job
//       }

//       await page.waitForTimeout(2000);

//       // Check if the "Apply" button is present
//       if ((await page.$(".jobs-apply-button")) != null) {
//         await buttonClick(".jobs-apply-button");

//         let state = true;
//         while (state === true) {
//           await page.waitForTimeout(2000);

//           // Handle filling additional questions (like in the screenshot)
//           await fillAdditionalQuestions();

//           try {
//             const nextButton = await page.$('.artdeco-button--primary.ember-view');
//             if (nextButton) {
//               await nextButton.click();
//             } else {
//               state = false;
//               console.log("Application process completed.");
//               totalApplied++;
//             }
//           } catch (error) {
//             console.log("Error during application process:", error.message);
//             totalApplied++;
//             state = false;
//           }
//           await page.waitForTimeout(3000); // Wait between steps
//         }
//       }

//       // Stop if the total applied jobs reach the limit
//       if (totalApplied >= totalJobsToApply) {
//         console.log(`Reached the limit of ${totalJobsToApply} jobs.`);
//         break;
//       }
//     }

//     // Go to the next page if there are more jobs to apply
//     if (totalApplied < totalJobsToApply) {
//       try {
//         pageIndex++;
//         const nextPageButtonSelector = `button[aria-label="Page ${pageIndex}"]`;
//         await page.waitForSelector(nextPageButtonSelector, { timeout: 15000 });
//         await buttonClick(nextPageButtonSelector);
//         await page.waitForTimeout(5000); // Give enough time for the new page to load
//       } catch (error) {
//         console.error("Error navigating to the next page:", error.message);
//         break;
//       }
//     }
//   }
// }

// async function fillAdditionalQuestions() {
//   try {
//     // Select all input fields with a common class
//     const inputFields = await page.$$('input.artdeco-text-input--input');

//     for (let i = 0; i < inputFields.length; i++) {
//       // Check if the input field is already filled
//       const value = await page.evaluate(el => el.value, inputFields[i]);

//       if (value.trim() === '') {
//         const label = await page.evaluate(el => {
//           const parent = el.closest('div'); // Adjust selector based on your form structure
//           return parent ? parent.innerText : '';
//         }, inputFields[i]);

//         if (label && label.toLowerCase().includes('salary')) {
//           // Handle salary input
//           await inputFields[i].type(`${expectedSalary}`);
//           console.log(`Filled salary input field ${i + 1} with 20000`);
//         }
//         if (label && label.toLowerCase().includes('ctc')) {
//           // Handle salary input
//           await inputFields[i].type('20000');
//           console.log(`Filled salary input field ${i + 1} with 20000`);
//         }
        
//         else {
//           await inputFields[i].type(`${avgOfExp}`);
//           console.log(`Filled input field ${i + 1} with ${avgOfExp}`);
//         }
//       } else {
//         console.log(`Input field ${i + 1} is already filled with '${value}'`);
//       }
//     }

//     // Handle toggle buttons (yes/no)
//     const labels = await page.$$('label.t-14');

//     for (let j = 0; j < labels.length; j++) {
//       const text = await page.evaluate(el => el.textContent.trim(), labels[j]);

//       if (text === 'Yes') {
//         // Check if the 'Yes' button is already selected
//         const isSelected = await page.evaluate(el => el.classList.contains('selected'), labels[j]);

//         if (!isSelected) {
//           await labels[j].click();  // Click to select the 'Yes' option only if not selected
//           console.log(`Clicked 'Yes' button ${j + 1}`);
//         } else {
//           console.log(`'Yes' button ${j + 1} is already selected`);
//         }
//       }
//     }

//     // Handle dropdowns
//     const dropdowns = await page.$$('select');

//     for (let k = 0; k < dropdowns.length; k++) {
//       const selectedValue = await page.evaluate(el => el.value, dropdowns[k]);

//       if (selectedValue === 'Select an option') {
//         // Get all available options in the dropdown
//         const options = await dropdowns[k].$$('option');

//         if (options.length > 1) {
//           // Skip the placeholder and select the second option (index 1)
//           const validOption = options[1]; // Assuming the second option is always valid

//           const validOptionValue = await page.evaluate(el => el.value, validOption);

//           await dropdowns[k].select(validOptionValue);
//           console.log(`Selected valid option '${validOptionValue}' for dropdown ${k + 1}`);
//         }
//       } else {
//         console.log(`Dropdown ${k + 1} already filled with '${selectedValue}'`);
//       }
//     }

//     // Handle checkboxes (e.g., accept terms and conditions)
//     const checkboxes = await page.$$('input[type="checkbox"]');

//     for (let l = 0; l < checkboxes.length; l++) {
//       const isChecked = await page.evaluate(el => el.checked, checkboxes[l]);

//       if (!isChecked) {
//         await checkboxes[l].click();  // Select the checkbox
//         console.log(`Checked checkbox ${l + 1}`);
//       } else {
//         console.log(`Checkbox ${l + 1} is already checked`);
//       }
//     }
//   } catch (error) {
//     console.error('Error filling additional questions:', error);
//   }
// }


// async function jobsApply() {
//   await buttonClick("#global-nav > div > nav > ul > li:nth-child(3)");
//   await waitForSelectorAndType('[id^="jobs-search-box-keyword-id"]', data.keyword);
//   await waitForSelectorAndType('[id^="jobs-search-box-location-id"]', location);
//   await page.waitForTimeout(1000);
//   await page.keyboard.press("Enter");
//   await jobCriteriaByTime();
//   await  waitForTimeout(3000);
//   await FillAndApply();
// }

// async function main() {
//   logs();
//   await initiliazer();
//   await Login();
//   await jobsApply();
//   await browser.close();
// }

// main();
// }



/// perfect 

// import puppeteer from 'puppeteer';

// export async function runPuppeteer(req, res) {
//     const {
//         email,
//         password,
//         totalJobsToApply,
//         keywords,
//         location,
//         experience,
//         applyFilter,
//         expectedSalary
//     } = req.body;

//     // Define default values
//     const data = {
//         baseURL: "https://www.linkedin.com/login",
//         email,
//         password,
//         keyword: keywords,
//         location,
//         AvgExperience: experience,
//         Period: applyFilter,
//         resolution: "--window-size=1300,700",
//         totalJobsToApply: totalJobsToApply,
//         browserPath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
//         expectedSalary: expectedSalary
//     };

//     let page = "";
//     let browser = "";
//     let totalApplied = 0;

//     async function logs() {
//         console.log("mydata is: " + JSON.stringify(data));
//     }

//     async function Login() {
//         await findTargetAndType('[name="session_key"]', email);
//         await findTargetAndType('[name="session_password"]', password);
//         await page.keyboard.press("Enter");
//     }

//     async function initiliazer() {
//         browser = await puppeteer.launch({
//             headless: false,
//             executablePath: data.browserPath,
//             args: [data.resolution],
//             defaultViewport: null,
//         });
//         page = await browser.newPage();
//         const pages = await browser.pages();
//         if (pages.length > 1) {
//             await pages[0].close();
//         }
//         await page.goto(data.baseURL, { waitUntil: "networkidle2" });
//     }

//     async function findTargetAndType(target, value) {
//         const f = await page.$(target);
//         await f.type(value);
//     }

//     async function waitForSelectorAndType(target, value) {
//         const typer = await page.waitForSelector(target, { visible: true });
//         await typer.type(value);
//     }

//     async function buttonClick(selector) {
//         await page.waitForSelector(selector);
//         const buttonClick = await page.$(selector);
//         await buttonClick.click();
//     }

//     async function jobCriteriaByTime() {
//         await buttonClick(".search-reusables__filter-binary-toggle"); // select EASY APPLY
//         await new Promise(resolve => setTimeout(resolve, 2000));

//         await buttonClick(
//             "ul.search-reusables__filter-list>li:nth-child(4)>div>span>button"
//         );

//         if (data.Period === "Past 24 hours") {
//             await new Promise(resolve => setTimeout(resolve, 2000));
//             await buttonClick(
//                 "form > fieldset > div.pl4.pr6 > ul > li:nth-child(4) > label"
//             );
//             await new Promise(resolve => setTimeout(resolve, 2000));
//             await buttonClick("button[aria-label*='Apply current filter to show']");
//         } else {
//             await new Promise(resolve => setTimeout(resolve, 2000));
//             await buttonClick(
//                 "form > fieldset > div.pl4.pr6 > ul > li:nth-child(3) > label"
//             );
//             await new Promise(resolve => setTimeout(resolve, 2000));
//             await buttonClick("button[aria-label*='Apply current filter to show']");
//         }
//     }

//     async function Scrolling() {
//         console.log("Scrolling the page N°1");
    
//         try {
//           await page.waitForSelector('ul.scaffold-layout__list-container', { timeout: 10000 });
//           await page.evaluate(() => {
//             window.scrollBy(0, window.innerHeight);
//           });
//         } catch (error) {
//           console.error("Error in scrolling:", error);
//         }
//     }

//     async function FillAndApply() {
//         let pageIndex = 1;

//         while (totalApplied < totalJobsToApply) {
//             console.log(`Processing page ${pageIndex}`);

//             // Get all job elements on the page
//             const jobItems = await page.$$('li.jobs-search-results__list-item');
//             const jobCount = jobItems.length;
//             console.log(`Found ${jobCount} jobs on page ${pageIndex}`);

//             // Calculate how many jobs to apply on this page
//             const jobsToApplyOnPage = Math.min(jobCount, totalJobsToApply - totalApplied);

//             for (let index = 1; index <= jobsToApplyOnPage; index++) {
//                 await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for jobs to load properly
//                 await Scrolling(); // Ensure the page is fully scrolled
//                 console.log(`Applying to job N° ${totalApplied + 1} on page ${pageIndex}`);

//                 try {
//                     const jobSelector = `li.ember-view.jobs-search-results__list-item.occludable-update.p0.relative.scaffold-layout__list-item:nth-child(${index})`;
//                     await page.waitForSelector(jobSelector, { timeout: 20000 });
//                     const jobElement = await page.$(jobSelector);

//                     if (jobElement) {
//                         await jobElement.click(); // Click the job link
//                     } else {
//                         console.log(`Job N°${index} not found, skipping.`);
//                         continue;
//                     }
//                 } catch (error) {
//                     console.error(`Error on job ${index}:`, error.message);
//                     continue; // Skip to the next job
//                 }

//                 await new Promise(resolve => setTimeout(resolve, 2000));

//                 // Check if the "Apply" button is present
//                 if ((await page.$(".jobs-apply-button")) != null) {
//                     await buttonClick(".jobs-apply-button");

//                     let state = true;
//                     while (state === true) {
//                         await new Promise(resolve => setTimeout(resolve, 2000));

//                         // Handle filling additional questions (like in the screenshot)
//                         await fillAdditionalQuestions();

//                         try {
//                             const nextButton = await page.$('.artdeco-button--primary.ember-view');
//                             if (nextButton) {
//                                 await nextButton.click();
//                             } else {
//                                 state = false;
//                                 console.log("Application process completed.");
//                                 totalApplied++;
//                             }
//                         } catch (error) {
//                             console.log("Error during application process:", error.message);
//                             totalApplied++;
//                             state = false;
//                         }
//                         await new Promise(resolve => setTimeout(resolve, 3000)); // Wait between steps
//                     }
//                 }

//                 if (totalApplied >= totalJobsToApply) {
//                     console.log(`Reached the limit of ${totalJobsToApply} jobs.`);
//                     break;
//                 }
//             }

//             // Go to the next page if there are more jobs to apply
//             if (totalApplied < totalJobsToApply) {
//                 try {
//                     pageIndex++;
//                     const nextPageButtonSelector = `button[aria-label="Page ${pageIndex}"]`;
//                     await page.waitForSelector(nextPageButtonSelector, { timeout: 15000 });
//                     await buttonClick(nextPageButtonSelector);
//                     await new Promise(resolve => setTimeout(resolve, 5000)); // Give enough time for the new page to load
//                 } catch (error) {
//                     console.error("Error navigating to the next page:", error.message);
//                     break;
//                 }
//             }
//         }
//     }

//     async function fillAdditionalQuestions() {
//         try {
//           // Select all input fields with a common class
//           const inputFields = await page.$$('input.artdeco-text-input--input');
      
//           for (let i = 0; i < inputFields.length; i++) {
//             // Check if the input field is already filled
//             const value = await page.evaluate(el => el.value, inputFields[i]);
      
//             if (value.trim() === '') {
//               const label = await page.evaluate(el => {
//                 const parent = el.closest('div'); // Adjust selector based on your form structure
//                 return parent ? parent.innerText : '';
//               }, inputFields[i]);
      
//               if (label && label.toLowerCase().includes('salary')) {
//                 // Handle salary input
//                 await inputFields[i].type(`${expectedSalary}`);
//                 console.log(`Filled salary input field ${i + 1} with 20000`);
//               }
//               if (label && label.toLowerCase().includes('ctc')) {
//                 // Handle salary input
//                 await inputFields[i].type(`${expectedSalary}`);
//                 console.log(`Filled salary input field ${i + 1} with 20000`);
//               }
              
//               else {
//                 await inputFields[i].type(`${experience}`);
//                 console.log(`Filled input field ${i + 1} with ${experience}`);
//               }
//             } else {
//               console.log(`Input field ${i + 1} is already filled with '${value}'`);
//             }
//           }
      
//           // Handle toggle buttons (yes/no)
//           const labels = await page.$$('label.t-14');
      
//           for (let j = 0; j < labels.length; j++) {
//             const text = await page.evaluate(el => el.textContent.trim(), labels[j]);
      
//             if (text === 'Yes') {
//               // Check if the 'Yes' button is already selected
//               const isSelected = await page.evaluate(el => el.classList.contains('selected'), labels[j]);
      
//               if (!isSelected) {
//                 await labels[j].click();  // Click to select the 'Yes' option only if not selected
//                 console.log(`Clicked 'Yes' button ${j + 1}`);
//               } else {
//                 console.log(`'Yes' button ${j + 1} is already selected`);
//               }
//             }
//           }
      
//           // Handle dropdowns
//           const dropdowns = await page.$$('select');
      
//           for (let k = 0; k < dropdowns.length; k++) {
//             const selectedValue = await page.evaluate(el => el.value, dropdowns[k]);
      
//             if (selectedValue === 'Select an option') {
//               // Get all available options in the dropdown
//               const options = await dropdowns[k].$$('option');
      
//               if (options.length > 1) {
//                 // Skip the placeholder and select the second option (index 1)
//                 const validOption = options[1]; // Assuming the second option is always valid
      
//                 const validOptionValue = await page.evaluate(el => el.value, validOption);
      
//                 await dropdowns[k].select(validOptionValue);
//                 console.log(`Selected valid option '${validOptionValue}' for dropdown ${k + 1}`);
//               }
//             } else {
//               console.log(`Dropdown ${k + 1} already filled with '${selectedValue}'`);
//             }
//           }
      
//           // Handle checkboxes (e.g., accept terms and conditions)
//           const checkboxes = await page.$$('input[type="checkbox"]');
      
//           for (let l = 0; l < checkboxes.length; l++) {
//             const isChecked = await page.evaluate(el => el.checked, checkboxes[l]);
      
//             if (!isChecked) {
//               await checkboxes[l].click();  // Select the checkbox
//               console.log(`Checked checkbox ${l + 1}`);
//             } else {
//               console.log(`Checkbox ${l + 1} is already checked`);
//             }
//           }
//         } catch (error) {
//           console.error('Error filling additional questions:', error);
//         }
//       }

//     async function jobsApply() {
//         await buttonClick("#global-nav > div > nav > ul > li:nth-child(3)");
//         await waitForSelectorAndType('[id^="jobs-search-box-keyword-id"]', data.keyword);
//         await waitForSelectorAndType('[id^="jobs-search-box-location-id"]', location);
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         // Corrected to use page.waitForTimeout
//         await page.keyboard.press("Enter");
//         await jobCriteriaByTime();
//         await new Promise(resolve => setTimeout(resolve, 3000)); // Corrected to use page.waitForTimeout
//         await FillAndApply();
//     }

//     async function main() {
//         logs();
//         await initiliazer();
//         await Login();
//         await jobsApply();
//         await browser.close();
//     }

//     main();
// }

//// jobs showing

//-------

import puppeteer from 'puppeteer'; 
import db from '../db.js';
let totalApplied = 0;

export async function runPuppeteer(req, res) {

    const {
        email,
        password,
        totalJobsToApply,
        keywords,
        location,
        experience,
        applyFilter,
        expectedSalary,
        userEmail
    } = req.body;

    console.log("User Email: ", userEmail);

    const data = {
        baseURL: "https://www.linkedin.com/login",
        email,
        password,
        keyword: keywords,
        location,
        AvgExperience: experience,
        Period: applyFilter,
        resolution: "--window-size=1300,700",
        totalJobsToApply: totalJobsToApply,
        browserPath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        expectedSalary: expectedSalary
    };

    let page = "";
    let browser = "";
    totalApplied = 0;

    async function logs() {
        console.log("mydata is: " + JSON.stringify(data));
    }

    async function Login() {
        await findTargetAndType('[name="session_key"]', email, 100);
        await findTargetAndType('[name="session_password"]', password, 100);
        await page.keyboard.press("Enter");
    }

    async function initiliazer() {
        browser = await puppeteer.launch({
            headless: false,
            args: [data.resolution],
            defaultViewport: null,
        });
        page = await browser.newPage();
        const pages = await browser.pages();
        if (pages.length > 1) {
            await pages[0].close();
        }
        await page.goto(data.baseURL, { waitUntil: "networkidle2" });
    }

    async function findTargetAndType(target, value, delay = 0) {
        const f = await page.$(target);
        
        // Clear the input field before typing
        await f.click({ clickCount: 3 });  // Triple-click to select all content
        await page.keyboard.press('Backspace');  // Clear the field
        
        // Type the new value with delay
        await f.type(value, { delay });
    }

    async function waitForSelectorAndType(target, value) {
        const typer = await page.waitForSelector(target, { visible: true });
        
        // Clear the input before typing
        await typer.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
        
        await typer.type(value);
    }

    async function buttonClick(selector) {
        await page.waitForSelector(selector);
        const buttonClick = await page.$(selector);
        await buttonClick.click();
    }

    async function jobCriteriaByTime() {
        await buttonClick(".search-reusables__filter-binary-toggle"); // select EASY APPLY
        await new Promise(resolve => setTimeout(resolve, 2000));

        await buttonClick(
            "ul.search-reusables__filter-list>li:nth-child(4)>div>span>button"
        );

        if (data.Period === "Past 24 hours") {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await buttonClick(
                "form > fieldset > div.pl4.pr6 > ul > li:nth-child(4) > label"
            );
            await new Promise(resolve => setTimeout(resolve, 2000));
            await buttonClick("button[aria-label*='Apply current filter to show']");
        } else {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await buttonClick(
                "form > fieldset > div.pl4.pr6 > ul > li:nth-child(3) > label"
            );
            await new Promise(resolve => setTimeout(resolve, 2000));
            await buttonClick("button[aria-label*='Apply current filter to show']");
        }
    }

    async function Scrolling() {
        console.log("Scrolling the page N°1");
    
        try {
          await page.waitForSelector('ul.scaffold-layout__list-container', { timeout: 10000 });
          await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
          });
        } catch (error) {
          console.error("Error in scrolling:", error);
        }
    }

    async function FillAndApply() {
        let pageIndex = 1;

        while (totalApplied < totalJobsToApply) {
            console.log(`Processing page ${pageIndex}`);

            // Get all job elements on the page
            const jobItems = await page.$$('li.jobs-search-results__list-item');
            const jobCount = jobItems.length;
            console.log(`Found ${jobCount} jobs on page ${pageIndex}`);

            // Calculate how many jobs to apply on this page
            const jobsToApplyOnPage = Math.min(jobCount, totalJobsToApply - totalApplied);

            for (let index = 1; index <= jobsToApplyOnPage; index++) {
                await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for jobs to load properly
                await Scrolling(); // Ensure the page is fully scrolled
                console.log(`Applying to job N° ${totalApplied + 1} on page ${pageIndex}`);

                try {
                    const jobSelector = `li.ember-view.jobs-search-results__list-item.occludable-update.p0.relative.scaffold-layout__list-item:nth-child(${index})`;
                    await page.waitForSelector(jobSelector, { timeout: 20000 });
                    const jobElement = await page.$(jobSelector);

                    if (jobElement) {
                        await jobElement.click(); // Click the job link
                    } else {
                        console.log(`Job N°${index} not found, skipping.`);
                        continue;
                    }
                } catch (error) {
                    console.error(`Error on job ${index}:`, error.message);
                    continue; // Skip to the next job
                }

                await new Promise(resolve => setTimeout(resolve, 2000));

                // Check if the "Apply" button is present
                if ((await page.$(".jobs-apply-button")) != null) {

                  //neeeeeeeeeeeeeeeeeeeeeew

                  const jobDetails = await page.evaluate(() => {
                    const jobTitleElement = document.querySelector('.job-details-jobs-unified-top-card__job-title h1 a');
                    const companyNameElement = document.querySelector('.job-details-jobs-unified-top-card__company-name a');
                    
                    // Extract the text content and URL
                    const jobTitle = jobTitleElement ? jobTitleElement.innerText.trim() : null;
                    const jobUrl = jobTitleElement ? jobTitleElement.href : null;
                    const companyName = companyNameElement ? companyNameElement.innerText.trim() : null;
                
                    return {
                      jobTitle,
                      companyName,
                      jobUrl
                    };
                  });
                 console.log(userEmail);
                 console.log(jobDetails.jobTitle);
                 console.log(jobDetails.companyName);
                 console.log(jobDetails.jobUrl);

                 // Insert job data into the database
                  await insertJobData(userEmail, jobDetails.jobTitle, jobDetails.companyName, jobDetails.jobUrl);




                    await buttonClick(".jobs-apply-button");


                    let state = true;
                    while (state === true) {
                        await new Promise(resolve => setTimeout(resolve, 2000));

                        // Handle filling additional questions (like in the screenshot)
                        await fillAdditionalQuestions();

                        try {
                            const nextButton = await page.$('.artdeco-button--primary.ember-view');
                            if (nextButton) {
                                await nextButton.click();
                            } else {
                                state = false;
                                console.log("Application process completed.");
                                totalApplied++;
                            }
                        } catch (error) {
                            console.log("Error during application process:", error.message);
                            totalApplied++;
                            state = false;
                        }
                        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait between steps
                    }
                }

                if (totalApplied >= totalJobsToApply) {
                    console.log(`Reached the limit of ${totalJobsToApply} jobs.`);
                    break;
                }
            }

            // Go to the next page if there are more jobs to apply
            if (totalApplied < totalJobsToApply) {
                try {
                    pageIndex++;
                    const nextPageButtonSelector = `button[aria-label="Page ${pageIndex}"]`;
                    await page.waitForSelector(nextPageButtonSelector, { timeout: 15000 });
                    await buttonClick(nextPageButtonSelector);
                    await new Promise(resolve => setTimeout(resolve, 5000)); // Give enough time for the new page to load
                } catch (error) {
                    console.error("Error navigating to the next page:", error.message);
                    break;
                }
            }
        }
    }

    async function fillAdditionalQuestions() {
        try {
          // Select all input fields with a common class
          const inputFields = await page.$$('input.artdeco-text-input--input');
      
          for (let i = 0; i < inputFields.length; i++) {
            // Check if the input field is already filled
            const value = await page.evaluate(el => el.value, inputFields[i]);
      
            if (value.trim() === '') {
              const label = await page.evaluate(el => {
                const parent = el.closest('div'); // Adjust selector based on your form structure
                return parent ? parent.innerText : '';
              }, inputFields[i]);
      
              if (label && label.toLowerCase().includes('salary')) {
                // Handle salary input
                await inputFields[i].type(`${expectedSalary}`);
                console.log(`Filled salary input field ${i + 1} with 20000`);
              }
              if (label && label.toLowerCase().includes('ctc')) {
                // Handle salary input
                await inputFields[i].type(`${expectedSalary}`);
                console.log(`Filled salary input field ${i + 1} with 20000`);
              }
              
              else {
                await inputFields[i].type(`${experience}`);
                console.log(`Filled input field ${i + 1} with ${experience}`);
              }
            } else {
              console.log(`Input field ${i + 1} is already filled with '${value}'`);
            }
          }
      
          // Handle toggle buttons (yes/no)
          const labels = await page.$$('label.t-14');
      
          for (let j = 0; j < labels.length; j++) {
            const text = await page.evaluate(el => el.textContent.trim(), labels[j]);
      
            if (text === 'Yes') {
              // Check if the 'Yes' button is already selected
              const isSelected = await page.evaluate(el => el.classList.contains('selected'), labels[j]);
      
              if (!isSelected) {
                await labels[j].click();  // Click to select the 'Yes' option only if not selected
                console.log(`Clicked 'Yes' button ${j + 1}`);
              } else {
                console.log(`'Yes' button ${j + 1} is already selected`);
              }
            }
          }
      
          // Handle dropdowns
          const dropdowns = await page.$$('select');
      
          for (let k = 0; k < dropdowns.length; k++) {
            const selectedValue = await page.evaluate(el => el.value, dropdowns[k]);
      
            if (selectedValue === 'Select an option') {
              // Get all available options in the dropdown
              const options = await dropdowns[k].$$('option');
      
              if (options.length > 1) {
                // Skip the placeholder and select the second option (index 1)
                const validOption = options[1]; // Assuming the second option is always valid
      
                const validOptionValue = await page.evaluate(el => el.value, validOption);
      
                await dropdowns[k].select(validOptionValue);
                console.log(`Selected valid option '${validOptionValue}' for dropdown ${k + 1}`);
              }
            } else {
              console.log(`Dropdown ${k + 1} already filled with '${selectedValue}'`);
            }
          }
      
          // Handle checkboxes (e.g., accept terms and conditions)
          const checkboxes = await page.$$('input[type="checkbox"]');
      
          for (let l = 0; l < checkboxes.length; l++) {
            const isChecked = await page.evaluate(el => el.checked, checkboxes[l]);
      
            if (!isChecked) {
              await checkboxes[l].click();  // Select the checkbox
              console.log(`Checked checkbox ${l + 1}`);
            } else {
              console.log(`Checkbox ${l + 1} is already checked`);
            }
          }
        } catch (error) {
          console.error('Error filling additional questions:', error);
        }
      }

    async function jobsApply() {
        await buttonClick("#global-nav > div > nav > ul > li:nth-child(3)");
        await waitForSelectorAndType('[id^="jobs-search-box-keyword-id"]', data.keyword);
        await waitForSelectorAndType('[id^="jobs-search-box-location-id"]', location);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Corrected to use page.waitForTimeout
        await page.keyboard.press("Enter");
        await jobCriteriaByTime();
        await new Promise(resolve => setTimeout(resolve, 3000)); // Corrected to use page.waitForTimeout
        await FillAndApply();
    }



  //   async function insertJobData(userEmail, jobTitle, companyName, jobUrl, status = 'applied') {
  //     const client = await db.connect();
  
  //     try {
  //         const userQuery = 'SELECT id FROM users WHERE email = $1';
  //         const userResult = await client.query(userQuery, [userEmail]);
  
  //         if (userResult.rows.length === 0) {
  //             console.log('User not found');
  //             return;
  //         }
  
  //         const userId = userResult.rows[0].id;
  
  //         const query = `
  //             INSERT INTO applied_jobs (job_title, company_name, job_url, status, user_id)
  //             VALUES ($1, $2, $3, $4, $5)
  //         `;
  
  //         await client.query(query, [jobTitle, companyName, jobUrl, status, userId]);
  //         console.log('Job applied and stored in database');
  //     } catch (error) {
  //         console.error('Error inserting job data:', error);
  //     } finally {
  //         client.release();
  //     }
  // }

  async function insertJobData(userEmail, jobTitle, companyName, jobUrl, status = 'applied') {
    try {
        // Fetch the user by email
        const user = await db.query('SELECT * FROM users WHERE email = $1', [userEmail]);

        // Check if the user exists
        if (user.rows.length === 0) {
            console.log('User not found');
            return { success: false, message: 'User not found' }; // Return meaningful response
        }

        const userId = user.rows[0].id;

        // Insert the job data into the database
        const query = `
            INSERT INTO applied_jobs (job_title, company_name, job_url, status, user_id)
            VALUES ($1, $2, $3, $4, $5)
        `;

        await db.query(query, [jobTitle, companyName, jobUrl, status, userId]);
        console.log('Job applied and stored in database');

        return { success: true, message: 'Job applied and stored successfully' }; // Return success response
    } catch (error) {
        console.error('Error inserting job data:', error);
        return { success: false, message: 'Error inserting job data', error }; // Return error response
    }
}

  

    async function main() {
        logs();
        await initiliazer();
        await Login();
        await jobsApply();
        await browser.close();
    }

    try {
        await main();
        res.status(200).json({ message: "Automation successful", jobsApplied: totalApplied });
    } catch (err) {
        res.status(500).send('error');
    }
    
}
export async function getJobProgress(req, res) {
  res.json({ jobsApplied: totalApplied });
}

