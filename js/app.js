(function () {
  const app = document.getElementById("app");
  const titleEl = document.getElementById("title");
  const backBtn = document.getElementById("back");
  const APP_TITLE = "MICU Quick Reference";

  // Checklist state lives in memory only. Nothing is stored or sent anywhere.
  let marked = {};
  let zoom = 1;

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const topic = (id) => TOPICS.find((t) => t.id === id);

  function setHeader(title, backHref) {
    titleEl.textContent = title;
    document.title = title === APP_TITLE ? title : title + " - " + APP_TITLE;
    backBtn.hidden = !backHref;
    backBtn.onclick = () => (location.hash = backHref);
  }

  function sourceLine(t, pageIdx) {
    const p = pageIdx != null ? "page " + (pageIdx + 1) + " of " + t.source.pages : t.source.pages + " pages";
    return `<p class="footer-note">Source: ${esc(t.source.file)}, ${p}. ${esc(t.source.version)}.</p>`;
  }

  function home(q) {
    setHeader(APP_TITLE, null);
    const query = (q || "").toLowerCase().trim();
    const list = TOPICS.filter((t) => !query || (t.title + " " + t.summary + " " + t.tags).toLowerCase().includes(query));
    app.innerHTML = `
      <input class="search" type="search" placeholder="Search documents" aria-label="Search documents" value="${esc(q || "")}" autocomplete="off">
      <h2>Documents</h2>
      <div id="list">${
        list.length
          ? list.map((t) => `<a class="card" href="#/t/${t.id}"><div class="t">${esc(t.title)}</div><div class="s">${esc(t.summary)}</div></a>`).join("")
          : '<p class="empty">No matching documents.</p>'
      }</div>
      <p class="footer-note">Content is reproduced only from the source documents listed. This prototype adds no clinical guidance of its own.</p>`;
    const input = app.querySelector(".search");
    input.addEventListener("input", () => {
      const pos = input.selectionStart;
      home(input.value);
      const n = app.querySelector(".search");
      n.focus();
      n.setSelectionRange(pos, pos);
    });
  }

  function topicPage(id) {
    const t = topic(id);
    if (!t) return notFound();
    setHeader(t.title, "#/");
    app.innerHTML = `
      <a class="card primary" href="#/t/${id}/tool"><div class="t">${esc(t.tool.title)}</div><div class="s">Tap to mark criteria from the policy checklist</div></a>
      ${t.views.map((v) => `<a class="card" href="#/t/${id}/view/${v.id}"><div class="t">${esc(v.title)}</div></a>`).join("")}
      <a class="card" href="#/t/${id}/pages/0"><div class="t">${esc(t.title)} Full Document</div></a>
      ${sourceLine(t)}`;
  }

  function view(id, vid) {
    const t = topic(id);
    const v = t && t.views.find((x) => x.id === vid);
    if (!v) return notFound();
    setHeader(v.title, "#/t/" + id);
    app.innerHTML = `
      <p class="note">${esc(v.note)}</p>
      <div class="cols">${v.columns
        .map((c) => `<section class="col ${c.highlight ? "hl" : ""}"><h3>${esc(c.name)}</h3><ol>${c.steps.map((s) => `<li>${md(s)}</li>`).join("")}</ol></section>`)
        .join("")}</div>
      <div class="linkrow"><a class="btn" href="#/t/${id}/pages/${v.page}">See original page ${v.page + 1}</a></div>
      ${sourceLine(t, v.page)}`;
  }

  function pages(id, idx) {
    const t = topic(id);
    idx = parseInt(idx, 10) || 0;
    if (!t || !t.pages[idx]) return notFound();
    setHeader(t.title + " Full Document", "#/t/" + id);
    const p = t.pages[idx];
    app.innerHTML = `
      <div class="viewer-bar">
        <div class="grp">
          <a class="btn" ${idx > 0 ? `href="#/t/${id}/pages/${idx - 1}"` : 'aria-disabled="true" style="opacity:.4"'}>&#8592; Prev</a>
          <a class="btn" ${idx < t.pages.length - 1 ? `href="#/t/${id}/pages/${idx + 1}"` : 'aria-disabled="true" style="opacity:.4"'}>Next &#8594;</a>
        </div>
        <div class="grp">
          <button class="btn" id="zout" aria-label="Zoom out">&#8722;</button>
          <button class="btn" id="zin" aria-label="Zoom in">+</button>
        </div>
      </div>
      <div class="pagetitle">Page ${idx + 1} of ${t.pages.length}: ${esc(p.title)}</div>
      <div class="pagewrap"><img id="pg" src="${p.img}" alt="${esc(p.title)}, page ${idx + 1} of the original document"></div>
      <div class="linkrow"><a class="btn" href="${t.pdf}" target="_blank" rel="noopener">Open original PDF</a></div>
      ${sourceLine(t, idx)}`;
    const img = document.getElementById("pg");
    const apply = () => (img.style.width = zoom * 100 + "%");
    apply();
    document.getElementById("zin").onclick = () => { zoom = Math.min(4, zoom + 0.5); apply(); };
    document.getElementById("zout").onclick = () => { zoom = Math.max(1, zoom - 0.5); apply(); };
  }

  function itemBtn(it, kind) {
    const on = !!marked[it.id];
    const ref = it.ref === "reversible" ? refBlock(it.ref) : "";
    return `<button class="item" data-id="${it.id}" aria-pressed="${on}"><span class="box" aria-hidden="true">&#10003;</span><span>${esc(it.text)}</span></button>${ref}`;
  }

  function refBlock(refId) {
    const t = TOPICS[0].tool;
    const r = t.reference.find((x) => x.id === refId);
    if (!r) return "";
    return `<details class="ref"><summary>#${r.num} ${esc(r.title)} (reference)</summary><ul>${r.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></details>`;
  }

  function tool(id) {
    const t = topic(id);
    if (!t) return notFound();
    const tl = t.tool;
    setHeader(tl.title, "#/t/" + id);

    const inc = tl.inclusion.items.map((i) => itemBtn(i)).join("");
    const exc = tl.exclusion.items
      .map((i) => {
        if (i.ref !== "contra") return itemBtn(i);
        return `<div class="subhead">${esc(i.text)}</div>` +
          tl.contra.map((g) => `<div class="subhead"><small>#${g.num} ${esc(g.title)}</small></div>${g.items.map((c) => itemBtn(c)).join("")}`).join("");
      })
      .join("");

    app.innerHTML = `
      <p class="note">${esc(tl.note)}</p>
      <h2>Trigger</h2>
      <div class="flow">${tl.flow.map((s) => `<p>${md(s)}</p>`).join("")}</div>
      <h2>${esc(tl.inclusion.title)}</h2>
      <div class="group inc">${inc}</div>
      <h2>${esc(tl.exclusion.title)}</h2>
      <div class="group exc">${exc}</div>
      <h2>Then</h2>
      <div class="decision">${tl.decision.map((s) => `<p>${md(s)}</p>`).join("")}<p><em>${esc(tl.footer)}</em></p></div>
      <div class="linkrow"><a class="btn" href="#/t/${id}/pages/${tl.page}">See original page ${tl.page + 1}</a><button class="btn" id="reset">Clear all</button></div>
      ${sourceLine(t, tl.page)}
      <div class="summary" id="summary" aria-live="polite"></div>`;

    app.querySelectorAll(".item").forEach((b) =>
      b.addEventListener("click", () => {
        const k = b.dataset.id;
        marked[k] = !marked[k];
        b.setAttribute("aria-pressed", String(!!marked[k]));
        renderSummary(tl);
      })
    );
    document.getElementById("reset").onclick = () => {
      marked = {};
      tool(id);
    };
    renderSummary(tl);
  }

  function renderSummary(tl) {
    const incItems = tl.inclusion.items;
    const incMarked = incItems.filter((i) => marked[i.id]);
    const incUn = incItems.filter((i) => !marked[i.id]);
    const excDirect = tl.exclusion.items.filter((i) => i.ref !== "contra" && marked[i.id]);
    const contraMarked = [];
    tl.contra.forEach((g) => g.items.forEach((c) => marked[c.id] && contraMarked.push(`#${g.num}: ${c.text}`)));
    const excCount = excDirect.length + contraMarked.length;
    const li = (arr) => (arr.length ? `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : "<div>None</div>");
    document.getElementById("summary").innerHTML = `
      <div class="row">Inclusion marked: <b>${incMarked.length} of ${incItems.length}</b> &nbsp;|&nbsp; Exclusion marked: <b>${excCount}</b></div>
      <details><summary>Details</summary><div class="lists">
        <h4>Inclusion criteria marked</h4>${li(incMarked.map((i) => i.text))}
        <h4>Inclusion criteria not marked</h4>${li(incUn.map((i) => i.text))}
        <h4>Exclusion criteria marked</h4>${li(excDirect.map((i) => i.text).concat(contraMarked))}
      </div></details>
      <div class="no-verdict">Candidacy decision is made by MICU + CVICU Attg at 10 minutes.</div>`;
  }

  function notFound() {
    setHeader(APP_TITLE, "#/");
    app.innerHTML = '<p class="empty">Page not found.</p>';
  }

  function route() {
    const parts = (location.hash.replace(/^#\/?/, "") || "").split("/").filter(Boolean);
    window.scrollTo(0, 0);
    if (!parts.length) return home();
    if (parts[0] === "t" && parts[1]) {
      if (!parts[2]) return topicPage(parts[1]);
      if (parts[2] === "tool") return tool(parts[1]);
      if (parts[2] === "view") return view(parts[1], parts[3]);
      if (parts[2] === "pages") return pages(parts[1], parts[3]);
    }
    notFound();
  }

  window.addEventListener("hashchange", route);
  route();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
