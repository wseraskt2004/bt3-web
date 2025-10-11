document.addEventListener('DOMContentLoaded', function () {

  const emailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
  const ensureErrorP = (inputEl) => {
    let p = inputEl.parentElement.querySelector('.error');
    if (!p) {
      p = document.createElement('p');
      p.className = 'error';
      inputEl.parentElement.appendChild(p);
    }
    return p;
  };
  const showError = (inputEl, msg) => {
    const p = ensureErrorP(inputEl);
    p.textContent = msg || '';
    inputEl.classList.remove('valid');
    inputEl.classList.add('invalid');
  };
  const clearError = (inputEl) => {
    const p = inputEl.parentElement.querySelector('.error');
    if (p) p.textContent = '';
    inputEl.classList.remove('invalid');
    inputEl.classList.add('valid');
  };


  const form = document.querySelector('form.form-box');
  const nameInput = document.getElementById('hoten');
  const emailInput = document.getElementById('email');
  const msgInput = document.getElementById('tinnhan');
  if (form && nameInput && emailInput && msgInput) {
    // Counter ký tự
    const counter = document.createElement('span');
    counter.style.fontSize = '13px';
    counter.style.color = '#555';
    counter.style.marginLeft = '8px';
    msgInput.parentElement.appendChild(counter);
    const updateCounter = () => {
      const len = msgInput.value.trim().length;
      counter.textContent = `( ${len}/10+ ký tự )`;
    };
    updateCounter();

    nameInput.addEventListener('input', () => {
      const v = nameInput.value.trim();
      if (!v) showError(nameInput, 'Tên không được để trống.');
      else clearError(nameInput);
    });
    emailInput.addEventListener('input', () => {
      const v = emailInput.value.trim();
      if (!v) showError(emailInput, 'Email không được để trống.');
      else if (!emailValid(v)) showError(emailInput, 'Email không hợp lệ (cần @ và tên miền).');
      else clearError(emailInput);
    });
    msgInput.addEventListener('input', () => {
      updateCounter();
      const v = msgInput.value.trim();
      if (v.length < 10) showError(msgInput, 'Nội dung tối thiểu 10 ký tự.');
      else clearError(msgInput);
    });

    form.addEventListener('submit', (e) => {
      let ok = true;
      if (!nameInput.value.trim()) { showError(nameInput, 'Tên không được để trống.'); ok = false; }
      const ev = emailInput.value.trim();
      if (!ev) { showError(emailInput, 'Email không được để trống.'); ok = false; }
      else if (!emailValid(ev)) { showError(emailInput, 'Email không hợp lệ (cần @ và tên miền).'); ok = false; }
      if (msgInput.value.trim().length < 10) { showError(msgInput, 'Nội dung tối thiểu 10 ký tự.'); ok = false; }

      if (!ok) { e.preventDefault(); alert('Vui lòng kiểm tra lại các trường bị lỗi.'); return; }

      e.preventDefault();
      alert('Gửi thành công! Cảm ơn bạn đã liên hệ.');
      form.reset();
      [nameInput, emailInput, msgInput].forEach(el => el.classList.remove('valid', 'invalid'));
      updateCounter();
    });
  }


  document.querySelectorAll('.muc-tieu tbody tr').forEach(tr => {
    const cb = tr.querySelector('input[type="checkbox"]');
    if (!cb) return;
    // áp trạng thái ban đầu
    tr.classList.toggle('done', cb.checked);
    cb.addEventListener('change', () => tr.classList.toggle('done', cb.checked));
  });


  const avatar = document.querySelector('.avatar');
  if (avatar) {
    avatar.style.cursor = 'pointer';
    const on = () => avatar.classList.add('zoom');
    const off = () => avatar.classList.remove('zoom');
    avatar.addEventListener('mouseenter', on);
    avatar.addEventListener('mouseleave', off);
  }


  document.querySelectorAll('nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 10, behavior: 'smooth' });
    });
  });
});

