> AI HAS BEEN USED IN THIS WEBSITE TO CREATE THE GALLERY AND THE IDEA GENERATOR, HOWEVER ALL STYLING AND CSS WAS REDONE BY HUMAN HANDS

# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Airtable Gallery

The gallery page at `/gallery` reads project rows from Airtable. Set these environment variables before running or building the site:

- `AIRTABLE_BASE_ID`
- `AIRTABLE_TABLE_NAME` defaults to `Projects`
- `AIRTABLE_API_TOKEN`
- `AIRTABLE_VIEW_NAME` optional
- `AIRTABLE_TITLE_FIELD` defaults to `Title`
- `AIRTABLE_COVER_FIELD` defaults to `Cover image`
- `AIRTABLE_GITHUB_FIELD` defaults to `GitHub repo`
- `AIRTABLE_DEMO_FIELD` defaults to `Demo`

Each record should include a cover image, a GitHub repo URL, and a demo URL. The current implementation fetches Airtable in the browser, so use a read-only token for that base.
