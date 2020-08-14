# chareads.com

[![CircleCI](https://circleci.com/gh/pouretrebelle/chareads.com.svg?style=svg)](https://circleci.com/gh/pouretrebelle/chareads.com)

## :raised_hands: Development

- `npm install` installs all the site's dependencies
- `npm start` runs [Gatsby](https://www.gatsbyjs.org/) in dev mode on [localhost:2000](http://localhost:2000)

## :construction_worker: Being good

- We use [Typescript](https://www.typescriptlang.org/) for type checking, and it's hella strict
- We use [Prettier](https://prettier.io/) for consistent code styling, set it up for your editor with [these instructions](https://prettier.io/docs/en/editors.html) to run on file save
- `npm run lint` uses [ESLint](https://eslint.org/) with a bunch 'o plugins to check you're not writing shit syntax
- `npm run test` runs [Jest](https://jestjs.io/) for all the unit tests

## :rocket: Deployment

The site is deployed to [pouretrebelle.github.io/chareads.com](https://pouretrebelle.github.io/chareads.com/) on the `gh-pages` branch using the `npm run deploy` command. This is run automatically by CircleCI for every commit to master, and at midnight every night.

Part of the build script runs [a script to scrape the current video stats from the YouTube API](https://github.com/pouretrebelle/chareads.com/blob/master/scripts/stats/getYouTubeStats.ts), this is reliant on a `YOUTUBE_API_TOKEN` env var.

## :hammer: Scripts

- `npm run sync:videos` scaffolds video content for recent YouTube videos via the API, it takes a count argument which defaults to 1, append `-- 2` for 2 etc.
- `npm run sync:books` scaffolds book content from Goodreads data stored in `scripts/sync/data/goodreads.ts`, this can be generated from the [goodreads-stats-basic Glitch app](https://glitch.com/edit/#!/goodreads-stats-basic?path=server.js%3A8%3A0).
