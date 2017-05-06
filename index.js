function Repartitor(opts) {
    if (typeof opts.concat === 'function') {
        this.repartitionArray = opts;
    } else {
        this.repartitionArray = opts.targetArray;
        this.targetField = opts.field;
        this.useAllPropertiesValues = opts.useAllPropertiesValues || false;
        this.targetPropertyValues = this.parseTargetField(this.targetField);
        this.stackSize = opts.stackSize;
    }
}
Repartitor.prototype.parseTargetField = function () {
    if (this.useAllPropertiesValues) {
        const values = [];

        for (var i = 0; i < this.repartitionArray.length; i++) {
            if (values.indexOf(this.repartitionArray[i][this.targetField]) === -1) {
                values.push(this.repartitionArray[i][this.targetField]);
            }
        }
        return values;
    }
};

Repartitor.prototype.run = function (repartitionField, names, stackSize, recurseIndex, recurseResults, recurseRunLeft) {
    var usedRepartitionField = repartitionField;
    var usedStackSize = stackSize;
    var usedNames = names;
    var index = recurseIndex || 0;
    var results = recurseResults || [];
    var runLeft = recurseRunLeft || false;

    if (this.useAllPropertiesValues) {
        usedNames = this.targetPropertyValues;
        usedRepartitionField = this.targetField;
        usedStackSize = this.stackSize;
    }

    console.log(repartitionField, names, stackSize);

    var expectedFinalSize = usedNames.length * usedStackSize;

    if (results.length === expectedFinalSize) {
        return results;
    }

    for (var j = 0; j < this.repartitionArray.length; j++) {
        const currentValue = this.repartitionArray[j];

        if (!results.includes(currentValue) && currentValue[usedRepartitionField] === usedNames[index]) {
            if (results.length < (usedStackSize * (index + 1))) {
                results.push(currentValue);
            } else if (runLeft) {
                if (results.length < expectedFinalSize) {
                    if (expectedFinalSize % 2 === 1 && results.length % 2 === 0) {
                        results.push(currentValue);
                        runLeft = false;
                        break;
                    } else {
                        index++;
                        results.push(currentValue);
                    }
                }
            }
        }
    }

    if (usedNames[index + 1] && !runLeft) {
        return this.run(usedRepartitionField, usedNames, usedStackSize, index + 1, results);
    } else if (usedNames[index - 1] && results.length !== expectedFinalSize) {
        return this.run(usedRepartitionField, usedNames, usedStackSize, 0, results, true);
    }

    return results;
};

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {

            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                // c. Increase k by 1.
                // NOTE: === provides the correct "SameValueZero" comparison needed here.
                if (o[k] === searchElement) {
                    return true;
                }
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}

/*const kek = [
    { name: 'kek', id: 1 },
    { name: 'kek', id: 2 },
    { name: 'lol', id: 11 },
    { name: 'lol', id: 12 },
    { name: 'lol', id: 13 },
    { name: 'kek', id: 3 },
    { name: 'kek', id: 4 },
    { name: 'kek', id: 5 },
    { name: 'lol', id: 16 },
    { name: 'lol', id: 17 },
    { name: 'lol', id: 18 },
    { name: 'kek', id: 6 },
    { name: 'kek', id: 7 },
    { name: 'kek', id: 8 },
    { name: 'kek', id: 9 },
    { name: 'lol', id: 10 },
    { name: 'rofl', id: 25 },
    { name: 'lol', id: 14 },
    { name: 'lol', id: 15 },
    { name: 'lol', id: 19 },
    { name: 'lol', id: 20 },
    { name: 'lol', id: 21 },
    { name: 'lol', id: 22 },
    { name: 'lol', id: 23 },
    { name: 'lol', id: 24 },
    { name: 'rofl', id: 26 },
];

var lolol = new Repartitor({ targetArray: kek, field: 'name', useAllPropertiesValues: true, stackSize: 3 }).run();
var kekek = new Repartitor({ targetArray: kek }).run('name', ['kek', 'lol', 'rofl'], 3);
console.log(lolol);
console.log(kekek);*/


module.exports = Repartitor;
