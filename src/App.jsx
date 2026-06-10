import { useState, useRef, useEffect } from "react";

const GROQ_API_KEY = "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";
const ADMIN_PASSWORD = "Sb@332211";
const STORAGE_KEY_QA = "it_assistant_custom_qa";
const STORAGE_KEY_BUTTONS = "it_assistant_buttons";

const DEFAULT_BUTTONS = [
  { label: "تغییر پسورد دامین", q: "چطور پسورد دامین danonemulti.net رو عوض کنم؟" },
  { label: "پسورد فراموش شده", q: "پسورد دامینم رو فراموش کردم چیکار کنم؟" },
  { label: "مشکل اینترنت", q: "اینترنتم وصل نیست، چیکار کنم؟" },
  { label: "فریز Excel", q: "چطور ردیف اول Excel رو فریز کنم؟" },
  { label: "Out of Office", q: "چطور پیام Out of Office در Outlook تنظیم کنم؟" },
  { label: "اکتیو ویندوز KMS", q: "چطور ویندوز رو با KMS شرکت اکتیو کنم؟" },
  { label: "اکتیو Office KMS", q: "چطور Office رو با KMS شرکت اکتیو کنم؟" },
  { label: "درخواست IT", q: "می‌خوام یه نرم‌افزار جدید نصب بشه، چیکار کنم؟" },
];

const BASE_KNOWLEDGE = `تو یک دستیار هوش مصنوعی متخصص IT هستی که برای پشتیبانی کارکنان شرکت Nutricia-mmp طراحی شده‌ای.

قانون مهم: فقط و فقط به زبان فارسی جواب بده. هیچ کاراکتر چینی، ژاپنی، کره‌ای یا هر زبان دیگری استفاده نکن. اگر کلمه انگلیسی تخصصی لازم است فقط با حروف انگلیسی بنویس.

دامین شرکت danonemulti.net است. تمام کاربران عضو این دامین هستند.
جواب‌هایت باید واضح، گام به گام و عملی باشند.

=== تغییر پسورد در دامین danonemulti.net ===
- روش اول (داخل ویندوز): Ctrl+Alt+Delete > Change a password
- روش دوم: Settings > Accounts > Sign-in options > Password > Change
- پسورد دامین باید حداقل 8 کاراکتر، شامل حروف بزرگ، کوچک و عدد باشد
- پسورد هر 90 روز یک بار منقضی می‌شود
- اگر پسورد فراموش شده: با IT Support تماس بگیرید تا ادمین دامین ریست کند
- بعد از ریست، اولین لاگین باید پسورد تغییر کند

=== لاگین به دامین danonemulti.net ===
- فرمت یوزرنیم: firstname.lastname@danonemulti.net
- اگر اکانت قفل شده: با IT Support تماس بگیرید
- حداکثر 5 بار تلاش اشتباه = قفل شدن اکانت
- VPN: برای دسترسی از خارج از شبکه شرکت به VPN نیاز است

=== دسترسی به منابع شبکه دامین ===
- اشتراک‌گذاری فایل: از طریق درایوهای شبکه که به دامین متصل است
- پرینترهای شبکه: از طریق پرینت سرور دامین
- ایمیل: از طریق Outlook با اکانت دامین
- برای دسترسی به منابع جدید: درخواست IT ثبت کنید

=== اکتیو کردن ویندوز با KMS داخلی شرکت ===
سرور KMS شرکت: kms.danonemulti.net
دستورات را در CMD به عنوان Administrator اجرا کنید:
slmgr /skms kms.danonemulti.net
slmgr /ato
برای بررسی وضعیت لایسنس: slmgr /dli

=== اکتیو کردن Office با KMS داخلی شرکت ===
سرور KMS شرکت: kms.danonemulti.net
دستورات را در CMD به عنوان Administrator اجرا کنید:

Office 2010:
cd "C:\\Program Files\\Microsoft Office\\Office14"
cscript ospp.vbs /sethst:kms.danonemulti.net
cscript ospp.vbs /act

Office 2013:
cd "C:\\Program Files\\Microsoft Office\\Office15"
cscript ospp.vbs /sethst:kms.danonemulti.net
cscript ospp.vbs /act

Office 2016 و 2019:
cd "C:\\Program Files\\Microsoft Office\\Office16"
cscript ospp.vbs /sethst:kms.danonemulti.net
cscript ospp.vbs /act

نکته مهم: CMD را حتماً با Run as Administrator اجرا کنید

=== ویندوز 10 و 11 ===
- Task Manager: Ctrl+Shift+Esc
- آپدیت ویندوز: Settings > Windows Update
- مشکل اینترنت: ipconfig /release و ipconfig /renew در CMD
- اضافه کردن پرینتر: Settings > Bluetooth & devices > Printers & scanners
- Remote Desktop: Settings > System > Remote Desktop > Enable

=== Microsoft Office - Excel ===
- فریز کردن ردیف/ستون: View > Freeze Panes
- VLOOKUP: =VLOOKUP(مقدار, محدوده, شماره_ستون, FALSE)
- Pivot Table: Insert > PivotTable
- فیلتر کردن: Data > Filter
- حذف داده تکراری: Data > Remove Duplicates
- Conditional Formatting: Home > Conditional Formatting

=== Microsoft Office - Word ===
- فهرست خودکار: References > Table of Contents
- Track Changes: Review > Track Changes
- شماره صفحه: Insert > Page Number
- پیدا کردن و جایگزینی: Ctrl+H
- محافظت سند: Review > Protect Document

=== Microsoft Outlook ===
- تنظیم Out of Office: File > Automatic Replies
- ایجاد Rule: Home > Rules > Manage Rules & Alerts
- Signature: File > Options > Mail > Signatures
- بازیابی ایمیل حذف شده: Deleted Items > Recover Deleted Items

=== Microsoft Teams ===
- تغییر Background: ... > Apply Background Effects
- ضبط جلسه: ... > Start Recording
- اشتراک صفحه: Share
- ایجاد Channel: راست‌کلیک روی Team > Add channel

=== مشکلات رایج شبکه ===
- IP نگرفتن: ipconfig /release > ipconfig /flushdns > ipconfig /renew
- DNS مشکل: تغییر DNS به 8.8.8.8
- Ping: ping 8.8.8.8 در CMD

=== درخواست‌های IT ===
برای درخواست‌های IT (نصب نرم‌افزار، تعمیر، دسترسی جدید):
1. با IT Support تماس بگیرید
2. اطلاعات لازم: نام، شماره پرسنلی، توضیح مشکل
3. زمان پاسخگویی: عادی 24-48 ساعت، اورژانسی همان روز

همیشه مودب، صبور و حرفه‌ای باش.`;

function loadData(key, fallback) {
  try {
    const d = localStorage.getItem(key);
    return d ? JSON.parse(d) : fallback;
  } catch { return fallback; }
}

function saveData(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function AdminPanel({ onClose }) {
  const [tab, setTab] = useState("buttons");
  const [buttons, setButtons] = useState(loadData(STORAGE_KEY_BUTTONS, DEFAULT_BUTTONS));
  const [qaList, setQaList] = useState(loadData(STORAGE_KEY_QA, []));

  // Buttons state
  const [btnLabel, setBtnLabel] = useState("");
  const [btnQ, setBtnQ] = useState("");
  const [btnEditIdx, setBtnEditIdx] = useState(null);

  // QA state
  const [qaQ, setQaQ] = useState("");
  const [qaA, setQaA] = useState("");
  const [qaEditIdx, setQaEditIdx] = useState(null);
  const [msg, setMsg] = useState("");

  const showMsg = (m) => { setMsg(m); setTimeout(() => setMsg(""), 2000); };

  const saveBtn = () => {
    if (!btnLabel.trim() || !btnQ.trim()) { showMsg("⚠️ لیبل و سوال را پر کنید"); return; }
    const updated = btnEditIdx !== null
      ? buttons.map((b, i) => i === btnEditIdx ? { label: btnLabel, q: btnQ } : b)
      : [...buttons, { label: btnLabel, q: btnQ }];
    setButtons(updated); saveData(STORAGE_KEY_BUTTONS, updated);
    setBtnLabel(""); setBtnQ(""); setBtnEditIdx(null); showMsg("✅ ذخیره شد");
  };

  const editBtn = (i) => { setBtnLabel(buttons[i].label); setBtnQ(buttons[i].q); setBtnEditIdx(i); };
  const deleteBtn = (i) => { const u = buttons.filter((_, idx) => idx !== i); setButtons(u); saveData(STORAGE_KEY_BUTTONS, u); };
  const resetButtons = () => { setButtons(DEFAULT_BUTTONS); saveData(STORAGE_KEY_BUTTONS, DEFAULT_BUTTONS); showMsg("✅ به حالت پیش‌فرض برگشت"); };

  const saveQA = () => {
    if (!qaQ.trim() || !qaA.trim()) { showMsg("⚠️ سوال و جواب را پر کنید"); return; }
    const updated = qaEditIdx !== null
      ? qaList.map((item, i) => i === qaEditIdx ? { question: qaQ, answer: qaA } : item)
      : [...qaList, { question: qaQ, answer: qaA }];
    setQaList(updated); saveData(STORAGE_KEY_QA, updated);
    setQaQ(""); setQaA(""); setQaEditIdx(null); showMsg("✅ ذخیره شد");
  };

  const editQA = (i) => { setQaQ(qaList[i].question); setQaA(qaList[i].answer); setQaEditIdx(i); };
  const deleteQA = (i) => { const u = qaList.filter((_, idx) => idx !== i); setQaList(u); saveData(STORAGE_KEY_QA, u); };

  const tabStyle = (t) => ({
    padding: "10px 20px", border: "none", cursor: "pointer",
    fontFamily: "inherit", fontSize: 14, fontWeight: 600,
    borderBottom: tab === t ? "3px solid #0078d4" : "3px solid transparent",
    background: "none", color: tab === t ? "#0078d4" : "#666",
    transition: "all 0.2s"
  });

  const inputStyle = {
    width: "100%", padding: "10px 12px", borderRadius: 8,
    border: "1.5px solid #ddd", marginBottom: 10,
    fontFamily: "inherit", fontSize: 14, direction: "rtl", boxSizing: "border-box"
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "white", borderRadius: 12, width: "92%", maxWidth: 720,
        maxHeight: "92vh", overflowY: "auto", direction: "rtl",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px", borderBottom: "1px solid #eee",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          position: "sticky", top: 0, background: "white", zIndex: 10
        }}>
          <h2 style={{ margin: 0, color: "#0078d4", fontSize: 18 }}>⚙️ پنل مدیریت</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#666"
          }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: "1px solid #eee", display: "flex", padding: "0 16px" }}>
          <button style={tabStyle("buttons")} onClick={() => setTab("buttons")}>
            🔘 دکمه‌های سریع
          </button>
          <button style={tabStyle("qa")} onClick={() => setTab("qa")}>
            💬 سوال و جواب اختصاصی
          </button>
        </div>

        <div style={{ padding: 20 }}>
          {msg && (
            <div style={{
              padding: "10px 16px", borderRadius: 8, marginBottom: 16,
              background: msg.includes("✅") ? "#d4edda" : "#fff3cd",
              color: msg.includes("✅") ? "#155724" : "#856404", fontSize: 14
            }}>{msg}</div>
          )}

          {/* Buttons Tab */}
          {tab === "buttons" && (
            <>
              <div style={{ background: "#f8f9fa", borderRadius: 8, padding: 16, marginBottom: 20 }}>
                <h3 style={{ margin: "0 0 12px", color: "#333", fontSize: 15 }}>
                  {btnEditIdx !== null ? "✏️ ویرایش دکمه" : "➕ افزودن دکمه جدید"}
                </h3>
                <input value={btnLabel} onChange={e => setBtnLabel(e.target.value)}
                  placeholder="متن دکمه (مثال: تغییر پسورد دامین)" style={inputStyle} />
                <input value={btnQ} onChange={e => setBtnQ(e.target.value)}
                  placeholder="سوالی که ارسال میشه (مثال: چطور پسورد رو عوض کنم؟)" style={inputStyle} />
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={saveBtn} style={{
                    padding: "9px 20px", background: "#0078d4", color: "white",
                    border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14
                  }}>{btnEditIdx !== null ? "ویرایش" : "افزودن"}</button>
                  {btnEditIdx !== null && (
                    <button onClick={() => { setBtnEditIdx(null); setBtnLabel(""); setBtnQ(""); }} style={{
                      padding: "9px 20px", background: "#6c757d", color: "white",
                      border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14
                    }}>انصراف</button>
                  )}
                  <button onClick={resetButtons} style={{
                    padding: "9px 20px", background: "#fff", color: "#dc3545",
                    border: "1px solid #dc3545", borderRadius: 8, cursor: "pointer",
                    fontFamily: "inherit", fontSize: 14, marginRight: "auto"
                  }}>بازگشت به پیش‌فرض</button>
                </div>
              </div>

              <h3 style={{ margin: "0 0 12px", color: "#333", fontSize: 15 }}>
                دکمه‌های فعلی ({buttons.length})
              </h3>
              {buttons.map((btn, i) => (
                <div key={i} style={{
                  border: "1px solid #e0e0e0", borderRadius: 8, padding: "12px 14px",
                  marginBottom: 8, background: "white", display: "flex",
                  justifyContent: "space-between", alignItems: "center", gap: 10
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: "#0078d4", marginBottom: 4 }}>
                      🔘 {btn.label}
                    </div>
                    <div style={{ color: "#666", fontSize: 12 }}>↪ {btn.q}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button onClick={() => editBtn(i)} style={{
                      padding: "6px 14px", background: "#ffc107", color: "#333",
                      border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 12
                    }}>ویرایش</button>
                    <button onClick={() => deleteBtn(i)} style={{
                      padding: "6px 14px", background: "#dc3545", color: "white",
                      border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 12
                    }}>حذف</button>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* QA Tab */}
          {tab === "qa" && (
            <>
              <div style={{ background: "#f8f9fa", borderRadius: 8, padding: 16, marginBottom: 20 }}>
                <h3 style={{ margin: "0 0 12px", color: "#333", fontSize: 15 }}>
                  {qaEditIdx !== null ? "✏️ ویرایش سوال و جواب" : "➕ افزودن سوال و جواب جدید"}
                </h3>
                <input value={qaQ} onChange={e => setQaQ(e.target.value)}
                  placeholder="سوال را بنویسید..." style={inputStyle} />
                <textarea value={qaA} onChange={e => setQaA(e.target.value)}
                  placeholder="جواب را بنویسید..." rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={saveQA} style={{
                    padding: "9px 20px", background: "#0078d4", color: "white",
                    border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14
                  }}>{qaEditIdx !== null ? "ویرایش" : "افزودن"}</button>
                  {qaEditIdx !== null && (
                    <button onClick={() => { setQaEditIdx(null); setQaQ(""); setQaA(""); }} style={{
                      padding: "9px 20px", background: "#6c757d", color: "white",
                      border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14
                    }}>انصراف</button>
                  )}
                </div>
              </div>

              <h3 style={{ margin: "0 0 12px", color: "#333", fontSize: 15 }}>
                سوال‌های ذخیره شده ({qaList.length})
              </h3>
              {qaList.length === 0 ? (
                <p style={{ color: "#999", textAlign: "center", padding: 30 }}>هنوز سوالی اضافه نشده</p>
              ) : (
                qaList.map((item, i) => (
                  <div key={i} style={{
                    border: "1px solid #e0e0e0", borderRadius: 8, padding: "12px 14px",
                    marginBottom: 8, background: "white"
                  }}>
                    <div style={{ fontWeight: 600, color: "#0078d4", marginBottom: 6 }}>❓ {item.question}</div>
                    <div style={{ color: "#444", fontSize: 13, marginBottom: 10, lineHeight: 1.6 }}>💬 {item.answer}</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => editQA(i)} style={{
                        padding: "6px 14px", background: "#ffc107", color: "#333",
                        border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 12
                      }}>ویرایش</button>
                      <button onClick={() => deleteQA(i)} style={{
                        padding: "6px 14px", background: "#dc3545", color: "white",
                        border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 12
                      }}>حذف</button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ITAssistant() {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "سلام! من دستیار IT شرکت Nutricia-mmp هستم 👋\nهر سوالی درباره ویندوز، دامین، آفیس، شبکه یا درخواست‌های IT دارید بپرسید.",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  const [buttons, setButtons] = useState(loadData(STORAGE_KEY_BUTTONS, DEFAULT_BUTTONS));
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAdminClose = () => {
    setShowAdminPanel(false);
    setButtons(loadData(STORAGE_KEY_BUTTONS, DEFAULT_BUTTONS));
  };

  const buildSystemPrompt = () => {
    const customQA = loadData(STORAGE_KEY_QA, []);
    if (customQA.length === 0) return BASE_KNOWLEDGE;
    const customSection = customQA.map(item => `سوال: ${item.question}\nجواب: ${item.answer}`).join("\n\n");
    return `${BASE_KNOWLEDGE}\n\n=== سوال و جواب‌های اختصاصی شرکت ===\n${customSection}`;
  };

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1000,
          messages: [
            { role: "system", content: buildSystemPrompt() },
            ...newMessages.map(m => ({ role: m.role, content: m.content })),
          ],
        }),
      });
      const data = await response.json();
      let reply = data.choices?.[0]?.message?.content || "خطا در دریافت پاسخ";
      reply = reply.replace(/[\u3000-\u9fff\uac00-\ud7af\u3040-\u30ff]/g, "");
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "⚠️ خطا در اتصال. لطفاً دوباره تلاش کنید." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    if (adminPass === ADMIN_PASSWORD) {
      setShowAdminLogin(false); setShowAdminPanel(true);
      setAdminPass(""); setAdminError("");
    } else { setAdminError("پسورد اشتباه است"); }
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100vh",
      background: "#f0f2f5", fontFamily: "'Segoe UI', Tahoma, sans-serif", direction: "rtl"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #0078d4, #005a9e)", color: "white",
        padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
        }}>🖥️</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 17 }}>دستیار IT شرکت Nutricia-mmp</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>پشتیبانی هوشمند فناوری اطلاعات • آنلاین</div>
        </div>
        <button onClick={() => setShowAdminLogin(true)} style={{
          marginRight: "auto", background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.3)", color: "white",
          padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontFamily: "inherit"
        }}>🔐 Login</button>
      </div>

      <div style={{
        padding: "10px 16px", background: "#fff", borderBottom: "1px solid #e0e0e0",
        display: "flex", gap: 8, flexWrap: "wrap"
      }}>
        {buttons.map((q, i) => (
          <button key={i} onClick={() => sendMessage(q.q)} style={{
            padding: "6px 12px", borderRadius: 20, border: "1px solid #0078d4",
            background: "white", color: "#0078d4", cursor: "pointer", fontSize: 12,
            fontFamily: "inherit", transition: "all 0.2s", whiteSpace: "nowrap"
          }}
            onMouseEnter={e => { e.target.style.background = "#0078d4"; e.target.style.color = "white"; }}
            onMouseLeave={e => { e.target.style.background = "white"; e.target.style.color = "#0078d4"; }}
          >{q.label}</button>
        ))}
      </div>

      <div style={{
        flex: 1, overflowY: "auto", padding: "20px 16px",
        display: "flex", flexDirection: "column", gap: 12
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-start" : "flex-end",
            alignItems: "flex-end", gap: 8
          }}>
            {msg.role === "assistant" && (
              <div style={{
                width: 32, height: 32, borderRadius: "50%", background: "#0078d4",
                color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, flexShrink: 0
              }}>🖥️</div>
            )}
            <div style={{
              maxWidth: "72%", padding: "10px 14px",
              borderRadius: msg.role === "user" ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
              background: msg.role === "user" ? "#0078d4" : "#ffffff",
              color: msg.role === "user" ? "white" : "#1a1a1a",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap", direction: "rtl", textAlign: "right"
            }}>{msg.content}</div>
            {msg.role === "user" && (
              <div style={{
                width: 32, height: 32, borderRadius: "50%", background: "#6c757d",
                color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, flexShrink: 0
              }}>👤</div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: "#0078d4",
              color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16
            }}>🖥️</div>
            <div style={{
              padding: "12px 16px", borderRadius: "18px 18px 4px 18px",
              background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              display: "flex", gap: 4, alignItems: "center"
            }}>
              {[0, 1, 2].map(j => (
                <div key={j} style={{
                  width: 8, height: 8, borderRadius: "50%", background: "#0078d4", opacity: 0.6,
                  animation: `bounce 1.2s ease-in-out ${j * 0.2}s infinite`
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{
        padding: "12px 16px", background: "#fff", borderTop: "1px solid #e0e0e0",
        display: "flex", gap: 10, alignItems: "flex-end"
      }}>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          placeholder="سوال IT خود را بنویسید..." rows={1}
          style={{
            flex: 1, padding: "10px 14px", borderRadius: 22, border: "1.5px solid #d0d0d0",
            outline: "none", resize: "none", fontFamily: "inherit", fontSize: 14,
            direction: "rtl", textAlign: "right", lineHeight: 1.5, maxHeight: 120,
            overflowY: "auto", transition: "border-color 0.2s"
          }}
          onFocus={e => e.target.style.borderColor = "#0078d4"}
          onBlur={e => e.target.style.borderColor = "#d0d0d0"}
        />
        <button onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{
          width: 44, height: 44, borderRadius: "50%",
          background: input.trim() && !loading ? "#0078d4" : "#ccc",
          border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, transition: "background 0.2s", flexShrink: 0
        }}>➤</button>
      </div>

      {showAdminLogin && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "white", borderRadius: 12, padding: 28, width: 320,
            direction: "rtl", boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}>
            <h3 style={{ margin: "0 0 16px", color: "#0078d4" }}>🔐 ورود به پنل مدیریت</h3>
            <input type="password" value={adminPass}
              onChange={e => setAdminPass(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
              placeholder="پسورد را وارد کنید..."
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 8,
                border: "1.5px solid #ddd", marginBottom: 8,
                fontFamily: "inherit", fontSize: 14, boxSizing: "border-box"
              }}
            />
            {adminError && <p style={{ color: "red", margin: "0 0 8px", fontSize: 13 }}>{adminError}</p>}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleAdminLogin} style={{
                flex: 1, padding: 10, background: "#0078d4", color: "white",
                border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14
              }}>ورود</button>
              <button onClick={() => { setShowAdminLogin(false); setAdminPass(""); setAdminError(""); }} style={{
                flex: 1, padding: 10, background: "#6c757d", color: "white",
                border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14
              }}>انصراف</button>
            </div>
          </div>
        </div>
      )}

      {showAdminPanel && <AdminPanel onClose={handleAdminClose} />}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
      `}</style>
    </div>
  );
}
