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
$ npm start
```

This launches a development server at `localhost:3000`. Visit this page on your browser to browse the app.

## To-Dos

### General

- [ ] Change all SASS files to be CSS modules
- [ ] Remove repetitive code (mainly scss styles)
- [ ] Add working (wireframe) components for each page

### Pages to Implement

- [ ] Onboarding pages
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
