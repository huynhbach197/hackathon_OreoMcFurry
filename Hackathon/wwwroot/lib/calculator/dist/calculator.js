function calculate() {
    var salary = document.getElementById("salary").value;
    var others_income = document.getElementById("others_income").value;
    document.getElementById("total_income").value = parseInt(salary) + parseInt(others_income);

    var investment = document.getElementById("investment").value;
    var fixed_deposit = document.getElementById("fixed_deposit").value;
    var others_saving = document.getElementById("others_saving").value;
    document.getElementById("total_saving").value = parseInt(investment) + parseInt(fixed_deposit) + parseInt(others_saving);

    var food = document.getElementById("food").value;
    var accomodation = document.getElementById("accomodation").value;
    var transport = document.getElementById("transport").value;
    var entertainments = document.getElementById("entertainments").value;
    var loan_insurance = document.getElementById("loan_insurance").value;
    var others_expenses = document.getElementById("others_expenses").value;
    document.getElementById("total_expenses").value = parseInt(food) + parseInt(accomodation) + parseInt(transport) + parseInt(entertainments) + parseInt(loan_insurance) + parseInt(others_expenses);

    var total_income = document.getElementById("total_income").value;
    var total_saving = document.getElementById("total_saving").value;
    var total_expenses = document.getElementById("total_expenses").value;
    document.getElementById("estimated_budget").value = parseInt(total_income) - parseInt(total_saving) - parseInt(total_expenses);
}

function loadOreoCalculator(DOMElement) {
    const budgetFields = {
        'Monthly Income': [
            { id: 'salary', label: 'Salary' },
            { id: 'others_income', label: 'Others' },
        ],
        'Monthly Savings': [
            { id: 'investment', label: 'Investments' },
            { id: 'fixed_deposit', label: 'Fixed Deposit' },
            { id: 'others_saving', label: 'Others' },
        ],
        'Monthly Expenses': [
            { id: 'food', label: 'Food' },
            { id: 'accomodation', label: 'Rent/Accommodation' },
            { id: 'transport', label: 'Transportation' },
            { id: 'entertainments', label: 'Entertainments' },
            { id: 'loan_insurance', label: 'Loan & Insurance' },
            { id: 'others_expenses', label: 'Others' },
        ],
        'Budget review (Monthly)': [
            { id: 'total_income', label: 'Total Income', readonly: true },
            { id: 'total_saving', label: 'Total Savings', readonly: true },
            { id: 'total_expenses', label: 'Total Expenses', readonly: true },
        ],
        'Estimated Budget': [
            { id: 'estimated_budget', label: 'Estimated Budget', readonly: true },
        ],
    };

    let element = document.createElement("div");
    for (field in budgetFields) {
        let groupTitle = document.createElement("p");
        $(groupTitle).css({ fontWeight: 'bold' });
        groupTitle.append(field);

        let groupContainer = document.createElement("div");
        groupContainer.setAttribute('class', 'calcFieldset');

        budgetFields[field].forEach(element => {
            let groupContent = document.createElement("div");
            groupContent.setAttribute('class', 'calcField');

            let fieldLabel = document.createElement("label");
            fieldLabel.setAttribute('for', element.id);
            fieldLabel.append(element.label);

            let fieldInput = document.createElement("input");
            fieldInput.setAttribute('id', element.id);
            fieldInput.setAttribute('class', 'zero');
            fieldInput.setAttribute('type', 'number');
            fieldInput.setAttribute('value', 0);
            if (element.readonly) { fieldInput.setAttribute('readonly', element.readonly) }
            $(fieldInput).css({ float: 'right' });
            fieldInput.append(element.label);

            let fieldSpan = document.createElement("span");
            fieldSpan.setAttribute('class', 'desc');
            $(fieldSpan).css({ float: 'right', marginRight: 5 });
            fieldSpan.append(element.label);

            groupContent.append(fieldLabel)
            groupContent.append(fieldInput)
            groupContent.append(fieldSpan);
            groupContainer.append(groupContent);
        }) 

        element.append(groupTitle);
        element.append(groupContainer);
    }

    $(DOMElement).html(element);
    
    $('.zero').on("input", function() {
        calculate();
    });
}