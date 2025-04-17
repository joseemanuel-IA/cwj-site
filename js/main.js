// JavaScript para o site da CWJ Consultoria CRM

document.addEventListener('DOMContentLoaded', function() {
    // Variáveis
    const header = document.querySelector('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    
    // Função para alternar o menu mobile
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    // Função para fechar o menu mobile ao clicar em um link
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
    
    // Função para destacar o link ativo no menu
    function highlightActiveLink() {
        let scrollPosition = window.scrollY;
        
        // Adiciona classe 'scrolled' ao header quando a página é rolada
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Destaca o link ativo com base na seção visível
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Função para rolagem suave ao clicar nos links do menu
    function smoothScroll(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetPosition = document.querySelector(targetId).offsetTop - 80;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        closeMobileMenu();
    }
    
    // Função para animar os números nas estatísticas
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            const prefix = stat.textContent.replace(/[0-9]/g, '').replace(/\+/g, '');
            const suffix = stat.textContent.includes('+') ? '+' : '';
            let current = 0;
            const increment = target / 50;
            const duration = 1500;
            const stepTime = duration / 50;
            
            function updateCount() {
                current += increment;
                if (current < target) {
                    stat.textContent = `${prefix}${Math.floor(current)}${suffix}`;
                    setTimeout(updateCount, stepTime);
                } else {
                    stat.textContent = `${prefix}${target}${suffix}`;
                }
            }
            
            // Inicia a animação quando a seção estiver visível
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        });
    }
    
    // Função para animar a entrada dos elementos
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .timeline-item, .plan-card, .about-content, .contact-content');
        
        elements.forEach(element => {
            element.classList.add('animate-on-scroll');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        });
    }
    
    // Função para alternar entre os planos
    function togglePlanDuration() {
        const planOptions = document.querySelectorAll('.plan-option input');
        const planPrices = document.querySelectorAll('.plan-price');
        
        planOptions.forEach(option => {
            option.addEventListener('change', function() {
                const duration = this.id.split('-')[1];
                
                // Lógica para atualizar preços com base na duração selecionada
                // Implementação depende dos preços reais
            });
        });
    }
    
    // Função para validar o formulário de contato
    function validateContactForm() {
        const form = document.querySelector('.contact-form form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const message = document.getElementById('message').value;
                
                if (name && email && phone && message) {
                    // Aqui seria implementada a lógica de envio do formulário
                    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    form.reset();
                } else {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                }
            });
        }
    }
    
    // Função para validar o formulário de newsletter
    function validateNewsletterForm() {
        const form = document.querySelector('.footer-newsletter form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = form.querySelector('input[type="email"]').value;
                
                if (email) {
                    // Aqui seria implementada a lógica de inscrição na newsletter
                    alert('Inscrição realizada com sucesso!');
                    form.reset();
                } else {
                    alert('Por favor, informe seu e-mail.');
                }
            });
        }
    }
    
    // Função para criar efeito de partículas no fundo
    function createParticlesEffect() {
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const canvas = document.createElement('canvas');
            canvas.classList.add('particles-canvas');
            heroSection.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            let width = canvas.width = heroSection.offsetWidth;
            let height = canvas.height = heroSection.offsetHeight;
            
            // Array para armazenar as partículas
            const particles = [];
            const particleCount = 50;
            
            // Classe para criar partículas
            class Particle {
                constructor() {
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.size = Math.random() * 3 + 1;
                    this.speedX = Math.random() * 2 - 1;
                    this.speedY = Math.random() * 2 - 1;
                    this.color = `rgba(0, 204, 255, ${Math.random() * 0.5})`;
                }
                
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    
                    if (this.x > width || this.x < 0) {
                        this.speedX = -this.speedX;
                    }
                    
                    if (this.y > height || this.y < 0) {
                        this.speedY = -this.speedY;
                    }
                }
                
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            // Inicializa as partículas
            function init() {
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }
            
            // Anima as partículas
            function animate() {
                ctx.clearRect(0, 0, width, height);
                
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                    
                    // Conecta partículas próximas
                    for (let j = i; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(0, 204, 255, ${0.1 - distance/1000})`;
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
                
                requestAnimationFrame(animate);
            }
            
            // Redimensiona o canvas quando a janela é redimensionada
            window.addEventListener('resize', function() {
                width = canvas.width = heroSection.offsetWidth;
                height = canvas.height = heroSection.offsetHeight;
            });
            
            init();
            animate();
        }
    }
    
    // Inicializa todas as funções
    function init() {
        // Event Listeners
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        navLinks.forEach(link => link.addEventListener('click', smoothScroll));
        window.addEventListener('scroll', highlightActiveLink);
        
        // Inicializa funções
        highlightActiveLink();
        animateStats();
        animateOnScroll();
        togglePlanDuration();
        validateContactForm();
        validateNewsletterForm();
        createParticlesEffect();
        
        // Adiciona classe para animações CSS
        document.body.classList.add('loaded');
    }
    
    // Inicializa o script
    init();
});
