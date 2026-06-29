// ============================================================
//  데이터 통합 파일
//  각 섹션의 내용은 section1.js ~ section4.js 에서 관리하고,
//  이 파일은 그것들을 하나로 합쳐주는 역할만 합니다.
//
//  ★ 섹션 내용을 바꾸려면 → src/data/sectionN.js 를 여세요
//  ★ 제목/부제목/업데이트 날짜를 바꾸려면 → 아래에서 수정하세요
// ============================================================

import { section1Menu, section1Pages } from "./section1";
import { section2Menu, section2Pages } from "./section2";
import { section3Menu, section3Pages } from "./section3";
import { section4Menu, section4Pages } from "./section4";

// ---- 사이드바 상단 표시 정보 ----
export const appTitle = "직업능력개발훈련";
export const appSubtitle = "원격훈련과정-MULTICAMPUS";
// 최근 업데이트 날짜 (yyyy-mm-dd)
export const lastUpdated = "2026-06-29"; 


// ---- 메뉴 통합 (사이드바에 표시되는 순서대로) ----
export const menu = [
  section1Menu,
  section2Menu,
  section3Menu,
  section4Menu,
];

// ---- 페이지 내용 통합 ----
export const pages = {
  ...section1Pages,
  ...section2Pages,
  ...section3Pages,
  ...section4Pages,
};
