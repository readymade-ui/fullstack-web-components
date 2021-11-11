# Fullstack Web Components

Companion repository for the book "Fullstack Web Components" written by Stephen Belovarich. "Fullstack Web Components" is published by Newline.

## Getting started

This book requires node ^16.3.0 and yarn ^1.22.11 installed prior to installation.

1. Fork this repository
2. Clone the fork of this repository `git clone https://github.com/{username}/fullstack-web-components.git`
2. Install dependencies `yarn`
3. Checkout Chapter 1 Branch `git checkout chapter/1`
4. Start development server `yarn start`


### Navigation

To start any chapter, checkout the branch that has the solution from the previous chapter. For example, to start Chapter 3, `git checkout chapter-2-solution`.

### Updating from origin

After you've forked and cloned the repo, the master branch of this repository may periodically be updated with changes. To configure your local repository to receive updates, set this repository as the upstream.

```bash
git remote add upstream https://github.com/readymade-ui/fullstack-web-components.git
```

Verify the upstream is set.

```bash
git remote -v
```

Every time you need to sync with the changes in this repository.

Checkout the master branch.

```bash
git checkout master
```

Fetch the latest.

```bash
git fetch upstream
```

Merge the latest from upstream into master.

```bash
git merge upstream/master
```

To avoid conflicts, keep all your work on chapter branches as directed in the book.

Checkout your current branch. For example, if you're on chapter 2.

```bash
git checkout chapter-2
```

Merge the latest changes from master into your branch.

```bash
git merge master
```

Ensure dependencies are up to date. Usually the reason for updating from master is to sync with dependency upgrades.

```bash
yarn install
```

Commit the changes to the yarn.lock file.

```bash
git add yarn.lock
git commit -a -m "feat: updated dependencies"
```

Resume with the content of the book.


### Developing in a monorepo

This repository is a monorepo. `lerna` orchestrates the build for several packages in the monorepo.

#### Packages

| Package      | Directory | Purpose    |
|--------------|-----------|------------|
| @in/ui       | packages/component      | Web Component user interface library        |
| @in/common      | packages/common  |  Common utilities for coding user interfaces     |
| @in/client      | packages/client  |  Client application    |
| @in/server      | packages/server  |  Server application    |
| @in/style      | packages/style  |  Common CSS styling and assets exported from the design system   |