const fs = require('node:fs');
const brief = fs.readFileSync('C:/Users/Lorika/.codex/attachments/ed699484-3d85-4792-ac27-e204fe08fe12/Вставленный текст.txt','utf8');
const section = n => brief.split(new RegExp('### '+n+'\\.'))[1].split(/\r?\n---/)[0];
const quotes = n => [...section(n).split(/\r?\n/).slice(1).join("\n").matchAll(/«([\s\S]*?)»/g)].map(m=>m[1].replace(/\*\*/g,'').trim());
const cards = [...section(10).matchAll(/\*\*\d\. (.*?)\*\*\s+([^\r\n]+)/g)].map(m=>({title:m[1],text:m[2]}));
const config = {name:'INFINITUM',subtitle:'Пространство знаний, изучения себя и мира',channel:'https://t.me/proinfinitumm',contact:'https://t.me/infinitumpr',motto:'Жизнь должна стоить того, чтобы жить.',description:'INFINITUM — обучающие материалы и экспериментальные форматы изучения себя, устройства мира, жизненных закономерностей, мышления и возможностей человека',hero:quotes(7)[0],about:quotes(9)[0],directionsIntro:quotes(10)[0],cards,directionsEnd:quotes(10)[1],gameSubtitle:'Экспериментальная игра, которая даст ответ на любой запрос. Обучение системе мира.',game:quotes(11)[0],gameNews:quotes(11)[1],questionsIntro:quotes(13)[0],questions:[...section(13).matchAll(/^- (.+)/gm)].map(m=>m[1].trim()),questionsEnd:quotes(13)[1],audience:quotes(14)[0],channelText:quotes(16)[0],contactText:quotes(16)[2],final:quotes(17)[0],images:{hero:'assets/hero.jpg',game:'assets/game.jpg',mask:'assets/mask.jpg'},legal:null};
// The second quoted item is a button label, so select the contact paragraph explicitly.
config.contactText=quotes(16).find(t=>t.startsWith('Хотите'));
fs.writeFileSync('site.config.js','window.INFINITUM = '+JSON.stringify(config,null,2)+';\n');

