(function(){"use strict";try{if(!(self instanceof Window))throw"Hi"}catch{const a={log(...t){postMessage(JSON.stringify({program:"log",args:t}))},error(...t){postMessage(JSON.stringify({program:"error",args:t}))},clear(){postMessage(JSON.stringify({program:"clear",args:[]}))}};addEventListener("message",async({data:t})=>{const{program:e="",args:s=[],cmd:i,env:c}=JSON.parse(t);globalThis.env=c,(async()=>{try{let r={},o=i.split('"')[1];if(!o)throw new Error(`commands/${e}`);try{r=await import(`${o}`)}catch{try{r=await import(`../commands/${e}`)}catch{}}const n=s[0];if(!r)throw new Error(`commands/${e}`);return!r.default&&!r[n]?`Error executable in "${e}"`:r[n]?typeof r[n]=="function"?await r[n].apply(a,s.splice(1)):r[n]:typeof r.default=="function"?await r.default.apply(a,s):r.default}catch(r){return r instanceof Error&&(r.message.indexOf(`commands/${e}`)!=-1||r.message.indexOf("import")!=-1)?`bsh: command not found: ${e}`:String(r)}})().then(a.log).catch(a.error).finally(()=>{postMessage(JSON.stringify({program:"end",args:[]}))})})}})();