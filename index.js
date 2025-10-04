function getDataFromLocalStorage() {
    const storedData = localStorage.getItem('resumeData');
    return storedData ? JSON.parse(storedData) : data; // Use the default data if nothing is stored
}

// Helper function to save data to localStorage
function saveDataToLocalStorage(data) {
    localStorage.setItem('resumeData', JSON.stringify(data));
}

function renderContent(content, schema) {
    return content.map(item => {
        let element = null;

        // Handle paragraph type
        if (item.paragraph) {
            element = document.createElement(schema.paragraph.tag);

            item.paragraph.forEach(para => {
                let textNode = para.text || ''; // Default to empty string if no text

                // If marks exist, apply them
                if (para.marks) {
                    para.marks.forEach(mark => {
                        const markTag = schema.marks[mark.type];
                        if (markTag) {
                            const markElement = document.createElement(markTag.tag);
                            markElement.innerHTML = textNode; // Apply the marks on text
                            element.appendChild(markElement);
                        }
                    });
                } else {
                    // If no marks, just add text directly
                    const textEl = document.createElement('span');
                    textEl.innerHTML = textNode;
                    element.appendChild(textEl);
                }

                // Handle hardBreak (this must be outside of the text logic)
                if (para.type === 'hardBreak') {
                    const hardBreakEl = document.createElement(schema.hardBreak.tag);
                    element.appendChild(hardBreakEl); // Append the hardBreak after the text
                }
            });
        }

        // Handle bulletList type
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

        // Handle hardBreak
        if (item.hardBreak) {
            element = document.createElement(schema.hardBreak.tag);
        }

        return element;
    }).filter(Boolean); // Remove any null/undefined values
}

function renderResume(data) {
    // Create the main resume container div
    const resumeContainer = document.querySelector('.resume');
    resumeContainer.innerHTML = '';
    // Iterate over the data to create both left and right side sections
    data.forEach(side => {
        const sideContainer = document.createElement('div');
        sideContainer.classList.add(side.id); // Add the side-specific class (left or right)

        side.sections.forEach(section => {
            // Create section container for each section
            const sectionContainer = document.createElement('div');
            sectionContainer.classList.add('section-container'); // Add class for styling

            // Create and append section title
            const sectionTitle = document.createElement('h2');
            sectionTitle.textContent = section.title;
            sectionContainer.appendChild(sectionTitle);

            // Create a div to wrap the section content
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('section-content'); // Add class for styling the content div

            // Render section content
            const sectionContent = renderContent(section.content, schema);

            // Only append valid elements (check if they are truthy)
            sectionContent.forEach(el => {
                if (el) {
                    contentDiv.appendChild(el); // Append to the content div
                }
            });

            // Append the content div to the section container
            sectionContainer.appendChild(contentDiv);

            // Append the section container to the side container (left or right)
            sideContainer.appendChild(sectionContainer);
        });

        // Append the side container (left or right) to the main resume container
        resumeContainer.appendChild(sideContainer);
    });

    // Append the resume container to the body or any specific element
    document.body.appendChild(resumeContainer);
}

// Run this function to render the resume
// renderResume(data);

// Function to toggle edit mode
function toggleEditMode() {
    const isEditable = document.body.classList.contains('edit-mode');

    // Toggle the 'edit-mode' class
    document.body.classList.toggle('edit-mode');

    // Get all section titles and content divs
    const sectionTitles = document.querySelectorAll('.section-container h2');
    const sectionContents = document.querySelectorAll('.section-container .section-content');

    // Loop through each title and content, making them editable or non-editable
    sectionTitles.forEach(title => {
        title.contentEditable = !isEditable; // Toggle the contenteditable state for titles
    });

    sectionContents.forEach(content => {
        content.contentEditable = !isEditable; // Toggle the contenteditable state for content divs
    });

    const editModeButton = document.getElementById('edit-mode-btn');
    if (editModeButton) {
        if (editModeButton.textContent.trim() === 'Edit Mode') {
            editModeButton.textContent = 'Preview Mode'; // Switch to Preview Mode
        } else {
            editModeButton.textContent = 'Edit Mode'; // Switch to Edit Mode
        }
    }
}

// Create a deep clone of the data to avoid mutating the original data directly
function deepClone(data) {
    return JSON.parse(JSON.stringify(data));
}

// Function to add a new section to the specified side
function addSection(sideId) {
    let newData = getDataFromLocalStorage(); // Get current data from localStorage
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

    side.sections.push(newSection); // Add the new section

    saveDataToLocalStorage(newData); // Save the updated data back to localStorage
    renderResume(newData); // Re-render with the updated data
}

// Function to attach events to the add section buttons
function addEventListenersToButtons() {
    const toolbar = document.querySelector('#resume-toolbar');

    // Attach event listeners to the add section buttons
    const data = getDataFromLocalStorage(); // Get current data from localStorage
    data.forEach(side => {
        const addButton = toolbar.querySelector(`#add-section-${side.id}`);
        addButton.addEventListener('click', () => addSection(side.id));
    });
}

function addFormattingEventListeners() {
    // Bold button event listener
    const boldButton = document.getElementById('bold-btn');
    boldButton.addEventListener('click', () => applyFormatting('bold'));

    // Italic button event listener
    const italicButton = document.getElementById('italic-btn');
    italicButton.addEventListener('click', () => applyFormatting('italic'));

    // Underline button event listener
    const underlineButton = document.getElementById('underline-btn');
    underlineButton.addEventListener('click', () => applyFormatting('underline'));

    // Color button event listener
    const colorButton = document.getElementById('color-btn');
    colorButton.addEventListener('click', () => {
        const color = prompt('Enter a color (e.g., #ff0000 or red):');
        if (color) {
            applyFormatting('color', color);
        }
    });

    // Font Size button event listener
    const fontSizeButton = document.getElementById('font-size-btn');
    fontSizeButton.addEventListener('click', () => {
        const fontSize = prompt('Enter font size (e.g., 16px, 2em):');
        if (fontSize) {
            applyFormatting('fontSize', fontSize);
        }
    });

    // Link button event listener
    const linkButton = document.getElementById('link-btn');
    linkButton.addEventListener('click', () => {
        applyFormatting('link');
    });
}

// Function to apply formatting to the selected text
function applyFormatting(command, value = null) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0); // Get the current selection's range

    if (command === 'color') {
        // Apply color by modifying the style directly
        const span = document.createElement('span');
        span.style.color = value;
        range.surroundContents(span); // Wrap the selected text in the span with color
    } else if (command === 'fontSize') {
        // Apply font size by modifying the style directly
        const span = document.createElement('span');
        span.style.fontSize = value;
        range.surroundContents(span); // Wrap the selected text in the span with font size
    } else if (command === 'link') {
        const url = prompt('Enter the link URL:', 'https://');
        if (url) {
            const aTag = document.createElement('a');
            aTag.href = url;
            aTag.textContent = selection.toString(); // Use the selected text as link text
            range.deleteContents(); // Remove the selected text
            range.insertNode(aTag); // Insert the <a> tag at the current position
        }
    } else if (command === 'bulletList') {
        // Apply bullet list
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        li.textContent = selection.toString(); // Use the selected text as list item
        ul.appendChild(li);
        range.deleteContents(); // Remove the selected text
        range.insertNode(ul); // Insert the <ul> at the current position
    } else if (command === 'orderedList') {
        // Apply ordered list
        const ol = document.createElement('ol');
        const li = document.createElement('li');
        li.textContent = selection.toString(); // Use the selected text as list item
        ol.appendChild(li);
        range.deleteContents(); // Remove the selected text
        range.insertNode(ol);
    } else {
        // Apply bold, italic, or underline using document.execCommand
        document.execCommand(command, false, null);
    }
}

// Function to create the add section buttons dynamically, including formatting buttons
function createAddSectionButtons() {
    const toolbar = document.querySelector('#resume-toolbar');
    const data = getDataFromLocalStorage(); // Get current data from localStorage

    // Create buttons for adding sections and other elements
    data.forEach(side => {
        const addSectionButton = document.createElement('button');
        addSectionButton.textContent = `Add Section to ${side.id.charAt(0).toUpperCase() + side.id.slice(1)}`;
        addSectionButton.classList.add('add-section-btn');
        addSectionButton.id = `add-section-${side.id}`;
        toolbar.appendChild(addSectionButton);
    });

    // Create Save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Resume';
    saveButton.classList.add('save-resume-btn');
    saveButton.id = 'save-resume-btn';
    toolbar.appendChild(saveButton);

    // Create the formatting buttons (Bold, Italic, Underline)
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

    // Create the Color button
    const colorButton = document.createElement('button');
    colorButton.textContent = 'Color';
    colorButton.classList.add('color-btn');
    colorButton.id = 'color-btn';
    toolbar.appendChild(colorButton);

    // Create the Font Size button
    const fontSizeButton = document.createElement('button');
    fontSizeButton.textContent = 'Font Size';
    fontSizeButton.classList.add('font-size-btn');
    fontSizeButton.id = 'font-size-btn';
    toolbar.appendChild(fontSizeButton);

    // Create the Link button
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

    // Create the Ordered List button
    const orderedListButton = document.createElement('button');
    orderedListButton.textContent = 'Ordered List';
    orderedListButton.classList.add('ordered-list-btn');
    orderedListButton.id = 'ordered-list-btn';
    toolbar.appendChild(orderedListButton);
}

// Function to add event listeners for the formatting buttons
function addFormattingEventListeners() {
    // Color button event listener
    const colorButton = document.getElementById('color-btn');
    colorButton.addEventListener('click', () => {
        const color = prompt('Enter a color (e.g., #ff0000 or red):');
        if (color) {
            applyFormatting('color', color);
        }
    });

    // Font Size button event listener
    const fontSizeButton = document.getElementById('font-size-btn');
    fontSizeButton.addEventListener('click', () => {
        const fontSize = prompt('Enter font size (e.g., 16px, 2em):');
        if (fontSize) {
            applyFormatting('fontSize', fontSize);
        }
    });

    // Link button event listener
    const linkButton = document.getElementById('link-btn');
    linkButton.addEventListener('click', () => {
        applyFormatting('link');
    });

    const bulletListButton = document.getElementById('bullet-list-btn');
    bulletListButton.addEventListener('click', () => {
        applyFormatting('bulletList');
    });

    // Ordered List button event listener
    const orderedListButton = document.getElementById('ordered-list-btn');
    orderedListButton.addEventListener('click', () => {
        applyFormatting('orderedList');
    });
}

// Function to save the current state of the resume to localStorage
function saveResumeData() {
    const data = getDataFromLocalStorage(); // Get the current data from localStorage

    // Go through all the editable sections and save their content
    const sectionTitles = document.querySelectorAll('.section-container h2');
    const sectionContents = document.querySelectorAll('.section-container .section-content');

    sectionTitles.forEach((title, index) => {
        const sectionId = title.closest('.section-container').dataset.id;
        const section = data
            .flatMap(side => side.sections)
            .find(sec => sec.id === sectionId);

        if (section) {
            section.title = title.textContent; // Save the updated section title
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
            section.content = updatedContent; // Save the updated content for this section
        }
    });

    saveDataToLocalStorage(data); // Save the updated data back to localStorage
    alert('Resume saved successfully!');
}

// Function to attach event listeners to the "Save" button
function addSaveButtonListener() {
    const saveButton = document.getElementById('save-resume-btn');
    saveButton.addEventListener('click', saveResumeData);
}

// Event listener for the Edit Mode button
const editModeButton = document.getElementById('edit-mode-btn');
editModeButton.addEventListener('click', toggleEditMode);

// Initialize the resume with data from localStorage
const initialData = getDataFromLocalStorage();
renderResume(initialData);

// Create buttons and attach events (including the "Save" button and formatting buttons)
createAddSectionButtons();
addEventListenersToButtons();
addFormattingEventListeners(); // Attach the formatting button event listeners
addSaveButtonListener(); // Attach the "Save" button event listener

