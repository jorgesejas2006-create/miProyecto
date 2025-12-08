// ==========================
// SISTEMA GLOBAL DE POSTS
// ==========================

// Si no existe "posts_juegos", se crea
if (!localStorage.getItem("posts_juegos")) {
    localStorage.setItem("posts_juegos", JSON.stringify({}));
}

// Función para obtener los posts de un juego
function getPosts(gameId) {
    const all = JSON.parse(localStorage.getItem("posts_juegos"));
    return all[gameId] || {
        popular: [],
        recientes: [],
        siguiendo: []
    };
}

// Guardar posts
function savePosts(gameId, posts) {
    const all = JSON.parse(localStorage.getItem("posts_juegos"));
    all[gameId] = posts;
    localStorage.setItem("posts_juegos", JSON.stringify(all));
}

// ==========================
// RENDERIZAR POSTS
// ==========================
function renderPosts(tipo, gameId) {
    const postsSection = document.querySelector(".posts");
    postsSection.innerHTML = "";

    const postsData = getPosts(gameId);
    const posts = postsData[tipo];

    posts.forEach((post, index) => {
        const div = document.createElement("div");
        div.classList.add("post");
        div.style.opacity = 0;

        const commentsHTML = post.comments
            .map(c => `<div class="comment"><strong>${c.user}:</strong> ${c.text}</div>`)
            .join("");

        div.innerHTML = `
            <div class="user-icon"></div>
            <div class="post-content">
                <h4>${post.user} • ${post.time}</h4>
                <p>${post.content}</p>

                <div class="post-actions">
                    <span class="like-btn" data-index="${index}" data-type="${tipo}" data-game="${gameId}">
                        ${post.likes} ❤️
                    </span>
                    <span class="comment-btn" data-index="${index}" data-type="${tipo}" data-game="${gameId}">
                        ${post.comments.length} 💬
                    </span>
                </div>

                <div class="comments">${commentsHTML}</div>

                <input type="text" class="comment-input" placeholder="Añadir un comentario...">
            </div>
        `;

        postsSection.appendChild(div);

        setTimeout(() => div.style.opacity = 1, 50);
    });

    addListeners(gameId);
}

// ==========================
// LIKES + COMENTARIOS
// ==========================
function addListeners(gameId) {
    const likeBtns = document.querySelectorAll(".like-btn");
    const commentInputs = document.querySelectorAll(".comment-input");

    likeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            const type = btn.dataset.type;

            const posts = getPosts(gameId);
            posts[type][index].likes++;
            savePosts(gameId, posts);

            renderPosts(type, gameId);
        });
    });

    commentInputs.forEach(input => {
        input.addEventListener("keypress", e => {
            if (e.key === "Enter" && input.value.trim() !== "") {
                const postDiv = input.closest(".post");
                const type = postDiv.querySelector(".like-btn").dataset.type;
                const index = postDiv.querySelector(".like-btn").dataset.index;

                const posts = getPosts(gameId);
                posts[type][index].comments.push({
                    user: "Tú",
                    text: input.value
                });
                savePosts(gameId, posts);

                renderPosts(type, gameId);
            }
        });
    });
}

// ==========================
// INICIALIZACIÓN
// ==========================
function iniciarComunidad(gameId) {
    const tabActiva = document.querySelector(".tab.active");
    if (tabActiva) {
        renderPosts(tabActiva.textContent.toLowerCase(), gameId);
    }

    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            renderPosts(tab.textContent.toLowerCase(), gameId);
        });
    });
}
