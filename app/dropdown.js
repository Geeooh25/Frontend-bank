
document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const header = document.querySelector('.app-header');
  const headerNav = document.querySelector('.app-header-navigation .tabs');

  if (!toggleBtn || !header || !headerNav) return;

  // create dropdown inside header
  let dropdown = document.getElementById('mobile-header-dropdown');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.id = 'mobile-header-dropdown';
    const tabsClone = headerNav.cloneNode(true);
    dropdown.appendChild(tabsClone);
    header.appendChild(dropdown);
  }

  // toggle open/close
  toggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  // close dropdown if click outside
  document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

  // close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') dropdown.classList.remove('open');
  });
});

