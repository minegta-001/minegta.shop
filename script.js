/* --------------------------------------------------------------------------
   1. MASTER LUXURY PROCEDURAL SOUND ENGINE (EMBEDDED WEB AUDIO API)
   -------------------------------------------------------------------------- */
let audioCtx = null;
let soundEnabled = true;
const soundToggle = document.getElementById('soundToggle');

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Global unlock on initial user engagement
['pointerdown', 'keydown', 'scroll'].forEach(evt => {
  window.addEventListener(evt, () => getAudioContext(), { once: true, passive: true });
});

function playSound(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    function makeTone(freq, endFreq, gainVal, dur, waveType = 'sine', filterFreq = 0) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = waveType;
      osc.frequency.setValueAtTime(freq, now);
      if (endFreq && endFreq !== freq) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + dur);
      }
      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      if (filterFreq) {
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(filterFreq, now);
        osc.connect(filter);
        filter.connect(gain);
      } else {
        osc.connect(gain);
      }
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur + 0.05);
    }

    switch(type) {
      case 'hover':
        // Soft airy glass hover shimmer
        makeTone(580, 840, 0.012, 0.06, 'sine', 2200);
        break;

      case 'click':
        // Tactile luxury snap (dual tone: punch + crisp)
        makeTone(180, 80, 0.045, 0.06, 'sine');
        makeTone(920, 1400, 0.03, 0.08, 'triangle', 2600);
        break;

      case 'tilt':
        // Magnetic 3D tilt depth resonance
        makeTone(340, 480, 0.014, 0.12, 'sine', 1800);
        break;

      case 'modal-open':
        // Imperial emerald vault swell (deep cinematic rise)
        makeTone(95, 220, 0.07, 0.28, 'sine');
        makeTone(380, 760, 0.035, 0.24, 'triangle', 1600);
        break;

      case 'modal-close':
        // Gentle dissipation sweep down
        makeTone(440, 180, 0.035, 0.18, 'sine', 1400);
        break;

      case 'swipe':
      case 'nav':
        // Aerodynamic transition whoosh
        makeTone(320, 680, 0.03, 0.14, 'sine', 1900);
        makeTone(640, 320, 0.018, 0.16, 'triangle');
        break;

      case 'zoom':
        // Camera lens shutter & cinematic focus snap
        makeTone(720, 1280, 0.04, 0.07, 'triangle');
        makeTone(1400, 900, 0.025, 0.09, 'sine');
        break;

      case 'filter':
        // Holographic category slide arpeggio
        [0, 0.03, 0.06].forEach((delay, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime([520, 680, 880][i], now + delay);
          gain.gain.setValueAtTime(0.022, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.09);
        });
        break;

      case 'reveal':
        // Ethereal celestial shimmer for sections scrolling into view
        [0, 0.04, 0.08].forEach((delay, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime([587.33, 739.99, 880.00][i], now + delay);
          gain.gain.setValueAtTime(0.016, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.2);
        });
        break;

      case 'qr':
        // High-tech verification pulse
        makeTone(880, 1320, 0.04, 0.12, 'sine', 3000);
        break;

      case 'copy':
        // Rich satisfying reward chime (coin / gold shimmer)
        [0, 0.06].forEach((delay, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime([1046.5, 1318.5][i], now + delay);
          gain.gain.setValueAtTime(0.045, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.28);
        });
        break;

      case 'pay':
      case 'success':
        // Grand royal emerald fanfare chord (C4, G4, C5, E5)
        [0, 0.06, 0.12, 0.18].forEach((delay, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime([261.63, 392.00, 523.25, 659.25][i], now + delay);
          gain.gain.setValueAtTime(0.055, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.48);
        });
        break;

      case 'tab':
        // Sleek mechanical glass tab glide
        makeTone(440, 720, 0.03, 0.08, 'sine');
        break;

      case 'toggle':
        // Crisp tactile switch
        makeTone(620, 980, 0.035, 0.06, 'triangle');
        break;

      case 'toast':
        // Modern crystal notification ping
        makeTone(660, 990, 0.035, 0.14, 'sine', 2800);
        break;

      case 'warning':
        // Deep velvet warning tone
        makeTone(220, 140, 0.06, 0.22, 'sawtooth', 600);
        break;

      case 'dock':
        // Subtle floating header lock click
        makeTone(820, 420, 0.015, 0.05, 'sine');
        break;

      case 'sparkle':
        // Whisper particle interaction
        makeTone(1600 + Math.random() * 400, 2200, 0.008, 0.07, 'sine', 3500);
        break;

      default:
        makeTone(540, 780, 0.02, 0.06, 'sine');
    }
  } catch(e) {}
}

soundToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundToggle.classList.toggle('is-muted', !soundEnabled);
  if (soundEnabled) playSound('toggle');
});

/* --------------------------------------------------------------------------
   2. ULTRA-SMOOTH GREEN SNOW & GOLDEN RAIN CANVAS WEATHER ENGINE
   -------------------------------------------------------------------------- */
(function() {
  const canvas = document.getElementById('weatherCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let W = window.innerWidth;
  let H = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let snowFlakes = [];
  let rainDrops = [];
  let lastTime = performance.now();
  let rafId = 0;
  
  // Mouse position for interactive particle physics
  let mouse = { x: -9999, y: -9999, vx: 0, vy: 0, lastX: 0, lastY: 0 };
  let lastSparkleSound = 0;
  
  window.addEventListener('mousemove', e => {
    mouse.vx = (e.clientX - mouse.lastX) * 0.25;
    mouse.vy = (e.clientY - mouse.lastY) * 0.25;
    mouse.lastX = e.clientX;
    mouse.lastY = e.clientY;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });
  
  window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    // Scale count with screen area
    const totalFlakes = Math.min(180, Math.max(70, Math.floor(W / 9)));
    const totalRain = Math.min(75, Math.max(30, Math.floor(W / 24)));
    
    snowFlakes = Array.from({ length: totalFlakes }, () => makeSnow(true));
    rainDrops = Array.from({ length: totalRain }, () => makeRain(true));
  }

  function makeSnow(initial) {
    const isGold = Math.random() < 0.28;
    return {
      x: Math.random() * W,
      y: initial ? Math.random() * H : -15 - Math.random() * 60,
      r: 1.1 + Math.random() * 2.8,
      baseSpeed: 0.35 + Math.random() * 0.85,
      drift: 0.4 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.35 + Math.random() * 0.55,
      isGold: isGold,
      color: isGold ? 'rgba(255, 246, 204, ' : (Math.random() < 0.4 ? 'rgba(16, 255, 158, ' : 'rgba(110, 231, 183, '),
      vx: 0,
      vy: 0
    };
  }

  function makeRain(initial) {
    return {
      x: Math.random() * (W + 150) - 75,
      y: initial ? Math.random() * H : -30 - Math.random() * 120,
      len: 12 + Math.random() * 22,
      speed: 5.5 + Math.random() * 6.5,
      wind: 0.9 + Math.random() * 1.1,
      alpha: 0.12 + Math.random() * 0.22,
      color: Math.random() < 0.4 ? 'rgba(247, 231, 178, ' : 'rgba(0, 245, 155, '
    };
  }

  function animate(now) {
    const dt = Math.min(32, now - lastTime);
    lastTime = now;
    const t = now * 0.001;
    ctx.clearRect(0, 0, W, H);

    /* --- SILKY GREEN & GOLD RAIN --- */
    ctx.lineCap = 'round';
    for (let i = 0; i < rainDrops.length; i++) {
      const d = rainDrops[i];
      d.y += d.speed * dt * 0.06;
      d.x += d.wind * dt * 0.06;

      if (d.y > H + 40 || d.x > W + 80) {
        Object.assign(d, makeRain(false));
      }

      const grad = ctx.createLinearGradient(d.x, d.y, d.x + d.wind * 2, d.y + d.len);
      grad.addColorStop(0, d.color + '0)');
      grad.addColorStop(0.5, d.color + d.alpha + ')');
      grad.addColorStop(1, d.color + '0)');
      
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.wind * 1.5, d.y + d.len);
      ctx.stroke();
    }

    /* --- SMOOTH GLOWING GREEN & GOLD SNOW WITH MOUSE DRIFT --- */
    for (let i = 0; i < snowFlakes.length; i++) {
      const f = snowFlakes[i];

      // Natural harmonic float
      f.y += (f.baseSpeed + f.vy) * dt * 0.055;
      f.x += (Math.sin(t * 0.6 + f.phase) * f.drift + f.vx) * dt * 0.045;

      // Mouse interactive fluid repulsion
      const dx = f.x - mouse.x;
      const dy = f.y - mouse.y;
      const distSq = dx * dx + dy * dy;
      const repelDist = 120;
      if (distSq < repelDist * repelDist && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / repelDist) * 1.8;
        f.vx += (dx / dist) * force;
        f.vy += (dy / dist) * force;

        const spdSq = mouse.vx * mouse.vx + mouse.vy * mouse.vy;
        if (spdSq > 35 && now - lastSparkleSound > 280) {
          lastSparkleSound = now;
          playSound('sparkle');
        }
      }
      f.vx *= 0.94;
      f.vy *= 0.94;

      if (f.y > H + 15) {
        Object.assign(f, makeSnow(false));
      }
      if (f.x < -20) f.x = W + 15;
      if (f.x > W + 20) f.x = -15;

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = f.color + f.alpha + ')';
      
      // Soft glow
      if (f.r > 2.0) {
        ctx.shadowBlur = 12;
        ctx.shadowColor = f.isGold ? 'rgba(255, 230, 150, 0.9)' : 'rgba(0, 245, 155, 0.9)';
      } else {
        ctx.shadowBlur = 6;
        ctx.shadowColor = f.isGold ? 'rgba(247, 231, 178, 0.6)' : 'rgba(0, 245, 155, 0.6)';
      }
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    rafId = requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      lastTime = performance.now();
      rafId = requestAnimationFrame(animate);
    }
  });
  rafId = requestAnimationFrame(animate);
})();

/* --------------------------------------------------------------------------
   3. DUAL-ELEMENT MAGNETIC CURSOR & PARTICLE SPARK TRAILS
   -------------------------------------------------------------------------- */
(function() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let ringX = targetX;
  let ringY = targetY;
  let lastSpark = 0;

  window.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
    dot.style.left = targetX + 'px';
    dot.style.top = targetY + 'px';

    // Spawn tiny emerald/gold trailing sparks on move
    const now = performance.now();
    if (now - lastSpark > 45) {
      lastSpark = now;
      createSpark(targetX, targetY);
    }
  }, { passive: true });

  function createSpark(x, y) {
    const spark = document.createElement('div');
    spark.className = 'cursor-spark';
    const isGold = Math.random() < 0.4;
    const size = 3 + Math.random() * 4;
    const color = isGold ? '#fff6d1' : '#00f59b';
    const shadow = isGold ? 'rgba(247, 231, 178, 0.8)' : 'rgba(0, 245, 155, 0.8)';
    
    spark.style.width = size + 'px';
    spark.style.height = size + 'px';
    spark.style.background = color;
    spark.style.boxShadow = `0 0 10px ${shadow}`;
    spark.style.left = x + 'px';
    spark.style.top = y + 'px';
    
    const angle = Math.random() * Math.PI * 2;
    const dist = 10 + Math.random() * 20;
    spark.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    spark.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 750);
  }

  function loop() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  // Hover triggers (all buttons, links, cards, modals, inputs & auth triggers)
  const hoverables = 'a, button, .card, .filter, .social-btn, input, .cc-thumb, .btn-auth-nav, .user-pill, .user-dropdown-item, .auth-tab, .auth-switch-link, .modal-close, .copy-btn, .btn-upi-app, .btn-paid, .btn';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverables)) {
      ring.classList.add('hover');
      dot.classList.add('hover');
      playSound('hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverables)) {
      ring.classList.remove('hover');
      dot.classList.remove('hover');
    }
  });
})();

/* --------------------------------------------------------------------------
   4. 3D CARD TILT & SPECULAR REFLECTION
   -------------------------------------------------------------------------- */
let lastTiltSound = 0;
document.querySelectorAll('.card.product').forEach(card => {
  card.addEventListener('mouseenter', () => {
    playSound('tilt');
  });
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

    const now = performance.now();
    if (now - lastTiltSound > 220 && (Math.abs(rotateX) > 4 || Math.abs(rotateY) > 4)) {
      lastTiltSound = now;
      playSound('tilt');
    }
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

/* --------------------------------------------------------------------------
   5. NAVBAR SCROLL & MENU
   -------------------------------------------------------------------------- */
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
const progress = document.getElementById('progress');
let wasScrolled = false;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const isScrolled = scrollY > 30;
  if (isScrolled !== wasScrolled) {
    wasScrolled = isScrolled;
    playSound('dock');
  }
  nav.classList.toggle('scrolled', isScrolled);
  const totalH = document.body.scrollHeight - window.innerHeight;
  if (totalH > 0) {
    progress.style.width = ((scrollY / totalH) * 100) + '%';
  }
}, { passive: true });

menu.onclick = () => {
  nav.classList.toggle('open');
  playSound('toggle');
};

/* --------------------------------------------------------------------------
   6. CC IMAGE ZOOM LIGHTBOX WITH NEXT / PREV NAVIGATION
   -------------------------------------------------------------------------- */
const ccLightbox = document.getElementById('ccLightbox');
const ccLightboxImg = document.getElementById('ccLightboxImage');
const ccLightboxClose = document.getElementById('ccLightboxClose');
const ccLightboxPrev = document.getElementById('ccLightboxPrev');
const ccLightboxNext = document.getElementById('ccLightboxNext');
const ccLightboxLabel = document.getElementById('ccLightboxLabel');

const ccCards = Array.from(document.querySelectorAll('.cc-card'));
let currentCCIndex = 0;

function openLightbox(index) {
  if (index < 0) index = ccCards.length - 1;
  if (index >= ccCards.length) index = 0;
  currentCCIndex = index;
  
  const card = ccCards[currentCCIndex];
  const img = card.querySelector('img');
  const title = card.querySelector('h3').textContent;
  
  ccLightboxImg.src = img.currentSrc || img.src;
  ccLightboxImg.alt = img.alt;
  ccLightboxImg.classList.remove('zoomed');
  ccLightboxLabel.textContent = `${title} — 4K CINEMATIC PREVIEW (${currentCCIndex + 1} OF ${ccCards.length}) — CLICK TO ZOOM`;
  
  ccLightbox.classList.add('show');
  ccLightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('cc-lightbox-open');
  playSound('modal-open');
}

function closeLightbox() {
  ccLightbox.classList.remove('show');
  ccLightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('cc-lightbox-open');
  playSound('modal-close');
}

// Click on any CC thumb opens lightbox
ccCards.forEach((card, idx) => {
  const thumb = card.querySelector('.cc-thumb');
  if (thumb) {
    thumb.addEventListener('click', e => {
      e.stopPropagation();
      openLightbox(idx);
    });
  }
});

ccLightboxClose.onclick = closeLightbox;
ccLightboxPrev.onclick = () => {
  playSound('swipe');
  openLightbox(currentCCIndex - 1);
};
ccLightboxNext.onclick = () => {
  playSound('swipe');
  openLightbox(currentCCIndex + 1);
};

// Click on lightbox image toggles zoom level
ccLightboxImg.onclick = e => {
  e.stopPropagation();
  ccLightboxImg.classList.toggle('zoomed');
  playSound('zoom');
};

// Close on outside click
ccLightbox.onclick = e => {
  if (e.target === ccLightbox) closeLightbox();
};

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!ccLightbox.classList.contains('show')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') {
    playSound('swipe');
    openLightbox(currentCCIndex - 1);
  }
  if (e.key === 'ArrowRight') {
    playSound('swipe');
    openLightbox(currentCCIndex + 1);
  }
});

/* --------------------------------------------------------------------------
   7. STORE CATEGORY FILTERS
   -------------------------------------------------------------------------- */
const filterBtns = document.querySelectorAll('.filter');
const products = document.querySelectorAll('.product');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    playSound('filter');
    
    products.forEach(p => {
      if (cat === 'all' || p.dataset.cat === cat) {
        p.style.display = 'flex';
        p.style.animation = 'fadeUp 0.45s ease both';
      } else {
        p.style.display = 'none';
      }
    });
  });
});

/* --------------------------------------------------------------------------
   8. UPI CHECKOUT MODAL & PAYMENT QR
   -------------------------------------------------------------------------- */
const modal = document.getElementById('modal');
const modalClose = document.getElementById('close');
const productName = document.getElementById('productName');
const paymentQR = document.getElementById('paymentQR');
const payAmount = document.getElementById('payAmount');
const copyBtn = document.getElementById('copyBtn');
const upiPay = document.getElementById('upiPay');
const paidBtn = document.getElementById('paidBtn');
const downloadArea = document.getElementById('downloadArea');
const downloadBtn = document.getElementById('downloadBtn');

const UPI_ID = 'ankitgirirg@okicici';
let selectedProduct = null;

// Download mappings (if you have file links, you can paste them here)
const DOWNLOAD_URLS = {
  'CC 1': '',
  'CC 2': '',
  'CC 3': '',
  'CC 4': '',
  'CC 5': '',
  'Transition Pack 01': '',
  'System Preset 01': ''
};

function buildUPI(amount, name) {
  return 'upi://pay?pa=' + encodeURIComponent(UPI_ID) +
         '&pn=' + encodeURIComponent('MINE PRESETS') +
         '&am=' + encodeURIComponent(Number(amount).toFixed(2)) +
         '&cu=INR&tn=' + encodeURIComponent(name + ' - MINE PRESETS');
}

function renderPaymentQR() {
  if (!selectedProduct) return;
  const upiUrl = buildUPI(selectedProduct.price, selectedProduct.name);
  new QRious({
    element: paymentQR,
    value: upiUrl,
    size: 360,
    level: 'H',
    foreground: '#030805',
    background: '#ffffff'
  });
  payAmount.textContent = '₹' + selectedProduct.price;
  downloadArea.style.display = 'none';
  playSound('qr');
}

// Auth & Buy integration defined below

function closeModal() {
  modal.classList.remove('show');
  playSound('modal-close');
}
modalClose.onclick = closeModal;
modal.onclick = e => { if (e.target === modal) closeModal(); };
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

copyBtn.onclick = async () => {
  try {
    await navigator.clipboard.writeText(UPI_ID);
    copyBtn.textContent = '✓ Copied to Clipboard';
    copyBtn.classList.add('copied');
    playSound('copy');
    setTimeout(() => {
      copyBtn.textContent = '📋 Copy UPI ID';
      copyBtn.classList.remove('copied');
    }, 2000);
  } catch(e) {}
};

upiPay.onclick = () => {
  if (!selectedProduct) return;
  playSound('click');
  window.location.href = buildUPI(selectedProduct.price, selectedProduct.name);
};

paidBtn.onclick = () => {
  if (!selectedProduct) return;
  playSound('success');
  const url = DOWNLOAD_URLS[selectedProduct.name];
  if (url) {
    downloadBtn.href = url;
    downloadArea.style.display = 'block';
  } else {
    downloadArea.style.display = 'block';
    downloadBtn.href = "mailto:minegta611@gmail.com?subject=Payment%20Confirmation%20for%20" + encodeURIComponent(selectedProduct.name);
    downloadBtn.textContent = "Email Screenshot for Instant Delivery ↗";
    downloadBtn.removeAttribute('download');
  }
};

/* --------------------------------------------------------------------------
   9. SECURE MEMBER AUTHENTICATION SYSTEM (SHA-256, BRUTE-FORCE PROTECTION, SESSION)
   -------------------------------------------------------------------------- */
const authModal = document.getElementById('authModal');
const authClose = document.getElementById('authClose');
const authNavArea = document.getElementById('authNavArea');
const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authTitle = document.getElementById('authTitle');
const authSub = document.getElementById('authSub');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const toggleLoginPwd = document.getElementById('toggleLoginPwd');
const toggleRegPwd = document.getElementById('toggleRegPwd');
const lockMsg = document.getElementById('lockMsg');
const loginSubmit = document.getElementById('loginSubmit');
const toastContainer = document.getElementById('toastContainer');

const AUTH_STORAGE_KEY = 'mine_presets_users_v1';
const SESSION_STORAGE_KEY = 'mine_presets_session_v1';
const BRUTE_FORCE_KEY = 'mine_presets_bf_v1';
const PWD_SALT = 'MINE_LUXURY_SECURE_SALT_2026';

let pendingProduct = null;
let lockInterval = null;

// Toast Notification
function showToast(message, type = 'success') {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'error' ? '⚠️' : (type === 'info' ? 'ℹ️' : '✓');
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-msg">${message}</span>`;
  toastContainer.appendChild(toast);
  playSound(type === 'error' ? 'warning' : 'toast');
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px) scale(0.95)';
    setTimeout(() => toast.remove(), 320);
  }, 4000);
}

// SHA-256 Hashing via Web Crypto API
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text + PWD_SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// User Database Helpers
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)) || {};
  } catch(e) {
    return {};
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
  } catch(e) {}
}

// Initialize Pre-configured Admin Account
async function initAuthDB() {
  const users = getUsers();
  if (!users['admin']) {
    const adminHash = await sha256('Mine@2026');
    users['admin'] = {
      username: 'admin',
      email: 'minegta611@gmail.com',
      passwordHash: adminHash,
      role: 'Admin & Founder',
      createdAt: Date.now()
    };
    saveUsers(users);
  }
}
initAuthDB();

// Session Management
function getCurrentSession() {
  try {
    const sessionStr = localStorage.getItem(SESSION_STORAGE_KEY) || sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionStr) return null;
    const session = JSON.parse(sessionStr);
    // Auto-expire after 7 days
    if (Date.now() - session.loggedInAt > 7 * 24 * 60 * 60 * 1000) {
      logoutUser();
      return null;
    }
    return session;
  } catch(e) {
    return null;
  }
}

function saveSession(username, remember = true) {
  const session = {
    username,
    loggedInAt: Date.now()
  };
  if (remember) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } else {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  }
  updateNavAuthState();
}

function logoutUser() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
  updateNavAuthState();
  showToast('You have signed out.', 'info');
  playSound('hover');
}

// Brute-force & Rate-limiting Protection
function getBruteForceState() {
  try {
    return JSON.parse(localStorage.getItem(BRUTE_FORCE_KEY)) || { attempts: 0, lockedUntil: 0 };
  } catch(e) {
    return { attempts: 0, lockedUntil: 0 };
  }
}

function saveBruteForceState(state) {
  try {
    localStorage.setItem(BRUTE_FORCE_KEY, JSON.stringify(state));
  } catch(e) {}
}

function checkRateLimit() {
  const state = getBruteForceState();
  const now = Date.now();
  if (state.lockedUntil && now < state.lockedUntil) {
    const remaining = Math.ceil((state.lockedUntil - now) / 1000);
    lockMsg.style.display = 'block';
    lockMsg.textContent = `🛑 Too many failed attempts. Security lock active for ${remaining}s.`;
    loginSubmit.disabled = true;
    if (!lockInterval) {
      lockInterval = setInterval(() => {
        const left = Math.ceil((state.lockedUntil - Date.now()) / 1000);
        if (left <= 0) {
          clearInterval(lockInterval);
          lockInterval = null;
          lockMsg.style.display = 'none';
          loginSubmit.disabled = false;
          saveBruteForceState({ attempts: 0, lockedUntil: 0 });
        } else {
          lockMsg.textContent = `🛑 Too many failed attempts. Security lock active for ${left}s.`;
        }
      }, 1000);
    }
    return false;
  }
  lockMsg.style.display = 'none';
  loginSubmit.disabled = false;
  return true;
}

function recordFailedAttempt() {
  const state = getBruteForceState();
  state.attempts = (state.attempts || 0) + 1;
  if (state.attempts >= 5) {
    state.lockedUntil = Date.now() + 30 * 1000; // 30 second lockdown
    showToast('Brute-force protection: Locked for 30s.', 'error');
  } else {
    showToast(`Invalid credentials. ${5 - state.attempts} attempts remaining before lock.`, 'error');
  }
  saveBruteForceState(state);
  checkRateLimit();
}

function resetFailedAttempts() {
  saveBruteForceState({ attempts: 0, lockedUntil: 0 });
  lockMsg.style.display = 'none';
  loginSubmit.disabled = false;
}

// UI State & Navbar Rendering
function updateNavAuthState() {
  const session = getCurrentSession();
  if (!authNavArea) return;
  
  if (session && session.username) {
    authNavArea.innerHTML = `
      <div class="user-pill-wrap" id="userPillWrap">
        <button class="user-pill" id="userPillBtn" type="button" aria-label="Creator Account Profile">
          <span class="user-avatar-wrap">
            <svg class="user-avatar-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4" fill="rgba(0, 245, 155, 0.25)"></circle>
            </svg>
            <span class="user-dot-status"></span>
          </span>
          <span class="user-pill-name">${session.username}</span>
          <svg class="user-pill-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="user-dropdown" id="userDropdown">
          <div class="user-dropdown-header">
            <div class="user-dropdown-title">${session.username}</div>
            <div class="user-dropdown-badge">
              <svg class="user-dropdown-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>Verified Creator
            </div>
          </div>
          <div class="user-dropdown-divider"></div>
          <button class="user-dropdown-item" id="logoutBtn" type="button">
            <svg class="dropdown-item-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    `;
    const pillBtn = document.getElementById('userPillBtn');
    const dropdown = document.getElementById('userDropdown');
    const pillWrap = document.getElementById('userPillWrap');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (pillBtn && dropdown) {
      pillBtn.onclick = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
        pillWrap.classList.toggle('open');
        playSound('tab');
      };
      document.addEventListener('click', (e) => {
        if (!pillWrap.contains(e.target)) {
          dropdown.classList.remove('show');
          pillWrap.classList.remove('open');
        }
      });
    }
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        logoutUser();
        playSound('modal-close');
      };
    }
  } else {
    authNavArea.innerHTML = `
      <button class="btn-auth-nav" id="openAuthBtn" type="button">
        <span class="auth-icon-wrap">
          <svg class="auth-key-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="7.5" cy="15.5" r="4.5" fill="rgba(0, 245, 155, 0.2)"></circle>
            <path d="m21 2-9.6 9.6"></path>
            <path d="m15.5 7.5 3 3"></path>
            <path d="m18.5 4.5 2 2"></path>
          </svg>
        </span>
        <span class="btn-auth-text">Sign In</span>
      </button>
    `;
    const btn = document.getElementById('openAuthBtn');
    if (btn) btn.onclick = () => openAuthModal('login');
  }
}

// Modal Control
function openAuthModal(mode = 'login', customSub = '') {
  authModal.classList.add('show');
  switchTab(mode);
  if (customSub) {
    authSub.textContent = customSub;
  } else {
    authSub.textContent = mode === 'login' 
      ? 'Sign in to unlock verified UPI checkout and secure preset downloads.'
      : 'Create a free creator account to secure your preset downloads.';
  }
  checkRateLimit();
  playSound('modal-open');
}

function closeAuthModal() {
  authModal.classList.remove('show');
  playSound('modal-close');
}

function switchTab(mode) {
  playSound('tab');
  if (mode === 'login') {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
    authTitle.textContent = 'Member Sign In';
    checkRateLimit();
  } else {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    registerForm.style.display = 'flex';
    loginForm.style.display = 'none';
    authTitle.textContent = 'Create Creator Account';
    lockMsg.style.display = 'none';
  }
}

// Event Listeners for Auth
if (authClose) authClose.onclick = closeAuthModal;
if (authModal) {
  authModal.onclick = e => { if (e.target === authModal) closeAuthModal(); };
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && authModal && authModal.classList.contains('show')) closeAuthModal();
});

if (tabLogin) tabLogin.onclick = () => switchTab('login');
if (tabRegister) tabRegister.onclick = () => switchTab('register');
if (switchToRegister) switchToRegister.onclick = () => switchTab('register');
if (switchToLogin) switchToLogin.onclick = () => switchTab('login');

// Password Visibility Toggles with Smooth Eye Morph
if (toggleLoginPwd) {
  toggleLoginPwd.onclick = () => {
    const input = document.getElementById('loginPassword');
    if (!input) return;
    const isPwd = input.type === 'password';
    input.type = isPwd ? 'text' : 'password';
    const openEye = toggleLoginPwd.querySelector('.eye-open');
    const closedEye = toggleLoginPwd.querySelector('.eye-closed');
    if (openEye && closedEye) {
      openEye.style.display = isPwd ? 'none' : 'block';
      closedEye.style.display = isPwd ? 'block' : 'none';
    }
    playSound('toggle');
  };
}
if (toggleRegPwd) {
  toggleRegPwd.onclick = () => {
    const input = document.getElementById('regPassword');
    if (!input) return;
    const isPwd = input.type === 'password';
    input.type = isPwd ? 'text' : 'password';
    const openEye = toggleRegPwd.querySelector('.eye-open');
    const closedEye = toggleRegPwd.querySelector('.eye-closed');
    if (openEye && closedEye) {
      openEye.style.display = isPwd ? 'none' : 'block';
      closedEye.style.display = isPwd ? 'block' : 'none';
    }
    playSound('toggle');
  };
}

// Handle Login Submission
if (loginForm) {
  loginForm.onsubmit = async (e) => {
    e.preventDefault();
    if (!checkRateLimit()) return;

    const usernameInput = document.getElementById('loginUsername').value.trim();
    const passwordInput = document.getElementById('loginPassword').value;
    const remember = document.getElementById('loginRemember').checked;

    if (!usernameInput || !passwordInput) {
      showToast('Please enter both username and password.', 'error');
      return;
    }

    const users = getUsers();
    const usernameLower = usernameInput.toLowerCase();
    
    // Find matching user by username or email
    let matchedUser = null;
    for (const key in users) {
      if (key.toLowerCase() === usernameLower || (users[key].email && users[key].email.toLowerCase() === usernameLower)) {
        matchedUser = users[key];
        break;
      }
    }

    if (!matchedUser) {
      recordFailedAttempt();
      return;
    }

    const hashedInput = await sha256(passwordInput);
    if (hashedInput !== matchedUser.passwordHash) {
      recordFailedAttempt();
      return;
    }

    // Success!
    resetFailedAttempts();
    saveSession(matchedUser.username, remember);
    closeAuthModal();
    showToast(`Welcome back, ${matchedUser.username}! Verified Creator access enabled.`, 'success');
    playSound('pay');

    // Resume pending checkout if any
    if (pendingProduct) {
      const prod = pendingProduct;
      pendingProduct = null;
      selectedProduct = prod;
      productName.textContent = selectedProduct.name + ' — ₹' + selectedProduct.price;
      renderPaymentQR();
      modal.classList.add('show');
      showToast(`Resuming checkout for ${selectedProduct.name}`, 'info');
    }
  };
}

// Handle Registration Submission
if (registerForm) {
  registerForm.onsubmit = async (e) => {
    e.preventDefault();
    const regUsername = document.getElementById('regUsername').value.trim();
    const regEmail = document.getElementById('regEmail').value.trim();
    const regPassword = document.getElementById('regPassword').value;
    const regConfirm = document.getElementById('regConfirmPassword').value;

    if (!regUsername || !regEmail || !regPassword) {
      showToast('Please fill all registration fields.', 'error');
      return;
    }
    if (regUsername.length < 3) {
      showToast('Username must be at least 3 characters.', 'error');
      return;
    }
    if (regPassword.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }
    if (regPassword !== regConfirm) {
      showToast('Passwords do not match. Please verify.', 'error');
      return;
    }

    const users = getUsers();
    const usernameKey = regUsername.toLowerCase();

    // Check duplicate username
    if (users[usernameKey]) {
      showToast('Username already taken. Please pick another.', 'error');
      return;
    }

    // Check duplicate email
    for (const key in users) {
      if (users[key].email && users[key].email.toLowerCase() === regEmail.toLowerCase()) {
        showToast('Email address is already registered. Please sign in.', 'error');
        return;
      }
    }

    const passwordHash = await sha256(regPassword);
    users[usernameKey] = {
      username: regUsername,
      email: regEmail,
      passwordHash: passwordHash,
      role: 'Creator Member',
      createdAt: Date.now()
    };
    saveUsers(users);

    saveSession(regUsername, true);
    closeAuthModal();
    showToast(`Account created! Welcome to MINE PRESETS, ${regUsername}!`, 'success');
    playSound('pay');

    // Resume pending checkout if any
    if (pendingProduct) {
      const prod = pendingProduct;
      pendingProduct = null;
      selectedProduct = prod;
      productName.textContent = selectedProduct.name + ' — ₹' + selectedProduct.price;
      renderPaymentQR();
      modal.classList.add('show');
    }
  };
}

// Hook into Buy Now Buttons with Secure Authentication Protection
document.querySelectorAll('.buy').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const product = {
      name: btn.dataset.name,
      price: btn.dataset.price
    };
    
    const session = getCurrentSession();
    if (!session) {
      pendingProduct = product;
      showToast('🔐 Please sign in or create an account to proceed with secure payment', 'info');
      openAuthModal('login', `Sign in or register to complete your order for ${product.name}`);
      return;
    }

    selectedProduct = product;
    productName.textContent = selectedProduct.name + ' — ₹' + selectedProduct.price;
    renderPaymentQR();
    modal.classList.add('show');
    playSound('click');
  });
});

// Initialize Nav Auth state on load
updateNavAuthState();

/* --------------------------------------------------------------------------
   10. INTERSECTION OBSERVER SCROLL REVEALS & TACTILE NAV
   -------------------------------------------------------------------------- */
const revealedSet = new Set();
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (!revealedSet.has(entry.target)) {
        revealedSet.add(entry.target);
        playSound('reveal');
      }
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Tactile sound on all navigation, action, and social links
document.querySelectorAll('.links a, .nav-cta, .actions a, .social-btn').forEach(link => {
  link.addEventListener('click', () => {
    playSound('click');
  });
  link.addEventListener('mouseenter', () => {
    playSound('hover');
  });
});