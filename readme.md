#365admin Spiderman

Tool for scrapping stuff our of homepages that we like to react to ...

## Installation

    npm install 
    npm install webdriver-manager -g
    npm install mocha -g

## Execution

In a console windows run 

    webdriver-manager start

Then in another

    node ./index.js crawl

or

    node ./index.js parse


## Verbose logging

    SET DEBUG=app

## Version history

- 0.1 Baseline

## Todo

[x] Generate JSON file with the essence of (https://fasttrack.microsoft.com/roadmap)
[x] Cache data in backend
[x] Add comparing
[x] Add Mocha test
[x] Add backend initialization 




