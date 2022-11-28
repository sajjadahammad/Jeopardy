const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

const jeopardyCategories = [
    {
        genre:'WHO',
        questions: [
            {
                question:'Who wrote the Harry Potter books?',
                answer:['J.K. Rowling','JRR Tolkien'],
                correct:'J.K. Rowling',
                level:'easy',
            },
            {
                question:'Who is born on krypton?',
                answer:['Superman','Batman'],
                correct:'Superman',
                level:'medium',

            },
            {
                question:'Who designed the first car?',
                answer:['Henry Ford','Thomas Edison'],
                correct:'Henry Ford',
                level:'hard',
            }
        ]
    },
    {
        genre:'WHERE',
        questions: [
            {
                question:'Where is Bucking ham palace?',
                answer:['London','Paris'],
                correct:'London',
                level:'easy',
            },
            {
                question:'Where is colosseum',
                answer:['Rome','Milan'],
                correct:'Rome',
                level:'medium',
            },
            {
                question:'Where is Mount Kilimanjaro?',
                answer:['Tanzania','Kenya'],
                correct:'Tanzania',
                level:'hard',
            }
        ]
    },
    {
        genre:'WHEN',
        questions: [
            {
                question:'When is Chrsitmas?',
                answer:['25th December','1st January'],
                correct:'25th December',
                level:'easy',
            },
            {
                question:'When was JFK shot?',   
                answer:['1963','1964'],
                correct:'1963',
                level:'medium',
            },
            {
                question:'When was WW2?',
                answer:['1939-1945','1940-1946'],
                correct:'1939-1945',
                level:'hard',
            }
        ]
    },
    {
        genre:'WHAT',
        questions: [
            {
                question:'What is the capital of France?',
                answer:['Paris','London'],
                correct:'Paris',
                level:'easy',
            },
            {
                question:'What do Lobsters eat?',
                answer:['Fish','Crabs'],
                correct:'Fish',
                level:'medium',
            },
            {
                question:'What is the largest country in the world?',
                answer:['Russia','China'],
                correct:'Russia',
                level:'hard',
            }
        ]
    },
    {
        genre:'HOW MANY',
        questions: [
            {
                question:'How many players in a football team?',
                answer:['11','22'],
                correct:'11',
                level:'easy',
            },
            {
                question:'How many seconds in a hour?', 
                answer:['3600','360'],
                correct:'3600',
                level:'medium',
            },
            {
                question:'How many people in China?',
                answer:['1.4 billion','1.3 billion'],
                correct:'1.4 billion',
                level:'hard',
            }
        ]

    }
]

let score = 0

function addCategory(category){
    const column = document.createElement('div')
    column.classList.add('genre-column')  

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerHTML = category.genre

    column.appendChild(genreTitle)
    game.append(column) 

    category.questions.forEach(question=>{
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if(question.level == 'easy'){
            card.innerHTML = 100
        }
        if(question.level == 'medium'){
            card.innerHTML = 200
        }
        if(question.level == 'hard'){
            card.innerHTML = 300
        }

        card.setAttribute('data-question',question.question)
        card.setAttribute('data-answer-1',question.answer[0])
        card.setAttribute('data-answer-2',question.answer[1])
        card.setAttribute('data-correct',question.correct)
        card.setAttribute('data-value',card.getInnerHTML())

        card.addEventListener('click',flipCard)
    })

}

jeopardyCategories.forEach(category => addCategory(category))

function flipCard(){
    this.innerHTML = ""
    this.style.fontSize = "16px"
    this.style.lineHeight = "30px"
    const textDisplay = document.createElement('div')
    textDisplay.classList.add('card-text')
    textDisplay.innerHTML=this.getAttribute('data-question')
    const firstButton = document.createElement('button')
    const secondButton = document.createElement('button')
    firstButton.classList.add('first-button')
    secondButton.classList.add('second-button')
    firstButton.innerHTML = this.getAttribute('data-answer-1')
    secondButton.innerHTML = this.getAttribute('data-answer-2')
    firstButton.addEventListener('click',getResult)
    secondButton.addEventListener('click',getResult)

    this.append(textDisplay,firstButton,secondButton)

    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card=>removeEventListener('click',flipCard))

}

function getResult(){
    const allCards =Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click',flipCard))
    const cardofButton = this.parentElement

    if(cardofButton.getAttribute('data-correct') == this.innerHTML){
        score = score + parseInt(cardofButton.getAttribute('data-value'))
        scoreDisplay.innerHTML =score
        cardofButton.classList.add('correct-answer')
        setTimeout(() =>{
            while(cardofButton.firstChild){
                cardofButton.removeChild(cardofButton.lastChild)
            }
            cardofButton.innerHTML = cardofButton.getAttribute('data-value')
        },100)
    } else {
        cardofButton.classList.add('wrong-answer')
        setTimeout(()=>{
            while(cardofButton.firstChild){
                cardofButton.removeChild(cardofButton.lastChild)
            }
            cardofButton.innerHTML = 0
        },100)
    }
    cardofButton.removeEventListener('click',flipCard)
     
}