document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("menuGrid");
  var emptyState = document.getElementById("emptyState");
  var searchInput = document.getElementById("searchInput");
  var categoryFilters = document.getElementById("categoryFilters");
  var vegFilters = document.getElementById("vegFilters");

  var state = {
    category: "All",
    search: "",
    veg: "all"
  };

  function buildCategoryButtons() {
    var categories = ["All"];
    menuData.forEach(function (item) {
      if (categories.indexOf(item.category) === -1) {
        categories.push(item.category);
      }
    });

    categories.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.className = "filter-chip" + (cat === "All" ? " active" : "");
      btn.textContent = cat;
      btn.setAttribute("data-category", cat);
      btn.addEventListener("click", function () {
        state.category = cat;
        Array.from(categoryFilters.querySelectorAll(".filter-chip")).forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        render();
      });
      categoryFilters.appendChild(btn);
    });
  }

  function createCard(item) {
    var col = document.createElement("div");
    col.className = "col-sm-6 col-lg-3";

    var vegClass = item.is_veg ? "veg" : "non-veg";
    var unavailableClass = item.available ? "" : "unavailable";
    var badge = item.available ? "" : '<span class="unavailable-badge">Unavailable</span>';
    var buttonState = item.available
      ? '<button class="btn btn-sm btn-brand">Add to Order</button>'
      : '<button class="btn btn-sm btn-secondary" disabled>Not Available</button>';

    col.innerHTML =
      '<div class="menu-card ' + unavailableClass + '">' +
        badge +
        '<img src="' + item.image + '" alt="' + item.name + '">' +
        '<div class="p-3">' +
          '<div class="d-flex justify-content-between align-items-start mb-1">' +
            '<h5 class="mb-0">' + item.name + '</h5>' +
            '<span class="veg-indicator ' + vegClass + '"><span class="veg-dot"></span></span>' +
          '</div>' +
          '<p class="text-uppercase small fw-semibold mb-2" style="color: var(--brand-accent); letter-spacing: 0.05em;">' + item.category + '</p>' +
          '<p class="text-muted small mb-3">' + item.description + '</p>' +
          '<div class="d-flex justify-content-between align-items-center">' +
            '<span class="menu-card-price">৳' + item.price + '</span>' +
            buttonState +
          '</div>' +
        '</div>' +
      '</div>';

    return col;
  }

  function render() {
    var searchTerm = state.search.trim().toLowerCase();

    var filtered = menuData.filter(function (item) {
      var matchesCategory = state.category === "All" || item.category === state.category;
      var matchesSearch = item.name.toLowerCase().indexOf(searchTerm) !== -1;
      var matchesVeg =
        state.veg === "all" ||
        (state.veg === "veg" && item.is_veg) ||
        (state.veg === "non-veg" && !item.is_veg);
      return matchesCategory && matchesSearch && matchesVeg;
    });

    grid.innerHTML = "";

    if (filtered.length === 0) {
      emptyState.classList.remove("d-none");
    } else {
      emptyState.classList.add("d-none");
      filtered.forEach(function (item) {
        grid.appendChild(createCard(item));
      });
    }
  }

  searchInput.addEventListener("input", function (e) {
    state.search = e.target.value;
    render();
  });

  Array.from(vegFilters.querySelectorAll(".veg-toggle-btn")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.veg = btn.getAttribute("data-veg");
      Array.from(vegFilters.querySelectorAll(".veg-toggle-btn")).forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      render();
    });
  });

  buildCategoryButtons();
  render();
});
