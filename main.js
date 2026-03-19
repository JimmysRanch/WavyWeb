const navButton = document.getElementById("nav-btn");
const takeoverNav = document.getElementById("takeover-nav");
const stickyNav = document.querySelector(".sticky-nav");
const cursor = document.querySelector(".custom-cursor");
const navLinks = document.querySelectorAll("#takeover-nav a");
const lineTop = document.getElementById("line-top");
const lineMiddle = document.getElementById("line-middle");
const lineBottom = document.getElementById("line-bottom");

const setMenuState = (isOpen) => {
  if (!navButton || !takeoverNav || !stickyNav) {
    return;
  }

  takeoverNav.classList.toggle("shown", isOpen);
  stickyNav.classList.toggle("difference", !isOpen);
  stickyNav.classList.toggle("is-open", isOpen);
  document.documentElement.classList.toggle("nav-open", isOpen);
  navButton.setAttribute("aria-expanded", String(isOpen));
  takeoverNav.setAttribute("aria-hidden", String(!isOpen));

  if (lineTop && lineMiddle && lineBottom) {
    if (isOpen) {
      lineTop.setAttribute("d", "M35 35 L65 65");
      lineMiddle.style.opacity = "0";
      lineBottom.setAttribute("d", "M35 65 L65 35");
    } else {
      lineTop.setAttribute("d", "M30 37 H70");
      lineMiddle.style.opacity = "1";
      lineBottom.setAttribute("d", "M30 63 H70");
    }
  }
};

if (navButton) {
  navButton.addEventListener("click", () => {
    const isOpen = navButton.getAttribute("aria-expanded") !== "true";
    setMenuState(isOpen);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

if (cursor) {
  const interactiveElements = document.querySelectorAll("a, button, input.btn");
  let cursorVisible = false;
  let cursorX = 0;
  let cursorY = 0;

  const moveCursor = (x, y) => {
    cursorX = x;
    cursorY = y;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(${
      cursor.classList.contains("custom-cursor--link") ? 1.25 : 0.3
    })`;
  };

  const showCursor = () => {
    if (!cursorVisible) {
      cursor.style.opacity = "1";
      cursorVisible = true;
    }
  };

  const hideCursor = () => {
    cursor.style.opacity = "0";
    cursorVisible = false;
  };

  interactiveElements.forEach((element) => {
    element.addEventListener("pointerenter", () => {
      cursor.classList.add("custom-cursor--link");
      moveCursor(cursorX, cursorY);
    });
    element.addEventListener("pointerleave", () => {
      cursor.classList.remove("custom-cursor--link");
      moveCursor(cursorX, cursorY);
    });
  });

  window.addEventListener("pointermove", (event) => {
    showCursor();
    moveCursor(event.clientX, event.clientY);
  });

  window.addEventListener("pointerdown", showCursor);
  window.addEventListener("pointerleave", hideCursor);
  window.addEventListener("blur", hideCursor);
}

setMenuState(false);
