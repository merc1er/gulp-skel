<div align="center">
  <img src="gulp-logo.svg" height="80">
  <h3>Gulp project skeleton</h3>
</div>

---

### Table of contents

- [Run the develoment server](#-run-the-develoment-server)
- [Contribute](#-contribute)
- [Deployment](#-deployment)

---

### 💻 Run the develoment server

You will need [nodeJS](https://nodejs.org/en/) installed on your machine, then run:

```shell
npm install
npx gulp
```

---

### 👨🏻‍💻 Develop

##### Coding style

Use the coding style recommended by [codeguide.co](https://codeguide.co).

##### Structure

- HTML files are located in `/app/`. `.njk` files are template ([Nunjucks](https://mozilla.github.io/nunjucks/)) files.

- CSS files are located in `/scss/`. Use [Sass](https://sass-lang.com) syntax if possible.

- JavaScript files are located in `/js/`. All files will be concatenated in alphabetical order unless specified otherwise.


Hit `ctrl + C` to stop the server.

---

### 🚀 Deploy

Run `npx gulp build`. The `/dist/` folder contains the production website.

