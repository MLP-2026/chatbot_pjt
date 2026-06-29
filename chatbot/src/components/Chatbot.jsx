import { useState, useRef, useEffect } from "react";
import { searchPages } from "./chatbotSearch";

export default function Chatbot({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "안녕하세요! 궁금한 내용을 입력해 주세요.",
      examples: ["비용 신청", "원격훈련 종류", "수료 기준"],
    },
  ]);
  const bodyRef = useRef(null);

  // 메시지가 늘어나면 항상 맨 아래로 스크롤
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = (text) => {
    const q = (text ?? input).trim();
    if (!q) return;

    // 1) 사용자 메시지 추가
    const next = [...messages, { from: "user", text: q }];

    // 2) 검색 후 봇 응답 생성
    const results = searchPages(q);
    if (results.length === 0) {
      next.push({
        from: "bot",
        text: "관련 내용을 찾지 못했어요. 다른 단어로 다시 물어봐 주세요. (예: 비용, 원격훈련, 수료, 수행기관)",
      });
    } else {
      next.push({
        from: "bot",
        text: "아래 페이지에서 확인하실 수 있어요.",
        results, // 클릭 가능한 링크들
      });
    }

    setMessages(next);
    setInput("");
  };

  const goPage = (id) => {
    onSelect(id); // 해당 페이지로 이동
    setOpen(false); // 채팅창 닫기
  };

  return (
    <>
      {/* 떠있는 토글 버튼 */}
      <button
        className="cb-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "챗봇 닫기" : "챗봇 열기"}
      >
        <i className={`ti ti-${open ? "x" : "message-circle"}`} aria-hidden="true" />
      </button>

      {/* 채팅 패널 */}
      {open && (
        <div className="cb-panel">
          <div className="cb-header">
            <i className="ti ti-message-circle" aria-hidden="true" />
            무엇이든 물어보세요
          </div>

          <div className="cb-body" ref={bodyRef}>
            {messages.map((m, i) =>
              m.from === "user" ? (
                <div className="cb-user" key={i}>
                  <div className="cb-user-bubble">{m.text}</div>
                </div>
              ) : (
                <div className="cb-bot" key={i}>
                  <div className="cb-ava">봇</div>
                  <div className="cb-bubble">
                    {m.text}
                    {/* 예시 버튼들 */}
                    {m.examples && (
                      <div className="cb-examples">
                        {m.examples.map((ex, j) => (
                          <button
                            key={j}
                            className="cb-chip"
                            onClick={() => handleSend(ex)}
                          >
                            {ex}
                          </button>
                        ))}
                      </div>
                    )}
                    {/* 검색 결과 링크들 */}
                    {m.results &&
                      m.results.map((r, j) => (
                        <button
                          key={j}
                          className="cb-link"
                          onClick={() => goPage(r.id)}
                        >
                          → {r.label} 바로가기
                        </button>
                      ))}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="cb-input">
            <input
              value={input}
              placeholder="질문을 입력하세요"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button onClick={() => handleSend()} aria-label="전송">
              <i className="ti ti-arrow-up" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
