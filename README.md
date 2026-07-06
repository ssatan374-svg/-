# فاهم ⚽ — دليل النشر الكامل

## الخطوات من الصفر للنشر

---

### الخطوة ١ — احصل على مفتاح API المجاني
1. روح على **football-data.org**
2. اضغط **Get API Key**
3. سجل بإيميلك
4. يوصلك المفتاح على الإيميل (مثل: `abc123def456`)
5. **احفظ المفتاح** — ستحتاجه لاحقاً

---

### الخطوة ٢ — ارفع الملفات على GitHub
1. روح على **github.com** وسجل حساب جديد
2. اضغط **New Repository** (الزر الأخضر)
3. سمّه: `fahim-app`
4. اضغط **Create Repository**
5. اضغط **uploading an existing file**
6. ارفع جميع ملفات المجلد هذا
7. اضغط **Commit changes**

---

### الخطوة ٣ — انشر على Vercel
1. روح على **vercel.com**
2. اضغط **Sign Up with GitHub**
3. اضغط **New Project**
4. اختر مشروع `fahim-app`
5. اضغط **Deploy** ✅

---

### الخطوة ٤ — أضف مفتاح API (مهم جداً)
بعد النشر مباشرة:
1. في Vercel افتح مشروعك
2. اضغط **Settings** ← **Environment Variables**
3. أضف متغير جديد:
   - **Name:** `FOOTBALL_API_KEY`
   - **Value:** المفتاح اللي وصلك على الإيميل
4. اضغط **Save**
5. اضغط **Redeploy** لتطبيق التغييرات

---

### الخطوة ٥ — اختبر الـ API
بعد النشر، افتح هذه الروابط في المتصفح:

```
# مباريات اليوم
https://fahim-app.vercel.app/api/matches?type=today

# مباريات مباشرة
https://fahim-app.vercel.app/api/matches?type=live

# ترتيب البريميرليغ
https://fahim-app.vercel.app/api/matches?type=standings&league=PL

# هدافو لاليغا
https://fahim-app.vercel.app/api/matches?type=scorers&league=LL
```

إذا ظهرت بيانات = كل شي شغال ✅

---

## الدوريات المدعومة (المجانية)

| الرمز | الدوري |
|-------|--------|
| PL    | البريميرليغ |
| LL    | لاليغا |
| CL    | دوري الأبطال |
| BL    | البوندسليغا |
| SA    | سيريا A |
| L1    | ليغ 1 |

---

## ربط التطبيق بالـ API

في ملف `src/App.jsx` غيّر:
```js
// قديم (بيانات وهمية)
const MATCHES = [ ... ]

// جديد (بيانات حقيقية)
const fetchMatches = async () => {
  const res = await fetch('/api/matches?type=today');
  const data = await res.json();
  setMatches(data.matches);
};
```

---

## المساعدة
إذا واجهت أي مشكلة، تواصل مع فاهم ⚽
