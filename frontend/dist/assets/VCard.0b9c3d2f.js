import{q as g,s as ee,v as ae,x as y,y as te,z as ne,A as C,d as n,B as I,I as m,C as A,D,E as le,G as L,H as z,J as N,K as R,L as F,M as E,N as M,O as ie,i as O,P as V,Q as b,R as $,F as B,S as se,T as de,U as ce,W as ue,X as re,Y as ve,Z as oe,$ as me,a0 as ge,a1 as ye,a2 as fe,a3 as ke,a4 as be,a5 as Ce,a6 as Ve,a7 as T,a8 as Ie,a9 as Ae,aa as he}from"./index.95a019cf.js";function h(e){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",t=arguments.length>2?arguments[2]:void 0;return g()({name:t!=null?t:ee(ae(e.replace(/__/g,"-"))),props:{tag:{type:String,default:i},...y()},setup(a,c){let{slots:l}=c;return()=>{var d;return te(a.tag,{class:[e,a.class],style:a.style},(d=l.default)==null?void 0:d.call(l))}}})}const Se=g()({name:"VCardActions",props:y(),setup(e,i){let{slots:t}=i;return ne({VBtn:{slim:!0,variant:"text"}}),C(()=>{var a;return n("div",{class:["v-card-actions",e.class],style:e.style},[(a=t.default)==null?void 0:a.call(t)])}),{}}}),Pe=h("v-card-subtitle"),xe=h("v-card-title");const Be=I({start:Boolean,end:Boolean,icon:m,image:String,text:String,...y(),...A(),...D(),...le(),...L(),...z(),...N({variant:"flat"})},"VAvatar"),_=g()({name:"VAvatar",props:Be(),setup(e,i){let{slots:t}=i;const{themeClasses:a}=R(e),{colorClasses:c,colorStyles:l,variantClasses:d}=F(e),{densityClasses:v}=E(e),{roundedClasses:o}=M(e),{sizeClasses:r,sizeStyles:s}=ie(e);return C(()=>n(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},a.value,c.value,v.value,o.value,r.value,d.value,e.class],style:[l.value,s.value,e.style]},{default:()=>[t.default?n(b,{key:"content-defaults",defaults:{VImg:{cover:!0,image:e.image},VIcon:{icon:e.icon}}},{default:()=>[t.default()]}):e.image?n(O,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?n(V,{key:"icon",icon:e.icon},null):e.text,$(!1,"v-avatar")]})),{}}}),Te=I({appendAvatar:String,appendIcon:m,prependAvatar:String,prependIcon:m,subtitle:[String,Number],title:[String,Number],...y(),...A()},"VCardItem"),_e=g()({name:"VCardItem",props:Te(),setup(e,i){let{slots:t}=i;return C(()=>{var r;const a=!!(e.prependAvatar||e.prependIcon),c=!!(a||t.prepend),l=!!(e.appendAvatar||e.appendIcon),d=!!(l||t.append),v=!!(e.title!=null||t.title),o=!!(e.subtitle!=null||t.subtitle);return n("div",{class:["v-card-item",e.class],style:e.style},[c&&n("div",{key:"prepend",class:"v-card-item__prepend"},[t.prepend?n(b,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},t.prepend):n(B,null,[e.prependAvatar&&n(_,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&n(V,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),n("div",{class:"v-card-item__content"},[v&&n(xe,{key:"title"},{default:()=>{var s,u;return[(u=(s=t.title)==null?void 0:s.call(t))!=null?u:e.title]}}),o&&n(Pe,{key:"subtitle"},{default:()=>{var s,u;return[(u=(s=t.subtitle)==null?void 0:s.call(t))!=null?u:e.subtitle]}}),(r=t.default)==null?void 0:r.call(t)]),d&&n("div",{key:"append",class:"v-card-item__append"},[t.append?n(b,{key:"append-defaults",disabled:!l,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},t.append):n(B,null,[e.appendIcon&&n(V,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&n(_,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])])}),{}}}),De=h("v-card-text"),Le=I({appendAvatar:String,appendIcon:m,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:m,ripple:{type:[Boolean,Object],default:!0},subtitle:[String,Number],text:[String,Number],title:[String,Number],...se(),...y(),...A(),...de(),...ce(),...ue(),...re(),...ve(),...D(),...oe(),...L(),...z(),...N({variant:"elevated"})},"VCard"),Ne=g()({name:"VCard",directives:{Ripple:me},props:Le(),setup(e,i){let{attrs:t,slots:a}=i;const{themeClasses:c}=R(e),{borderClasses:l}=ge(e),{colorClasses:d,colorStyles:v,variantClasses:o}=F(e),{densityClasses:r}=E(e),{dimensionStyles:s}=ye(e),{elevationClasses:u}=fe(e),{loaderClasses:H}=ke(e),{locationStyles:j}=be(e),{positionClasses:q}=Ce(e),{roundedClasses:w}=M(e),f=Ve(e,t),G=T(()=>e.link!==!1&&f.isLink.value),k=T(()=>!e.disabled&&e.link!==!1&&(e.link||f.isClickable.value));return C(()=>{const J=G.value?"a":e.tag,K=!!(a.title||e.title!=null),Q=!!(a.subtitle||e.subtitle!=null),U=K||Q,W=!!(a.append||e.appendAvatar||e.appendIcon),X=!!(a.prepend||e.prependAvatar||e.prependIcon),Y=!!(a.image||e.image),Z=U||X||W,p=!!(a.text||e.text!=null);return Ie(n(J,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":k.value},c.value,l.value,d.value,r.value,u.value,H.value,q.value,w.value,o.value,e.class],style:[v.value,s.value,j.value,e.style],href:f.href.value,onClick:k.value&&f.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var S;return[Y&&n("div",{key:"image",class:"v-card__image"},[a.image?n(b,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):n(O,{key:"image-img",cover:!0,src:e.image},null)]),n(he,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:a.loader}),Z&&n(_e,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:a.item,prepend:a.prepend,title:a.title,subtitle:a.subtitle,append:a.append}),p&&n(De,{key:"text"},{default:()=>{var P,x;return[(x=(P=a.text)==null?void 0:P.call(a))!=null?x:e.text]}}),(S=a.default)==null?void 0:S.call(a),a.actions&&n(Se,null,{default:a.actions}),$(k.value,"v-card")]}}),[[Ae("ripple"),k.value&&e.ripple]])}),{}}});export{Ne as V,xe as a,Se as b,h as c};