const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((json) => displayLesson(json.data));
};

const removeActiveClass = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  for (let btn of lessonBtns) {
    btn.classList.remove("btn-active");
  }
};

const loadLevelWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      removeActiveClass();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("btn-active");
      // console.log(clickBtn);
      displayLevelWord(json.data);
    });
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = ` <div class="text-center col-span-full py-10 space-y-5">
        <img class="mx-auto w-25" src="./assets/alert-error.png" alt="" />
        <p class="text-xl font-bangla text-gray-600 font-medium">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-medium font-bangla text-4xl">
        নেক্সট Lesson এ যান অথবা অন্য Lesson Try করুন।
        </h2>
      </div>`;
    return;
  }

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = ` <div class="bg-white text-center  rounded-xl shadow-lg p-7 space-y-4">
        <h2 class="font-bold text-3xl">${
          word.word ? word.word : "কোন শব্দ পাওয়া যায়নি"
        }</h2>
        <p>Meaning /Pronounciation</p>
        <div class="text-3xl font-semibold font-bangla">"${
          word.meaning ? word.meaning : "কোন অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "কোন উচ্চারণ পাওয়া যায়নি"
    }"</div>
        <div class="flex justify-between items-center mt-4">
          <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF]">
            <i class="fa-solid fa-circle-info"></i>
          </button>

          <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>`;
    wordContainer.appendChild(card);
  });
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
    ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`;
    levelContainer.appendChild(btnDiv);
  }
};
loadLessons();
