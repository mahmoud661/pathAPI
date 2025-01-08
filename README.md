# PathAPI

## Introduction

PathAPI is a node js application written with TypeScript and architect with Clean Architecture model. This application serves DevPath website with there routes:

API is routed to `/api/v1/`. You can discover routes in details in `/ROUTES.md'.

## Download the project

### With HTTP auth

```bash
  git clone https://github.com/AHU-Graduation-Project/pathAPI.git;
  cd pathAPI;
```

### With SSH key

```bash
  git clone git@github.com:AHU-Graduation-Project/pathAPI.git;
  cd pathAPI;
```

## Run the application

To run the typescript files (/src):

```bash
  npm i; # install dependencies 
  npm run dev; # run the server from /src
```

To run the compiled javascript code (/dist):

```bash
  npm i;
  npm run build;
  npm start; # or npm run start
```

To run the app in production environment, update the `NODE_ENV` in .env to `'production'`

## Testing

To run test

```bash
  npm test;
  # or
  npm run test:watch;
```

## Commit & Push (dev rules)

### The most important rule, DO NOT PUSH TO MAIN.

2. Make sure that any new ts file has his own test file. husky will prevent any commit without tests.
3. Before open a PR, make sure that you don't have any conflict.
4. If there are any, or your branch is out dated. run these command and solve the conflict via editor.
  ```bash
    git pull origin main
  ```

### Make a new branch

```bash
  git checkout -b branch_name
```

### Push changes

```bash

  git checkout your_branch_name;
  git status; #just to double chick the changes
  git add <the changes you need to commit | . for all > 
  # ( . ) mean the entire dir, so make sure that you are in the root
  git commit -m "message"; # or git commit --amend for amend changes to last commit;
  git push origin your_branch_name;

```