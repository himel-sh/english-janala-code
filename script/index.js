const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  const spinner = document.getElementById("spinner");
  const wordContainer = document.getElementById("word-container");
  if (status === true) {
    spinner.classList.remove("hidden");
    wordContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    wordContainer.classList.remove("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((json) => displayLesson(json.data));
};

const removeActiveClass = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  // for (let btn of lessonBtns) {
  //   btn.classList.remove("btn-active");
  // }
  lessonBtns.forEach((btn) => btn.classList.remove("btn-active"));
};

const loadLevelWords = (id) => {
  manageSpinner(true);
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

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `<div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })
            </h2>
          </div>
          <div class="">
            <h2 class="text-xl font-semibold">Meaning</h2>
            <p class="font-bangla">${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="text-xl font-semibold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="text-xl font-semibold">সমার্থক শব্দ গুলো</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>`;
  document.getElementById("word_modal").showModal();
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
    manageSpinner(false);
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
          <button onclick="loadWordDetail(${
            word.id
          })" class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF]">
            <i class="fa-solid fa-circle-info"></i>
          </button>

          <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>`;
    wordContainer.appendChild(card);
  });
  manageSpinner(false);
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

document.getElementById("btn-search").addEventListener("click", () => {
  removeActiveClass();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  // searchVocabulary(query);
  console.log(searchValue);
  fetch(`https://openapi.programming-hero.com/api/words/all`)
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      console.log(allWords);
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      displayLevelWord(filterWords);
    });
});
