import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Chatbot from "./components/Chatbot";
import { menu } from "./data";
import "./App.css";

// 첫 화면에 보여줄 기본 페이지 id 를 정합니다.
// menu 의 첫 group 의 첫 child 를 자동으로 선택합니다.
function getFirstPageId() {
  for (const item of menu) {
    if (item.type === "solo") return item.id;
    if (item.type === "group" && item.children.length) return item.children[0].id;
  }
  return null;
}

export default function App() {
  const [activePage, setActivePage] = useState(getFirstPageId());

  return (
    <div className="app">
      <div className="wrap">
        <Sidebar activePage={activePage} onSelect={setActivePage} />
        <Content pageId={activePage} />
      </div>
      {/* 화면 오른쪽 아래 떠있는 챗봇 */}
      <Chatbot onSelect={setActivePage} />
    </div>
  );
}
