import { useState, useRef, useEffect, useCallback } from 'react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#F0F4F8;--surface:#fff;--border:#DDE3EC;--border-2:#C8D2DF;
    --t1:#0D1B2A;--t2:#4A5568;--t3:#8A97A8;
    --teal:#0B6E6E;--teal-lt:#EAF4F4;--teal-md:#B2D8D8;
    --red:#C0392B;--red-lt:#FDECEA;
    --amber:#B7791F;--amber-lt:#FEF3C7;
    --green:#1A7F5A;--green-lt:#E6F4EE;
    --blue:#1D4ED8;--blue-lt:#EFF6FF;
    --r:12px;
    --sh:0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04);
    --sh-md:0 4px 12px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.04);
  }
  body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--t1);min-height:100vh;-webkit-font-smoothing:antialiased}
  .shell{max-width:430px;margin:0 auto;min-height:100vh;background:var(--bg);display:flex;flex-direction:column}
  .hdr{background:var(--surface);border-bottom:1px solid var(--border);padding:13px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50}
  .brand{display:flex;align-items:center;gap:10px}
  .brand-icon{width:34px;height:34px;background:var(--teal);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:17px}
  .brand-name{font-family:'DM Serif Display',serif;font-size:20px;color:var(--t1);letter-spacing:-.3px}
  .brand-name span{color:var(--teal)}
  .hdr-right{display:flex;align-items:center;gap:8px}
  .pill{font-size:11px;font-weight:600;padding:3px 10px;border-radius:999px;letter-spacing:.03em}
  .pill-teal{background:var(--teal-lt);color:var(--teal);border:1px solid var(--teal-md)}
  .pill-green{background:var(--green-lt);color:var(--green);border:1px solid #A7F3D0}
  .pill-red{background:var(--red-lt);color:var(--red);border:1px solid #FECACA}
  .pill-amber{background:var(--amber-lt);color:var(--amber);border:1px solid #FDE68A}
  .pill-blue{background:var(--blue-lt);color:var(--blue);border:1px solid #BFDBFE}
  .scroll{flex:1;overflow-y:auto;padding-bottom:84px}
  .sec-lbl{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t3)}
  .banner{background:var(--teal);padding:24px 20px 22px;position:relative;overflow:hidden}
  .banner::after{content:'';position:absolute;right:-20px;top:-20px;width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,.06)}
  .b-greet{font-size:12px;font-weight:500;color:rgba(255,255,255,.6);margin-bottom:3px}
  .b-title{font-family:'DM Serif Display',serif;font-size:22px;color:#fff;line-height:1.25;margin-bottom:18px;position:relative;z-index:1}
  .b-stats{display:flex;gap:10px;position:relative;z-index:1}
  .bstat{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:10px 14px;flex:1}
  .bstat-v{font-size:22px;font-weight:700;color:#fff;line-height:1;margin-bottom:3px}
  .bstat-l{font-size:10px;font-weight:500;color:rgba(255,255,255,.6)}
  .rec-area{padding:20px 20px 4px}
  .rec-main{width:100%;background:var(--surface);border:1.5px dashed var(--teal-md);border-radius:var(--r);padding:20px;display:flex;align-items:center;gap:16px;cursor:pointer;transition:border-color .2s,background .2s;box-shadow:var(--sh)}
  .rec-main:hover{border-color:var(--teal);background:var(--teal-lt)}
  .rec-circle{width:50px;height:50px;border-radius:50%;background:var(--teal);display:flex;align-items:center;justify-content:center;font-size:21px;flex-shrink:0;box-shadow:0 4px 12px rgba(11,110,110,.28)}
  .rbt-title{font-size:14px;font-weight:600;color:var(--t1);margin-bottom:2px}
  .rbt-sub{font-size:12px;color:var(--t3)}
  .rbt-arrow{margin-left:auto;font-size:20px;color:var(--t3)}
  .notes-sec{padding:20px 20px 0}
  .note-item{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:14px 16px;margin-bottom:10px;cursor:pointer;transition:box-shadow .2s,border-color .2s;box-shadow:var(--sh)}
  .note-item:hover{border-color:var(--teal-md);box-shadow:var(--sh-md)}
  .note-r1{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px}
  .note-name{font-size:14px;font-weight:600;color:var(--t1)}
  .note-time{font-size:11px;color:var(--t3);font-weight:500}
  .note-prev{font-size:12px;color:var(--t2);line-height:1.55;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .note-ft{display:flex;align-items:center;gap:8px;padding-top:10px;border-top:1px solid var(--border)}
  .nm{font-size:11px;font-weight:500;color:var(--t3);display:flex;align-items:center;gap:4px}
  .nm.ml{margin-left:auto;color:var(--teal);font-weight:600}
  .rec-wrap{padding:24px 20px}
  .rec-pat{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:14px 16px;display:flex;align-items:center;gap:12px;margin-bottom:20px;box-shadow:var(--sh)}
  .avatar{width:42px;height:42px;border-radius:10px;background:var(--teal-lt);border:1px solid var(--teal-md);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
  .pat-name{font-size:14px;font-weight:600;color:var(--t1)}
  .pat-sub{font-size:11px;color:var(--t3);margin-top:2px}
  .transcript-box{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:14px 16px;margin-bottom:16px;min-height:80px;box-shadow:var(--sh)}
  .transcript-label{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t3);margin-bottom:8px}
  .transcript-text{font-size:13px;color:var(--t2);line-height:1.7;min-height:44px}
  .transcript-text.empty{color:var(--t3);font-style:italic}
  .waveform{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:18px;display:flex;align-items:center;justify-content:center;gap:3px;height:90px;margin-bottom:16px;box-shadow:var(--sh)}
  .wbar{width:3px;background:var(--teal);border-radius:2px;animation:wv 1.1s ease-in-out infinite;opacity:.8}
  @keyframes wv{0%,100%{transform:scaleY(.15)}50%{transform:scaleY(1)}}
  .timer-block{text-align:center;margin-bottom:20px}
  .timer-num{font-family:'DM Serif Display',serif;font-size:52px;color:var(--t1);letter-spacing:-2px;line-height:1;margin-bottom:6px}
  .rec-ind{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:var(--red);letter-spacing:.06em;text-transform:uppercase}
  .rec-dot{width:8px;height:8px;border-radius:50%;background:var(--red);animation:blink 1s ease-in-out infinite}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
  .rec-ctrls{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:16px}
  .btn-outline{padding:10px 22px;border-radius:10px;border:1px solid var(--border-2);background:var(--surface);font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;color:var(--t2);cursor:pointer;transition:all .2s}
  .btn-outline:hover{border-color:var(--teal);color:var(--teal)}
  .btn-stop{width:66px;height:66px;border-radius:50%;background:var(--red);border:none;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;color:#fff;box-shadow:0 4px 16px rgba(192,57,43,.32);transition:transform .15s}
  .btn-stop:hover{transform:scale(1.06)}
  .btn-stop:disabled{opacity:.5;cursor:not-allowed;transform:none}
  .photo-row{display:flex;gap:10px;align-items:center}
  .photo-tip{flex:1;background:var(--blue-lt);border:1px solid #BFDBFE;border-radius:10px;padding:11px 14px;display:flex;align-items:center;gap:8px;font-size:12px;color:var(--blue);font-weight:500;cursor:pointer}
  .photo-thumb{width:48px;height:48px;border-radius:8px;object-fit:cover;border:1px solid var(--border)}
  .proc-wrap{padding:48px 20px;display:flex;flex-direction:column;align-items:center;gap:18px;min-height:460px;justify-content:center}
  .spinner{width:52px;height:52px;border:3px solid var(--border);border-top-color:var(--teal);border-radius:50%;animation:spin .85s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  .proc-title{font-family:'DM Serif Display',serif;font-size:20px;color:var(--t1);text-align:center}
  .proc-sub{font-size:13px;color:var(--t3);text-align:center;margin-top:-10px}
  .proc-steps{width:100%;display:flex;flex-direction:column;gap:8px}
  .proc-step{display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--surface);border:1px solid var(--border);border-radius:10px;font-size:13px;color:var(--t3);font-weight:500;box-shadow:var(--sh)}
  .proc-step.done{color:var(--green);border-color:#A7F3D0;background:var(--green-lt)}
  .proc-step.active{color:var(--teal);border-color:var(--teal-md);background:var(--teal-lt)}
  .result-wrap{padding:20px}
  .result-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
  .result-pat{display:flex;align-items:center;gap:10px}
  .result-icon{width:40px;height:40px;border-radius:10px;background:var(--green-lt);border:1px solid #A7F3D0;display:flex;align-items:center;justify-content:center;font-size:18px}
  .result-name{font-size:16px;font-weight:700;color:var(--t1)}
  .result-meta{font-size:11px;color:var(--t3);margin-top:1px}
  .urgency-bar{border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;margin-bottom:12px}
  .urgency-bar.urgent{background:var(--red-lt);border:1px solid #FECACA;color:var(--red)}
  .urgency-bar.routine{background:var(--green-lt);border:1px solid #A7F3D0;color:var(--green)}
  .urgency-bar.followup{background:var(--blue-lt);border:1px solid #BFDBFE;color:var(--blue)}
  .think-toggle{width:100%;background:var(--surface);border:1px solid #E9D5FF;border-radius:var(--r);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;margin-bottom:12px;box-shadow:var(--sh);transition:background .2s}
  .think-toggle:hover{background:#FAF5FF}
  .think-left{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:#6D28D9}
  .think-icon{width:28px;height:28px;background:#EDE9FE;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:14px}
  .think-chev{font-size:11px;color:#9CA3AF;transition:transform .25s}
  .think-chev.open{transform:rotate(180deg)}
  .think-body{background:#FDFBFF;border:1px solid #E9D5FF;border-radius:10px;padding:16px;margin-bottom:14px;font-size:12px;line-height:1.9;color:var(--t2)}
  .think-body b{color:#6D28D9;font-weight:600}
  .soap-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
  .soap-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:14px;box-shadow:var(--sh)}
  .soap-card.full{grid-column:1/-1}
  .soap-hd{display:flex;align-items:center;gap:6px;margin-bottom:8px}
  .soap-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
  .soap-lbl{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
  .soap-body{font-size:12px;color:var(--t2);line-height:1.65}
  .soap-s .soap-dot{background:#3B82F6}.soap-s .soap-lbl{color:#3B82F6}
  .soap-o .soap-dot{background:var(--green)}.soap-o .soap-lbl{color:var(--green)}
  .soap-a .soap-dot{background:var(--amber)}.soap-a .soap-lbl{color:var(--amber)}
  .soap-p .soap-dot{background:var(--teal)}.soap-p .soap-lbl{color:var(--teal)}
  .actions-card{background:var(--surface);border:1px solid #FDE68A;border-radius:var(--r);padding:14px 16px;margin-bottom:14px;box-shadow:var(--sh)}
  .actions-hd{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--amber);margin-bottom:12px;display:flex;align-items:center;gap:6px}
  .action-row{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);font-size:12.5px;color:var(--t2);line-height:1.5}
  .action-row:last-child{border-bottom:none}
  .action-cb{width:17px;height:17px;border:1.5px solid var(--border-2);border-radius:4px;flex-shrink:0;margin-top:1px;background:var(--surface);cursor:pointer;transition:all .15s}
  .action-cb:hover{border-color:var(--teal)}
  .action-cb.checked{background:var(--teal);border-color:var(--teal)}
  .btn-primary{width:100%;padding:15px;border-radius:var(--r);background:var(--teal);border:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;color:#fff;cursor:pointer;letter-spacing:.02em;box-shadow:0 4px 12px rgba(11,110,110,.25);transition:background .2s}
  .btn-primary:hover{background:#095c5c}
  .btn-secondary{width:100%;padding:13px;border-radius:var(--r);border:1.5px solid var(--border-2);background:var(--surface);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;color:var(--t2);cursor:pointer;transition:all .2s;margin-top:10px}
  .btn-secondary:hover{border-color:var(--teal);color:var(--teal)}
  .error-box{background:#FFF5F5;border:1px solid #FECACA;border-radius:10px;padding:14px 16px;font-size:13px;color:var(--red);line-height:1.6;margin-bottom:14px}
  .hist-hd{padding:22px 20px 16px;border-bottom:1px solid var(--border);background:var(--surface);margin-bottom:16px}
  .hist-title{font-family:'DM Serif Display',serif;font-size:22px;color:var(--t1);margin-bottom:2px}
  .hist-sub{font-size:12px;color:var(--t3)}
  .filter-row{display:flex;gap:8px;padding:0 20px 14px;overflow-x:auto}
  .filter-chip{padding:6px 14px;border-radius:999px;border:1px solid var(--border);background:var(--surface);font-size:12px;font-weight:600;color:var(--t2);cursor:pointer;white-space:nowrap;transition:all .15s}
  .filter-chip.active{background:var(--teal);border-color:var(--teal);color:#fff}
  .empty-state{text-align:center;padding:60px 24px}
  .empty-icon{font-size:40px;margin-bottom:12px}
  .empty-title{font-size:16px;font-weight:600;color:var(--t1);margin-bottom:4px}
  .empty-sub{font-size:13px;color:var(--t3)}
  .settings-wrap{padding:24px 20px}
  .settings-title{font-family:'DM Serif Display',serif;font-size:22px;color:var(--t1);margin-bottom:4px}
  .settings-sub{font-size:13px;color:var(--t3);margin-bottom:28px}
  .sg{margin-bottom:24px}
  .sg-lbl{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t3);margin-bottom:10px;padding-left:2px}
  .setting-row{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:14px 16px;display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;box-shadow:var(--sh)}
  .sr-name{font-size:14px;font-weight:600;color:var(--t1);margin-bottom:2px}
  .sr-desc{font-size:11px;color:var(--t3)}
  .api-input{width:100%;background:var(--surface);border:1.5px solid var(--border);border-radius:var(--r);padding:13px 16px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:var(--t1);outline:none;margin-bottom:6px;transition:border-color .2s}
  .api-input:focus{border-color:var(--teal)}
  .api-input::placeholder{color:var(--t3)}
  .api-hint{font-size:11px;color:var(--t3);padding-left:2px;line-height:1.6}
  .toggle-sw{width:42px;height:24px;border-radius:999px;background:var(--teal);position:relative;cursor:pointer;flex-shrink:0;transition:background .2s}
  .toggle-sw::after{content:'';position:absolute;width:18px;height:18px;border-radius:50%;background:#fff;top:3px;right:3px;box-shadow:0 1px 3px rgba(0,0,0,.15);transition:right .2s}
  .toggle-sw.off{background:#CBD5E1}
  .toggle-sw.off::after{right:auto;left:3px}
  .save-indicator{font-size:12px;color:var(--green);font-weight:600;display:flex;align-items:center;gap:4px;margin-top:6px}
  .setup-link{color:var(--teal);font-weight:600;text-decoration:none}
  .setup-link:hover{text-decoration:underline}
  .bnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:var(--surface);border-top:1px solid var(--border);display:flex;padding:8px 0 14px;z-index:100}
  .nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;background:none;border:none;cursor:pointer;padding:4px 0}
  .nav-iw{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;transition:background .15s}
  .nav-btn.active .nav-iw{background:var(--teal-lt)}
  .nav-lbl{font-size:10px;font-weight:600;color:var(--t3);letter-spacing:.02em;transition:color .15s}
  .nav-btn.active .nav-lbl{color:var(--teal)}
`

const PROMPT = `You are a clinical documentation assistant for community health workers in resource-limited settings.
Analyse the following voice note transcript from a patient visit and generate a structured clinical note.
TRANSCRIPT: {TRANSCRIPT}
{IMAGE_NOTE}
Respond ONLY with valid JSON:
{"reasoning":"step-by-step clinical reasoning 3-5 sentences","urgency":"Urgent","urgencyAlert":"one sentence alert or empty string","soap":{"subjective":"patient reports","objective":"measurable findings","assessment":"clinical assessment","plan":"recommended actions"},"actions":["action 1","action 2","action 3"]}
urgency must be exactly: "Urgent", "Routine", or "Follow-up"`

async function callGemma4(transcript, imageBase64, imageType, apiKey, model) {
  const parts = []
  if (imageBase64) parts.push({ inlineData: { mimeType: imageType, data: imageBase64 } })
  const imageNote = imageBase64 ? 'An image has also been provided. Consider any visible symptoms or conditions shown.' : ''
  parts.push({ text: PROMPT.replace('{TRANSCRIPT}', transcript || 'No transcript available.').replace('{IMAGE_NOTE}', imageNote) })
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ role: 'user', parts }], generationConfig: { temperature: 0.3, maxOutputTokens: 2048, topP: 0.8 } })
  })
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err?.error?.message || `API error ${res.status}`) }
  const data = await res.json()
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
  return JSON.parse(raw.replace(/```json|```/g, '').trim())
}

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
const fmtSecs = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`
const pillClass = t => t==='Urgent'?'pill pill-red':t==='Routine'?'pill pill-green':'pill pill-blue'
const urgencyClass = t => t==='Urgent'?'urgent':t==='Routine'?'routine':'followup'
const urgencyEmoji = t => t==='Urgent'?'⚠':t==='Routine'?'✓':'↻'
const BARS = Array.from({length:36},(_,i)=>({h:15+Math.random()*75,d:(i*0.055).toFixed(3)}))
const LS_NOTES='fieldmind_notes',LS_KEY='fieldmind_apikey',LS_MODEL='fieldmind_model'

export default function App() {
  const [apiKey,setApiKey]=useState(()=>localStorage.getItem(LS_KEY)||'')
  const [model,setModel]=useState(()=>localStorage.getItem(LS_MODEL)||'gemma-3-27b-it')
  const [notes,setNotes]=useState(()=>{try{return JSON.parse(localStorage.getItem(LS_NOTES)||'[]')}catch{return[]}})
  const [screen,setScreen]=useState('home')
  const [nav,setNav]=useState('home')
  const [secs,setSecs]=useState(0)
  const [transcript,setTranscript]=useState('')
  const [photoURL,setPhotoURL]=useState(null)
  const [photoB64,setPhotoB64]=useState(null)
  const [photoType,setPhotoType]=useState(null)
  const [note,setNote]=useState(null)
  const [noteTime,setNoteTime]=useState('')
  const [error,setError]=useState('')
  const [showThink,setShowThink]=useState(false)
  const [checked,setChecked]=useState([])
  const [saved,setSaved]=useState(false)
  const [filter,setFilter]=useState('All')
  const [keySaved,setKeySaved]=useState(false)
  const [step,setStep]=useState(0)
  const timerRef=useRef(null),speechRef=useRef(null),photoInputRef=useRef(null)

  useEffect(()=>{localStorage.setItem(LS_NOTES,JSON.stringify(notes))},[notes])

  const startRecording=useCallback(()=>{
    setSecs(0);setTranscript('');setPhotoURL(null);setPhotoB64(null);setPhotoType(null);setError('')
    setScreen('recording');setNav('record')
    timerRef.current=setInterval(()=>setSecs(p=>p+1),1000)
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition
    if(SR){
      const sr=new SR();sr.continuous=true;sr.interimResults=true;sr.lang='en-US'
      sr.onresult=e=>{let f='';for(let i=0;i<e.results.length;i++)if(e.results[i].isFinal)f+=e.results[i][0].transcript+' ';setTranscript(f.trim())}
      sr.onerror=()=>{};sr.start();speechRef.current=sr
    }
  },[])

  const stopRecording=useCallback(()=>{
    clearInterval(timerRef.current)
    if(speechRef.current){speechRef.current.stop();speechRef.current=null}
    setScreen('processing');setNoteTime(now());setSaved(false);setChecked([]);setShowThink(false)
  },[])

  useEffect(()=>{
    if(screen!=='processing')return
    if(!apiKey){setError('No API key set. Please go to Settings and add your Google AI Studio key.');setScreen('result');setNote(null);return}
    callGemma4(transcript,photoB64,photoType,apiKey,model).then(r=>{setNote(r);setError('');setScreen('result')}).catch(e=>{setError(`Gemma 4 API error: ${e.message}`);setNote(null);setScreen('result')})
  },[screen])

  useEffect(()=>{
    if(screen!=='processing'){setStep(0);return}
    const t1=setTimeout(()=>setStep(1),600),t2=setTimeout(()=>setStep(2),1400),t3=setTimeout(()=>setStep(3),2400)
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3)}
  },[screen])

  const handlePhoto=e=>{
    const file=e.target.files?.[0];if(!file)return
    setPhotoURL(URL.createObjectURL(file));setPhotoType(file.type)
    const reader=new FileReader();reader.onload=ev=>setPhotoB64(ev.target.result.split(',')[1]);reader.readAsDataURL(file)
  }

  const saveNote=()=>{
    if(!note)return
    setNotes(prev=>[{id:Date.now(),name:'Patient Visit',tag:note.urgency,time:noteTime,preview:note.soap?.subjective||'',soap:note.soap,reasoning:note.reasoning,actions:note.actions,urgencyAlert:note.urgencyAlert,hasPhoto:!!photoURL},...prev])
    setSaved(true)
  }

  const goNav=id=>{
    setNav(id)
    if(id==='record'){startRecording();return}
    if(id==='home')setScreen('home')
    if(id==='history')setScreen('history')
    if(id==='settings')setScreen('settings')
  }

  const viewNote=n=>{
    setNote({urgency:n.tag,urgencyAlert:n.urgencyAlert,soap:n.soap,reasoning:n.reasoning,actions:n.actions})
    setNoteTime(n.time);setShowThink(false);setChecked([]);setSaved(true);setScreen('result');setNav('home')
  }

  const saveSettings=()=>{localStorage.setItem(LS_KEY,apiKey);localStorage.setItem(LS_MODEL,model);setKeySaved(true);setTimeout(()=>setKeySaved(false),2000)}
  const filtered=filter==='All'?notes:notes.filter(n=>n.tag===filter)
  const stepStatus=i=>i<step?'done':i===step?'active':''

  return(<><style>{css}</style><div className="shell">
    <header className="hdr">
      <div className="brand"><div className="brand-icon">🏥</div><div className="brand-name">Field<span>Mind</span></div></div>
      <div className="hdr-right"><span className="pill pill-teal">Gemma 4</span><span className={`pill ${apiKey?'pill-green':'pill-red'}`}>{apiKey?'● Online':'● No Key'}</span></div>
    </header>
    <div className="scroll">

      {screen==='home'&&<>
        <div className="banner">
          <div className="b-greet">Good morning, Field Worker</div>
          <div className="b-title">Ready to document<br/>today's visits?</div>
          <div className="b-stats">
            {[[notes.length,'Total notes'],[notes.filter(n=>n.tag==='Urgent').length,'Referrals'],[notes.length,'All time']].map(([v,l])=>(
              <div className="bstat" key={l}><div className="bstat-v">{v}</div><div className="bstat-l">{l}</div></div>
            ))}
          </div>
        </div>
        {!apiKey&&<div style={{padding:'16px 20px 0'}}><div className="error-box">⚙ No API key set. Go to <strong>Settings</strong> and paste your <a className="setup-link" href="https://aistudio.google.com" target="_blank" rel="noreferrer">Google AI Studio</a> API key.</div></div>}
        <div className="rec-area">
          <div className="rec-main" onClick={startRecording}>
            <div className="rec-circle">🎙️</div>
            <div><div className="rbt-title">Record Voice Note</div><div className="rbt-sub">Tap to start — Gemma 4 generates SOAP note</div></div>
            <div className="rbt-arrow">›</div>
          </div>
        </div>
        <div className="notes-sec">
          <div className="sec-lbl" style={{marginBottom:12}}>Recent Notes</div>
          {notes.length===0?(<div className="empty-state"><div className="empty-icon">📋</div><div className="empty-title">No notes yet</div><div className="empty-sub">Tap Record Voice Note to create your first AI-generated clinical note.</div></div>
          ):notes.slice(0,5).map(n=>(
            <div className="note-item" key={n.id} onClick={()=>viewNote(n)}>
              <div className="note-r1"><div className="note-name">{n.name}</div><div className="note-time">{n.time}</div></div>
              <div className="note-prev">{n.preview}</div>
              <div className="note-ft"><span className={pillClass(n.tag)}>{n.tag}</span>{n.hasPhoto&&<span className="nm">📷 Photo</span>}<span className="nm ml">View SOAP →</span></div>
            </div>
          ))}
        </div>
      </>}

      {screen==='recording'&&<div className="rec-wrap">
        <div className="rec-pat"><div className="avatar">👤</div><div><div className="pat-name">New Patient Visit</div><div className="pat-sub">Speak clearly — Gemma 4 will structure your notes</div></div></div>
        <div className="transcript-box"><div className="transcript-label">Live transcript</div><div className={`transcript-text ${!transcript?'empty':''}`}>{transcript||'Start speaking…'}</div></div>
        <div className="waveform">{BARS.map((b,i)=><div key={i} className="wbar" style={{height:`${b.h}%`,animationDelay:`${b.d}s`}}/>)}</div>
        <div className="timer-block"><div className="timer-num">{fmtSecs(secs)}</div><div className="rec-ind"><div className="rec-dot"/>Recording</div></div>
        <div className="rec-ctrls">
          <button className="btn-outline" onClick={()=>{clearInterval(timerRef.current);if(speechRef.current){speechRef.current.stop();speechRef.current=null}setScreen('home');setNav('home')}}>Cancel</button>
          <button className="btn-stop" onClick={stopRecording} disabled={secs<2}>⏹</button>
          <button className="btn-outline" onClick={()=>photoInputRef.current?.click()}>{photoURL?'📷 ✓':'+ Photo'}</button>
        </div>
        <input ref={photoInputRef} type="file" accept="image/*" capture="environment" style={{display:'none'}} onChange={handlePhoto}/>
        <div className="photo-row">
          <div className="photo-tip" onClick={()=>photoInputRef.current?.click()}>📷 &nbsp;{photoURL?'Photo attached — tap to replace':'Attach a photo for visual analysis'}</div>
          {photoURL&&<img src={photoURL} alt="attached" className="photo-thumb"/>}
        </div>
      </div>}

      {screen==='processing'&&<div className="proc-wrap">
        <div className="spinner"/>
        <div className="proc-title">Gemma 4 is analysing…</div>
        <div className="proc-sub">Generating your clinical note</div>
        <div className="proc-steps">
          {['Audio transcript received','Extracting clinical context','Generating SOAP note','Flagging action items'].map((label,i)=>(
            <div key={i} className={`proc-step ${stepStatus(i)}`}><span>{stepStatus(i)==='done'?'✓':stepStatus(i)==='active'?'⟳':'○'}</span>{label}</div>
          ))}
        </div>
      </div>}

      {screen==='result'&&<div className="result-wrap">
        {error?(<><div className="error-box"><strong>Something went wrong</strong><br/>{error}<br/><br/><strong>Fixes:</strong><br/>• Check API key in Settings<br/>• Check model name<br/>• Check internet connection</div><button className="btn-secondary" onClick={()=>{setScreen('home');setNav('home')}}>← Back to Home</button></>
        ):note?(<>
          <div className="result-top">
            <div className="result-pat"><div className="result-icon">✓</div><div><div className="result-name">Patient Visit</div><div className="result-meta">Generated · {noteTime}</div></div></div>
            <span className={pillClass(note.urgency)}>{note.urgency}</span>
          </div>
          {note.urgencyAlert&&<div className={`urgency-bar ${urgencyClass(note.urgency)}`}>{urgencyEmoji(note.urgency)}&nbsp;{note.urgencyAlert}</div>}
          {note.reasoning&&<><div className="think-toggle" onClick={()=>setShowThink(t=>!t)}><div className="think-left"><div className="think-icon">🧠</div>View Gemma 4 reasoning chain</div><span className={`think-chev ${showThink?'open':''}`}>▼</span></div>{showThink&&<div className="think-body"><b>// Gemma 4 clinical reasoning</b><br/><br/>{note.reasoning}</div>}</>}
          <div className="sec-lbl" style={{marginBottom:10}}>SOAP Note</div>
          <div className="soap-grid">
            {[{cls:'soap-s',label:'Subjective',text:note.soap?.subjective},{cls:'soap-o',label:'Objective',text:note.soap?.objective},{cls:'soap-a full',label:'Assessment',text:note.soap?.assessment},{cls:'soap-p full',label:'Plan',text:note.soap?.plan}].map(({cls,label,text})=>(
              <div key={label} className={`soap-card ${cls}`}><div className="soap-hd"><div className="soap-dot"/><div className="soap-lbl">{label}</div></div><div className="soap-body">{text||'—'}</div></div>
            ))}
          </div>
          {note.actions?.length>0&&<div className="actions-card"><div className="actions-hd">⚡ Action Items</div>{note.actions.map((a,i)=>(
            <div key={i} className="action-row"><div className={`action-cb ${checked.includes(i)?'checked':''}`} onClick={()=>setChecked(prev=>prev.includes(i)?prev.filter(x=>x!==i):[...prev,i])}/><span style={{textDecoration:checked.includes(i)?'line-through':'none',opacity:checked.includes(i)?.5:1}}>{a}</span></div>
          ))}</div>}
          {!saved?<button className="btn-primary" onClick={saveNote}>Save Note</button>:<div className="save-indicator">✓ Note saved to history</div>}
          <button className="btn-secondary" onClick={()=>{setScreen('home');setNav('home')}}>← Back to Home</button>
        </>):null}
      </div>}

      {screen==='history'&&<>
        <div className="hist-hd"><div className="hist-title">All Notes</div><div className="hist-sub">{notes.length} note{notes.length!==1?'s':''} recorded</div></div>
        <div className="filter-row">{['All','Urgent','Routine','Follow-up'].map(f=><div key={f} className={`filter-chip ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>{f}</div>)}</div>
        <div style={{padding:'0 20px'}}>
          {filtered.length===0?(<div className="empty-state"><div className="empty-icon">📭</div><div className="empty-title">No {filter!=='All'?filter.toLowerCase():''} notes</div><div className="empty-sub">Record a voice note to see it here.</div></div>
          ):filtered.map((n,i)=>(
            <div className="note-item" key={i} onClick={()=>viewNote(n)}>
              <div className="note-r1"><div className="note-name">{n.name}</div><div className="note-time">{n.time}</div></div>
              <div className="note-prev">{n.preview}</div>
              <div className="note-ft"><span className={pillClass(n.tag)}>{n.tag}</span>{n.hasPhoto&&<span className="nm">📷</span>}<span className="nm ml">View →</span></div>
            </div>
          ))}
        </div>
      </>}

      {screen==='settings'&&<div className="settings-wrap">
        <div className="settings-title">Settings</div>
        <div className="settings-sub">Configure your FieldMind assistant</div>
        <div className="sg"><div className="sg-lbl">API Key</div><input className="api-input" type="password" placeholder="Paste your Google AI Studio API key…" value={apiKey} onChange={e=>setApiKey(e.target.value)}/><div className="api-hint">Get a free key at <a className="setup-link" href="https://aistudio.google.com" target="_blank" rel="noreferrer">aistudio.google.com</a>. Stored only in this browser.</div></div>
        <div className="sg"><div className="sg-lbl">Model</div><input className="api-input" type="text" placeholder="e.g. gemma-3-27b-it" value={model} onChange={e=>setModel(e.target.value)}/><div className="api-hint">Check available Gemma 4 model names in Google AI Studio. Recommended: <strong>gemma-3-27b-it</strong></div></div>
        <div className="sg"><div className="sg-lbl">Features</div>
          {[{name:'Show reasoning chain',desc:'Display Gemma 4 thinking before SOAP note',on:true},{name:'Photo analysis',desc:'Attach images alongside voice notes',on:true},{name:'Offline note caching',desc:'Notes auto-saved to browser storage',on:true}].map((r,i)=>(
            <div className="setting-row" key={i}><div><div className="sr-name">{r.name}</div><div className="sr-desc">{r.desc}</div></div><div className={`toggle-sw ${r.on?'':'off'}`}/></div>
          ))}
        </div>
        <button className="btn-primary" onClick={saveSettings}>Save Settings</button>
        {keySaved&&<div className="save-indicator" style={{marginTop:10}}>✓ Settings saved</div>}
        <div style={{marginTop:24}}><div className="sg-lbl" style={{marginBottom:10}}>Danger Zone</div><button className="btn-secondary" style={{color:'var(--red)',borderColor:'#FECACA'}} onClick={()=>{if(window.confirm('Delete all saved notes?')){setNotes([]);setSaved(false)}}}>Clear all saved notes</button></div>
      </div>}

    </div>
    <nav className="bnav">
      {[{id:'home',icon:'🏠',label:'Home'},{id:'record',icon:'🎙️',label:'Record'},{id:'history',icon:'📋',label:'Notes'},{id:'settings',icon:'⚙️',label:'Settings'}].map(n=>(
        <button key={n.id} className={`nav-btn ${nav===n.id?'active':''}`} onClick={()=>goNav(n.id)}><div className="nav-iw">{n.icon}</div><span className="nav-lbl">{n.label}</span></button>
      ))}
    </nav>
  </div></>)
}
