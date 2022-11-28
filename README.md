# FullStackAddMachine

Client Goals
Application Type : Virtual Adding Machine
Application Functionality:
add entries
review history of entries
saves entries after each addition
save to a file for historical purposes

Application Overview:
Simple page consisting of the following:
textbox to show the history of the current adding
saves to a temp file every time line is added
textbox with the current sum
inputbox to type the next addition (allows numbers)
button to run the sum
button to save your work to a file

Technology:
Front End: React App Web Page
Back End: Javascript / NodeJS
Storage: all in local browser storage / output to json file

Work Breakdown

1. Plan out the main methods needed to achieve basic functionality (0.5Hours)
   a)see 'Application Functionality' for functions needed
   b)review user needs and ensure they are met
   c)sketch out a test plan to test the methods/components as they are built
2. Design and Create the basic GUI shell for the application (~2hrours)
   a)see 'Application Overview' for components to consider
   b)rough sketch GUI using paper/drawing pad
   c)rough code components onto screen without accounting too much for optimal design
3. Write basic pseudocode for each of the main methods (0.5hours)
   a)determine any submethods that may be required
4. Write complete code for each method - speed testing methods as each functionality finished (~2.5hours)
   a)code one section of functionality at a time
   b)run basic testing after each functionality complete (enough to know it does the job)
5. Optimize the GUI design with consistency, simplicity, functionality in mind (1hour)
   a)add the design / color / flare to the page
6. Testing the Application (~1hour)
   a)test each section of functionality using good data, bad data, boundary data
   b)make any necessary adjustments
   c)review user needs and ensure they are met
7. Review the application with the client to ensure all needs are met (30mins)
   a)have the user navigate and use the site
   b)if the users needs are met, determine method of delivery, etc.

Main Methods

1. Add Entries
   a. addEntry, updateSum
2. Review history of Entries
   a. viewCurrentHistory
3. Save entries after each addition
   a. saveEntryToStorage
4. Save history to a file
   a. saveToFile
