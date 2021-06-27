try{self["workbox:core:6.1.5"]&&_()}catch(e){}var e=function(e){for(var t=e,r=arguments.length,n=new Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];return n.length>0&&(t+=" :: "+JSON.stringify(n)),t};class t extends Error{constructor(t,r){super(e(t,r)),this.name=t,this.details=r}}try{self["workbox:routing:6.1.5"]&&_()}catch(e){}var r=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n){void 0===n&&(n="GET"),this.handler=r(t),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=r(e)}}class i extends n{constructor(e,t,r){super((t=>{var{url:r}=t,n=e.exec(r.href);if(n&&(r.origin===location.origin||0===n.index))return n.slice(1)}),t,r)}}function a(e,t,r,n,i,a,s){try{var o=e[a](s),u=o.value}catch(e){return void r(e)}o.done?t(u):Promise.resolve(u).then(n,i)}function s(e){return function(){var t=this,r=arguments;return new Promise((function(n,i){var s=e.apply(t,r);function o(e){a(s,n,i,o,u,"next",e)}function u(e){a(s,n,i,o,u,"throw",e)}o(void 0)}))}}function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var u;class c{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(e=>{var{request:t}=e,r=this.handleRequest({request:t,event:e});r&&e.respondWith(r)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){var{payload:t}=e.data,r=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);var r=new Request(...t);return this.handleRequest({request:r,event:e})})));e.waitUntil(r),e.ports&&e.ports[0]&&r.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest(e){var t=this,{request:r,event:n}=e,i=new URL(r.url,location.href);if(i.protocol.startsWith("http")){var a=i.origin===location.origin,{params:o,route:u}=this.findMatchingRoute({event:n,request:r,sameOrigin:a,url:i}),c=u&&u.handler,h=r.method;if(!c&&this.i.has(h)&&(c=this.i.get(h)),c){var l;try{l=c.handle({url:i,request:r,event:n,params:o})}catch(e){l=Promise.reject(e)}var f=u&&u.catchHandler;return l instanceof Promise&&(this.o||f)&&(l=l.catch(function(){var e=s((function*(e){if(f)try{return yield f.handle({url:i,request:r,event:n,params:o})}catch(t){e=t}if(t.o)return t.o.handle({url:i,request:r,event:n});throw e}));return function(t){return e.apply(this,arguments)}}())),l}}}findMatchingRoute(e){var{url:t,sameOrigin:r,request:n,event:i}=e,a=this.t.get(n.method)||[];for(var s of a){var o=void 0,u=s.match({url:t,sameOrigin:r,request:n,event:i});if(u)return o=u,(Array.isArray(u)&&0===u.length||u.constructor===Object&&0===Object.keys(u).length||"boolean"==typeof u)&&(o=void 0),{route:s,params:o}}return{}}setDefaultHandler(e,t){void 0===t&&(t="GET"),this.i.set(t,r(e))}setCatchHandler(e){this.o=r(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});var r=this.t.get(e.method).indexOf(e);if(!(r>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(r,1)}}var h=()=>(u||((u=new c).addFetchListener(),u.addCacheListener()),u);function l(e,r,a){var s;if("string"==typeof e){var o=new URL(e,location.href);s=new n((e=>{var{url:t}=e;return t.href===o.href}),r,a)}else if(e instanceof RegExp)s=new i(e,r,a);else if("function"==typeof e)s=new n(e,r,a);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});s=e}return h().registerRoute(s),s}var f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},d=e=>[f.prefix,e,f.suffix].filter((e=>e&&e.length>0)).join("-"),v=e=>e||d(f.precache),y=e=>e||d(f.runtime);function p(e){e.then((()=>{}))}var w=new Set;class m{constructor(e,t,r){var{onupgradeneeded:n,onversionchange:i}=void 0===r?{}:r;this.u=null,this.h=e,this.l=t,this.v=n,this.p=i||(()=>this.close())}get db(){return this.u}open(){var e=this;return s((function*(){if(!e.u)return e.u=yield new Promise(((t,r)=>{var n=!1;setTimeout((()=>{n=!0,r(new Error("The open request was blocked and timed out"))}),e.OPEN_TIMEOUT);var i=indexedDB.open(e.h,e.l);i.onerror=()=>r(i.error),i.onupgradeneeded=t=>{n?(i.transaction.abort(),i.result.close()):"function"==typeof e.v&&e.v(t)},i.onsuccess=()=>{var r=i.result;n?r.close():(r.onversionchange=e.p.bind(e),t(r))}})),e}))()}getKey(e,t){var r=this;return s((function*(){return(yield r.getAllKeys(e,t,1))[0]}))()}getAll(e,t,r){var n=this;return s((function*(){return yield n.getAllMatching(e,{query:t,count:r})}))()}getAllKeys(e,t,r){var n=this;return s((function*(){return(yield n.getAllMatching(e,{query:t,count:r,includeKeys:!0})).map((e=>e.key))}))()}getAllMatching(e,t){var r=this;return s((function*(){var{index:n,query:i=null,direction:a="next",count:s,includeKeys:o=!1}=void 0===t?{}:t;return yield r.transaction([e],"readonly",((t,r)=>{var u=t.objectStore(e),c=n?u.index(n):u,h=[],l=c.openCursor(i,a);l.onsuccess=()=>{var e=l.result;e?(h.push(o?e:e.value),s&&h.length>=s?r(h):e.continue()):r(h)}}))}))()}transaction(e,t,r){var n=this;return s((function*(){return yield n.open(),yield new Promise(((i,a)=>{var s=n.u.transaction(e,t);s.onabort=()=>a(s.error),s.oncomplete=()=>i(),r(s,(e=>i(e)))}))}))()}m(e,t,r){var n=arguments,i=this;return s((function*(){for(var a=n.length,s=new Array(a>3?a-3:0),o=3;o<a;o++)s[o-3]=n[o];return yield i.transaction([t],r,((r,n)=>{var i=r.objectStore(t),a=i[e].apply(i,s);a.onsuccess=()=>n(a.result)}))}))()}close(){this.u&&(this.u.close(),this.u=null)}}m.prototype.OPEN_TIMEOUT=2e3;var g=function(e,t){var r=function(t){t in IDBObjectStore.prototype&&(m.prototype[t]=function(){var r=s((function*(r){for(var n=arguments.length,i=new Array(n>1?n-1:0),a=1;a<n;a++)i[a-1]=arguments[a];return yield this.m(t,r,e,...i)}));return function(e){return r.apply(this,arguments)}}())};for(var n of t)r(n)};for(var[R,q]of Object.entries({readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]}))g(R,q);var U=function(){var e=s((function*(e){yield new Promise(((t,r)=>{var n=indexedDB.deleteDatabase(e);n.onerror=()=>{r(n.error)},n.onblocked=()=>{r(new Error("Delete blocked"))},n.onsuccess=()=>{t()}}))}));return function(t){return e.apply(this,arguments)}}();try{self["workbox:expiration:6.1.5"]&&_()}catch(e){}var x=e=>{var t=new URL(e,location.href);return t.hash="",t.href};class L{constructor(e){this.g=e,this.u=new m("workbox-expiration",1,{onupgradeneeded:e=>this.R(e)})}R(e){var t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),U(this.g)}setTimestamp(e,t){var r=this;return s((function*(){var n={url:e=x(e),timestamp:t,cacheName:r.g,id:r.q(e)};yield r.u.put("cache-entries",n)}))()}getTimestamp(e){var t=this;return s((function*(){return(yield t.u.get("cache-entries",t.q(e))).timestamp}))()}expireEntries(e,t){var r=this;return s((function*(){var n=yield r.u.transaction("cache-entries","readwrite",((n,i)=>{var a=n.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),s=[],o=0;a.onsuccess=()=>{var n=a.result;if(n){var u=n.value;u.cacheName===r.g&&(e&&u.timestamp<e||t&&o>=t?s.push(n.value):o++),n.continue()}else i(s)}})),i=[];for(var a of n)yield r.u.delete("cache-entries",a.id),i.push(a.url);return i}))()}q(e){return this.g+"|"+x(e)}}class b{constructor(e,t){void 0===t&&(t={}),this.U=!1,this._=!1,this.L=t.maxEntries,this.N=t.maxAgeSeconds,this.T=t.matchOptions,this.g=e,this.C=new L(e)}expireEntries(){var e=this;return s((function*(){if(e.U)e._=!0;else{e.U=!0;var t=e.N?Date.now()-1e3*e.N:0,r=yield e.C.expireEntries(t,e.L),n=yield self.caches.open(e.g);for(var i of r)yield n.delete(i,e.T);e.U=!1,e._&&(e._=!1,p(e.expireEntries()))}}))()}updateTimestamp(e){var t=this;return s((function*(){yield t.C.setTimestamp(e,Date.now())}))()}isURLExpired(e){var t=this;return s((function*(){return!!t.N&&(yield t.C.getTimestamp(e))<Date.now()-1e3*t.N}))()}delete(){var e=this;return s((function*(){e._=!1,yield e.C.expireEntries(1/0)}))()}}class E{constructor(e){var t,r=this;void 0===e&&(e={}),this.cachedResponseWillBeUsed=function(){var e=s((function*(e){var{event:t,request:n,cacheName:i,cachedResponse:a}=e;if(!a)return null;var s=r.P(a),o=r.D(i);p(o.expireEntries());var u=o.updateTimestamp(n.url);if(t)try{t.waitUntil(u)}catch(e){}return s?a:null}));return function(t){return e.apply(this,arguments)}}(),this.cacheDidUpdate=function(){var e=s((function*(e){var{cacheName:t,request:n}=e,i=r.D(t);yield i.updateTimestamp(n.url),yield i.expireEntries()}));return function(t){return e.apply(this,arguments)}}(),this.O=e,this.N=e.maxAgeSeconds,this.k=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),w.add(t))}D(e){if(e===y())throw new t("expire-custom-caches-only");var r=this.k.get(e);return r||(r=new b(e,this.O),this.k.set(e,r)),r}P(e){if(!this.N)return!0;var t=this.A(e);return null===t||t>=Date.now()-1e3*this.N}A(e){if(!e.headers.has("date"))return null;var t=e.headers.get("date"),r=new Date(t).getTime();return isNaN(r)?null:r}deleteCacheAndMetadata(){var e=this;return s((function*(){for(var[t,r]of e.k)yield self.caches.delete(t),yield r.delete();e.k=new Map}))()}}function N(e,t){var r=new URL(e);for(var n of t)r.searchParams.delete(n);return r.href}function T(){return(T=s((function*(e,t,r,n){var i=N(t.url,r);if(t.url===i)return e.match(t,n);var a=o({},n,{ignoreSearch:!0}),s=yield e.keys(t,a);for(var u of s){if(i===N(u.url,r))return e.match(u,n)}}))).apply(this,arguments)}class C{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}function P(){return(P=s((function*(){for(var e of w)yield e()}))).apply(this,arguments)}try{self["workbox:strategies:6.1.5"]&&_()}catch(e){}function D(e){return"string"==typeof e?new Request(e):e}class O{constructor(e,t){for(var r of(this.K={},Object.assign(this,t),this.event=t.event,this.S=e,this.M=new C,this.W=[],this.I=[...e.plugins],this.j=new Map,this.I))this.j.set(r,{});this.event.waitUntil(this.M.promise)}fetch(e){var r=this;return s((function*(){var{event:n}=r,i=D(e);if("navigate"===i.mode&&n instanceof FetchEvent&&n.preloadResponse){var a=yield n.preloadResponse;if(a)return a}var s=r.hasCallback("fetchDidFail")?i.clone():null;try{for(var o of r.iterateCallbacks("requestWillFetch"))i=yield o({request:i.clone(),event:n})}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}var u=i.clone();try{var c;for(var h of(c=yield fetch(i,"navigate"===i.mode?void 0:r.S.fetchOptions),r.iterateCallbacks("fetchDidSucceed")))c=yield h({event:n,request:u,response:c});return c}catch(e){throw s&&(yield r.runCallbacks("fetchDidFail",{error:e,event:n,originalRequest:s.clone(),request:u.clone()})),e}}))()}fetchAndCachePut(e){var t=this;return s((function*(){var r=yield t.fetch(e),n=r.clone();return t.waitUntil(t.cachePut(e,n)),r}))()}cacheMatch(e){var t=this;return s((function*(){var r,n=D(e),{cacheName:i,matchOptions:a}=t.S,s=yield t.getCacheKey(n,"read"),u=o({},a,{cacheName:i});for(var c of(r=yield caches.match(s,u),t.iterateCallbacks("cachedResponseWillBeUsed")))r=(yield c({cacheName:i,matchOptions:a,cachedResponse:r,request:s,event:t.event}))||void 0;return r}))()}cachePut(e,r){var n=this;return s((function*(){var i,a=D(e);yield(i=0,new Promise((e=>setTimeout(e,i))));var s,o=yield n.getCacheKey(a,"write");if(!r)throw new t("cache-put-with-no-response",{url:(s=o.url,new URL(String(s),location.href).href.replace(new RegExp("^"+location.origin),""))});var u=yield n.F(r);if(!u)return!1;var{cacheName:c,matchOptions:h}=n.S,l=yield self.caches.open(c),f=n.hasCallback("cacheDidUpdate"),d=f?yield function(e,t,r,n){return T.apply(this,arguments)}(l,o.clone(),["__WB_REVISION__"],h):null;try{yield l.put(o,f?u.clone():u)}catch(e){throw"QuotaExceededError"===e.name&&(yield function(){return P.apply(this,arguments)}()),e}for(var v of n.iterateCallbacks("cacheDidUpdate"))yield v({cacheName:c,oldResponse:d,newResponse:u.clone(),request:o,event:n.event});return!0}))()}getCacheKey(e,t){var r=this;return s((function*(){if(!r.K[t]){var n=e;for(var i of r.iterateCallbacks("cacheKeyWillBeUsed"))n=D(yield i({mode:t,request:n,event:r.event,params:r.params}));r.K[t]=n}return r.K[t]}))()}hasCallback(e){for(var t of this.S.plugins)if(e in t)return!0;return!1}runCallbacks(e,t){var r=this;return s((function*(){for(var n of r.iterateCallbacks(e))yield n(t)}))()}*iterateCallbacks(e){var t=this,r=function*(r){if("function"==typeof r[e]){var n=t.j.get(r);yield t=>{var i=o({},t,{state:n});return r[e](i)}}};for(var n of this.S.plugins)yield*r(n)}waitUntil(e){return this.W.push(e),e}doneWaiting(){var e=this;return s((function*(){for(var t;t=e.W.shift();)yield t}))()}destroy(){this.M.resolve()}F(e){var t=this;return s((function*(){var r=e,n=!1;for(var i of t.iterateCallbacks("cacheWillUpdate"))if(n=!0,!(r=(yield i({request:t.request,response:r,event:t.event}))||void 0))break;return n||r&&200!==r.status&&(r=void 0),r}))()}}class k{constructor(e){void 0===e&&(e={}),this.cacheName=y(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){var[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});var t=e.event,r="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,i=new O(this,{event:t,request:r,params:n}),a=this.B(i,r,t);return[a,this.H(a,i,r,t)]}B(e,r,n){var i=this;return s((function*(){yield e.runCallbacks("handlerWillStart",{event:n,request:r});var a=void 0;try{if(!(a=yield i.G(r,e))||"error"===a.type)throw new t("no-response",{url:r.url})}catch(t){for(var s of e.iterateCallbacks("handlerDidError"))if(a=yield s({error:t,event:n,request:r}))break;if(!a)throw t}for(var o of e.iterateCallbacks("handlerWillRespond"))a=yield o({event:n,request:r,response:a});return a}))()}H(e,t,r,n){return s((function*(){var i,a;try{i=yield e}catch(a){}try{yield t.runCallbacks("handlerDidRespond",{event:n,request:r,response:i}),yield t.doneWaiting()}catch(e){a=e}if(yield t.runCallbacks("handlerDidComplete",{event:n,request:r,response:i,error:a}),t.destroy(),a)throw a}))()}}var A,K={cacheWillUpdate:(A=s((function*(e){var{response:t}=e;return 200===t.status||0===t.status?t:null})),function(e){return A.apply(this,arguments)})};function S(e,t){var r=t();return e.waitUntil(r),r}try{self["workbox:precaching:6.1.5"]&&_()}catch(e){}var M,W;function I(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){var r=new URL(e,location.href);return{cacheKey:r.href,url:r.href}}var{revision:n,url:i}=e;if(!i)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!n){var a=new URL(i,location.href);return{cacheKey:a.href,url:a.href}}var s=new URL(i,location.href),o=new URL(i,location.href);return s.searchParams.set("__WB_REVISION__",n),{cacheKey:s.href,url:o.href}}class j{constructor(){var e=this;this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=function(){var e=s((function*(e){var{request:t,state:r}=e;r&&(r.originalRequest=t)}));return function(t){return e.apply(this,arguments)}}(),this.cachedResponseWillBeUsed=function(){var t=s((function*(t){var{event:r,state:n,cachedResponse:i}=t;if("install"===r.type){var a=n.originalRequest.url;i?e.notUpdatedURLs.push(a):e.updatedURLs.push(a)}return i}));return function(e){return t.apply(this,arguments)}}()}}class F{constructor(e){var t=this,{precacheController:r}=e;this.cacheKeyWillBeUsed=function(){var e=s((function*(e){var{request:r,params:n}=e,i=n&&n.cacheKey||t.$.getCacheKeyForURL(r.url);return i?new Request(i):r}));return function(t){return e.apply(this,arguments)}}(),this.$=r}}function B(){if(void 0===M){var e=new Response("");if("body"in e)try{new Response(e.body),M=!0}catch(e){M=!1}M=!1}return M}function H(){return(H=s((function*(e,r){var n=null;e.url&&(n=new URL(e.url).origin);if(n!==self.location.origin)throw new t("cross-origin-copy-response",{origin:n});var i=e.clone(),a={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},s=r?r(a):a,o=B()?i.body:yield i.blob();return new Response(o,s)}))).apply(this,arguments)}class G extends k{constructor(e){void 0===e&&(e={}),e.cacheName=v(e.cacheName),super(e),this.V=!1!==e.fallbackToNetwork,this.plugins.push(G.copyRedirectedCacheableResponsesPlugin)}G(e,t){var r=this;return s((function*(){var n=yield t.cacheMatch(e);return n||(t.event&&"install"===t.event.type?yield r.J(e,t):yield r.X(e,t))}))()}X(e,r){var n=this;return s((function*(){if(!n.V)throw new t("missing-precache-entry",{cacheName:n.cacheName,url:e.url});return yield r.fetch(e)}))()}J(e,r){var n=this;return s((function*(){n.Y();var i=yield r.fetch(e);if(!(yield r.cachePut(e,i.clone())))throw new t("bad-precaching-response",{url:e.url,status:i.status});return i}))()}Y(){var e=null,t=0;for(var[r,n]of this.plugins.entries())n!==G.copyRedirectedCacheableResponsesPlugin&&(n===G.defaultPrecacheCacheabilityPlugin&&(e=r),n.cacheWillUpdate&&t++);0===t?this.plugins.push(G.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}G.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:e=>s((function*(){var{response:t}=e;return!t||t.status>=400?null:t}))()},G.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:e=>s((function*(){var{response:t}=e;return t.redirected?yield function(e,t){return H.apply(this,arguments)}(t):t}))()};class Q{constructor(e){var{cacheName:t,plugins:r=[],fallbackToNetwork:n=!0}=void 0===e?{}:e;this.Z=new Map,this.ee=new Map,this.te=new Map,this.S=new G({cacheName:v(t),plugins:[...r,new F({precacheController:this})],fallbackToNetwork:n}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.S}precache(e){this.addToCacheList(e),this.re||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.re=!0)}addToCacheList(e){var r=[];for(var n of e){"string"==typeof n?r.push(n):n&&void 0===n.revision&&r.push(n.url);var{cacheKey:i,url:a}=I(n),s="string"!=typeof n&&n.revision?"reload":"default";if(this.Z.has(a)&&this.Z.get(a)!==i)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.Z.get(a),secondEntry:i});if("string"!=typeof n&&n.integrity){if(this.te.has(i)&&this.te.get(i)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:a});this.te.set(i,n.integrity)}if(this.Z.set(a,i),this.ee.set(a,s),r.length>0){var o="Workbox is precaching URLs without revision info: "+r.join(", ")+"\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache";console.warn(o)}}}install(e){var t=this;return S(e,s((function*(){var r=new j;for(var[n,i]of(t.strategy.plugins.push(r),t.Z)){var a=t.te.get(i),s=t.ee.get(n),o=new Request(n,{integrity:a,cache:s,credentials:"same-origin"});yield Promise.all(t.strategy.handleAll({params:{cacheKey:i},request:o,event:e}))}var{updatedURLs:u,notUpdatedURLs:c}=r;return{updatedURLs:u,notUpdatedURLs:c}})))}activate(e){var t=this;return S(e,s((function*(){var e=yield self.caches.open(t.strategy.cacheName),r=yield e.keys(),n=new Set(t.Z.values()),i=[];for(var a of r)n.has(a.url)||(yield e.delete(a),i.push(a.url));return{deletedURLs:i}})))}getURLsToCacheKeys(){return this.Z}getCachedURLs(){return[...this.Z.keys()]}getCacheKeyForURL(e){var t=new URL(e,location.href);return this.Z.get(t.href)}matchPrecache(e){var t=this;return s((function*(){var r=e instanceof Request?e.url:e,n=t.getCacheKeyForURL(r);if(n)return(yield self.caches.open(t.strategy.cacheName)).match(n)}))()}createHandlerBoundToURL(e){var r=this.getCacheKeyForURL(e);if(!r)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=o({cacheKey:r},t.params),this.strategy.handle(t))}}var $=()=>(W||(W=new Q),W);class V extends n{constructor(e,t){super((r=>{var{request:n}=r,i=e.getURLsToCacheKeys();for(var a of function*(e,t){var{ignoreURLParametersMatching:r=[/^utm_/,/^fbclid$/],directoryIndex:n="index.html",cleanURLs:i=!0,urlManipulation:a}=void 0===t?{}:t,s=new URL(e,location.href);s.hash="",yield s.href;var o=function(e,t){void 0===t&&(t=[]);var r=function(r){t.some((e=>e.test(r)))&&e.searchParams.delete(r)};for(var n of[...e.searchParams.keys()])r(n);return e}(s,r);if(yield o.href,n&&o.pathname.endsWith("/")){var u=new URL(o.href);u.pathname+=n,yield u.href}if(i){var c=new URL(o.href);c.pathname+=".html",yield c.href}if(a){var h=a({url:s});for(var l of h)yield l.href}}(n.url,t)){var s=i.get(a);if(s)return{cacheKey:s}}}),e.strategy)}}var J,z=function(){var e=s((function*(e,t){void 0===t&&(t="-precache-");var r=(yield self.caches.keys()).filter((r=>r.includes(t)&&r.includes(self.registration.scope)&&r!==e));return yield Promise.all(r.map((e=>self.caches.delete(e)))),r}));return function(t,r){return e.apply(this,arguments)}}();self.skipWaiting(),self.addEventListener("activate",(()=>self.clients.claim())),J={},function(e){$().precache(e)}([{url:"index.html",revision:"7358fd72e02950cc0cb2559913608355"}]),function(e){var t=$();l(new V(t,e))}(J),self.addEventListener("activate",(e=>{var t=v();e.waitUntil(z(t).then((e=>{})))})),l(/.*(\?v=.*)$/,new class extends k{G(e,r){return s((function*(){var n,i=yield r.cacheMatch(e);if(!i)try{i=yield r.fetchAndCachePut(e)}catch(e){n=e}if(!i)throw new t("no-response",{url:e.url,error:n});return i}))()}}({cacheName:"versioned-assets",plugins:[new E({maxAgeSeconds:604800,maxEntries:10,purgeOnQuotaError:!0})]}),"GET"),l(/\.(?:html|json|js)$/,new class extends k{constructor(e){void 0===e&&(e={}),super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(K),this.ne=e.networkTimeoutSeconds||0}G(e,r){var n=this;return s((function*(){var i,a=[],o=[];if(n.ne){var{id:u,promise:c}=n.ie({request:e,logs:a,handler:r});i=u,o.push(c)}var h=n.ae({timeoutId:i,request:e,logs:a,handler:r});o.push(h);var l=yield r.waitUntil(s((function*(){return(yield r.waitUntil(Promise.race(o)))||(yield h)}))());if(!l)throw new t("no-response",{url:e.url});return l}))()}ie(e){var t,{request:r,logs:n,handler:i}=e;return{promise:new Promise((e=>{t=setTimeout(function(){var t=s((function*(){e(yield i.cacheMatch(r))}));return function(){return t.apply(this,arguments)}}(),1e3*this.ne)})),id:t}}ae(e){return s((function*(){var t,r,{timeoutId:n,request:i,logs:a,handler:s}=e;try{r=yield s.fetchAndCachePut(i)}catch(e){t=e}return n&&clearTimeout(n),!t&&r||(r=yield s.cacheMatch(i)),r}))()}}({cacheName:"unversioned-assets",networkTimeoutSeconds:2,plugins:[new E({maxAgeSeconds:604800,maxEntries:10,purgeOnQuotaError:!0})]}),"GET");
