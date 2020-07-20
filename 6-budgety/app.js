var budgetController = (function() {
    var data = {
        allItems: {
            income: [],
            expense: [],
        },
        totals: {
            income: 0,
            expense: 0,
        },
        budget: 0,
        percentDifference: -1,
    };
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    Expense.prototype.calculatePercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;
        })
        data.totals[type] = sum;
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
            return newItem;
        },
        deleteItem: function(type, id) {
            var ids, index;
            ids = data.allItems[type].map(function(item) {
                return item.id;
            });
            index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        calculateBudget: function() {
            calculateTotal('income');
            calculateTotal('expense');
            data.budget = data.totals.income - data.totals.expense;
            if (data.totals.income > 0) {
                data.percentDifference = Math.round((data.totals.expense / data.totals.income) * 100);
            } else {
                data.percentDifference = -1;
            }
        },
        calculatePercentages: function() {
            data.allItems.expense.forEach(function(item) {
                item.calculatePercentage(data.totals.income);
            });
        },
        getPercentages: function() {
            var percentages = data.allItems.expense.map(function(item) {
                return item.getPercentage();
            });
            return percentages;
        },
        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.income,
                totalExpense: data.totals.expense,
                percentDifference: data.percentDifference,
            }
        },
    };
})();

var UIController = (function() {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetValue: '.budget__value',
        incomeValue: '.budget__income--value',
        expenseValue: '.budget__expenses--value',
        percentageValue: '.budget__expenses--percentage',
        itemsParent: '.items__container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
    };
    var formatNumber = function(number, type) {
        var sign;
        number = Math.abs(number);
        number = number.toFixed(2);
        type === 'expense' ? sign = '- ' : sign = '+ ';
        return sign + number;
    };
    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    }
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
            };
        },
        addListItem: function(item, type) {
            var html, listContainer;
            if (type === 'income') {
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                listContainer = document.querySelector(DOMStrings.incomeContainer);
            } else if (type === 'expense') {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">24%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                listContainer = document.querySelector(DOMStrings.expenseContainer);
            }
            html = html.replace('%id%', item.id);
            html = html.replace('%description%', item.description);
            html = html.replace('%value%', formatNumber(item.value, type));
            listContainer.insertAdjacentHTML('beforeend', html);
        },
        deleteListItem: function(selectorID) {
            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },
        clearFields: function() {
            var fields;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ' ,' + DOMStrings.inputValue);
            fields = [...fields];
            fields.forEach(function(current) {
                current.value = "";
            });
            fields[0].focus();
        },
        displayBudget: function(data) {
            var type;
            data.budget >= 0 ? type = 'income' : type = 'expense';
            document.querySelector(DOMStrings.budgetValue).textContent = formatNumber(data.budget, type);
            document.querySelector(DOMStrings.incomeValue).textContent = formatNumber(data.totalIncome, 'income');
            document.querySelector(DOMStrings.expenseValue).textContent = formatNumber(data.totalExpense, 'expense');
            if (data.percentDifference > 0) {
                document.querySelector(DOMStrings.percentageValue).textContent = data.percentDifference + '%';
            } else {
                document.querySelector(DOMStrings.percentageValue).textContent = '---';
            }
        },
        displayPercentages: function(percentages) {
            var fields;
            fields = document.querySelectorAll(DOMStrings.expensesPercentageLabel);
            nodeListForEach(fields, function(item, index) {
                if (percentages[index] > 0) {
                    item.textContent = percentages[index] + '%';
                } else {
                    item.textContent = '---';
                }
            });
        },
        displayMonth: function() {
            var today, year, month, months;
            today = new Date();
            year = today.getFullYear();
            month = today.getMonth();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ', ' + year;
        },
        changedType: function() {
            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            );
            nodeListForEach(fields, function(item) {
                item.classList.toggle('red-focus');
            });
            document.querySelector(DOMStrings.inputButton).classList.toggle('red');
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
        document.querySelector(DOMStrings.itemsParent).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOMStrings.inputType).addEventListener('change', UICtrl.changedType);
    };
    var ctrlAddItem = function() {
        var input, newItem;
        // 1. Get the field input data.
        input = UICtrl.getInput();
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller.
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. Add the item to the UI and clear fields.
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearFields();
            // 4. Calculate and update budget.
            updateBudget();
            // 5. Calculate and update percentages.
            updatePercentages();
        }
    };
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, id;
        if (event.target.parentNode.classList.contains('item__delete--btn')) {
            // Need to traverse the DOM to the parent node of our target.
            itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
            if (itemID) {
                splitID = itemID.split('-');
                type = splitID[0];
                id = parseInt(splitID[1]);
                budgetCtrl.deleteItem(type, id);
                UICtrl.deleteListItem(itemID);
                updateBudget();
                updatePercentages();
            }
        }
    };
    var updatePercentages = function() {
        var percentages;
        budgetCtrl.calculatePercentages();
        percentages = budgetCtrl.getPercentages();
        UICtrl.displayPercentages(percentages);
    };
    var updateBudget = function() {
        budgetCtrl.calculateBudget();
        var budget = budgetCtrl.getBudget();
        UICtrl.displayBudget(budget);
    };
    return {
        init: function() {
            console.log('Application has started');
            setUpEventListeners();
            UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpense: 0,
                percentDifference: -1,
            });
            UICtrl.displayMonth();
        },
    };
})(budgetController, UIController);

controller.init();
