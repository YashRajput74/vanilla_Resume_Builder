function getDataFromLocalStorage() {
    const storedData = localStorage.getItem('resumeData');
    return storedData ? JSON.parse(storedData) : data;
}

function saveDataToLocalStorage(data) {
    localStorage.setItem('resumeData', JSON.stringify(data));
}

function renderContent(content, schema) {
    return content.map(item => {
        let element = null;

        if (item.paragraph) {
            element = document.createElement(schema.paragraph.tag);

            item.paragraph.forEach(para => {
                let textNode = para.text || '';

                if (para.marks) {
                    para.marks.forEach(mark => {
                        const markTag = schema.marks[mark.type];
                        if (markTag) {
                            const markElement = document.createElement(markTag.tag);
                            markElement.innerHTML = textNode;
                            element.appendChild(markElement);
                        }
                    });
                }
                else {
                    const textEl = document.createElement('span');
                    textEl.innerHTML = textNode;
                    element.appendChild(textEl);
                }
                
                if (para.type === 'hardBreak') {
                    const hardBreakEl = document.createElement(schema.hardBreak.tag);
                    element.appendChild(hardBreakEl);
                }
            });
        }

        if (item.bulletList) {
            const listElement = document.createElement(schema.bulletList.tag);
            item.bulletList.forEach(listItem => {
                if (listItem.listItem && listItem.listItem.length > 0) {
                    const listItemElement = document.createElement(schema.listItem.tag);
                    const listItemText = listItem.listItem[0].paragraph[0]?.text;
                    if (listItemText) {
                        listItemElement.innerHTML = listItemText;
                        listElement.appendChild(listItemElement);
                    }
                }
            });
            element = listElement;
        }

        if (item.orderedList) {
            const listElement = document.createElement(schema.orderedList.tag);
            item.orderedList.forEach(listItem => {
                if (listItem.listItem && listItem.listItem.length > 0) {
                    const listItemElement = document.createElement(schema.listItem.tag);
                    const listItemText = listItem.listItem[0].paragraph[0]?.text;
                    if (listItemText) {
                        listItemElement.innerHTML = listItemText;
                        listElement.appendChild(listItemElement);
                    }
                }
            });
            element = listElement;
        }

        if (item.hardBreak) {
            element = document.createElement(schema.hardBreak.tag);
        }

        return element;
    }).filter(Boolean);
}

function renderResume(data) {
    const resumeContainer = document.querySelector('.resume');
    resumeContainer.innerHTML = '';
    data.forEach(side => {
        const sideContainer = document.createElement('div');
        sideContainer.classList.add(side.id);

        side.sections.forEach(section => {
            const sectionContainer = document.createElement('div');
            sectionContainer.classList.add('section-container');

            const sectionTitle = document.createElement('h2');
            sectionTitle.textContent = section.title;
            sectionContainer.appendChild(sectionTitle);

            const contentDiv = document.createElement('div');
            contentDiv.classList.add('section-content');

            const sectionContent = renderContent(section.content, schema);

            sectionContent.forEach(el => {
                if (el) {
                    contentDiv.appendChild(el);
                }
            });

            sectionContainer.appendChild(contentDiv);

            sideContainer.appendChild(sectionContainer);
        });

        resumeContainer.appendChild(sideContainer);
    });

    document.body.appendChild(resumeContainer);
}

function toggleEditMode() {
    const isEditable = document.body.classList.contains('edit-mode');

    document.body.classList.toggle('edit-mode');

    const sectionTitles = document.querySelectorAll('.section-container h2');
    const sectionContents = document.querySelectorAll('.section-container .section-content');

    sectionTitles.forEach(title => {
        title.contentEditable = !isEditable;
    });

    sectionContents.forEach(content => {
        content.contentEditable = !isEditable;
    });

    const editModeButton = document.getElementById('edit-mode-btn');
    if (editModeButton) {
        if (editModeButton.textContent.trim() === 'Edit Mode') {
            editModeButton.textContent = 'Preview Mode';
        } 
        else {
            editModeButton.textContent = 'Edit Mode';
        }
    }
}

function deepClone(data) {
    return JSON.parse(JSON.stringify(data));
}

function addSection(sideId) {
    let newData = getDataFromLocalStorage();
    const side = newData.find(side => side.id === sideId);

    const newSection = {
        id: `custom-${side.sections.length + 1}`,
        title: 'New Section',
        content: [
            {
                paragraph: [
                    {
                        text: 'Add your content here...'
                    }
                ]
            }
        ]
    };

    side.sections.push(newSection);

    saveDataToLocalStorage(newData);
    renderResume(newData);
}

function addEventListenersToButtons() {
    const toolbar = document.querySelector('#resume-toolbar');

    const data = getDataFromLocalStorage();
    data.forEach(side => {
        const addButton = toolbar.querySelector(`#add-section-${side.id}`);
        addButton.addEventListener('click', () => addSection(side.id));
    });
}

function addFormattingEventListeners() {
    const boldButton = document.getElementById('bold-btn');
    boldButton.addEventListener('click', () => applyFormatting('bold'));

    const italicButton = document.getElementById('italic-btn');
    italicButton.addEventListener('click', () => applyFormatting('italic'));

    const underlineButton = document.getElementById('underline-btn');
    underlineButton.addEventListener('click', () => applyFormatting('underline'));

    const colorButton = document.getElementById('color-btn');
    colorButton.addEventListener('click', () => {
        const color = prompt('Enter a color (e.g., #ff0000 or red):');
        if (color) {
            applyFormatting('color', color);
        }
    });

    const fontSizeButton = document.getElementById('font-size-btn');
    fontSizeButton.addEventListener('click', () => {
        const fontSize = prompt('Enter font size (e.g., 16px, 2em):');
        if (fontSize) {
            applyFormatting('fontSize', fontSize);
        }
    });

    const linkButton = document.getElementById('link-btn');
    linkButton.addEventListener('click', () => {
        applyFormatting('link');
    });
}

function applyFormatting(command, value = null) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0); 

    if (command === 'color') {
        const span = document.createElement('span');
        span.style.color = value;
        range.surroundContents(span); 
    } 
    else if (command === 'fontSize') {
        const span = document.createElement('span');
        span.style.fontSize = value;
        range.surroundContents(span);
    } 
    else if (command === 'link') {
        const url = prompt('Enter the link URL:', 'https://');
        if (url) {
            const aTag = document.createElement('a');
            aTag.href = url;
            aTag.textContent = selection.toString();
            range.deleteContents();
            range.insertNode(aTag);
        }
    } 
    else if (command === 'bulletList') {
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        li.textContent = selection.toString();
        ul.appendChild(li);
        range.deleteContents();
        range.insertNode(ul);
    } 
    else if (command === 'orderedList') {
        const ol = document.createElement('ol');
        const li = document.createElement('li');
        li.textContent = selection.toString();
        ol.appendChild(li);
        range.deleteContents();
        range.insertNode(ol);
    } 
    else {
        document.execCommand(command, false, null);
    }
}

function createAddSectionButtons() {
    const toolbar = document.querySelector('#resume-toolbar');
    const data = getDataFromLocalStorage();

    data.forEach(side => {
        const addSectionButton = document.createElement('button');
        addSectionButton.textContent = `Add Section to ${side.id.charAt(0).toUpperCase() + side.id.slice(1)}`;
        addSectionButton.classList.add('add-section-btn');
        addSectionButton.id = `add-section-${side.id}`;
        toolbar.appendChild(addSectionButton);
    });

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Resume';
    saveButton.classList.add('save-resume-btn');
    saveButton.id = 'save-resume-btn';
    toolbar.appendChild(saveButton);

    const boldButton = document.createElement('button');
    boldButton.textContent = 'B';
    boldButton.classList.add('bold-btn');
    boldButton.id = 'bold-btn';
    toolbar.appendChild(boldButton);

    const italicButton = document.createElement('button');
    italicButton.textContent = 'I';
    italicButton.classList.add('italic-btn');
    italicButton.id = 'italic-btn';
    toolbar.appendChild(italicButton);

    const underlineButton = document.createElement('button');
    underlineButton.textContent = 'U';
    underlineButton.classList.add('underline-btn');
    underlineButton.id = 'underline-btn';
    toolbar.appendChild(underlineButton);

    const colorButton = document.createElement('button');
    colorButton.textContent = 'Color';
    colorButton.classList.add('color-btn');
    colorButton.id = 'color-btn';
    toolbar.appendChild(colorButton);

    const fontSizeButton = document.createElement('button');
    fontSizeButton.textContent = 'Font Size';
    fontSizeButton.classList.add('font-size-btn');
    fontSizeButton.id = 'font-size-btn';
    toolbar.appendChild(fontSizeButton);

    const linkButton = document.createElement('button');
    linkButton.textContent = 'Link';
    linkButton.classList.add('link-btn');
    linkButton.id = 'link-btn';
    toolbar.appendChild(linkButton);

    const bulletListButton = document.createElement('button');
    bulletListButton.textContent = 'Bullet List';
    bulletListButton.classList.add('bullet-list-btn');
    bulletListButton.id = 'bullet-list-btn';
    toolbar.appendChild(bulletListButton);

    const orderedListButton = document.createElement('button');
    orderedListButton.textContent = 'Ordered List';
    orderedListButton.classList.add('ordered-list-btn');
    orderedListButton.id = 'ordered-list-btn';
    toolbar.appendChild(orderedListButton);
}

function addFormattingEventListeners() {
    const colorButton = document.getElementById('color-btn');
    colorButton.addEventListener('click', () => {
        const color = prompt('Enter a color (e.g., #ff0000 or red):');
        if (color) {
            applyFormatting('color', color);
        }
    });

    const fontSizeButton = document.getElementById('font-size-btn');
    fontSizeButton.addEventListener('click', () => {
        const fontSize = prompt('Enter font size (e.g., 16px, 2em):');
        if (fontSize) {
            applyFormatting('fontSize', fontSize);
        }
    });

    const linkButton = document.getElementById('link-btn');
    linkButton.addEventListener('click', () => {
        applyFormatting('link');
    });

    const bulletListButton = document.getElementById('bullet-list-btn');
    bulletListButton.addEventListener('click', () => {
        applyFormatting('bulletList');
    });

    const orderedListButton = document.getElementById('ordered-list-btn');
    orderedListButton.addEventListener('click', () => {
        applyFormatting('orderedList');
    });
}

function saveResumeData() {
    const data = getDataFromLocalStorage();

    const sectionTitles = document.querySelectorAll('.section-container h2');
    const sectionContents = document.querySelectorAll('.section-container .section-content');

    sectionTitles.forEach((title, index) => {
        const sectionId = title.closest('.section-container').dataset.id;
        const section = data
            .flatMap(side => side.sections)
            .find(sec => sec.id === sectionId);

        if (section) {
            section.title = title.textContent;
        }
    });

    sectionContents.forEach((content, index) => {
        const sectionId = content.closest('.section-container').dataset.id;
        const section = data
            .flatMap(side => side.sections)
            .find(sec => sec.id === sectionId);

        if (section) {
            const updatedContent = [];
            content.querySelectorAll('span').forEach(span => {
                updatedContent.push({ paragraph: [{ text: span.textContent }] });
            });
            section.content = updatedContent;
        }
    });

    saveDataToLocalStorage(data);
    alert('Resume saved successfully!');
}

function addSaveButtonListener() {
    const saveButton = document.getElementById('save-resume-btn');
    saveButton.addEventListener('click', saveResumeData);
}

const editModeButton = document.getElementById('edit-mode-btn');
editModeButton.addEventListener('click', toggleEditMode);

const initialData = getDataFromLocalStorage();
renderResume(initialData);

createAddSectionButtons();
addEventListenersToButtons();
addFormattingEventListeners();
addSaveButtonListener();