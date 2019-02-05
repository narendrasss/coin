# Finance App

Finance application for managing expenses. Built with Typescript and React. Currently working on front-end, will implement back-end server in the near future.

Credit to [Najla Sekariyanti](https://najlas.me) for the incredible UI/UX work on this app. Check out the wireframes [here](https://xd.adobe.com/spec/b7512e29-47ed-4f97-74f1-b958501c4539-c160/).

## Running the App

Clone the repository:

```
$ git clone && cd finance-react
```

Then start the development server:

```
$ cd client && npm start
```

This launches a development server at `localhost:3000`. Visit this page on your browser to browse the app.

## To-Dos

### General

- [ ] Change all SASS files to be CSS modules
- [ ] Remove repetitive code (mainly scss styles)
- [ ] Add working (wireframe) components for each page
- [ ] Implement login and authentication

### Pages to Implement

- [ ] Onboarding pages
- [ ] Dashboard (*needs fix*)
  - [ ] Fix styling and component structure
- [ ] Budget
  - [X] Add wireframe
  - [X] Fix styling
  - [ ] Implement modify buttons
  - [ ] Correct fixed expense component
- [X] Add **fixed** expense
- [ ] All categories
  - [X] Add wireframe
  - [ ] Fix styling
- [ ] One category (one)
  - [X] Add wireframe
  - [ ] Add content by fetching from server
  - [ ] Fix styling
- [ ] Add category
  - [X] Add wireframe
  - [X] Fix styling
  - [ ] Implement `onSubmit` feature
- [ ] All expenses
  - [ ] Add wireframe
  - [ ] Fix styling
- [ ] Add expense
  - [ ] Add wireframe
  - [ ] Fix styling

### Other

- [X] Implement **static** PieChart component
- [ ] Implement *working* PieChart component (using D3?)
