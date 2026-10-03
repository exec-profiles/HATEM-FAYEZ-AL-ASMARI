/**
 * Hatem Fayez Al-Asmari - Executive Portfolio Scripts
 * Design System Interactive Controllers, Moving Sliding Tabs, Chart Engines & Auto-Scroll Carousel
 */

let financialChartInstance = null;
let domainPieChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initNavGlide();
  initAnalyticsTabs();
  initDomainCarousel();
  initSkillsMovingTabs();
  initExpMovingTabs();
  initBackToTop();
  initScrollSpy();
  initCharts();

  // Recalculate indicators on resize
  window.addEventListener('resize', () => {
    updateNavGlide();
    updateAnalyticsSlider();
    updateSkillsSlider();
    updateExpSlider();
  });
});

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
          }
        }
      });
    });
  }
}

/* ==========================================================================
   Gliding Navigation Tab Indicator
   ========================================================================== */
function initNavGlide() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      updateNavGlide();
    });
  });

  setTimeout(updateNavGlide, 100);
}

function updateNavGlide() {
  const indicator = document.getElementById('navGlideIndicator');
  const activeLink = document.querySelector('.nav-link.active');
  const navMenu = document.getElementById('navMenu');

  if (!indicator || !activeLink || !navMenu) return;

  const linkRect = activeLink.getBoundingClientRect();
  const menuRect = navMenu.getBoundingClientRect();

  const leftOffset = linkRect.left - menuRect.left;
  const width = linkRect.width;

  indicator.style.transform = `translateX(${leftOffset}px)`;
  indicator.style.width = `${width}px`;
}

/* ==========================================================================
   Core Industry Domains Infinite Auto-Scroll Carousel
   ========================================================================== */
function initDomainCarousel() {
  const track = document.getElementById('domainCarouselTrack');
  const viewport = document.getElementById('domainCarouselViewport');
  const btnPrev = document.getElementById('domainScrollPrev');
  const btnNext = document.getElementById('domainScrollNext');
  const btnPause = document.getElementById('domainScrollPause');

  if (!track || !viewport) return;

  let isPaused = false;

  if (btnPause) {
    btnPause.addEventListener('click', () => {
      isPaused = !isPaused;
      const icon = btnPause.querySelector('i');
      if (isPaused) {
        track.classList.add('paused');
        if (icon) {
          icon.classList.remove('fa-pause');
          icon.classList.add('fa-play');
        }
      } else {
        track.classList.remove('paused');
        if (icon) {
          icon.classList.remove('fa-play');
          icon.classList.add('fa-pause');
        }
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      viewport.scrollBy({ left: 370, behavior: 'smooth' });
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      viewport.scrollBy({ left: -370, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   Visual Analytics Moving Tabs & Chart Switcher
   ========================================================================== */
function initAnalyticsTabs() {
  const tabButtons = document.querySelectorAll('#analyticsTabBar .analytics-tab-btn');
  const panels = document.querySelectorAll('.chart-view-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      updateAnalyticsSlider();

      const targetView = btn.getAttribute('data-chart-view');

      panels.forEach(panel => {
        if (panel.id === `view-${targetView}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      if (targetView === 'financial' && financialChartInstance) {
        financialChartInstance.resize();
      } else if (targetView === 'domain' && domainPieChartInstance) {
        domainPieChartInstance.resize();
      }
    });
  });

  setTimeout(updateAnalyticsSlider, 120);
}

function updateAnalyticsSlider() {
  const sliderBg = document.getElementById('analyticsSliderBg');
  const activeBtn = document.querySelector('#analyticsTabBar .analytics-tab-btn.active');
  const tabBar = document.getElementById('analyticsTabBar');

  if (!sliderBg || !activeBtn || !tabBar) return;

  const btnRect = activeBtn.getBoundingClientRect();
  const barRect = tabBar.getBoundingClientRect();

  const leftOffset = btnRect.left - barRect.left;
  const width = btnRect.width;

  sliderBg.style.transform = `translateX(${leftOffset}px)`;
  sliderBg.style.width = `${width}px`;
}

/* ==========================================================================
   Chart.js Initialization (Bar Chart & Doughnut/Pie Chart)
   ========================================================================== */
function initCharts() {
  // 1. Financial Savings Bar Chart
  const barCtx = document.getElementById('financialSavingsBarChart');
  if (barCtx && typeof Chart !== 'undefined') {
    financialChartInstance = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: [
          '2016 Automation Award',
          '2018 Stretch-Hood Award',
          '2025-26 Packaging Ops',
          'TAM-2026 Turnaround Spares',
          'Working Capital Eff.'
        ],
        datasets: [{
          label: 'Direct Cost Savings & ROI (Million SAR)',
          data: [4.5, 4.5, 3.9, 1.1, 2.5],
          backgroundColor: [
            '#059669',
            '#10b981',
            '#0284c7',
            '#004b87',
            '#b45309'
          ],
          borderRadius: 8,
          borderSkipped: false,
          barThickness: 32
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 12, weight: '600' },
              color: '#334155'
            }
          },
          tooltip: {
            backgroundColor: '#042646',
            titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: '700' },
            bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                return ` Value: SAR ${context.raw} Million`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) { return `SAR ${value}M`; },
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
              color: '#64748b'
            },
            grid: { color: '#e2e8f0', borderDash: [4, 4] }
          },
          x: {
            ticks: {
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: '600' },
              color: '#0f172a',
              maxRotation: 20
            },
            grid: { display: false }
          }
        }
      }
    });
  }

  // 2. Domain Experience Pie / Doughnut Chart
  const pieCtx = document.getElementById('domainPieChart');
  if (pieCtx && typeof Chart !== 'undefined') {
    domainPieChartInstance = new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: [
          'Petrochemical & Polymers (APC & APOC)',
          'Phosphate Processing (Ma’aden)',
          'Oilfield QA & Mechanical (Schlumberger)',
          'Project Commissioning & FAT (APOC)'
        ],
        datasets: [{
          data: [45, 22, 21, 12],
          backgroundColor: [
            '#004b87',
            '#0284c7',
            '#059669',
            '#38bdf8'
          ],
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#042646',
            titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: '700' },
            bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                const years = [8.5, 4.0, 4.0, 2.5][context.dataIndex];
                return ` ${context.label}: ${context.raw}% (~${years} Years)`;
              }
            }
          }
        }
      }
    });
  }
}

/* ==========================================================================
   Skills Moving Tabs with Animated Slider
   ========================================================================== */
function initSkillsMovingTabs() {
  const tabButtons = document.querySelectorAll('#skillsMovingTabBar .moving-tab-btn');
  const skillChips = document.querySelectorAll('#skillsGrid .skill-chip');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      updateSkillsSlider();

      const filterValue = btn.getAttribute('data-filter');

      skillChips.forEach(chip => {
        const category = chip.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          chip.classList.remove('hidden');
          chip.style.animation = 'none';
          chip.offsetHeight;
          chip.style.animation = 'cardEntrance 0.3s ease forwards';
        } else {
          chip.classList.add('hidden');
        }
      });
    });
  });

  setTimeout(updateSkillsSlider, 150);
}

function updateSkillsSlider() {
  const sliderBg = document.getElementById('skillsSliderBg');
  const activeBtn = document.querySelector('#skillsMovingTabBar .moving-tab-btn.active');
  const tabBar = document.getElementById('skillsMovingTabBar');

  if (!sliderBg || !activeBtn || !tabBar) return;

  const btnRect = activeBtn.getBoundingClientRect();
  const barRect = tabBar.getBoundingClientRect();

  const leftOffset = btnRect.left - barRect.left;
  const width = btnRect.width;

  sliderBg.style.transform = `translateX(${leftOffset}px)`;
  sliderBg.style.width = `${width}px`;
}

/* ==========================================================================
   Experience Interactive Moving Tabs & Role Switcher
   ========================================================================== */
function initExpMovingTabs() {
  const expTabs = document.querySelectorAll('#expMovingTabBar .exp-tab-btn');
  const timelineBlocks = document.querySelectorAll('.timeline-block');

  expTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      expTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      updateExpSlider();

      const targetId = btn.getAttribute('data-target');

      if (targetId === 'all') {
        timelineBlocks.forEach(block => {
          block.classList.remove('dimmed');
          block.classList.remove('highlighted');
          block.style.display = 'flex';
        });
      } else {
        timelineBlocks.forEach(block => {
          if (block.id === targetId) {
            block.classList.remove('dimmed');
            block.classList.add('highlighted');
            block.style.display = 'flex';
            block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            block.classList.add('dimmed');
            block.classList.remove('highlighted');
          }
        });
      }
    });
  });

  setTimeout(updateExpSlider, 150);
}

function updateExpSlider() {
  const sliderBg = document.getElementById('expSliderBg');
  const activeBtn = document.querySelector('#expMovingTabBar .exp-tab-btn.active');
  const tabBar = document.getElementById('expMovingTabBar');

  if (!sliderBg || !activeBtn || !tabBar) return;

  const btnRect = activeBtn.getBoundingClientRect();
  const barRect = tabBar.getBoundingClientRect();

  const leftOffset = btnRect.left - barRect.left;
  const width = btnRect.width;

  sliderBg.style.transform = `translateX(${leftOffset}px)`;
  sliderBg.style.width = `${width}px`;
}

/* ==========================================================================
   Resume Modal Controller
   ========================================================================== */
function openResumeModal() {
  const modal = document.getElementById('resumeModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeResumeModal() {
  const modal = document.getElementById('resumeModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('resumeModal');
  if (e.target === modal) {
    closeResumeModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeResumeModal();
  }
});

function triggerResumeDownload() {
  const link = document.createElement('a');
  link.href = 'Hatem_Fayez_Al-Asmari_Resume.pdf';
  link.download = 'Hatem_Fayez_Al-Asmari_Resume.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ==========================================================================
   Back To Top Floating Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   Active Navigation Scroll Spy & Smooth Indicator Sync
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-nav') === current || link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
      updateNavGlide();
    }
  });
}

/* ==========================================================================
   Contact Form Submission Handler
   ========================================================================== */
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const alertBox = document.getElementById('formSuccessAlert');

  if (alertBox) {
    alertBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Your inquiry regarding "<em>${subject}</em>" has been submitted. Hatem Al-Asmari will respond to ${email} shortly.`;
    alertBox.classList.remove('hidden');

    const mailtoUrl = `mailto:hatemspeed@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent(message + '\n\nSender: ' + name + ' (' + email + ')')}`;
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 1200);
  }
}
