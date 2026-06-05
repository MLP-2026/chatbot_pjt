import { pages } from "../data";

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

    case "info":
      return <div className="info-card">{block.text}</div>;

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
              {/* <div className="org-duty-label">주요 수행업무</div> */}
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
            <div className="faq-item" key={i}>
              <div className="faq-q">Q. {item.q}</div>
              <div className="faq-a">{item.a}</div>
            </div>
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
