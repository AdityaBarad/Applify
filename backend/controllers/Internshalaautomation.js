// import puppeteer from 'puppeteer';
// let jobsApplied = 0;

// export async function IrunPuppeteer(req, res) {
//         const {
//              id,
//              pass ,
//              FILTER1 ,
//              FILTER2,
//              FILTER3 ,
//              totalJobs,
//              coverletter
//     } = req.body;

//     const browserPath= "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

//     const data = {
//         id,
//         pass,
//         FILTER1,
//         FILTER2,
//         FILTER3,
//         totalJobs,
//         coverletter
//     };

//     jobsApplied = 0;

//     // // Define default values
//     // const data = {
//     //     id,
//     //     pass,
//     //     keyword: keywords,
//     //     location,
//     //     AvgExperience: experience,
//     //     Period: applyFilter,
//     //     totalJobsToApply: totalJobsToApply,
//     //     // browserPath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
//     // };


//     console.log("mydata is: " + JSON.stringify(data));

//     async function main() {
//         // Launch Puppeteer browser instance
//         const browser = await puppeteer.launch({
//             headless: false, // Set to true to run in headless mode
//             defaultViewport: null, // Fullscreen viewport
//             args: ["--window-size=1300,700"], // Maximize browser window
//             executablePath: browserPath,
//         });
    
//         const [page] = await browser.pages(); // Get the first page
//         await page.goto("https://internshala.com/"); // Navigate to Internshala homepage
    
//         // Click the login button
//         await page.click("button.login-cta");
    
//         // Type in email and password and submit
//         await page.type("#modal_email", id, { delay: 50 }); // Email input field
//         await page.type("#modal_password", pass, { delay: 50 }); // Password input field
//         await page.click("#modal_login_submit"); // Submit login
//         await page.waitForNavigation({ waitUntil: "networkidle2" }); // Wait for login
    
//         // Navigate to the internship fair page
//         await page.goto("https://internshala.com/the-grand-summer-internship-fair");
//         await new Promise(resolve => setTimeout(resolve, 3000));
    
//         const filters = [FILTER1, FILTER2, FILTER3];
//         for (const filter of filters) {
//             await page.waitForSelector("#select_category_chosen", { visible: true });
//             await page.click("#select_category_chosen");
//             await page.type("#select_category_chosen", filter, { delay: 50 });
//             await page.keyboard.press("Enter");
//             await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for the filter to apply
//         }
//         await new Promise(resolve => setTimeout(resolve, 3000));
    
//         while (jobsApplied < totalJobs) {
//             try {
//                 // Wait for the first internship to be visible and click on it
//                 await page.waitForSelector(".individual_internship.easy_apply", { visible: true });
//                 const internships = await page.$$(".individual_internship.easy_apply");
//                 if (internships.length > 0) {
//                     await internships[0].click(); // Click the first internship
//                 } else {
//                     console.log('No internships found');
//                     continue; // Skip to the next iteration
//                 }
    
//                 // Click the continue button
//                 await page.waitForSelector("#continue_button", { visible: true });
//                 await page.click("#continue_button");
    
//                 // Check if the copy cover letter button exists and click it
//                 const copyCoverLetterButton = await page.$(".copyCoverLetterTitle");
//                 if (copyCoverLetterButton) {
//                     await copyCoverLetterButton.click();
//                 } else {
//                     console.log('Copy cover letter button not found');
//                 }
    
//                 // Click all checkboxes if they exist
//                 const checkboxes = await page.$$("input[type='checkbox']");
//                 if (checkboxes.length > 0) {
//                     for (let checkbox of checkboxes) {
//                         const isVisible = await checkbox.boundingBox(); // Ensure the checkbox is visible
//                         if (isVisible) {
//                             await checkbox.click(); // Click the visible checkbox
//                         } else {
//                             console.log('Checkbox not visible or clickable');
//                         }
//                     }
//                 } else {
//                     console.log('No checkboxes found');
//                 }
    
//                 // Fill all empty inputs with class "textarea form-control valid" if they exist
//                 const textAreas = await page.$$('textarea.textarea.form-control');
//                 if (textAreas.length > 0) {
//                     for (let textArea of textAreas) {
//                         await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before interacting
//                         await page.evaluate(textArea => textArea.focus(), textArea); // Focus on the textarea
//                         await page.evaluate((textArea, text) => textArea.value = text, textArea, coverletter);
//                     }
//                 } else {
//                     console.log('No textareas found');
//                 }
    
//           // Handle dropdowns
//     const dropdownSelector = "select#locations";
//     const dropdown = await page.$(dropdownSelector);
//     if (dropdown) {
//         // Click to open the dropdown if needed
//         await page.evaluate(() => {
//             const selectElement = document.querySelector("select#locations");
//             selectElement.style.display = 'block'; // Ensure the dropdown is visible
//         });
        
//         // Wait for the options to be visible
//         await page.waitForSelector(`${dropdownSelector} option`, { visible: true });
    
//         // Select the first option by index
//         await page.evaluate(() => {
//             const selectElement = document.querySelector("select#locations");
//             if (selectElement && selectElement.options.length > 0) {
//                 selectElement.selectedIndex = 0; // Select the first option
//                 selectElement.dispatchEvent(new Event('change', { bubbles: true })); // Dispatch change event
//             }
//         });
    
//         console.log('Selected the first option in the dropdown.');
//     } else {
//         console.log('Dropdown not found');
//     }
    
    
    
    
//                 // Wait until the submit button is available and click it
//                 const submitButton = await page.$("#submit");
//                 if (submitButton) {
//                     await page.waitForSelector("#submit", { visible: true });
//                     await submitButton.click(); // Submit the application
    
//                     // Wait for the page to process submission
//                     await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 3 seconds
    
//                     // Click "Continue Applying"
//                     const continueApplyingButton = await page.$(".back-cta");
//                     if (continueApplyingButton) {
//                         await continueApplyingButton.click();
//                     } else {
//                         console.log('Continue applying button not found');
//                     }
//                 } else {
//                     console.log('Submit button not found');
//                 }
    
//                 // Increment the job count
//                 jobsApplied++;
//                 console.log(`Applied to ${jobsApplied} jobs.`);
    
//                 // Navigate back to the internship page for the next job
//                 await page.goto("https://internshala.com/the-grand-summer-internship-fair");
    
//             } catch (err) {
//                 console.error(`Error applying for job #${jobsApplied + 1}:`, err);
//                 // Retry or continue to the next iteration
//                 continue;
//             }
//         }
    
//         console.log("Automation complete. Applied to 20 jobs.");
//         await browser.close(); // Close browser after applying to all jobs
//     }
    
//     // // Run the main function
//     // main();

//     try {
//         await main();
//         res.status(200).json({ message: "Automation successful", jobsApplied: totalApplied });
//     } catch (err) {
//         res.status(500).send('error');
//     }

// }
// export async function IgetJobProgress(req, res) {
//   res.json({ jobsApplied: jobsApplied });
// }



import puppeteer from 'puppeteer';
let jobsApplied = 0;

export async function IrunPuppeteer(req, res) {
    const {
        id,
        pass,
        FILTER1,
        FILTER2,
        FILTER3,
        totalJobs,
        coverletter
    } = req.body;

    const browserPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

    const data = {
        id,
        pass,
        FILTER1,
        FILTER2,
        FILTER3,
        totalJobs,
        coverletter
    };

    jobsApplied = 0;

    async function main() {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--window-size=1300,700"],
            executablePath: browserPath,
        });

        const [page] = await browser.pages();
        await page.goto("https://internshala.com/");
        await page.click("button.login-cta");
        await page.type("#modal_email", id, { delay: 50 });
        await page.type("#modal_password", pass, { delay: 50 });
        await page.click("#modal_login_submit");
        await page.waitForNavigation({ waitUntil: "networkidle2" });
        await page.goto("https://internshala.com/the-grand-summer-internship-fair");
        await new Promise(resolve => setTimeout(resolve, 3000));

        const filters = [FILTER1, FILTER2, FILTER3];
        for (const filter of filters) {
            await page.waitForSelector("#select_category_chosen", { visible: true });
            await page.click("#select_category_chosen");
            await page.type("#select_category_chosen", filter, { delay: 50 });
            await page.keyboard.press("Enter");
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        await new Promise(resolve => setTimeout(resolve, 3000));

        while (jobsApplied < totalJobs) {
            try {
                await page.waitForSelector(".individual_internship.easy_apply", { visible: true });
                const internships = await page.$$(".individual_internship.easy_apply");
                if (internships.length > 0) {
                    await internships[0].click();
                } else {
                    console.log('No internships found');
                    continue;
                }

                await page.waitForSelector("#continue_button", { visible: true });
                await page.click("#continue_button");

                const copyCoverLetterButton = await page.$(".copyCoverLetterTitle");
                if (copyCoverLetterButton) {
                    await copyCoverLetterButton.click();
                } else {
                    console.log('Copy cover letter button not found');
                }

                const checkboxes = await page.$$("input[type='checkbox']");
                if (checkboxes.length > 0) {
                    for (let checkbox of checkboxes) {
                        const isVisible = await checkbox.boundingBox();
                        if (isVisible) {
                            await checkbox.click();
                        } else {
                            console.log('Checkbox not visible or clickable');
                        }
                    }
                } else {
                    console.log('No checkboxes found');
                }

                const textAreas = await page.$$('textarea.textarea.form-control');
                if (textAreas.length > 0) {
                    for (let textArea of textAreas) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await page.evaluate(textArea => textArea.focus(), textArea);
                        await page.evaluate((textArea, text) => textArea.value = text, textArea, coverletter);
                    }
                } else {
                    console.log('No textareas found');
                }

                const dropdownSelector = "select#locations";
                const dropdown = await page.$(dropdownSelector);
                if (dropdown) {
                    await page.evaluate(() => {
                        const selectElement = document.querySelector("select#locations");
                        selectElement.style.display = 'block';
                    });

                    await page.waitForSelector(`${dropdownSelector} option`, { visible: true });

                    await page.evaluate(() => {
                        const selectElement = document.querySelector("select#locations");
                        if (selectElement && selectElement.options.length > 0) {
                            selectElement.selectedIndex = 0;
                            selectElement.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    });

                    console.log('Selected the first option in the dropdown.');
                } else {
                    console.log('Dropdown not found');
                }

                const submitButton = await page.$("#submit");
                if (submitButton) {
                    await page.waitForSelector("#submit", { visible: true });
                    await submitButton.click();
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    const continueApplyingButton = await page.$("#dismiss_similar_job_modal");
                    if (continueApplyingButton) {
                        await continueApplyingButton.click();
                    } else {
                        console.log('Continue applying button not found');
                    }
                } else {
                    console.log('Submit button not found');
                }

                jobsApplied++;
                console.log(`Applied to ${jobsApplied} jobs.`);

                await page.goto("https://internshala.com/the-grand-summer-internship-fair");

            } catch (err) {
                console.error(`Error applying for job #${jobsApplied + 1}:`, err);
                continue;
            }
        }

        console.log("Automation complete. Applied to all specified jobs.");
        await browser.close();
    }

    try {
        await main();
        res.status(200).json({ message: "Automation successful", jobsApplied });
    } catch (err) {
        res.status(500).send('Error occurred during job automation.');
    }
}

export async function IgetJobProgress(req, res) {
    res.json({ jobsApplied });
}
