
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

    //change colour 
    var estimatedBudget = document.getElementById("estimated_budget").value;
    switch (true) {
        case estimatedBudget < 0:
            $(document.getElementById("estimated_budget")).css({ backgroundColor: 'red', color: 'white' });
            break;
        case estimatedBudget > 0 && estimatedBudget <= 1000: //investing threshold?
            $(document.getElementById("estimated_budget")).css({ backgroundColor: 'yellow', color: 'black'});
            break;
        case estimatedBudget > 1000: 
            $(document.getElementById("estimated_budget")).css({ backgroundColor: 'green', color: 'white' });
            break;
        default:
            $(document.getElementById("estimated_budget")).css({ backgroundColor: 'white', color: 'black' });
    }
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
            fieldSpan.append('RM');

            groupContent.append(fieldLabel)
            groupContent.append(fieldInput)
            groupContent.append(fieldSpan);
            groupContainer.append(groupContent);
        }) 

        element.append(groupTitle);
        element.append(groupContainer);
    }

    let actionButton = document.createElement("button");
    actionButton.innerHTML = "Analyze";
    actionButton.setAttribute('class', 'btn btn-primary');
    $(actionButton).css({
        float: 'right',
        marginRight: '10px',
        width: '120px'
    });
    actionButton.onclick = function () { analyzeBudget(); }
    element.append(actionButton);

    let backButton = document.createElement("button");
    backButton.innerHTML = "Back";
    backButton.setAttribute('class', 'btn btn-primary');
    $(backButton).css({
        float: 'right',
        marginRight: '10px',
        width: '120px'
    });
    backButton.onclick = function () { window.location.href = '../'; }
    element.append(backButton);

    $(DOMElement).html(element);
    
    $('.zero').on("input", function() {
        calculate();
    });
}

function analyzeBudget() {
    //get the budget value 
    var budgetToAnalyze = document.getElementById("estimated_budget").value;

    //if budget is 0 or -ve
    if (budgetToAnalyze <= 0) {
        if (window.confirm("Do not save what is left after spending, but spend what is left after saving! Click OK and we'll guide you.")) {
            window.open(
                'https://mypf.my',
                '_blank' 
            );
        };
    }
    //if budget is +ve
    else {
        if (window.confirm("Wonderful you have some budget! Let's see how we can grow it. But first, try out out investor personality test! Click OK.")) {
            window.location.href = '../Questions';
        };
    }
}