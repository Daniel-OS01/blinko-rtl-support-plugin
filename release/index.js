var a=function(){"use strict";var M=Object.defineProperty;var P=(a,l,d)=>l in a?M(a,l,{enumerable:!0,configurable:!0,writable:!0,value:d}):a[l]=d;var s=(a,l,d)=>(P(a,typeof l!="symbol"?l+"":l,d),d);(function(){const _={name:"blinko-plugin-rtl-support",author:"Daniel-OS01",url:"https://github.com/Daniel-OS01/blinko-rtl-support-plugin",version:"1.0.2",minAppVersion:"0.0.0",displayName:{default:"RTL Language Support",zh:"RTL语言支持",he:"תמיכה בשפות מימין לשמאל",ar:"دعم اللغات من اليمين إلى اليسار"},description:{default:"Automatically detects and applies RTL styling for Hebrew, Arabic, and other right-to-left languages in Blinko notes.",zh:"自动检测并为Blinko笔记中的希伯来语、阿拉伯语和其他从右到左的语言应用RTL样式。",he:"מזהה אוטומטית ומחיל עיצוב RTL לעברית, ערבית ושפות אחרות מימין לשמאל ברשימות Blinko.",ar:"يكتشف تلقائياً ويطبق تصميم RTL للعبرية والعربية واللغات الأخرى من اليمين إلى اليسار في ملاحظات Blinko."},readme:{default:"README.md",zh:"README_zh.md",he:"README_he.md"}};class R{constructor(t={sensitivity:"medium",minRTLChars:3,sampleSize:100}){s(this,"config");s(this,"RTL_RANGES",[[1424,1535],[1536,1791],[1792,1871],[1920,1983]]);this.config=t}isRTLChar(t){const e=t.charCodeAt(0);return this.RTL_RANGES.some(([n,r])=>e>=n&&e<=r)}detectRTL(t){if(!t||t.length===0)return!1;const e=t.substring(0,this.config.sampleSize);let n=0,r=0;for(const L of e)/\s|[.,!?;:()[\]{}]/.test(L)||(r++,this.isRTLChar(L)&&n++);return n<this.config.minRTLChars?!1:(r>0?n/r:0)>={high:.1,medium:.15,low:.4}[this.config.sensitivity]}detectRTLInSegments(t){return t.map(e=>this.detectRTL(e))}updateConfig(t){this.config={...this.config,...t}}}function y(o,t){let e;return function(...r){const p=()=>{e=null,o(...r)};e&&clearTimeout(e),e=setTimeout(p,t)}}class v{constructor(t,e={autoDetect:!0,forceDirection:"auto",applyToSelectors:[".note-content",".note-editor","textarea",".markdown-content",".note-text"]}){s(this,"config");s(this,"detector");s(this,"observer",null);s(this,"styleSheet",null);s(this,"debouncedProcessElement");this.detector=t,this.config=e,this.injectRTLStyles(),this.debouncedProcessElement=y(this.processElement.bind(this),150)}injectRTLStyles(){if(document.getElementById("blinko-rtl-styles"))return;const t=document.createElement("style");t.id="blinko-rtl-styles",t.textContent=`
      /* RTL Content Styling */
      .blinko-rtl-content {
        direction: rtl !important;
        text-align: right !important;
        font-family: 'Noto Sans Hebrew', 'Tahoma', 'Arial', sans-serif;
      }

      .blinko-ltr-content {
        direction: ltr !important;
        text-align: left !important;
      }

      /* RTL specific adjustments */
      .blinko-rtl-content input,
      .blinko-rtl-content textarea {
        text-align: right;
        direction: rtl;
      }

      .blinko-rtl-content .note-editor {
        text-align: right;
        direction: rtl;
      }

      /* Mixed content support */
      .blinko-mixed-content {
        unicode-bidi: embed;
      }

      /* RTL toolbar adjustments */
      .blinko-rtl-content .toolbar {
        flex-direction: row-reverse;
      }

      /* RTL button alignment */
      .blinko-rtl-content .button-group {
        flex-direction: row-reverse;
      }

      /* RTL icons that should flip */
      .blinko-rtl-content .icon-arrow-left {
        transform: scaleX(-1);
      }

      .blinko-rtl-content .icon-arrow-right {
        transform: scaleX(-1);
      }

      /* Margin and padding adjustments */
      .blinko-rtl-content .note-item {
        padding-right: 1em;
        padding-left: 0.5em;
      }

      /* Animation support for direction changes */
      .blinko-direction-transition {
        transition: all 0.2s ease-in-out;
      }
    `,document.head.appendChild(t)}applyRTL(t,e){this.config.forceDirection!=="auto"&&(e=this.config.forceDirection==="rtl"),t.classList.remove("blinko-rtl-content","blinko-ltr-content"),t.classList.add("blinko-direction-transition"),e?(t.classList.add("blinko-rtl-content"),t.setAttribute("dir","rtl")):(t.classList.add("blinko-ltr-content"),t.setAttribute("dir","ltr"))}startObserving(){this.observer||(this.observer=new MutationObserver(t=>{t.forEach(e=>{if(e.type==="childList")e.addedNodes.forEach(n=>{n.nodeType===Node.ELEMENT_NODE&&this.debouncedProcessElement(n)});else if(e.type==="characterData"){const n=e.target.parentElement;n&&this.debouncedProcessElement(n)}})}),this.observer.observe(document.body,{childList:!0,subtree:!0,characterData:!0}))}stopObserving(){this.observer&&(this.observer.disconnect(),this.observer=null)}processElement(t){if(!this.config.autoDetect)return;if(this.config.applyToSelectors.some(n=>{var r,p;return((r=t.matches)==null?void 0:r.call(t,n))||((p=t.querySelector)==null?void 0:p.call(t,n))})){const n=t.textContent||t.value||"";if(n){const r=this.detector.detectRTL(n);this.applyRTL(t,r)}}}updateConfig(t){this.config={...this.config,...t}}destroy(){this.stopObserving();const t=document.getElementById("blinko-rtl-styles");t&&t.remove()}}const x={rtl_support:"RTL Support",auto_detect:"Auto Detect",manual_toggle:"Manual Toggle",rtl_enabled:"RTL Enabled",rtl_disabled:"RTL Disabled",settings:"Settings",detection_sensitivity:"Detection Sensitivity",high:"High",medium:"Medium",low:"Low",force_rtl:"Force RTL",force_ltr:"Force LTR",auto:"Auto",plugin_description:"This plugin automatically detects Hebrew and Arabic text and applies appropriate RTL styling."},k={title:"我的插件",countLabel:"计数为 {{count}}",successMessage:"成功！"},w={rtl_support:"תמיכה ב-RTL",auto_detect:"זיהוי אוטומטי",manual_toggle:"החלפה ידנית",rtl_enabled:"RTL מופעל",rtl_disabled:"RTL מכובה",settings:"הגדרות",detection_sensitivity:"רגישות זיהוי",high:"גבוהה",medium:"בינונית",low:"נמוכה",force_rtl:"אלץ RTL",force_ltr:"אלץ LTR",auto:"אוטומטי",plugin_description:"תוסף זה מזהה אוטומטית טקסט עברי וערבי ומחיל עליו עיצוב RTL מתאים."},$={rtl_support:"دعم RTL",auto_detect:"الكشف التلقائي",manual_toggle:"التبديل اليدوي",rtl_enabled:"RTL مفعل",rtl_disabled:"RTL معطل",settings:"الإعدادات",detection_sensitivity:"حساسية الكشف",high:"عالية",medium:"متوسطة",low:"منخفضة",force_rtl:"إجبار RTL",force_ltr:"إجبار LTR",auto:"تلقائي",plugin_description:"يكتشف هذا المكون الإضافي تلقائياً النص العربي والعبري ويطبق عليه تصميم RTL المناسب."},S=`
*:lang(he), *:lang(ar), *:lang(fa), *:lang(ur), *[dir="rtl"] {
    text-align: right !important;
    direction: rtl !important;
}

.markdown-body div, .markdown-body p, .markdown-body span {
    unicode-bidi: plaintext !important;
}

*:dir(rtl) input[type="text"], *:dir(rtl) textarea, [lang="he"] input[type="text"], [lang="he"] textarea {
    text-align: right !important;
    direction: rtl !important;
}

.rtl-toggle-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
}

.rtl-toggle-btn:hover {
    background: #0056b3;
    transform: scale(1.1);
}

.rtl-toggle-btn.active {
    background: #28a745;
}
`,u=new R,g=new v(u);let h=!1,c=null,i=null;function E(){c||(c=document.createElement("style"),c.id="blinko-rtl-styles",c.textContent=S,document.head.appendChild(c))}function C(){c&&(c.remove(),c=null)}function D(){if(i)return;i=document.createElement("button"),i.className="rtl-toggle-btn",i.innerHTML="ع/א",i.title="Toggle RTL Support",i.addEventListener("click",f),document.body.appendChild(i),localStorage.getItem("blinko-rtl-enabled")==="true"&&b()}function A(){i&&(i.remove(),i=null)}function b(){h=!0,E(),g.startObserving(),i&&i.classList.add("active"),localStorage.setItem("blinko-rtl-enabled","true"),document.querySelectorAll('.markdown-body, textarea, input[type="text"]').forEach(o=>{const t=o.textContent||o.value||"";u.detectRTL(t)&&(o.setAttribute("dir","rtl"),o.setAttribute("lang","he"))})}function m(){h=!1,C(),g.stopObserving(),i&&i.classList.remove("active"),localStorage.setItem("blinko-rtl-enabled","false"),document.querySelectorAll('[dir="rtl"]').forEach(o=>{o.removeAttribute("dir"),o.removeAttribute("lang")})}function f(){h?m():b()}function T(){console.log("Initializing Blinko RTL Plugin..."),D();const o=localStorage.getItem("blinko-rtl-settings");if(o)try{const t=JSON.parse(o);u.updateConfig({sensitivity:t.sensitivity||"medium",minRTLChars:t.minRTLChars||3}),g.updateConfig({autoDetect:t.autoDetect!==!1,forceDirection:t.forceDirection||"auto",applyToSelectors:t.customSelectors||[".note-content",".note-editor","textarea",".markdown-content",".note-text"]})}catch(t){console.error("Failed to load RTL plugin settings:",t)}window.addEventListener("rtl-settings-changed",t=>{const e=t.detail;u.updateConfig({sensitivity:e.sensitivity,minRTLChars:e.minRTLChars||3}),g.updateConfig({autoDetect:e.autoDetect,forceDirection:e.forceDirection,applyToSelectors:e.customSelectors})}),window.blinkoRTL={detector:u,styler:g,toggle:f,enable:b,disable:m,isEnabled:()=>h,test:t=>{const e=u.detectRTL(t);return console.log(`Text "${t}" is ${e?"RTL":"LTR"}`),e}},console.log("Blinko RTL Plugin initialized successfully")}class B{constructor(){s(this,"withSettingPanel",!0);s(this,"renderSettingPanel",()=>{const t=document.createElement("div");return t.innerHTML=`
      <div style="padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <h2>RTL Language Support Settings</h2>
        <p>Use the floating button (ع/א) to toggle RTL support on/off.</p>
        <div style="margin: 20px 0;">
          <button onclick="window.blinkoRTL?.toggle()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
            Toggle RTL Support
          </button>
        </div>
        <div style="margin: 20px 0;">
          <h3>Test RTL Detection</h3>
          <textarea id="rtl-test-input" placeholder="Enter text to test..." style="width: 100%; height: 80px; padding: 10px; border: 1px solid #ccc; border-radius: 4px;"></textarea>
          <button onclick="
            const text = document.getElementById('rtl-test-input').value;
            const result = window.blinkoRTL?.test(text);
            alert('Text is ' + (result ? 'RTL' : 'LTR'));
          " style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 10px;">
            Test
          </button>
          <div style="margin-top: 10px; font-size: 14px; color: #666;">
            <strong>Examples:</strong><br/>
            Hebrew: שלום עולם<br/>
            Arabic: مرحبا بالعالم<br/>
            English: Hello world
          </div>
        </div>
      </div>
    `,t});Object.assign(this,_)}async init(){this.initI18n(),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",T):T(),window.Blinko.addToolBarIcon({name:"rtl-support",icon:"<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m5 8 6 6'/><path d='m4 14 6-6 2-3'/><path d='M2 5h12'/><path d='M7 2h1'/><path d='m22 18-6-6'/><path d='m17 12-6 6-2 3'/><path d='M14 22h1'/><path d='M22 14h-7'/></svg>",placement:"top",tooltip:"RTL Support Settings",content:()=>this.renderSettingPanel()})}initI18n(){window.Blinko.i18n.addResourceBundle("en","translation",x),window.Blinko.i18n.addResourceBundle("zh","translation",k),window.Blinko.i18n.addResourceBundle("he","translation",w),window.Blinko.i18n.addResourceBundle("ar","translation",$)}destroy(){m(),A(),g.destroy(),console.log("RTL Plugin destroyed")}}return B}()})();
