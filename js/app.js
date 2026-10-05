(function () {
  const app = document.getElementById("app");
  const titleEl = document.getElementById("title");
  const backBtn = document.getElementById("back");
  const APP_TITLE = "MICU Quick Reference";

  // Checklist state lives in memory only. Nothing is stored or sent anywhere.
  let marked = {};
  let zoom = 1;
  let pendingWizards = [];

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const md = (s) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\((#\/[^)\s]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\n/g, "<br>");
  const topic = (id) => TOPICS.find((t) => t.id === id);

  function setHeader(title, backHref) {
    titleEl.textContent = title;
    document.title = title === APP_TITLE ? title : title + " - " + APP_TITLE;
    backBtn.hidden = !backHref;
    backBtn.onclick = () => (location.hash = backHref);
    document.documentElement.style.setProperty("--hdr", document.querySelector(".topbar").offsetHeight + "px");
  }

  function sourceLine(t, where) {
    const p = where == null ? t.source.pages + (t.source.pages === 1 ? " page" : " pages") : typeof where === "number" ? "page " + (where + 1) : where;
    return `<p class="footer-note">Source: ${esc(t.source.file)}, ${esc(p)}. ${esc(t.source.version)}.</p>`;
  }

  function home(q) {
    setHeader(APP_TITLE, null);
    const query = (q || "").toLowerCase().trim();
    const list = TOPICS.filter((t) => !query || (t.title + " " + t.summary + " " + t.tags).toLowerCase().includes(query));
    const groups = CATEGORIES.map((c) => ({ c, items: list.filter((t) => t.category === c) })).filter((g) => g.items.length);
    app.innerHTML = `
      <input class="search" type="search" placeholder="Search documents" aria-label="Search documents" value="${esc(q || "")}" autocomplete="off">
      <div id="list">${
        groups.length
          ? groups
              .map((g) => `<h2>${esc(g.c)}</h2>` + g.items.map((t) => `<a class="card" href="#/t/${t.id}"><div class="t">${esc(t.title)}</div><div class="s">${esc(t.summary)}</div></a>`).join(""))
              .join("")
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
      ${t.tool ? `<a class="card primary" href="#/t/${id}/tool"><div class="t">${esc(t.tool.title)}</div><div class="s">Tap to mark criteria from the policy checklist</div></a>` : ""}
      ${t.views.map((v) => `<a class="card" href="#/t/${id}/view/${v.id}"><div class="t">${esc(v.title)}</div></a>`).join("")}
      <a class="card" href="#/t/${id}/pages/0"><div class="t">${esc(t.title)} Full Document</div></a>
      ${sourceLine(t)}`;
  }

  function list(items, ordered) {
    const tag = ordered ? "ol" : "ul";
    return `<${tag}>${items
      .map((i) => (typeof i === "string" ? `<li>${md(i)}</li>` : `<li>${md(i.t)}${i.sub ? list(i.sub) : ""}</li>`))
      .join("")}</${tag}>`;
  }

  function defBlock(d) {
    return `<details class="def"><summary>${esc(d.title)}</summary>${list(d.items)}</details>`;
  }

  function outcome(o, steps) {
    if (!o) return "";
    const num = o.go ? steps.findIndex((s) => s.id === o.go) + 1 : 0;
    const go = num ? `<button class="go" data-go="${o.go}">Step ${num} &#8594;</button>` : "";
    const text = o.t ? (o.href ? `<a href="${o.href}">${md(o.t)} &#8594;</a>` : md(o.t)) : "";
    return `<div class="out ${o.tone || "plain"}">${text ? `<span>${text}</span>` : ""}${go}${o.then ? `<small class="then">${md(o.then)}</small>` : ""}</div>`;
  }

  // One question at a time. Answers live in memory only and reset when the page is left.
  function wizard(el, items, t) {
    const byId = {};
    const sectionOf = {};
    let sec = null;
    items.forEach((i) => {
      if (i.section) sec = i;
      else if (i.id) {
        byId[i.id] = i;
        sectionOf[i.id] = sec;
      }
    });
    const first = items.find((i) => i.id).id;
    let path = [];

    function walk() {
      let at = first;
      let result = null;
      const trail = path.map((k) => {
        const s = byId[at];
        const o = s[k];
        const entry = { s, k, o };
        if (o.go) at = o.go;
        else {
          result = o;
          at = null;
        }
        return entry;
      });
      return { at, result, trail };
    }

    function render() {
      const { at, result, trail } = walk();
      const trailHtml = trail.length
        ? `<details class="trail"><summary>Your answers (${trail.length})</summary><ol>${trail
            .map(
              (e, i) => `<li><button class="trail-item" data-to="${i}">
                <span class="tq">${esc(e.s.short || e.s.q)}</span>
                <span class="ta">${esc(e.k === "yes" ? e.s.yesLabel || "Yes" : "No")}${e.o.t && e.o.go ? " · " + esc(e.o.t) : ""}</span>
              </button></li>`
            )
            .join("")}</ol><p class="trail-hint">Tap an answer to change it.</p></details>`
        : "";
      let main;
      if (at) {
        const s = byId[at];
        const sc = sectionOf[at];
        const defs = (s.defs || []).map((k) => defBlock(t.defs[k])).join("") + (s.def ? defBlock(s.def) : "");
        main = `${sc ? `<div class="wiz-sec ${sc.tone || ""}">${esc(sc.section)}</div>` : ""}
          <section class="wiz-card">
            <div class="q">${md(s.q)}</div>
            ${s.list ? list(s.list) : ""}
            ${s.q2 ? `<div class="q">${md(s.q2)}</div>` : ""}
            ${s.list2 ? list(s.list2) : ""}
            ${defs}
            <div class="wiz-btns">
              <button class="ans-btn yes" data-ans="yes">${esc(s.yesLabel || "Yes")}</button>
              <button class="ans-btn no" data-ans="no">No</button>
            </div>
          </section>`;
      } else {
        const o = result;
        main = `<section class="wiz-result ${o.tone || ""}">
            <div class="res-label">Result</div>
            <div class="res-text">${md(o.t)}</div>
            ${o.then ? `<p class="res-then">${md(o.then)}</p>` : ""}
            ${o.href ? `<a class="btn solid" href="${o.href}">Open algorithm &#8594;</a>` : ""}
          </section>`;
      }
      const nav = trail.length
        ? `<div class="wiz-nav"><button class="btn" data-nav="back">&#8592; Back</button><button class="btn" data-nav="reset">Start over</button></div>`
        : "";
      el.innerHTML = trailHtml + main + nav;

      el.querySelectorAll("[data-ans]").forEach((b) => (b.onclick = () => { path.push(b.dataset.ans); render(); focusTop(); }));
      el.querySelectorAll("[data-to]").forEach((b) => (b.onclick = () => { path = path.slice(0, +b.dataset.to); render(); focusTop(); }));
      const back = el.querySelector('[data-nav="back"]');
      if (back) back.onclick = () => { path.pop(); render(); focusTop(); };
      const reset = el.querySelector('[data-nav="reset"]');
      if (reset) reset.onclick = () => { path = []; render(); focusTop(); };
    }

    function focusTop() {
      if (el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: "start" });
    }

    render();
  }

  function flowBlock(items, t) {
    const steps = items.filter((i) => i.id);
    return items
      .map((i) => {
        if (i.section) return `<h3 class="flow-sec ${i.tone || ""}">${esc(i.section)}</h3>`;
        if (i.note) return `<p class="flow-note">${md(i.note)}</p>`;
        const n = steps.indexOf(i) + 1;
        const defs = (i.defs || []).map((k) => defBlock(t.defs[k])).join("") + (i.def ? defBlock(i.def) : "");
        return `<section class="step" id="step-${i.id}">
          <div class="step-n">Step ${n}</div>
          <div class="q">${md(i.q)}</div>
          ${i.list ? list(i.list) : ""}
          ${i.q2 ? `<div class="q">${md(i.q2)}</div>` : ""}
          ${i.list2 ? list(i.list2) : ""}
          ${defs}
          <div class="ans"><span class="lbl">${esc(i.yesLabel || "Yes")}</span>${outcome(i.yes, steps)}</div>
          <div class="ans"><span class="lbl">No</span>${outcome(i.no, steps)}</div>
        </section>`;
      })
      .join("");
  }

  function renderBlocks(blocks, t) {
    const out = [];
    let sec = [];
    const flush = () => {
      if (sec.length) out.push(`<section class="sec">${sec.join("")}</section>`);
      sec = [];
    };
    blocks.forEach((b) => {
      if (b.h) {
        flush();
        sec.push(`<h3>${esc(b.h)}</h3>`);
      } else if (b.p) sec.push(`<p>${md(b.p)}</p>`);
      else if (b.ul) sec.push(list(b.ul));
      else if (b.ol) sec.push(list(b.ol, true));
      else if (b.table)
        sec.push(`<table class="kv">${b.table.head ? `<thead><tr>${b.table.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>` : ""}<tbody>${b.table.rows
          .map((r) => `<tr>${r.map((c) => `<td>${md(c)}</td>`).join("")}</tr>`)
          .join("")}</tbody></table>`);
      else if (b.note) sec.push(`<div class="callout ${b.tone || "info"}">${md(b.note)}</div>`);
      else if (b.link) sec.push(`<p><a class="btn" href="${b.link.href}"${b.link.ext ? ' target="_blank" rel="noopener"' : ""}>${esc(b.link.t)}</a></p>`);
      else if (b.flow) {
        flush();
        if (b.interactive) {
          pendingWizards.push(b.flow);
          out.push(`<div class="wiz" data-wiz="${pendingWizards.length - 1}" aria-live="polite"></div>`);
        } else out.push(flowBlock(b.flow, t));
      }
    });
    flush();
    return out.join("");
  }

  function view(id, vid) {
    const t = topic(id);
    const v = t && t.views.find((x) => x.id === vid);
    if (!v) return notFound();
    setHeader(v.title, "#/t/" + id);
    pendingWizards = [];
    const body = v.blocks
      ? renderBlocks(v.blocks, t)
      : `<div class="cols">${v.columns
          .map((c) => `<section class="col ${c.highlight ? "hl" : ""}"><h3>${esc(c.name)}</h3><ol>${c.steps.map((s) => `<li>${md(s)}</li>`).join("")}</ol></section>`)
          .join("")}</div>`;
    app.innerHTML = `
      <p class="note">${v.note ? esc(v.note) : `${esc(t.title)}: summary of ${esc(v.src)}. Verify against the full document.`}</p>
      ${body}
      <div class="linkrow"><a class="btn" href="#/t/${id}/pages/${v.page}">See original page ${v.page + 1}</a></div>
      ${sourceLine(t, v.src || v.page)}`;
    app.querySelectorAll(".wiz").forEach((el) => wizard(el, pendingWizards[+el.dataset.wiz], t));
    app.querySelectorAll("[data-go]").forEach((b) =>
      b.addEventListener("click", () => {
        const el = document.getElementById("step-" + b.dataset.go);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.remove("flash");
        void el.offsetWidth;
        el.classList.add("flash");
      })
    );
  }

  function pages(id, idx) {
    const t = topic(id);
    idx = parseInt(idx, 10) || 0;
    if (!t || !t.pages[idx]) return notFound();
    setHeader(t.title + " Full Document", "#/t/" + id);
    const n = t.pages.length;
    app.innerHTML = `
      <div class="viewer-bar">
        ${n > 1 ? `<select class="btn jump" aria-label="Jump to page">${t.pages.map((p, i) => `<option value="${i}"${i === idx ? " selected" : ""}>Page ${i + 1}${p.title ? ": " + esc(p.title) : ""}</option>`).join("")}</select>` : ""}
        <div class="grp">
          <button class="btn" id="zout" aria-label="Zoom out">&#8722;</button>
          <button class="btn" id="zin" aria-label="Zoom in">+</button>
          <a class="btn" href="${t.pdf}" target="_blank" rel="noopener">PDF</a>
        </div>
      </div>
      ${t.pages
        .map(
          (p, i) => `<div class="pagetitle" id="pg-${i}">Page ${i + 1} of ${n}${p.title ? ": " + esc(p.title) : ""}</div>
      <div class="pagewrap"><img class="pg" src="${p.img}" width="${p.w}" height="${p.h}" ${i > idx + 1 ? 'loading="lazy"' : ""} alt="Page ${i + 1} of the original document${p.title ? ": " + esc(p.title) : ""}"></div>`
        )
        .join("")}
      ${sourceLine(t)}`;
    const imgs = app.querySelectorAll(".pg");
    const apply = () => imgs.forEach((img) => (img.style.width = zoom * 100 + "%"));
    apply();
    document.getElementById("zin").onclick = () => { zoom = Math.min(4, zoom + 0.5); apply(); };
    document.getElementById("zout").onclick = () => { zoom = Math.max(1, zoom - 0.5); apply(); };
    const jump = app.querySelector(".jump");
    if (jump) jump.onchange = () => document.getElementById("pg-" + jump.value).scrollIntoView({ block: "start" });
    if (idx > 0) requestAnimationFrame(() => document.getElementById("pg-" + idx).scrollIntoView({ block: "start" }));
  }

  function itemBtn(it) {
    const on = !!marked[it.id];
    const ref = it.ref === "reversible" ? refBlock(it.ref) : "";
    return `<button class="item" data-id="${it.id}" aria-pressed="${on}"><span class="box" aria-hidden="true">&#10003;</span><span>${esc(it.text)}</span></button>${ref}`;
  }

  function refBlock(refId) {
    const t = topic("ecpr").tool;
    const r = t.reference.find((x) => x.id === refId);
    if (!r) return "";
    return `<details class="ref"><summary>#${r.num} ${esc(r.title)} (reference)</summary><ul>${r.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></details>`;
  }

  function tool(id) {
    const t = topic(id);
    if (!t || !t.tool) return notFound();
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
