// Wedding Date - October 20, 2025
const weddingDate = new Date('2025-10-20T09:00:00').getTime();

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Background Music Control
let musicPlaying = false;
const backgroundMusic = document.getElementById('backgroundMusic');

function playMusic() {
    if (!musicPlaying) {
        backgroundMusic.play().then(() => {
            musicPlaying = true;
            document.querySelector('.play-music').innerHTML = '<i class="fas fa-pause me-2"></i>Pause Musik';
        }).catch(error => {
            console.log('Audio play failed:', error);
            // Fallback: show message that music needs user interaction
            alert('Klik tombol ini untuk memutar musik latar belakang');
        });
    } else {
        backgroundMusic.pause();
        musicPlaying = false;
        document.querySelector('.play-music').innerHTML = '<i class="fas fa-music me-2"></i>Putar Musik';
    }
}

// Auto-play attempt (will only work if user has interacted with the page)
document.addEventListener('click', function() {
    if (!musicPlaying) {
        backgroundMusic.play().catch(() => {
            // Silently fail if autoplay is blocked
        });
    }
}, { once: true });

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modalImage = document.getElementById('modalImage');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imageSrc = this.getAttribute('data-image');
        modalImage.src = imageSrc;
    });
});

// RSVP Form Handler
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const guestName = document.getElementById('guestName').value;
    const guestPhone = document.getElementById('guestPhone').value;
    const attendance = document.getElementById('attendance').value;
    const guestCount = document.getElementById('guestCount').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!guestName || !guestPhone || !attendance) {
        alert('Mohon lengkapi semua field yang wajib diisi!');
        return;
    }
    
    // Create WhatsApp message
    const attendanceText = attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir';
    const whatsappMessage = `*KONFIRMASI KEHADIRAN PERNIKAHAN*\n\n` +
                           `Nama: ${guestName}\n` +
                           `No. HP: ${guestPhone}\n` +
                           `Kehadiran: ${attendanceText}\n` +
                           `Jumlah Tamu: ${guestCount} orang\n` +
                           `Pesan: ${message || 'Tidak ada pesan'}\n\n` +
                           `Terima kasih atas konfirmasinya! 🙏`;
    
    // WhatsApp number (you can replace with actual number)
    const whatsappNumber = '6281234567890'; // Replace with actual WhatsApp number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form
    this.reset();
    
    // Show success message
    alert('Terima kasih! Anda akan diarahkan ke WhatsApp untuk mengirim konfirmasi.');
});

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div class="alert alert-success position-fixed" style="top: 20px; right: 20px; z-index: 9999; min-width: 250px;">
                <i class="fas fa-check-circle me-2"></i>Nomor rekening berhasil disalin!
            </div>
        `;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }).catch(function(err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert('Nomor rekening berhasil disalin: ' + text);
    });
}

// Open Google Maps
function openMaps(address) {
    const encodedAddress = encodeURIComponent(address);
    const mapsURL = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsURL, '_blank');
}

// Smooth Scrolling for Navigation
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Add navigation if needed
if (document.querySelector('.navbar')) {
    document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
}

// Lazy Loading Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('loading');
        observer.observe(section);
    });
    
    // Initialize AOS or similar animation library if needed
    // AOS.init();
});

// Preload Images
function preloadImages() {
    const images = [
        'img/AFZ_2974.jpg',
        'img/AFZ_3350.jpg',
        'img/bride.jpg',
        'img/groom.jpg',
        'img/gallery3.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);

// Form Validation Enhancement
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Add real-time validation
document.getElementById('guestPhone').addEventListener('input', function() {
    const phone = this.value;
    if (phone && !validatePhone(phone)) {
        this.setCustomValidity('Masukkan nomor WhatsApp yang valid');
    } else {
        this.setCustomValidity('');
    }
});

// Add loading state to form submission
const rsvpForm = document.getElementById('rsvpForm');
const submitBtn = rsvpForm.querySelector('button[type="submit"]');

rsvpForm.addEventListener('submit', function() {
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Mengirim...';
    submitBtn.disabled = true;
    
    // Re-enable button after 3 seconds
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fab fa-whatsapp me-2"></i>Kirim via WhatsApp';
        submitBtn.disabled = false;
    }, 3000);
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add floating animation to countdown
function addFloatingAnimation() {
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('floating');
    });
}

// Add floating CSS animation
const style = document.createElement('style');
style.textContent = `
    .floating {
        animation: floating 3s ease-in-out infinite;
    }
    
    @keyframes floating {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// Initialize floating animation
document.addEventListener('DOMContentLoaded', addFloatingAnimation);

// Add click effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Console welcome message
console.log('%c💒 Selamat Datang di Undangan Pernikahan Andri & Yanti! 💒', 'color: #8B4513; font-size: 16px; font-weight: bold;');
console.log('%cDibuat dengan ❤️ untuk momen spesial mereka', 'color: #DAA520; font-size: 12px;');