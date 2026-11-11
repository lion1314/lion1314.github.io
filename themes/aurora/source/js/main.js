/* aurora — 轻量交互：主题切换 / 移动菜单 / 回到顶部 / 复制代码 / 目录高亮 */
(function () {
  'use strict';
  var root = document.documentElement;

  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('aurora-theme', next); } catch (e) {}
    });
  }

  var menuBtn = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var back = document.getElementById('backTop');
  if (back) {
    var onScroll = function () {
      if (window.scrollY > 420) back.classList.add('show');
      else back.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    back.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function addCopy(host, source) {
    if (!host || !source) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = '复制';
    btn.setAttribute('aria-label', '复制代码');
    btn.addEventListener('click', function () {
      var text = source.innerText || source.textContent || '';
      var done = function () {
        btn.textContent = '已复制';
        setTimeout(function () { btn.textContent = '复制'; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { btn.textContent = '失败'; });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { btn.textContent = '失败'; }
        document.body.removeChild(ta);
      }
    });
    host.appendChild(btn);
  }

  document.querySelectorAll('.entry figure.highlight').forEach(function (fig) {
    addCopy(fig, fig.querySelector('td.code pre') || fig.querySelector('pre'));
  });
  document.querySelectorAll('.entry pre').forEach(function (pre) {
    if (!pre.closest('figure.highlight')) addCopy(pre, pre);
  });

  var links = document.querySelectorAll('.toc-body .toc-link');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) {
      var id = decodeURIComponent((a.getAttribute('href') || '').replace(/^#/, ''));
      if (id) map[id] = a;
    });
    var targets = document.querySelectorAll('.entry h2[id], .entry h3[id]');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('active'); });
        if (map[entry.target.id]) map[entry.target.id].classList.add('active');
      });
    }, { rootMargin: '-90px 0px -70% 0px' });
    targets.forEach(function (t) { observer.observe(t); });
  }
})();
