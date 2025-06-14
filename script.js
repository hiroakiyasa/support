// ===== DOM要素の取得 =====
const scrollToTopBtn = document.getElementById('scroll-to-top');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

// ===== セクション切り替え機能 =====
function showSection(sectionId) {
    // 全てのメインセクションを非表示にする
    document.querySelectorAll('.main-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 指定されたセクションを表示する
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// ===== ナビゲーション機能 =====
document.addEventListener('DOMContentLoaded', () => {
    // ページ読み込み時にスクロール位置をトップに設定
    window.scrollTo(0, 0);
    
    // 初期状態でスクロールトップボタンを非表示に設定
    scrollToTopBtn.classList.remove('visible');
    
    // 会社紹介ボタンのクリック処理
    document.querySelectorAll('.company-intro-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('company-section');
            
            // モバイルメニューが開いている場合は閉じる
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // アプリ紹介ボタンのクリック処理
    document.querySelectorAll('.apps-intro-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('apps-section');
            
            // モバイルメニューが開いている場合は閉じる
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // キャンピングカー紹介ボタンのクリック処理
    document.querySelectorAll('.vanlife-intro-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('vanlife-section');
            
            // モバイルメニューが開いている場合は閉じる
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // デフォルトでアプリセクションを表示
    showSection('apps-section');
    
    console.log('ホームページが正常に読み込まれました');
});

// ===== スクロールトップボタンの機能 =====
// ページのスクロール位置を監視してボタンの表示/非表示を制御
window.addEventListener('scroll', () => {
    // スクロール位置が300px以上の場合にボタンを表示
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// スクロールトップボタンがクリックされた時の処理
scrollToTopBtn.addEventListener('click', () => {
    // スムーズにページトップまでスクロール
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== モバイルメニューの切り替え機能 =====
// ハンバーガーメニューがクリックされた時の処理
mobileMenu.addEventListener('click', () => {
    // ナビゲーションメニューの表示/非表示を切り替え
    navMenu.classList.toggle('active');
    
    // ハンバーガーアイコンのアニメーション
    mobileMenu.classList.toggle('active');
});

// ===== ナビゲーションリンクのスムーズスクロール =====
// 全てのナビゲーションリンクにスムーズスクロール機能を追加
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // ナビゲーションバーの高さを考慮してスクロール位置を調整
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // モバイルメニューが開いている場合は閉じる
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// ===== ウィンドウリサイズ時の処理 =====
// ウィンドウサイズが変更された時にモバイルメニューの状態をリセット
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // デスクトップサイズの場合はモバイルメニューを閉じる
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // --- START ENHANCED TIKTOK PLAYER LOGIC ---
    class TikTokAutoPlayer {
        constructor() {
            this.videos = [];
            this.currentIndex = 0;
            this.autoPlayInterval = null;
            this.isAutoPlaying = false;
            this.hoverPaused = false;
            this.currentlyPlayingVideo = null;
            this.videoPlayDuration = 8000; // 8 seconds per video
            
            this.init();
        }
        
        init() {
            this.setupVideoElements();
            this.setupEventListeners();
            this.startAutoPlay();
        }
        
        setupVideoElements() {
            const videoItems = document.querySelectorAll('#vanlife-videos .video-item');
            
            videoItems.forEach((item, index) => {
                const iframe = item.querySelector('iframe[src*="tiktok.com"]');
                if (iframe) {
                    const originalSrc = iframe.getAttribute('src');
                    if (originalSrc && originalSrc.includes('tiktok.com/embed')) {
                        // Ensure autoplay and unmuted for active videos
                        const unmutedSrc = originalSrc.replace('muted=1', 'muted=0').replace('autoplay=0', 'autoplay=1');
                        const mutedSrc = originalSrc.replace('muted=0', 'muted=1').replace('autoplay=1', 'autoplay=0');
                        
                        iframe.setAttribute('data-unmuted-src', unmutedSrc);
                        iframe.setAttribute('data-muted-src', mutedSrc);
                        iframe.setAttribute('data-video-index', index);
                        
                        // Initially mute all videos except the first one
                        if (index === 0) {
                            iframe.src = unmutedSrc;
                        } else {
                            iframe.src = mutedSrc;
                        }
                        
                        this.videos.push({
                            iframe: iframe,
                            item: item,
                            index: index
                        });
                    }
                }
            });
        }
        
        setupEventListeners() {
            this.videos.forEach((video) => {
                // Mouse hover events
                video.item.addEventListener('mouseenter', () => {
                    this.onVideoHover(video.index);
                });
                
                video.item.addEventListener('mouseleave', () => {
                    this.onVideoLeave(video.index);
                });
            });
        }
        
        onVideoHover(index) {
            this.hoverPaused = true;
            this.pauseAutoPlay();
            this.playSpecificVideo(index);
            this.addPlayingEffect(index);
        }
        
        onVideoLeave(index) {
            this.hoverPaused = false;
            this.removePlayingEffect(index);
            
            // Resume auto-play after a short delay
            setTimeout(() => {
                if (!this.hoverPaused) {
                    this.startAutoPlay();
                }
            }, 1000);
        }
        
        startAutoPlay() {
            if (this.hoverPaused || this.isAutoPlaying) return;
            
            this.isAutoPlaying = true;
            this.playCurrentVideo();
            
            // Set interval to automatically move to next video
            this.autoPlayInterval = setInterval(() => {
                if (!this.hoverPaused) {
                    this.nextVideo();
                }
            }, this.videoPlayDuration);
        }
        
        pauseAutoPlay() {
            this.isAutoPlaying = false;
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }
        
        playCurrentVideo() {
            this.playSpecificVideo(this.currentIndex);
            this.addPlayingEffect(this.currentIndex);
        }
        
        playSpecificVideo(index) {
            // Mute all other videos
            this.videos.forEach((video, i) => {
                if (i !== index) {
                    this.muteVideo(i);
                    this.removePlayingEffect(i);
                }
            });
            
            // Unmute and play the target video
            this.unmuteVideo(index);
            this.currentlyPlayingVideo = this.videos[index];
        }
        
        nextVideo() {
            this.removePlayingEffect(this.currentIndex);
            this.muteVideo(this.currentIndex);
            
            this.currentIndex = (this.currentIndex + 1) % this.videos.length;
            this.playCurrentVideo();
        }
        
        unmuteVideo(index) {
            const video = this.videos[index];
            if (video && video.iframe) {
                video.iframe.src = video.iframe.getAttribute('data-unmuted-src');
            }
        }
        
        muteVideo(index) {
            const video = this.videos[index];
            if (video && video.iframe) {
                video.iframe.src = video.iframe.getAttribute('data-muted-src');
            }
        }
        
        addPlayingEffect(index) {
            const video = this.videos[index];
            if (video) {
                video.item.classList.add('video-playing');
                video.item.style.transform = 'scale(1.02)';
                video.item.style.boxShadow = '0 0 30px rgba(255, 0, 80, 0.6), 0 0 60px rgba(255, 0, 80, 0.4)';
                video.item.style.border = '2px solid #ff0050';
                video.item.style.transition = 'all 0.3s ease';
            }
        }
        
        removePlayingEffect(index) {
            const video = this.videos[index];
            if (video) {
                video.item.classList.remove('video-playing');
                video.item.style.transform = '';
                video.item.style.boxShadow = '';
                video.item.style.border = '';
            }
        }
    }
    
    // Initialize the enhanced TikTok player after DOM loads
    setTimeout(() => {
        new TikTokAutoPlayer();
    }, 1000);
    // --- END ENHANCED TIKTOK PLAYER LOGIC ---
}); 