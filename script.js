document.addEventListener('DOMContentLoaded', function () {
  initGate();
  initAudioPanel();
});

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* Gate: only runs on pages that have the #gate-form element (index.html) */
function initGate() {
  var form = document.getElementById('gate-form');
  if (!form) return;

  var input = document.getElementById('gate-input');
  var hint = document.getElementById('gate-hint');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var slug = slugify(input.value);
    if (!slug) return;

    // Redirects to a page named after the entered word/phrase, e.g.
    // "About" -> about.html, "42" -> 42.html
    // Swap this line out for a fixed lookup table if you'd rather only
    // allow a specific set of known entries.
    window.location.href = slug + '.html';
  });

  input.addEventListener('input', function () {
    input.classList.remove('shake');
    hint.classList.remove('visible');
  });
}

/* Audio panel: only runs on pages that have the #audio-toggle element */
function initAudioPanel() {
  var button = document.getElementById('audio-toggle');
  if (!button) return;

  var audio = document.getElementById('panel-audio');
  var visual = document.getElementById('audio-visual');
  var label = document.getElementById('audio-label');

  button.addEventListener('click', function () {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', function () {
    button.classList.add('is-playing');
    visual.classList.add('is-playing');
    if (label) label.textContent = 'Pause';
  });

  audio.addEventListener('pause', function () {
    button.classList.remove('is-playing');
    visual.classList.remove('is-playing');
    if (label) label.textContent = 'Play the tone';
  });

  audio.addEventListener('ended', function () {
    button.classList.remove('is-playing');
    visual.classList.remove('is-playing');
    if (label) label.textContent = 'Play the tone';
  });
}
