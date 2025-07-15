// script.js
document.addEventListener('DOMContentLoaded', () => {
  const prerequisites = {
    'MAT-022': ['MAT-021'],
    'FIS-110': ['FIS-100'],
    'MIN-101': ['MIN-100'],
    'DEW-101': ['DEW-100'],
    'QUI-021': ['QUI-010'],
    'MAT-023': ['MAT-022'],
    'FIS-130': ['FIS-110'],
    'MIN-102': ['MIN-100'],
    'MIN-103': ['MIN-100'],
    'DEW-0':    ['DEW-101'],
    'IWM-185': ['IWI-131'],
    'MAT-024': ['MAT-023'],
    'FIS-120': ['FIS-110','MAT-022'],
    'MIN-130': ['MIN-102'],
    'MIN-205': ['FIS-110','QUI-010'],
    'MIN-233': ['MIN-102'],
    'FIS-140': ['FIS-130','FIS-120'],
    'MIN-232': ['MIN-130'],
    'MIN-250': ['MIN-130','MIN-102'],
    'MIN-240': ['MIN-205','MAT-023','FIS-110'],
    'MIN-265': ['MAT-024','FIS-130'],
    'MIN-235': ['MIN-233','MIN-101'],
    'MIN-242': ['MIN-232','MIN-240','MAT-024'],
    'MIN-260': ['MIN-130','MIN-102','QUI-021','MIN-103'],
    'MIN-244': ['MIN-232','QUI-021','FIS-130'],
    'HIW-311':['HIW-310'],
    'IWN-170':['MAT-023'],
    'MIN-324':['MIN-240'],
    'MIN-314':['MIN-244','MIN-242'],
    'MIN-334':['MIN-242','MIN-244','MIN-233'],
    'MIN-270':['MIN-250','MIN-260'],
    'MIN-332':['MIN-250','MIN-260'],
    'MIN-344':['MIN-233','MIN-324','MIN-314'],
    'MIN-280':['MIN-270'],
    'IWN-270':['IWN-170'],
    'MIN-354':['MIN-270','MIN-334'],
    'MIN-364':['MIN-235','MIN-344','MIN-334','MIN-270'],
    'MIN-220':['MIN-270','IWI-131','MIN-334'],
    'MIN-384':['IWN-270','IWN-261','MIN-233'],
    'MIN-374':['MIN-280','MIN-332'],
    'MIN-370':['MIN-314','MIN-265'],
    'MIN-394':['MIN-334','MIN-270'],
    'MIN-397':['MIN-332','MIN-344','MIN-280'],
    'MIN-398':['MIN-397']
  };

  const approved = new Set();
  const buttons = document.querySelectorAll('.course-btn');

  // Inicializar estado
  buttons.forEach(btn => {
    const code = btn.dataset.code;
    if (prerequisites[code]) btn.disabled = true;
    btn.addEventListener('click', () => {
      if (btn.disabled || approved.has(code)) return;
      // Marcar aprobado
      approved.add(code);
      btn.classList.add('approved');
      btn.disabled = true;
      // Desbloquear dependientes
      Object.entries(prerequisites).forEach(([course, prereqs]) => {
        if (!approved.has(course)) {
          const listo = prereqs.every(p => approved.has(p));
          if (listo) {
            const depBtn = document.querySelector(`[data-code="${course}"]`);
            if (depBtn) depBtn.disabled = false;
          }
        }
      });
    });
  });
});
