// fetch all lesson buttons
const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(obj => {
            displayData(obj.data);
            console.log(obj);
        });
}


// async function getLessons() {
//     const res = await fetch("https://openapi.programming-hero.com/api/words/all");
//     const obj = await res.json();
//     return obj.data;
// }

loadData();

// For lesson Buttons
function displayData(data) {
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";
    for (const level of data) {
        const lesson = document.createElement("div");
        lesson.innerHTML = `<button id="lesson-btn-${level.level_no}" onclick="loadWord(${level.level_no})" class="btn btn-outline btn-primary lesson-btn" ><i class="fa-solid fa-book-open"></i>Lesson-${level.level_no}</button>`;
        lessonContainer.appendChild(lesson);
    }

}

// Active button view 
function removeActiveClass() {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => {
        btn.classList.remove("active");
    });

}



// Load words by level
const loadWord = (level) => {
    activateLoading(true);
    document.getElementById("no-selected-lesson").classList.add("hidden");
    url = `https://openapi.programming-hero.com/api/level/${level}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const lessonButton = document.getElementById(`lesson-btn-${level}`);
            removeActiveClass();
            lessonButton.classList.add("active");
            displayWordCard(data.data);

        });
}




// For fetching word details
const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayWordDetails(data.data);
}

// {
// "status": true,
// "message": "successfully fetched a word details",
// "data": {
// "word": "Sincere",
// "meaning": "সত্‍ / আন্তরিক",
// "pronunciation": "সিনসিয়ার",
// "level": 1,
// "sentence": "He gave a sincere apology.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "honest",
// "genuine",
// "truthful"
// ],
// "id": 19
// }
// }

const activateLoading = (track) => {
    if (track === true) {
        document.getElementById("loading").classList.remove("hidden");
        document.getElementById("word-card-container").classList.add("hidden");
    }
    else {
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("word-card-container").classList.remove("hidden");
    }

}

const createSynonymButtons = (synonyms) => {
    const htmlElements = synonyms.map(synonym => `<button class="btn btn-sm">${synonym}</button>`);
    return htmlElements.join(" ");
}
const displayWordDetails = (data) => {
    my_modal_5.showModal();
    document.getElementById("word-details-container").innerHTML = `
     <h3 class="text-lg font-bold">${data.word ? data.word : "Word not found"}(<i
                            class="fa-solid fa-microphone-lines"></i>${data.pronunciation}) </h3>
                    <p class="bangla-font font-bold">Meaning</p>
                    <p>${data.meaning ? data.meaning : "Meaning not found"}</p>
                    <p class="bangla-font font-bold">Example</p>
                    <p>${data.sentence ? data.sentence : "Sentence not found"}</p>
                    <p class="bangla-font font-bold">সমার্থক শব্দ গুলো</p>
                    <div>
                        ${createSynonymButtons(data.synonyms)}
                    </div>`;
}

// Word Pronunciation Functionality
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

document.getElementById("word-card-container").classList.add("hidden");
// display word card
function displayWordCard(data) {
    const wordCardContainer = document.getElementById("word-card-container");
    wordCardContainer.innerHTML = "";
    if (data.length === 0) {
        wordCardContainer.innerHTML = `<p class="text-center text-2xl font-bold">No words found for this lesson.</p>`;
        activateLoading(false);
        document.getElementById("word-card-container").classList.remove("hidden");
    }
    else {
        for (const word of data) {
            // console.log(word);
            const wordCard = document.createElement("div");
            wordCard.innerHTML = `<div class="card w-96 bg-base-100 card-xl shadow-sm p-8 space-y-8">
                    <div class="space-y-2">
                        <p class="font-bold text-xl text-center">${word.word ? word.word : "Word not found"}</p>
                        <p class="text-center">${word.pronunciation ? word.pronunciation : "Pronunciation not found"}</p>
                        <p class="text-center bangla-font font-bold">${word.meaning ? word.meaning : "Meaning not found"}</p>
                    </div>
                    <div class="flex flex-row justify-between items-center">
                        <button onclick="loadWordDetails(${word.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
                        <button onclick="pronounceWord('${word.word}')" class="btn"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>`;
            wordCardContainer.appendChild(wordCard);
            activateLoading(false);
            document.getElementById("word-card-container").classList.remove("hidden");
        }
    }

}


document.getElementById("search-item").addEventListener("click", function (event) {
    removeActiveClass();
});

// Search Functionality
document.getElementById("search-btn").addEventListener("click", function () {
    removeActiveClass()
    const searchItem = document.getElementById("search-item").value.trim().toLowerCase();
    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(obj => {
            const data = obj.data;
            const filteredData = data.filter(word => word.word.toLowerCase().includes(searchItem));
            displayWordCard(filteredData);
        });
});




// my_modal_5.showModal()
