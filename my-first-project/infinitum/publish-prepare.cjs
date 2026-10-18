const fs=require('node:fs');
const origin='https://infinitum.calmpony5.chatgpt.site';
let html=fs.readFileSync('index.html','utf8').replace('content="assets/hero.jpg"','content="'+origin+'/assets/hero.jpg"');
if(!html.includes('rel="canonical"'))html=html.replace('</head>','<link rel="canonical" href="'+origin+'/"><meta property="og:url" content="'+origin+'/">\n</head>');
fs.writeFileSync('index.html',html);
fs.mkdirSync('dist',{recursive:true});for(const file of ['index.html','styles.css','app.js','site.config.js'])fs.copyFileSync(file,'dist/'+file);fs.cpSync('assets','dist/assets',{recursive:true});
const manifest=JSON.parse(fs.readFileSync('.openai/hosting.json','utf8'));manifest.static={directory:'dist'};fs.writeFileSync('.openai/hosting.json',JSON.stringify(manifest,null,2)+'\n');
fs.writeFileSync('.gitignore','infinitum-deploy.tar.gz\n');
