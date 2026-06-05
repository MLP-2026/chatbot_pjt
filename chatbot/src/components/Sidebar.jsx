import { useState } from "react";
import { menu, appTitle, appSubtitle, lastUpdated } from "../data";

export default function Sidebar({ activePage, onSelect }) {
  // 처음에 모든 group 을 펼친 상태로 시작
  const [openGroups, setOpenGroups] = useState(() =>
    menu.filter((m) => m.type === "group").map((m) => m.label)
  );

  const toggleGroup = (label) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">
          <i className="ti ti-book-2" aria-hidden="true" />
          {appTitle}
        </div>
        <p>{appSubtitle}</p>
        <p className="sidebar-updated">최근 업데이트 : {lastUpdated}</p>
      </div>

      <nav className="nav" aria-label="목차">
        {menu.map((item) => {
          if (item.type === "solo") {
            return (
              <div className="nav-group" key={item.id}>
                <button
                  className={`nav-solo ${activePage === item.id ? "active" : ""}`}
                  onClick={() => onSelect(item.id)}
                >
                  <i className={`ti ti-${item.icon}`} aria-hidden="true" />
                  {item.label}
                </button>
              </div>
            );
          }

          const isOpen = openGroups.includes(item.label);
          return (
            <div className="nav-group" key={item.label}>
              <button
                className={`nav-parent ${isOpen ? "open" : ""}`}
                onClick={() => toggleGroup(item.label)}
              >
                <i className={`ti ti-${item.icon}`} aria-hidden="true" />
                <span>{item.label}</span>
                <i className="ti ti-chevron-down chev" aria-hidden="true" />
              </button>
              <div className={`nav-children ${isOpen ? "open" : ""}`}>
                {item.children.map((child) => (
                  <button
                    key={child.id}
                    className={`nav-child ${
                      activePage === child.id ? "active" : ""
                    }`}
                    onClick={() => onSelect(child.id)}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
