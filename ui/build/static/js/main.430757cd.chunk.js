(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{357:function(e,t,a){},485:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a.n(c),r=a(16),s=a.n(r),o=(a(357),a(572)),i=a(571),j=a(25),b=a(543),d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=localStorage.getItem("user"),c=a?JSON.parse(a).api_token:null;t||(t={}),t.headers||(t.headers=new Headers);t.headers.get("Content-Type");return t.headers.set("Accept","application/json"),t.headers.set("Authorization","Bearer "+c),u(e,t)},u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.headers||new Headers({Accept:"application/json"});return a.has("Content-Type")||t&&t.body&&t.body instanceof FormData||a.set("Content-Type","application/json"),t.user&&t.user.authenticated&&t.user.token&&a.set("Authorization",t.user.token),fetch(e,Object(j.a)(Object(j.a)({},t),{},{headers:a})).then((function(e){return e.text().then((function(t){return{status:e.status,statusText:e.statusText,headers:e.headers,body:t}}))})).then((function(e){var t,a,c=e.status,n=e.statusText,r=e.headers,s=e.body;try{t=JSON.parse(s)}catch(o){}return c<200||c>=300?(t&&t.errors?a=t.errors[Object.keys(t.errors)[0]][0]:t&&t.message&&(a=t.message),Promise.reject(new b.a(a||n,c,t))):Promise.resolve({status:c,headers:r,body:s,json:t})}))},O=a(121),l="http://localhost:3000/api",x={getList:function(e,t){var a=t.pagination,c=a.page,n=a.perPage,r=t.sort,s=r.field,o=r.order,i=Object(j.a)({},t.filter),b=Object(j.a)({},t);delete b.filter,delete b.sort,delete b.pagination;var u=Object(j.a)({sortBy:"".concat(s||"createdAt",":").concat(o.toLowerCase()),page:c||1,limit:n||10},b);for(var x in i)if(""!=i[x]&&i[x])if(i[x].constructor===Array)for(var h=0;h<i[x].length;h++)u["filter["+x+"]["+h+"]"]=i[x][h];else u["filter["+x+"]"]=i[x];var f="".concat(l,"/").concat(e,"?").concat(Object(O.stringify)(u));return d(f).then((function(e){e.headers;var t=e.json;return{data:t.data,total:t.total}}))},getOne:function(e,t){var a="".concat(l,"/").concat(e,"/").concat(t.id);return a=t.endpointExt?a+"/"+t.endpointExt:a,t.params&&(a=a+"?"+Object(O.stringify)(t.params)),d(a).then((function(e){return{data:e.json}}))},getMany:function(e,t){for(var a={sortBy:"createdAt:desc",limit:25},c=0;c<t.ids.length;c++)a["filter[id]["+c+"]"]=t.ids[c];var n="".concat(l,"/").concat(e,"?").concat(Object(O.stringify)(a));return d(n).then((function(e){return{data:e.json.data}}))},getManyReference:function(e,t){var a=t.pagination,c=a.page,n=a.perPage,r=t.sort,s=r.field,o=r.order,i=Object(j.a)({},t.filter);i[t.target]=t.id;var b={sortBy:"".concat(s||"createdAt",":").concat(o.toLowerCase()),page:c||1,limit:n||10};for(var u in i)if(i[u].constructor===Array)for(var x=0;x<i[u].length;x++)b["filter["+u+"]["+x+"]"]=i[u][x];else b["filter["+u+"]"]=i[u];var h="".concat(l,"/").concat(e,"?").concat(Object(O.stringify)(b));return d(h).then((function(e){e.headers;var t=e.json;return{data:t.data,total:t.total}}))},update:function(e,t){"".concat(l,"/").concat(e,"/").concat(t.id),new FormData;return d("".concat(l,"/").concat(e,"/").concat(t.id),{method:"PUT",body:JSON.stringify(t.data)}).then((function(e){return{data:e.json}}))},updateMany:function(e,t){var a={filter:JSON.stringify({id:t.ids})};return d("".concat(l,"/").concat(e,"?").concat(Object(O.stringify)(a)),{method:"PUT",body:JSON.stringify(t.data)}).then((function(e){return{data:e.json}}))},create:function(e,t){"".concat(l,"/").concat(e),new FormData;return d("".concat(l,"/").concat(e),{method:"POST",body:JSON.stringify(t.data)}).then((function(e){return{data:e.json}}))},delete:function(e,t){return d("".concat(l,"/").concat(e,"/").concat(t.id),{method:"DELETE"}).then((function(e){return{data:e.json}}))},deleteMany:function(e,t){var a="".concat(l,"/").concat(e,"/").concat(encodeURIComponent(JSON.stringify(t.ids)));return d(a,{method:"DELETE"}).then((function(e){return{data:e.json}}))}},h=a(582),f=a(550),p=a(575),y=a(573),g=a(562),v=a(563),m=a(564),w=a(565),A=a(578),T=a(574),D=a(300),S=a(577),I=a(579),N=a(576),P=a(589),B=a(587),C=a(284),E=a.n(C),J=a(7),k=E.a,F=function(e){return Object(J.jsx)(h.a,Object(j.a)(Object(j.a)({},e),{},{children:Object(J.jsx)(f.a,{label:"Search by name",source:"q",alwaysOn:!0})}))},L=function(e){return Object(J.jsx)(p.a,Object(j.a)(Object(j.a)({title:"Gateways"},e),{},{filters:Object(J.jsx)(F,{}),bulkActionButtons:!1,children:Object(J.jsxs)(y.a,{children:[Object(J.jsx)(g.a,{source:"_id",label:"ID"}),Object(J.jsx)(g.a,{source:"name"}),Object(J.jsx)(g.a,{source:"serialNumber"}),Object(J.jsx)(g.a,{source:"ipAddress"}),Object(J.jsx)(v.a,{source:"createdAt"}),Object(J.jsx)(v.a,{source:"updatedAt"}),Object(J.jsx)(m.a,{}),Object(J.jsx)(w.a,{})]})}))},M=function(e){return Object(J.jsx)(A.a,Object(j.a)(Object(j.a)({},e),{},{children:Object(J.jsxs)(T.a,{children:[Object(J.jsx)(f.a,{source:"name",validate:Object(D.b)()}),Object(J.jsx)(f.a,{source:"serialNumber",validate:Object(D.b)()}),Object(J.jsx)(f.a,{source:"ipAddress",validate:Object(D.b)()})]})}))},U=function(e){return Object(J.jsx)(S.a,Object(j.a)(Object(j.a)({},e),{},{children:Object(J.jsxs)(T.a,{children:[Object(J.jsx)(f.a,{source:"name",validate:Object(D.b)()}),Object(J.jsx)(f.a,{source:"serialNumber",validate:Object(D.b)()}),Object(J.jsx)(f.a,{source:"ipAddress",validate:Object(D.b)()})]})}))},_=function(e){return Object(J.jsx)(I.a,Object(j.a)(Object(j.a)({},e),{},{children:Object(J.jsxs)(N.a,{children:[Object(J.jsxs)(P.a,{label:"Gateway details",children:[Object(J.jsx)(g.a,{source:"_id",label:"ID"}),Object(J.jsx)(g.a,{source:"name"}),Object(J.jsx)(g.a,{source:"serialNumber"}),Object(J.jsx)(g.a,{source:"ipAddress"}),Object(J.jsx)(v.a,{source:"createdAt"}),Object(J.jsx)(v.a,{source:"updatedAt"})]}),Object(J.jsx)(P.a,{label:"Peripheral devices",children:Object(J.jsx)(B.a,{reference:"devices",target:"gateway",label:"",children:Object(J.jsxs)(y.a,{children:[Object(J.jsx)(g.a,{source:"_id",label:"ID"}),Object(J.jsx)(g.a,{source:"uid",label:"UID"}),Object(J.jsx)(g.a,{source:"vendor"}),Object(J.jsx)(g.a,{source:"status"}),Object(J.jsx)(v.a,{source:"createdAt"}),Object(J.jsx)(v.a,{source:"updatedAt"}),Object(J.jsx)(w.a,{})]})})})]})}))},G=a(569),H=a(581),V=a(580),q=a(588),z=a(570),R=a(313),K=a.n(R).a,Q=[{id:"online",name:"Online"},{id:"offline",name:"Offline"}],W=function(e){return Object(J.jsxs)(h.a,Object(j.a)(Object(j.a)({},e),{},{children:[Object(J.jsx)(f.a,{label:"Search by vendor",source:"q",alwaysOn:!0}),Object(J.jsx)(G.a,{source:"status",choices:Q}),Object(J.jsx)(H.a,{source:"gateway",reference:"gateways",children:Object(J.jsx)(V.a,{optionValue:"id",optionText:"name"})})]}))},X=function(e){return Object(J.jsx)(p.a,Object(j.a)(Object(j.a)({title:"Devices"},e),{},{filters:Object(J.jsx)(W,{}),bulkActionButtons:!1,children:Object(J.jsxs)(y.a,{children:[Object(J.jsx)(g.a,{source:"_id",label:"ID"}),Object(J.jsx)(g.a,{source:"uid",label:"UID"}),Object(J.jsx)(g.a,{source:"vendor"}),Object(J.jsx)(g.a,{source:"status"}),Object(J.jsx)(q.a,{source:"gateway",reference:"gateways",children:Object(J.jsx)(g.a,{source:"name"})}),Object(J.jsx)(v.a,{source:"createdAt"}),Object(J.jsx)(v.a,{source:"updatedAt"}),Object(J.jsx)(w.a,{})]})}))},Y=function(e){return Object(J.jsx)(A.a,Object(j.a)(Object(j.a)({},e),{},{children:Object(J.jsxs)(T.a,{children:[Object(J.jsx)(H.a,{source:"gateway",reference:"gateways",validate:Object(D.b)(),children:Object(J.jsx)(V.a,{optionValue:"id",optionText:"name"})}),Object(J.jsx)(z.a,{source:"uid",validate:Object(D.b)()}),Object(J.jsx)(f.a,{source:"vendor",validate:Object(D.b)()}),Object(J.jsx)(G.a,{source:"status",choices:Q,validate:Object(D.b)()})]})}))},Z=function(e){return Object(J.jsx)(S.a,Object(j.a)(Object(j.a)({},e),{},{children:Object(J.jsxs)(T.a,{children:[Object(J.jsx)(H.a,{source:"gateway",reference:"gateways",validate:Object(D.b)(),children:Object(J.jsx)(V.a,{optionValue:"id",optionText:"name"})}),Object(J.jsx)(z.a,{source:"uid",validate:Object(D.b)()}),Object(J.jsx)(f.a,{source:"vendor",validate:Object(D.b)()}),Object(J.jsx)(G.a,{source:"status",choices:Q,validate:Object(D.b)()})]})}))},$=a(40).createBrowserHistory(),ee=function(){return Object(J.jsxs)(o.a,{title:"Gateway Manager UI",dataProvider:x,history:$,children:[Object(J.jsx)(i.a,{name:"gateways",options:{label:"Gateways"},list:L,create:M,edit:U,show:_,icon:k}),Object(J.jsx)(i.a,{name:"devices",options:{label:"Devices"},list:X,create:Y,edit:Z,icon:K})]})},te=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,591)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),c(e),n(e),r(e),s(e)}))};s.a.render(Object(J.jsx)(n.a.StrictMode,{children:Object(J.jsx)(ee,{})}),document.getElementById("root")),te()}},[[485,1,2]]]);
//# sourceMappingURL=main.430757cd.chunk.js.map