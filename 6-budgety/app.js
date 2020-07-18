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

})();

var UIController = (function() {

})();

var controller = (function(budgetCtrl, UiCtrl) {

    var ctrlAddItem = function() {
        // 1. Get the field input data.

        // 2. Add the item to the budget controller.

        // 3. Add the item to the UI.

        // 4. Calculate the budget.

        // 5. Display the budget in the UI.
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
        // ENTER KEY = 13.
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);
