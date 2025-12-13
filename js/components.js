async function loadComponent(id, file) {
  try {
    const html = await fetch(file).then((res) => res.text());
    document.getElementById(id).innerHTML = html;
    // Ensure AOS rescans new elements
    requestAnimationFrame(() => {
      AOS.refreshHard();
    });
  } catch (e) {
    console.error("Error loading component:", file, e);
  }
}
