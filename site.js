/* 目次は config.json から作る（管理画面 admin.html で編集） */
function siteRender(root,unitPath){
  function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function card(href,t,s){return '<a href="'+esc(href)+'">'+esc(t)+(s?'<span>'+esc(s)+'</span>':'')+'</a>'}
  fetch(root+'config.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(c){
    var L=document.getElementById('list'),h='';
    if(!unitPath){
      document.getElementById('t').textContent=c.site_title||'数学 授業スライド';document.title=c.site_title||document.title;
      if(c.site_note)document.getElementById('note').textContent=c.site_note;
      (c.units||[]).forEach(function(u){if(u.show!==false)h+=card(u.path,u.title,u.sub)});
    }else{
      var u=(c.units||[]).filter(function(x){return x.path===unitPath})[0];
      if(!u||u.show===false){L.innerHTML='<p class="note">このページは現在公開されていません。</p>';return}
      document.getElementById('t').textContent=u.title;document.title=u.title+' スライド';
      if(u.note)document.getElementById('note').textContent=u.note;
      (u.decks||[]).forEach(function(d){if(d.show!==false)h+=card(d.path,d.title,d.sub)});
    }
    L.innerHTML=h||'<p class="note">公開中のスライドはありません。</p>';
  }).catch(function(){document.getElementById('list').innerHTML='<p class="note">目次を読み込めませんでした。再読み込みしてください。</p>'});
}
