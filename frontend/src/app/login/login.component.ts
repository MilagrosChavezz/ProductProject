import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    const emojiContainer = this.renderer.createElement('div');
    this.renderer.setStyle(emojiContainer, 'position', 'fixed');
    this.renderer.setStyle(emojiContainer, 'top', '0');
    this.renderer.setStyle(emojiContainer, 'left', '0');
    this.renderer.setStyle(emojiContainer, 'width', '100%');
    this.renderer.setStyle(emojiContainer, 'height', '100%');
    this.renderer.setStyle(emojiContainer, 'z-index', '-1');
    this.renderer.setStyle(emojiContainer, 'pointer-events', 'none');
    this.renderer.appendChild(this.el.nativeElement, emojiContainer);

    const icons = [
  `<svg xmlns="http://www.w3.org/2000/svg" fill="#f1c40f" width="32" height="32" viewBox="0 0 24 24"><path d="M7 4h-2l-3 7v2h2l3-7zm0 7h11l3-7h-14l-3 7zm4.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" fill="#f1c40f" width="32" height="32" viewBox="0 0 24 24"><path d="M4 4h16v2h-16zm0 4h16v12h-16zm2 2v8h12v-8h-12z"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" fill="#f1c40f" width="32" height="32" viewBox="0 0 24 24"><path d="M20 6h-16l-2 6h20zm-16 10h12v2h-12z"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" fill="#f1c40f" width="32" height="32" viewBox="0 0 24 24"><path d="M3 6l3 16h12l3-16h-18zm3.5 2h11l-2.2 10h-6.6l-2.2-10z"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" fill="#f1c40f" width="32" height="32" viewBox="0 0 24 24"><path d="M6 2l-4 4v2h16v-2l-4-4h-8zm10 7v11h-12v-11h12z"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" fill="#f1c40f" width="32" height="32" viewBox="0 0 24 24"><path d="M5 18l2-6h10l-1 5-6 1-5-1z"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" fill="#f1c40f" width="32" height="32" viewBox="0 0 24 24"><path d="M2 7l10-5 10 5v11l-10 5-10-5v-11z"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" fill="#f1c40f" width="32" height="32" viewBox="0 0 24 24"><path d="M12 2l7 7-7 7-7-7 7-7z"/></svg>`
];

    const createIcon = () => {
      const container = this.renderer.createElement('div');
      this.renderer.addClass(container, 'emoji');

      const iconSvg = icons[Math.floor(Math.random() * icons.length)];
      container.innerHTML = iconSvg;

      container.style.left = Math.random() * 100 + 'vw';
      container.style.animationDuration = 4 + Math.random() * 5 + 's';
      container.style.animationDelay = Math.random() * 2 + 's';

      this.renderer.appendChild(emojiContainer, container);

      setTimeout(() => {
        this.renderer.removeChild(emojiContainer, container);
      }, 9000);
    };

    setInterval(createIcon, 500);
  }
}