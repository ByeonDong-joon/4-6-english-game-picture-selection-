// ===============================================================
// script2.js
// 타이머 기능 제거 버전: 20개 PNG 무작위 배치 → 선택/해제 → “확인” → 점수 증가
// ===============================================================

// 1. 20개 PNG 파일 이름(확장자 포함) 배열
const items = [
  "bag_on_box.png",
  "bag_on_desk.png",
  "bag_under_bed.png",
  "ball_in_desk.png",
  "ball_on_box.png",
  "book_in_box.png",
  "book_on_desk.png",
  "book_under_desk.png",
  "cap_on_desk.png",
  "cap_under_chair.png",
  "doll_in_desk.png",
  "doll_on_table.png",
  "doll_under_table.png",
  "fan_in_box.png",
  "fan_under_bed.png",
  "pen_in_box.png",
  "pen_on_chair.png",
  "pen_under_desk.png",
  "tape_on_desk.png",
  "tape_under_table.png"
];

// ===============================================================
// 전역 상태 변수
// ===============================================================
let score = 0; // 현재 점수

// ===============================================================
// 유틸 함수: 배열을 Fisher–Yates 방식으로 셔플
// ===============================================================
function shuffle(array) {
  const arr = array.slice(); // 원본 복사
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ===============================================================
// “확인” 버튼 활성/비활성화 상태 업데이트
// - 선택된 이미지가 하나라도 있으면 활성화
// ===============================================================
function updateConfirmButtonState() {
  const confirmBtn = document.getElementById("confirmBtn");
  const anySelected = document.querySelector(".selectable.selected") !== null;
  confirmBtn.disabled = !anySelected;
}

// ===============================================================
// 이미지 영역에 20개 이미지를 무작위 배치
// - 클릭 시 “selected” 클래스 토글
// - .selected 유무에 따라 “확인” 버튼 활성화
// ===============================================================
function populateImages() {
  const imageArea = document.getElementById("imageArea");
  imageArea.innerHTML = ""; // 기존 이미지 모두 지우기

  // items 배열을 셔플해서 랜덤 순서로 가져옴
  const shuffled = shuffle(items);

  shuffled.forEach((filename) => {
    const img = document.createElement("img");
    img.src = filename;
    img.alt = filename;
    img.classList.add("selectable");

    img.addEventListener("click", () => {
      img.classList.toggle("selected");
      updateConfirmButtonState();
    });

    imageArea.appendChild(img);
  });

  // 배치 직후에는 “확인” 버튼 비활성화
  document.getElementById("confirmBtn").disabled = true;
}

// ===============================================================
// “확인” 버튼 클릭 시 실행
// - 선택된 이미지가 없으면 무시
// - 점수 1 증가 → 화면 갱신
// - 이미지 재배치 → 선택 초기화
// ===============================================================
function onConfirmClick() {
  const selectedCount = document.querySelectorAll("#imageArea img.selectable.selected").length;
  if (selectedCount === 0) return; // 선택 없으면 무시

  // 1) 점수 증가
  score += 1;
  document.getElementById("score").innerText = score;

  // 2) 이미지 재배치
  populateImages();
}

// ===============================================================
// DOMContentLoaded 시 초기화
// ===============================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1) 초기 이미지 배치
  populateImages();

  // 2) “확인” 버튼 클릭 리스너 달기
  const confirmBtn = document.getElementById("confirmBtn");
  confirmBtn.addEventListener("click", onConfirmClick);

  // 3) 점수 초기값 표시
  document.getElementById("score").innerText = score;
});
