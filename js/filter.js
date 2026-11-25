(function () {
  "use strict";

  function initFilterBar(bar) {
    var target = document.querySelector(bar.getAttribute("data-filter-target"));
    if (!target) return;

    var emptySelector = bar.getAttribute("data-filter-empty");
    var empty = emptySelector ? document.querySelector(emptySelector) : null;
    var chips = Array.prototype.slice.call(bar.querySelectorAll(".chip"));
    var items = Array.prototype.slice.call(target.querySelectorAll("[data-category]"));

    function apply(filter) {
      var visible = 0;

      items.forEach(function (item) {
        var match = filter === "all" || item.getAttribute("data-category") === filter;
        item.hidden = !match;
        if (match) visible += 1;
      });

      chips.forEach(function (chip) {
        var active = chip.getAttribute("data-filter") === filter;
        chip.classList.toggle("is-active", active);
        chip.setAttribute("aria-pressed", active ? "true" : "false");
      });

      if (empty) empty.hidden = visible !== 0;
    }

    bar.addEventListener("click", function (event) {
      var chip = event.target.closest(".chip");
      if (!chip || !bar.contains(chip)) return;
      apply(chip.getAttribute("data-filter"));
    });

    var initial = chips.filter(function (c) {
      return c.classList.contains("is-active");
    })[0];
    apply(initial ? initial.getAttribute("data-filter") : "all");
  }

  document.querySelectorAll("[data-filter-bar]").forEach(initFilterBar);
})();
