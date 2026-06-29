import { useState } from "react";
import { pages } from "../data";

// FAQ 한 항목 (클릭하면 펼쳐지는 아코디언)
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-acc">
      <button
        className={`faq-acc-q ${open ? "open" : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          <span className="faq-q-mark">Q.</span>
          {q}
        </span>
        <i className="ti ti-chevron-down" aria-hidden="true" />
      </button>
      <div className={`faq-acc-a-wrap ${open ? "open" : ""}`}>
        <div className="faq-acc-a-inner">
          <div className="faq-acc-a">{a}</div>
        </div>
      </div>
    </div>
  );
}

function Block({ block }) {
  switch (block.kind) {
    case "steps":
      return (
        <div className="step-list">
          {block.items.map((text, i) => (
            <div className="step" key={i}>
              <div className="step-num">{i + 1}</div>
              <div className="step-text">{text}</div>
            </div>
          ))}
        </div>
      );

    case "warns":
      return (
        <div className="step-list">
          {block.items.map((text, i) => (
            <div className="step" key={i}>
              <div className="step-num warn">!</div>
              <div className="step-text">{text}</div>
            </div>
          ))}
        </div>
      );

    case "chips":
      return (
        <div className="chip-row">
          {block.items.map((text, i) => (
            <span className="chip" key={i}>
              {text}
            </span>
          ))}
        </div>
      );

    case "heading":
      return <h2 className="content-heading">{block.text}</h2>;

    case "list":
      return (
        <div className="hlist">
          {block.items.map((text, i) => (
            <div className="hlist-item" key={i}>
              <span className="hlist-dash">–</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      );

    case "info":
      return <div className="info-card">{block.text}</div>;

    case "memo":
      return <div className="memo-box">{block.text}</div>;

    case "flow":
      // 위에서 아래로 이어지는 절차 흐름도
      // items: [{ icon, name, desc }]
      return (
        <div className="flow">
          {block.items.map((step, i) => (
            <div className="flow-step" key={i}>
              <div className="flow-rail">
                <div className="flow-icon">
                  <i className={`ti ti-${step.icon || "circle"}`} aria-hidden="true" />
                </div>
                {i < block.items.length - 1 && <div className="flow-line" />}
              </div>
              <div className="flow-main">
                <div className="flow-name">
                  {i + 1}. {step.name}
                </div>
                {step.desc && <div className="flow-desc">{step.desc}</div>}
              </div>
            </div>
          ))}
        </div>
      );

    case "cards":
      // 아이콘 + 제목 + 회색 설명 박스 카드들
      // items: [{ icon, title, text }]
      return (
        <div className="icards">
          {block.items.map((card, i) => (
            <div className="icard" key={i}>
              <div className="icard-head">
                <i
                  className={`ti ti-${card.icon || "square"} icard-icon`}
                  aria-hidden="true"
                />
                <span className="icard-title">{card.title}</span>
              </div>
              {card.text && <div className="icard-body">{card.text}</div>}
            </div>
          ))}
        </div>
      );

    case "org":
      return (
        <div className="org-card">
          <div className="org-head">
            <div className="org-name">
              <i className="ti ti-building" aria-hidden="true" />
              {block.name}
            </div>
            {block.contact && (
              <span className="org-contact">
                <i className="ti ti-phone" aria-hidden="true" />
                {block.contact}
              </span>
            )}
          </div>
          {block.duty && (
            <>
              <div className="org-duty-label">주요 수행업무</div>
              <div className="org-duty">{block.duty}</div>
            </>
          )}
        </div>
      );

    case "video": {
      // 유튜브 주소에서 영상 ID만 뽑아냅니다.
      // 아래 형태 모두 지원:
      //   https://youtu.be/ekHZf2NIcps?si=...
      //   https://www.youtube.com/watch?v=ekHZf2NIcps
      //   https://www.youtube.com/embed/ekHZf2NIcps
      const getYoutubeId = (url) => {
        if (!url) return "";
        const m = url.match(
          /(?:youtu\.be\/|watch\?v=|embed\/)([a-zA-Z0-9_-]{11})/
        );
        return m ? m[1] : "";
      };
      const id = getYoutubeId(block.url);
      if (!id) return null;
      return (
        <div className="video-block">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={block.title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {block.caption && <p className="video-caption">{block.caption}</p>}
        </div>
      );
    }

    case "faqs":
      return (
        <div>
          {block.items.map((item, i) => (
            <FaqItem q={item.q} a={item.a} key={i} />
          ))}
        </div>
      );

    default:
      return null;
  }
}

export default function Content({ pageId }) {
  const page = pages[pageId];
  if (!page) return null;

  return (
    <main className="content">
      <div className="content-tag">{page.tag}</div>
      <h1 className="content-title">{page.title}</h1>
      {page.body && <div className="content-body">{page.body}</div>}
      {page.blocks &&
        page.blocks.map((block, i) => <Block block={block} key={i} />)}
    </main>
  );
}
