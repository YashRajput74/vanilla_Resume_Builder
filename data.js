const data = [
    {
        "id": "skills-1",
        "title": "SKILLS",
        "content": [
            
        ]
    },
    {
        "id": "experience-1",
        "title": "EXPERIENCE",
        "content": [
            {
                label: "comapany name",
                content: "Borcello Studio"
            },
            {
                label: "date",
                content: "2020-Present"
            },
            {
                label: "role",
                content: "Marketing Manager Specialist"
            },
            {
                label: "description-1",
                content: "Develop and execute comprehensive marketing strategies and campaigns that align with the company's goals and objectives."
            },
            {
                label: "description-2",
                content: "Lead, mentor, and manage a high-performing marketing team, fostering a collaborative and results-driven work environment."
            },
            {
                label: "desctiption-3",
                content: "Monitor brand consistency across marketing channels and materials."
            }
        ]
    },
    {
        "id": "education-1",
        "title": "EDUCATION",
        "content": [
            {
                "paragraph": [
                    {
                        "marks": [
                            {
                                "type": "bold"
                            }
                        ],
                        "text": "UNIVERSITY OF ILLINOIS -URBANA CHAMPAIGN (UIUC)"
                    }
                ]
            },
            {
                "paragraph": [
                    {
                        "text": "M.S., Mechanical Engineering Dec 2016 | Urbana-Champaign, IL"
                    }
                ]
            },
            {
                "paragraph": [
                    {
                        "text": "GPA: 3.74/4"
                    }
                ]
            },
            {
                "paragraph": [
                    {
                        "marks": [
                            {
                                "type": "bold"
                            }
                        ],
                        "text": "INDIAN INSTITUTE OF TECHNOLOGY DELHI (ITD) "
                    },
                    {
                        "text": "B.S, Mechanical Engineering May 2014 | New Delhi, India"
                    }
                ]
            },
            {
                "paragraph": [
                    {
                        "text": "GPA: 8.98/10"
                    }
                ]
            }
        ]
    },
    {
        "id": "awards-1",
        "title": "HONURS & AWARDS",
        "content": [
            {
                "paragraph": [
                    {
                        "marks": [
                            {
                                "type": "bold"
                            }
                        ],
                        "text": "CHARPAK SCHOLARSHIP |"
                    },
                    {
                        "text": " For top 35 exchange students from India French Embassy | 2012 | New Delhi"
                    },
                    {
                        "type": "hardBreak"
                    }
                ]
            },
            {
                "paragraph": [
                    {
                        "marks": [
                            {
                                "type": "bold"
                            }
                        ],
                        "text": "DIRECTORS MERIT AWARD |"
                    },
                    {
                        "text": " For top 7 percent students in the class IIT Delhi | 2011 | New Delhi"
                    },
                    {
                        "type": "hardBreak"
                    }
                ]
            },
            {
                "paragraph": [
                    {
                        "marks": [
                            {
                                "type": "bold"
                            }
                        ],
                        "text": "K. VASUDEVAN AWARD |"
                    },
                    {
                        "text": " For topping the institute among 850 students | IIT Delhi | 2011 | New Delhi"
                    }
                ]
            }
        ]
    },
    {
        "id": "coursework-1",
        "title": "COUSEWORK",
        "content": [
            {
                "paragraph": [
                    {
                        "text": "Data Structures and Algorithms"
                    }
                ]
            },
            {
                "paragraph": [
                    {
                        "text": "Developing Android Apps"
                    }
                ]
            },
            {
                "paragraph": [
                    {
                        "text": "Machine Learning"
                    }
                ]
            },
            {
                "paragraph": [
                    {
                        "text": "Data Mining"
                    }
                ]
            },
            {
                "paragraph": [
                    {
                        "text": "Applied Statistics"
                    }
                ]
            },
            {
                "paragraph": [
                    {
                        "text": "Linear Algebra"
                    }
                ]
            },
            {
                "paragraph": [
                    {
                        "text": "Differential Equations"
                    }
                ]
            },
            {
                "paragraph": [
                    {
                        "text": "Robotics: Mechanical Design"
                    }
                ]
            }
        ]
    },
    {
        "id": "interests-1",
        "title": "INTERESTS",
        "content": [
            {
                "paragraph": [
                    {
                        "text": "Traveling, Fitness, Nutrition"
                    }
                ]
            }
        ]
    },
]

const templates = {
    "template1": [
        {
            id: "left",
            "sections": [
                "skills-1", "experience-1"
            ],
            style: {
                //sections need style because they may have a background color
            },
            titleStyle:{
                //also title can have a border or different color than content(I am not saving its style using the editor.)
            }
        },
        {
            id: "right",
            "sections": [
                "education-1", "awards-1", "corsework-1", "interests-1"
            ],
            style: {
                //to be added
            }
        }
    ],
}

const schema = {
    paragraph: {
        tag: "p",
        allowedMarks: ["bold", "italic", "underline", "color", "fontSize"]
    },
    bulletList: {
        tag: "ul",
        children: "listItem"
    },
    orderedList: {
        tag: "ol",
        children: "listItem"
    },
    listItem: {
        tag: "li",
        children: "paragraph"
    },
    hardBreak: {
        tag: "br"
    },
    marks: {
        bold: { tag: "b" },
        italic: { tag: "i" },
        underline: { tag: "u" },
        color: { style: "color" },
        fontSize: { style: "font-size" },
        link: { tag: "a", attrs: ["href", "target"] }
    },
};
