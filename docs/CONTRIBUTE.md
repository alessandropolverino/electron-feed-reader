# How to Contribute

When contributing to the project, please first discuss the change you wish to make via issue or email.

## Pull Request Process

1. Fork the repo and create your branch from:

   - "master" to solve bugs
   - "develop" to add feature

   > Check the [code structure](https://github.com/alessandropolverino/electron-feed-reader/blob/master/docs/CODE-STRUCTURE.md)

2. If you've added code that should be tested, add tests.

3. If you have changed APIs or added a new Feature, update the docs.

4. Ensure the tests pass.

5. Make sure your code lints.

6. Issue the pull request.

## Usage

We are using node v12.18.3 and yarn (strongly recommended) v1.22.4.

Useful commands:

```bash
# Run the app
yarn start

# Build
yarn make

# Lint the code
yarn lint
```

## Any Contribution Will Be Under the MIT Software License

Briefly, by submitting your code, your submissions are understood to be under the same MIT license that covers the project.

## Report Bugs and Propose New Features Using Github's issues

We use Giuhub issues to track public bugs, feel free to report one if needed!

## Write Detailed Bug Reports

Great Bug Reports should have:

- Quick summary / background

- Steps to reproduce

  - Be specific
  - Give sample code to reproduce if you can

- What you expected to happen

- What happens

- Notes (what might be happening, stuff you tried but didn't work)

## Coding Style

- 2 spaces for indentation rather than tabs

- 80 character line length

- Lint the code to conform to lint rules
  ```bash
  $ yarn lint
  ```
