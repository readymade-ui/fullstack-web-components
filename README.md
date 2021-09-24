# Fullstack Web Components

Companion repository for the book "Fullstack Web Components" written by Stephen Belovarich. "Fullstack Web Components" is published by Newline.

## Getting started

This book requires node ^16.3.0 and yarn ^1.22.11 installed prior to installation.

1. Clone this repository `git clone git@github.com:readymade-ui/fullstack-web-components.git`
2. Install dependencies `yarn`
3. Checkout Chapter 1 Branch `git checkout chapter/1`
4. Start development server `yarn start`


### Navigation

To start any chapter, checkout the branch with the same number as the chapter. For example, to start Chapter 3, `git checkout chapter/3`. The start of any chapter is the previous chapter solution.


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