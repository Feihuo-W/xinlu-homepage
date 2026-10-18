/* Site behaviour: navigation, reveal, and data-driven lists. */
(function () {
  "use strict";

  var DATA = window.SITE_DATA || { publications: [], press: [], people: [] };
  var LANG = (document.documentElement.lang || "en").toLowerCase().indexOf("zh") === 0 ? "zh" : "en";
  var T = {
    en: {
      all: "All",
      searchPubs: "Search title, author, journal…",
      searchPress: "Search coverage…",
      searchPeople: "Search collaborator or institution…",
      pubs: "publications",
      items: "items",
      empty: "No matching records. Try another keyword or year.",
      scholar: "Google Scholar",
      venue: "Journal",
      cnTitle: "中文标题",
      copy: "Copy",
      copied: "Copied"
    },
    zh: {
      all: "全部",
      searchPubs: "搜索标题、作者、期刊…",
      searchPress: "搜索报道…",
      searchPeople: "搜索合作者或机构…",
      pubs: "篇论文",
      items: "条",
      empty: "没有找到匹配记录，请更换关键词或年份。",
      scholar: "谷歌学术",
      venue: "期刊",
      cnTitle: "中文标题",
      copy: "复制",
      copied: "已复制"
    }
  }[LANG];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function deemphasize(authors) {
    var s = esc(authors).replace(/\*/g, "<sup>∗</sup>");
    s = s.replace(/(Lu X|Xin Lu|吕欣)/g, "<strong>$1</strong>");
    return s;
  }

  var TOP = ["Nature", "PNAS", "Science", "Physics Reports", "Lancet Digital Health", "National Science Review", "The Innovation"];

  /* ---------- image slots ---------- */
  function wireMedia(root) {
    (root || document).querySelectorAll(".media img").forEach(function (img) {
      if (img.dataset.mediaWired) return;
      img.dataset.mediaWired = "1";
      var media = img.closest(".media");
      var fail = function () {
        var fb = img.getAttribute("data-fallback");
        if (fb && !img.dataset.fbTried) {
          img.dataset.fbTried = "1";
          img.src = fb;
          return;
        }
        if (media) media.classList.add("is-missing");
      };
      img.addEventListener("load", function () {
        if (media && img.naturalWidth > 0) media.classList.remove("is-missing");
      });
      img.addEventListener("error", fail);
      if (img.complete) {
        if (img.naturalWidth > 0 && media) media.classList.remove("is-missing");
        else fail();
      }
    });
  }

  function wireOptionalImages(root) {
    (root || document).querySelectorAll("img[data-optional]").forEach(function (img) {
      if (img.dataset.optWired) return;
      img.dataset.optWired = "1";
      var drop = function () { img.remove(); };
      img.addEventListener("error", drop);
      if (img.complete && img.naturalWidth === 0) drop();
    });
  }

  wireMedia(document);

  /* ---------- header ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var menuBtn = document.querySelector(".menu-btn");
  var drawer = document.querySelector(".drawer");
  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- helpers for filters ---------- */
  function chip(label, value, active) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (active ? " is-active" : "");
    b.dataset.value = value;
    b.textContent = label;
    return b;
  }

  function years(list, key) {
    var ys = [];
    list.forEach(function (x) {
      if (ys.indexOf(x[key]) === -1) ys.push(x[key]);
    });
    ys.sort(function (a, b) { return Number(b) - Number(a); });
    return ys;
  }

  /* ---------- publications ---------- */
  var pubsRoot = document.getElementById("pubsRoot");
  if (pubsRoot) {
    var pubSearch = document.getElementById("pubSearch");
    var pubChips = document.getElementById("pubChips");
    var pubCount = document.getElementById("pubCount");
    var pubState = { q: "", year: "all" };
    var pYears = years(DATA.publications, "year");
    if (pubChips) {
      pYears.forEach(function (y) { pubChips.appendChild(chip(y, y, false)); });
    }
    if (pubSearch) {
      pubSearch.placeholder = T.searchPubs;
      pubSearch.addEventListener("input", function () {
        pubState.q = this.value.trim().toLowerCase();
        renderPubs();
      });
    }
    if (pubChips) {
      pubChips.addEventListener("click", function (e) {
        var b = e.target.closest(".chip");
        if (!b) return;
        pubState.year = b.dataset.value;
        pubChips.querySelectorAll(".chip").forEach(function (c) {
          c.classList.toggle("is-active", c === b);
        });
        renderPubs();
      });
    }

    function matches(p, q) {
      if (!q) return true;
      return (p.title + " " + p.title_cn + " " + p.authors + " " + p.venue + " " + p.tail)
        .toLowerCase().indexOf(q) !== -1;
    }

    function renderPubs() {
      var list = DATA.publications.filter(function (p) {
        return (pubState.year === "all" || p.year === pubState.year) && matches(p, pubState.q);
      });
      if (pubCount) pubCount.innerHTML = "<b>" + list.length + "</b> " + T.pubs;
      var byYear = {};
      list.forEach(function (p) {
        (byYear[p.year] = byYear[p.year] || []).push(p);
      });
      var html = "";
      Object.keys(byYear).sort(function (a, b) { return Number(b) - Number(a); }).forEach(function (y) {
        html += '<section class="year-group" id="y' + y + '"><div class="year-label"><span>' +
          (LANG === "zh" ? "年份" : "YEAR") + "</span><b>" + y + "</b></div><div class='year-list'>";
        byYear[y].forEach(function (p) {
          var main = LANG === "zh" && p.title_cn ? p.title_cn : p.title;
          var sub = LANG === "zh" && p.title_cn ? p.title : "";
          var isTop = TOP.indexOf(p.venue) !== -1;
          var q = encodeURIComponent(p.title);
          html += '<article class="pub">' +
            '<div class="pub__main"><div class="pub__head"><span class="pub__n">' + p.num + '</span>' +
            '<div><h3><a href="https://scholar.google.com/scholar?q=' + q + '" target="_blank" rel="noopener">' +
            esc(main) + "</a></h3>" +
            (sub ? '<p class="pub__cn">' + esc(sub) + "</p>" : "") +
            '<p class="pub__authors">' + deemphasize(p.authors) + "</p></div></div></div>" +
            '<div class="pub__side"><span class="venue' + (isTop ? " venue--top" : "") + '">' +
            esc(p.venue || T.venue) + "</span>" +
            '<p class="pub__tail">' + esc(p.tail) + "</p>" +
            '<a class="pub-row__link" href="https://scholar.google.com/scholar?q=' + q +
            '" target="_blank" rel="noopener">' + T.scholar + " ↗</a></div></article>";
        });
        html += "</div></section>";
      });
      pubsRoot.innerHTML = html || '<p class="empty is-on">' + T.empty + "</p>";
    }
    renderPubs();
  }

  /* ---------- press ---------- */
  var pressRoot = document.getElementById("pressRoot");
  if (pressRoot) {
    var pressSearch = document.getElementById("pressSearch");
    var pressChips = document.getElementById("pressChips");
    var pressCount = document.getElementById("pressCount");
    var prState = { q: "", year: "all" };
    years(DATA.press, "year").forEach(function (y) {
      pressChips && pressChips.appendChild(chip(y, y, false));
    });
    if (pressSearch) {
      pressSearch.placeholder = T.searchPress;
      pressSearch.addEventListener("input", function () {
        prState.q = this.value.trim().toLowerCase();
        renderPress();
      });
    }
    if (pressChips) {
      pressChips.addEventListener("click", function (e) {
        var b = e.target.closest(".chip");
        if (!b) return;
        prState.year = b.dataset.value;
        pressChips.querySelectorAll(".chip").forEach(function (c) {
          c.classList.toggle("is-active", c === b);
        });
        renderPress();
      });
    }

    function renderPress() {
      var list = DATA.press.filter(function (p) {
        return (prState.year === "all" || p.year === prState.year) &&
          (!prState.q || (p.outlet + " " + p.title).toLowerCase().indexOf(prState.q) !== -1);
      });
      if (pressCount) pressCount.innerHTML = "<b>" + list.length + "</b> " + T.items;
      var byYear = {};
      list.forEach(function (p) { (byYear[p.year] = byYear[p.year] || []).push(p); });
      var html = "";
      Object.keys(byYear).sort(function (a, b) { return Number(b) - Number(a); }).forEach(function (y) {
        html += '<section class="year-group" id="p' + y + '"><div class="year-label"><span>' +
          (LANG === "zh" ? "年份" : "YEAR") + "</span><b>" + y + "</b></div><div class='year-list'>";
        byYear[y].forEach(function (p) {
          html += '<article class="press-row"><time class="press-row__date" datetime="' + p.date + '">' +
            p.date + '</time><span class="press-row__outlet">' + esc(p.outlet) + "</span>" +
            "<h3>" + (p.url ? '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>" : esc(p.title)) + "</h3>" +
            '<span class="press-row__arw">' + (p.url ? "↗" : "") + "</span></article>";
        });
        html += "</div></section>";
      });
      pressRoot.innerHTML = html || '<p class="empty is-on">' + T.empty + "</p>";
    }
    renderPress();
  }

  /* ---------- people ---------- */
  var peopleRoot = document.getElementById("peopleRoot");
  if (peopleRoot) {
    var peopleSearch = document.getElementById("peopleSearch");
    var peopleCount = document.getElementById("peopleCount");
    var pq = "";
    if (peopleSearch) {
      peopleSearch.placeholder = T.searchPeople;
      peopleSearch.addEventListener("input", function () {
        pq = this.value.trim().toLowerCase();
        renderPeople();
      });
    }

    function initials(name) {
      var parts = name.replace(/[^A-Za-z\u4e00-\u9fff\s.-]/g, "").trim().split(/\s+/);
      if (/[\u4e00-\u9fff]/.test(name)) return name.slice(0, 1);
      return ((parts[0] || "")[0] || "") + ((parts[parts.length - 1] || "")[0] || "");
    }

    function personSlug(name) {
      return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }

    function renderPeople() {
      var list = DATA.people.filter(function (p) {
        return !pq || (p.name + " " + p.affiliation).toLowerCase().indexOf(pq) !== -1;
      }).sort(function (a, b) { return a.name.localeCompare(b.name); });
      if (peopleCount) peopleCount.innerHTML = "<b>" + list.length + "</b> " + T.items;
      peopleRoot.innerHTML = list.map(function (p) {
        var slug = personSlug(p.name);
        return '<article class="person"><span class="person__av"><span>' + esc(initials(p.name).toUpperCase()) + "</span>" +
          (slug ? '<img src="assets/img/people/' + slug + '.jpg" alt="" loading="lazy" data-optional>' : "") + "</span>" +
          '<div class="person__txt"><b>' + esc(p.name) + "</b><span>" + esc(p.affiliation) + "</span></div></article>";
      }).join("") || '<p class="empty is-on">' + T.empty + "</p>";
      wireOptionalImages(peopleRoot);
    }
    renderPeople();
  }

  /* ---------- copy email ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () {
        var old = btn.textContent;
        btn.textContent = T.copied;
        setTimeout(function () { btn.textContent = old; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  });

  /* ---------- gentle parallax on hero art ---------- */
  var heroBg = document.querySelector(".hero__bg");
  if (heroBg && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 900);
        heroBg.style.transform = "scale(1.04) translateY(" + (y * 0.08) + "px)";
        ticking = false;
      });
    }, { passive: true });
  }
})();
