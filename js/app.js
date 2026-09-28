// DroidVault web portal — shared JS
const API = 'https://vesper-bb9e7612.base44.app/functions/droidvaultLicense';

async function callApi(payload) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Copy helper — works with all copy buttons on the page
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.copybtn');
  if (!btn) return;
  const target = document.querySelector(btn.dataset.target);
  const text = target ? (target.innerText || target.textContent).trim()
                      : (btn.dataset.text || '');
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy'); ta.remove();
  }
  const old = btn.textContent;
  btn.textContent = 'Copied ✓';
  setTimeout(() => { btn.textContent = old; }, 1600);
});

// Show a result box (el = element, ok = success?, title, metaHTML)
function showResult(el, ok, title, metaHTML) {
  el.className = 'result ' + (ok ? 'ok' : 'bad');
  el.innerHTML = '<div class="big">' + title + '</div>' +
    (metaHTML ? '<div class="meta">' + metaHTML + '</div>' : '');
  el.style.display = 'block';
}
function hideResult(el) { el.style.display = 'none'; }

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
