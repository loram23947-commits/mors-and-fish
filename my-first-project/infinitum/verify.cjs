const fs=require('node:fs'),vm=require('node:vm');
const context={window:{}};vm.runInNewContext(fs.readFileSync('site.config.js','utf8'),context);const c=context.window.INFINITUM;
if(c.cards.length!==6||c.questions.length!==7)throw Error('Content count');
for(const key of ['hero','about','directionsIntro','directionsEnd','game','gameNews','questionsIntro','questionsEnd','audience','channelText','contactText','final']){if(!c[key])throw Error('Missing '+key);console.log(key+': '+c[key].length+' characters');}
if(c.channel!=='https://t.me/proinfinitumm'||c.contact!=='https://t.me/infinitumpr')throw Error('Links');
const html=fs.readFileSync('index.html','utf8');if((html.match(/<h1>/g)||[]).length!==1)throw Error('H1');
for(const m of html.matchAll(/href="#([^"]+)"/g)){if(!html.includes('id="'+m[1]+'"'))throw Error('Anchor '+m[1]);}
console.log('PASS: 6 cards, 7 questions, all content, Telegram links, one H1, internal anchors');
