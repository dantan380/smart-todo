# Smart TODO App 🤓📃

Simple to-do app that tracks tasks and automatically categorizes them based on pre-trained models using Google's Natural Language API.

## Description

Users can add a 'to do' by entering a phrase or statement and Google will give us back their categories.  The APP, on the server side, will then filter those categories into our predefined buckets which are 'Eat', 'Buy', 'Watch', and 'Read'.  This was a midterm project completed by 3 Lighthouse Lab students, over a period of 7 days.  We were given a skeleton node layout, and we were tasked to build a full-stack app on top of it.  This includes project planning, user story grooming, ERD creation, etc.

Students:
* !["Garrick Henne"](https://github.com/garrickhenne)
* !["Daniel Tan"](https://github.com/dantan380)
* !["Robert Shum"](https://github.com/robertshum)

## Features

* Each users will have their own lists, independent of other users.
* Users can remove and move tasks around, in case it was classified incorrectly.
* Utilizes Google's Natural Language API for classification.
* Postgres database used for storing user lists and their to dos.


Finished Stretch Goals:

* Styling features - Random greetings on page refresh, subtle BG animation.


Unfinished Stretch Goals:

* Add more categories (like music).
* Add a category to show finished tasks.
* Use different apis to make our searches more accurate.
* The ability to edit the to dos.
* The ability to determine the categories as user is typing the to dos.

## Branches

```
main
```
* demo ready.


Other branches are features / bugfixes / css touchups.

# Final Product / Youtube Demo

Click to watch:\
[![Demo](https://github.com/robertshum/smart-todo/blob/main/docs/landing-page.png)](https://youtu.be/rpiIrkd5efo)

## Dependencies

- Node
- NPM
- jQuery
- Express
- Tailwind CSS


## Getting Started

1. Clone your repository onto your local device.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

* Note: to use Tailwind, `npm run watch-tailwindcss` in another terminal.