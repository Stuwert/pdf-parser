# PDF Parser

This is a basic PDF parsing application that will take drag and drop input from a user and save information to a database in addition to making an API call.

The project management link can be found [on a trello board](https://trello.com/b/1u1fXSiE/covered-insurance-project), and the website can be found at [PDF Parser](http://pdfparser.firebaseapp.com).  

This takes advantage of the technologies
[pdf2Json](https://github.com/modesty/pdf2json)
[angular-file-upload](https://github.com/nervgh/angular-file-upload/)
to handle the drag and drop upload as well as the pdf parsing tasks.

## Installation instructions

Clone the repo and
```
npm install
```

to get set-up.  

To run the server, use
```
nodemon
```

to  view the front-end
```
cd frontend
firebase serve
```
to compile new code.

The server will by default run from localhost:3000 and the firebase server will run from localhost:5000.  If you want to do further testing with the server, you'll have to change the http requests from the heroku backend to localhost in /frontend/js/app.js.
