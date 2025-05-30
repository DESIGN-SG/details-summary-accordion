document.querySelectorAll(".accordion").forEach((el) => {
  const summary = el.querySelector(".accordion-head");
  const content = Array.from(el.children).filter((child) => child !== summary);

  el.style.overflow = "hidden";
  el.style.maxHeight = summary.offsetHeight + "px";

  summary.addEventListener("click", (e) => {
    e.preventDefault();
    closeOtherAccordions(el);
    toggleAccordion(el, summary, content);
  });

  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeOtherAccordions(el);
      toggleAccordion(el, summary, content);
    }
  });
});

window.addEventListener("resize", () => {
 document.querySelectorAll(".accordion").forEach((el) => {
    const summary = el.querySelector(".accordion-head");
    const content = Array.from(el.children).filter((child) => child !== summary);
    updateAccordionHeight(el, summary, content);
  });
});

function closeOtherAccordions(current) {
  document.querySelectorAll(".accordion[open]").forEach((el) => {
    if (el !== current) {
      const summary = el.querySelector(".accordion-head");
      const content = Array.from(el.children).filter((child) => child !== summary);
      closeAccordion(el, summary, content);
    }
  });
}

function toggleAccordion(el, summary, content) {
  if (!el.open) {
    el.open = true;
    requestAnimationFrame(() => {
      updateAccordionHeight(el, summary, content);
    });
  } else {
    closeAccordion(el, summary, content);
  }
}

function updateAccordionHeight(el, summary, content) {
  const contentHeight = content.reduce((acc, el) =>
    acc + el.offsetHeight + parseFloat(getComputedStyle(el).marginTop || 0), 0);
  if (el.open) {
    el.style.maxHeight = summary.offsetHeight + contentHeight + "px";
  } else {
    el.style.maxHeight = summary.offsetHeight + "px";
  }
}

function closeAccordion(el, summary, content) {
  const contentHeight = content.reduce((acc, el) =>
    acc + el.offsetHeight + parseFloat(getComputedStyle(el).marginTop || 0), 0);
  el.style.maxHeight = summary.offsetHeight + contentHeight + "px";

  requestAnimationFrame(() => {
    el.style.maxHeight = summary.offsetHeight + "px";

    setTimeout(() => {
      el.open = false;
      el.style.maxHeight = summary.offsetHeight + "px";
    }, 400);
  });
}
