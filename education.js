// ========== DATA ==========
const educationData = [
    {
        id: "edu1",
        school: "XYZ Institute of Technology",
        degree: "B.Tech in Computer Science",
        city: "Delhi",
        startDate: "2016",
        endDate: "2020",
        achievements: ["Scored 8.5 CGPA", "Top 1% of graduating class"]
    },
    {
        id: "edu2",
        school: "ABC Public School",
        degree: "Senior Secondary (Science)",
        city: "Delhi",
        startDate: "2015",
        endDate: "2016",
        achievements: ["Scored 8.9 CGPA in Class 12", "Top 5% of graduating class","Student of the year award","highest attendance award","University topper 2nd position","Scored 100 in 3subjects"]
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
            "Developed scalable APIs using Node.js",
            "Led migration to microservices architecture"
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
            "Assisted in building front-end components using React",
            "Optimized page load time by 20%"
        ]
    }
];

// ========== TEMPLATE CONFIGS ==========
const templates = {
    // -------- TEMPLATE 1 --------
    template1: {
        education: {
            containerTag: "section",
            tagMap: {
                degree: "h3",
                school: "p",
                city: "span",
                achievements: "ul"
            },
            layout: [["degree"], ["school"], ["city"], ["achievements"]],
            style: {
                container: "display:flex;flex-direction:column;gap:4px;",
                degree: "font-weight:700;",
                school: "font-weight:500;",
                city: "color:#666;",
            },
            listStyle: {
                tag: "li",
                style: "display:inline-block;margin-right:12px;"
            }
        },
        experience: {
            containerTag: "section",
            tagMap: {
                position: "h3",
                company: "p",
                city: "span",
                achievements: "ul"
            },
            layout: [["position"], ["company"], ["city"], ["achievements"]],
            style: {
                container: "display:flex;flex-direction:column;gap:4px;",
                position: "font-weight:700;",
                company: "font-weight:500;",
                city: "color:#666;",
            },
            listStyle: {
                tag: "li",
                style: "display:inline-block;margin-right:12px;"
            }
        }
    },

    // -------- TEMPLATE 2 --------
    template2: {
        education: {
            containerTag: "section",
            tagMap: {
                degree: "h3",
                school: "p",
                date: "span",
                city: "span",
                achievements: "ul"
            },
            layout: [["degree"], ["school", "date"], ["city"], ["achievements"]],
            style: {
                container: "display:flex;flex-direction:column;gap:4px;",
                degree: "font-weight:700;font-size:16px;",
                school: "font-weight:500;",
                date: "color:#555;font-size:13px;",
                city: "color:#666;font-size:13px;",
                achievements: "font-size:13px;"
            },
            listStyle: {
                tag: "li",
                style: "display:inline-block;margin-right:10px;font-size:13px;"
            }
        },
        experience: {
            containerTag: "section",
            tagMap: {
                position: "h3",
                company: "p",
                date: "span",
                city: "span",
                achievements: "ul"
            },
            layout: [["position"], ["company", "date"], ["city"], ["achievements"]],
            style: {
                container: "display:flex;flex-direction:column;gap:4px;",
                position: "font-weight:700;font-size:16px;",
                company: "font-weight:500;",
                date: "color:#555;font-size:13px;",
                city: "color:#666;font-size:13px;",
                achievements: "margin-left:16px;font-size:13px;"
            },
            listStyle: {
                tag: "li",
                style: "display:inline-block;margin-right:10px;font-size:13px;"
            }
        }
    },

    // -------- TEMPLATE 3 --------
    template3: {
        education: {
            containerTag: "section",
            tagMap: {
                date: "span",
                school: "h3",
                achievements: "ul"
            },
            layout: [["date"], ["school"], ["achievements"]],
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
                achievements: "margin-left:16px;font-size:13px;"
            },
            listStyle: {
                tag: "li",
                style: "display:list-item;margin-bottom:4px;"
            }
        },
        experience: {
            containerTag: "section",
            tagMap: {
                position: "h3",
                company: "p",
                date: "span",
                city: "span",
                achievements: "ul"
            },
            layout: [["position"], ["company"], ["date", "city"], ["achievements"]],
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
                achievements: "margin-left:16px;font-size:13px;"
            },
            listStyle: {
                tag: "li",
                style: "display:list-item;margin-bottom:4px;"
            }
        }
    }
};

// ========== RENDER FUNCTIONS ==========
function renderSection(sectionName, templateConfig, data) {
    const section = templateConfig[sectionName];
    if (!section) return "";

    return `
    <${section.containerTag} class="${sectionName}">
      <h2>${sectionName.toUpperCase()}</h2>
      <div>
        ${data.map(item => renderItem(item, section)).join("")}
      </div>
    </${section.containerTag}>
  `;
}

function renderItem(item, section) {
    const { layout, style, tagMap, listStyle } = section;
    let html = `<div style="${style.container}">`;

    layout.forEach(row => {
        if (row.length === 1) {
            const key = row[0];
            html += renderTag(tagMap[key], renderValue(item, key, section), style[key]);
        } else {
            html += `<div style="display:flex;justify-content:space-between;">`;
            row.forEach(key => {
                html += renderTag(tagMap[key], renderValue(item, key, section), style[key]);
            });
            html += `</div>`;
        }
    });

    html += `</div>`;
    return html;
}

function renderTag(tag, content, css = "") {
    return `<${tag || "div"} style="${css}">${content}</${tag || "div"}>`;
}

function renderValue(item, key, section) {
    if (key === "date") return `${item.startDate} - ${item.endDate}`;
    if (Array.isArray(item[key])) {
        const { tag = "li", style = "" } = section.listStyle || {};
        return item[key].map(a => `<${tag} style="${style}">${a}</${tag}>`).join("");
    }
    return item[key] || "";
}

// ========== BUTTON HANDLERS ==========
document.getElementById("t1").addEventListener("click", () => {
    document.getElementById("resumeContainer").innerHTML =
        renderSection("education", templates.template1, educationData) +
        renderSection("experience", templates.template1, experienceData);
});

document.getElementById("t2").addEventListener("click", () => {
    document.getElementById("resumeContainer").innerHTML =
        renderSection("education", templates.template2, educationData) +
        renderSection("experience", templates.template2, experienceData);
});

document.getElementById("t3").addEventListener("click", () => {
    document.getElementById("resumeContainer").innerHTML =
        renderSection("education", templates.template3, educationData) +
        renderSection("experience", templates.template3, experienceData);
});
