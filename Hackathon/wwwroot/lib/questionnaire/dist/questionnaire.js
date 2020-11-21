let totalPoints;
const questionnaires = [
    {
        id: 0,
        question: 'Do you hold a qualification in financial/ business related fields?',
        answers: [
            { label: 'Yes', points: 2 },
            { label: 'No', points: 1 },
            { label: 'Not sure', points: 0 },
        ]
    },
    {
        id: 1,
        question: 'What is the maximum % of the total capital you placed in the equity market you can afford to lose in the next 12 months?',
        answers: [
            { label: '20%', points: 2 },
            { label: '20 - 30%', points: 1 },
            { label: '30%', points: 0 },
        ]
    },
    {
        id: 2,
        question: 'Do you aim for achieving substantial income generation and/or capital growth on your investments, by taking significantly high levels of investment risk of around 20-30% of your investment?',
        answers: [
            { label: 'Yes', points: 2 },
            { label: 'No', points: 1 },
            { label: 'Not sure', points: 0 },
        ]
    },
    {
        id: 3,
        question: 'Do you believe in the concept of leverage or do you prefer prefer to limit your amount of debt?',
        answers: [
            { label: 'Believe in leverage', points: 2 },
            { label: 'Limit debt', points: 1 },
            { label: 'Not sure', points: 0 },
        ]
    },
    {
        id: 4,
        question: 'In your work or personal life, are you generally a self-starter in that you seek to out what needs to be done and then do it, or do you prefer to take direction from some-one else?',
        answers: [
            { label: 'Self Starter', points: 2 },
            { label: 'Take Directions', points: 1 },
            { label: 'Not sure', points: 0 },
        ]
    },
]
const personalities = {
    explorer: {
        icon: './assets/images/student.gif',
        label: 'Explorer',
        description: 'Open-minded, Flexible in own actions and decisions, Easily convinced and trust market news, Tend to be passive and easily influenced by others to invest.',
    },
    trader: {
        icon: './assets/images/trader.gif',
        label: 'Trader',
        description: 'Skilled, Technical individuals who time and learn market trends to hit higher profits in stipulated time, Tend to go for higher risk and higher potential returns.',
    },
    investor: {
        icon: './assets/images/investor.gif',
        label: 'Investor',
        description: 'Primarily Cognitive, Good Self-Control, Patience, Tend to look for long term returns not only by price movement but also compounding interest and dividend over years, Focus on business fundamentals and commitment.',
    },
};

function getInvestorType() {
    if (totalPoints > 7) { return 'investor'; }
    if (totalPoints > 3) { return 'trader'; }
    return 'explorer';
}

function showPersonalityResult() {
    $('.questionnaire_container').hide();
    let investorType = getInvestorType();

    console.log(investorType);
    
    let result = document.createElement('div');
    result.setAttribute('class', 'questionnaire_result');

    let icon = document.createElement('img');
    icon.setAttribute('src', personalities[investorType].icon);

    let label = document.createElement('h4');
    label.append(personalities[investorType].label);

    let description = document.createElement('div');
    description.setAttribute('class', 'personality_description');
    description.append(personalities[investorType].description);

    let seeMore = document.createElement('a');
    seeMore.setAttribute('class', 'questionnaire_seeMore');
    seeMore.setAttribute('href', 'Personalities');
    seeMore.append('Click here to know more about the other personalities');

    result.append(icon);
    result.append(label);
    result.append(description);
    result.append(seeMore);

    $('.questionnaire_container').append(result);
    $('.questionnaire_container').show(300);
}

function onQuestionInput(index, points) {
    totalPoints += points;
    if (index < questionnaires.length - 1) {
        // animation fade
        $questions = $('.questionnaire_content');
        $($questions.get(index)).hide();
        $($questions.get(index + 1)).show();
    } else {
        console.log(totalPoints);
        $($questions.get(index)).hide();
        showPersonalityResult();
    }
}

function startQuestionnaire() {
    totalPoints = 0;
    $questions = $('.questionnaire_content');
    $questions.hide();

    $startBtn = $('.questionnaire_btn');
    $startBtn.on('click', () => {
        $('.questionnaire_introduction').hide();
        $($questions.get(0)).show(300);
    })
}

function loadIntroduction(container) {
    let introduction = document.createElement('div');
    introduction.setAttribute('class', 'questionnaire_introduction');

    let title = document.createElement('div');
    title.setAttribute('class', 'title');
    title.append('Investor Personality Test');

    let subtitle = document.createElement('div');
    subtitle.setAttribute('class', 'subtitle');
    subtitle.append('Click on Start to find out your investing personality');

    let startButton = document.createElement('div');
    startButton.setAttribute('class', 'questionnaire_btn');
    startButton.append('Start Exploring');

    introduction.append(title);
    introduction.append(subtitle);
    introduction.append(startButton);

    container.append(introduction);
}

function loadQuestionnaire(DOMelement) {
    let container = document.createElement('div');
    container.setAttribute('class', 'questionnaire_container');

    loadIntroduction(container);

    questionnaires.forEach((q, qIndex) => {
        let contentContainer = document.createElement('form');
        contentContainer.setAttribute('class', 'questionnaire_content');

        let question = document.createElement('div');
        question.setAttribute('class', 'question');
        question.append((qIndex + 1).toString() + '. ' + q.question);
        contentContainer.append(question);
        
        q.answers.forEach(a => {
            let choiceContainer = document.createElement("div");
            choiceContainer.setAttribute('class', 'form-check');

            let radio = document.createElement("input");
            radio.setAttribute('name', q.id);
            radio.setAttribute('id', q.id.toString() + '_' + a.label);
            radio.setAttribute('class', 'form-check-input');
            radio.setAttribute('value', a.points);
            radio.setAttribute('type', 'radio');
            $(radio).change(function() {
                onQuestionInput(qIndex, a.points);
            });

            let radioText = document.createElement("label");
            radioText.setAttribute('class', 'form-check-label answer');
            radioText.setAttribute('for', q.id.toString() + '_' + a.label);
            radioText.append(a.label);

            choiceContainer.append(radio);
            choiceContainer.append(radioText);
            contentContainer.append(choiceContainer);
        })
        container.append(contentContainer);
    })

    DOMelement.append(container);

    // append questionnaire only one at a time
    startQuestionnaire();
}