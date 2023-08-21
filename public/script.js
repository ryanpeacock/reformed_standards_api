// Helper function to convert keys like "Q1" to "Question 1" and "A1" to "Answer 1"
function formatSectionKey(key) {
    const keyType = key.charAt(0);
    const sectionNumber = key.slice(1);

    if (keyType === 'Q') {
        return `Question ${sectionNumber}`;
    } else if (keyType === 'A') {
        return `Answer ${sectionNumber}`;
    } else {
        // Return the key as is if it doesn't match "Q1", "A1", etc.
        return key;
    }
}

// Use fetch to load the JSON data from the server
fetch('/data')
    .then(response => response.json())
    .then(data => {
        const contentElement = document.getElementById('content');
        for (const sectionKey in data) {
            if (data.hasOwnProperty(sectionKey)) {
                const formattedSectionKey = formatSectionKey(sectionKey);
                const sectionData = data[sectionKey];
                const sectionDiv = document.createElement('div');
                sectionDiv.classList.add('section');

                // Create separate divs for the question and each answer in the section
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question');
                questionDiv.textContent = formattedSectionKey + ': ' + sectionData.question;
                sectionDiv.appendChild(questionDiv);

                for (const answerKey in sectionData) {
                    if (sectionData.hasOwnProperty(answerKey) && answerKey !== 'question') {
                        const formattedAnswerKey = formatSectionKey(answerKey);
                        const answerDiv = document.createElement('div');
                        answerDiv.classList.add('answer');
                        answerDiv.textContent = formattedAnswerKey + ': ' + sectionData[answerKey].answer;
                        sectionDiv.appendChild(answerDiv);
                    }
                }

                contentElement.appendChild(sectionDiv);
            }
        }
    })
    .catch(error => console.error('Error fetching JSON data:', error));
