// Lanzar confeti
export const launchConfetti = () => {
  // Verificar que estamos en el navegador
  if (typeof document === 'undefined') return;
  
  for(let i = 0; i < 30; i++) {
    setTimeout(() => {
      for(let j = 0; j < 5; j++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.remove();
          }
        }, 3000);
      }
    }, i * 100);
  }
};

// Mostrar popup de XP
export const showXPPopup = (points) => {
  if (typeof document === 'undefined') return;
  
  const popup = document.createElement('div');
  popup.className = 'xp-popup';
  popup.textContent = `+${points} XP!`;
  document.body.appendChild(popup);
  
  setTimeout(() => {
    if (popup.parentNode) {
      popup.remove();
    }
  }, 2000);
};

// Obtener color aleatorio
export const getRandomColor = () => {
  const colors = ['#58CC02', '#FFD700', '#7B61FF', '#1CB0F6', '#FF5252'];
  return colors[Math.floor(Math.random() * colors.length)];
};