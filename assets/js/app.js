(() => {
'use strict';
const c = window.CASA7 || {};
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const current = location.pathname.split('/').pop() || 'index.html';
$$('[data-nav]').forEach(a => {if (a.dataset.nav === current) a.setAttribute('aria-current','page')});
const menu = $('.menu-toggle');
menu?.addEventListener('click', () => {const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));$('#menu').classList.toggle('open',!open);menu.textContent=open?'☰':'✕';});
$('#menu')?.addEventListener('click', ev => {if(ev.target.closest('a')){menu?.setAttribute('aria-expanded','false');$('#menu').classList.remove('open');if(menu)menu.textContent='☰';}});
document.addEventListener('keydown', ev => {if(ev.key==='Escape' && $('#menu')?.classList.contains('open')){menu?.setAttribute('aria-expanded','false');$('#menu').classList.remove('open');if(menu)menu.textContent='☰';menu?.focus();}});
$$('[data-whatsapp]').forEach(a => {if(c.whatsapp?.startsWith('https://chat.whatsapp.com/')){a.href=c.whatsapp;a.target='_blank';a.rel='noopener noreferrer';}else{a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.title='O convite do grupo ainda não foi configurado';a.textContent='WhatsApp em breve';}});
$$('[data-spotify]').forEach(a=>{try{const u=new URL(c.playlistEmbed);if(u.hostname!=='open.spotify.com'||!u.pathname.startsWith('/embed/'))throw new Error('Spotify não configurado');u.pathname=u.pathname.replace('/embed/','/');u.search='';a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';}catch(e){a.hidden=true;}});
const welcomeBanner=$('#welcome-banner');
if(welcomeBanner && c.bannerInicial?.imagem){
 const bannerImage=welcomeBanner.querySelector('img');
 const expires=c.bannerInicial.ativoAte?new Date(c.bannerInicial.ativoAte).getTime():Infinity;
 let dismissed=false;
 try{dismissed=sessionStorage.getItem('casa7-banner-oracao-2026-v2')==='fechado';}catch(error){}
 if(bannerImage){bannerImage.src=c.bannerInicial.imagem;bannerImage.alt=c.bannerInicial.descricao||'Aviso da Casa 7';}
 const closeBanner=()=>{try{sessionStorage.setItem('casa7-banner-oracao-2026-v2','fechado');}catch(error){}welcomeBanner.classList.remove('is-visible');document.body.classList.remove('banner-open');setTimeout(()=>{welcomeBanner.hidden=true;},180);};
 const openBanner=()=>{welcomeBanner.hidden=false;document.body.classList.add('banner-open');requestAnimationFrame(()=>welcomeBanner.classList.add('is-visible'));};
 welcomeBanner.querySelector('[data-banner-close]')?.addEventListener('click',closeBanner);
 welcomeBanner.addEventListener('click',event=>{if(event.target===welcomeBanner)closeBanner();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape' && !welcomeBanner.hidden)closeBanner();});
 if(!dismissed && Date.now()<=expires)setTimeout(openBanner,700);
}
$$('[data-tech-mail]').forEach(a => {if(c.emailTecnico){a.href='mailto:'+encodeURIComponent(c.emailTecnico)}else{a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.title='Contato técnico a configurar';}});
const format = d => new Intl.DateTimeFormat('pt-BR',{dateStyle:'full',timeStyle:'short',timeZone:'America/Belem'}).format(d);
const events = (c.eventos||[]).filter(e=>e.inicio && !isNaN(new Date(e.inicio))).sort((a,b)=>new Date(a.inicio)-new Date(b.inicio));
const upcoming=events.filter(e=>new Date(e.fim||e.inicio).getTime()>=Date.now());
const el=$('#events');
if(el){if(!upcoming.length)el.innerHTML='<div class="empty"><span class="eyebrow">EM BREVE</span><h2>Agenda em preparação</h2><p>Assim que a turma confirmar os próximos encontros, as datas aparecerão aqui.</p></div>';else upcoming.forEach(e=>{const art=document.createElement('article');art.className='event';const text=document.createElement('div');const title=document.createElement('h2');title.textContent=e.titulo||'Encontro';const date=document.createElement('p');date.textContent=format(new Date(e.inicio));const local=document.createElement('p');local.textContent=e.local||'Local a confirmar';text.append(title,date,local);if(e.descricao){const d=document.createElement('p');d.textContent=e.descricao;text.append(d)}const actions=document.createElement('div');actions.className='event-actions';const google=document.createElement('a');google.className='btn';google.textContent='Google Agenda';google.href=googleCalendarUrl(e);google.target='_blank';google.rel='noopener noreferrer';const maps=document.createElement('a');maps.className='btn outline';maps.textContent='Como chegar';maps.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(e.local||'');maps.target='_blank';maps.rel='noopener noreferrer';const download=document.createElement('button');download.className='btn outline';download.textContent='Baixar evento';download.addEventListener('click',()=>downloadIcs(e));actions.append(google,maps,download);art.append(text,actions);el.append(art);});}
const first=upcoming[0];if(first){const title=$('#next-title');if(title)title.textContent=first.titulo||'Próximo encontro';const details=$('#next-details');if(details)details.textContent=format(new Date(first.inicio))+' · '+(first.local||'Local a confirmar');const count=$('#countdown');if(count){const update=()=>{const delta=new Date(first.inicio).getTime()-Date.now();if(delta<=0){count.textContent='É hoje!';return}const days=Math.floor(delta/86400000),hours=Math.floor(delta%86400000/3600000);count.textContent=days+' dias e '+hours+' horas';};update();setInterval(update,60000)}}
const cirioTimer=$('#cirio-timer');
const cirioEvent={titulo:'Círio de Nossa Senhora de Nazaré 2026',inicio:'2026-10-11T06:00:00-03:00',fim:'2026-10-11T12:00:00-03:00',local:'Catedral Metropolitana de Belém, Belém - PA',descricao:'Missa e procissão do Círio de Nossa Senhora de Nazaré 2026.'};
if(cirioTimer){const target=new Date(cirioTimer.dataset.cirioDate).getTime();const fields={days:cirioTimer.querySelector('[data-cirio-days]'),hours:cirioTimer.querySelector('[data-cirio-hours]'),minutes:cirioTimer.querySelector('[data-cirio-minutes]'),seconds:cirioTimer.querySelector('[data-cirio-seconds]')};const updateCirio=()=>{const delta=Math.max(0,target-Date.now());const values={days:Math.floor(delta/86400000),hours:Math.floor(delta%86400000/3600000),minutes:Math.floor(delta%3600000/60000),seconds:Math.floor(delta%60000/1000)};Object.entries(values).forEach(([key,value])=>{fields[key].textContent=String(value).padStart(2,'0')});cirioTimer.setAttribute('aria-label',delta>0?`${values.days} dias, ${values.hours} horas e ${values.minutes} minutos para o Círio de Nazaré`:'Chegou o Círio de Nazaré 2026');};updateCirio();setInterval(updateCirio,1000);}
$('[data-cirio-calendar]')?.addEventListener('click',()=>downloadIcs(cirioEvent));
const miniPlayer=$('#mini-player');
const audio=$('#audio-player');
const tracks=(c.musicas||[]).filter(track=>track && typeof track.arquivo==='string' && /\.mp3(?:[?#].*)?$/i.test(track.arquivo));
if(miniPlayer && audio && tracks.length){
 miniPlayer.hidden=false;
 const title=$('#player-title');
 const artist=$('#player-artist');
 const currentTime=$('#player-current');
 const duration=$('#player-duration');
 const progress=$('#player-progress');
 const volume=$('#player-volume');
 const toggle=$('[data-player-toggle]');
 const toggleIcon=$('[data-player-toggle-icon]');
 let currentTrack=0;
 const formatTime=seconds=>{if(!Number.isFinite(seconds))return '0:00';const minutes=Math.floor(seconds/60);return minutes+':'+String(Math.floor(seconds%60)).padStart(2,'0');};
 const setPlaying=playing=>{toggleIcon?.setAttribute('href','assets/img/icons.svg#'+(playing?'pause':'play'));if(toggle){toggle.setAttribute('aria-label',playing?'Pausar':'Reproduzir');toggle.title=playing?'Pausar':'Reproduzir';}};
 const loadTrack=index=>{currentTrack=(index+tracks.length)%tracks.length;const track=tracks[currentTrack];audio.src=track.arquivo;audio.load();if(title)title.textContent=track.titulo||'Faixa '+(currentTrack+1);if(artist)artist.textContent=track.artista||'Casa 7';if(progress)progress.value='0';if(currentTime)currentTime.textContent='0:00';if(duration)duration.textContent='0:00';};
 const playCurrent=()=>audio.play().catch(()=>setPlaying(false));
 const changeTrack=(step,keepPlaying=!audio.paused)=>{loadTrack(currentTrack+step);if(keepPlaying)playCurrent();};
 loadTrack(0);
 audio.volume=Number(volume?.value||0.8);
 toggle?.addEventListener('click',()=>{if(audio.paused)playCurrent();else audio.pause();});
 $('[data-player-prev]')?.addEventListener('click',()=>changeTrack(-1));
 $('[data-player-next]')?.addEventListener('click',()=>changeTrack(1));
 audio.addEventListener('play',()=>setPlaying(true));
 audio.addEventListener('pause',()=>setPlaying(false));
 audio.addEventListener('ended',()=>changeTrack(1,true));
 audio.addEventListener('loadedmetadata',()=>{if(duration)duration.textContent=formatTime(audio.duration);});
 audio.addEventListener('timeupdate',()=>{if(currentTime)currentTime.textContent=formatTime(audio.currentTime);if(progress && Number.isFinite(audio.duration))progress.value=String(audio.currentTime/audio.duration*100);});
 progress?.addEventListener('input',()=>{if(Number.isFinite(audio.duration))audio.currentTime=Number(progress.value)/100*audio.duration;});
 volume?.addEventListener('input',()=>{audio.volume=Number(volume.value);});
}
const dailyPrayer=$('#daily-prayer');
if(dailyPrayer){
 const today=new Date();
 const prayers=c.oracoesDaSemana||[];
 const prayer=prayers[today.getDay()]||{tema:'Oração do dia',texto:'Senhor, permanece conosco e conduz nossos passos neste dia. Amém.'};
 const dateLabel=$('#daily-date');
 const theme=$('#daily-theme');
 const dailyWord=$('[data-daily-word]');
 const sharePrayer=$('[data-share-prayer]');
 const shareStatus=$('#daily-share-status');
 if(dateLabel)dateLabel.textContent=new Intl.DateTimeFormat('pt-BR',{weekday:'long',day:'numeric',month:'long',timeZone:'America/Belem'}).format(today).toUpperCase();
 if(theme)theme.textContent=prayer.tema;
 dailyPrayer.textContent=prayer.texto;
 if(dailyWord){const year=today.getFullYear();const month=String(today.getMonth()+1).padStart(2,'0');const day=String(today.getDate()).padStart(2,'0');dailyWord.href=`https://www.vaticannews.va/pt/palavra-do-dia/${year}/${month}/${day}.html`;}
 sharePrayer?.addEventListener('click',async()=>{const text=`${prayer.tema}\n\n${prayer.texto}\n\nCasa 7 · Renascer Belém 2026`;try{if(navigator.share)await navigator.share({title:'Oração do dia · Casa 7',text});else{await navigator.clipboard.writeText(text);if(shareStatus)shareStatus.textContent='Oração copiada.';}}catch(error){if(error.name!=='AbortError' && shareStatus)shareStatus.textContent='Não foi possível compartilhar agora.';}});
}
function downloadIcs(e){
 const esc=s=>String(s||'').replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
 const utc=s=>new Date(s).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
 const start=utc(e.inicio),end=utc(e.fim||new Date(new Date(e.inicio).getTime()+3600000).toISOString());
 const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Casa7//Agenda//PT-BR','BEGIN:VEVENT','UID:casa7-'+Date.now()+'@example.invalid','DTSTAMP:'+utc(new Date().toISOString()),'DTSTART:'+start,'DTEND:'+end,'SUMMARY:'+esc(e.titulo),'DESCRIPTION:'+esc(e.descricao),'LOCATION:'+esc(e.local),'END:VEVENT','END:VCALENDAR'].join('\r\n');
 const url=URL.createObjectURL(new Blob([ics],{type:'text/calendar;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download='casa7-encontro.ics';a.click();URL.revokeObjectURL(url);
}
function googleCalendarUrl(e){
 const utc=s=>new Date(s).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
 const end=e.fim||new Date(new Date(e.inicio).getTime()+3600000).toISOString();
 const params=new URLSearchParams({action:'TEMPLATE',text:e.titulo||'Encontro da Casa 7',dates:utc(e.inicio)+'/'+utc(end),details:e.descricao||'',location:e.local||''});
 return 'https://calendar.google.com/calendar/render?'+params.toString();
}
const playlist=$('#playlist');if(playlist && c.playlistEmbed){try{const u=new URL(c.playlistEmbed);if((u.hostname==='open.spotify.com' && u.pathname.startsWith('/embed/')) || (u.hostname==='www.youtube.com' && u.pathname.startsWith('/embed/'))){playlist.innerHTML='';const frame=document.createElement('iframe');frame.src=u.href;frame.title='Playlist da Casa 7';frame.loading='lazy';frame.allow='encrypted-media; fullscreen; picture-in-picture';frame.referrerPolicy='strict-origin-when-cross-origin';playlist.append(frame)}}catch(e){}}
$('#contact-form')?.addEventListener('submit',ev=>{ev.preventDefault();const f=ev.currentTarget;if(!f.reportValidity())return;const assunto=$('#assunto').value;const email=assunto==='Suporte técnico'?c.emailTecnico:c.emailComunidade;const body='Nome: '+($('#nome').value.trim()||'Não informado')+'\nAssunto: '+assunto+'\n\n'+$('#mensagem').value.trim();if(!email){window.open('https://wa.me/?text='+encodeURIComponent('[Casa 7]\n\n'+body),'_blank','noopener');$('#form-status').textContent='O WhatsApp foi aberto com sua mensagem. Escolha a pessoa responsável e confirme o envio.';return;}location.href='mailto:'+encodeURIComponent(email)+'?subject='+encodeURIComponent('[Casa 7] '+assunto)+'&body='+encodeURIComponent(body);$('#form-status').textContent='Seu aplicativo de e-mail será aberto. Confira a mensagem e clique em Enviar.';});
const galleryDialog=$('#gallery-dialog');
$$('[data-gallery-src]').forEach(button=>button.addEventListener('click',()=>{if(!galleryDialog?.showModal)return;const source=button.dataset.gallerySrc;const preview=galleryDialog.querySelector('img');preview.src=source;preview.alt=button.querySelector('img')?.alt||'Fotografia ampliada da Casa 7';galleryDialog.showModal();}));
galleryDialog?.querySelector('.gallery-close')?.addEventListener('click',()=>galleryDialog.close());
galleryDialog?.addEventListener('click',ev=>{if(ev.target===galleryDialog)galleryDialog.close();});
})();
