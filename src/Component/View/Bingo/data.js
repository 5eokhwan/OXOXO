//로컬스토리지 bingos key 추가
if (!localStorage.getItem("bingos")) {
  localStorage.setItem("bingos", JSON.stringify([]));
}
const data = JSON.parse(localStorage.getItem("bingos"));

export const bingos = data;
