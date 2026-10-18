'use strict';
const c = window.INFINITUM;
const el = (tag,text,className) => {const n=document.createElement(tag);if(text)n.textContent=text;if(className)n.className=className;return n;};
function paragraphs(node,text){(text||'').split(/\r?\n\s*\r?\n/).filter(Boolean).forEach(t=>node.append(el('p',t.trim())));}
document.querySelectorAll('[data-text]').forEach(n=>n.textContent=c[n.dataset.text]||'');
document.querySelectorAll('[data-paragraphs]').forEach(n=>paragraphs(n,c[n.dataset.paragraphs]));
document.querySelectorAll('[data-link]').forEach(n=>{n.href=c[n.dataset.link];n.target='_blank';n.rel='noopener noreferrer';});
c.cards.forEach((card,i)=>{const a=el('article');a.append(el('span',String(i+1).padStart(2,'0'),'card-number'),el('h3',card.title),el('p',card.text));document.querySelector('#cards').append(a);});
c.questions.forEach((q,i)=>{const li=el('li');li.append(el('span',String(i+1).padStart(2,'0')),el('div',q));document.querySelector('#questions').append(li);});
document.querySelectorAll('[data-marquee]').forEach(n=>{const track=el('div',null,'marquee-track');track.setAttribute('aria-hidden','true');const text=Array(4).fill(n.dataset.marquee+' ·').join(' ');track.append(el('span',text),el('span',text));n.append(track);});
document.querySelectorAll('[data-image]').forEach(n=>{n.onload=()=>{n.hidden=false;n.parentElement.classList.add("has-original");const note=n.parentElement.querySelector('.asset-note');if(note)note.hidden=true;};n.onerror=()=>{n.hidden=true;};n.src=c.images[n.dataset.image];});
const menu=document.querySelector('#menu'),nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();if(document.activeElement.closest('#navigation'))menu.focus();}});
if(c.legal){const n=document.querySelector('#legal');n.textContent=c.legal;n.hidden=false;}
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.05});document.querySelectorAll('.section').forEach(n=>{n.classList.add('reveal');observer.observe(n);});}
