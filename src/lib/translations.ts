export type Language = 'he' | 'en';

export const translations = {
  he: {
    dir: 'rtl',
    nav: {
      home: 'דף הבית',
      portfolio: 'תיק עבודות',
      services: 'שירותים ומחירים',
      about: 'אודות',
      contact: 'צור קשר',
      startProject: 'התחלת פרויקט'
    },
    hero: {
      title1: 'בניית אתרים לעסקים',
      title2: 'בעיצוב אישי',
      subtitle: 'אתרים מקצועיים, אסתטיים ומותאמים למובייל במחיר נגיש',
      price: 'החל מ-1000 ש"ח',
      trust: [
        "מותאם למובייל",
        "מהיר וקל לטעינה",
        "בנוי נכון ל-SEO",
        "עיצוב מודרני ואסתטי",
        "חוויית משתמש שמביאה לקוחות"
      ]
    },
    portfolio: {
      tag: '01 - PORTFOLIO',
      title: 'הפרויקטים שלנו',
      desc: 'אנחנו מציגים כאן עבודות שביצענו עבור עסקים בתחומים שונים. כל פרויקט נבנה עם דגש על עיצוב מותאם לעסק, חוויית משתמש ברורה, התאמה מלאה לנייד ובנייה נכונה לקידום בגוגל. המטרה היא לא רק אתר יפה - אלא אתר שעובד.',
      projects: [
        {
          title: "הכפר הנודד",
          subtitle: "אתר תדמית לעסק",
          description: ""
        },
        {
          title: "במבורגר",
          subtitle: "אתר למסעדה דמה",
          description: ""
        },
        {
          title: "מוסך יוסי",
          subtitle: "אתר תדמית למוסך דמה",
          description: ""
        }
      ]
    },
    services: {
      tag: '02 - PRICING & SERVICES',
      title: 'השירותים והמחירים שלנו',
      desc: 'אנחנו בפנדה מציגים פתרונות בניית אתרים בהתאמה אישית, עם דגש על איכות, מהירות ומחיר נגיש לעסקים.',
      cta: 'בואו נתחיל',
      savingsTitle: 'חיסכון בעלויות',
      savingsDesc: 'ניתן להפחית את עלות הפרויקט במידה ויש ברשותך תוכן מוכן לכלל האתר (טקסטים/כיתוב).',
      storageTitle: 'אחסון קבצים',
      storageDesc: 'על מנת לשמור על עלויות נמוכות ולאפשר אחסון גמיש, אנו עושים שימוש ב־Google Drive של הלקוח לאחסון קבצים (תמונות, סרטונים וכדומה).',
      storageNote: 'במידה ואין ברשותך Google Drive או שאינך מעוניין להשתמש בו, ייתכן עדכון בעלות החבילה וכן הגבלת נפח האחסון.'
    },
    plans: [
      {
        title: "דף נחיתה\n(Landing Page)",
        price: "1,000",
        note: "+ עלויות נוספות במידה ונדרש אחסון",
        features: [
          "עיצוב בהתאמה אישית",
          "התאמה מלאה למובייל",
          "מבנה ממוקד להמרות (CTA ברור)",
          "כפתורי שיחה + וואטסאפ + קישורים לרשתות חברתיות",
          "שילוב תמונות וסרטונים",
          "פונטים ואייקונים לשימוש מסחרי",
          "טעינה מהירה ואופטימיזציה לביצועים",
          "אופטימיזציה למנועי חיפוש (SEO בסיסי)",
          "חיבור לטופס יצירת קשר",
          "עד 3 סבבי תיקונים מקיפים",
          "חיבור לדומיין (במידת הצורך)"
        ],
        ctaText: "בואו נתחיל",
        highlight: false
      },
      {
        title: "אתר תדמית\n(עמוד אחד להצגת העסק)",
        price: "1,400",
        subPrice: "+ 50 ₪ / אחסון ושירות חודשי",
        note: "בנייה חד פעמית + תחזוקה שוטפת",
        features: [
          "עיצוב בהתאמה אישית",
          "התאמה מלאה למובייל",
          "מספר סקשנים (אודות, שירותים, יתרונות, המלצות, צור קשר)",
          "מבנה ברור שמוביל את המשתמש לאורך כל הדף",
          "כפתורי שיחה + וואטסאפ + קישורים לרשתות חברתיות",
          "שילוב תמונות וסרטונים",
          "פונטים ואייקונים לשימוש מסחרי",
          "טעינה מהירה ואופטימיזציה לביצועים",
          "אופטימיזציה למנועי חיפוש (SEO בסיסי)",
          "חיבור לטופס יצירת קשר",
          "עד 3 סבבי תיקונים מקיפים",
          "חיבור לדומיין (במידת הצורך)"
        ],
        ctaText: "בואו נתחיל",
        highlight: true
      },
      {
        title: "אתר פרימיום\n(רב-עמודי עם בלוג/גלריה)",
        price: "1,900",
        subPrice: "+ 50 ₪ / אחסון ושירות חודשי",
        note: "בנייה חד פעמית + תחזוקה שוטפת",
        features: [
          "עיצוב בהתאמה אישית",
          "התאמה מלאה למובייל",
          "מספר עמודים (דף בית, שירותים, אודות, צור קשר ועוד)",
          "בלוג לעסק לקידום אורגני בגוגל",
          "גלריה דינמית להצגת עבודות",
          "ניווט חכם בין עמודים (UX מתקדם)",
          "כפתורי שיחה + וואטסאפ + קישורים לרשתות חברתיות",
          "שילוב תמונות וסרטונים",
          "פונטים ואייקונים לשימוש מסחרי",
          "טעינה מהירה ואופטימיזציה לביצועים",
          "אופטימיזציה למנועי חיפוש (SEO בסיסי + מבנה מתקדם)",
          "חיבור לטפסים וקליטת לידים",
          "עד 3 סבבי תיקונים מקיפים",
          "חיבור לדומיין (במידת הצורך)"
        ],
        ctaText: "בואו נתחיל",
        highlight: false
      }
    ],
    whyWebsite: {
      tag: '03 - WHY A WEBSITE?',
      title: 'למה כל עסק צריך אתר?',
      items: [
        { title: "להיראות אמין ומבוסס", desc: "אתר מקצועי מייצר אמון מיידי אצל הלקוח." },
        { title: "להציג שירותים בצורה ברורה", desc: "כל המידע שהלקוח צריך במקום אחד." },
        { title: "לקבל פניות באופן קבוע", desc: "מערכת שעובדת בשבילך ומביאה לידים." },
        { title: "לעבוד 24/7 בלי מאמץ", desc: "העסק שלך זמין תמיד, גם כשאתה ישן." }
      ],
      footer: 'עסק בלי אתר נראה פחות מקצועי - גם אם השירות עצמו מצוין.',
      whatsappDefault: "שלום,\nהגעתי אליכם דרך אתר פנדה ואני מעוניין בייעוץ לגבי בניית אתר."
    },
    about: {
      tag: '04 - ABOUT',
      title: 'קצת עלינו',
      mainText: 'אנחנו מתמחים בבניית אתרים לעסקים שרוצים להיראות מקצועיים באינטרנט מבלי להיכנס להוצאות גדולות. הגישה שלנו פשוטה: אתר צריך להיות ברור, יפה, מהיר וממוקד מטרה.',
      subText: 'אנחנו מאמינים שהאתר שלך הוא הרושם הראשוני של העסק - ולכן הוא חייב לשדר אמינות, סדר ומקצועיות כבר מהשנייה הראשונה. כל אתר שאנחנו בונים מותאם לנייד, כי רוב התנועה היום מגיעה מהטלפון. רוצים גם? ',
      linkText: 'צרו איתנו קשר!'
    },
    contact: {
      tag: '05 - CONTACT',
      title: 'בוא נבנה לך אתר שמביא לקוחות',
      desc: 'מחפש בניית אתר במחיר שמתאים לעסקים קטנים? אנחנו כאן כדי לבנות לך אתר שעובד בשבילך.',
      labelName: 'שם מלא',
      labelMessage: 'הודעה',
      placeholderName: 'הכנס את שמך',
      placeholderMessage: 'איך נוכל לעזור?',
      send: 'שלח הודעה',
      location: 'תל אביב, ישראל',
      prefill: 'שלום! הגעתי אליכם דרך האתר ואני מעוניין ב '
    },
    scramble: {
      title: 'למה אתם מחכים?',
      subtitle: 'צרו קשר בשביל ייעוץ חינמי'
    },
    footer: {
      copyright: '© 2024 Panda Custom. כל הזכויות שמורות.',
      desc1: 'בניית אתרים לעסקים | אתר תדמית | דף נחיתה | אתר בלוג | אתר גלריה',
      desc2: 'עיצוב אתרים אסתטיים, מהירים ומותאמים לנייד'
    }
  },
  en: {
    dir: 'ltr',
    nav: {
      home: 'Home',
      portfolio: 'Portfolio',
      services: 'Services & Pricing',
      about: 'About',
      contact: 'Contact',
      startProject: 'Start Project'
    },
    hero: {
      title1: 'Website Development for Businesses',
      title2: '',
      subtitle: 'Professional, custom design, and mobile-friendly websites at an affordable price',
      price: 'Starting from ₪1000',
      trust: [
        "Mobile-friendly",
        "Fast and lightweight",
        "Built correctly for SEO",
        "Modern and aesthetic design",
        "User experience that brings customers"
      ]
    },
    portfolio: {
      tag: '01 - PORTFOLIO',
      title: 'Our Projects',
      desc: 'Here you can see projects we’ve created for businesses across different industries. Each project is built with a focus on business-specific design, clear user experience, full mobile compatibility, and proper structure for Google SEO. The goal is not just a beautiful website — but one that works.',
      projects: [
        {
          title: "Hakfar Hanoded",
          subtitle: "Business showcase website",
          description: ""
        },
        {
          title: "Bamburger",
          subtitle: "Demo restaurant website",
          description: ""
        },
        {
          title: "Yossi Repair Shop",
          subtitle: "Demo garage showcase website",
          description: ""
        }
      ]
    },
    services: {
      tag: '02 - PRICING & SERVICES',
      title: 'Our Services & Pricing',
      desc: 'At Panda, we offer custom website development solutions, with a focus on quality, speed, and affordable pricing for businesses.',
      cta: "Let's Start",
      savingsTitle: 'Cost Reduction',
      savingsDesc: 'Project costs can be reduced if you already have content prepared for the entire website (texts/copy).',
      storageTitle: 'File Storage',
      storageDesc: 'To keep costs low and allow flexible storage, we use the client’s Google Drive to store files (images, videos, etc.).',
      storageNote: 'If you do not have Google Drive or prefer not to use it, there may be an increase in pricing and a limitation on storage capacity.'
    },
    plans: [
      {
        title: "Landing Page",
        price: "1,000",
        note: "Additional costs may apply if hosting is required",
        features: [
          "Custom design",
          "Fully mobile-friendly",
          "Conversion-focused structure (clear CTA)",
          "Call buttons + WhatsApp + social media links",
          "Integration of images and videos",
          "Commercial-use fonts and icons",
          "Fast loading and performance optimization",
          "SEO optimization (basic)",
          "Contact form integration",
          "Up to 3 comprehensive revision rounds",
          "Domain connection (if needed)"
        ],
        ctaText: "Let's Start",
        highlight: false
      },
      {
        title: "Business Website\n(One-page business presentation)",
        price: "1,400",
        subPrice: "₪50 / monthly hosting & service",
        note: "One-time build + ongoing maintenance",
        features: [
          "Custom design",
          "Fully mobile-friendly",
          "Multiple sections (About, Services, Benefits, Testimonials, Contact)",
          "Clear structure that guides the user throughout the page",
          "Call buttons + WhatsApp + social media links",
          "Integration of images and videos",
          "Commercial-use fonts and icons",
          "Fast loading and performance optimization",
          "SEO optimization (basic)",
          "Contact form integration",
          "Up to 3 comprehensive revision rounds",
          "Domain connection (if needed)"
        ],
        ctaText: "Let's Start",
        highlight: true
      },
      {
        title: "Premium Website\n(Multi-page with blog/gallery)",
        price: "1,900",
        subPrice: "₪50 / monthly hosting & service",
        note: "One-time build + ongoing maintenance",
        features: [
          "Custom design",
          "Fully mobile-friendly",
          "Multiple pages (Home, Services, About, Contact, etc.)",
          "Business blog for organic Google SEO",
          "Dynamic gallery to showcase work",
          "Smart navigation between pages (advanced UX)",
          "Call buttons + WhatsApp + social media links",
          "Integration of images and videos",
          "Commercial-use fonts and icons",
          "Fast loading and performance optimization",
          "SEO optimization (basic + advanced structure)",
          "Forms and lead capture integration",
          "Up to 3 comprehensive revision rounds",
          "Domain connection (if needed)"
        ],
        ctaText: "Let's Start",
        highlight: false
      }
    ],
    whyWebsite: {
      tag: '03 - WHY A WEBSITE?',
      title: 'Why does every business need a website?',
      items: [
        { title: "Build trust and credibility", desc: "A professional website creates immediate trust with customers." },
        { title: "Present services clearly", desc: "All the information your customer needs in one place." },
        { title: "Get consistent inquiries", desc: "A system that works for you and generates leads." },
        { title: "Work 24/7 effortlessly", desc: "Your business is always available — even when you’re asleep." }
      ],
      footer: 'A business without a website appears less professional — even if the service itself is excellent.',
      whatsappDefault: "Hello,\nI found you through the Panda website and I’m interested in a consultation regarding building a website."
    },
    about: {
      tag: '04 - ABOUT',
      title: 'About Us',
      mainText: 'We specialize in building websites for businesses that want to look professional online without high costs. Our approach is simple: a website should be clear, beautiful, fast, and goal-oriented.',
      subText: 'We believe your website is the first impression of your business — which is why it must convey trust, structure, and professionalism from the very first second. Every website we build is mobile-friendly, because most traffic today comes from mobile devices. Want one too? ',
      linkText: 'Contact us!'
    },
    contact: {
      tag: '05 - CONTACT',
      title: 'Let’s build you a website that brings customers',
      desc: 'Looking for website development at a price that fits small businesses? We’re here to build you a website that works for you.',
      labelName: 'Full Name',
      labelMessage: 'Message',
      placeholderName: 'Enter your name',
      placeholderMessage: 'How can we help?',
      send: 'Send Message',
      location: 'Tel Aviv, Israel',
      prefill: 'Hello! I reached you through the website and I am interested in '
    },
    scramble: {
      title: 'What are you waiting for?',
      subtitle: 'Contact us for a free consultation'
    },
    footer: {
      copyright: '© 2024 Panda Custom. All rights reserved.',
      desc1: 'Website Building | Portfolio Site | Landing Page | Blog Site | Gallery Site',
      desc2: 'Aesthetic, fast, and mobile-friendly web design'
    }
  }
};
