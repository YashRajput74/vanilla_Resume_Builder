// resumeBuilder.js
// ==========================
// RESUME DATA
// ==========================
const educationData = [
    {
        id: "edu1",
        school: "XYZ Institute of Technology",
        degree: "B.Tech in Computer Science",
        city: "Delhi",
        startDate: "2016",
        endDate: "2020",
        // supports either strings or tag-based objects { tag, text, style? }
        achievements: [
            { tag: "li", text: "Scored 8.5 CGPA" },
            { tag: "li", text: "Top 1% of graduating class" }
        ]
    },
    {
        id: "edu2",
        school: "ABC Public School",
        degree: "Senior Secondary (Science)",
        city: "Delhi",
        startDate: "2015",
        endDate: "2016",
        achievements: [
            { tag: "li", text: "Scored 8.9 CGPA in Class 12" },
            { tag: "li", text: "Top 5% of graduating class" }
        ]
    }
];

const experienceData = [
    {
        id: "exp1",
        position: "Software Engineer",
        company: "Tech Innovators Pvt Ltd",
        city: "Bangalore",
        startDate: "2021",
        endDate: "Present",
        achievements: [
            { tag: "li", text: "Developed scalable APIs using Node.js" },
            { tag: "li", text: "Led migration to microservices architecture" }
        ]
    },
    {
        id: "exp2",
        position: "Intern",
        company: "NextGen Solutions",
        city: "Delhi",
        startDate: "2020",
        endDate: "2021",
        achievements: [
            { tag: "li", text: "Built front-end components using React" },
            { tag: "li", text: "Optimized page load time by 20%" }
        ]
    }
];

const skillsData = [
    {
        id: "skill1",
        category: "Programming Languages",
        items: [
            { tag: "p", text: "JavaScript" },
            { tag: "p", text: "Python" },
            { tag: "p", text: "Java" }
        ]
    },
    {
        id: "skill2",
        category: "Frameworks & Tools",
        items: [
            { tag: "p", text: "React" },
            { tag: "p", text: "Node.js" },
            { tag: "p", text: "Redux" },
            { tag: "p", text: "Git" }
        ]
    }
];

// ==========================
// TEMPLATE CONFIGURATION
// - NOTE: layout rows may be plain arrays OR objects with `keys` + `rowOptions`
// Example row object:
// { keys: ["achievements"], rowOptions: { columns: 2, tag: "ul" } }
// ==========================
const templates = {
    template1: {
        education: {
            layout: [
                ["degree"],
                ["school"],
                ["city"],
                // achievements rendered as 2 columns ONLY for this row
                { keys: ["achievements"], rowOptions: { columns: 2, tag: "ul" } }
            ],
            layoutOptions: { columns: 1, display: "block" },
            style: {
                container: "display:flex;flex-direction:column;gap:8px;",
                degree: "font-weight:700;",
                school: "font-weight:500;",
                city: "color:#666;",
                achievements: "margin-left:12px;"
            }
        },
        experience: {
            layout: [
                ["position"],
                ["company"],
                ["city"],
                // experience achievements single column
                { keys: ["achievements"], rowOptions: { columns: 1, tag: "ul" } }
            ],
            layoutOptions: { columns: 1, display: "block" },
            style: {
                container: "display:flex;flex-direction:column;gap:8px;",
                position: "font-weight:700;",
                company: "font-weight:500;",
                city: "color:#666;",
                achievements: "margin-left:12px;"
            }
        },
        skills: {
            layout: [
                ["category"],
                { keys: ["items"], rowOptions: { columns: 3, tag: "span" } }
            ],
            layoutOptions: { columns: 1, display: "block" },
            style: {
                container: "display:flex;flex-direction:column;gap:6px;padding:8px;border:1px solid #ccc;border-radius:6px;",
                category: "font-weight:700;",
                items: "margin-left:8px;"
            }
        }
    },

    template2: {
        education: {
            layout: [
                ["degree"],
                ["school", "date"],
                ["city"],
                { keys: ["achievements"], rowOptions: { columns: 1, tag: "ul" } }
            ],
            layoutOptions: { columns: 2, display: "inline-block" }, // this controls how items (cards) are arranged across the section
            style: {
                container: "display:flex;flex-direction:column;gap:6px;",
                degree: "font-weight:700;font-size:16px;",
                school: "font-weight:500;",
                date: "color:#555;font-size:13px;",
                city: "color:#666;font-size:13px;",
                achievements: "margin-left:12px;font-size:13px;"
            }
        },
        experience: {
            layout: [
                ["position"],
                ["company", "date"],
                ["city"],
                { keys: ["achievements"], rowOptions: { columns: 2, tag: "ul" } }
            ],
            layoutOptions: { columns: 2, display: "inline-block" },
            style: {
                container: "display:flex;flex-direction:column;gap:6px;",
                position: "font-weight:700;font-size:16px;",
                company: "font-weight:500;",
                date: "color:#555;font-size:13px;",
                city: "color:#666;font-size:13px;",
                achievements: "margin-left:12px;font-size:13px;"
            }
        },
        skills : {
            layout: [
                ["category"],
                { keys: ["items"], rowOptions: { columns: 1, tag: "span", display: "block" } }
            ],
            layoutOptions: { columns: 1, display: "block" },
            style: {
                container: "display:flex;flex-direction:column;gap:6px;padding:8px;border:1px solid #ccc;border-radius:6px;",
                category: "font-weight:700;",
                items: "margin-left:8px; display:block;" // ensure each skill is on its own line
            }
        }
    },

    template3: {
        education: {
            layout: [
                ["date"],
                ["school"],
                { keys: ["achievements"], rowOptions: { columns: 3, tag: "ul" } }
            ],
            layoutOptions: { columns: 3, display: "inline-block" },
            style: {
                container: `
          display:flex;
          flex-direction:column;
          gap:6px;
          background:#0047AB;
          color:white;
          padding:12px;
          border-radius:8px;
          margin-bottom:8px;
        `,
                date: "font-weight:600;font-size:14px;",
                school: "font-weight:700;font-size:16px;",
                achievements: "margin-left:12px;font-size:13px;"
            }
        },
        experience: {
            layout: [["position"], ["company"], ["date", "city"], ["achievements"]],
            layoutOptions: { columns: 1, display: "block" },
            style: {
                container: `
          display:flex;
          flex-direction:column;
          gap:6px;
          background:white;
          color:black;
          padding:12px;
          border-radius:8px;
          margin-bottom:8px;
          border:1px solid #ccc;
        `,
                position: "font-weight:700;font-size:16px;",
                company: "font-weight:500;",
                date: "font-size:13px;color:#444;",
                city: "font-size:13px;color:#666;",
                achievements: "margin-left:12px;font-size:13px;"
            }
        }
    }
};

// ==========================
// HELPERS
// ==========================
function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function normalizeRowDef(rowDef) {
    if (Array.isArray(rowDef)) return { keys: rowDef, rowOptions: {} };
    if (rowDef && typeof rowDef === "object") {
        const keys = rowDef.keys || rowDef.fields || (rowDef.field ? [rowDef.field] : []);
        const rowOptions = rowDef.rowOptions || rowDef.options || {};
        return { keys, rowOptions };
    }
    return { keys: [String(rowDef)], rowOptions: {} };
}

// ==========================
// RENDER FUNCTIONS
// - Section-level `layoutOptions.columns` controls how many "item cards" appear across the section.
// - Row-level `rowOptions.columns` controls how that particular row's contents (e.g. achievements) split into columns.
// ==========================
function renderSection(sectionName, templateConfig, data) {
    const section = templateConfig[sectionName];
    if (!section) return "";

    const sectionDefaults = section.layoutOptions || {};
    const sectionColumns = sectionDefaults.columns || 1;
    const containerStyle =
        sectionColumns > 1
            ? `display:grid;grid-template-columns:repeat(${sectionColumns}, 1fr);gap:12px;align-items:start;`
            : `display:flex;flex-direction:column;gap:12px;`;

    return `
    <section class="${sectionName}">
      <h2>${sectionName.toUpperCase()}</h2>
      <div style="${containerStyle}">
        ${data.map(item => renderItem(item, section, sectionColumns)).join("")}
      </div>
    </section>
  `;
}

function renderItem(item, section, sectionColumns) {
    const { layout = [], style = {}, layoutOptions = {} } = section;
    const itemWrapperStyle =
        layoutOptions.display === "inline-block"
            ? "display:inline-block;vertical-align:top;width:100%;"
            : style.container || "";

    let html = `<div style="${itemWrapperStyle}">`;

    layout.forEach(rowDef => {
        const { keys, rowOptions } = normalizeRowDef(rowDef);
        // rowOptions.columns controls number of columns inside the row (for arrays / lists)
        const rowColumns = rowOptions.columns || 1;

        if (keys.length === 1) {
            const key = keys[0];
            const rowStyle = style[key] || "";
            html += `<div style="${rowStyle}">${renderValue(item, key, rowColumns, rowOptions)}</div>`;
        } else {
            // multiple fields on same horizontal row (e.g., ["date","city"])
            html += `<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;">`;
            keys.forEach(k => {
                html += `<span style="${style[k] || ""}">${renderValue(item, k, 1, {})}</span>`;
            });
            html += `</div>`;
        }
    });

    html += `</div>`;
    return html;
}

/**
 * renderValue(item, key, columnCount, rowOptions)
 * - columnCount: number of columns wanted for array-like values inside this row
 * - rowOptions: may include { tag: "ul" } or other hints
 */
function renderValue(item, key, columnCount = 1, rowOptions = {}) {
    if (key === "date") return `${item.startDate || ""} - ${item.endDate || ""}`;
    const value = item[key];
    if (value === undefined || value === null) return "";

    // handle arrays (strings or tag-objects)
    if (Array.isArray(value)) {
        const first = value[0];
        const isObj = first && typeof first === "object" && "tag" in first;
        const requestedTag = (rowOptions.tag || (isObj ? first.tag : null) || "").toLowerCase();
        const columnStyle = columnCount > 1 ? `style="display:grid;grid-template-columns:repeat(${columnCount}, 1fr);gap:8px;"` : "";

        // If UL/LI style desired (either explicitly or inferred)
        if (requestedTag === "ul" || (isObj && first.tag.toLowerCase() === "li")) {
            const inner = value
                .map(v => {
                    if (typeof v === "string") return `<li>${escapeHtml(v)}</li>`;
                    const txt = escapeHtml(v.text || "");
                    const vs = v.style ? ` style="${v.style}"` : "";
                    return `<li${vs}>${txt}</li>`;
                })
                .join("");
            return `<ul ${columnStyle}>${inner}</ul>`;
        }

        // Generic container for tag-based or plain strings
        const inner = value
            .map(v => {
                if (typeof v === "string") return `<div>${escapeHtml(v)}</div>`;
                const tag = v.tag || "div";
                const txt = escapeHtml(v.text || "");
                const vs = v.style ? ` style="${v.style}"` : "";
                return `<${tag}${vs}>${txt}</${tag}>`;
            })
            .join("");
        return `<div ${columnStyle}>${inner}</div>`;
    }

    // object with tag/text (single)
    if (typeof value === "object" && value.tag && value.text !== undefined) {
        const tag = value.tag;
        return `<${tag}>${escapeHtml(value.text)}</${tag}>`;
    }

    // plain text
    return escapeHtml(String(value));
}

// ==========================
// BUTTON HANDLERS (same usage as before)
// ==========================
document.getElementById("t1").addEventListener("click", () => {
    document.getElementById("resumeContainer").innerHTML =
        renderSection("education", templates.template1, educationData) +
        renderSection("experience", templates.template1, experienceData) +
        renderSection("skills", templates.template1, skillsData);
});

document.getElementById("t2").addEventListener("click", () => {
    document.getElementById("resumeContainer").innerHTML =
        renderSection("education", templates.template2, educationData) +
        renderSection("experience", templates.template2, experienceData) +
        renderSection("skills", templates.template2, skillsData);
});

document.getElementById("t3").addEventListener("click", () => {
    document.getElementById("resumeContainer").innerHTML =
        renderSection("education", templates.template3, educationData) +
        renderSection("experience", templates.template3, experienceData) +
        renderSection("skills", templates.template3, skillsData);
});