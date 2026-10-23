(function () {
  if (window.__MD_CHAT_ENABLED === false) return;
  if (document.getElementById("md-chat-root")) return;

  var root = document.createElement("div");
  root.id = "md-chat-root";
  root.className = "md-chat-root";

  var dock = document.createElement("div");
  dock.className = "md-chat-dock is-idle";

  var button = document.createElement("button");
  button.type = "button";
  button.className = "md-chat-launcher";
  button.setAttribute("aria-label", "Chat met MEDIADUSTRY");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "md-chat-panel");
  button.innerHTML =
    '<svg class="md-chat-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="md-chat-mark-bubble" fill="currentColor" d="M4.2 6.4A2.2 2.2 0 0 1 6.4 4.2h8.1a2.2 2.2 0 0 1 2.2 2.2v5.4a2.2 2.2 0 0 1-2.2 2.2h-3.1L9.2 16.6c-.62.52-1.6.08-1.6-.72v-1.6H6.4a2.2 2.2 0 0 1-2.2-2.2V6.4Z"/><path class="md-chat-mark-spark" fill="currentColor" d="M18.7 2.2l.48 1.22 1.22.48-1.22.48-.48 1.22-.48-1.22-1.22-.48 1.22-.48.48-1.22Z"/><path class="md-chat-mark-spark" fill="currentColor" d="M16.15 5.05l.28.7.7.28-.7.28-.28.7-.28-.7-.7-.28.7-.28.28-.7Z"/></svg>';

  var lift = document.createElement("span");
  lift.className = "md-chat-launcher-lift";
  lift.appendChild(button);

  var teaserTimer = window.setTimeout(function () {
    if (!dock.isConnected || dock.querySelector(".md-chat-teaser")) return;
    var teaser = document.createElement("div");
    teaser.className = "md-chat-teaser";
    teaser.setAttribute("role", "status");
    var mark = document.createElement("span");
    mark.className = "md-chat-teaser-mark";
    mark.setAttribute("aria-hidden", "true");
    var label = document.createElement("p");
    label.textContent = "Vraag het onze AI-assistent";
    var dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.className = "md-chat-teaser-dismiss";
    dismiss.setAttribute("aria-label", "Verberg de chatuitnodiging");
    dismiss.innerHTML =
      '<svg class="md-chat-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M6 6l12 12M18 6 6 18"/></svg>';
    dismiss.addEventListener("click", function (event) {
      event.stopPropagation();
      teaser.remove();
    });
    teaser.appendChild(mark);
    teaser.appendChild(label);
    teaser.appendChild(dismiss);
    dock.insertBefore(teaser, lift);
  }, 3200);

  var loading = false;
  button.addEventListener("click", function () {
    if (loading) return;
    loading = true;
    window.clearTimeout(teaserTimer);
    button.setAttribute("aria-busy", "true");
    import("/chat/widget.js")
      .then(function (mod) {
        dock.remove();
        mod.mountChatWidget(root);
      })
      .catch(function () {
        loading = false;
        button.removeAttribute("aria-busy");
        var note = document.createElement("p");
        note.className = "md-chat-panel is-open";
        note.setAttribute("role", "alert");
        note.textContent =
          "De chat kon niet geladen worden. Mail info@mediadustry.com of ga naar de contactpagina.";
        root.insertBefore(note, dock);
      });
  });

  dock.appendChild(lift);
  root.appendChild(dock);
  document.body.appendChild(root);
})();
