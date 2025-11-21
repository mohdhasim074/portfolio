
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        const href = a.getAttribute('href');
        if(href.length>1){
          e.preventDefault();
          document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });

    // Reveal on scroll (IntersectionObserver)
    (function(){
      const obs = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.classList.add('show');
            obs.unobserve(entry.target);
          }
        });
      }, {threshold:0.12});
      document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
    })();

    // Contact form: build mailto fallback and simple validation
    (function(){
      const form = document.getElementById('contactForm');
      const sendBtn = document.getElementById('sendBtn');
      const status = document.getElementById('formStatus');

      form.addEventListener('submit', async (e)=>{
        e.preventDefault();
        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending...';
        status.textContent = '';

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if(!name || !email || !message){
          status.textContent = 'Please complete all fields.';
          sendBtn.disabled = false;
          sendBtn.textContent = 'Send Message';
          return;
        }

        // Construct a mailto link; this opens default mail client as fallback (no backend).
        const subject = encodeURIComponent('Portfolio contact from ' + name);
        const body = encodeURIComponent(
          'Name: ' + name + '\\n' +
          'Email: ' + email + '\\n\\n' +
          message
        );
        const mailto = 'mailto:mohdhasim0074@gmail.com?subject=' + subject + '&body=' + body;

        // Try to open mailto; also show a success message
        window.location.href = mailto;
        status.textContent = 'Your mail client should open. If not, please email mohdhasim0074@gmail.com directly.';
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send Message';
      });

      // allow pressing the button (form uses preventDefault) — also support Enter
      sendBtn.addEventListener('click', ()=>form.dispatchEvent(new Event('submit',{cancelable:true})));
    })();

    // Tiny accessibility tweak: focus visible styles
    (function(){
      document.addEventListener('keydown', (e)=>{
        if(e.key === 'Tab') document.documentElement.classList.add('show-focus');
      });
    })();
