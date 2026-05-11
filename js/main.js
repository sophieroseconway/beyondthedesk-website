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
   Events are defined in window.BTD_EVENTS (set inline on the page). */
function renderCalendar(target) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  const events = (window.BTD_EVENTS || []).map((e) => ({ ...e, date: new Date(e.date) }));
  let view = new Date();
  view.setDate(1);

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  // Monday-first week
  const dowShort = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  function build() {
    const year = view.getFullYear();
    const month = view.getMonth();
    // Monday-first: Sun(0) -> 6, Mon(1) -> 0, ..., Sat(6) -> 5
    const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    let html = `
      <div class="calendar-header">
        <div class="calendar-nav">
          <button aria-label="Previous month" data-action="prev">&#8249;</button>
        </div>
        <h3>${monthNames[month]} ${year}</h3>
        <div class="calendar-nav">
          <button aria-label="Next month" data-action="next">&#8250;</button>
        </div>
      </div>
      <div class="calendar-grid">
    `;
    dowShort.forEach((d) => (html += `<div class="dow">${d}</div>`));
    for (let i = 0; i < firstDow; i++) html += `<div class="day empty"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
      const dayEvents = events.filter((e) => e.date.toDateString() === new Date(year, month, d).toDateString());
      const classes = ["day"];
      if (isToday) classes.push("today");
      if (dayEvents.length) classes.push("has-event");
      const title = dayEvents.length ? dayEvents.map((e) => `${e.title} (${e.time || ""})`).join(" | ") : "";
      html += `<div class="${classes.join(" ")}" data-date="${dateStr}" title="${title}">${d}</div>`;
    }
    html += `</div>`;

    // Upcoming events list
    const upcoming = events
      .filter((e) => e.date >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
      .sort((a, b) => a.date - b.date)
      .slice(0, 5);
    if (upcoming.length) {
      html += `<div class="event-list"><h4 style="margin-top:1.5rem;">Upcoming</h4>`;
      upcoming.forEach((e) => {
        html += `
          <div class="event-list__item">
            <div class="event-list__date">
              <span class="d">${e.date.getDate()}</span>
              <span class="m">${monthNames[e.date.getMonth()].slice(0,3)}</span>
            </div>
            <div class="event-list__body">
              <h4>${e.title}</h4>
              <p>${e.time ? e.time + " &middot; " : ""}${e.description || ""}</p>
            </div>
          </div>`;
      });
      html += `</div>`;
    }

    el.innerHTML = html;
    el.querySelector('[data-action="prev"]').addEventListener("click", () => { view.setMonth(view.getMonth() - 1); build(); });
    el.querySelector('[data-action="next"]').addEventListener("click", () => { view.setMonth(view.getMonth() + 1); build(); });
  }
  build();
}
window.renderCalendar = renderCalendar;
