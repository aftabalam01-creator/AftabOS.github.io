'use strict';

/* ══════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════ */
const T = {
  en: {
    dir:'ltr', flag:'🇺🇸', code:'EN',
    navServices:'Services', navWork:'Our Work', navAbout:'About', navContact:'Contact', navCta:'Contact Us',
    heroHeadline:'We Build the Digital Infrastructure of Afghanistan',
    heroSub:'Enterprise ERP systems, AI-powered platforms, and multilingual marketplaces — engineered for Afghan businesses, built to global standards.',
    heroCta1:'Explore Our Work', heroCta2:'Get in Touch',
    heroTrust:'Miami, Florida, USA', heroTrust2:'Kabul, Afghanistan', heroTrust3:'Est. 2024',
    scrollLabel:'Scroll',
    servicesEyebrow:'Our Services', servicesHeading:'What We Build',
    servicesSub:'End-to-end digital solutions — from enterprise architecture to market-ready products — designed for the Afghan market and engineered to international standards.',
    s1title:'ERP & Logistics Systems', s1desc:'Custom enterprise resource planning systems for freight, cargo, and logistics operations. We build the software backbone that runs cross-border trade routes.',
    s2title:'Digital Marketplaces', s2desc:'Full-stack multilingual e-commerce platforms that connect buyers and sellers in the Afghan market. Built for scale, built for real users.',
    s3title:'Business Web Applications', s3desc:'High-performance professional websites and web applications for Afghan restaurants, businesses, and service companies — designed to convert.',
    s4title:'AI-Powered Tools', s4desc:'Intelligent automation and AI-driven assistants that help Afghan businesses operate smarter — from WhatsApp knowledge agents to process automation.',
    s5title:'Cybersecurity & Systems', s5desc:'Security audits, RLS policy design, and application hardening for Afghan digital businesses. We build secure systems from the ground up.',
    workEyebrow:'Featured Work', workHeading:'Our Projects',
    workSub:'A selection of systems and platforms we have designed, built, and delivered.',
    p1name:'Silk Road Overland ERP', p1desc:'Freight and logistics ERP system built for cross-border China-to-Afghanistan cargo operations. Covers shipment tracking, invoicing, warehouse management, and customs documentation.', p1status:'In Development',
    p2name:'Baazar Chawk', p2desc:"Afghanistan's first trilingual digital marketplace (English, Dari, Pashto) with integrated Mandawi wholesale functionality, digitizing Kabul's traditional Saray merchants.", p2status:'Live',
    p3name:'AFIYAT Restaurant', p3desc:'Luxury digital presence and web application for a premium Kabul dining establishment. World-class design, Afghan elegance.', p3status:'Delivered',
    whyEyebrow:'Why Choose Us', whyHeading:'The AftabOS Difference',
    whySub:'We bring American engineering discipline to the Afghan market — and we understand both worlds from the inside.',
    w1num:'01', w1title:'American-Trained Engineering', w1desc:'Founded and led by a U.S.-educated computer scientist, Honors, Summa Cum Laude, Barry University, Miami — trained to the standard of Silicon Valley, building for Afghanistan.',
    w2num:'02', w2title:'Afghan-First', w2desc:'Every product is designed for Afghan users, Afghan languages, and Afghan business realities. We understand this market from the inside.',
    w3num:'03', w3title:'End-to-End Delivery', w3desc:'From system architecture and security audit to deployment and long-term support — we own the full lifecycle of every product we build.',
    founderLabel:'About Our Founder', founderName:'Aftab Alam Masjidi', founderTitle:'Founder & Technical Lead',
    founderBio:"Aftab Alam Masjidi founded AftabOS after completing a Bachelor of Science in Computer Science, Honors, Summa Cum Laude at Barry University in Miami, Florida, where he was awarded the Stamps Scholarship — the university's highest merit distinction. Trained in AI, cybersecurity, and full-stack systems engineering, Aftab returned his expertise to the Afghan market, building enterprise-grade software for a region that has long been underserved by modern technology. AftabOS operates from both Miami and Kabul, combining American engineering discipline with deep Afghan market knowledge.",
    founderCred:'Stamps Scholar · Barry University Miami · Summa Cum Laude',
    testEyebrow:'What Our Clients Say', testHeading:'Trusted by Afghan Businesses',
    testSub:'From Kabul freight offices to Mandawi market stalls — businesses across Afghanistan trust AftabOS to build their digital infrastructure.',
    t1quote:'We had tried other local developers before AftabOS. The difference was immediately clear — this was not a small freelance job. Aftab and his team delivered a system that actually handles our China shipments end to end. Professional from day one.',
    t1name:'Khalid Rahimi', t1role:'Director, Rahimi Cargo & Freight, Kabul',
    t2quote:'I was skeptical that an online platform could work for our saray business. Baazar Chawk changed my mind completely. My customers now browse and order without coming to the market every time. It is built in Dari, it works on any phone, and the support has been excellent.',
    t2name:'Bilal Sultani', t2role:'Founder, Sultani Dry Goods, Mandawi Market, Kabul',
    t3quote:'We wanted a website that matched the quality of our restaurant — something that felt world-class. AftabOS delivered exactly that. Our guests comment on the website before they even arrive. It is elegant, fast, and nothing like anything else in Kabul.',
    t3name:'Omid Karimi', t3role:'Managing Director, AFIYAT Restaurant, Kabul',
    contactEyebrow:'Work With Us', contactHeading:'Ready to build something exceptional?',
    contactSub:"Whether you need an ERP system, a digital marketplace, or a world-class business website — let's talk. We work with clients across Afghanistan, the region, and internationally.",
    fNameLabel:'Full Name', fNamePlaceholder:'Your full name',
    fCompanyLabel:'Company Name', fCompanyPlaceholder:'Your company or organization',
    fEmailLabel:'Email Address', fEmailPlaceholder:'you@company.com',
    fPhoneLabel:'Phone / WhatsApp (Optional)', fPhonePlaceholder:'+93 or international number',
    fServiceLabel:'Service Interested In', fServiceDefault:'Select a service...',
    fService1:'ERP & Logistics System', fService2:'Digital Marketplace', fService3:'Business Website',
    fService4:'AI Tools & Automation', fService5:'Cybersecurity & Systems', fService6:'Other / Not Sure',
    fMessageLabel:"Tell us what you're building", fMessagePlaceholder:'Describe your project, timeline, and any specific requirements...',
    fSubmit:'Send Message', fSuccessTitle:'Message Received',
    fSuccessMsg:'Thank you, {name}. Your message has been received. We will be in touch within 24 hours.',
    fErrRequired:'This field is required', fErrEmail:'Please enter a valid email address', fErrService:'Please select a service',
    contactInfoTitle:'Get in Touch Directly',
    labelEmail:'Email', labelPhone:'Phone', labelWhatsApp:'WhatsApp', labelMiami:'Miami Office', labelKabul:'Kabul Office',
    waNote:'Message us on WhatsApp — please mention AftabOS.com in your first message',
    responseNote:'Inquiries received via this website are typically responded to within 24 hours.',
    footerTagline:"Engineering Afghanistan's Digital Future — from Miami to Kabul.",
    footerNav:'Navigation', footerLocations:'Locations', footerCopy:'© 2025 AftabOS. All rights reserved.', footerLang:'Language',
  },

  fa: {
    dir:'rtl', flag:'🇦🇫', code:'دری',
    navServices:'خدمات', navWork:'کارهای ما', navAbout:'درباره ما', navContact:'تماس', navCta:'تماس با ما',
    heroHeadline:'ما زیرساخت دیجیتال افغانستان را می‌سازیم',
    heroSub:'سیستم‌های ERP سازمانی، پلتفرم‌های هوش مصنوعی، و بازارهای چندزبانه — مهندسی‌شده برای کسب‌وکارهای افغان، ساخته‌شده با استانداردهای جهانی.',
    heroCta1:'مشاهده کارهای ما', heroCta2:'تماس بگیرید',
    heroTrust:'میامی، فلوریدا، آمریکا', heroTrust2:'کابل، افغانستان', heroTrust3:'تأسیس ۲۰۲۴',
    scrollLabel:'پایین',
    servicesEyebrow:'خدمات ما', servicesHeading:'چه می‌سازیم',
    servicesSub:'راه‌حل‌های دیجیتال کامل — از معماری سازمانی تا محصولات آماده بازار — طراحی‌شده برای بازار افغانستان و مهندسی‌شده با استانداردهای بین‌المللی.',
    s1title:'سیستم‌های ERP و لجستیک', s1desc:'سیستم‌های ERP سفارشی برای عملیات باربری، کارگو و لجستیک. نرم‌افزار اصلی مسیرهای تجاری فرامرزی را ما می‌سازیم.',
    s2title:'بازارهای دیجیتال', s2desc:'پلتفرم‌های چندزبانه که خریداران و فروشندگان بازار افغانستان را به هم متصل می‌کنند. ساخته‌شده برای مقیاس، برای کاربران واقعی.',
    s3title:'برنامه‌های وب تجاری', s3desc:'وب‌سایت‌های حرفه‌ای پرکارایی برای رستوران‌ها، کسب‌وکارها و شرکت‌های خدماتی افغان — طراحی‌شده برای جذب مشتری.',
    s4title:'ابزارهای هوش مصنوعی', s4desc:'اتوماسیون هوشمند و دستیارهای هوش مصنوعی که به کسب‌وکارهای افغان کمک می‌کنند هوشمندانه‌تر فعالیت کنند.',
    s5title:'امنیت سایبری و سیستم‌ها', s5desc:'ممیزی‌های امنیتی، طراحی سیاست RLS و سخت‌سازی برنامه برای کسب‌وکارهای دیجیتال افغان. سیستم‌های ایمن را از ابتدا می‌سازیم.',
    workEyebrow:'کارهای برجسته', workHeading:'پروژه‌های ما',
    workSub:'نمونه‌ای از سیستم‌ها و پلتفرم‌هایی که طراحی، ساخت و تحویل داده‌ایم.',
    p1name:'سیستم ERP جاده ابریشم', p1desc:'سیستم ERP باربری و لجستیک برای عملیات کارگوی فرامرزی چین به افغانستان. شامل ردیابی محموله، صورتحساب، مدیریت انبار و مستندات گمرکی.', p1status:'در حال توسعه',
    p2name:'بازار چوک', p2desc:'اولین بازار دیجیتال سه‌زبانه افغانستان با قابلیت عمده‌فروشی مندوی، که تجار سنتی سرای کابل را دیجیتالی می‌کند.', p2status:'آنلاین',
    p3name:'رستوران عافیت', p3desc:'حضور دیجیتال لوکس و اپلیکیشن وب برای یک رستوران ممتاز در کابل. طراحی جهانی، ظرافت افغانی.', p3status:'تحویل داده‌شده',
    whyEyebrow:'چرا ما را انتخاب کنید', whyHeading:'تفاوت افتاب‌اُس',
    whySub:'ما انضباط مهندسی آمریکایی را به بازار افغانستان می‌آوریم — و هر دو دنیا را از درون می‌شناسیم.',
    w1num:'۰۱', w1title:'مهندسی آموزش‌دیده آمریکایی', w1desc:'تأسیس‌شده توسط متخصص علوم کامپیوتر با تحصیلات آمریکایی، با افتخار سوما کام لاود از دانشگاه بری میامی — آموزش‌دیده با استاندارد سیلیکون‌ولی.',
    w2num:'۰۲', w2title:'اول افغانستان', w2desc:'هر محصول برای کاربران افغان، زبان‌های افغانی و واقعیت‌های کسب‌وکار افغانی طراحی شده است. ما این بازار را از درون می‌شناسیم.',
    w3num:'۰۳', w3title:'تحویل کامل', w3desc:'از معماری سیستم و ممیزی امنیتی تا استقرار و پشتیبانی بلندمدت — ما چرخه کامل هر محصولی را در اختیار داریم.',
    founderLabel:'درباره بنیان‌گذار', founderName:'آفتاب عالم مسجدی', founderTitle:'بنیان‌گذار و رهبر فنی',
    founderBio:'آفتاب عالم مسجدی پس از اخذ مدرک لیسانس علوم کامپیوتر با افتخار سوما کام لاود از دانشگاه بری در میامی، افتاب‌اُس را تأسیس کرد. او بورسیه استمپس — بالاترین افتخار دانشگاهی — را دریافت کرد. آفتاب با تخصص در هوش مصنوعی، امنیت سایبری و مهندسی سیستم‌های کامل، تخصص خود را به بازار افغانستان بازگرداند و نرم‌افزار درجه سازمانی می‌سازد.',
    founderCred:'بورسیه استمپس · دانشگاه بری میامی · سوما کام لاود',
    testEyebrow:'نظرات مشتریان', testHeading:'مورد اعتماد کسب‌وکارهای افغانی',
    testSub:'از دفاتر باربری کابل تا غرفه‌های بازار مندوی — کسب‌وکارهای سراسر افغانستان به افتاب‌اُس اعتماد می‌کنند.',
    t1quote:'قبل از افتاب‌اُس توسعه‌دهندگان دیگری را امتحان کرده بودیم. تفاوت فوری بود. آفتاب و تیمش سیستمی تحویل دادند که واقعاً محموله‌های چینی ما را از ابتدا تا انتها مدیریت می‌کند. از روز اول حرفه‌ای.',
    t1name:'خالد رحیمی', t1role:'مدیر، رحیمی کارگو و باربری، کابل',
    t2quote:'من شک داشتم که یک پلتفرم آنلاین بتواند برای کسب‌وکار سرای ما کار کند. بازار چوک نظرم را کاملاً تغییر داد. مشتریانم حالا بدون آمدن به بازار مرور و سفارش می‌دهند.',
    t2name:'بلال سلطانی', t2role:'بنیان‌گذار، سلطانی کالای خشک، بازار مندوی، کابل',
    t3quote:'ما یک وب‌سایت می‌خواستیم که با کیفیت رستوران ما هم‌خوانی داشته باشد. افتاب‌اُس دقیقاً همان را تحویل داد. مهمانان ما قبل از رسیدن درباره وب‌سایت صحبت می‌کنند.',
    t3name:'امید کریمی', t3role:'مدیر عامل، رستوران عافیت، کابل',
    contactEyebrow:'با ما کار کنید', contactHeading:'آماده ساختن چیز استثنایی هستید؟',
    contactSub:'چه به سیستم ERP، بازار دیجیتال یا وب‌سایت تجاری جهانی نیاز داشته باشید — بیایید صحبت کنیم.',
    fNameLabel:'نام کامل', fNamePlaceholder:'نام کامل شما',
    fCompanyLabel:'نام شرکت', fCompanyPlaceholder:'شرکت یا سازمان شما',
    fEmailLabel:'آدرس ایمیل', fEmailPlaceholder:'ایمیل شما',
    fPhoneLabel:'تلفن / واتساپ (اختیاری)', fPhonePlaceholder:'شماره تلفن بین‌المللی',
    fServiceLabel:'خدمات مورد نظر', fServiceDefault:'یک خدمت انتخاب کنید...',
    fService1:'سیستم ERP و لجستیک', fService2:'بازار دیجیتال', fService3:'وب‌سایت تجاری',
    fService4:'ابزارهای هوش مصنوعی', fService5:'امنیت سایبری', fService6:'سایر / مطمئن نیستم',
    fMessageLabel:'پروژه خود را توضیح دهید', fMessagePlaceholder:'پروژه، جدول زمانی و نیازهای خاص خود را شرح دهید...',
    fSubmit:'ارسال پیام', fSuccessTitle:'پیام دریافت شد',
    fSuccessMsg:'ممنون، {name}. پیام شما دریافت شد. ظرف ۲۴ ساعت با شما تماس خواهیم گرفت.',
    fErrRequired:'این فیلد الزامی است', fErrEmail:'لطفاً یک آدرس ایمیل معتبر وارد کنید', fErrService:'لطفاً یک خدمت انتخاب کنید',
    contactInfoTitle:'مستقیم تماس بگیرید',
    labelEmail:'ایمیل', labelPhone:'تلفن', labelWhatsApp:'واتساپ', labelMiami:'دفتر میامی', labelKabul:'دفتر کابل',
    waNote:'در واتساپ پیام بدهید — لطفاً در اولین پیام AftabOS.com را ذکر کنید',
    responseNote:'پرسش‌های دریافت‌شده از طریق این وب‌سایت معمولاً ظرف ۲۴ ساعت پاسخ داده می‌شوند.',
    footerTagline:'آینده دیجیتال افغانستان را از میامی تا کابل مهندسی می‌کنیم.',
    footerNav:'ناوبری', footerLocations:'مکان‌ها', footerCopy:'© ۲۰۲۵ افتاب‌اُس. تمام حقوق محفوظ است.', footerLang:'زبان',
  },

  ps: {
    dir:'rtl', flag:'🇦🇫', code:'پښتو',
    navServices:'خدمتونه', navWork:'زموږ کارونه', navAbout:'زموږ د پیژندنې', navContact:'اړیکه', navCta:'له موږ سره اړیکه ونیسئ',
    heroHeadline:'موږ د افغانستان ډیجیټل زیربنا جوړوو',
    heroSub:'د سازمانونو لپاره ERP سیستمونه، د AI پر بنسټ پلیټفارمونه، او ګڼ ژبیز بازارونه — د افغان سوداګرۍ لپاره انجینیري شوي، د نړیوالو معیارونو سره جوړ شوي.',
    heroCta1:'زموږ کارونه وګورئ', heroCta2:'اړیکه ونیسئ',
    heroTrust:'میامي، فلوریډا، امریکا', heroTrust2:'کابل، افغانستان', heroTrust3:'تاسیس ۲۰۲۴',
    scrollLabel:'ښکته',
    servicesEyebrow:'زموږ خدمتونه', servicesHeading:'موږ څه جوړوو',
    servicesSub:'د پای تر پایه ډیجیټل حلونه — له سازماني معمارۍ نه تر بازار چمتو محصولاتو — د افغان بازار لپاره ډیزاین شوي.',
    s1title:'ERP او لوجستیک سیستمونه', s1desc:'د مالګرۍ، کارګو او لوجستیک لپاره ځانګړي سازماني سیستمونه. موږ د پولو پوهیدنې سوداګرۍ مسیرونو لپاره سافټویر جوړوو.',
    s2title:'ډیجیټل بازارونه', s2desc:'ګڼ ژبیز بشپړ ای-کامرس پلیټفارمونه چې د افغانستان بازار کې پیرودونکي او پلورونکي یو ځای کوي.',
    s3title:'سوداګریزې ویب غوښتنلیکونه', s3desc:'د افغان رستورانونو، سوداګرۍ او خدمت شرکتونو لپاره لوړ فعالیت مسلکي ویبسایتونه.',
    s4title:'د AI وسیلې', s4desc:'هوښیار اتومات او د AI مرستندویان چې افغان سوداګرۍ سره مرسته کوي هوښیارانه کار وکړي.',
    s5title:'سایبري امنیت او سیستمونه', s5desc:'د افغان ډیجیټل سوداګرۍ لپاره د امنیت پلټنې، RLS پالیسۍ ډیزاین، او د غوښتنلیک سختول.',
    workEyebrow:'ښکاره شوي کارونه', workHeading:'زموږ پروژې',
    workSub:'د سیستمونو او پلیټفارمونو انتخاب چې موږ ډیزاین، جوړ او تحویل کړي.',
    p1name:'د ابریشم لار ERP سیستم', p1desc:'د چین نه افغانستان ته د پولو پورته کارګو عملیاتو لپاره د مالګرۍ او لوجستیک ERP سیستم.', p1status:'د پراختیا کې',
    p2name:'بازار چوک', p2desc:'د افغانستان لومړنی درې ژبیز ډیجیټل بازار چې د مندوي ولسي فعالیت سره یوځای د کابل سنتي سرای سوداګرو ډیجیټلي کوي.', p2status:'ژوندی',
    p3name:'د عافیت رستوران', p3desc:'د کابل غوره خواړه خانې لپاره شاندار ډیجیټل حضور او ویب غوښتنلیک. نړیوال ډیزاین، افغاني ظرافت.', p3status:'تحویل شوی',
    whyEyebrow:'ولې موږ غوره کړئ', whyHeading:'د افتاب‌اُس توپیر',
    whySub:'موږ د امریکایي انجینیرۍ نظم افغانستان بازار ته راوړو — او موږ دواړه نړۍ د دننه پیژنو.',
    w1num:'۰۱', w1title:'د امریکا روزل شوی انجینیري', w1desc:'د امریکایي زده کړو لرونکي کمپیوتر ساینسپوه لخوا تاسیس شوی، د میامي بري پوهنتون نه د سوما کام لاود ویاړ سره.',
    w2num:'۰۲', w2title:'لومړی افغانستان', w2desc:'هر محصول د افغان کاروونکو، افغاني ژبو، او افغاني د سوداګرۍ واقعیتونو لپاره ډیزاین شوی.',
    w3num:'۰۳', w3title:'د پای تر پایه تحویل', w3desc:'له سیستم معمارۍ او امنیت پلټنې نه تر ځای پرانستنې او اوږد مهاله ملاتړ — موږ د هر محصول بشپړ دوره ساتو.',
    founderLabel:'د بنسټ ایښودونکي پیژندنه', founderName:'آفتاب عالم مسجدي', founderTitle:'بنسټ ایښودونکی او تخنیکي مشر',
    founderBio:'آفتاب عالم مسجدي د افتاب‌اُس بنسټ کیښود وروسته له دې چې د میامي بري پوهنتون نه د سوما کام لاود ویاړ سره لیسانس ترلاسه کړ، چیرته چې ده سټیمپس سکالرشیپ ترلاسه کړ. د AI، سایبري امنیت، او بشپړ سیستمونو انجینیرۍ کې روزل شوی، آفتاب خپله تخصص افغانستان بازار ته راووت.',
    founderCred:'سټیمپس سکالر · بري پوهنتون میامي · سوما کام لاود',
    testEyebrow:'زموږ پیرودونکي وايي', testHeading:'د افغاني سوداګرۍ لخوا باور کوونکی',
    testSub:'د کابل د مالګرۍ دفترونو نه تر مندوي بازار دوکانونو — د افغانستان سراسر سوداګرۍ د افتاب‌اُس باور کوي.',
    t1quote:'موږ د افتاب‌اُس نه مخکې نور ځایی پراختیا کوونکي هڅه وکړه. توپیر سمدلاسه روښانه و. آفتاب او د هغه ټیم یو سیستم تحویل کړ چې زموږ د چین بارونه له پیله تر پایه اداره کوي.',
    t1name:'خالد رحیمي', t1role:'مدیر، رحیمي کارګو او مالګري، کابل',
    t2quote:'ما شک درلود چې آنلاین پلیټفارم کولی شي زموږ سرای سوداګرۍ لپاره کار وکړي. بازار چوک زما ذهن بشپړ بدل کړ. زما پیرودونکي اوس پرته له بازار ته راتلو مرور او امر کوي.',
    t2name:'بلال سلطاني', t2role:'بنسټ ایښودونکی، سلطاني وچ توکو، مندوي بازار، کابل',
    t3quote:'موږ یو ویبسایت غوښت چې زموږ د رستوران کیفیت سره سم وي. افتاب‌اُس دقیقاً هماغه تحویل کړ. زموږ مهمانان د راتلو نه دمخه د ویبسایت خبره کوي.',
    t3name:'امید کریمي', t3role:'عمومي مدیر، د عافیت رستوران، کابل',
    contactEyebrow:'له موږ سره کار وکړئ', contactHeading:'د یو استثنایي شي جوړولو لپاره چمتو یاست؟',
    contactSub:'که تاسو د ERP سیستم، ډیجیټل بازار، یا نړیوال سوداګریز ویبسایت ته اړتیا لرئ — راسئ خبرې وکړو.',
    fNameLabel:'بشپړ نوم', fNamePlaceholder:'ستاسو بشپړ نوم',
    fCompanyLabel:'د شرکت نوم', fCompanyPlaceholder:'ستاسو شرکت یا سازمان',
    fEmailLabel:'د بریښنالیک پته', fEmailPlaceholder:'ستاسو بریښنالیک',
    fPhoneLabel:'ټیلیفون / واټساپ (اختیاري)', fPhonePlaceholder:'نړیوال شمیره',
    fServiceLabel:'د علاقې خدمت', fServiceDefault:'یو خدمت غوره کړئ...',
    fService1:'ERP او لوجستیک سیستم', fService2:'ډیجیټل بازار', fService3:'سوداګریز ویبسایت',
    fService4:'AI وسیلې او اتومات', fService5:'سایبري امنیت', fService6:'نور / ډاډه نه یم',
    fMessageLabel:'ستاسو پروژه تشریح کړئ', fMessagePlaceholder:'خپله پروژه، د وخت جدول او ځانګړي اړتیاوې توضیح کړئ...',
    fSubmit:'پیغام واستوئ', fSuccessTitle:'پیغام ترلاسه شو',
    fSuccessMsg:'مننه، {name}. ستاسو پیغام ترلاسه شو. موږ به د ۲۴ ساعتونو دننه ستاسو سره اړیکه ونیسو.',
    fErrRequired:'دا ساحه اړینه ده', fErrEmail:'مهرباني وکړئ یو سم بریښنالیک پته دننه کړئ', fErrService:'مهرباني وکړئ یو خدمت غوره کړئ',
    contactInfoTitle:'مستقیم اړیکه ونیسئ',
    labelEmail:'بریښنالیک', labelPhone:'ټیلیفون', labelWhatsApp:'واټساپ', labelMiami:'د میامي دفتر', labelKabul:'د کابل دفتر',
    waNote:'زموږ سره واټساپ کې پیغام واستوئ — مهرباني وکړئ خپل لومړي پیغام کې AftabOS.com یادونه وکړئ',
    responseNote:'د دې ویبسایت له لارې ترلاسه شوي پوښتنې معمولاً د ۲۴ ساعتونو دننه ځواب کیږي.',
    footerTagline:'د افغانستان ډیجیټل راتلونکی د میامي نه کابل ته انجینیري کوو.',
    footerNav:'ناوبري', footerLocations:'ځایونه', footerCopy:'© ۲۰۲۵ افتاب‌اُس. ټول حقونه خوندي دي.', footerLang:'ژبه',
  },

  zh: {
    dir:'ltr', flag:'🇨🇳', code:'中文',
    navServices:'服务', navWork:'项目', navAbout:'关于', navContact:'联系', navCta:'联系我们',
    heroHeadline:'我们构建阿富汗的数字基础设施',
    heroSub:'企业级ERP系统、AI赋能平台与多语言数字市场——专为阿富汗企业打造，符合国际工程标准。',
    heroCta1:'查看我们的项目', heroCta2:'立即联系',
    heroTrust:'美国佛罗里达州迈阿密', heroTrust2:'阿富汗喀布尔', heroTrust3:'成立于2024年',
    scrollLabel:'向下滚动',
    servicesEyebrow:'我们的服务', servicesHeading:'我们构建什么',
    servicesSub:'端到端数字解决方案——从企业架构到市场就绪产品——专为阿富汗市场设计，按照国际标准工程化。',
    s1title:'ERP与物流系统', s1desc:'为货运、物流运营量身定制的企业资源规划系统。我们构建跨境贸易路线的软件核心。',
    s2title:'数字市场平台', s2desc:'连接阿富汗市场买卖双方的全栈多语言电商平台。为规模化构建，为真实用户设计。',
    s3title:'商业网络应用', s3desc:'为阿富汗餐厅、企业和服务公司打造高性能专业网站和网络应用——专为转化率而设计。',
    s4title:'AI驱动工具', s4desc:'帮助阿富汗企业更智能运营的智能自动化和AI助手——从WhatsApp知识代理到流程自动化。',
    s5title:'网络安全与系统', s5desc:'为阿富汗数字企业提供安全审计、RLS策略设计和应用加固服务。从零开始构建安全系统。',
    workEyebrow:'精选项目', workHeading:'我们的项目',
    workSub:'我们设计、构建和交付的系统与平台精选展示。',
    p1name:'丝绸之路陆上ERP系统', p1desc:'为中国至阿富汗跨境货运业务打造的物流ERP系统，涵盖货物跟踪、开票、仓库管理和海关文件。', p1status:'开发中',
    p2name:'Baazar Chawk数字市场', p2desc:'阿富汗首个三语种数字市场（英语、达里语、普什图语），集成曼达维批发功能，将喀布尔传统商铺数字化。', p2status:'已上线',
    p3name:'AFIYAT餐厅', p3desc:'为喀布尔高端餐饮机构打造的豪华数字形象和网络应用。世界级设计，阿富汗韵味。', p3status:'已交付',
    whyEyebrow:'为什么选择我们', whyHeading:'AftabOS的差异',
    whySub:'我们将美国工程标准带入阿富汗市场——我们对两个世界都了如指掌。',
    w1num:'01', w1title:'美国培训的工程能力', w1desc:'由美国计算机科学家创立并领导，毕业于迈阿密巴里大学，以最优秀成绩获得荣誉学位——以硅谷标准训练，为阿富汗构建。',
    w2num:'02', w2title:'以阿富汗为先', w2desc:'每个产品都为阿富汗用户、阿富汗语言和阿富汗商业现实而设计。我们从内部了解这个市场。',
    w3num:'03', w3title:'端到端交付', w3desc:'从系统架构和安全审计到部署和长期支持——我们拥有所构建的每个产品的完整生命周期。',
    founderLabel:'关于创始人', founderName:'Aftab Alam Masjidi', founderTitle:'创始人兼技术负责人',
    founderBio:'Aftab Alam Masjidi在佛罗里达州迈阿密巴里大学以最优秀成绩（Summa Cum Laude）荣誉毕业于计算机科学专业后，创立了AftabOS。他在那里获得了Stamps奖学金——大学最高荣誉奖项。经过AI、网络安全和全栈系统工程的训练，Aftab将专业知识带回阿富汗市场，为长期缺乏现代技术服务的地区构建企业级软件。',
    founderCred:'Stamps学者 · 迈阿密巴里大学 · 最优秀毕业生',
    testEyebrow:'客户评价', testHeading:'获得阿富汗企业的信任',
    testSub:'从喀布尔货运公司到曼达维集市摊位——阿富汗各地企业信任AftabOS构建其数字基础设施。',
    t1quote:'在AftabOS之前，我们尝试过其他本地开发者。差别立竿见影——这不是一个小型自由职业工作。Aftab和他的团队交付了一个真正端到端处理我们中国货运业务的系统。从第一天起就专业。',
    t1name:'Khalid Rahimi', t1role:'总监，Rahimi货运公司，喀布尔',
    t2quote:'我曾怀疑在线平台能否适用于我们的商铺业务。Baazar Chawk完全改变了我的看法。我的客户现在无需每次来市场就能浏览和下单。以达里语构建，在任何手机上都能使用，支持服务也非常出色。',
    t2name:'Bilal Sultani', t2role:'创始人，Sultani干货店，曼达维市场，喀布尔',
    t3quote:'我们想要一个与我们餐厅品质相匹配的网站——让人感觉世界级的东西。AftabOS完全实现了这一点。客人在到来之前就评论网站。它优雅、快速，在喀布尔独一无二。',
    t3name:'Omid Karimi', t3role:'总经理，AFIYAT餐厅，喀布尔',
    contactEyebrow:'与我们合作', contactHeading:'准备好构建卓越之作了吗？',
    contactSub:'无论您需要ERP系统、数字市场还是世界级商业网站——让我们谈谈。',
    fNameLabel:'全名', fNamePlaceholder:'您的全名',
    fCompanyLabel:'公司名称', fCompanyPlaceholder:'您的公司或组织',
    fEmailLabel:'电子邮件地址', fEmailPlaceholder:'您的电子邮件',
    fPhoneLabel:'电话 / WhatsApp（选填）', fPhonePlaceholder:'国际号码',
    fServiceLabel:'感兴趣的服务', fServiceDefault:'请选择服务...',
    fService1:'ERP与物流系统', fService2:'数字市场', fService3:'商业网站',
    fService4:'AI工具与自动化', fService5:'网络安全与系统', fService6:'其他/不确定',
    fMessageLabel:'描述您的项目', fMessagePlaceholder:'描述您的项目、时间表和具体要求...',
    fSubmit:'发送消息', fSuccessTitle:'消息已收到',
    fSuccessMsg:'感谢您，{name}。您的消息已收到。我们将在24小时内与您联系。',
    fErrRequired:'此字段为必填项', fErrEmail:'请输入有效的电子邮件地址', fErrService:'请选择一项服务',
    contactInfoTitle:'直接联系我们',
    labelEmail:'电子邮件', labelPhone:'电话', labelWhatsApp:'WhatsApp', labelMiami:'迈阿密办公室', labelKabul:'喀布尔办公室',
    waNote:'通过WhatsApp联系我们——请在第一条消息中提及AftabOS.com',
    responseNote:'通过本网站收到的咨询通常在24小时内回复。',
    footerTagline:'从迈阿密到喀布尔，工程化阿富汗的数字未来。',
    footerNav:'导航', footerLocations:'地点', footerCopy:'© 2025 AftabOS. 版权所有。', footerLang:'语言',
  },

  ar: {
    dir:'rtl', flag:'🇸🇦', code:'العربية',
    navServices:'الخدمات', navWork:'أعمالنا', navAbout:'من نحن', navContact:'اتصل', navCta:'اتصل بنا',
    heroHeadline:'نبني البنية التحتية الرقمية لأفغانستان',
    heroSub:'أنظمة ERP المؤسسية، والمنصات المدعومة بالذكاء الاصطناعي، والأسواق متعددة اللغات — مهندسة للأعمال الأفغانية، مبنية وفق المعايير العالمية.',
    heroCta1:'استعرض أعمالنا', heroCta2:'تواصل معنا',
    heroTrust:'ميامي، فلوريدا، الولايات المتحدة', heroTrust2:'كابول، أفغانستان', heroTrust3:'تأسست 2024',
    scrollLabel:'للأسفل',
    servicesEyebrow:'خدماتنا', servicesHeading:'ماذا نبني',
    servicesSub:'حلول رقمية شاملة — من الهندسة المعمارية المؤسسية إلى المنتجات الجاهزة للسوق — مصممة للسوق الأفغانية ومهندسة وفق المعايير الدولية.',
    s1title:'أنظمة ERP والخدمات اللوجستية', s1desc:'أنظمة تخطيط موارد المؤسسات المخصصة لعمليات الشحن والبضائع واللوجستيات. نبني العمود الفقري البرمجي لمسارات التجارة العابرة للحدود.',
    s2title:'الأسواق الرقمية', s2desc:'منصات تجارة إلكترونية متعددة اللغات تربط المشترين والبائعين في السوق الأفغانية. مبنية للتوسع، مبنية للمستخدمين الحقيقيين.',
    s3title:'تطبيقات الويب التجارية', s3desc:'مواقع ويب مهنية عالية الأداء وتطبيقات ويب للمطاعم والشركات وشركات الخدمات الأفغانية — مصممة للتحويل.',
    s4title:'أدوات مدعومة بالذكاء الاصطناعي', s4desc:'أتمتة ذكية ومساعدون مدعومون بالذكاء الاصطناعي يساعدون الأعمال الأفغانية على العمل بذكاء أكبر.',
    s5title:'الأمن السيبراني والأنظمة', s5desc:'تدقيقات أمنية وتصميم سياسات RLS وتصليب التطبيقات للأعمال الرقمية الأفغانية. نبني أنظمة آمنة من الصفر.',
    workEyebrow:'أعمال مختارة', workHeading:'مشاريعنا',
    workSub:'مختارات من الأنظمة والمنصات التي صممناها وبنيناها وسلمناها.',
    p1name:'نظام ERP طريق الحرير', p1desc:'نظام ERP للشحن واللوجستيات مبني لعمليات البضائع العابرة للحدود من الصين إلى أفغانستان. يغطي تتبع الشحنات والفوترة وإدارة المستودعات ووثائق الجمارك.', p1status:'قيد التطوير',
    p2name:'بازار چوک', p2desc:'أول سوق رقمي ثلاثي اللغة في أفغانستان مع وظائف بيع بالجملة في مندوي، يرقمن تجار السراي التقليديين في كابول.', p2status:'مباشر',
    p3name:'مطعم عافيت', p3desc:'حضور رقمي فاخر وتطبيق ويب لمنشأة طعام راقية في كابول. تصميم عالمي المستوى، أناقة أفغانية.', p3status:'تم التسليم',
    whyEyebrow:'لماذا تختارنا', whyHeading:'ما يميز AftabOS',
    whySub:'نجلب الانضباط الهندسي الأمريكي إلى السوق الأفغانية — ونفهم العالمين من الداخل.',
    w1num:'01', w1title:'هندسة مدربة أمريكياً', w1desc:'تأسست وتُقاد من قبل عالم حاسوب مدرب في الولايات المتحدة، حاصل على مرتبة الشرف بامتياز من جامعة باري في ميامي.',
    w2num:'02', w2title:'أفغانستان أولاً', w2desc:'كل منتج مصمم للمستخدمين الأفغان واللغات الأفغانية وحقائق الأعمال الأفغانية. نفهم هذا السوق من الداخل.',
    w3num:'03', w3title:'تسليم شامل', w3desc:'من الهندسة المعمارية للأنظمة والتدقيق الأمني إلى النشر والدعم طويل الأمد — نملك الدورة الكاملة لكل منتج نبنيه.',
    founderLabel:'عن المؤسس', founderName:'آفتاب عالم مسجدي', founderTitle:'المؤسس والقائد التقني',
    founderBio:'أسس آفتاب عالم مسجدي AftabOS بعد إتمام درجة البكالوريوس في علوم الحاسوب بمرتبة الشرف بامتياز من جامعة باري في ميامي، فلوريدا، حيث حصل على منحة Stamps — أعلى تكريم في الجامعة. مدرب في الذكاء الاصطناعي والأمن السيبراني وهندسة الأنظمة الكاملة، عاد آفتاب بخبرته إلى السوق الأفغانية.',
    founderCred:'منحة Stamps · جامعة باري ميامي · بمرتبة الشرف بامتياز',
    testEyebrow:'ما يقوله عملاؤنا', testHeading:'موثوق به من قِبل الأعمال الأفغانية',
    testSub:'من مكاتب الشحن في كابول إلى أكشاك سوق مندوي — تثق الأعمال في جميع أنحاء أفغانستان بـ AftabOS.',
    t1quote:'جربنا مطورين محليين آخرين قبل AftabOS. كان الفرق واضحاً على الفور — لم يكن هذا عملاً مستقلاً صغيراً. سلّم آفتاب وفريقه نظاماً يتعامل فعلاً مع شحناتنا الصينية من البداية إلى النهاية. محترف من اليوم الأول.',
    t1name:'خالد رحيمي', t1role:'مدير، رحيمي كارغو وشحن، كابول',
    t2quote:'كنت متشككاً في أن منصة إلكترونية يمكن أن تعمل لعمل السراي الخاص بنا. غيّر بازار چوک رأيي تماماً. يتصفح عملائي ويطلبون الآن دون الحاجة للمجيء إلى السوق في كل مرة.',
    t2name:'بلال سلطاني', t2role:'مؤسس، سلطاني للبضائع الجافة، سوق مندوي، كابول',
    t3quote:'أردنا موقعاً يتناسب مع جودة مطعمنا — شيء يبدو بمستوى عالمي. قدّم AftabOS بالضبط ذلك. يعلّق ضيوفنا على الموقع قبل وصولهم. إنه أنيق وسريع ولا شيء يشبهه في كابول.',
    t3name:'أميد كريمي', t3role:'المدير العام، مطعم عافيت، كابول',
    contactEyebrow:'اعمل معنا', contactHeading:'هل أنت مستعد لبناء شيء استثنائي؟',
    contactSub:'سواء كنت بحاجة إلى نظام ERP أو سوق رقمية أو موقع تجاري عالمي المستوى — دعنا نتحدث.',
    fNameLabel:'الاسم الكامل', fNamePlaceholder:'اسمك الكامل',
    fCompanyLabel:'اسم الشركة', fCompanyPlaceholder:'شركتك أو مؤسستك',
    fEmailLabel:'عنوان البريد الإلكتروني', fEmailPlaceholder:'بريدك الإلكتروني',
    fPhoneLabel:'الهاتف / واتساب (اختياري)', fPhonePlaceholder:'رقم دولي',
    fServiceLabel:'الخدمة المطلوبة', fServiceDefault:'اختر خدمة...',
    fService1:'نظام ERP والخدمات اللوجستية', fService2:'السوق الرقمية', fService3:'موقع تجاري',
    fService4:'أدوات الذكاء الاصطناعي والأتمتة', fService5:'الأمن السيبراني', fService6:'أخرى / غير متأكد',
    fMessageLabel:'أخبرنا عما تبنيه', fMessagePlaceholder:'صف مشروعك والجدول الزمني وأي متطلبات محددة...',
    fSubmit:'إرسال الرسالة', fSuccessTitle:'تم استلام رسالتك',
    fSuccessMsg:'شكراً لك، {name}. تم استلام رسالتك. سنتواصل معك خلال 24 ساعة.',
    fErrRequired:'هذا الحقل مطلوب', fErrEmail:'يرجى إدخال عنوان بريد إلكتروني صحيح', fErrService:'يرجى اختيار خدمة',
    contactInfoTitle:'تواصل مباشرة',
    labelEmail:'البريد الإلكتروني', labelPhone:'الهاتف', labelWhatsApp:'واتساب', labelMiami:'مكتب ميامي', labelKabul:'مكتب كابول',
    waNote:'راسلنا على واتساب — يرجى ذكر AftabOS.com في رسالتك الأولى',
    responseNote:'يتم الرد على الاستفسارات الواردة عبر هذا الموقع عادةً خلال 24 ساعة.',
    footerTagline:'نهندس مستقبل أفغانستان الرقمي — من ميامي إلى كابول.',
    footerNav:'التنقل', footerLocations:'المواقع', footerCopy:'© 2025 AftabOS. جميع الحقوق محفوظة.', footerLang:'اللغة',
  },
};

/* ══════════════════════════════════════
   LANGUAGE
══════════════════════════════════════ */
let currentLang = localStorage.getItem('aftabos-lang') || 'en';

function applyLanguage(lang) {
  if (!T[lang]) lang = 'en';
  currentLang = lang;
  localStorage.setItem('aftabos-lang', lang);
  const t = T[lang];

  document.documentElement.lang = { fa:'fa', ps:'ps', ar:'ar', zh:'zh' }[lang] || 'en';
  document.documentElement.dir = t.dir;

  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = t[key];
      else el.textContent = t[key];
    }
  });

  document.querySelectorAll('[data-t-select]').forEach(el => {
    const keys = el.getAttribute('data-t-select').split(',');
    el.querySelectorAll('option').forEach((opt, i) => {
      if (keys[i] && t[keys[i]] !== undefined) opt.textContent = t[keys[i]];
    });
  });

  document.querySelectorAll('[data-tp]').forEach(el => {
    const key = el.getAttribute('data-tp');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  document.querySelectorAll('.lang-display').forEach(el => {
    el.textContent = `${t.flag} ${t.code}`;
  });

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
  });
}

/* ══════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════ */
function initCursor() {
  const isTouch = window.matchMedia('(hover: none)').matches;
  const cursor = document.getElementById('cursor');
  if (!cursor || isTouch) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function lerp() {
    cx += (mx - cx) * 0.14;
    cy += (my - cy) * 0.14;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(lerp);
  })();

  const hoverTargets = 'a, button, [data-magnetic], .service-card, .project-card, .testimonial-card, .why-card';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });

  document.addEventListener('mousedown', e => {
    cursor.classList.add('clicking');
    spawnRipple(e.clientX, e.clientY);
  });
  document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
}

function spawnRipple(x, y) {
  const r = document.createElement('div');
  r.className = 'cursor-ripple';
  r.style.left = x + 'px';
  r.style.top  = y + 'px';
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 420);
}

/* ══════════════════════════════════════
   TOUCH RIPPLE
══════════════════════════════════════ */
function initTouchRipple() {
  if (!window.matchMedia('(hover: none)').matches) return;
  const targets = '.btn, .service-card, .project-card, .testimonial-card';
  document.querySelectorAll(targets).forEach(el => {
    el.style.position = el.style.position || 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('touchstart', e => {
      const rect = el.getBoundingClientRect();
      const touch = e.touches[0];
      const r = document.createElement('div');
      r.className = 'tap-ripple';
      r.style.left = (touch.clientX - rect.left) + 'px';
      r.style.top  = (touch.clientY - rect.top)  + 'px';
      el.appendChild(r);
      setTimeout(() => r.remove(), 420);
    }, { passive: true });
  });
}

/* ══════════════════════════════════════
   MAGNETIC BUTTONS
══════════════════════════════════════ */
function initMagnetic() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    let resetTimer;
    document.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const bdx = Math.max(0, Math.abs(dx) - rect.width  / 2);
      const bdy = Math.max(0, Math.abs(dy) - rect.height / 2);
      const dist = Math.sqrt(bdx * bdx + bdy * bdy);
      if (dist < 70) {
        clearTimeout(resetTimer);
        btn.style.transition = 'transform 80ms ease';
        const pull = (1 - dist / 70) * 8;
        const angle = Math.atan2(dy, dx);
        btn.style.transform = `translate(${Math.cos(angle) * pull}px, ${Math.sin(angle) * pull}px)`;
      } else if (btn.style.transform) {
        resetTimer = setTimeout(() => {
          btn.style.transition = 'transform 400ms cubic-bezier(0.34,1.56,0.64,1)';
          btn.style.transform = '';
        }, 10);
      }
    });
  });
}

/* ══════════════════════════════════════
   PARTICLE CANVAS
══════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  const N = 55, CONN = 120;
  let W, H, pts = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  function mkPt() {
    return { x: Math.random()*W, y: Math.random()*H, vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22 };
  }
  function init() { resize(); pts = Array.from({length:N}, mkPt); }
  function draw() {
    ctx.clearRect(0,0,W,H);
    for (let i=0;i<N;i++) {
      const p=pts[i];
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,1.5,0,Math.PI*2);
      ctx.fillStyle='rgba(201,168,76,0.45)';
      ctx.fill();
      for(let j=i+1;j<N;j++){
        const q=pts[j];
        const d=Math.hypot(p.x-q.x,p.y-q.y);
        if(d<CONN){
          ctx.beginPath();
          ctx.moveTo(p.x,p.y);
          ctx.lineTo(q.x,q.y);
          ctx.strokeStyle=`rgba(201,168,76,${0.1*(1-d/CONN)})`;
          ctx.lineWidth=.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  init();
  draw();
  window.addEventListener('resize', resize, {passive:true});
}

/* ══════════════════════════════════════
   NAV SCROLL
══════════════════════════════════════ */
function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, {passive:true});
}

/* ══════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════ */
function initMobileMenu() {
  const btn     = document.getElementById('hamburger');
  const menu    = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  if (!btn || !menu) return;

  function open() {
    btn.classList.add('open');
    menu.classList.add('open');
    if (overlay) overlay.classList.add('open');
    btn.setAttribute('aria-expanded','true');
    document.body.style.overflow='hidden';
  }
  function close() {
    btn.classList.remove('open');
    menu.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
    document.body.style.overflow='';
  }

  btn.addEventListener('click', () => btn.classList.contains('open') ? close() : open());
  if (overlay) overlay.addEventListener('click', close);
  menu.querySelectorAll('.mob-link, .mob-cta').forEach(a => a.addEventListener('click', close));
}

/* ══════════════════════════════════════
   LANG SWITCHER
══════════════════════════════════════ */
function initLangSwitcher() {
  document.querySelectorAll('.lang-switcher').forEach(sw => {
    const btn = sw.querySelector('[data-lang-toggle]');
    if (btn) btn.addEventListener('click', e => {
      e.stopPropagation();
      sw.classList.toggle('open');
    });
  });
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      applyLanguage(opt.getAttribute('data-lang'));
      document.querySelectorAll('.lang-switcher').forEach(s => s.classList.remove('open'));
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-switcher').forEach(s => s.classList.remove('open'));
  });
}

/* ══════════════════════════════════════
   SCROLL ANIMATIONS (staggered)
══════════════════════════════════════ */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Assign stagger delays to siblings within each parent
  document.querySelectorAll(
    '.services-grid, .projects-list, .why-features, .testimonials-grid'
  ).forEach(grid => {
    grid.querySelectorAll('.fade-up').forEach((el, i) => {
      el.style.transitionDelay = `${i * 60}ms`;
    });
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
}

/* ══════════════════════════════════════
   COUNT-UP (Why section numbers)
══════════════════════════════════════ */
function countUp(el, target, duration, prefix) {
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.round(eased * target);
    el.textContent = prefix + String(val).padStart(2, '0');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initCountUp() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.getAttribute('data-count'), 10);
        const prefix = e.target.getAttribute('data-prefix') || '';
        countUp(e.target, target, 1200, prefix);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
}

/* ══════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════ */
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function showErr(el, errEl, key) {
    el.classList.add('error');
    const t = T[currentLang] || T.en;
    errEl.textContent = t[key] || T.en[key];
    errEl.classList.add('visible');
  }
  function clearErr(el, errEl) {
    el.classList.remove('error');
    errEl.classList.remove('visible');
  }

  ['f-name','f-company','f-email','f-service','f-message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearErr(el, document.getElementById(id+'-err')));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const t = T[currentLang] || T.en;
    let valid = true;

    const name    = document.getElementById('f-name');
    const company = document.getElementById('f-company');
    const email   = document.getElementById('f-email');
    const service = document.getElementById('f-service');
    const message = document.getElementById('f-message');

    if (!name.value.trim())    { showErr(name,    document.getElementById('f-name-err'),    'fErrRequired'); valid=false; }
    else clearErr(name,    document.getElementById('f-name-err'));
    if (!company.value.trim()) { showErr(company, document.getElementById('f-company-err'), 'fErrRequired'); valid=false; }
    else clearErr(company, document.getElementById('f-company-err'));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showErr(email, document.getElementById('f-email-err'), email.value.trim() ? 'fErrEmail' : 'fErrRequired'); valid=false;
    } else clearErr(email, document.getElementById('f-email-err'));
    if (!service.value)        { showErr(service, document.getElementById('f-service-err'), 'fErrService'); valid=false; }
    else clearErr(service, document.getElementById('f-service-err'));
    if (!message.value.trim()) { showErr(message, document.getElementById('f-message-err'), 'fErrRequired'); valid=false; }
    else clearErr(message, document.getElementById('f-message-err'));

    if (!valid) return;

    const phone = (document.getElementById('f-phone') || {}).value || '';
    const subject = encodeURIComponent(`AftabOS Inquiry from ${name.value.trim()} — ${company.value.trim()} via AftabOS.com`);
    const body = encodeURIComponent([
      `Name: ${name.value.trim()}`,
      `Company: ${company.value.trim()}`,
      `Email: ${email.value.trim()}`,
      `Phone/WhatsApp: ${phone || 'Not provided'}`,
      `Service: ${service.options[service.selectedIndex].text}`,
      ``,
      `Message:`,
      message.value.trim(),
      ``,
      `---`,
      `Sent via AftabOS.com`,
    ].join('\n'));

    window.location.href = `mailto:aftabalammasjidi@gmail.com?subject=${subject}&body=${body}`;

    const successMsg = (t.fSuccessMsg || T.en.fSuccessMsg).replace('{name}', name.value.trim());
    const successEl  = document.getElementById('form-success');
    const successTxt = document.getElementById('form-success-msg');
    if (successTxt) successTxt.textContent = successMsg;
    if (successEl)  successEl.classList.add('visible');
    form.style.display = 'none';
  });
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMobileMenu();
  initLangSwitcher();
  initParticles();
  initScrollReveal();
  initCountUp();
  initCursor();
  initTouchRipple();
  initMagnetic();
  initForm();
  applyLanguage(currentLang);
});
