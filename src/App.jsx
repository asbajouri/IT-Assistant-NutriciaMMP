import { useState, useRef, useEffect } from "react";

const GROQ_API_KEY = "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";

const IT_KNOWLEDGE_BASE = `تو یک دستیار هوش مصنوعی متخصص IT هستی که برای پشتیبانی کارکنان یک شرکت طراحی شده‌ای.
به سوالات فارسی و انگلیسی جواب بده. جواب‌هایت باید واضح، گام به گام و عملی باشند.

دانش تخصصی تو شامل موارد زیر است:

=== ویندوز 10 و 11 ===
- تغییر پسورد: Settings > Accounts > Sign-in options > Password > Change
- ریست پسورد فراموش شده: از صفحه لاگین روی "I forgot my PIN" یا از حساب ادمین
- اتصال به VPN: Settings > Network > VPN > Add VPN connection
- Remote Desktop: Settings > System > Remote Desktop > Enable
- آپدیت ویندوز: Settings > Windows Update > Check for updates
- مشکل اینترنت: ipconfig /release و ipconfig /renew در CMD
- Task Manager: Ctrl+Shift+Esc برای مدیریت پروسه‌ها
- اضافه کردن پرینتر: Settings > Bluetooth & devices > Printers & scanners
- تنظیم صدا: راست‌کلیک روی آیکون صدا در taskbar
- مشکل بلوتوث: Settings > Bluetooth > Toggle off/on

=== Microsoft Office - Excel ===
- فریز کردن ردیف/ستون: View > Freeze Panes
- VLOOKUP: =VLOOKUP(مقدار, محدوده, شماره_ستون, FALSE)
- Pivot Table: Insert > PivotTable
- فیلتر کردن: Data > Filter
- حذف داده تکراری: Data > Remove Duplicates
- حفاظت از شیت: Review > Protect Sheet
- فرمول IF: =IF(شرط, مقدار_اگر_درست, مقدار_اگر_غلط)
- تبدیل متن به عدد: =VALUE() یا ضرب در 1
- Print Area: Page Layout > Print Area > Set Print Area
- Conditional Formatting: Home > Conditional Formatting

=== Microsoft Office - Word ===
- تغییر اندازه صفحه: Layout > Size
- فهرست خودکار: References > Table of Contents
- Track Changes: Review > Track Changes
- مقایسه دو سند: Review > Compare
- هدر و فوتر: Insert > Header/Footer
- شماره صفحه: Insert > Page Number
- پیدا کردن و جایگزینی: Ctrl+H
- چک کردن درستی: Review > Spelling & Grammar (F7)
- محافظت سند: Review > Protect Document
- Mail Merge: Mailings > Start Mail Merge

=== Microsoft Outlook ===
- تنظیم Out of Office: File > Automatic Replies
- ایجاد Rule: Home > Rules > Manage Rules & Alerts
- Signature: File > Options > Mail > Signatures
- بازیابی ایمیل حذف شده: Deleted Items > Recover Deleted Items
- Share کردن Calendar: Calendar > Share Calendar
- اضافه کردن اکانت: File > Add Account
- جستجوی پیشرفته: Search > Advanced Find

=== Microsoft Teams ===
- تغییر Background: ... > Apply Background Effects
- ضبط جلسه: ... > Start Recording
- اشتراک صفحه: Share (آیکون در پایین)
- ایجاد Channel: راست‌کلیک روی Team > Add channel
- دانلود مجدد Teams: پاک کردن cache در %appdata%/Microsoft/Teams

=== مشکلات رایج شبکه ===
- IP ثابت نگرفتن: ipconfig /release > ipconfig /flushdns > ipconfig /renew
- DNS مشکل: تغییر DNS به 8.8.8.8 یا 1.1.1.1
- Ping گرفتن: ping 8.8.8.8 در CMD
- بررسی پورت: netstat -an در CMD

=== Job Request / درخواست‌های IT ===
وقتی کاربر درخواست IT دارد (مثل نصب نرم‌افزار، تعمیر سخت‌افزار، دسترسی جدید) راهنمایی کن که:
1. درخواست را از طریق سیستم تیکتینگ IT ثبت کند
2. اطلاعات لازم: نام، شماره پرسنلی، توضیح مشکل، اولویت
3. زمان پاسخگویی معمول: مشکلات عادی 24-48 ساعت، اورژانسی همان روز

همیشه مودب، صبور و حرفه‌ای باش. اگر سوالی خارج از حوزه IT بود، مودبانه توضیح بده که فقط در زمینه IT می‌توانی کمک کنی.`;

const QUICK_QUESTIONS = [
  { label: "تغییر پسورد ویندوز", q: "چطور پسورد ویندوز 11 رو عوض کنم؟" },
  { label: "مشکل اینترنت", q: "اینترنتم وصل نیست، چیکار کنم؟" },
  { label: "فریز Excel", q: "چطور ردیف اول Excel رو فریز کنم؟" },
  { label: "Out of Office", q: "چطور پیام Out of Office در Outlook تنظیم کنم؟" },
  { label: "اضافه کردن پرینتر", q: "چطور پرینتر جدید اضافه کنم؟" },
  { label: "درخواست IT", q: "می‌خوام یه نرم‌افزار جدید نصب بشه، چیکار کنم؟" },
];

export default function ITAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "سلام! من دستیار IT شرکت هستم 👋\nهر سوالی درباره ویندوز، آفیس، شبکه یا درخواست‌های IT دارید بپرسید.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1000,
          messages: [
            { role: "system", content: IT_KNOWLEDGE_BASE },
            ...apiMessages,
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "خطا در دریافت پاسخ";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "⚠️ خطا در اتصال. لطفاً دوباره تلاش کنید." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100vh",
      background: "#f0f2f5", fontFamily: "'Segoe UI', Tahoma, sans-serif",
      direction: "rtl"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #0078d4, #005a9e)",
        color: "white", padding: "16px 20px",
        display: "flex", alignItems: "center", gap: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22
        }}>🖥️</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 17 }}>دستیار IT شرکت Nutricia-mmp</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>پشتیبانی فناوری اطلاعات • آنلاین</div>
        </div>
        <div style={{ marginRight: "auto", fontSize: 12, opacity: 0.7 }}>IT Support Bot v1.0</div>
      </div>

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
            fontFamily: "inherit", transition: "all 0.2s",
            whiteSpace: "nowrap"
          }}
            onMouseEnter={e => { e.target.style.background = "#0078d4"; e.target.style.color = "white"; }}
            onMouseLeave={e => { e.target.style.background = "white"; e.target.style.color = "#0078d4"; }}
          >
            {q.label}
          </button>
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
                width: 32, height: 32, borderRadius: "50%",
                background: "#0078d4", color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, flexShrink: 0
              }}>🖥️</div>
            )}
            <div style={{
              maxWidth: "72%",
              padding: "10px 14px",
              borderRadius: msg.role === "user"
                ? "18px 18px 18px 4px"
                : "18px 18px 4px 18px",
              background: msg.role === "user" ? "#0078d4" : "#ffffff",
              color: msg.role === "user" ? "white" : "#1a1a1a",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              fontSize: 14, lineHeight: 1.7,
              whiteSpace: "pre-wrap", direction: "rtl",
              textAlign: "right"
            }}>
              {msg.content}
            </div>
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
              width: 32, height: 32, borderRadius: "50%",
              background: "#0078d4", color: "white",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16
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

      <div style={{
        padding: "12px 16px", background: "#fff",
        borderTop: "1px solid #e0e0e0",
        display: "flex", gap: 10, alignItems: "flex-end"
      }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="سوال IT خود را بنویسید..."
          rows={1}
          style={{
            flex: 1, padding: "10px 14px",
            borderRadius: 22, border: "1.5px solid #d0d0d0",
            outline: "none", resize: "none",
            fontFamily: "inherit", fontSize: 14,
            direction: "rtl", textAlign: "right",
            lineHeight: 1.5, maxHeight: 120, overflowY: "auto",
            transition: "border-color 0.2s"
          }}
          onFocus={e => e.target.style.borderColor = "#0078d4"}
          onBlur={e => e.target.style.borderColor = "#d0d0d0"}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          style={{
            width: 44, height: 44, borderRadius: "50%",
            background: input.trim() && !loading ? "#0078d4" : "#ccc",
            border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, transition: "background 0.2s", flexShrink: 0
          }}
        >
          ➤
        </button>
      </div>

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
