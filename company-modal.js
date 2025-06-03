// 会社紹介モーダル機能
function openCompanyModal() {
  const modal = document.getElementById('company-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  }
}

function closeCompanyModal() {
  const modal = document.getElementById('company-modal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
}

// モーダル外クリックで閉じる
document.addEventListener('click', function(event) {
  const modal = document.getElementById('company-modal');
  if (modal && event.target === modal) {
    closeCompanyModal();
  }
});

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeCompanyModal();
  }
}); 