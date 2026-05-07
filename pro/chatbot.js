/* ====================================================================
   TechnoBren AI Assistant — self-contained chat widget
   Auto-injects on every page that loads this script.
   ==================================================================== */
(function(){
  if (window.__tbChatLoaded) return;
  window.__tbChatLoaded = true;

  // ---------- styles ----------
  const css = `
  #tb-chat-fab{position:fixed;left:20px;bottom:20px;width:62px;height:62px;border-radius:50%;background:linear-gradient(135deg,#a01933,#7c3aed);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 16px 40px rgba(160,25,51,.45);cursor:pointer;z-index:95;transition:transform .3s;border:0;outline:0}
  #tb-chat-fab:hover{transform:translateY(-3px) scale(1.05)}
  #tb-chat-fab .tb-pulse{position:absolute;inset:-4px;border-radius:50%;background:rgba(160,25,51,.4);animation:tbPulse 2s infinite;z-index:-1}
  #tb-chat-fab .tb-badge{position:absolute;top:-2px;right:-2px;background:#10b981;color:#fff;width:18px;height:18px;border-radius:50%;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;border:2px solid #fff}
  @keyframes tbPulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.6);opacity:0}}
  #tb-chat-panel{position:fixed;left:20px;bottom:96px;width:380px;max-width:calc(100vw - 40px);height:560px;max-height:calc(100vh - 120px);background:#fff;border-radius:20px;box-shadow:0 30px 80px rgba(0,0,0,.25);z-index:96;display:none;flex-direction:column;overflow:hidden;border:1px solid #e5e7eb;font-family:'Plus Jakarta Sans',system-ui,sans-serif;color:#0b1020}
  #tb-chat-panel.open{display:flex;animation:tbSlideUp .3s cubic-bezier(.22,.61,.36,1)}
  @keyframes tbSlideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
  .tb-head{background:linear-gradient(135deg,#a01933,#7c3aed);color:#fff;padding:18px 18px 16px;display:flex;align-items:center;gap:12px}
  .tb-head .tb-avatar{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:18px;border:2px solid rgba(255,255,255,.4)}
  .tb-head .tb-info{flex:1;min-width:0}
  .tb-head .tb-name{font-weight:800;font-size:15px;display:flex;align-items:center;gap:8px}
  .tb-head .tb-status{font-size:11px;opacity:.85;display:flex;align-items:center;gap:5px;margin-top:2px}
  .tb-head .tb-status::before{content:"";width:7px;height:7px;border-radius:50%;background:#10b981;display:inline-block}
  .tb-head .tb-close{background:rgba(255,255,255,.15);border:0;color:#fff;width:32px;height:32px;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s}
  .tb-head .tb-close:hover{background:rgba(255,255,255,.3)}
  .tb-body{flex:1;overflow-y:auto;padding:16px;background:#fafafb;display:flex;flex-direction:column;gap:10px}
  .tb-msg{max-width:82%;padding:10px 14px;border-radius:14px;font-size:14px;line-height:1.5;animation:tbMsgIn .25s ease-out;word-wrap:break-word}
  @keyframes tbMsgIn{from{transform:translateY(6px);opacity:0}to{transform:translateY(0);opacity:1}}
  .tb-msg.bot{background:#fff;border:1px solid #ececef;color:#0b1020;align-self:flex-start;border-bottom-left-radius:4px}
  .tb-msg.user{background:linear-gradient(135deg,#a01933,#7c3aed);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
  .tb-msg.bot a{color:#a01933;text-decoration:underline;font-weight:600}
  .tb-typing{display:inline-flex;gap:4px;padding:14px 16px;background:#fff;border:1px solid #ececef;border-radius:14px;border-bottom-left-radius:4px;align-self:flex-start;width:fit-content}
  .tb-typing span{width:7px;height:7px;background:#a01933;border-radius:50%;opacity:.4;animation:tbBounce 1.2s infinite}
  .tb-typing span:nth-child(2){animation-delay:.2s}
  .tb-typing span:nth-child(3){animation-delay:.4s}
  @keyframes tbBounce{0%,60%,100%{opacity:.4;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}
  .tb-quick{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 8px}
  .tb-quick button{font-size:12px;padding:7px 12px;border-radius:999px;background:#fff;border:1px solid #d1d5db;color:#a01933;font-weight:600;cursor:pointer;transition:.2s}
  .tb-quick button:hover{background:#a01933;color:#fff;border-color:#a01933}
  .tb-foot{border-top:1px solid #ececef;padding:10px;background:#fff;display:flex;gap:8px;align-items:center}
  .tb-foot input{flex:1;border:0;outline:0;padding:10px 14px;font-size:14px;background:#f3f4f6;border-radius:999px;font-family:inherit;color:#0b1020}
  .tb-foot input:focus{background:#ececef}
  .tb-foot button{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#a01933,#7c3aed);border:0;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .2s}
  .tb-foot button:hover{transform:scale(1.06)}
  .tb-foot .tb-poweredby{position:absolute;bottom:-22px;left:0;right:0;text-align:center;font-size:10px;color:#9ca3af}
  @media (max-width:480px){
    #tb-chat-panel{left:8px;right:8px;width:auto;bottom:80px;height:calc(100vh - 100px)}
    #tb-chat-fab{left:14px;bottom:14px;width:54px;height:54px}
  }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- markup ----------
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <button id="tb-chat-fab" aria-label="Chat with TechnoBren AI Assistant">
      <span class="tb-pulse"></span>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      <span class="tb-badge">1</span>
    </button>
    <aside id="tb-chat-panel" role="dialog" aria-label="TechnoBren AI Assistant">
      <header class="tb-head">
        <div class="tb-avatar">🤖</div>
        <div class="tb-info">
          <div class="tb-name">TechnoBren AI <span style="font-size:10px;background:rgba(255,255,255,.25);padding:1px 6px;border-radius:6px;font-weight:700">BETA</span></div>
          <div class="tb-status">Online · usually replies instantly</div>
        </div>
        <button class="tb-close" id="tb-chat-x" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </header>
      <div class="tb-body" id="tb-chat-body"></div>
      <div class="tb-quick" id="tb-chat-quick"></div>
      <div class="tb-foot" style="position:relative">
        <input id="tb-chat-input" type="text" placeholder="Ask anything about TechnoBren…" autocomplete="off" />
        <button id="tb-chat-send" aria-label="Send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </aside>
  `;
  document.body.appendChild(wrap);

  // ---------- knowledge base ----------
  // Each entry: {keys:[...keywords], reply:html-string}
  const KB = [
    {keys:["hi","hello","hey","hii","hola","namaste"], reply:"Hello! 👋 I'm <b>TechnoBren AI</b> — happy to help. Want to know about our services, pricing, hiring developers, or something else?"},
    {keys:["thank","thanks","thx"], reply:"You're welcome! 🙌 Anything else I can help with? You can also <a href='contact.html'>book a free 30-min call</a> with our team."},
    {keys:["bye","goodbye","cya"], reply:"Goodbye! 👋 Feel free to come back anytime. We're here Mon–Sat, 9 AM – 9 PM IST (24/7 critical support)."},

    // services
    {keys:["service","services","what do you do","what you do","offer"], reply:"We offer <b>15+ services</b> across the full software lifecycle:<br/>• Custom Software Development<br/>• Mobile Apps (iOS/Android/Flutter/React Native)<br/>• AI &amp; Automation<br/>• ERP &amp; CRM<br/>• Cloud (AWS/Azure/GCP) &amp; DevOps<br/>• E-commerce, Web, UI/UX, API, Cybersecurity<br/><br/>See all → <a href='services.html'>Services page</a>"},
    {keys:["mobile","app","android","ios","flutter","react native"], reply:"Yes! We build <b>native iOS</b> (Swift/SwiftUI), <b>native Android</b> (Kotlin/Jetpack Compose) and cross-platform with <b>Flutter / React Native</b>. 180+ apps shipped, 4.7★ avg store rating.<br/><br/><a href='services/android-app-development.html'>Android details →</a> · <a href='services/ios-app-development.html'>iOS details →</a>"},
    {keys:["ai","ml","artificial","machine learning","llm","chatbot","gpt","openai","claude"], reply:"AI/ML is one of our hottest practices 🚀 — LLM apps, RAG pipelines, computer vision, custom model training. PoC in 2 weeks, production in 8.<br/><br/><a href='services/ai-ml-developers.html'>Hire AI/ML engineers →</a>"},
    {keys:["web","website","frontend","react","vue","angular","next"], reply:"We build production web apps with <b>React, Next.js, Vue, Nuxt and Angular</b>. Lighthouse 95+ guaranteed. From SaaS dashboards to high-traffic marketplaces.<br/><br/><a href='services/reactjs-development.html'>React →</a> · <a href='services/vuejs-development.html'>Vue →</a> · <a href='services/angularjs-development.html'>Angular →</a>"},
    {keys:["laravel","php","symfony"], reply:"PHP is one of our core stacks 🐘 — modern PHP 8.3 with <b>Laravel 11</b> and Symfony. Used for SaaS, admin panels, marketplaces and custom CRMs.<br/><br/><a href='services/laravel-development.html'>Laravel details →</a>"},
    {keys:["node","nodejs","javascript backend"], reply:"Yes — Node.js is our top pick for I/O-heavy realtime systems. NestJS for structure, Fastify for raw speed.<br/><br/><a href='services/nodejs-development.html'>NodeJS details →</a>"},
    {keys:["python","django","fastapi","flask"], reply:"Python is our default for AI/ML, data, and modern async APIs. <b>FastAPI</b>, <b>Django</b>, <b>Pandas</b>, <b>PyTorch</b>.<br/><br/><a href='services/python-development.html'>Python details →</a>"},
    {keys:["wordpress","wp"], reply:"Custom WordPress builds, Gutenberg blocks, headless WordPress on Next.js, ACF Pro — we do it all.<br/><br/><a href='services/wordpress-development.html'>WordPress details →</a>"},
    {keys:["shopify","ecommerce","e-commerce","woocommerce","magento","bigcommerce"], reply:"E-commerce is a strong practice 🛒 — Shopify Plus, Magento, WooCommerce, BigCommerce, Headless (Hydrogen / Next.js Commerce / Medusa). $120M+ GMV powered.<br/><br/><a href='services/shopify-development.html'>Shopify →</a> · <a href='services/magento-development.html'>Magento →</a> · <a href='services/woocommerce.html'>WooCommerce →</a>"},
    {keys:["cloud","aws","azure","gcp","devops","kubernetes","docker"], reply:"AWS Select Partner, Azure &amp; GCP certified. We design, migrate and operate cloud workloads — average <b>38% cost reduction</b> on the bill audits we run.<br/><br/><a href='services/aws-development.html'>AWS →</a> · <a href='services/google-cloud.html'>GCP →</a>"},
    {keys:["erp","crm","hrms","inventory","pos"], reply:"We build custom ERP, CRM, HRMS, POS and Inventory Management — replacing 6+ disconnected tools with one platform. 120+ deployments live.<br/><br/><a href='solutions.html'>See all solutions →</a>"},
    {keys:["ux","ui","design","figma"], reply:"Yes — research-led product design. Figma wireframes → design system → high-fidelity prototype → spec for engineering. Conversion-focused throughout."},
    {keys:["security","cyber","pentest","soc 2","iso","gdpr","hipaa"], reply:"SOC 2-aligned controls, ISO 27001 readiness, GDPR/HIPAA/PCI-DSS-ready engineering. Pen-testing, IAM hardening, threat modelling — all included."},

    // hiring devs
    {keys:["hire","developer","dedicated","offshore","outsource"], reply:"You can hire pre-vetted developers in <b>48 hours</b>:<br/>• <b>Hourly</b> from $25/hr<br/>• <b>Monthly dedicated</b> from $2,800/mo<br/>• <b>Project-based</b> custom quote<br/><br/>2-week trial, money-back if not the right fit. <a href='hire/reactjs-developers.html'>Browse skills →</a>"},
    {keys:["price","pricing","cost","budget","how much","rate"], reply:"Pricing depends on engagement model:<br/>• <b>Hourly</b>: from $25/hr<br/>• <b>Monthly dedicated dev</b>: from $2,800/mo<br/>• <b>Fixed-price project</b>: starts ~$10K for MVPs, scales to enterprise<br/><br/>Free 30-min call gives you a real estimate → <a href='contact.html'>Book here</a>"},

    // company
    {keys:["about","who are you","company","technobren","founded","history"], reply:"<b>TechnoBren Infotech Pvt Ltd</b> — 10+ years building enterprise-grade software. 200+ engineers across 4 offices (Lucknow, Jaunpur, Dubai, Uganda). 500+ projects shipped for clients in 30+ countries.<br/><br/><a href='about.html'>Read full story →</a>"},
    {keys:["office","location","address","where","based"], reply:"We have <b>4 offices</b>:<br/>🇮🇳 Lucknow, India (HQ)<br/>🇮🇳 Jaunpur, India<br/>🇦🇪 Dubai, UAE<br/>🇺🇬 Uganda<br/><br/>Remote-friendly across all time zones."},
    {keys:["team","employees","engineers","staff","people","size"], reply:"200+ engineers, designers and strategists. Average 8 years of experience. Pre-vetted, ESOPs from day one — which means low churn (we keep our people)."},
    {keys:["client","customer","trust"], reply:"500+ projects for 200+ clients across 30+ countries. Featured success: NeoBank ($2B/mo), OmniCart (34% conversion lift), AI Triage (80+ EU hospitals).<br/><br/><a href='work.html'>See case studies →</a> · <a href='testimonials.html'>Testimonials →</a>"},
    {keys:["case stud","portfolio","work","project"], reply:"Selected case studies across FinTech, Healthcare, eCommerce, Logistics, EdTech, SaaS — with measurable outcomes you can verify. <a href='work.html'>Browse portfolio →</a>"},
    {keys:["chairman","ceo","founder","rajkeshar","leader","leadership"], reply:"Our founder is <b>Rajkeshar Yadav</b> (Chairman &amp; CEO). Read his message and meet the leadership team on the <a href='about.html'>About page</a>."},

    // process
    {keys:["how long","timeline","time to","duration","fast","quick"], reply:"<b>Typical timelines:</b><br/>• MVP: 4–6 weeks<br/>• Mid-size app: 8–16 weeks<br/>• Enterprise platform: 4–9 months<br/><br/>We onboard in 48 hours and ship a working build every Friday."},
    {keys:["process","methodology","how do you","approach","framework"], reply:"Our 7-step framework: 1) Discovery → 2) Planning → 3) UI/UX → 4) Development → 5) Testing → 6) Deployment → 7) Maintenance. Battle-tested across 500+ projects.<br/><br/><a href='methodology.html'>Full methodology →</a>"},
    {keys:["nda","contract","ip","intellectual","ownership"], reply:"Yes — we sign your <b>NDA</b> before any commercial discussion. Standard MSA + project SOW. <b>100% IP assigned to you</b> on payment. We never sub-contract."},
    {keys:["support","sla","maintenance","24/7"], reply:"24/7 SLA-backed support: <b>P0 response &lt; 15 min</b>, P1 &lt; 2 hrs. 90-day warranty on every deliverable. Monthly support packages from $1,500/mo."},
    {keys:["technology","tech stack","tools","framework"], reply:"50+ technologies in active use across Frontend, Backend, Mobile, Cloud, Database, AI/ML, CMS. <a href='technology.html'>Full stack →</a>"},
    {keys:["industry","sector","vertical"], reply:"We serve 8 industries: Healthcare, Retail, Education, Finance, Manufacturing, Logistics, Real Estate, Hospitality. Deep domain knowledge in each. <a href='we-work-with.html'>Industries →</a>"},
    {keys:["career","job","hiring","work for","apply","position","role"], reply:"We're hiring! 14 open positions right now (Engineering, Design, PM, Sales, HR). $2K learning budget, ESOPs Day 1, 4-day workweek option, annual workation. <a href='careers.html'>See open roles →</a>"},
    {keys:["blog","article","insight","read"], reply:"Our engineers publish weekly — AI deep-dives, scalable architecture, product strategy. <a href='blog.html'>Read the blog →</a>"},
    {keys:["contact","reach","email","phone","call","whatsapp","talk"], reply:"📧 <a href='mailto:r.yadav@technobren.com'>r.yadav@technobren.com</a><br/>📞 <a href='tel:+919016643264'>+91 901 664 3264</a><br/>💬 WhatsApp: same number<br/>⏰ Mon–Sat, 9 AM – 9 PM IST<br/><br/>Or use our <a href='contact.html'>contact form</a> — we reply within 1 business hour."},
    {keys:["faq","question","answer"], reply:"Most common questions are answered on our <a href='faqs.html'>FAQs page</a> — pricing, NDAs, timelines, IP, security, scaling and more."},
    {keys:["policy","privacy","terms","cookie","refund"], reply:"All our policies (Privacy, Terms, Cookies, Refund, SLA, DPA, Security, AUP) are on the <a href='policies.html'>Policies page</a>."},
    {keys:["partner","reseller","white label","collaborat"], reply:"Yes — we partner with agencies, consultancies and SIs. White-label engagements welcome. Email <a href='mailto:r.yadav@technobren.com'>r.yadav@technobren.com</a> with the subject 'Partnership'."},
    {keys:["startup","mvp"], reply:"Startups are our love 🚀 — we ship MVPs in 4-6 weeks, equity-friendly pricing, pivot-ready architecture. <a href='we-work-with.html'>See how we work with startups →</a>"},
    {keys:["enterprise","large","fortune"], reply:"For enterprise we bring SOC 2, ISO 27001, HIPAA-ready engineering, vendor onboarding kits, and multi-year support contracts. <a href='we-work-with.html'>Enterprise engagements →</a>"},
  ];

  const QUICK_REPLIES = [
    "What services do you offer?",
    "How much do you charge?",
    "Hire developers",
    "Show me your work",
    "How long for an MVP?",
    "Contact details"
  ];

  // ---------- chat logic ----------
  const fab = document.getElementById('tb-chat-fab');
  const panel = document.getElementById('tb-chat-panel');
  const closeBtn = document.getElementById('tb-chat-x');
  const body = document.getElementById('tb-chat-body');
  const input = document.getElementById('tb-chat-input');
  const sendBtn = document.getElementById('tb-chat-send');
  const quick = document.getElementById('tb-chat-quick');
  const badge = fab.querySelector('.tb-badge');

  function add(text, who){
    const m = document.createElement('div');
    m.className = 'tb-msg ' + who;
    m.innerHTML = text;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
  }
  function showTyping(){
    const t = document.createElement('div');
    t.className = 'tb-typing';
    t.id = 'tb-typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(t);
    body.scrollTop = body.scrollHeight;
  }
  function hideTyping(){
    document.getElementById('tb-typing')?.remove();
  }

  function findReply(text){
    const q = text.toLowerCase();
    let best = null, bestScore = 0;
    for (const entry of KB) {
      let score = 0;
      for (const k of entry.keys) {
        if (q.includes(k)) score += k.length; // longer match wins
      }
      if (score > bestScore) { bestScore = score; best = entry; }
    }
    if (best) return best.reply;
    return "I'm not sure I caught that 🤔 — but our team will know! You can <a href='contact.html'>contact us here</a> or ask me about <b>services, pricing, technologies, hiring developers, our team, offices, methodology, or contact details</b>.";
  }

  function botRespond(userText){
    showTyping();
    setTimeout(()=>{
      hideTyping();
      add(findReply(userText), 'bot');
    }, 600 + Math.min(1400, userText.length * 18));
  }

  function send(text){
    text = (text || '').trim();
    if (!text) return;
    add(escapeHtml(text), 'user');
    input.value = '';
    botRespond(text);
  }
  function escapeHtml(s){
    return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function renderQuick(){
    quick.innerHTML = '';
    QUICK_REPLIES.forEach(q => {
      const b = document.createElement('button');
      b.textContent = q;
      b.onclick = () => send(q);
      quick.appendChild(b);
    });
  }

  function open(){
    panel.classList.add('open');
    badge.style.display = 'none';
    if (body.children.length === 0) {
      // First-open greeting
      setTimeout(()=>add("👋 Hi there! I'm <b>TechnoBren AI</b> — your virtual assistant. Ask me anything about our services, technologies, pricing or team!", 'bot'), 300);
      setTimeout(()=>add("Try one of the quick questions below 👇 or type your own.", 'bot'), 1000);
    }
    setTimeout(()=>input.focus(), 350);
  }
  function close(){ panel.classList.remove('open'); }

  fab.onclick = open;
  closeBtn.onclick = close;
  sendBtn.onclick = () => send(input.value);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') send(input.value); });
  renderQuick();

  // Auto-pop badge after 8s if user hasn't opened
  setTimeout(()=>{
    if (!panel.classList.contains('open')) {
      badge.style.animation = 'tbPulse 1.4s infinite';
    }
  }, 8000);
})();
