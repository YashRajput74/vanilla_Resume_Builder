const resumeData = {
    sections: [
        {
            id: "education",
            title: "Education",
            layout: { type: "list", columns: 1 },
            items: [
                {
                    id: "edu1",
                    blocks: [
                        { type: "text", label: "degree", value: "B.Tech in Computer Science" },
                        { type: "text", label: "institute", value: "XYZ Institute of Technology" },
                        { type: "range", label: "duration", start: "2016", end: "2020" },
                        {
                            type: "list",
                            label: "description",
                            items: [
                                { value: "Scored 8.5 CGPA" },
                                { value: "Top 1% of graduating class" }
                            ]
                        }
                    ]
                },
                {
                    id: "edu2",
                    blocks: [
                        { type: "text", label: "degree", value: "Senior Secondary (Science)" },
                        { type: "text", label: "institute", value: "ABC Public School" },
                        { type: "range", label: "duration", start: "2015", end: "2016" },
                        {
                            type: "list",
                            label: "description",
                            items: [
                                { value: "Scored 8.9 CGPA" },
                                { value: "Top 5% of graduating class" }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

// ✅ Step 1: utility to create an element quickly
function createElement(tag, className = "", content = "") {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content) el.textContent = content;
  return el;
}

// ✅ Step 2: render a single block
function renderBlock(block) {
  switch (block.type) {
    case "text": {
      const p = createElement("p", `block-text ${block.label}`);
      p.textContent = block.value;
      return p;
    }

    case "range": {
      const span = createElement("p", "block-range");
      span.textContent = `${block.start} - ${block.end}`;
      return span;
    }

    case "list": {
      const ul = createElement("ul", "block-list");
      block.items.forEach(item => {
        const li = createElement("li", "", item.value);
        ul.appendChild(li);
      });
      return ul;
    }

    default:
      return createElement("div", "block-unknown", "(Unknown Block)");
  }
}

// ✅ Step 3: render an item (like one education entry)
function renderItem(item) {
  const container = createElement("div", "resume-item");
  item.blocks.forEach(block => container.appendChild(renderBlock(block)));
  return container;
}

// ✅ Step 4: render a section
function renderSection(section) {
  const sectionEl = createElement("section", "resume-section");
  const titleEl = createElement("h2", "section-title", section.title);
  sectionEl.appendChild(titleEl);

  const contentEl = createElement("div", "section-content");
  section.items.forEach(item => contentEl.appendChild(renderItem(item)));
  sectionEl.appendChild(contentEl);

  return sectionEl;
}

// ✅ Step 5: render entire resume
function renderResume(data) {
  const root = document.getElementById("resume-root");
  root.innerHTML = "";
  data.sections.forEach(section => {
    root.appendChild(renderSection(section));
  });
}

// ✅ finally call render
renderResume(resumeData);
