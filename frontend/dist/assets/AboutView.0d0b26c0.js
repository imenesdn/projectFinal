import{_ as S,u as w,a as x,o as v,b as d,c as u,d as a,w as e,V as y,e as i,f as _,F as k,r as C,g as p,h as b,i as I,j as A,k as m,t as h,l as B,m as n,p as T,n as N}from"./index.95a019cf.js";import{c as P,V as j,a as F,b as L}from"./VCard.0b9c3d2f.js";const $=P("v-spacer","div","VSpacer");const g=o=>(T("data-v-4ccd28ce"),o=o(),N(),o),D={style:{"background-color":"rgb(254, 251, 246)"}},O=g(()=>n("h2",{class:"pb-1 text-h4 font-weight-medium text-grey-darken-3"},"NOS PRODUITS",-1)),R=g(()=>n("hr",{class:"shortLine"},null,-1)),U={class:"text-h6"},z={__name:"AboutView",setup(o){const c=w(),r=x(),f=async l=>{if(r.isAuthenticated)try{const t=await c.addToCart(l,1);r.showSnack(t==null?void 0:t.message),await c.getPaniers()}catch(t){r.showSnack(t==null?void 0:t.data.message)}else r.showSnack("Login to add Item to cart")};return v(async()=>{await c.getPrducts()}),(l,t)=>(d(),u("div",D,[a(y,{class:"px-2 py-5"},{default:e(()=>[a(i,null,{default:e(()=>[a(_,{cols:"12"},{default:e(()=>[O,R]),_:1})]),_:1}),a(i,{class:"py-2"},{default:e(()=>[(d(!0),u(k,null,C(p(c).products,(s,V)=>(d(),b(_,{sm:"12",md:"3",key:V},{default:e(()=>[a(j,{class:"mx-auto Card","max-width":"344"},{default:e(()=>[a(I,{class:"rounded",height:"200px",src:s.cheminImage?`${p(A)+s.cheminImage}`:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",cover:""},null,8,["src"]),a(F,null,{default:e(()=>[m(h(s.nom),1)]),_:2},1024),a(L,null,{default:e(()=>[a(B,{onClick:E=>f(s.produitId),class:"bg-primary",rounded:""},{default:e(()=>[m(" Commandez ")]),_:2},1032,["onClick"]),a($),n("div",U,"$"+h(s.prix),1)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]))}};var G=S(z,[["__scopeId","data-v-4ccd28ce"]]);export{G as default};
