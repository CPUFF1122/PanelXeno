// ตรวจสอบสถานะการเข้าสู่ระบบเดิมจาก LocalStorage
window.addEventListener('DOMContentLoaded', () => {
  const savedGoogleUser = localStorage.getItem('sunny_google_user');
  if (savedGoogleUser) {
    try {
      const user = JSON.parse(savedGoogleUser);
      renderLoggedInUI(user.name);
    } catch (e) {}
  }
});

// เปิดหน้าต่าง Modal ล็อกอิน Google
function handleGoogleLogin() {
  const savedUser = localStorage.getItem('sunny_google_user');
  if (savedUser) {
    // หากเข้าสู่ระบบแล้ว ให้ถามว่าจะออกจากระบบหรือไม่
    if (confirm('คุณต้องการออกจากระบบบัญชี Google หรือไม่?')) {
      localStorage.removeItem('sunny_google_user');
      resetGoogleUI();
      showToast('ออกจากระบบเรียบร้อยแล้ว');
    }
    return;
  }

  document.getElementById('googleModal').style.display = 'flex';
}

function closeGoogleModal() {
  document.getElementById('googleModal').style.display = 'none';
}

// เลือกบัญชีและเข้าสู่ระบบ
function selectMockAccount(email, name) {
  const userData = { email, name, loggedInAt: new Date().toISOString() };
  localStorage.setItem('sunny_google_user', JSON.stringify(userData));

  closeGoogleModal();
  renderLoggedInUI(name);
  showToast(`ยินดีต้อนรับคุณ ${name} สู่ SUNNY WIRE`);
}

// อัปเดตหน้าตาปุ่มเมื่อล็อกอินสำเร็จ
function renderLoggedInUI(name) {
  const btnText = document.getElementById('googleBtnText');
  const btn = document.getElementById('googleAuthBtn');

  btnText.innerText = name;
  btn.style.borderColor = '#1d4ed8';
  btn.style.color = '#1d4ed8';
  btn.style.background = '#eff6ff';
}

// รีเซ็ตปุ่มกลับเป็นค่าเริ่มต้น
function resetGoogleUI() {
  const btnText = document.getElementById('googleBtnText');
  const btn = document.getElementById('googleAuthBtn');

  btnText.innerText = 'เข้าสู่ระบบด้วย Google';
  btn.style.borderColor = '#e2e8f0';
  btn.style.color = '#334155';
  btn.style.background = '#ffffff';
}

// แสดง Toast แจ้งเตือน
function showToast(msg) {
  const toast = document.getElementById('toastMsg');
  toast.innerText = msg;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}
