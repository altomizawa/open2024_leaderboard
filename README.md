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

## LIVE PREVIEW
#### (IMPORTANT: THE BACKEND IS IN A FREE HOST, SO IT MAY TAKE UP TO 50s FOR THE SERVER TO START UP THE FIRST TIME)
https://korleaderboardopen2024.netlify.app/

## SCREENSHOTS
HOMEPAGE
<br></br>
<img width="1767" alt="Screenshot 2024-06-24 at 2 22 40 PM" src="https://github.com/altomizawa/open2024_leaderboard/assets/45319659/903f9859-975d-48a1-8504-4d45cf669579">

SIGNIN
<br></br>
<img width="1781" alt="Screenshot 2024-06-24 at 2 22 54 PM" src="https://github.com/altomizawa/open2024_leaderboard/assets/45319659/0348d20d-5611-4236-b99e-7377de2e92e1">

SIGNED IN
<br></br>
<img width="1770" alt="Screenshot 2024-06-24 at 2 23 14 PM" src="https://github.com/altomizawa/open2024_leaderboard/assets/45319659/f9e2d6e6-8c19-4c49-b1c1-5e55d4ffbe2a">

FILTER ATHLETES
<br></br>
<img width="1766" alt="Screenshot 2024-06-24 at 2 23 35 PM" src="https://github.com/altomizawa/open2024_leaderboard/assets/45319659/fe09ec00-801a-4de3-968d-e0a4e2f8ed3c">

CHOOSE WORKOUT TO EDIT SCORE
<br></br>
<img width="1798" alt="Screenshot 2024-06-24 at 2 23 51 PM" src="https://github.com/altomizawa/open2024_leaderboard/assets/45319659/91c1b0fd-c13f-47ae-88e0-d143b1dda9df">

EDIT SCORE PAGE
<br></br>
<img width="1795" alt="Screenshot 2024-06-24 at 2 23 59 PM" src="https://github.com/altomizawa/open2024_leaderboard/assets/45319659/82d6f3dc-3800-4360-b15e-1645bf95924f">






## VIDEO
https://github.com/altomizawa/open2024_leaderboard/assets/45319659/fcbc7378-142d-450e-a0af-5cd0099386fe



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




