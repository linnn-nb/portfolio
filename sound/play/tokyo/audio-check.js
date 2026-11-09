// Optional delivery verification, enabled only with ?audio-check=1.
const taps=[];
const connect=AudioNode.prototype.connect;
AudioNode.prototype.connect=function(...args){
 const result=connect.apply(this,args);
 if(this instanceof AudioWorkletNode && args[0]===this.context.destination && !taps.some(t=>t.node===this)){
  const analyser=this.context.createAnalyser();analyser.fftSize=2048;
  connect.call(this,analyser);taps.push({node:this,analyser});
 }
 return result;
};
addEventListener('DOMContentLoaded',()=>{
 const panel=document.createElement('aside');panel.style.cssText='position:fixed;top:8px;right:8px;max-height:180px;overflow:auto;z-index:99999;background:#fff;color:#111;padding:12px;font:13px/1.4 monospace;max-width:420px';
 const button=document.createElement('button');button.textContent='Measure actual audio output';
 const result=document.createElement('pre');result.id='delivery-audio-result';result.style.whiteSpace='pre-wrap';result.textContent='Start the game, then measure.';
 panel.append(button,result);document.body.append(panel);
 button.onclick=async()=>{button.disabled=true;const data=new Float32Array(2048);let sum=0,peak=0,samples=0;
 for(let i=0;i<100;i++){for(const t of taps){t.analyser.getFloatTimeDomainData(data);for(const x of data){sum+=x*x;peak=Math.max(peak,Math.abs(x));samples++;}}result.textContent='Measuring '+i+'%';await new Promise(r=>setTimeout(r,50));}
 result.textContent=JSON.stringify({url:location.href,crossOriginIsolated,worklets:taps.length,contexts:taps.map(t=>t.node.context.state),samples,rms:samples?Math.sqrt(sum/samples):0,peak,nonzero:sum>0},null,2);button.disabled=false;
 };
});
