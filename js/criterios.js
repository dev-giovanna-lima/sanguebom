const accordions=document.querySelectorAll('.accordionContent');

accordions.forEach(accordion =>{
  accordion.addEventListener('click', () => {
    const descricao = accordion.querySelector('.descricao');
    descricao.classList.toggle('active');
  })
})