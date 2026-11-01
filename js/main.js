/* Beyond The Desk — shared site JS */

// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Highlight current page in nav
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === currentPath) a.classList.add("active");
  });
});

/* ----- Simple interactive calendar (used on calendar.html) -----
   Events are defined in window.BTD_EVENTS (set inline on the page).
   Upcoming events show in a clickable carousel, PAGE_SIZE at a time. */
function renderCalendar(target) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  const PAGE_SIZE = 4;

  // Parse "YYYY-MM-DD" as a local date so events never shift a day for
  // visitors in other time zones.
  function parseLocal(str) {
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  function keyOf(date) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }

  const events = (window.BTD_EVENTS || []).map((e) => ({ ...e, date: parseLocal(e.date) }));
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const upcoming = events
    .filter((e) => e.date >= todayStart)
    .sort((a, b) => a.date - b.date || (a.time || "").localeCompare(b.time || ""));

  let view = new Date();
  view.setDate(1);
  let page = 0;
  let flashKey = null;
  const pageCount = Math.max(1, Math.ceil(upcoming.length / PAGE_SIZE));

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dowShort = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  el.innerHTML = `<div class="calendar-month"></div><div class="event-list" aria-live="polite"></div>`;
  const monthEl = el.querySelector(".calendar-month");
  const listEl = el.querySelector(".event-list");

  function buildMonth() {
    const year = view.getFullYear();
    const month = view.getMonth();
    const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = `
      <div class="calendar-header">
        <div class="calendar-nav"><button aria-label="Previous month" data-action="prev">&#8249;</button></div>
        <h3>${monthNames[month]} ${year}</h3>
        <div class="calendar-nav"><button aria-label="Next month" data-action="next">&#8250;</button></div>
      </div>
      <div class="calendar-grid">`;
    dowShort.forEach((d) => (html += `<div class="dow">${d}</div>`));
    for (let i = 0; i < firstDow; i++) html += `<div class="day empty"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const dateStr = keyOf(date);
      const dayEvents = events.filter((e) => keyOf(e.date) === dateStr);
      const classes = ["day"];
      if (date.getTime() === todayStart.getTime()) classes.push("today");
      if (dayEvents.length) classes.push("has-event");
      const title = dayEvents.map((e) => e.title + (e.time ? ` (${e.time})` : "")).join(" | ");
      html += `<div class="${classes.join(" ")}" data-date="${dateStr}" title="${title}"${dayEvents.length ? ' role="button" tabindex="0"' : ""}>${d}</div>`;
    }
    html += `</div>`;
    monthEl.innerHTML = html;

    monthEl.querySelector('[data-action="prev"]').addEventListener("click", () => { view.setMonth(view.getMonth() - 1); buildMonth(); });
    monthEl.querySelector('[data-action="next"]').addEventListener("click", () => { view.setMonth(view.getMonth() + 1); buildMonth(); });
    monthEl.querySelectorAll(".day.has-event").forEach((dayEl) => {
      const go = () => jumpToDate(dayEl.dataset.date);
      dayEl.addEventListener("click", go);
      dayEl.addEventListener("keydown", (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); go(); } });
    });
  }

  // Clicking a highlighted date jumps the carousel to that day's events.
  function jumpToDate(dateStr) {
    const idx = upcoming.findIndex((e) => keyOf(e.date) === dateStr);
    if (idx === -1) return; // past date
    page = Math.floor(idx / PAGE_SIZE);
    flashKey = dateStr;
    buildList();
    listEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function buildList() {
    if (!upcoming.length) {
      listEl.innerHTML = `<h4 class="event-list__title">Upcoming</h4><p class="event-list__empty">No upcoming events just yet — check back soon.</p>`;
      return;
    }
    const start = page * PAGE_SIZE;
    const items = upcoming.slice(start, start + PAGE_SIZE);
    const end = start + items.length;

    let html = `
      <div class="event-list__head">
        <h4 class="event-list__title">Upcoming</h4>
        ${pageCount > 1 ? `
        <div class="event-list__controls">
          <span class="event-list__count">${start + 1}&ndash;${end} of ${upcoming.length}</span>
          <div class="calendar-nav"><button aria-label="Previous events" data-action="list-prev" ${page === 0 ? "disabled" : ""}>&#8249;</button></div>
          <div class="calendar-nav"><button aria-label="More events" data-action="list-next" ${page >= pageCount - 1 ? "disabled" : ""}>&#8250;</button></div>
        </div>` : ""}
      </div>
      <div class="event-list__track">`;
    items.forEach((e) => {
      const flash = flashKey && keyOf(e.date) === flashKey ? " is-flash" : "";
      html += `
        <div class="event-list__item${flash}">
          <div class="event-list__date">
            <span class="d">${e.date.getDate()}</span>
            <span class="m">${monthNames[e.date.getMonth()].slice(0, 3)}</span>
          </div>
          <div class="event-list__body">
            <h4>${e.title}</h4>
            <p>${e.time ? e.time + " &middot; " : ""}${e.description || ""}</p>
          </div>
        </div>`;
    });
    html += `</div>`;
    if (pageCount > 1) {
      html += `<div class="event-list__dots">`;
      for (let i = 0; i < pageCount; i++) {
        html += `<button class="${i === page ? "is-active" : ""}" data-page="${i}" aria-label="Page ${i + 1} of ${pageCount}"></button>`;
      }
      html += `</div>`;
    }
    listEl.innerHTML = html;
    flashKey = null;

    const prev = listEl.querySelector('[data-action="list-prev"]');
    const next = listEl.querySelector('[data-action="list-next"]');
    if (prev) prev.addEventListener("click", () => goTo(page - 1));
    if (next) next.addEventListener("click", () => goTo(page + 1));
    listEl.querySelectorAll("[data-page]").forEach((b) => b.addEventListener("click", () => goTo(Number(b.dataset.page))));
  }

  function goTo(p) {
    if (p < 0 || p >= pageCount || p === page) return;
    page = p;
    buildList();
  }

  // Swipe left/right on phones to flick through events.
  let touchX = null;
  listEl.addEventListener("touchstart", (ev) => { touchX = ev.touches[0].clientX; }, { passive: true });
  listEl.addEventListener("touchend", (ev) => {
    if (touchX === null) return;
    const dx = ev.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 40) goTo(page + (dx < 0 ? 1 : -1));
  });

  buildMonth();
  buildList();
}
window.renderCalendar = renderCalendar;
