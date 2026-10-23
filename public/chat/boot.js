(function () {
  if (window.__MD_CHAT_ENABLED === false) return;
  if (document.getElementById("md-chat-root")) return;

  var root = document.createElement("div");
  root.id = "md-chat-root";
  root.className = "md-chat-root";

  var button = document.createElement("button");
  button.type = "button";
  button.className = "md-chat-launcher";
  button.setAttribute("aria-label", "Chat met MEDIADUSTRY");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "md-chat-panel");
  button.innerHTML =
    '<svg class="md-chat-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5v7A2.5 2.5 0 0 1 16.5 15H12l-3.6 3.2c-.7.6-1.8.1-1.8-.8V15H7.5A2.5 2.5 0 0 1 5 12.5v-7Z"/></svg>';

  var loading = false;
  button.addEventListener("click", function () {
    if (loading) return;
    loading = true;
    button.setAttribute("aria-busy", "true");
    import("/chat/widget.js")
      .then(function (mod) {
        button.remove();
        mod.mountChatWidget(root);
      })
      .catch(function () {
        loading = false;
        button.removeAttribute("aria-busy");
        var note = document.createElement("p");
        note.className = "md-chat-panel";
        note.setAttribute("role", "alert");
        note.textContent =
          "De chat kon niet geladen worden. Mail info@mediadustry.com of ga naar de contactpagina.";
        root.insertBefore(note, button);
      });
  });

  root.appendChild(button);
  document.body.appendChild(root);
})();
