# KOR CrossFit Games Open 2024 Leaderboard
This is a project created to keep scores of an online contest hosted by CrossFit. It's a worldwide competition, but in this project the leaderboard was created just for KOR CrossFit.

## Technologies
HTML, CSS, Javascript, React

## Challenges
The challenge here was to manipulate the object that had all the results and display them in the right order. 
There are some sorting filters (by name, by event 1, by event 2, by event 3 and by total) and also a team category.
In the team category, I had to pull the data from the same database and create a new array with only the athletes that were part of the team. 

After getting all the data, I added a score for each athlete (individuals and team participants) and ranked them.

Another challenge was to order the athletes in events that had a time cap. In case the athlete couldn't finish within the prescribed time, his number of repetitions became his score. His position had to be after all the people that completed.


## Installation
Clone the repository

Install all the dependencies: 
npm i

Run the app:
npm run dev

## Future implementations
Create a backend server and database to store all the data.
Create a page to signup and login, so the athlete can register his own scores in the database.

