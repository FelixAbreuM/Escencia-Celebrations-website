(() => {
  const collections = {
    weddings: {
      title: "Wedding Portfolio",
      description: "Wedding décor, floral details, and personalized reception touches.",
      photos: [
        ["GRW09713.jpg", "Wedding table with white roses and personalized details"],
        ["GRW09746.jpg", "Personalized wedding welcome sign"],
        ["GRW09754.jpg", "Mirror seating chart and floral accent"],
        ["GRW09781.jpg", "Floral dessert table display"],
        ["GWD02855.jpg", "Wedding reception table setting"],
        ["GWD02866.jpg", "Teal and gold reception table styling"],
        ["GWD02883.jpg", "Sculptural ceremony backdrop with floral accents"],
        ["GWD03387.jpg", "Couple beneath a floral ceremony backdrop"]
      ]
    },
    birthdays: {
      title: "Birthday Portfolio",
      description: "A themed birthday celebration with a custom balloon installation.",
      photos: [["Minnies_birthday.jpg", "Pink, white, and lavender balloon arch for a themed birthday"]]
    },
    celebrations: {
      title: "Other Celebrations Portfolio",
      description: "Anniversary, themed, and private celebration décor.",
      photos: [
        ["Anniversary.jpg", "Blue and gold anniversary balloon display"],
        ["Even-2.jpg", "Colorful balloon installation for a themed celebration"],
        ["Event-1.jpg", "Black and rose balloon backdrop"],
        ["Private_event.jpg", "Pink and black balloon décor for a private celebration"]
      ]
    }
  };

  const categoryButtons = [...document.querySelectorAll("[data-category]")];
  const gallery = document.getElementById("gallery-grid");
  const galleryTitle = document.getElementById("gallery-title");
  const galleryDescription = document.getElementById("gallery-description");
  const galleryCount = document.getElementById("gallery-count");

  function showCollection(category) {
    const collection = collections[category];
    if (!collection) return;
    galleryTitle.textContent = collection.title;
    galleryDescription.textContent = collection.description;
    galleryCount.textContent = `${collection.photos.length} ${collection.photos.length === 1 ? "selected photo" : "selected photos"}`;
    gallery.replaceChildren(...collection.photos.map(([file, alt]) => {
      const figure = document.createElement("figure");
      figure.className = "gallery-item col-6 col-md-4";
      const image = document.createElement("img");
      image.src = `assets/${category}/${file}`;
      image.alt = alt;
      image.loading = "lazy";
      const caption = document.createElement("figcaption");
      caption.textContent = alt;
      figure.append(image, caption);
      return figure;
    }));
    categoryButtons.forEach(button => {
      const active = button.dataset.category === category;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("is-active", active);
    });
  }

  categoryButtons.forEach(button => button.addEventListener("click", () => showCollection(button.dataset.category)));
  showCollection("weddings");

  const bookingUrl = window.ESCENCIA_SITE_CONFIG?.bookingPageUrl?.trim();
  ["nav-book", "hero-book", "calendar-button"].forEach(id => {
    const button = document.getElementById(id);
    if (!button) return;
    if (bookingUrl) {
      button.href = bookingUrl;
      button.target = "_blank";
      button.rel = "noopener noreferrer";
    }
  });
  if (bookingUrl) {
    document.getElementById("calendar-note").textContent = "The booking page opens in a new tab. Choose an available one-hour appointment with Lorena.";
  }

  // Bootstrap Collapse manages the responsive menu and closes it after a visitor follows a link.
  const nav = document.getElementById("main-nav");
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    if (nav.classList.contains("show")) {
      window.bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  }));

  const form = document.getElementById("quote-form");
  const status = document.getElementById("form-status");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const endpoint = window.ESCENCIA_SITE_CONFIG?.quoteSubmissionUrl?.trim();
    if (form.elements.website.value) return;
    // If delivery is not configured, direct the visitor to the existing call/text fallback.
    if (!endpoint) {
      status.textContent = "The online quote form is being connected. Please call or text at 914-837-9325 for now.";
      status.className = "form-status is-error";
      return;
    }
    const submitButton = document.getElementById("quote-submit");
    submitButton.disabled = true;
    status.textContent = "Sending your request…";
    status.className = "form-status";
    // Send the form and convert unsuccessful responses into the existing error-message path.
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("The request could not be sent.");
      form.reset();
      status.textContent = "Thank you! Your quote request was received. We will follow up by call or text.";
      status.className = "form-status is-success";
    } catch {
      // Explain the failure and give the visitor a way to contact Lorena directly.
      status.textContent = "We couldn’t send the request just now. Please call or text at 914-837-9325.";
      status.className = "form-status is-error";
    } finally {
      submitButton.disabled = false;
    }
  });
})();

// Opens gallery photos in a responsive Bootstrap modal, including keyboard activation.
(() => {
  const gallery = document.getElementById("gallery-grid");
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.tabIndex = -1;
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = '<div class="modal-dialog modal-dialog-centered modal-xl"><div class="modal-content bg-transparent border-0"><div class="modal-body p-0"><button class="btn-close btn-close-white gallery-lightbox-close" type="button" data-bs-dismiss="modal" aria-label="Close enlarged photo"></button><img class="gallery-lightbox-image" alt=""><p class="gallery-lightbox-caption"></p></div></div></div>';
  document.body.append(modal);
  const enlarged = modal.querySelector(".gallery-lightbox-image");
  const caption = modal.querySelector(".gallery-lightbox-caption");

  function preparePhotos() {
    gallery.querySelectorAll(".gallery-item img").forEach(image => {
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", `View larger image: ${image.alt}`);
    });
  }
  function openPhoto(image) {
    enlarged.src = image.src;
    enlarged.alt = image.alt;
    caption.textContent = image.alt;
    window.bootstrap.Modal.getOrCreateInstance(modal).show();
  }
  preparePhotos();
  document.querySelectorAll("[data-category]").forEach(button => button.addEventListener("click", preparePhotos));
  gallery.addEventListener("click", event => {
    const image = event.target.closest(".gallery-item img");
    if (image) openPhoto(image);
  });
  gallery.addEventListener("keydown", event => {
    const image = event.target.closest(".gallery-item img");
    if (image && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openPhoto(image);
    }
  });
})();
