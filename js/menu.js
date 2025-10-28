document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".index_header_nav .menu");

  if (!toggle || !menu) {
    console.error("ERROR: .menu-toggle o .index_header_nav .menu no encontrados.");
    console.log("menu-toggle:", toggle, "menu:", menu);
    return;
  }

  // Inicializar aria
  toggle.setAttribute("aria-expanded", "false");

  const openMenu = () => {
    menu.classList.add("active");
    toggle.textContent = "✖";
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // evita scroll de fondo
    console.log("Menú abierto");
  };

  const closeMenu = () => {
    menu.classList.remove("active");
    toggle.textContent = "☰";
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    console.log("Menú cerrado");
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation(); // evitar que el clic burbujee y cierre inmediatamente
    if (menu.classList.contains("active")) closeMenu();
    else openMenu();
  });

  // Cerrar al hacer clic en un link (útil en móvil)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 600 && menu.classList.contains("active")) {
        closeMenu();
      }
    });
  });

  // Cerrar al hacer clic fuera del menú cuando está abierto
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) return;
    if (menu.contains(e.target) || toggle.contains(e.target)) return;
    closeMenu();
  });

  // Al cambiar de tamaño, restaurar estado para escritorio
  const handleResize = () => {
    if (window.innerWidth > 600) {
      // En escritorio siempre queremos el menú visible en su forma normal
      if (menu.classList.contains("active")) closeMenu();
      // no forzamos estilos inline; CSS se encargará
    }
  };
  window.addEventListener("resize", handleResize);

  // Llamada inicial (por si se carga ya en >600px)
  handleResize();

  console.log("Script de menú inicializado correctamente");
});
