
let questions = [
    {
        question:"What is the most populated city in North America",
        options:[
            "A. Toronto",
            "B. Mexico City",
            "C. New York City"
        ],
        cIndex:1,
        correct:null
    },
    {
        question:"What is the most popular programming language in the year 2020?",
        options:[
            "A. C",
            "B. Python",
            "C. Javascript"
        ],
        cIndex:2,
        correct:null
    },
    {
        question:"Pick C",
        options:[
            "A",
            "B",
            "C"
        ],
        cIndex:2,
        correct:null
    }
];

let container = document.getElementById("container");
let submit = document.getElementById("submit");
let result = document.getElementById("result");

function renderQuestions(){
    questions.forEach((question, index) => {
        let qContainer = document.createElement("div");
        let oContainer = document.createElement("div");
        qContainer.id = "qContainer";
        oContainer.id = "oContainer";
        for(let o of question.options){
            let oBtn = document.createElement("button");
            if(question.options[question.cIndex] === o){
                oBtn.dataset.correct = 'true';
            }else{
                oBtn.dataset.correct = 'false';
            }
            oBtn.dataset.index = index;

            oBtn.innerHTML = o;
            oBtn.classList.add("option");
            oBtn.addEventListener("click", selectAns);
            oContainer.append(oBtn);
        }
        qContainer.append(document.createTextNode(question.question));
        qContainer.append(oContainer);
        container.append(qContainer);
    })
}

submit.onclick = () => {
    let options = document.getElementsByClassName('option');
    let score = 0;
    for(let option of options) {
        if(option.dataset.correct == 'true'){
            option.classList.add('correct');
        }else{
            option.classList.add('wrong');
        }
        option.disabled = true;
    }

    result.style.display = "block";
    submit.style.display = "none";
    for(let question of questions){
        if(question.correct == 'true'){
            score++;
        }
    }
    result.style.display = "block";
    result.innerHTML = `Your score is ${score}/${questions.length}`;
    if(questions.length === 0){
        result.innerHTML = "Your score is 0. There is no questions and no number cannot be divided by 0";
    }
}

function selectAns(e){
    Array.from(e.target.parentNode.children).forEach((c) => {
        c.classList.add("not-clicked");
        c.classList.remove("clicked")
    })
    e.target.classList.add("clicked");
    e.target.classList.remove("not-clicked");

    questions[e.target.dataset.index].correct = e.target.dataset.correct == 'true' ? 'true' : 'false';
}

renderQuestions();