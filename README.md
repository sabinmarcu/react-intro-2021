## Adding new packages to the repo

```

// For dependencies
$ yarn add <package-name>
$ npm install --save <package-name>

// For devDependencies
$ yarn add -D <package-name>
$ npm install --save-dev <package-name>

```

## Sample Data

Taken from: [https://gist.githubusercontent.com/sabinmarcu/f2e2a68ff36528965792e019ad9fd20b/raw/88f6726920ee13ea59121aabb45e6bba2d55a63e/data.json](https://gist.githubusercontent.com/sabinmarcu/f2e2a68ff36528965792e019ad9fd20b/raw/88f6726920ee13ea59121aabb45e6bba2d55a63e/data.json)

## Libs used 

- airbnb eslint config: [https://www.npmjs.com/package/eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)

- mdi-react ([materialdesignicons.com](materialdesignicons.com)): [https://www.npmjs.com/package/mdi-react](https://www.npmjs.com/package/mdi-react)

- json server: [https://www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server)

- debounce [https://www.npmjs.com/package/debounce](https://www.npmjs.com/package/debounce)

- react router [https://reactrouter.com/web/guides/quick-start](https://reactrouter.com/web/guides/quick-start) (`react-router` & `react-router-dom`)

## Useful libs

- react-measure [https://www.npmjs.com/package/react-measure](https://www.npmjs.com/package/react-measure)

## Tips

If webpack/eslint are acting up (can't find file when it's obviously there), usually after a rename, do:

```
$ rm -rf node_modules/.cache 

or 

$ rmdir node_modules/.cache
```

or the windows equivalent

# Homework

App / Navigation bar on the top of the page to contain:
- left side
    - link towards home (with react router)
    - optional link that takes you back one link if not on the homepage
- right side
    - theme button

## Bonus points

Style nav/app bar depending on scroll position:
- top of the page (scrolled all the way up)
    - background to match page background
- page is scrolled (visually pleasing, tolerance to be decided)
    - background to shift
    - add box shadow
Bar should be fixed to top