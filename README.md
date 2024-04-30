# KOR CrossFit Games Open 2024 Leaderboard
This is a project created to keep scores of an online contest hosted by CrossFit. It's a worldwide competition, but in this project the leaderboard was created just for KOR CrossFit.

## TECHNOLOGIES
HTML, CSS, Javascript, React, NodeJS, Express, MongoDB

## CHALLENGES
The challenge here was to pull the data from the database and manipulate the results so they are displayed in the right order. 
There are some sorting filters (by name, by event 1, by event 2, by event 3 and by total) and also a team category.
Each filter was applied in the server side, so the Front End just has to display the results.
In the team category, I had to pull the data from the same database and create a new array with only the athletes that were part of the team and then filter them. 

Another challenge was to order the athletes in events that had a time cap. In case the athlete couldn't finish within the prescribed time, his number of repetitions became his score. His position had to be after all the people that completed.

## FEATURES
Video Overview:
<a href="https://github.com/altomizawa/open2024_leaderboard/assets/45319659/fdc9a23b-2c49-4371-a4ef-0da3f649e516" target="_blank">VIDEO OVERVIEW</a>


OPEN ROUTES (NOT SIGNED IN)
- Signup page for admin (left it open just for demonstration)
- Sign in page for admin
- Show ranking for all athletes
- Filter ranking by name, workout 1, workout 2, workout 3, total points.
- Filter ranking by teams

PROTECTED ROUTE (ADMIN)
- Search score by name
- Change athlete score


## INSTALLATION
Clone the repository

Install all the dependencies: 
npm i

Run the app:
npm run dev

## FUTURE IMPLEMENTATIONS
Create a page to signup and login for athletes, so they can register their own scores in the database.




