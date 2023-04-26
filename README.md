# Puzzletopia

PoC to allow users to play some puzzles

## Requirements

1. You need [sqlite3](https://www.tutorialspoint.com/sqlite/sqlite_installation.htm) running locally
2. You need to set up the NEXTAUTH_SECRET env var (it's set up by default running yarn dev command, for demo purposes)

## Running the project

1. Run `yarn install` in project root
2. After installing the dependencies, just run `yarn dev:start`. This will build and run the project.

## Project design

The app is designed so that the user can complete each puzzle just once. I went with this mainly because of the time restriction for this take home assignment, although it would be pretty simple to make it possible for the user to take each puzzle more than once (as well as showing all the puzzles solved in the profile page). It would only require to create a `Puzzle` model in the DB, and then create an instance once a puzzle has been completed or failed. Also, the architectural decision of using a cache to store each generated puzzle in memory until solved/failed would make it quite straightforward.

I also chose to hide the whole app to non authenticated users. This also makes it easier to handle the whole app session status. All the auth pages (login, signout, etc) are the default ones for `NextAuth`, as that saved a lot of time.

Regarding the data models, there are 3 of them: `User`, `Session` and `Account`. The 3 of them are created automatically by `NextAuth` (will speak more about this in the [Tools](#tools) section), although the `User` one contains all the app related data, like the user's username, password, puzzles status, etc.
As I said, if the app would allow the user to take each puzzle multiple times, it would require to have one more model, the `Puzzle` one, which would contain each puzzle status, and would have a FOREING KEY poiting to the `User` one.

The DB is an in memory one, which syncrhonizes and restarts each time the server is restarted. This is due to the time, as it is very easy to set up, and with no time restriction I would have used a local DB and migrations (the sync method creates all the tables at startup).

As for the puzzles, both solving algorithms just run once the user submits the solution, so that there's no CPU usage if not neccessary. Regarding puzzle 2 algorithm, I went for sorting the numbers and then accessing the 300th position. I think this solution is good enough, given that amount of numbers is a fixed one.

Lastly, the app uses an in memory cache to store each generated puzzle data before it's either solved or failed. This makes it pretty simple to store the data before the user solves it, and avoids storing data in DB that will be removed later (saving also a DB call to remove it). The cache access is also quicker than the DB one.

## Tools

The main reason I chose all of this tools is because they meet the requirements and are easy to setup and use, given the time restriction:

* **sqlite3**

    I used sqlite3 as it was fairly quick to setup. Would I had more time, I may have used a MyQSL DB.

* **NextJS**

    I chose this one as I'm pretty confident with it, and meets the requirements of using `React` and `Node`.

* **NextAuth**

    It's been a while since I had to manage credentials authentication and sessions in an app, given that in my current position we go passwordless. I chose `NextAuth` as it seemed very easy to use, and one of the main frameworks used by devs.

* **MaterialUI**

    The reason for this one is that it abstracts a lot of the CSS handling, and it's very easy to setup and use.

* **node-cache**

    I used this one as I'm quite familiar with it and I find it's a great tool for in memory cache.

## Accomplishments

I'm quite happy with the final result, given that there were some parts of the app I haven't worked with for a while, and the headaches that the auth framework gave me. Although there are some bits I would like to improve should I have more time (specially the protected routes middleware, as the current solution makes the pages flicker before redirecting to login page in case of unauthenticated user), I think it's quite good overall given the short time for this task.

## Challenges

This challenges come mainly because of lack of use, as I have worked recently with the rest of the stack:

### 1. Authentication

The biggest challenge I faced was the authentication. It's been long since I had to setup an auth system (I either have used a third party one like `Firebase`, or haven't worked on the auth system of that company). I knew this was going to take some time, so I wanted to go as quick as possible. `NextAuth` did the job quite well, although I struggled with it. In fact, it's what took me more time, like 1 day and a half of the 3. It's also not working as it should be, as it has a `NextJS` middleware to protect your apps routes, but it was not working as expected and some of the matched routes were not being protected, so I just chose to protect them in each one of the pages component, so that I didn't lose more time.

### 2. DB

It's been also a while since the last time I used SQL (I have been using NoSQL for some years now). But although at first I thought it would be the main challenge, I found that the `sequelize` library makes it a breeze. I was surprised how easy and quick was to set up all the DB, as well as connect with it with this ORM. It also allows you to sync on app startup, creating the neccessary tables for you (no migrations required), and abstracts all the SQL queries to DB, so quite happy with this decission.

## Things to improve

If I had more time, I would improve the following things:

* **Tests**: I added some unit tests to the puzzles generation and solving, but I would add some E2E ones and also some UI ones.
* **NextAuth config**: There's probably a better way to set up the authentication, like the DB, middlewares for protecting routes, etc, but I would need more time in order to make my head around all the framework.
* **Puzzle 2 algorithm**: Should I have more time, and the amount of numbers be bigger, I would have optimized the algorithm, maybe using [Randomized Quickselect](https://eugene-eeo.github.io/blog/randomized-quickselect.html).
* **React components**: I would probably extract some more code into it's own components files.
* **DB abstraction**: I would improve the methods exposed, so that there's a better abstraction in case of a DB change need.
* **Validation middleware**: I would add an `ExpressJs` validation middleware for each one of the endpoints to check the data passed to them.
* **Custom auth pages**: The auth pages are the default ones, which made it quicker, but would be good to cusstomize the styles to meet the rest of the app.

## Time spent

I spent around 15-16 hours on the project, mainly doing research about the tools I had not used before and setting them up. I spent around 1 hour making the project design, another hour selecting the tools, and then around 13 development hours. This report took around 1 hour too.
