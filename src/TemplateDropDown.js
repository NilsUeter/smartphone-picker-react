import React, { useRef } from "react";

function TemplateDropDown({ summary, details }) {
  const detailsRef = useRef();

  return (
    <details ref={detailsRef}>
      <summary className="filter__summary">{summary}</summary>
      <div className="filter-drop-down">
        {details.map(detail => {
          return (
            <div className="filter-drop-down__element" key={detail.href}>
              <a
                className="filter-drop-down__link"
                onClick={e => {
                  // close current details
                  detailsRef.current.removeAttribute("open");
                  // change url without reload
                  window.history.pushState(
                    null,
                    detail.desc,
                    detail.href + window.location.search
                  );
                  // trigger popstate because pushState doesn't
                  window.dispatchEvent(
                    new PopStateEvent("popstate", { state: null })
                  );
                  e.preventDefault();
                }}
                href={detail.href}
              >
                {detail.icon}
                <span className="filter-drop-down__span">{detail.desc}</span>
              </a>
            </div>
          );
        })}
      </div>
    </details>
  );
}

export default TemplateDropDown;
