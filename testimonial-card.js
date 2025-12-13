class TestimonialCard extends HTMLElement {
      constructor(){
        super();
      }

      connectedCallback(){
        const name = this.getAttribute('name') || 'Anonymous';
        const business = this.getAttribute('business') || '';
        const review = this.getAttribute('review') || '';
        const avatar = this.getAttribute('avatar') || '';

        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = `
          <style>
            :host {
              display:block;
              width:100%;
              min-height: 260px;
              box-sizing: border-box;
              background: var(--card-bg, #fff);
              border-radius: 12px;
              padding: 26px;
              color: #111;
            }

            .card {
              display:flex;
              flex-direction: column;
              height:100%;
            }

            .quoteMark {
              font-size:28px;
              color: ${'var(--accent, #f6b21a)'};
              margin-bottom: 6px;
            }

            .review {
              font-size: 15px;
              color: #374151;
              line-height: 1.6;
              margin: 6px 0 14px 0;
              font-style: italic;
              flex: 1; /* pushes footer to bottom */
            }

            .footer {
              display:flex;
              align-items:center;
              gap:12px;
              margin-top: 12px;
            }

            .avatar {
              width:48px;
              height:48px;
              border-radius:50%;
              object-fit:cover;
              flex: 0 0 48px;
              background: #efefef;
            }

            .meta {
              display:flex;
              flex-direction:column;
              justify-content:center;
            }

            .meta .name {
              font-weight: 600;
              font-size: 14px;
              color: #0f172a;
            }

            .meta .business {
              font-size: 13px;
              color: #6b7280;
            }
          </style>

          <article class="card" role="article" aria-label="testimonial by ${name}">
            <div class="quoteMark">"</i></div>
            <div class="review">${review}</div>
            <div class="footer">
              <img class="avatar" src="${avatar}" alt="${name} avatar" onerror="this.style.visibility='hidden'">
              <div class="meta">
                <div class="name">${name}</div>
                <div class="business">${business}</div>
              </div>
            </div>
          </article>
        `;
      }
    }
    customElements.define('testimonial-card', TestimonialCard);