// 会社紹介モーダルを開く
function openCompanyModal() {
  const modal = document.getElementById('companyModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Re-translate modal content if i18n is available
    if (window.i18n) {
      window.i18n.translatePage();
    }
  }
}

// 会社紹介モーダルを閉じる
function closeCompanyModal() {
  const modal = document.getElementById('companyModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
}

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeCompanyModal();
  }
});

// モーダル外側クリックで閉じる
document.addEventListener('click', function(event) {
  const modal = document.getElementById('companyModal');
  if (modal && event.target === modal) {
    closeCompanyModal();
  }
}); 