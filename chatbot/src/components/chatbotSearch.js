import { menu, pages } from "../data";

// menu 를 평탄화해서 "페이지 id → 라벨" 을 만들어 둡니다.
// 챗봇이 검색 결과로 보여줄 이름으로 사용합니다.
function buildPageLabels() {
  const labels = {};
  for (const item of menu) {
    if (item.type === "solo") {
      labels[item.id] = item.label;
    } else if (item.type === "group") {
      for (const child of item.children) {
        labels[child.id] = child.label;
      }
    }
  }
  return labels;
}

const pageLabels = buildPageLabels();

// 한 페이지의 모든 텍스트를 한 덩어리 문자열로 모읍니다.
// (제목, 본문, 블록 안 텍스트, 그리고 직접 지정한 keywords 까지)
function collectText(page) {
  let parts = [];
  if (page.title) parts.push(page.title);
  if (page.tag) parts.push(page.tag);
  if (page.body) parts.push(page.body);
  if (page.subtitle1) parts.push(page.subtitle1);
  if (page.subtitle2) parts.push(page.subtitle2);
  if (Array.isArray(page.keywords)) parts.push(page.keywords.join(" "));

  const pushBlocks = (blocks) => {
    if (!Array.isArray(blocks)) return;
    for (const b of blocks) {
      if (b.text) parts.push(b.text);
      if (b.name) parts.push(b.name);
      if (b.duty) parts.push(b.duty);
      if (Array.isArray(b.items)) {
        for (const it of b.items) {
          if (typeof it === "string") parts.push(it);
          else if (it && (it.q || it.a)) parts.push(`${it.q || ""} ${it.a || ""}`);
        }
      }
    }
  };
  pushBlocks(page.blocks);
  pushBlocks(page.blocks1);
  pushBlocks(page.memo);

  return parts.join(" ").toLowerCase();
}

// 미리 모든 페이지의 검색용 텍스트를 만들어 둡니다.
const searchIndex = Object.keys(pages).map((id) => ({
  id,
  label: pageLabels[id] || pages[id].title || id,
  title: pages[id].title || "",
  text: collectText(pages[id]),
}));

// 질문(query)을 받아 가장 잘 맞는 페이지들을 점수순으로 돌려줍니다.
export function searchPages(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  // 띄어쓰기로 단어를 나눠, 각 단어가 페이지 텍스트에 들어있으면 점수 +1
  // 제목에 들어있으면 가중치 +2 (더 정확한 매칭)
  const words = q.split(/\s+/).filter((w) => w.length > 0);

  const scored = searchIndex.map((page) => {
    let score = 0;
    for (const w of words) {
      if (page.title.toLowerCase().includes(w)) score += 3;
      if (page.text.includes(w)) score += 1;
    }
    return { ...page, score };
  });

  return scored
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // 상위 3개까지만
}
