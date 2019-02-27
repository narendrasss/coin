# Coin

Finance application for managing expenses. Built with Typescript and React. This repo contains the client side code.

Credit to [Najla Sekariyanti](https://najlas.me) for the incredible UI/UX work on this app. Check out the case study that she wrote [here](https://najlas.me/coin).

## Running the App

You would need to first clone the backend server from [here](https://github.com/narendrasss/coin-server):

```
$ git clone https://github.com/narendrasss/coin-server.git
```

Then run the server with `yarn dev` or `npm run dev`. The server will start at `localhost:3001`. This url is already listed as a proxy on the react app, so everything should work correctly.

Then clone the repository:

```
$ git clone https://github.com/narendrasss/coin.git && cd finance-react
```

Then start the development server:

```
$ npm start
```

This launches a development server at `localhost:3000`. Visit this page on your browser to browse the app.

## To-Dos

### General

- [ ] Change all SASS files to be CSS modules
- [ ] Remove repetitive code (mainly scss styles)
- [ ] Add working (wireframe) components for each page

### Pages to Implement

- [x] Login
- [x] Onboarding pages
- [ ] Dashboard (_needs fix_)
  - [ ] Fix styling and component structure
- [ ] Budget
  - [x] Add wireframe
  - [x] Fix styling
  - [ ] Implement modify buttons
  - [ ] Correct fixed expense component
- [x] Add **fixed** expense
- [ ] All categories
  - [x] Add wireframe
  - [ ] Fix styling
- [ ] One category (one)
  - [x] Add wireframe
  - [ ] Add content by fetching from server
  - [ ] Fix styling
- [ ] Add category
  - [x] Add wireframe
  - [x] Fix styling
  - [ ] Implement `onSubmit` feature
- [ ] All expenses
  - [ ] Add wireframe
  - [ ] Fix styling
- [ ] Add expense
  - [ ] Add wireframe
  - [ ] Fix styling

### Other

- [x] Implement **static** PieChart component
- [ ] Implement _working_ PieChart component (using D3?)
