const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(obj => {
            displayData(obj.data);
            console.log(obj);
        });
}

async function getLessons() {
    const res = await fetch("https://openapi.programming-hero.com/api/words/all");
    const obj = await res.json();
    return obj.data;
}

loadData();

function displayData(data) {
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";
    for (const level of data) {
        const lesson = document.createElement("div");
        lesson.innerHTML = `<div onclick="loadWord(${level.level_no})" ><a id="lesson-${level.level_no}" class=" lesson btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${level.level_no}</a></div>`;
        lessonContainer.appendChild(lesson);
    }

}

document.getElementById("word-card-container").classList.add("hidden");

const loadWord = (level) => {
    url = `https://openapi.programming-hero.com/api/level/${level}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayWordCard(data.data);
        });
}

function displayWordCard(data) {
    document.getElementById("word-card-container").classList.remove("hidden");
    document.getElementById("no-selected-lesson").classList.add("hidden");
    const wordCardContainer = document.getElementById("word-card-container");
    wordCardContainer.innerHTML = "";
    if (data.length === 0) {
        wordCardContainer.innerHTML = `<p class="text-center text-2xl font-bold">No words found for this lesson.</p>`;
    }
    else {
        for (const word of data) {
            const wordCard = document.createElement("div");
            wordCard.innerHTML = `<div class="card w-96 bg-base-100 card-xl shadow-sm p-8 space-y-8">
                    <div class="space-y-2">
                        <p class="font-bold text-xl text-center">${word.word}</p>
                        <p class="text-center">${word.pronunciation}</p>
                        <p class="text-center bangla-font font-bold">${word.meaning}</p>
                    </div>
                    <div class="flex flex-row justify-between items-center">
                        <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn"><i class="fa-solid fa-volume-high"></i></i></button>
                    </div>
                </div>`;
            wordCardContainer.appendChild(wordCard);
        }
    }

}
