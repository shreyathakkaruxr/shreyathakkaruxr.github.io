/* Adds left/right arrow buttons under any area that scrolls sideways (mostly on phones). */
(function(){
  var SEL='.carousel,.hero,.flow,.hc-hero,.hc-fw';
  var css='.hs-nav{display:flex;align-items:center;gap:8px;margin:10px 0 0}.hs-nav .hs-hint{margin-right:auto;font-size:13px;color:#6e6e73}.hs-hinted::after{display:none!important}.hs-nav[hidden]{display:none}'+
    '.hs-nav button{width:36px;height:36px;border-radius:50%;border:1px solid #d2d2d7;background:#fff;color:#1d1d1f;display:grid;place-items:center;padding:0;cursor:pointer}'+
    '.hs-nav button:disabled{opacity:.35;cursor:default}.hs-nav button:focus-visible{outline:2px solid #1d1d1f;outline-offset:2px}'+
    '.hs-nav svg{width:16px;height:16px}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var chev=function(d){return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+d+'"/></svg>'};
  [].forEach.call(document.querySelectorAll(SEL),function(el,i){
    if(!el.id)el.id='hs-'+i;
    var after=getComputedStyle(el,'::after').content||'',hint='Swipe to see more';
    if(/Swipe/.test(after)){hint='Swipe to see the full diagram';el.classList.add('hs-hinted');}
    var nav=document.createElement('div');nav.className='hs-nav';nav.hidden=true;
    nav.innerHTML='<span class="hs-hint">'+hint+'</span>'+'<button type="button" aria-label="Scroll left" aria-controls="'+el.id+'">'+chev('M10 3 5 8l5 5')+'</button>'+
                  '<button type="button" aria-label="Scroll right" aria-controls="'+el.id+'">'+chev('M6 3l5 5-5 5')+'</button>';
    el.parentNode.insertBefore(nav,el.nextSibling);
    var prev=nav.children[1],next=nav.children[2];
    function go(dir){el.scrollBy({left:dir*el.clientWidth*.8,behavior:reduce?'auto':'smooth'})}
    prev.addEventListener('click',function(){go(-1)});next.addEventListener('click',function(){go(1)});
    function update(){var ox=getComputedStyle(el).overflowX,can=(ox==='auto'||ox==='scroll')&&el.scrollWidth>el.clientWidth+4;
      nav.hidden=!can;if(!can)return;prev.disabled=el.scrollLeft<=2;next.disabled=el.scrollLeft>=el.scrollWidth-el.clientWidth-2;}
    el.addEventListener('scroll',update,{passive:true});addEventListener('resize',update);addEventListener('load',update);update();
  });
})();
