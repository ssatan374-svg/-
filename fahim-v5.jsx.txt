import { useState, useEffect, useCallback } from "react";

const DARK={bg:"#0a0f1e",card:"#0f1928",card2:"#1a2540",border:"#1e2d4a",text:"#ffffff",sub:"#6a8aaa",accent:"#00e5a0",live:"#ff4d4d",gold:"#fccb00",blue:"#4db8ff"};
const LIGHT={bg:"#f0f4f8",card:"#ffffff",card2:"#e8edf4",border:"#d0dae8",text:"#0a0f1e",sub:"#5a7a9a",accent:"#00b87a",live:"#e03030",gold:"#e0a800",blue:"#0088cc"};

const LEAGUES_LIST=[
  {id:"PL",name:"البريميرليغ",nameEn:"Premier League",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿"},
  {id:"LL",name:"لاليغا",nameEn:"La Liga",flag:"🇪🇸"},
  {id:"CL",name:"دوري الأبطال",nameEn:"Champions League",flag:"⭐"},
  {id:"BL",name:"البوندسليغا",nameEn:"Bundesliga",flag:"🇩🇪"},
  {id:"SA",name:"سيريا A",nameEn:"Serie A",flag:"🇮🇹"},
  {id:"L1",name:"ليغ 1",nameEn:"Ligue 1",flag:"🇫🇷"},
];

const TEAMS={
  real:{id:"real",name:"ريال مدريد",nameEn:"Real Madrid",crest:"⚪",color:"#c0a020",league:"LL",founded:1902,stadium:"سانتياغو برنابيو",capacity:"81,044"},
  barca:{id:"barca",name:"برشلونة",nameEn:"Barcelona",crest:"🔵",color:"#004d98",league:"LL",founded:1899,stadium:"أولمبيك لويس كومبانيس",capacity:"54,367"},
  lfc:{id:"lfc",name:"ليفربول",nameEn:"Liverpool",crest:"🔴",color:"#c8102e",league:"PL",founded:1892,stadium:"آنفيلد",capacity:"61,276"},
  mci:{id:"mci",name:"مانشستر سيتي",nameEn:"Man City",crest:"🔵",color:"#6cabdd",league:"PL",founded:1880,stadium:"إيتيهاد",capacity:"53,400"},
  ars:{id:"ars",name:"آرسنال",nameEn:"Arsenal",crest:"🔴",color:"#ef0107",league:"PL",founded:1886,stadium:"الإمارات",capacity:"60,704"},
  bay:{id:"bay",name:"بايرن ميونخ",nameEn:"Bayern Munich",crest:"🔴",color:"#dc052d",league:"BL",founded:1900,stadium:"أليانز أرينا",capacity:"75,000"},
  psg:{id:"psg",name:"باريس سان جيرمان",nameEn:"PSG",crest:"🔵",color:"#004170",league:"L1",founded:1970,stadium:"بارك دي برنس",capacity:"48,583"},
  atm:{id:"atm",name:"أتلتيكو مدريد",nameEn:"Atletico Madrid",crest:"🔴",color:"#cb3524",league:"LL",founded:1903,stadium:"سيفيتاس ميتروبوليتانو",capacity:"68,456"},
};

const PLAYERS={
  mbappe:{id:"mbappe",name:"كيليان مبابي",nameEn:"Kylian Mbappé",team:"real",age:25,height:"178cm",pos:"مهاجم",posEn:"Striker",goals:24,assists:10,yellows:2,reds:0,rating:8.7,matches:30,nationality:"🇫🇷"},
  salah:{id:"salah",name:"محمد صلاح",nameEn:"Mohamed Salah",team:"lfc",age:31,height:"175cm",pos:"جناح أيمن",posEn:"Right Wing",goals:22,assists:13,yellows:1,reds:0,rating:8.9,matches:33,nationality:"🇪🇬"},
  haaland:{id:"haaland",name:"إيرلينغ هالاند",nameEn:"Erling Haaland",team:"mci",age:23,height:"194cm",pos:"مهاجم",posEn:"Striker",goals:26,assists:5,yellows:3,reds:0,rating:8.8,matches:28,nationality:"🇳🇴"},
  bellingham:{id:"bellingham",name:"جود بيلينغهام",nameEn:"Jude Bellingham",team:"real",age:20,height:"186cm",pos:"وسط هجومي",posEn:"Attacking Mid",goals:16,assists:9,yellows:4,reds:0,rating:8.5,matches:31,nationality:"🏴󠁧󠁢󠁥󠁮󠁧󠁿"},
  yamal:{id:"yamal",name:"لامين يامال",nameEn:"Lamine Yamal",team:"barca",age:17,height:"180cm",pos:"جناح أيمن",posEn:"Right Wing",goals:13,assists:15,yellows:1,reds:0,rating:8.9,matches:32,nationality:"🇪🇸"},
  saka:{id:"saka",name:"بوكايو ساكا",nameEn:"Bukayo Saka",team:"ars",age:22,height:"178cm",pos:"جناح أيمن",posEn:"Right Wing",goals:14,assists:11,yellows:2,reds:0,rating:8.6,matches:32,nationality:"🏴󠁧󠁢󠁥󠁮󠁧󠁿"},
  vinicius:{id:"vinicius",name:"فينيسيوس جونيور",nameEn:"Vinícius Jr.",team:"real",age:23,height:"176cm",pos:"جناح أيسر",posEn:"Left Wing",goals:18,assists:12,yellows:5,reds:1,rating:8.7,matches:29,nationality:"🇧🇷"},
  pedri:{id:"pedri",name:"بيدري",nameEn:"Pedri",team:"barca",age:22,height:"174cm",pos:"وسط",posEn:"Midfielder",goals:8,assists:12,yellows:3,reds:0,rating:8.3,matches:28,nationality:"🇪🇸"},
};

const TOP_SCORERS=[
  {playerId:"haaland",goals:26,assists:5,matches:28,league:"PL"},
  {playerId:"mbappe",goals:24,assists:10,matches:30,league:"LL"},
  {playerId:"salah",goals:22,assists:13,matches:33,league:"PL"},
  {playerId:"vinicius",goals:18,assists:12,matches:29,league:"LL"},
  {playerId:"bellingham",goals:16,assists:9,matches:31,league:"LL"},
  {playerId:"saka",goals:14,assists:11,matches:32,league:"PL"},
  {playerId:"yamal",goals:13,assists:15,matches:32,league:"LL"},
  {playerId:"pedri",goals:8,assists:12,matches:28,league:"LL"},
];

const MATCHES_DATA=[
  {id:1,home:"real",away:"barca",homeScore:2,awayScore:2,league:"LL",status:"FINISHED",date:"أمس",hasAnalysis:true,
   stats:{possession:[58,42],shots:[14,9],shotsOn:[6,4],corners:[7,4],fouls:[11,13],yellows:[2,1],xg:[2.1,1.7]},
   scorers:["مبابي 23'","يامال 41'","كارفاخال 67'","ليفانداوسكي 88'"],
   events:[
     {min:23,team:"ريال",type:"goal",player:"مبابي",assist:"بيلينغهام",score:"1-0"},
     {min:41,team:"برشلونة",type:"goal",player:"يامال",assist:"بيدري",score:"1-1"},
     {min:55,team:"برشلونة",type:"yellow",player:"دي يونغ",assist:null},
     {min:67,team:"ريال",type:"goal",player:"كارفاخال",assist:"فالفيردي",score:"2-1"},
     {min:88,team:"برشلونة",type:"goal",player:"ليفانداوسكي",assist:"رافينيا",score:"2-2"},
     {min:90,team:"ريال",type:"red",player:"رودريغو",assist:null},
   ],
   lineup:{
     home:{formation:"4-3-3",rows:[
       [{num:1,name:"كورتوا",rating:7.2,goal:false,yellow:false,red:false}],
       [{num:2,name:"كارفاخال",rating:8.1,goal:true,yellow:false,red:false},{num:5,name:"ميليتاو",rating:7.4,goal:false,yellow:false,red:false},{num:6,name:"ناتشو",rating:7.0,goal:false,yellow:false,red:false},{num:23,name:"مندي",rating:6.9,goal:false,yellow:true,red:false}],
       [{num:8,name:"كروس",rating:7.8,goal:false,yellow:false,red:false},{num:15,name:"فالفيردي",rating:7.6,goal:false,yellow:false,red:false},{num:5,name:"بيلينغهام",rating:8.4,goal:false,yellow:false,red:false}],
       [{num:7,name:"فينيسيوس",rating:7.9,goal:false,yellow:false,red:false},{num:9,name:"مبابي",rating:8.7,goal:true,yellow:false,red:false},{num:11,name:"رودريغو",rating:6.5,goal:false,yellow:false,red:true}],
     ],subs:["لونين","نفيز","إيتو","كامافينغا"]},
     away:{formation:"4-2-3-1",rows:[
       [{num:1,name:"ثيشتيني",rating:7.5,goal:false,yellow:false,red:false}],
       [{num:23,name:"كونديه",rating:7.1,goal:false,yellow:false,red:false},{num:4,name:"أراوخو",rating:7.3,goal:false,yellow:false,red:false},{num:5,name:"إينيغو",rating:7.0,goal:false,yellow:false,red:false},{num:3,name:"بالدي",rating:7.2,goal:false,yellow:false,red:false}],
       [{num:21,name:"دي يونغ",rating:6.8,goal:false,yellow:true,red:false},{num:8,name:"بيدري",rating:8.2,goal:false,yellow:false,red:false}],
       [{num:19,name:"يامال",rating:8.9,goal:true,yellow:false,red:false},{num:27,name:"فيرمين",rating:7.4,goal:false,yellow:false,red:false},{num:11,name:"رافينيا",rating:7.7,goal:false,yellow:false,red:false}],
       [{num:9,name:"ليفانداوسكي",rating:8.3,goal:true,yellow:false,red:false}],
     ],subs:["بينيا","كريستنسن","غافي","تور"]},
   }
  },
  {id:2,home:"mci",away:"lfc",homeScore:1,awayScore:3,league:"PL",status:"FINISHED",date:"أمس",hasAnalysis:true,
   stats:{possession:[55,45],shots:[12,11],shotsOn:[4,7],corners:[6,5],fouls:[9,10],yellows:[1,0],xg:[1.4,2.8]},
   scorers:["سالاح 12'","نونيز 45'","فودين 60'","سالاح 78'"],
   events:[
     {min:12,team:"ليفربول",type:"goal",player:"سالاح",assist:"ألكسندر-أرنولد",score:"0-1"},
     {min:35,team:"مان سيتي",type:"yellow",player:"روديغر",assist:null},
     {min:45,team:"ليفربول",type:"goal",player:"نونيز",assist:"سالاح",score:"0-2"},
     {min:60,team:"مان سيتي",type:"goal",player:"فودين",assist:"دي بروين",score:"1-2"},
     {min:78,team:"ليفربول",type:"goal",player:"سالاح",assist:"جوتا",score:"1-3"},
   ],
   lineup:{
     home:{formation:"4-3-3",rows:[
       [{num:31,name:"إيدرسون",rating:6.8,goal:false,yellow:false,red:false}],
       [{num:2,name:"ووكر",rating:6.5,goal:false,yellow:false,red:false},{num:5,name:"روديغر",rating:6.2,goal:false,yellow:true,red:false},{num:6,name:"آكي",rating:6.4,goal:false,yellow:false,red:false},{num:3,name:"غفارثيل",rating:6.7,goal:false,yellow:false,red:false}],
       [{num:17,name:"دي بروين",rating:7.4,goal:false,yellow:false,red:false},{num:16,name:"رودري",rating:7.0,goal:false,yellow:false,red:false},{num:20,name:"بيرناردو",rating:6.9,goal:false,yellow:false,red:false}],
       [{num:11,name:"دوكو",rating:7.1,goal:false,yellow:false,red:false},{num:47,name:"فودين",rating:7.8,goal:true,yellow:false,red:false},{num:26,name:"سافينيو",rating:6.6,goal:false,yellow:false,red:false}],
     ],subs:["أورتيغا","لويس","فليبي"]},
     away:{formation:"4-3-3",rows:[
       [{num:1,name:"أليسون",rating:7.9,goal:false,yellow:false,red:false}],
       [{num:66,name:"ألكسندر-أرنولد",rating:8.5,goal:false,yellow:false,red:false},{num:4,name:"كواناه",rating:7.6,goal:false,yellow:false,red:false},{num:3,name:"فان دايك",rating:8.0,goal:false,yellow:false,red:false},{num:26,name:"روبرتسون",rating:7.8,goal:false,yellow:false,red:false}],
       [{num:10,name:"ماك ألستر",rating:7.5,goal:false,yellow:false,red:false},{num:38,name:"غراف",rating:7.3,goal:false,yellow:false,red:false},{num:7,name:"سوباسيتش",rating:7.2,goal:false,yellow:false,red:false}],
       [{num:20,name:"جوتا",rating:8.1,goal:false,yellow:false,red:false},{num:9,name:"نونيز",rating:8.3,goal:true,yellow:false,red:false},{num:11,name:"سالاح",rating:9.1,goal:true,yellow:false,red:false}],
     ],subs:["كيليهر","دياز","إليوت"]},
   }
  },
  {id:5,home:"atm",away:"psg",homeScore:1,awayScore:1,league:"CL",status:"IN_PLAY",date:"الآن",time:"67",hasAnalysis:false,
   stats:{possession:[44,56],shots:[8,10],shotsOn:[3,5],corners:[4,6],fouls:[14,8],yellows:[2,1],xg:[0.9,1.4]},
   events:[
     {min:34,team:"PSG",type:"goal",player:"أمباشو",assist:null,score:"0-1"},
     {min:58,team:"أتلتيكو",type:"goal",player:"موراتا",assist:"غريزمان",score:"1-1"},
   ],lineup:null},
  {id:6,home:"bay",away:"real",homeScore:null,awayScore:null,league:"CL",status:"SCHEDULED",date:"اليوم",time:"21:00",hasAnalysis:false,stats:null,events:[],lineup:null},
  {id:7,home:"ars",away:"mci",homeScore:null,awayScore:null,league:"PL",status:"SCHEDULED",date:"غداً",time:"20:45",hasAnalysis:false,stats:null,events:[],lineup:null},
  {id:8,home:"barca",away:"atm",homeScore:0,awayScore:0,league:"LL",status:"IN_PLAY",date:"الآن",time:"23",hasAnalysis:false,
   stats:{possession:[62,38],shots:[5,3],shotsOn:[2,1],corners:[3,1],fouls:[6,8],yellows:[0,1],xg:[0.4,0.3]},
   events:[{min:18,team:"برشلونة",type:"yellow",player:"أراوخو",assist:null}],lineup:null},
];

const STANDINGS_DATA={
  PL:[
    {pos:1,teamId:"lfc",pts:77,p:35,w:24,d:5,l:6,gf:72,ga:32,gd:40,form:["W","W","D","W","W"]},
    {pos:2,teamId:"ars",pts:72,p:35,w:22,d:6,l:7,gf:65,ga:29,gd:36,form:["W","W","W","D","W"]},
    {pos:3,teamId:"mci",pts:67,p:35,w:20,d:7,l:8,gf:61,ga:35,gd:26,form:["L","W","W","W","D"]},
  ],
  LL:[
    {pos:1,teamId:"real",pts:79,p:34,w:25,d:4,l:5,gf:78,ga:28,gd:50,form:["W","W","D","W","W"]},
    {pos:2,teamId:"barca",pts:74,p:34,w:23,d:5,l:6,gf:71,ga:30,gd:41,form:["W","D","W","W","W"]},
    {pos:3,teamId:"atm",pts:66,p:34,w:20,d:6,l:8,gf:60,ga:35,gd:25,form:["W","W","L","W","D"]},
  ],
  CL:[
    {pos:1,teamId:"real",pts:19,p:8,w:6,d:1,l:1,gf:20,ga:8,gd:12,form:["W","W","W","D","W"]},
    {pos:2,teamId:"mci",pts:17,p:8,w:5,d:2,l:1,gf:17,ga:9,gd:8,form:["D","W","W","W","D"]},
    {pos:3,teamId:"bay",pts:16,p:8,w:5,d:1,l:2,gf:18,ga:11,gd:7,form:["W","W","L","W","W"]},
    {pos:4,teamId:"psg",pts:14,p:8,w:4,d:2,l:2,gf:14,ga:10,gd:4,form:["D","W","W","L","W"]},
    {pos:5,teamId:"atm",pts:13,p:8,w:4,d:1,l:3,gf:12,ga:12,gd:0,form:["W","L","W","D","W"]},
  ],
};

const ANALYSIS_DATA={
  1:{quick:"تعادل مثير في الكلاسيكو — ريال ضيّع الفوز في الدقيقة ٨٨ بهدف ليفانداوسكي",medium:"ريال سيطر بـ٥٨٪ استحواذ لكن ٧٣٪ من هجماته جاءت من الجانب الأيسر حيث حشد برشلونة دفاعه. أنشيلوتي تأخر في تغيير الخطة وكان الثمن التعادل في الوقت بدل الضائع.",deep:"برشلونة استخدم ضغطاً عالياً أفقد ريال إيقاعه. يامال (١٧ سنة) كان الأفضل بتقييم ٨.٩ وخلق ٦ فرص. xG ريال: 2.1 مقابل 1.7 — أرقام تعكس الهيمنة لكن برودة ليفانداوسكي في الدقيقة ٨٨ أفسدت كل شيء."},
  2:{quick:"ليفربول يسحق سيتي بثلاثية — سالاح يسجل مرتين بتقييم ٩.١",medium:"سيتي يعاني من غياب هالاند. ليفربول لعب بضغط عالٍ وسالاح استغل الدفاع العالي. xG ليفربول ٢.٨ مقابل ١.٤ فقط لسيتي.",deep:"غوارديولا رفع خط الدفاع بشكل مبالغ ففتح مساحات خلف الظهيرين. سالاح حركته ٩ كيلومترات وخلق ٥ فرص خطرة. ليفربول سجل ١٢ هدفاً من الكرات العميقة هذا الموسم."},
};

const NEWS=[
  {id:1,title:"مبابي يسجل هاتريك ويقود ريال للفوز الكبير",titleEn:"Mbappé scores hat-trick in Real Madrid big win",time:"منذ ٢ ساعة",emoji:"⚽"},
  {id:2,title:"صلاح يوقع عقداً جديداً مع ليفربول لمدة سنتين",titleEn:"Salah signs new 2-year deal with Liverpool",time:"منذ ٤ ساعات",emoji:"📝"},
  {id:3,title:"يامال يفوز بجائزة أفضل لاعب شاب في أوروبا",titleEn:"Yamal wins Best Young Player in Europe",time:"منذ ٦ ساعات",emoji:"🏆"},
  {id:4,title:"هالاند يعود من الإصابة ويشارك في تدريبات سيتي",titleEn:"Haaland returns from injury, trains with City",time:"أمس",emoji:"💪"},
  {id:5,title:"برشلونة يضم نجم البريميرليغ في صفقة قياسية",titleEn:"Barcelona signs Premier League star in record deal",time:"أمس",emoji:"🔄"},
];

const TEAM_NEWS={
  real:["مبابي يتعافى ويشارك أمام بايرن","أنشيلوتي يتحدث عن ضغط الألقاب","بيلينغهام يمدد حتى 2030"],
  lfc:["صلاح مرشح لجائزة أفضل لاعب في الشهر","فان دايك يعود من الاستراحة","ليفربول يستعد لآرسنال"],
  barca:["يامال يحطم رقماً قياسياً جديداً","برشلونة يضم نجماً في يناير","فالفيردي يثني على الفريق"],
  mci:["غوارديولا يكشف عن خطة الانتقالات","سيتي يبحث عن بديل هالاند","إيدرسون ينفي الرحيل"],
  ars:["أرتيتا: نحن مستعدون للقب","ساكا يجدد لـ ٢٠٢٨","رايس الأفضل في دوري الأبطال"],
  bay:["بايرن يستعد للكلاسيكو الأوروبي","كاني يتعافى من الإصابة","ليفانداوسكي ينفي العودة"],
  psg:["PSG يحلم بدوري الأبطال","دونارومة يتألق في الدوري الفرنسي","مبابي يغيب عن مباراة الأسبوع"],
  atm:["سيميوني: المباراة ستكون صعبة جداً","موراتا يعود للتسجيل","أتلتيكو يتطلع للمركز الثالث"],
};

const WC_GROUPS=[
  {group:"A",teams:[{name:"البرازيل",flag:"🇧🇷",pts:9,w:3,d:0,l:0,gf:8,ga:2},{name:"أرجنتين",flag:"🇦🇷",pts:6,w:2,d:0,l:1,gf:5,ga:3},{name:"المكسيك",flag:"🇲🇽",pts:3,w:1,d:0,l:2,gf:3,ga:6},{name:"كندا",flag:"🇨🇦",pts:0,w:0,d:0,l:3,gf:1,ga:6}]},
  {group:"B",teams:[{name:"فرنسا",flag:"🇫🇷",pts:7,w:2,d:1,l:0,gf:6,ga:2},{name:"إنجلترا",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",pts:6,w:2,d:0,l:1,gf:4,ga:3},{name:"هولندا",flag:"🇳🇱",pts:4,w:1,d:1,l:1,gf:3,ga:3},{name:"السنغال",flag:"🇸🇳",pts:1,w:0,d:1,l:2,gf:1,ga:6}]},
  {group:"C",teams:[{name:"إسبانيا",flag:"🇪🇸",pts:9,w:3,d:0,l:0,gf:7,ga:1},{name:"ألمانيا",flag:"🇩🇪",pts:6,w:2,d:0,l:1,gf:5,ga:3},{name:"اليابان",flag:"🇯🇵",pts:3,w:1,d:0,l:2,gf:2,ga:4},{name:"كوستاريكا",flag:"🇨🇷",pts:0,w:0,d:0,l:3,gf:0,ga:6}]},
  {group:"D",teams:[{name:"البرتغال",flag:"🇵🇹",pts:7,w:2,d:1,l:0,gf:6,ga:2},{name:"المغرب",flag:"🇲🇦",pts:6,w:2,d:0,l:1,gf:4,ga:2},{name:"كرواتيا",flag:"🇭🇷",pts:3,w:1,d:0,l:2,gf:3,ga:5},{name:"غانا",flag:"🇬🇭",pts:2,w:0,d:2,l:1,gf:2,ga:6}]},
];

const GOAL_ALERTS=[
  "⚽ موراتا يسجل لأتلتيكو في الدقيقة ٥٨ — أتلتيكو ١-١ PSG",
  "⚽ أهداف في إنتر vs ميلان — تابع المباراة الآن",
  "🔴 بدأت مباراة بايرن vs ريال مدريد",
];

const rc=r=>r>=8.5?"#00e5a0":r>=7.5?"#4db8ff":r>=7?"#fccb00":"#ff4d4d";
const fc=r=>({W:"#00e5a0",D:"#fccb00",L:"#ff4d4d"}[r]||"#3a5a7a");
const ei=t=>({goal:"⚽",yellow:"🟨",red:"🟥",sub:"🔄"}[t]||"•");
const getTeam=id=>TEAMS[id]||{name:id,nameEn:id,crest:"⚽",color:"#666",league:"PL"};
const getLg=id=>LEAGUES_LIST.find(l=>l.id===id)||{flag:"🏆",name:id,nameEn:id};

// ── TOAST ──
function Toast({msg,onClose,T}){
  useEffect(()=>{const t=setTimeout(onClose,3000);return()=>clearTimeout(t);},[onClose]);
  return <div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:T.accent,color:"#0a0f1e",padding:"11px 20px",borderRadius:14,fontWeight:800,fontSize:13,zIndex:9999,boxShadow:`0 6px 24px ${T.accent}55`,maxWidth:310,textAlign:"center",lineHeight:1.5}}>{msg}</div>;
}

// ── STAT BAR ──
function StatBar({label,home,away,T}){
  const tot=home+away||1;
  return(
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:T.sub,marginBottom:4}}>
        <span style={{fontWeight:700,color:T.accent}}>{home}</span>
        <span>{label}</span>
        <span style={{fontWeight:700,color:T.blue}}>{away}</span>
      </div>
      <div style={{display:"flex",height:6,borderRadius:4,overflow:"hidden",background:T.border}}>
        <div style={{width:`${(home/tot)*100}%`,background:T.accent}}/>
        <div style={{width:`${(away/tot)*100}%`,background:T.blue}}/>
      </div>
    </div>
  );
}

// ── PITCH ──
function Pitch({lineup,T,onPlayer}){
  if(!lineup) return(
    <div style={{background:"#1a3a22",borderRadius:18,height:300,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
      <div style={{fontSize:36}}>⚽</div>
      <div style={{color:"#5a8a6a",fontSize:13}}>التشكيلة ستظهر قبل المباراة</div>
    </div>
  );
  return(
    <div style={{background:"linear-gradient(180deg,#1a4a28,#1e5a30,#1a4a28)",borderRadius:18,padding:"14px 6px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:10,border:"2px solid #ffffff18",borderRadius:10,pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"50%",left:10,right:10,height:2,background:"#ffffff14",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:60,height:60,border:"2px solid #ffffff14",borderRadius:"50%",pointerEvents:"none"}}/>
      {lineup.rows.map((row,ri)=>(
        <div key={ri} style={{display:"flex",justifyContent:"space-around",padding:"8px 4px",position:"relative",zIndex:2}}>
          {row.map((p,pi)=>(
            <div key={pi} onClick={()=>onPlayer&&onPlayer(p)} style={{display:"flex",flexDirection:"column",alignItems:"center",width:54,cursor:"pointer"}}>
              <div style={{position:"relative",marginBottom:3}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${rc(p.rating)}22,#1e2d4a)`,border:`2.5px solid ${rc(p.rating)}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#fff",boxShadow:`0 0 10px ${rc(p.rating)}44`}}>{p.num}</div>
                <div style={{position:"absolute",top:-6,right:-10,background:rc(p.rating),color:"#0a0f1e",borderRadius:5,padding:"1px 4px",fontSize:9,fontWeight:900}}>{p.rating.toFixed(1)}</div>
                <div style={{position:"absolute",bottom:-2,left:-6,display:"flex",gap:2}}>
                  {p.goal&&<span style={{fontSize:9}}>⚽</span>}
                  {p.yellow&&<div style={{width:6,height:9,background:"#fccb00",borderRadius:1}}/>}
                  {p.red&&<div style={{width:6,height:9,background:"#ff4d4d",borderRadius:1}}/>}
                </div>
              </div>
              <span style={{fontSize:8,color:"#e0f0e0",textAlign:"center",textShadow:"0 1px 3px #000",maxWidth:52,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</span>
            </div>
          ))}
        </div>
      ))}
      <div style={{textAlign:"center",fontSize:10,color:"#ffffff45",fontWeight:700,marginTop:2}}>{lineup.formation}</div>
    </div>
  );
}

// ── MATCH ROW ──
function MatchRow({m,onOpen,T,lang,liveMin}){
  const ht=getTeam(m.home),at=getTeam(m.away);
  const live=m.status==="IN_PLAY";
  const L=lang==="ar";
  const lg=getLg(m.league);
  const min=liveMin[m.id];
  return(
    <div onClick={()=>onOpen(m)} style={{background:T.card,border:`1px solid ${live?"#ff4d4d40":m.hasAnalysis?T.accent+"30":T.border}`,borderRadius:14,padding:"13px 14px",marginBottom:9,cursor:"pointer"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
        <span style={{fontSize:10,color:live?T.live:T.accent,fontWeight:700}}>{lg.flag} {L?lg.name:lg.nameEn}</span>
        <span style={{fontSize:10,color:T.sub}}>{m.date}{m.time&&!live?` · ${m.time}`:""}</span>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
          <span style={{fontSize:20}}>{ht.crest}</span>
          <span style={{fontSize:13,fontWeight:600,color:T.text}}>{L?ht.name:ht.nameEn}</span>
        </div>
        <div style={{fontSize:16,fontWeight:900,background:T.card2,borderRadius:9,padding:"5px 10px",minWidth:70,textAlign:"center",color:m.homeScore!==null?T.text:T.sub}}>
          {m.homeScore!==null?`${m.homeScore} - ${m.awayScore}`:m.time||"vs"}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,flex:1,justifyContent:"flex-end"}}>
          <span style={{fontSize:13,fontWeight:600,color:T.text}}>{L?at.name:at.nameEn}</span>
          <span style={{fontSize:20}}>{at.crest}</span>
        </div>
      </div>
      {live&&<div style={{marginTop:7,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:T.live,animation:"blink 1s infinite"}}/>
        <span style={{fontSize:11,color:T.live,fontWeight:700}}>{min?`${min}'`:m.time+"'"}</span>
      </div>}
      {m.hasAnalysis&&!live&&<div style={{marginTop:6,display:"flex",alignItems:"center",gap:5}}>
        <div style={{width:5,height:5,borderRadius:"50%",background:T.accent}}/>
        <span style={{fontSize:10,color:T.accent}}>{L?"تحليل + إحصائيات + تشكيلة":"Analysis + Stats + Lineup"}</span>
      </div>}
    </div>
  );
}

// ── PLAYER PAGE ──
function PlayerPage({player,onClose,T,lang}){
  const L=lang==="ar";
  const team=getTeam(player.team);
  return(
    <div style={{position:"fixed",inset:0,background:"#000e",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:T.bg,borderRadius:"22px 22px 0 0",width:"100%",maxWidth:420,maxHeight:"88vh",overflowY:"auto",padding:24}}>
        <button onClick={onClose} style={{background:"none",border:"none",color:T.sub,fontSize:22,cursor:"pointer",float:"left"}}>✕</button>
        <div style={{textAlign:"center",paddingTop:4,marginBottom:20}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:`linear-gradient(135deg,${rc(player.rating)}33,${T.card2})`,border:`3px solid ${rc(player.rating)}`,margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:38}}>{player.nationality}</div>
          <div style={{fontSize:19,fontWeight:900,color:T.text}}>{L?player.name:player.nameEn}</div>
          <div style={{fontSize:12,color:T.sub,marginTop:4}}>{L?player.pos:player.posEn} · {team.crest} {L?team.name:team.nameEn}</div>
          <div style={{display:"inline-block",background:rc(player.rating),color:"#0a0f1e",borderRadius:10,padding:"5px 14px",fontSize:14,fontWeight:900,marginTop:8}}>{player.rating} ⭐</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
          {[[L?"العمر":"Age",player.age+"y"],[L?"الطول":"Height",player.height],[L?"المباريات":"Matches",player.matches]].map(([k,v])=>(
            <div key={k} style={{background:T.card2,borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
              <div style={{fontSize:17,fontWeight:900,color:T.text}}>{v}</div>
              <div style={{fontSize:10,color:T.sub,marginTop:3}}>{k}</div>
            </div>
          ))}
        </div>
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,padding:16,marginBottom:14}}>
          <div style={{fontSize:12,color:T.sub,fontWeight:700,marginBottom:12}}>{L?"إحصائيات الموسم":"Season Stats"}</div>
          {[[L?"الأهداف":"Goals","⚽",player.goals,T.accent],[L?"التمريرات الحاسمة":"Assists","🎯",player.assists,T.blue],[L?"البطاقات الصفراء":"Yellows","🟨",player.yellows,T.gold],[L?"البطاقات الحمراء":"Reds","🟥",player.reds,T.live]].map(([lb,ic,val,color])=>(
            <div key={lb} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${T.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>{ic}</span><span style={{fontSize:13,color:T.text}}>{lb}</span></div>
              <span style={{fontSize:18,fontWeight:900,color}}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TEAM PAGE ──
function TeamPage({teamId,onClose,T,lang,onMatchOpen,onPlayerOpen}){
  const [tab,setTab]=useState("results");
  const team=getTeam(teamId);
  const L=lang==="ar";
  const teamMatches=MATCHES_DATA.filter(m=>m.home===teamId||m.away===teamId);
  const standing=Object.values(STANDINGS_DATA).flat().find(s=>s.teamId===teamId);
  const players=Object.values(PLAYERS).filter(p=>p.team===teamId);
  const news=(TEAM_NEWS[teamId]||["لا أخبار متاحة الآن"]);
  return(
    <div style={{position:"fixed",inset:0,background:"#000e",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:T.bg,borderRadius:"22px 22px 0 0",width:"100%",maxWidth:420,maxHeight:"92vh",overflowY:"auto"}}>
        <div style={{background:`linear-gradient(135deg,${team.color}44,${T.card})`,padding:"20px 16px 0"}}>
          <button onClick={onClose} style={{background:"none",border:"none",color:T.sub,fontSize:22,cursor:"pointer",float:"left"}}>✕</button>
          <div style={{textAlign:"center",paddingBottom:4}}>
            <div style={{fontSize:52,marginBottom:6}}>{team.crest}</div>
            <div style={{fontSize:18,fontWeight:900,color:T.text}}>{L?team.name:team.nameEn}</div>
            <div style={{fontSize:11,color:T.sub,marginTop:3}}>{team.stadium} · {team.capacity}</div>
            {standing&&(
              <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:12}}>
                {[[L?"المركز":"Pos",standing.pos],[L?"النقاط":"Pts",standing.pts],[L?"الفوز":"W",standing.w],[L?"الخسارة":"L",standing.l]].map(([k,v])=>(
                  <div key={k} style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:900,color:T.accent}}>{v}</div><div style={{fontSize:10,color:T.sub}}>{k}</div></div>
                ))}
              </div>
            )}
          </div>
          <div style={{display:"flex",borderTop:`1px solid ${T.border}`,marginTop:14,overflowX:"auto",scrollbarWidth:"none"}}>
            {[["results",L?"النتائج":"Results"],["squad",L?"الفريق":"Squad"],["news",L?"أخبار":"News"]].map(([k,lb])=>(
              <button key={k} onClick={()=>setTab(k)} style={{flex:"0 0 auto",background:"none",border:"none",color:tab===k?T.accent:T.sub,fontSize:12,fontWeight:tab===k?800:500,padding:"10px 16px",cursor:"pointer",borderBottom:tab===k?`2px solid ${T.accent}`:"2px solid transparent",whiteSpace:"nowrap"}}>{lb}</button>
            ))}
          </div>
        </div>
        <div style={{padding:16}}>
          {tab==="results"&&(
            teamMatches.length===0
              ?<div style={{textAlign:"center",color:T.sub,padding:24}}>{L?"لا توجد مباريات":"No matches"}</div>
              :teamMatches.map(m=>{
                const ht=getTeam(m.home),at=getTeam(m.away),lg=getLg(m.league);
                return(
                  <div key={m.id} onClick={()=>onMatchOpen(m)} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"13px 14px",marginBottom:9,cursor:"pointer"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:10,color:T.accent,fontWeight:700}}>{lg.flag} {L?lg.name:lg.nameEn}</span>
                      <span style={{fontSize:10,color:T.sub}}>{m.date}</span>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}><span style={{fontSize:18}}>{ht.crest}</span><span style={{fontSize:12,fontWeight:600,color:T.text}}>{L?ht.name:ht.nameEn}</span></div>
                      <div style={{fontSize:15,fontWeight:900,background:T.card2,borderRadius:9,padding:"5px 10px",minWidth:65,textAlign:"center",color:m.homeScore!==null?T.text:T.sub}}>{m.homeScore!==null?`${m.homeScore} - ${m.awayScore}`:m.time||"vs"}</div>
                      <div style={{display:"flex",alignItems:"center",gap:8,flex:1,justifyContent:"flex-end"}}><span style={{fontSize:12,fontWeight:600,color:T.text}}>{L?at.name:at.nameEn}</span><span style={{fontSize:18}}>{at.crest}</span></div>
                    </div>
                  </div>
                );
              })
          )}
          {tab==="squad"&&(
            players.length===0
              ?<div style={{textAlign:"center",color:T.sub,padding:24}}>{L?"لا يوجد لاعبون":"No players"}</div>
              :players.map(p=>(
                <div key={p.id} onClick={()=>onPlayerOpen(p)} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"13px 14px",marginBottom:9,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,${rc(p.rating)}22,${T.card2})`,border:`2px solid ${rc(p.rating)}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{p.nationality}</div>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:T.text}}>{L?p.name:p.nameEn}</div><div style={{fontSize:11,color:T.sub,marginTop:2}}>{L?p.pos:p.posEn}</div></div>
                  <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:900,color:T.accent}}>{p.goals}</div><div style={{fontSize:9,color:T.sub}}>{L?"هدف":"G"}</div></div>
                  <div style={{background:rc(p.rating),color:"#0a0f1e",borderRadius:8,padding:"4px 8px",fontSize:12,fontWeight:900}}>{p.rating}</div>
                </div>
              ))
          )}
          {tab==="news"&&news.map((n,i)=>(
            <div key={i} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"13px 14px",marginBottom:9,display:"flex",gap:12,alignItems:"flex-start"}}>
              <span style={{fontSize:22,flexShrink:0}}>📰</span>
              <div style={{fontSize:13,color:T.text,lineHeight:1.6}}>{n}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MATCH DETAIL ──
function MatchDetail({match,onClose,T,lang,showToast,onTeamOpen}){
  const [tab,setTab]=useState(match.hasAnalysis?"analysis":"events");
  const [level,setLevel]=useState("quick");
  const [side,setSide]=useState("home");
  const [aiText,setAiText]=useState("");
  const [aiLoad,setAiLoad]=useState(false);
  const [useAI,setUseAI]=useState(false);
  const [selPlayer,setSelPlayer]=useState(null);
  const ht=getTeam(match.home),at=getTeam(match.away);
  const lg=getLg(match.league);
  const analysis=ANALYSIS_DATA[match.id];
  const L=lang==="ar";

  const tabs=[];
  if(match.hasAnalysis) tabs.push(["analysis",L?"📊 تحليل":"📊 Analysis"]);
  tabs.push(["events",L?"⚡ أحداث":"⚡ Events"]);
  if(match.stats) tabs.push(["stats",L?"📈 إحصائيات":"📈 Stats"]);
  if(match.lineup) tabs.push(["lineup",L?"👥 تشكيلة":"👥 Lineup"]);

  const fetchAI=async()=>{
    setAiLoad(true);setAiText("");
    const map={quick:L?"ملخص سريع في جملتين":"quick 2-sentence summary",medium:L?"تحليل في فقرة":"one paragraph analysis",deep:L?"تحليل تكتيكي عميق":"deep tactical analysis with xG stats"};
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:700,messages:[{role:"user",content:`Football analyst. Analyze: ${ht.nameEn} ${match.homeScore??""}-${match.awayScore??""} ${at.nameEn} in ${lg.nameEn}. Write ${map[level]} in ${L?"Arabic":"English"}.`}]})});
      const d=await r.json();
      setAiText(d.content?.map(c=>c.text||"").join("")||"Error.");
    }catch{setAiText(L?"تعذّر الاتصال.":"Connection failed.");}
    setAiLoad(false);
  };

  if(selPlayer) return(
    <div style={{position:"fixed",inset:0,background:"#000e",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:T.bg,borderRadius:"22px 22px 0 0",width:"100%",maxWidth:420,maxHeight:"80vh",overflowY:"auto",padding:24}}>
        <button onClick={()=>setSelPlayer(null)} style={{background:"none",border:"none",color:T.sub,fontSize:22,cursor:"pointer",float:"left"}}>✕</button>
        <div style={{textAlign:"center",paddingTop:4,marginBottom:20}}>
          <div style={{width:68,height:68,borderRadius:"50%",background:`linear-gradient(135deg,${rc(selPlayer.rating||7)}33,${T.card2})`,border:`3px solid ${rc(selPlayer.rating||7)}`,margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:900,color:"#fff"}}>{selPlayer.num}</div>
          <div style={{fontSize:17,fontWeight:800,color:T.text}}>{selPlayer.name}</div>
          <div style={{display:"inline-block",background:rc(selPlayer.rating||7),color:"#0a0f1e",borderRadius:8,padding:"4px 12px",fontSize:13,fontWeight:900,marginTop:8}}>{(selPlayer.rating||7).toFixed(1)} ⭐</div>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
          {[[L?"تقييم المباراة":"Match Rating",`${(selPlayer.rating||7).toFixed(1)}`],[L?"هدف":"Goal",selPlayer.goal?"⚽ 1":"0"],[L?"بطاقة":"Card",selPlayer.yellow?"🟨":selPlayer.red?"🟥":"—"]].map(([k,v])=>(
            <div key={k} style={{background:T.card2,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 16px",textAlign:"center",minWidth:90}}>
              <div style={{fontSize:16,fontWeight:900,color:T.accent}}>{v}</div>
              <div style={{fontSize:10,color:T.sub,marginTop:3}}>{k}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return(
    <div style={{position:"fixed",inset:0,background:"#000e",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{background:T.bg,borderRadius:"22px 22px 0 0",width:"100%",maxWidth:420,maxHeight:"92vh",overflowY:"auto",display:"flex",flexDirection:"column"}}>
        <div style={{background:`linear-gradient(135deg,${T.card},${T.card2})`,padding:"18px 16px 0",flexShrink:0}}>
          <button onClick={onClose} style={{background:"none",border:"none",color:T.sub,fontSize:22,cursor:"pointer",float:"left",lineHeight:1}}>✕</button>
          <div style={{textAlign:"center",paddingBottom:4}}>
            <div style={{fontSize:10,color:T.accent,fontWeight:700,marginBottom:8}}>{lg.flag} {L?lg.name:lg.nameEn}</div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:14,marginBottom:10}}>
              <div onClick={()=>onTeamOpen(match.home)} style={{textAlign:"center",flex:1,cursor:"pointer"}}>
                <div style={{fontSize:28,marginBottom:4}}>{ht.crest}</div>
                <div style={{fontSize:12,fontWeight:800,color:T.text}}>{L?ht.name:ht.nameEn}</div>
              </div>
              <div style={{background:T.card2,border:`1px solid ${T.border}`,borderRadius:14,padding:"10px 14px",minWidth:90,textAlign:"center"}}>
                {match.homeScore!==null
                  ?<div style={{fontSize:26,fontWeight:900,color:T.text}}>{match.homeScore} - {match.awayScore}</div>
                  :<div style={{fontSize:14,color:T.sub,fontWeight:700}}>{match.time||"vs"}</div>}
                <div style={{fontSize:9,color:match.status==="IN_PLAY"?T.live:match.status==="FINISHED"?T.sub:T.accent,marginTop:2,fontWeight:700}}>
                  {match.status==="IN_PLAY"?`🔴 ${match.time}'`:match.status==="FINISHED"?L?"انتهت":"FT":`⏰ ${match.time}`}
                </div>
              </div>
              <div onClick={()=>onTeamOpen(match.away)} style={{textAlign:"center",flex:1,cursor:"pointer"}}>
                <div style={{fontSize:28,marginBottom:4}}>{at.crest}</div>
                <div style={{fontSize:12,fontWeight:800,color:T.text}}>{L?at.name:at.nameEn}</div>
              </div>
            </div>
            {match.scorers&&<div style={{fontSize:10,color:T.sub,marginBottom:6,textAlign:"center"}}>{match.scorers.join(" · ")}</div>}
          </div>
          <div style={{display:"flex",borderTop:`1px solid ${T.border}`,overflowX:"auto",scrollbarWidth:"none"}}>
            {tabs.map(([k,lb])=>(
              <button key={k} onClick={()=>setTab(k)} style={{flex:"0 0 auto",background:"none",border:"none",color:tab===k?T.accent:T.sub,fontSize:12,fontWeight:tab===k?800:500,padding:"10px 14px",cursor:"pointer",borderBottom:tab===k?`2px solid ${T.accent}`:"2px solid transparent",whiteSpace:"nowrap"}}>{lb}</button>
            ))}
          </div>
        </div>

        <div style={{padding:16,flex:1}}>
          {tab==="analysis"&&(
            <>
              <div style={{display:"flex",gap:8,marginBottom:14}}>
                {[["quick","⚡ سريع"],["medium","📊 متوسط"],["deep","🔬 عميق"]].map(([k,lb])=>(
                  <button key={k} onClick={()=>{setLevel(k);if(useAI)setAiText("");}} style={{flex:1,background:level===k?T.accent:T.card2,color:level===k?"#0a0f1e":T.sub,border:"none",borderRadius:10,padding:"9px 4px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{lb}</button>
                ))}
              </div>
              <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:16,marginBottom:14,minHeight:100}}>
                {aiLoad?<div style={{textAlign:"center",padding:20,color:T.accent}}>⏳ {L?"جاري التحليل...":"Analyzing..."}</div>
                  :<p style={{fontSize:14,lineHeight:1.9,color:T.text,margin:0}}>{useAI?aiText:analysis?.[level]}</p>}
              </div>
              <button onClick={()=>{const n=!useAI;setUseAI(n);if(n)fetchAI();else setAiText("");}}
                style={{width:"100%",background:useAI?`${T.accent}12`:T.card2,border:`1px solid ${useAI?T.accent:T.border}`,borderRadius:12,padding:"12px 16px",color:useAI?T.accent:T.sub,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                {useAI?`✅ ${L?"تحليل الذكاء الاصطناعي مفعّل":"AI Analysis ON"}`:`🤖 ${L?"جرّب تحليل الذكاء الاصطناعي":"Try AI Analysis"}`}
              </button>
            </>
          )}

          {tab==="events"&&(
            match.events.length===0
              ?<div style={{textAlign:"center",padding:30,color:T.sub,fontSize:13}}>{L?"لا توجد أحداث بعد":"No events yet"}</div>
              :<div>{match.events.map((e,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${T.border}`}}>
                  <div style={{width:32,textAlign:"center",fontSize:12,fontWeight:800,color:e.type==="goal"?T.accent:e.type==="yellow"?T.gold:T.live,flexShrink:0}}>{e.min}'</div>
                  <div style={{fontSize:18}}>{ei(e.type)}</div>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:T.text}}>{e.player}</div>{e.assist&&<div style={{fontSize:11,color:T.sub,marginTop:1}}>{L?"تمريرة:":"Assist:"} {e.assist}</div>}</div>
                  {e.score&&<div style={{fontSize:14,fontWeight:900,color:T.text,background:T.card2,padding:"4px 10px",borderRadius:8}}>{e.score}</div>}
                  <div style={{fontSize:10,color:T.sub,width:46,textAlign:"left"}}>{e.team}</div>
                </div>
              ))}</div>
          )}

          {tab==="stats"&&match.stats&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,fontSize:12,fontWeight:800}}>
                <span style={{color:T.accent}}>{ht.crest} {L?ht.name:ht.nameEn}</span>
                <span style={{color:T.blue}}>{L?at.name:at.nameEn} {at.crest}</span>
              </div>
              {[[L?"الاستحواذ %":"Possession",match.stats.possession[0],match.stats.possession[1]],[L?"التسديدات":"Shots",match.stats.shots[0],match.stats.shots[1]],[L?"على المرمى":"On Target",match.stats.shotsOn[0],match.stats.shotsOn[1]],[L?"الركنيات":"Corners",match.stats.corners[0],match.stats.corners[1]],[L?"الأخطاء":"Fouls",match.stats.fouls[0],match.stats.fouls[1]],[L?"البطاقات الصفراء":"Yellows",match.stats.yellows[0],match.stats.yellows[1]]].map(([lb,h,a])=>(
                <StatBar key={lb} label={lb} home={h} away={a} T={T}/>
              ))}
              <div style={{background:T.card2,borderRadius:12,padding:14,marginTop:10,display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                <div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:900,color:T.accent}}>{match.stats.xg[0]}</div><div style={{fontSize:10,color:T.sub,marginTop:2}}>{L?ht.name:ht.nameEn}</div></div>
                <div style={{fontSize:11,color:T.sub,fontWeight:700}}>xG</div>
                <div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:900,color:T.blue}}>{match.stats.xg[1]}</div><div style={{fontSize:10,color:T.sub,marginTop:2}}>{L?at.name:at.nameEn}</div></div>
              </div>
            </div>
          )}

          {tab==="lineup"&&match.lineup&&(
            <>
              <div style={{display:"flex",gap:8,marginBottom:14}}>
                {[["home",L?ht.name:ht.nameEn],["away",L?at.name:at.nameEn]].map(([k,lb])=>(
                  <button key={k} onClick={()=>setSide(k)} style={{flex:1,background:side===k?T.accent:T.card2,color:side===k?"#0a0f1e":T.sub,border:"none",borderRadius:10,padding:"9px 8px",fontSize:12,fontWeight:700,cursor:"pointer",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{lb}</button>
                ))}
              </div>
              <Pitch lineup={side==="home"?match.lineup.home:match.lineup.away} T={T} onPlayer={p=>setSelPlayer(p)}/>
              <div style={{marginTop:12,background:T.card,borderRadius:12,padding:"10px 14px"}}>
                <div style={{fontSize:11,color:T.sub,fontWeight:700,marginBottom:8}}>{L?"البدلاء":"Subs"}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {(side==="home"?match.lineup.home:match.lineup.away).subs.map((s,i)=>(
                    <div key={i} style={{background:T.card2,borderRadius:8,padding:"4px 10px",fontSize:11,color:T.text}}>{s}</div>
                  ))}
                </div>
              </div>
              <div style={{marginTop:10,background:T.card,borderRadius:12,padding:10}}>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {[["9+","#00e5a0",L?"ممتاز":"Excellent"],["7.5+","#4db8ff",L?"جيد جداً":"Very Good"],["7+","#fccb00",L?"جيد":"Good"],["<7","#ff4d4d",L?"ضعيف":"Poor"]].map(([r,c,lb])=>(
                    <div key={r} style={{display:"flex",alignItems:"center",gap:4,fontSize:10}}><div style={{width:9,height:9,borderRadius:3,background:c}}/><span style={{color:c,fontWeight:700}}>{r}</span><span style={{color:T.sub}}>{lb}</span></div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  MAIN APP
// ══════════════════════════════════════════
export default function FahimApp(){
  const [tab,setTab]=useState("home");
  const [dark,setDark]=useState(true);
  const [lang,setLang]=useState("ar");
  const [matchDetail,setMatchDetail]=useState(null);
  const [teamPage,setTeamPage]=useState(null);
  const [playerPage,setPlayerPage]=useState(null);
  const [toast,setToast]=useState(null);
  const [notifOn,setNotifOn]=useState(false);
  const [favorites,setFavorites]=useState(["real","lfc"]);
  const [points,setPoints]=useState(0);
  const [predictions,setPredictions]=useState([
    {id:1,home:"bay",away:"real",league:"CL",date:"الليلة 21:00",aiWin:"real",aiPercent:58,userPick:null,reasoning:"ريال يعشق دوري الأبطال وبايرن يفتقد كورس"},
    {id:2,home:"ars",away:"mci",league:"PL",date:"غداً 20:45",aiWin:"ars",aiPercent:52,userPick:null,reasoning:"آرسنال بدون هزيمة في ملعبه منذ ٩ مباريات"},
  ]);
  const [search,setSearch]=useState("");
  const [dateFilter,setDateFilter]=useState("all");
  const [leagueFilter,setLeagueFilter]=useState("all");
  const [liveMin,setLiveMin]=useState({5:67,8:23});
  const [standLeague,setStandLeague]=useState("PL");
  const [scorersLeague,setScorersLeague]=useState("all");
  const [wcGroup,setWcGroup]=useState("A");
  const [alertIdx,setAlertIdx]=useState(0);
  const T=dark?DARK:LIGHT;
  const L=lang==="ar";

  useEffect(()=>{
    const t=setInterval(()=>setLiveMin(p=>{const n={...p};Object.keys(n).forEach(id=>{if(n[id]<90)n[id]++;});return n;}),30000);
    return()=>clearInterval(t);
  },[]);

  useEffect(()=>{
    if(!notifOn) return;
    const t=setInterval(()=>setAlertIdx(i=>(i+1)%GOAL_ALERTS.length),8000);
    return()=>clearInterval(t);
  },[notifOn]);

  const showToast=useCallback(m=>setToast(m),[]);
  const openMatch=m=>setMatchDetail({...m,time:liveMin[m.id]?`${liveMin[m.id]}'`:m.time});
  const openTeam=id=>{setMatchDetail(null);setTeamPage(id);};
  const openPlayer=p=>{setTeamPage(null);setPlayerPage(p);};
  const toggleFav=id=>{const t=getTeam(id);setFavorites(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);showToast(favorites.includes(id)?`💔 ${L?t.name:t.nameEn}`:`❤️ ${L?t.name:t.nameEn}`);};
  const pick=(id,choice)=>{setPredictions(p=>p.map(x=>x.id===id?{...x,userPick:choice}:x));setPoints(p=>p+10);showToast(`🎯 "${choice}" — +١٠ نقاط!`);};

  const liveMatches=MATCHES_DATA.filter(m=>m.status==="IN_PLAY");
  const myMatches=MATCHES_DATA.filter(m=>favorites.some(f=>m.home===f||m.away===f));

  let filtered=MATCHES_DATA;
  if(search) filtered=filtered.filter(m=>{const ht=getTeam(m.home),at=getTeam(m.away);return[ht.name,ht.nameEn,at.name,at.nameEn].join(" ").toLowerCase().includes(search.toLowerCase());});
  if(dateFilter!=="all") filtered=filtered.filter(m=>m.date===dateFilter||m.date==="الآن");
  if(leagueFilter!=="all") filtered=filtered.filter(m=>m.league===leagueFilter);

  const scorers=scorersLeague==="all"?TOP_SCORERS:TOP_SCORERS.filter(s=>s.league===scorersLeague);
  const wcData=WC_GROUPS.find(g=>g.group===wcGroup);

  return(
    <div style={{direction:L?"rtl":"ltr",fontFamily:"'Segoe UI',Tahoma,Arial,sans-serif",background:T.bg,minHeight:"100vh",color:T.text,maxWidth:420,margin:"0 auto"}}>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}input::placeholder{color:#3a5a7a}::-webkit-scrollbar{width:0}*{box-sizing:border-box}`}</style>

      {toast&&<Toast msg={toast} onClose={()=>setToast(null)} T={T}/>}
      {matchDetail&&<MatchDetail match={matchDetail} onClose={()=>setMatchDetail(null)} T={T} lang={lang} showToast={showToast} onTeamOpen={openTeam}/>}
      {teamPage&&<TeamPage teamId={teamPage} onClose={()=>setTeamPage(null)} T={T} lang={lang} onMatchOpen={m=>{setTeamPage(null);openMatch(m);}} onPlayerOpen={openPlayer}/>}
      {playerPage&&<PlayerPage player={playerPage} onClose={()=>setPlayerPage(null)} T={T} lang={lang}/>}

      {/* HEADER */}
      <div style={{background:dark?"linear-gradient(135deg,#0a0f1e,#111e35)":T.card,padding:"14px 16px 0",position:"sticky",top:0,zIndex:100,borderBottom:`1px solid ${T.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div>
            <div style={{fontSize:20,fontWeight:900,color:T.accent}}>فاهم ⚽</div>
            <div style={{fontSize:9,color:T.sub,marginTop:1}}>{L?"تحليل كرة القدم بالذكاء الاصطناعي":"AI Football Analytics"}</div>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            {liveMatches.length>0&&<div style={{background:"#ff4d4d15",border:"1px solid #ff4d4d40",borderRadius:16,padding:"4px 9px",fontSize:10,color:T.live,fontWeight:800,display:"flex",alignItems:"center",gap:4}}><div style={{width:5,height:5,borderRadius:"50%",background:T.live,animation:"blink 1s infinite"}}/>{liveMatches.length}</div>}
            <button onClick={()=>setLang(l=>l==="ar"?"en":"ar")} style={{background:T.card2,border:`1px solid ${T.border}`,borderRadius:14,padding:"5px 8px",fontSize:11,color:T.sub,cursor:"pointer",fontWeight:700}}>{L?"EN":"ع"}</button>
            <button onClick={()=>setDark(d=>!d)} style={{background:T.card2,border:`1px solid ${T.border}`,borderRadius:14,padding:"5px 8px",fontSize:13,cursor:"pointer"}}>{dark?"☀️":"🌙"}</button>
            <button onClick={()=>{setNotifOn(p=>!p);showToast(notifOn?L?"🔕 إيقاف":"🔕 Off":L?"🔔 تفعيل":"🔔 On");}} style={{background:notifOn?T.accent+"20":T.card2,border:`1px solid ${notifOn?T.accent:T.border}`,borderRadius:14,padding:"5px 8px",fontSize:13,cursor:"pointer"}}>{notifOn?"🔔":"🔕"}</button>
          </div>
        </div>
        <div style={{display:"flex",overflowX:"auto",scrollbarWidth:"none"}}>
          {[["home",L?"🏠 الرئيسية":"🏠 Home"],["matches",L?"📅 مباريات":"📅 Matches"],["leagues",L?"🏆 ترتيب":"🏆 Leagues"],["scorers",L?"👟 هدافون":"👟 Scorers"],["predict",L?"🎯 توقعات":"🎯 Predict"],["wc",L?"🌍 مونديال":"🌍 WC"],["profile",L?"👤 حسابي":"👤 Profile"]].map(([k,lb])=>(
            <button key={k} onClick={()=>setTab(k)} style={{flex:"0 0 auto",background:"none",border:"none",color:tab===k?T.accent:T.sub,fontSize:10,fontWeight:tab===k?800:400,padding:"8px 10px",cursor:"pointer",borderBottom:tab===k?`2px solid ${T.accent}`:"2px solid transparent",whiteSpace:"nowrap"}}>{lb}</button>
          ))}
        </div>
      </div>

      <div style={{padding:16}}>

        {/* HOME */}
        {tab==="home"&&(
          <>
            {notifOn&&(
              <div style={{background:"#ff4d4d10",border:"1px solid #ff4d4d30",borderRadius:12,padding:"9px 14px",marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:T.live,animation:"blink 1s infinite",flexShrink:0}}/>
                <div style={{flex:1,fontSize:12,color:T.text}}>{GOAL_ALERTS[alertIdx]}</div>
              </div>
            )}
            {liveMatches.length>0&&(
              <div style={{marginBottom:16}}>
                <div style={{fontSize:11,color:T.live,fontWeight:800,marginBottom:10,display:"flex",alignItems:"center",gap:6}}><div style={{width:7,height:7,borderRadius:"50%",background:T.live,animation:"blink 1s infinite"}}/>{L?"مباشر الآن":"Live Now"}</div>
                {liveMatches.map(m=><MatchRow key={m.id} m={m} onOpen={openMatch} T={T} lang={lang} liveMin={liveMin}/>)}
              </div>
            )}
            {myMatches.filter(m=>m.status!=="IN_PLAY").length>0&&(
              <div style={{marginBottom:16}}>
                <div style={{fontSize:11,color:"#ff6060",fontWeight:700,marginBottom:10}}>❤️ {L?"فرقي المفضلة":"My Teams"}</div>
                {myMatches.filter(m=>m.status!=="IN_PLAY").map(m=><MatchRow key={m.id} m={m} onOpen={openMatch} T={T} lang={lang} liveMin={liveMin}/>)}
              </div>
            )}
            <div style={{background:`linear-gradient(135deg,${T.accent}12,${T.blue}08)`,border:`1px solid ${T.accent}25`,borderRadius:16,padding:16,marginBottom:16}}>
              <div style={{fontSize:10,color:T.accent,fontWeight:800,marginBottom:8}}>🔥 {L?"أبرز تحليل اليوم":"Top Analysis"}</div>
              <div style={{fontSize:15,fontWeight:800,marginBottom:6,color:T.text}}>{L?"الكلاسيكو — تعادل مثير في برنابيو":"El Clásico — Thrilling draw at Bernabéu"}</div>
              <div style={{fontSize:12,color:T.sub,lineHeight:1.7,marginBottom:12}}>{L?"يامال ١٧ عاماً يُسوّي في الدقيقة ٨٨ ويحرم ريال من الفوز":"Yamal 17 equalizes in 88' to deny Real Madrid"}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button onClick={()=>openMatch(MATCHES_DATA[0])} style={{flex:1,background:T.accent,color:"#0a0f1e",border:"none",borderRadius:10,padding:"9px 12px",fontSize:12,fontWeight:800,cursor:"pointer"}}>{L?"اقرأ التحليل ←":"Read Analysis ←"}</button>
                <button onClick={()=>setTeamPage("real")} style={{background:T.card2,border:`1px solid ${T.border}`,borderRadius:10,padding:"9px 12px",fontSize:12,color:T.sub,cursor:"pointer"}}>⚪ {L?"ريال":"Real"}</button>
                <button onClick={()=>setTeamPage("barca")} style={{background:T.card2,border:`1px solid ${T.border}`,borderRadius:10,padding:"9px 12px",fontSize:12,color:T.sub,cursor:"pointer"}}>🔵 {L?"برشلونة":"Barça"}</button>
              </div>
            </div>
            <div style={{fontSize:11,color:T.sub,fontWeight:700,marginBottom:10}}>📰 {L?"آخر الأخبار":"Latest News"}</div>
            {NEWS.map(n=>(
              <div key={n.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"12px 14px",marginBottom:8,display:"flex",gap:12,alignItems:"center"}}>
                <span style={{fontSize:22,flexShrink:0}}>{n.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:600,color:T.text,lineHeight:1.5}}>{L?n.title:n.titleEn}</div>
                  <div style={{fontSize:10,color:T.sub,marginTop:3}}>{n.time}</div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* MATCHES */}
        {tab==="matches"&&(
          <>
            <div style={{position:"relative",marginBottom:12}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={L?"🔍 ابحث عن فريق...":"🔍 Search team..."}
                style={{width:"100%",background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 14px",color:T.text,fontSize:13,outline:"none",direction:L?"rtl":"ltr"}}/>
              {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",[L?"left":"right"]:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:T.sub,cursor:"pointer",fontSize:16}}>✕</button>}
            </div>
            <div style={{display:"flex",gap:8,marginBottom:10,overflowX:"auto",scrollbarWidth:"none"}}>
              {[["all",L?"الكل":"All"],["أمس",L?"أمس":"Yesterday"],["اليوم",L?"اليوم":"Today"],["غداً",L?"غداً":"Tomorrow"]].map(([k,lb])=>(
                <button key={k} onClick={()=>setDateFilter(k)} style={{flex:"0 0 auto",background:dateFilter===k?T.accent:T.card2,color:dateFilter===k?"#0a0f1e":T.sub,border:"none",borderRadius:20,padding:"6px 14px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{lb}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:8,marginBottom:14,overflowX:"auto",scrollbarWidth:"none"}}>
              <button onClick={()=>setLeagueFilter("all")} style={{flex:"0 0 auto",background:leagueFilter==="all"?T.accent:T.card,border:`1px solid ${T.border}`,color:leagueFilter==="all"?"#0a0f1e":T.sub,borderRadius:20,padding:"5px 12px",fontSize:10,fontWeight:700,cursor:"pointer"}}>{L?"الكل":"All"}</button>
              {LEAGUES_LIST.map(lg=>(
                <button key={lg.id} onClick={()=>setLeagueFilter(lg.id)} style={{flex:"0 0 auto",background:leagueFilter===lg.id?T.accent:T.card,border:`1px solid ${T.border}`,color:leagueFilter===lg.id?"#0a0f1e":T.sub,borderRadius:20,padding:"5px 12px",fontSize:10,fontWeight:700,cursor:"pointer"}}>{lg.flag}</button>
              ))}
            </div>
            {filtered.map(m=><MatchRow key={m.id} m={m} onOpen={openMatch} T={T} lang={lang} liveMin={liveMin}/>)}
            {filtered.length===0&&<div style={{textAlign:"center",color:T.sub,padding:30,fontSize:13}}>{L?"لا توجد نتائج":"No results"}</div>}
          </>
        )}

        {/* LEAGUES */}
        {tab==="leagues"&&(
          <>
            <div style={{fontSize:14,fontWeight:800,marginBottom:14,color:T.text}}>🏆 {L?"الترتيب":"Standings"}</div>
            <div style={{display:"flex",gap:8,marginBottom:14,overflowX:"auto",scrollbarWidth:"none"}}>
              {Object.keys(STANDINGS_DATA).map(id=>{const lg=getLg(id);return(
                <button key={id} onClick={()=>setStandLeague(id)} style={{flex:"0 0 auto",background:standLeague===id?T.accent:T.card2,color:standLeague===id?"#0a0f1e":T.sub,border:"none",borderRadius:20,padding:"7px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{lg.flag} {L?lg.name:lg.nameEn}</button>
              );})}
            </div>
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,overflow:"hidden"}}>
              <div style={{display:"flex",padding:"10px 14px",borderBottom:`1px solid ${T.border}`,fontSize:10,color:T.sub,fontWeight:700}}>
                <span style={{width:22}}>#</span><span style={{flex:1}}>{L?"الفريق":"Team"}</span>
                <span style={{width:22,textAlign:"center"}}>W</span><span style={{width:22,textAlign:"center"}}>D</span><span style={{width:22,textAlign:"center"}}>L</span>
                <span style={{width:28,textAlign:"center",color:T.accent}}>GD</span>
                <span style={{width:40,textAlign:"center"}}>{L?"شكل":"Form"}</span>
                <span style={{width:26,textAlign:"center",color:T.accent}}>{L?"نق":"Pts"}</span>
              </div>
              {STANDINGS_DATA[standLeague].map((s,i)=>{
                const team=getTeam(s.teamId);
                return(
                  <div key={s.pos} onClick={()=>setTeamPage(s.teamId)} style={{display:"flex",alignItems:"center",padding:"11px 14px",borderBottom:`1px solid ${T.border+"50"}`,background:i<4?`${T.accent}06`:"transparent",cursor:"pointer"}}>
                    <span style={{width:22,fontSize:12,color:i<4?T.accent:T.sub,fontWeight:800}}>{s.pos}</span>
                    <div style={{flex:1,display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:16}}>{team.crest}</span><span style={{fontSize:12,fontWeight:600,color:T.text}}>{L?team.name:team.nameEn}</span></div>
                    <span style={{width:22,textAlign:"center",fontSize:11,color:T.sub}}>{s.w}</span>
                    <span style={{width:22,textAlign:"center",fontSize:11,color:T.sub}}>{s.d}</span>
                    <span style={{width:22,textAlign:"center",fontSize:11,color:T.sub}}>{s.l}</span>
                    <span style={{width:28,textAlign:"center",fontSize:11,color:s.gd>0?T.accent:s.gd<0?T.live:T.sub,fontWeight:700}}>{s.gd>0?"+":""}{s.gd}</span>
                    <div style={{width:40,display:"flex",gap:2,justifyContent:"center"}}>{s.form.map((r,j)=><div key={j} style={{width:7,height:7,borderRadius:"50%",background:fc(r)}}/>)}</div>
                    <span style={{width:26,textAlign:"center",fontSize:14,fontWeight:900,color:T.text}}>{s.pts}</span>
                  </div>
                );
              })}
            </div>
            <div style={{fontSize:10,color:T.sub,marginTop:8,textAlign:"center"}}>🟢 {L?"مؤهل لدوري الأبطال · اضغط لصفحة الفريق":"UCL · Tap for team page"}</div>
          </>
        )}

        {/* SCORERS */}
        {tab==="scorers"&&(
          <>
            <div style={{fontSize:14,fontWeight:800,marginBottom:14,color:T.text}}>👟 {L?"الهدافون وصانعو الأهداف":"Top Scorers & Assists"}</div>
            <div style={{display:"flex",gap:8,marginBottom:14,overflowX:"auto",scrollbarWidth:"none"}}>
              {[["all",L?"الكل":"All"],["PL","🏴󠁧󠁢󠁥󠁮󠁧󠁿"],["LL","🇪🇸"],["CL","⭐"]].map(([k,lb])=>(
                <button key={k} onClick={()=>setScorersLeague(k)} style={{flex:"0 0 auto",background:scorersLeague===k?T.accent:T.card2,color:scorersLeague===k?"#0a0f1e":T.sub,border:"none",borderRadius:20,padding:"6px 14px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{lb}</button>
              ))}
            </div>
            {scorers.map((s,i)=>{
              const p=PLAYERS[s.playerId];if(!p)return null;
              const team=getTeam(p.team);
              return(
                <div key={s.playerId} onClick={()=>setPlayerPage(p)} style={{background:T.card,border:`1px solid ${i===0?T.accent+"60":T.border}`,borderRadius:14,padding:"13px 14px",marginBottom:9,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:28,textAlign:"center",fontSize:15,fontWeight:900,color:i===0?T.gold:i===1?"#aaa":i===2?"#cd7f32":T.sub}}>{i+1}</div>
                  <div style={{width:42,height:42,borderRadius:"50%",background:`linear-gradient(135deg,${rc(p.rating)}22,${T.card2})`,border:`2px solid ${rc(p.rating)}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{p.nationality}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:T.text}}>{L?p.name:p.nameEn}</div>
                    <div style={{fontSize:11,color:T.sub,marginTop:2}}>{team.crest} {L?team.name:team.nameEn}</div>
                  </div>
                  <div style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:900,color:T.accent}}>{s.goals}</div><div style={{fontSize:9,color:T.sub}}>{L?"هدف":"G"}</div></div>
                  <div style={{textAlign:"center",marginLeft:8}}><div style={{fontSize:16,fontWeight:700,color:T.blue}}>{s.assists}</div><div style={{fontSize:9,color:T.sub}}>{L?"تمريرة":"A"}</div></div>
                </div>
              );
            })}
          </>
        )}

        {/* PREDICT */}
        {tab==="predict"&&(
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div><div style={{fontSize:15,fontWeight:800,color:T.text}}>🎯 {L?"توقعات المباريات":"Predictions"}</div><div style={{fontSize:11,color:T.sub,marginTop:2}}>{L?"توقّع وجمّع نقاطك":"Predict & earn points"}</div></div>
              <div style={{background:`${T.accent}18`,border:`1px solid ${T.accent}30`,borderRadius:14,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:900,color:T.accent}}>{points}</div>
                <div style={{fontSize:9,color:T.sub}}>{L?"نقطة":"pts"}</div>
              </div>
            </div>
            {predictions.map(p=>{
              const ht=getTeam(p.home),at=getTeam(p.away),lg=getLg(p.league);
              return(
                <div key={p.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,padding:16,marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                    <span style={{fontSize:10,color:T.accent,fontWeight:700}}>{lg.flag} {L?lg.name:lg.nameEn}</span>
                    <span style={{fontSize:10,color:T.sub}}>{p.date}</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <div style={{textAlign:"center",flex:1}}><div style={{fontSize:28,marginBottom:4}}>{ht.crest}</div><div style={{fontSize:12,fontWeight:700,color:T.text}}>{L?ht.name:ht.nameEn}</div></div>
                    <div style={{fontSize:13,color:T.sub,fontWeight:700}}>VS</div>
                    <div style={{textAlign:"center",flex:1}}><div style={{fontSize:28,marginBottom:4}}>{at.crest}</div><div style={{fontSize:12,fontWeight:700,color:T.text}}>{L?at.name:at.nameEn}</div></div>
                  </div>
                  <div style={{background:T.card2,borderRadius:10,padding:"10px 12px",marginBottom:12}}>
                    <div style={{fontSize:10,color:T.sub,marginBottom:4}}>🤖 {L?"رأي الذكاء الاصطناعي":"AI Prediction"}</div>
                    <div style={{fontSize:12,color:T.text,lineHeight:1.6,marginBottom:6}}>{p.reasoning}</div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{flex:1,background:T.border,borderRadius:6,height:5,overflow:"hidden"}}><div style={{height:"100%",width:`${p.aiPercent}%`,background:T.accent,borderRadius:6}}/></div>
                      <span style={{fontSize:11,color:T.accent,fontWeight:800,whiteSpace:"nowrap"}}>{L?getTeam(p.aiWin).name:getTeam(p.aiWin).nameEn} {p.aiPercent}%</span>
                    </div>
                  </div>
                  {p.userPick
                    ?<div style={{textAlign:"center",padding:10,background:`${T.accent}10`,border:`1px solid ${T.accent}25`,borderRadius:10,fontSize:13,color:T.accent,fontWeight:700}}>✅ {L?"توقعك:":"Your pick:"} {p.userPick}</div>
                    :<div style={{display:"flex",gap:8}}>
                      {[L?ht.name:ht.nameEn,L?"تعادل":"Draw",L?at.name:at.nameEn].map(o=>(
                        <button key={o} onClick={()=>pick(p.id,o)} style={{flex:1,background:T.card2,border:`1px solid ${T.border}`,borderRadius:10,padding:"9px 4px",color:T.text,fontSize:11,fontWeight:600,cursor:"pointer"}}>{o}</button>
                      ))}
                    </div>}
                </div>
              );
            })}
          </>
        )}

        {/* WORLD CUP */}
        {tab==="wc"&&(
          <>
            <div style={{background:"linear-gradient(135deg,#1a082e,#080f30)",border:"1px solid #4a2a7a",borderRadius:18,padding:18,marginBottom:20,textAlign:"center"}}>
              <div style={{fontSize:36,marginBottom:6}}>🌍🏆</div>
              <div style={{fontSize:18,fontWeight:900,color:"#e0c0ff"}}>{L?"كأس العالم 2026":"World Cup 2026"}</div>
              <div style={{fontSize:11,color:"#8a6aaa",marginTop:4}}>{L?"الولايات المتحدة · كندا · المكسيك":"USA · Canada · Mexico"}</div>
              <div style={{display:"flex",justifyContent:"center",gap:10,marginTop:14,flexWrap:"wrap"}}>
                {[["٤٨",L?"فريقاً":"Teams"],["١٠٤",L?"مباراة":"Matches"],["١٦",L?"مدينة":"Cities"]].map(([n,lb])=>(
                  <div key={lb} style={{background:"#4a2a7a25",border:"1px solid #4a2a7a50",borderRadius:10,padding:"8px 14px",textAlign:"center"}}><div style={{fontSize:18,fontWeight:900,color:"#c090ff"}}>{n}</div><div style={{fontSize:9,color:"#8a6aaa"}}>{lb}</div></div>
                ))}
              </div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
              {WC_GROUPS.map(g=>(
                <button key={g.group} onClick={()=>setWcGroup(g.group)} style={{background:wcGroup===g.group?"#c090ff":T.card2,color:wcGroup===g.group?"#0a0f1e":T.sub,border:"none",borderRadius:20,padding:"7px 16px",fontSize:12,fontWeight:700,cursor:"pointer"}}>{L?"المجموعة":"Group"} {g.group}</button>
              ))}
            </div>
            {wcData&&(
              <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,overflow:"hidden"}}>
                <div style={{display:"flex",padding:"10px 16px",borderBottom:`1px solid ${T.border}`,fontSize:10,color:T.sub,fontWeight:700}}>
                  <span style={{flex:1}}>{L?"المنتخب":"Team"}</span>
                  <span style={{width:26,textAlign:"center"}}>W</span><span style={{width:26,textAlign:"center"}}>D</span><span style={{width:26,textAlign:"center"}}>L</span>
                  <span style={{width:28,textAlign:"center"}}>GF</span><span style={{width:28,textAlign:"center"}}>GA</span>
                  <span style={{width:30,textAlign:"center",color:"#c090ff"}}>{L?"نق":"Pts"}</span>
                </div>
                {[...wcData.teams].sort((a,b)=>b.pts-a.pts).map((t,i)=>(
                  <div key={t.name} style={{display:"flex",alignItems:"center",padding:"13px 16px",borderBottom:`1px solid ${T.border+"40"}`,background:i<2?"#c090ff06":"transparent"}}>
                    <div style={{flex:1,display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:20}}>{t.flag}</span><span style={{fontSize:13,fontWeight:600,color:T.text}}>{t.name}</span>{i<2&&<span style={{fontSize:9,color:"#c090ff",background:"#c090ff15",padding:"2px 7px",borderRadius:8}}>{L?"متأهل":"Q"}</span>}</div>
                    <span style={{width:26,textAlign:"center",fontSize:11,color:T.sub}}>{t.w}</span>
                    <span style={{width:26,textAlign:"center",fontSize:11,color:T.sub}}>{t.d}</span>
                    <span style={{width:26,textAlign:"center",fontSize:11,color:T.sub}}>{t.l}</span>
                    <span style={{width:28,textAlign:"center",fontSize:11,color:T.sub}}>{t.gf}</span>
                    <span style={{width:28,textAlign:"center",fontSize:11,color:T.sub}}>{t.ga}</span>
                    <span style={{width:30,textAlign:"center",fontSize:15,fontWeight:900,color:i<2?"#c090ff":T.text}}>{t.pts}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* PROFILE */}
        {tab==="profile"&&(
          <>
            <div style={{textAlign:"center",padding:"10px 0 20px"}}>
              <div style={{width:72,height:72,borderRadius:"50%",background:`linear-gradient(135deg,${T.accent},${T.blue})`,margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32}}>⚽</div>
              <div style={{fontSize:17,fontWeight:800,color:T.text}}>{L?"لاعب فاهم":"Fahim Fan"}</div>
              <div style={{fontSize:11,color:T.sub,marginTop:3}}>🌟 {L?"عضو جديد":"New Member"}</div>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
              {[[L?"نقاطي":"Points","🎯",points],[L?"توقعات":"Picks","✅",predictions.filter(p=>p.userPick).length],[L?"مفضلة":"Favs","❤️",favorites.length]].map(([lb,ic,v])=>(
                <div key={lb} style={{flex:1,background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"12px 8px",textAlign:"center"}}>
                  <div style={{fontSize:20}}>{ic}</div><div style={{fontSize:18,fontWeight:900,color:T.accent,marginTop:4}}>{v}</div><div style={{fontSize:9,color:T.sub,marginTop:2}}>{lb}</div>
                </div>
              ))}
            </div>
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,padding:16,marginBottom:14}}>
              <div style={{fontSize:12,color:T.sub,fontWeight:700,marginBottom:12}}>❤️ {L?"فرقي المفضلة":"My Teams"}</div>
              {Object.values(TEAMS).map(team=>(
                <div key={team.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${T.border}`,cursor:"pointer"}} onClick={()=>setTeamPage(team.id)}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:20}}>{team.crest}</span>
                    <div><div style={{fontSize:13,fontWeight:600,color:T.text}}>{L?team.name:team.nameEn}</div><div style={{fontSize:10,color:T.sub}}>{getLg(team.league)[L?"name":"nameEn"]}</div></div>
                  </div>
                  <button onClick={e=>{e.stopPropagation();toggleFav(team.id);}} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>{favorites.includes(team.id)?"❤️":"🤍"}</button>
                </div>
              ))}
            </div>
            <button style={{width:"100%",background:`linear-gradient(135deg,${T.accent},${T.blue})`,color:"#0a0f1e",border:"none",borderRadius:14,padding:14,fontSize:14,fontWeight:800,cursor:"pointer",marginBottom:10}}>{L?"إنشاء حساب":"Create Account"}</button>
            <button style={{width:"100%",background:"none",border:`1px solid ${T.border}`,borderRadius:14,padding:14,fontSize:14,color:T.sub,cursor:"pointer"}}>{L?"تسجيل دخول":"Sign In"}</button>
          </>
        )}
      </div>
      <div style={{height:20}}/>
    </div>
  );
}
