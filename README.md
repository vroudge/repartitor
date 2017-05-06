# repartitor
An algorithm to make an equal repartition of an array of objects depending on one of the fields

**See example 3 for the auto-filling repartion use case you are probably looking for**

Installation
---

`npm install repartitor --save`

Example uses
---
1) Select a # of objects

Given an array of objects with a field `color` and an `id`, I want to get an array with an equal repartition of occurences of a given field.

```
const Repartitor = require('repartitor');

const myObjects = [
    {
        id: 1,
        color: 'blue'
    }, {
        id: 2,
        color: 'blue'
    }, {
        id: 3,
        color: 'blue'
    }, {
        id: 4,
        color: 'yellow'
    }, {
        id: 5,
        color: 'yellow'
    }, {
        id: 6,
        color: 'red'
    },
];
```
Get one of each, exclude no color value.
```
const results = new Repartitor({ targetArray: myObjects, field: 'color', useAllPropertiesValues: true, stackSize: 1 }).run();
/*
[
    {
        id: 1,
        color: 'blue'
    } {
        id: 4,
        color: 'yellow'
    }, {
        id: 6,
        color: 'red'
    },
]
*/
```

2) Exclusion of values

Get one of each but exlude the `yellow`.
```
const results = new Repartitor({ targetArray: myObjects }).run('color', ['red', 'blue'], 1);
/*
[
    {
        id: 6,
        color: 'red'
    }, {
        id: 1,
        color: 'blue'
    }
]
*/
```

3) Auto-fill with other values as equally as possible

Get two of each and exclude yellow colors(here the red is filled with a blue instead);

```
const results = new Repartitor({ targetArray: myObjects }).run('color', ['red', 'blue'], 2);

```
