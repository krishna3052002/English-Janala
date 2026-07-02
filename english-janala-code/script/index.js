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
        lesson.innerHTML = `<button id="lesson-btn-${level.level_no}" onclick="loadWord(${level.level_no})" class="btn btn-outline btn-primary lesson-btn" ><i class="fa-solid fa-book-open"></i>Lesson-${level.level_no}</button>`;
        lessonContainer.appendChild(lesson);
    }

}

function removeActiveClass() {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => {
        btn.classList.remove("active");
    });
    lessonButtons.forEach(btn => {
        btn.classList.remove("active");
    })
}

document.getElementById("word-card-container").classList.add("hidden");

const loadWord = (level) => {
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
                        <p class="font-bold text-xl text-center">${word.word ? word.word : "Word not found"}</p>
                        <p class="text-center">${word.pronunciation ? word.pronunciation : "Pronunciation not found"}</p>
                        <p class="text-center bangla-font font-bold">${word.meaning ? word.meaning : "Meaning not found"}</p>
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
