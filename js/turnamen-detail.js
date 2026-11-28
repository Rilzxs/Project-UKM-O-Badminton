(function () {
  var modal = document.getElementById('modal-turnamen');
  if (!modal) return;

  var elStatus = document.getElementById('tmodal-status');
  var elTitle  = document.getElementById('tmodal-title');
  var elDesc   = document.getElementById('tmodal-desc');
  var elList   = document.getElementById('tmodal-list');

  var FIELDS = [
    ['tanggal',      'Tanggal'],
    ['lokasi',       'Lokasi'],
    ['penyelenggara','Penyelenggara'],
    ['kategori',     'Kategori'],
    ['biaya',        'Biaya pendaftaran'],
    ['deadline',     'Batas pendaftaran'],
    ['peserta',      'Peserta'],
    ['hasil',        'Juara'],
    ['catatan',      'Catatan']
  ];

  var lastTrigger = null;

  function openDetail(item, trigger) {
    var d = item.dataset;
    var status = d.status || '';

    elTitle.textContent = item.querySelector('.info-item__title').textContent;
    elStatus.textContent = status;
    elStatus.className = 'tmodal__status' + (status.toLowerCase() === 'selesai' ? ' is-selesai' : '');
    elDesc.textContent = d.deskripsi || '';

    elList.textContent = '';
    FIELDS.forEach(function (f) {
      var val = d[f[0]];
      if (!val) return; // field kosong tidak ditampilkan
      var dt = document.createElement('dt');
      var dd = document.createElement('dd');
      dt.textContent = f[1];
      dd.textContent = val;
      elList.appendChild(dt);
      elList.appendChild(dd);
    });

    lastTrigger = trigger;
    modal.showModal();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-detail]');
    if (!btn) return;
    var item = btn.closest('.info-item');
    if (item) openDetail(item, btn);
  });

  // Tutup lewat tombol
  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) modal.close();
    // klik area gelap di luar kotak
    if (e.target === modal) modal.close();
  });

  modal.addEventListener('close', function () {
    if (lastTrigger) lastTrigger.focus();
  });
})();