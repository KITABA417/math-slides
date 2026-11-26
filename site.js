/* 目次は config.json から作る（管理画面 admin.html で編集）
   mode: 'grade' = 学年ページ（key は学年ページのパス） / 'unit' = 単元ページ（key は単元のパス） */
function siteRender(root,mode,key){
  function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function card(href,t,s){return '<a href="'+esc(href)+'">'+esc(t)+(s?'<span>'+esc(s)+'</span>':'')+'</a>'}
  var L=document.getElementById('list');
  function off(){L.innerHTML='<p class="note">このページは現在公開されていません。</p>'}
  fetch(root+'config.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(c){
    var h='',G=c.grades||[],U=c.units||[];
    if(mode==='grade'){
      var g=G.filter(function(x){return x.path===key})[0];if(!g||g.show===false)return off();
      document.getElementById('t').textContent=g.title;document.title=g.title;
      if(g.note)document.getElementById('note').textContent=g.note;
      U.forEach(function(u){if(u.grade===g.id&&u.show!==false)h+=card(root+u.path+'',u.title,u.sub)});
    }else{
      var u=U.filter(function(x){return x.path===key})[0];if(!u||u.show===false)return off();
      var g=G.filter(function(x){return x.id===u.grade})[0],bk=document.querySelector('a.back');
      if(bk){if(g&&g.show!==false)bk.href=root+g.path;else bk.style.display='none'}
      document.getElementById('t').textContent=u.title;document.title=u.title;
      if(u.note)document.getElementById('note').textContent=u.note;
      (u.decks||[]).forEach(function(d){if(d.show!==false)h+=card(d.path,d.title,d.sub)});
    }
    L.innerHTML=h||'<p class="note">公開中のスライドはありません。</p>';
  }).catch(function(){L.innerHTML='<p class="note">目次を読み込めませんでした。再読み込みしてください。</p>'});
}
