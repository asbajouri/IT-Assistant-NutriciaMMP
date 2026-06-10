import { useState, useRef, useEffect } from "react";

const GROQ_API_KEY = "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";
const ADMIN_PASSWORD = "Sb@332211";
const STORAGE_KEY = "it_assistant_custom_qa";

const BASE_KNOWLEDGE = `تو یک دستیار هوش مصنوعی متخصص IT هستی که برای پشتیبانی کارکنان شرکت Nutricia-mmp طراحی شده‌ای.
مهم: فقط به فارسی یا انگلیسی جواب بده. هیچ زبان دیگری استفاده نکن.
دامین شرکت danonemulti.net است. تمام کاربران عضو این دامین هستند.
به سوالات فارسی و انگلیسی جواب بده. جواب‌هایت باید واضح، گام به گام و عملی باشند.

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
نکته: اگر Office در درایو دیگری نصب شده مسیر را تغییر دهید

=== درخواست‌های IT ===
برای درخواست‌های IT (نصب نرم‌افزار، تعمیر، دسترسی جدید):
1. با IT Support تماس بگیرید
2. اطلاعات لازم: نام، شماره پرسنلی، توضیح مشکل
3. زمان پاسخگویی: عادی 24-48 ساعت، اورژانسی همان روز

همیشه مودب، صبور و حرفه‌ای باش.`;

const QUICK_QUESTIONS = [
  { label: "تغییر پسورد دامین", q: "چطور پسورد دامین danonemulti.net رو عوض کنم؟" },
  { label: "پسورد فراموش شده", q: "پسورد دامینم رو فراموش کردم چیکار کنم؟" },
  { label: "مشکل اینترنت", q: "اینترنتم وصل نیست، چیکار کنم؟" },
  { label: "فریز Excel", q: "چطور ردیف اول Excel رو فریز کنم؟" },
  { label: "Out of Office", q: "چطور پیام Out of Office در Outlook تنظیم کنم؟" },
  { label: "اکتیو ویندوز KMS", q: "چطور ویندوز رو با KMS شرکت اکتیو کنم؟" },
  { label: "اکتیو Office KMS", q: "چطور Office رو با KMS شرکت اکتیو کنم؟" },
];

function loadCustomQA() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveCustomQA(qa) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(qa)); } catch {}
}

function AdminPanel({ onClose }) {
  const [qaList, setQaList] = useState(loadCustomQA());
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSave = () => {
    if (!question.trim() || !answer.trim()) { setMsg("سوال و جواب را پر کنید"); return; }
    let updated;
    if (editIndex !== null) {
      updated = qaList.map((item, i) => i === editIndex ? { question, answer } : item);
      setEditIndex(null);
    } else {
      updated = [...qaList, { question, answer }];
    }
    setQaList(updated);
    saveCustomQA(updated);
    setQuestion(""); setAnswer("");
    setMsg("✅ ذخیره شد");
    setTimeout(() => setMsg(""), 2000);
  };

  const handleEdit = (i) => {
    setQuestion(qaList[i].question);
    setAnswer(qaList[i].answer);
    setEditIndex(i);
  };

  const handleDelete = (i) => {
    const updated = qaList.filter((_, idx) => idx !== i);
    setQaList(updated);
    saveCustomQA(updated);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "white", borderRadius: 12, width: "90%", maxWidth: 700,
        maxHeight: "90vh", overflowY: "auto", padding: 24, direction: "rtl"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: "#0078d4" }}>پنل ادمین - مدیریت سوال و جواب</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#666"
          }}>✕</button>
        </div>

        <div style={{ background: "#f8f9fa", borderRadius: 8, padding: 16, marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 12px", color: "#333" }}>
            {editIndex !== null ? "ویرایش سوال" : "افزودن سوال جدید"}
          </h3>
          <input
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="سوال را بنویسید..."
            style={{
              width: "100%", padding: "10px 12px", borderRadius: 8,
              border: "1.5px solid #ddd", marginBottom: 10,
              fontFamily: "inherit", fontSize: 14, direction: "rtl", boxSizing: "border-box"
            }}
          />
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder="جواب را بنویسید..."
            rows={4}
            style={{
              width: "100%", padding: "10px 12px", borderRadius: 8,
              border: "1.5px solid #ddd", marginBottom: 10,
              fontFamily: "inherit", fontSize: 14, direction: "rtl",
              resize: "vertical", boxSizing: "border-box"
            }}
          />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={handleSave} style={{
              padding: "10px 24px", background: "#0078d4", color: "white",
              border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14
            }}>
              {editIndex !== null ? "ویرایش" : "افزودن"}
            </button>
            {editIndex !== null && (
              <button onClick={() => { setEditIndex(null); setQuestion(""); setAnswer(""); }} style={{
                padding: "10px 24px", background: "#6c757d", color: "white",
                border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14
              }}>انصراف</button>
            )}
            {msg && <span style={{ color: "#28a745", fontSize: 14 }}>{msg}</span>}
          </div>
        </div>

        <h3 style={{ margin: "0 0 12px", color: "#333" }}>سوال‌های ذخیره شده ({qaList.length})</h3>
        {qaList.length === 0 ? (
          <p style={{ color: "#999", textAlign: "center", padding: 20 }}>هنوز سوالی اضافه نشده</p>
        ) : (
          qaList.map((item, i) => (
            <div key={i} style={{
              border: "1px solid #e0e0e0", borderRadius: 8, padding: 12,
              marginBottom: 10, background: "white"
            }}>
              <div style={{ fontWeight: 600, color: "#0078d4", marginBottom: 6 }}>❓ {item.question}</div>
              <div style={{ color: "#444", fontSize: 13, marginBottom: 10, lineHeight: 1.6 }}>💬 {item.answer}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => handleEdit(i)} style={{
                  padding: "6px 16px", background: "#ffc107", color: "#333",
                  border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 13
                }}>ویرایش</button>
                <button onClick={() => handleDelete(i)} style={{
                  padding: "6px 16px", background: "#dc3545", color: "white",
                  border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 13
                }}>حذف</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function ITAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "سلام! من دستیار IT شرکت Nutricia-mmp هستم 👋\nهر سوالی درباره ویندوز، دامین، آفیس، شبکه یا درخواست‌های IT دارید بپرسید.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const buildSystemPrompt = () => {
    const customQA = loadCustomQA();
    if (customQA.length === 0) return BASE_KNOWLEDGE;
    const customSection = customQA.map(item =>
      `سوال: ${item.question}\nجواب: ${item.answer}`
    ).join("\n\n");
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
      const apiMessages = newMessages.map((m) => ({ role: m.role, content: m.content }));
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          max_tokens: 1000,
          messages: [
            { role: "system", content: buildSystemPrompt() },
            ...apiMessages,
          ],
        }),
      });
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "خطا در دریافت پاسخ";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "⚠️ خطا در اتصال. لطفاً دوباره تلاش کنید." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    if (adminPass === ADMIN_PASSWORD) {
      setShowAdminLogin(false);
      setShowAdminPanel(true);
      setAdminPass("");
      setAdminError("");
    } else {
      setAdminError("پسورد اشتباه است");
    }
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100vh",
      background: "#f0f2f5", fontFamily: "'Segoe UI', Tahoma, sans-serif", direction: "rtl"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0078d4, #005a9e)",
        color: "white", padding: "16px 20px",
        display: "flex", alignItems: "center", gap: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
        }}>🖥️</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 17 }}>دستیار IT شرکت Nutricia-mmp</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>پشتیبانی فناوری اطلاعات • آنلاین</div>
        </div>
        <button onClick={() => setShowAdminLogin(true)} style={{
          marginRight: "auto", background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.3)", color: "white",
          padding: "6px 14px", borderRadius: 20, cursor: "pointer",
          fontSize: 12, fontFamily: "inherit"
        }}>⚙️ ادمین</button>
      </div>

      {/* Quick Questions */}
      <div style={{
        padding: "10px 16px", background: "#fff",
        borderBottom: "1px solid #e0e0e0",
        display: "flex", gap: 8, flexWrap: "wrap"
      }}>
        {QUICK_QUESTIONS.map((q, i) => (
          <button key={i} onClick={() => sendMessage(q.q)} style={{
            padding: "6px 12px", borderRadius: 20,
            border: "1px solid #0078d4", background: "white",
            color: "#0078d4", cursor: "pointer", fontSize: 12,
            fontFamily: "inherit", transition: "all 0.2s", whiteSpace: "nowrap"
          }}
            onMouseEnter={e => { e.target.style.background = "#0078d4"; e.target.style.color = "white"; }}
            onMouseLeave={e => { e.target.style.background = "white"; e.target.style.color = "#0078d4"; }}
          >{q.label}</button>
        ))}
      </div>

      {/* Messages */}
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
                width: 32, height: 32, borderRadius: "50%",
                background: "#0078d4", color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, flexShrink: 0
              }}>🖥️</div>
            )}
            <div style={{
              maxWidth: "72%", padding: "10px 14px",
              borderRadius: msg.role === "user" ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
              background: msg.role === "user" ? "#0078d4" : "#ffffff",
              color: msg.role === "user" ? "white" : "#1a1a1a",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap",
              direction: "rtl", textAlign: "right"
            }}>{msg.content}</div>
            {msg.role === "user" && (
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "#6c757d", color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
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
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#0078d4", opacity: 0.6,
                  animation: `bounce 1.2s ease-in-out ${j * 0.2}s infinite`
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "12px 16px", background: "#fff",
        borderTop: "1px solid #e0e0e0",
        display: "flex", gap: 10, alignItems: "flex-end"
      }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          placeholder="سوال IT خود را بنویسید..."
          rows={1}
          style={{
            flex: 1, padding: "10px 14px", borderRadius: 22,
            border: "1.5px solid #d0d0d0", outline: "none", resize: "none",
            fontFamily: "inherit", fontSize: 14, direction: "rtl", textAlign: "right",
            lineHeight: 1.5, maxHeight: 120, overflowY: "auto", transition: "border-color 0.2s"
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

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "white", borderRadius: 12, padding: 28,
            width: 320, direction: "rtl", boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}>
            <h3 style={{ margin: "0 0 16px", color: "#0078d4" }}>ورود به پنل ادمین</h3>
            <input
              type="password"
              value={adminPass}
              onChange={e => setAdminPass(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
              placeholder="پسورد ادمین..."
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 8,
                border: "1.5px solid #ddd", marginBottom: 8,
                fontFamily: "inherit", fontSize: 14, boxSizing: "border-box"
              }}
            />
            {adminError && <p style={{ color: "red", margin: "0 0 8px", fontSize: 13 }}>{adminError}</p>}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleAdminLogin} style={{
                flex: 1, padding: "10px", background: "#0078d4", color: "white",
                border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14
              }}>ورود</button>
              <button onClick={() => { setShowAdminLogin(false); setAdminPass(""); setAdminError(""); }} style={{
                flex: 1, padding: "10px", background: "#6c757d", color: "white",
                border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14
              }}>انصراف</button>
            </div>
          </div>
        </div>
      )}

      {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} />}

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
