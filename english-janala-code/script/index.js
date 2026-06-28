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
        lesson.innerHTML = `<div ><a id="lesson-${level.level_no}" class=" lesson btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${level.level_no}</a></div>`;
        lessonContainer.appendChild(lesson);
    }

}

// const displayLesson = (data) => {
//     const lessonContainer = document.getElementById("word-card-container");
//     lessonContainer.innerHTML = "";
//     for (const lesson of data) {
//         const lessonCard = document.createElement("div");
//         lessonCard.innerHTML = `<div class="card w-96 bg-base-100 card-xl shadow-sm p-8 space-y-8">
//                     <div class="space-y-2">
//                         <p class="font-bold text-xl text-center">Eager</p>
//                         <p class="text-center">Meaning/Pronounciation</p>
//                         <p class="text-center bangla-font font-bold">"আগ্রহী / ইগার"</p>
//                     </div>
//                     <div class="flex flex-row justify-between items-center">
//                         <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
//                         <button class="btn"><i class="fa-solid fa-volume-high"></i></i></button>
//                     </div>
//                 </div>`;
//         lessonContainer.appendChild(lessonCard);

//     }
// }
document.addEventListener("click", function (event) {
    const target = event.target;
    // const target= target.closest(".lesson");
    // console.log(target);
    if (target.classList.contains("lesson")) {
        const levelNo = target.id.split("-")[1];
        getLessons().then((lessons) => {
            // console.log(lessons);
            // displayLesson(lessons);
            const wordCardContainer = document.getElementById("word-card-container");
            wordCardContainer.innerHTML = "";
            for (const lesson of lessons) {

                if (lesson.level == levelNo) {

                    const wordCard = document.createElement("div");
                    wordCard.innerHTML = `<div class="card w-96 bg-base-100 card-xl shadow-sm p-8 space-y-8">
                    <div class="space-y-2">
                        <p class="font-bold text-xl text-center">${lesson.word}</p>
                        <p class="text-center">${lesson.pronunciation}</p>
                        <p class="text-center bangla-font font-bold">${lesson.meaning}</p>
                    </div>
                    <div class="flex flex-row justify-between items-center">
                        <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn"><i class="fa-solid fa-volume-high"></i></i></button>
                    </div>
                </div>`;
                    wordCardContainer.appendChild(wordCard);

                }
            }
        });

    }
})


