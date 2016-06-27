# gitrack
GitRack is a script which tracks your project which version are controlled by git, Wheneve a file is changed this script create a timer on Harvest(Currently) , new timer will be created for current working branch. 


# Why this?
So you are bore of updating harvest everytime for task you are working,
Manually  go over harvest or any time tracker tool and update your time?
Then GitRack will help you, GitRack will look you git project and whenever
you make switch over branches and track time on Time tracker tool.

# How to use?
Simple.. Just clone this repo
then install dependency by
``npm install``
and then start the app by
``node index.js``

if you want this app to run on background then enter
``node index.js -d``

doing this will run your app on background.

If this is your first time then program will ask for details
of harvest subdomain,username,password,email
also location of project to track
Whenever you checkout branch it will start timer in git
