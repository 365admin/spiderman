# 365admin Spiderman

Tool for scrapping stuff our of homepages that we like to react to ...

Check out the [blog](https://blog.hexatown.com/how-do-we-hexaheads-know-whats-happening-in-office365-21f3162d3fa4).

![](./spiderman.jpg)

## Installation

    npm install 
    npm install webdriver-manager -g
    npm install mocha -g

## Execution

In a console windows run 

    webdriver-manager start

Then in another run the following sequence

    node ./index.js crawl 
    node ./index.js parse
    node ./index.js excel

Which will create a **HTML file** and a screenshot in a **PNG Image** , then a **JSON file**, then an **Excel document** and store those in the temp subfolder

## Verbose logging
If you like to track what is going on under the hood set the environment variable DEBUG first

    SET DEBUG=app

## Version history

- 0.1 Baseline

## Todo

- [x] Generate JSON file with the essence of (https://fasttrack.microsoft.com/roadmap)
- [x] Cache data in backend
- [x] Add comparing
- [x] Add Mocha test
- [x] Add backend initialization 
- [ ] Export to Excel
- [ ] Find out how to setup a proper temp location for Mocha tests
- [ ] Export to filesystem
- [ ] Distribute to GIT
- [ ] Make it "Fire and forgetable"




