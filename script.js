// ===== DOM要素の取得 =====
const scrollToTopBtn = document.getElementById('scroll-to-top');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

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

// ===== ページ読み込み完了時の初期化処理 =====
document.addEventListener('DOMContentLoaded', () => {
    // ページ読み込み時にスクロール位置をトップに設定
    window.scrollTo(0, 0);
    
    // 初期状態でスクロールトップボタンを非表示に設定
    scrollToTopBtn.classList.remove('visible');
    
    console.log('ホームページが正常に読み込まれました');
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