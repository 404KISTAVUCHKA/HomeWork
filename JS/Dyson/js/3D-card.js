const cards = document.querySelectorAll('.advantages__card');

cards.forEach(card => {

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const ease = 0.1;

  function animate() {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    card.style.transform = `perspective(2000px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;

    requestAnimationFrame(animate);
  }

  animate();

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetX = (centerY - y) / 10;
    targetY = (x - centerX) / 10;
  });

  card.addEventListener('mouseleave', (e) => {
    targetX = 0;
    targetY = 0;
  });
});
