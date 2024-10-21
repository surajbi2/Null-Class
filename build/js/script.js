let comments = [];

function addComment() {
    const commentInput = document.getElementById('newComment');
    const commentText = commentInput.value.trim();

    const validCommentRegex = /^[a-zA-Z0-9\s]+$/;

    if (!validCommentRegex.test(commentText)) {
        alert('Comment contains invalid characters. Only letters, numbers, and spaces are allowed.');
        return;
    }

    if (commentText) {
        const commentId = comments.length + 1;
        const comment = { id: commentId, text: commentText, likes: 0, dislikes: 0 };
        comments.push(comment);
        commentInput.value = '';

        renderComments();
    }
}

function renderComments() {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = '';

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';

        const commentHeader = document.createElement('div');
        commentHeader.className = 'comment-header';
        commentHeader.innerText = `Comment ID: ${comment.id}`;

        const commentText = document.createElement('div');
        commentText.className = 'comment-text';
        commentText.innerText = comment.text;

        const commentActions = document.createElement('div');
        commentActions.className = 'comment-actions';
        commentActions.innerHTML = `
            <button onclick="likeComment(${comment.id})">
                <i class="fas fa-thumbs-up"></i> Like
            </button>
            <span>${comment.likes}</span>
            <button onclick="dislikeComment(${comment.id})">
                <i class="fas fa-thumbs-down"></i> Dislike
            </button>
            <span>${comment.dislikes}</span>
        `;

        commentDiv.appendChild(commentHeader);
        commentDiv.appendChild(commentText);
        commentDiv.appendChild(commentActions);
        commentsContainer.appendChild(commentDiv);

        const selectComment = document.getElementById('selectComment');
        const option = document.createElement('option');
        option.value = comment.id;
        option.innerText = `Comment ID: ${comment.id}`;
        selectComment.appendChild(option);
    });
}

function likeComment(id) {
    const comment = comments.find(c => c.id === id);
    if (comment) {
        comment.likes++;
        renderComments();
    }
}

function dislikeComment(id) {
    const comment = comments.find(c => c.id === id);
    if (comment) {
        comment.dislikes++;
        if (comment.dislikes >= 2) {
            comments = comments.filter(c => c.id !== id);
        }
        renderComments();
    }
}

const debouncedAddComment = debounce(addComment, 300);

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

async function translateComment() {
    const selectComment = document.getElementById('selectComment');
    const selectedCommentId = selectComment.value;

    const selectedCommentObj = comments.find(comment => comment.id == selectedCommentId);

    if (!selectedCommentObj) {
        alert('Please select a valid comment.');
        return;
    }

    const commentText = selectedCommentObj.text;
    const languageSelect = document.getElementById('languageSelect');
    const targetLang = languageSelect.value;

    try {
        const translatedText = await translateText(commentText, targetLang);
        document.getElementById('translationResult').innerText = translatedText;
    } catch (error) {
        console.error('Translation failed:', error);
        alert('Translation failed: ' + error.message);
    }
}

async function translateText(text, targetLang) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Translation API error');
    }

    const data = await response.json();

    try {
        const firstArray = data[0];
        if (Array.isArray(firstArray) && firstArray.length > 0) {
            const translationSegment = firstArray[0];
            if (Array.isArray(translationSegment) && translationSegment.length > 0) {
                return translationSegment[0];
            } else {
                throw new Error("Unexpected response structure.");
            }
        } else {
            throw new Error("Unexpected response structure.");
        }
    } catch (error) {
        console.error("Error extracting translation:", error);
        throw new Error("Failed to extract translation");
    }
}

function changeQuality(source) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');

    videoSource.src = source;
    videoPlayer.load();
    videoPlayer.play();
}

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.documentElement.classList.toggle('dark');
    document.querySelector('.container').classList.toggle('dark');
});
