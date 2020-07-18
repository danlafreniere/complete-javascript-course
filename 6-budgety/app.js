// Planning and Architecture

/**
 * TO DO LIST:
 * Fundamental bits:
 * Add event handler -> input income description/value and button to add
 * Retrieve data from input values
 * Add the new item to our data structure
 * Add the new item to the UI
 * Calculate budget
 * Update UI.
 *
 *  We will create modules to keep things nice and encapsulated.
 * 3 key modules:
 * - DATA MODULE - budgetController
 * - UI MODULE - UIController
 * - CONTROLLER MODULE - controller
 */

var budgetController = (function() {
    var data = {
        allItems: {
            expense: [],
            income: [],
        },
        totals: {
            expense: 0,
            income: 0,
        },
    };
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    return {
        addItem: function(type, description, value) {
            var newItem, id;
            id = 0;
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            if (type === 'expense') {
                newItem = new Expense(id, description, value);
            } else if (type === 'income') {
                newItem = new Income(id , description, value);
            }
            data.allItems[type].push(newItem);
            console.log(data);
            return newItem;
        },
    };
})();

var UIController = (function() {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
    };
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value,
            };
        },
        getDomStrings: function() {
            return DOMStrings;
        },
    };
})();

var controller = (function(budgetCtrl, UICtrl) {
    var setUpEventListeners = function() {
        var DOMStrings = UICtrl.getDomStrings();
        document.querySelector(DOMStrings.inputButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event) {
            // ENTER KEY = 13.
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }
    var ctrlAddItem = function() {
        var input, newItem;
        // 1. Get the field input data.
        input = UICtrl.getInput();
        // 2. Add the item to the budget controller.
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. Add the item to the UI.

        // 4. Calculate the budget.
        // 5. Display the budget in the UI.
    }
    return {
        init: function() {
            console.log('Application has started');
            setUpEventListeners();
        },
    };
})(budgetController, UIController);

controller.init();
