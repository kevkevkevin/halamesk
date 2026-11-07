import "./i18n.css";

const params = new URLSearchParams(location.search);
export const isArabic = params.get("lang") === "ar";

const translations = new Map(Object.entries({
  "Halamesk — Interior, Architecture & Execution": "هالامسك — التصميم الداخلي والعمارة والتنفيذ",
  "About Halamesk — Interior, Architecture & Execution": "عن هالامسك — التصميم الداخلي والعمارة والتنفيذ",
  "Services — Halamesk": "خدمات هالامسك",
  "Projects — Halamesk": "مشاريع هالامسك",
  "Project — Halamesk": "مشروع — هالامسك",
  "Halamesk creates considered interiors, architecture, and turnkey spaces from concept to completion in Riyadh, Saudi Arabia.": "تصنع هالامسك مساحات داخلية ومعمارية وحلول تسليم مفتاح مدروسة من الفكرة إلى الإنجاز في الرياض، المملكة العربية السعودية.",
  "Discover Halamesk — a Riyadh-based interior, architecture, and execution company built around clarity, precision, and lasting value.": "تعرّف على هالامسك، شركة التصميم الداخلي والعمارة والتنفيذ في الرياض، المبنية على الوضوح والدقة والقيمة المستدامة.",
  "Explore Halamesk's integrated interior design, architecture, fit-out, project management, and turnkey services in Riyadh.": "استكشف خدمات هالامسك المتكاملة في التصميم الداخلي والعمارة والتجهيز وإدارة المشاريع وحلول تسليم المفتاح في الرياض.",
  "Explore Halamesk residential, commercial, hospitality, workplace, healthcare, and public projects.": "استكشف مشاريع هالامسك السكنية والتجارية والضيافة وبيئات العمل والرعاية الصحية والمرافق العامة.",
  "Explore a selected Halamesk architecture and interior project.": "استكشف أحد مشاريع هالامسك المختارة في العمارة والتصميم الداخلي.",
  "We design. We detail. We build. We deliver.": "نصمم. ندقق. نبني. نسلّم.",
  "Creative vision, technical expertise, and integrated execution under one responsibility.": "رؤية إبداعية وخبرة فنية وتنفيذ متكامل تحت مسؤولية واحدة.",
  "Design and delivery services from the first brief to final handover.": "خدمات تصميم وتنفيذ من المتطلبات الأولى حتى التسليم النهائي.",
  "Selected spaces shaped through interior design, architecture, execution, and turnkey delivery.": "مساحات مختارة صيغت عبر التصميم الداخلي والعمارة والتنفيذ وحلول تسليم المفتاح.",
  "Interior, architecture and execution by Halamesk.": "تصميم داخلي وعمارة وتنفيذ من هالامسك.",
  "Halamesk home": "الصفحة الرئيسية لهالامسك",
  "Halamesk introduction": "مقدمة هالامسك",
  "About Halamesk": "عن هالامسك",
  "Halamesk services": "خدمات هالامسك",
  "Selected Halamesk projects": "مشاريع هالامسك المختارة",
  "Project introduction": "مقدمة المشروع",
  "We shape spaces that endure": "نشكّل مساحات تدوم",
  "Primary navigation": "التنقل الرئيسي",
  "Primary actions": "الإجراءات الرئيسية",
  "Footer navigation": "تنقل التذييل",
  "Halamesk footer": "تذييل هالامسك",
  "Open menu": "فتح القائمة",
  "Chat with Halamesk on WhatsApp": "تواصل مع هالامسك عبر واتساب",
  "LOADING EXPERIENCE": "جاري تحميل التجربة",
  "LOADING STORY": "جاري تحميل القصة",
  "LOADING CAPABILITIES": "جاري تحميل الخدمات",
  "LOADING SELECTED WORK": "جاري تحميل المشاريع",
  "LOADING PROJECT": "جاري تحميل المشروع",
  "ABOUT": "من نحن",
  "SERVICES": "الخدمات",
  "PROJECTS": "المشاريع",
  "PROJECT": "المشروع",
  "PERCENT": "بالمئة",
  "VIEW": "عرض",
  "Home": "الرئيسية",
  "About": "من نحن",
  "About us": "من نحن",
  "Services": "خدماتنا",
  "Projects": "مشاريعنا",
  "Contact": "تواصل معنا",
  "Start a project": "ابدأ مشروعك",
  "Explore our work": "استكشف مشاريعنا",
  "Explore": "استكشف",
  "Back to top ↑": "العودة للأعلى ↑",
  "All rights reserved": "جميع الحقوق محفوظة",
  "Riyadh, Saudi Arabia": "الرياض، المملكة العربية السعودية",
  "Riyadh — Saudi Arabia": "الرياض — المملكة العربية السعودية",
  "Riyadh — KSA": "الرياض — السعودية",
  "Halamesk / Riyadh": "هالامسك / الرياض",
  "Interior · Architecture · Execution": "تصميم داخلي · عمارة · تنفيذ",
  "Interior, Architecture & Execution": "تصميم داخلي · عمارة · تنفيذ",
  "Architecture, interior design & execution": "العمارة والتصميم الداخلي والتنفيذ",
  "We shape spaces": "نشكّل مساحات",
  "that endure.": "تدوم.",
  "Selected clients": "عملاؤنا",
  "Across public, commercial and infrastructure sectors": "في القطاعات الحكومية والتجارية والبنية التحتية",
  "Who we are": "من نحن",
  "Ideas become places when vision meets precision.": "تتحول الأفكار إلى أماكن حين تلتقي الرؤية بالدقة.",
  "Halamesk is an interior, architecture and execution company delivering integrated, design-led solutions from concept to completion.": "هالامسك شركة متخصصة في التصميم الداخلي والعمارة والتنفيذ، تقدم حلولاً متكاملة يقودها التصميم من الفكرة وحتى الإنجاز.",
  "We combine creative vision with technical expertise and strong execution capabilities to create thoughtful, functional and timeless spaces.": "نجمع بين الرؤية الإبداعية والخبرة الفنية وقدرات التنفيذ المتقدمة لنصنع مساحات مدروسة وعملية تتجاوز الزمن.",
  "Discover our approach": "اكتشف منهجيتنا",
  "Residential / Commercial / Hospitality": "سكني / تجاري / ضيافة",
  "Built around people": "مصممة حول الإنسان",
  "What we do": "ماذا نقدم",
  "One integrated team.": "فريق واحد متكامل.",
  "Every stage considered.": "كل مرحلة مدروسة.",
  "Design and delivery services that bring ideas to life with creativity, technical precision and execution excellence.": "خدمات تصميم وتنفيذ متكاملة تحول الأفكار إلى واقع بإبداع ودقة فنية وتميّز في التنفيذ.",
  "Interior Design": "التصميم الداخلي",
  "Architecture": "الهندسة المعمارية",
  "Fit-Out & Execution": "التجهيز والتنفيذ",
  "Project Management": "إدارة المشاريع",
  "Turnkey Solutions": "حلول تسليم مفتاح",
  "Thoughtful environments tailored to function, identity and experience.": "بيئات مدروسة تُصمم وفق الوظيفة والهوية والتجربة.",
  "Architectural solutions balancing vision, structure and context.": "حلول معمارية توازن بين الرؤية والبنية والسياق.",
  "Precise on-site delivery with craftsmanship and total detail control.": "تنفيذ دقيق في الموقع بحرفية وتحكم كامل في التفاصيل.",
  "Planning, scheduling and supervision from first brief to final handover.": "تخطيط وجدولة وإشراف من أول متطلب حتى التسليم النهائي.",
  "End-to-end delivery through one integrated responsibility.": "تنفيذ شامل من البداية إلى النهاية تحت مسؤولية متكاملة واحدة.",
  "Scroll film / 01—05": "رحلة المشروع / ٠١—٠٥",
  "01 / Discovery": "٠١ / الاستكشاف",
  "02 / Design": "٠٢ / التصميم",
  "03 / Detail": "٠٣ / التفاصيل",
  "04 / Execution": "٠٤ / التنفيذ",
  "05 / Delivery": "٠٥ / التسليم",
  "Discovery": "الاستكشاف",
  "Design": "التصميم",
  "Detail": "التفاصيل",
  "Execution": "التنفيذ",
  "Delivery": "التسليم",
  "We listen": "نستمع",
  "before we draw.": "قبل أن نرسم.",
  "Vision becomes": "تتحول الرؤية إلى",
  "spatial language.": "لغة مكانية.",
  "Every junction": "كل نقطة التقاء",
  "is resolved.": "محسوبة بدقة.",
  "Precision moves": "تنتقل الدقة",
  "to site.": "إلى الموقع.",
  "A complete space,": "مساحة مكتملة،",
  "ready for life.": "جاهزة للحياة.",
  "Scroll to direct the film": "مرّر لتوجيه المشهد",
  "Selected work": "مشاريع مختارة",
  "Spaces with a quiet, lasting presence.": "مساحات بحضور هادئ يدوم.",
  "Hospitality": "ضيافة",
  "Residential": "سكني",
  "Commercial": "تجاري",
  "Built with precision.": "نُنفذ بدقة.",
  "Delivered with confidence.": "ونُسلّم بثقة.",
  "Our integrated execution team translates design intent into finished environments through technical coordination, on-site quality control and skilled craftsmanship.": "يحوّل فريق التنفيذ المتكامل لدينا رؤية التصميم إلى مساحات مكتملة عبر التنسيق الفني وضبط الجودة في الموقع والحرفية المتخصصة.",
  "crafted items through": "قطعة مصنوعة عبر",
  "in-house woodwork": "مصنعنا الداخلي للأعمال الخشبية",
  "Have a space in mind?": "هل لديك مساحة في ذهنك؟",
  "Let’s create": "لنصنع معاً",
  "what lasts.": "ما يدوم.",
  "Halamesk Studio": "استوديو هالامسك",
  "Email": "البريد الإلكتروني",
  "Mobile": "الجوال",
  "Location": "الموقع",
  "Capabilities": "خدماتنا",
  "Have a project?": "لديك مشروع؟",

  "About / Halamesk": "عن هالامسك",
  "Integrated by design": "تكامل يبدأ من التصميم",
  "One vision.": "رؤية واحدة.",
  "From concept": "من الفكرة",
  "to completion.": "إلى الإنجاز.",
  "Our story": "قصتنا",
  "A complete journey, held under one vision.": "رحلة متكاملة تقودها رؤية واحدة.",
  "We combine creative vision with technical expertise and strong execution capabilities to create thoughtful, functional and timeless spaces for residential, commercial and hospitality projects.": "نجمع بين الرؤية الإبداعية والخبرة الفنية وقدرات التنفيذ المتقدمة لنصنع مساحات مدروسة وعملية تتجاوز الزمن في المشاريع السكنية والتجارية والضيافة.",
  "Our approach is built on a deep understanding of space, people and detail—ensuring every project carries quality, precision and lasting value.": "تقوم منهجيتنا على فهم عميق للمكان والإنسان والتفاصيل، لنضمن أن يحمل كل مشروع الجودة والدقة والقيمة المستدامة.",
  "We design.": "نصمم.",
  "We detail.": "ندقق.",
  "We build.": "نبني.",
  "We deliver.": "نسلّم.",
  "Spaces shaped around people": "مساحات تُشكّل حول الإنسان",
  "Our philosophy": "فلسفتنا",
  "Clarity, purpose and lasting value.": "وضوح وغاية وقيمة تدوم.",
  "Successful spaces balance function and beauty, where every line, material and detail serves a reason. From first concept to final execution, we shape each experience around the people who use it.": "توازن المساحات الناجحة بين الوظيفة والجمال، حيث يخدم كل خط ومادة وتفصيل غاية واضحة. ومن الفكرة الأولى حتى التنفيذ النهائي، نصوغ التجربة حول من يستخدم المكان.",
  "For us, design is not only about how a space looks—but how it works, feels and endures.": "بالنسبة لنا، لا يقتصر التصميم على شكل المكان، بل يشمل أداءه وإحساسه وقدرته على الاستمرار.",
  "Function": "الوظيفة",
  "Beauty": "الجمال",
  "User experience": "تجربة المستخدم",
  "Execution quality": "جودة التنفيذ",
  "Why Halamesk": "لماذا هالامسك",
  "WHY HALAMESK · WHY HALAMESK · WHY HALAMESK ·": "لماذا هالامسك · لماذا هالامسك · لماذا هالامسك ·",
  "One partner.": "شريك واحد.",
  "Every detail accountable.": "مسؤول عن كل تفصيل.",
  "A seamless journey through design, technical coordination and execution—managed under one responsibility.": "رحلة سلسة عبر التصميم والتنسيق الفني والتنفيذ، تُدار تحت مسؤولية واحدة.",
  "Integrated approach": "نهج متكامل",
  "Design-led execution": "تنفيذ يقوده التصميم",
  "Attention to detail": "عناية بالتفاصيل",
  "Technical coordination": "تنسيق فني",
  "Quality control": "ضبط الجودة",
  "Single responsibility": "مسؤولية واحدة",
  "A seamless journey from concept to completion, unifying design, architecture and execution under one vision.": "رحلة متكاملة من الفكرة إلى الإنجاز، توحّد التصميم والعمارة والتنفيذ تحت رؤية واحدة.",
  "Strong design sensitivity guides every decision from the first line through final delivery.": "حس تصميمي رفيع يوجّه كل قرار من الخط الأول حتى التسليم النهائي.",
  "Thoughtful detailing strengthens quality, function and timeless appeal.": "تفاصيل مدروسة تعزز الجودة والوظيفة والجمال الذي لا يتقادم.",
  "Precise alignment between design, engineering and on-site execution.": "مواءمة دقيقة بين التصميم والهندسة والتنفيذ في الموقع.",
  "Consistent quality through careful supervision and proven processes.": "جودة ثابتة من خلال الإشراف الدقيق والعمليات الموثوقة.",
  "One reliable partner accountable for the complete process and final result.": "شريك موثوق واحد يتحمل مسؤولية العملية كاملة والنتيجة النهائية.",
  "Made by Halamesk": "صُنع في هالامسك",
  "Precision moves from drawing to material.": "تنتقل الدقة من الرسم إلى المادة.",
  "Our in-house woodwork factory gives us full control over design, quality and execution—allowing us to deliver custom pieces precisely built to our standards.": "يمنحنا مصنع الأعمال الخشبية الداخلي تحكماً كاملاً في التصميم والجودة والتنفيذ، لنقدم قطعاً مخصصة تُصنع بدقة وفق معاييرنا.",
  "Design and production teams work side by side so every detail remains faithful to the original vision.": "يعمل فريقا التصميم والإنتاج جنباً إلى جنب ليظل كل تفصيل أميناً للرؤية الأصلية.",
  "m² factory area": "م² مساحة المصنع",
  "Integrated production": "إنتاج متكامل",
  "Specialized teams": "فرق متخصصة",
  "Advanced machinery": "آلات متقدمة",
  "Custom manufacturing": "تصنيع مخصص",
  "From design to reality": "من التصميم إلى الواقع",
  "Spaces that work.": "مساحات تعمل بكفاءة.",
  "Details that endure.": "تفاصيل تدوم.",

  "Services / Capabilities": "الخدمات / القدرات",
  "02 / Capabilities": "٠٢ / القدرات",
  "One integrated team": "فريق واحد متكامل",
  "Every stage.": "كل مرحلة.",
  "Considered.": "مدروسة.",
  "Explore services": "استكشف خدماتنا",
  "Design, delivery, and every decision between.": "التصميم والتنفيذ، وكل قرار بينهما.",
  "We provide integrated design and delivery services that bring ideas to life with creativity, technical precision and execution excellence.": "نقدم خدمات تصميم وتنفيذ متكاملة تحوّل الأفكار إلى واقع بإبداع ودقة فنية وتميّز في التنفيذ.",
  "One team carries the vision from the first conversation through technical coordination, site delivery and final handover.": "يحمل فريق واحد الرؤية من الحوار الأول، مروراً بالتنسيق الفني والتنفيذ في الموقع، وحتى التسليم النهائي.",
  "DESIGN · DETAIL · BUILD · DELIVER · DESIGN · DETAIL · BUILD · DELIVER ·": "نصمم · ندقق · نبني · نسلّم · نصمم · ندقق · نبني · نسلّم ·",
  "Capabilities": "القدرات",
  "Thoughtful interior environments tailored to function, identity and experience.": "بيئات داخلية مدروسة ومصممة للوظيفة والهوية والتجربة.",
  "Space planning": "تخطيط المساحات",
  "Materiality": "المواد",
  "User experience": "تجربة المستخدم",
  "Architectural solutions that balance vision, structure and context.": "حلول معمارية توازن بين الرؤية والبنية والسياق.",
  "Concept design": "التصميم المفاهيمي",
  "Spatial planning": "التخطيط المكاني",
  "Technical drawings": "المخططات الفنية",
  "Precise on-site execution with quality craftsmanship and complete detail control.": "تنفيذ دقيق في الموقع بحرفية عالية وتحكم كامل في التفاصيل.",
  "Site execution": "تنفيذ الموقع",
  "Craftsmanship": "الحرفية",
  "Coordinated planning, scheduling and supervision from start to finish.": "تخطيط وجدولة وإشراف منسق من البداية إلى النهاية.",
  "Planning": "التخطيط",
  "Scheduling": "الجدولة",
  "Supervision": "الإشراف",
  "End-to-end delivery through a single integrated responsibility.": "تنفيذ شامل من البداية إلى النهاية عبر مسؤولية متكاملة واحدة.",
  "One partner": "شريك واحد",
  "Integrated delivery": "تنفيذ متكامل",
  "Ready for use": "جاهز للاستخدام",
  "From concept to completion": "من الفكرة إلى الإنجاز",
  "One continuous journey.": "رحلة واحدة متصلة.",
  "Nine resolved stages.": "تسع مراحل مدروسة.",
  "We manage the full journey from the initial brief to final handover through an integrated design-and-build process, ensuring a seamless experience and exceptional results.": "ندير الرحلة كاملة من المتطلبات الأولية حتى التسليم النهائي عبر عملية تصميم وبناء متكاملة تضمن تجربة سلسة ونتائج استثنائية.",
  "Brief": "فهم الاحتياج",
  "Concept": "الفكرة",
  "Design Development": "تطوير التصميم",
  "Technical Drawings": "المخططات الفنية",
  "Material Selection": "اختيار المواد",
  "Procurement": "التوريد",
  "Handover": "التسليم",
  "We listen and understand your goals and requirements.": "نستمع ونفهم أهدافك ومتطلباتك.",
  "We develop the initial concept direction and creative approach.": "نطوّر اتجاه الفكرة الأولية والمنهج الإبداعي.",
  "We refine the design, spatial plans and key details.": "نصقل التصميم والمخططات المكانية والتفاصيل الرئيسية.",
  "We produce coordinated and detailed technical drawings.": "ننتج مخططات فنية منسقة ومفصلة.",
  "We select the finishes and materials that define the look and quality.": "نختار التشطيبات والمواد التي تحدد المظهر والجودة.",
  "We source and procure all required materials and elements.": "نؤمّن ونورّد جميع المواد والعناصر المطلوبة.",
  "We execute on site with skilled craftsmanship and precision.": "ننفذ في الموقع بحرفية ودقة.",
  "We oversee quality, progress and compliance at every stage.": "نشرف على الجودة والتقدم والالتزام في كل مرحلة.",
  "We deliver a fully completed space ready for use.": "نسلّم مساحة مكتملة وجاهزة للاستخدام.",
  "Environments": "البيئات",
  "One method.": "منهج واحد.",
  "Different worlds.": "عوالم مختلفة.",
  "Ready to begin?": "جاهز للبدء؟",
  "Your vision.": "رؤيتك.",
  "One accountable team.": "فريق واحد مسؤول.",

  "Projects / Selected work": "المشاريع / أعمال مختارة",
  "Projects /": "المشاريع /",
  "Spaces for people": "مساحات للإنسان",
  "Places built": "أماكن مصممة",
  "to endure.": "لتدوم.",
  "Explore the archive": "استكشف المشاريع",
  "Different needs. One standard of care.": "احتياجات مختلفة. ومعيار واحد للعناية.",
  "From private residences to corporate workplaces and public environments, every project is shaped around function, identity and experience.": "من المساكن الخاصة إلى بيئات العمل المؤسسية والمرافق العامة، يتشكل كل مشروع حول الوظيفة والهوية والتجربة.",
  "Filter the archive by environment. Each project also shows the services carried by Halamesk from design through delivery.": "صفِّ المشاريع حسب نوع البيئة، واستكشف الخدمات التي قدمتها هالامسك من التصميم وحتى التسليم.",
  "Filter projects": "تصفية المشاريع",
  "All": "الكل",
  "projects": "مشروعاً",
  "Have a space in mind?": "هل لديك مساحة في ذهنك؟",
  "Let’s shape": "لنصنع",
  "what comes next.": "ما هو قادم.",

  "Restaurant": "المطعم",
  "Alwaha Villa": "فيلا الواحة",
  "SAPTCO Hub": "مركز سابتكو",
  "Almalga Villa": "فيلا الملقا",
  "NWC Operation Control Center": "مركز التحكم التشغيلي للمياه",
  "Alyaqout Villa": "فيلا الياقوت",
  "Alhammadi Hospital": "مستشفى الحمادي",
  "Alhamra Villa": "فيلا الحمراء",
  "SAT Terminal": "محطة سات",
  "Albasatin Villa": "فيلا البساتين",
  "Aquakia Offices": "مكاتب أكواكيا",
  "Alnarjis Villa": "فيلا النرجس",
  "SAPTCO CEO Office": "مكتب الرئيس التنفيذي لسابتكو",
  "Living Room Jeddah": "غرفة معيشة — جدة",
  "NWC Training Center": "مركز تدريب المياه",
  "Alquds Villa": "فيلا القدس",
  "SAT Jeddah": "سات جدة",
  "Alworood Villa": "فيلا الورود",
  "Abha": "أبها",
  "Obhor Villa": "فيلا أبحر",
  "SAT Najran": "سات نجران",
  "Girls’ Bedroom": "غرفة البنات",
  "SAT Bus Stop": "موقف حافلات سات",
  "Aram Villa": "فيلا آرام",
  "Alaqiq Villa": "فيلا العقيق",
  "Riyadh": "الرياض",
  "Jeddah": "جدة",
  "Khamis Mushait": "خميس مشيط",
  "Saudi Arabia": "المملكة العربية السعودية",
  "Najran": "نجران",
  "Healthcare": "رعاية صحية",
  "Transport": "نقل",
  "Workplace": "بيئة عمل",
  "Residential · Riyadh": "سكني · الرياض",
  "Residential · Jeddah": "سكني · جدة",
  "Commercial · Riyadh": "تجاري · الرياض",
  "Commercial · Khamis Mushait": "تجاري · خميس مشيط",
  "Commercial · Healthcare": "تجاري · رعاية صحية",
  "Commercial · Transport": "تجاري · نقل",
  "Commercial · Workplace": "تجاري · بيئة عمل",
  "Commercial · Abha": "تجاري · أبها",
  "Commercial · Jeddah": "تجاري · جدة",
  "Commercial · Najran": "تجاري · نجران",
  "Architecture · Interior": "عمارة · تصميم داخلي",
  "Interior · Execution": "تصميم داخلي · تنفيذ",
  "Design · Execution": "تصميم · تنفيذ",

  "Project": "مشروع",
  "Project overview": "نظرة عامة على المشروع",
  "View project": "عرض المشروع",
  "Environment": "نوع المشروع",
  "Scope": "نطاق العمل",
  "Images": "الصور",
  "selected views": "لقطات مختارة",
  "Selected views": "لقطات مختارة",
  "Gallery": "المعرض",
  "Images": "الصور",
  "/ Images": "/ الصور",
  "Next project": "المشروع التالي"
}));

const projectArabic = {
  "restaurant": { name: "المطعم", category: "ضيافة", location: "المملكة العربية السعودية", scope: "التصميم الداخلي", description: "بيئة ضيافة يغمرها الضوء، تتشكل عبر منحنيات ناعمة ونباتات متدرجة وجلسات حميمة تصنع اتصالاً هادئاً مع الطبيعة." },
  "alwaha-villa": { name: "فيلا الواحة", category: "سكني", location: "الرياض", scope: "عمارة · تصميم داخلي", description: "مسكن خاص معاصر تحدده خطوط معمارية قوية وخضرة متكاملة وأفنية مدروسة ولوحة مواد هادئة." },
  "saptco-hub": { name: "مركز سابتكو", category: "تجاري", location: "الرياض", scope: "التصميم الداخلي", description: "مركز مرن للموظفين يوازن بين العمل والاجتماع والاسترخاء عبر أعمال خشبية دافئة ومساحات خضراء ومناطق اجتماعية متتابعة." },
  "almalga-villa": { name: "فيلا الملقا", category: "سكني", location: "الرياض", scope: "التصميم الداخلي", description: "تصميم داخلي راقٍ لفيلا تجمع فيه الألوان الدافئة والأثاث المصمم والإضاءة النحتية لتصنع فخامة سكنية هادئة." },
  "nwc-operation-control": { name: "مركز التحكم التشغيلي للمياه", category: "تجاري", location: "خميس مشيط", scope: "عمارة · تصميم داخلي", description: "بيئة عمل وتحكم متكاملة صُممت حول الوضوح والتركيز التشغيلي وهوية معمارية معاصرة." },
  "alyaqout-villa": { name: "فيلا الياقوت", category: "سكني", location: "جدة", scope: "التصميم الداخلي", description: "مسكن عائلي متزن يجمع بين النسب الكلاسيكية والتفاصيل المعاصرة في مساحات المعيشة والطعام والاستقبال." },
  "alhammadi-hospital": { name: "مستشفى الحمادي", category: "تجاري", location: "الرياض", scope: "التصميم الداخلي", description: "تطوير لبيئة رعاية صحية يركز على وضوح الحركة والراحة وتجربة أكثر دفئاً للمرضى في المساحات العامة والإدارية." },
  "alhamra-villa": { name: "فيلا الحمراء", category: "سكني", location: "الرياض", scope: "التصميم الداخلي", description: "تصميم داخلي سكني متكامل بغرف نوم ومعيشة مدروسة، توحدها المواد الناعمة والتفاصيل الدقيقة." },
  "sat-terminal": { name: "محطة سات", category: "تجاري", location: "المملكة العربية السعودية", scope: "الهندسة المعمارية", description: "تصور مميز لمحطة ركاب يجمع بين هوية نقل واضحة وحركة عملية للوصول والمغادرة والمركبات." },
  "albasatin-villa": { name: "فيلا البساتين", category: "سكني", location: "جدة", scope: "الهندسة المعمارية", description: "دراسة لفناء خاص تستخدم الحجر والماء والنباتات والشاشات الهندسية لصنع الخصوصية وإدخال ضوء النهار إلى المنزل." },
  "aquakia-offices": { name: "مكاتب أكواكيا", category: "تجاري", location: "الرياض", scope: "التصميم الداخلي", description: "بيئة عمل نابضة تستلهم هوية العميل الزرقاء، وتضم مكاتب مركزة وغرف تعاون وتفاصيل مخصصة ونقية." },
  "alnarjis-villa": { name: "فيلا النرجس", category: "سكني", location: "الرياض", scope: "عمارة · تصميم داخلي", description: "فيلا حديثة تنظمها أفنية مزروعة ومداخل هادئة، وتوازن بين البساطة المعمارية وراحة الحياة اليومية." },
  "saptco-ceo-office": { name: "مكتب الرئيس التنفيذي لسابتكو", category: "تجاري", location: "الرياض", scope: "التصميم الداخلي", description: "بيئة مكتبية تنفيذية تعبّر عنها الأخشاب الغنية وجدران العرض المدمجة والإضاءة المضبوطة بعناية." },
  "living-room-jeddah": { name: "غرفة معيشة — جدة", category: "سكني", location: "جدة", scope: "التصميم الداخلي", description: "تكوين دافئ ومتوازن لغرفة معيشة بجلسات متدرجة وإضاءة زخرفية ولوحة ألوان محايدة وأنيقة." },
  "nwc-training-center": { name: "مركز تدريب المياه", category: "تجاري", location: "أبها", scope: "عمارة · تصميم داخلي", description: "منشأة تدريب متعددة المساحات تجمع هوية معمارية واثقة مع بيئات مرنة للتعلم والاجتماعات والضيافة." },
  "alquds-villa": { name: "فيلا القدس", category: "سكني", location: "المملكة العربية السعودية", scope: "الهندسة المعمارية", description: "تحول لواجهة سكنية يركز على النسب والتناظر وتسلسل وصول مرحّب." },
  "sat-jeddah": { name: "سات جدة", category: "تجاري", location: "جدة", scope: "الهندسة المعمارية", description: "مبنى نقل بواجهة زجاجية نظيفة، صُمم بملامح واضحة وهوية قوية وحركة عامة فعالة." },
  "alworood-villa": { name: "فيلا الورود", category: "سكني", location: "الرياض", scope: "تصميم داخلي · تنفيذ", description: "مشروع فيلا انتقل من التصميم إلى التنفيذ، جامعاً الأعمال الخشبية المخصصة ومساحات المعيشة الراقية والتنسيق الدقيق في الموقع." },
  "abha": { name: "أبها", category: "تجاري", location: "أبها", scope: "الهندسة المعمارية", description: "مبنى تجاري مدمج بحضور مدني قوي ومدخل مؤطر وهوية مواد واضحة تلائم موقعه." },
  "obhor-villa": { name: "فيلا أبحر", category: "سكني", location: "جدة", scope: "عمارة · تصميم داخلي", description: "تصور لفيلا خاصة يجمع بين التصميمات الداخلية المعاصرة الدافئة والمساحات الخارجية المزروعة والطابع الساحلي المريح." },
  "sat-najran": { name: "سات نجران", category: "تجاري", location: "نجران", scope: "عمارة · تصميم داخلي", description: "بيئة ركاب تدخل ضوء النهار وسهولة الحركة ولغة المواد المحلية الدافئة إلى محطة حديثة." },
  "girls-bedroom": { name: "غرفة البنات", category: "سكني", location: "المملكة العربية السعودية", scope: "التصميم الداخلي", description: "غرفة نوم مشتركة أنيقة بألوان هادئة وتناظر متوازن وحلول تخزين عملية مصممة لمستخدميها." },
  "sat-bus-stop": { name: "موقف حافلات سات", category: "تجاري", location: "المملكة العربية السعودية", scope: "الهندسة المعمارية", description: "تصور مدمج لموقف حافلات بهوية واضحة، صُمم كعنصر عملي ومرحّب يمكن تمييزه في المجال العام." },
  "interior-design": { name: "تصميم داخلي", category: "سكني", location: "المملكة العربية السعودية", scope: "التصميم الداخلي", description: "مساحة مشرقة ومفتوحة للجمهور تحددها الشفافية والإيقاع البنيوي والحركة المفتوحة بين مناطق الانتظار المتصلة." },
  "aram-villa": { name: "فيلا آرام", category: "سكني", location: "جدة", scope: "الهندسة المعمارية", description: "دراسة لفيلا معاصرة تتشكل من كتل متزاحة ولمسات خشبية دافئة وفتحات واسعة على المشهد الخارجي." },
  "alaqiq-villa": { name: "فيلا العقيق", category: "سكني", location: "الرياض", scope: "تصميم · تنفيذ", description: "مشروع سكني تطور من مفهوم التصميم الداخلي إلى التنفيذ في الموقع، جامعاً مساحات مخصصة وتنفيذاً منسقاً." }
};

export function localizeProject(project) {
  return isArabic && projectArabic[project.slug] ? { ...project, ...projectArabic[project.slug] } : project;
}

export function withLanguage(href) {
  if (!isArabic) return href;
  const url = new URL(href, location.href);
  if (url.origin !== location.origin) return href;
  url.searchParams.set("lang", "ar");
  return `${url.pathname}${url.search}${url.hash}`;
}

function translateValue(value) {
  return translations.get(value.trim()) || value;
}

function translateTextNodes() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (!node.parentElement || ["SCRIPT", "STYLE"].includes(node.parentElement.tagName)) return;
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if (!trimmed || !translations.has(trimmed)) return;
    node.nodeValue = raw.replace(trimmed, translations.get(trimmed));
  });
}

function translateAttributes() {
  document.querySelectorAll("[aria-label], [alt], [title], [data-cursor]").forEach((element) => {
    ["aria-label", "alt", "title", "data-cursor"].forEach((name) => {
      if (!element.hasAttribute(name)) return;
      const value = element.getAttribute(name);
      if (translations.has(value)) element.setAttribute(name, translations.get(value));
    });
  });
}

function localizeMetadata() {
  document.title = translateValue(document.title);
  document.querySelectorAll('meta[name="description"], meta[property="og:title"], meta[property="og:description"]').forEach((meta) => {
    meta.content = translateValue(meta.content);
  });
}

function addAlternateLinks() {
  const englishUrl = new URL(location.href);
  englishUrl.searchParams.delete("lang");
  const arabicUrl = new URL(englishUrl);
  arabicUrl.searchParams.set("lang", "ar");
  [["en", englishUrl], ["ar", arabicUrl], ["x-default", englishUrl]].forEach(([language, url]) => {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = language;
    link.href = url.href;
    document.head.append(link);
  });
}

function addLanguageSwitches() {
  const switchUrl = new URL(location.href);
  if (isArabic) switchUrl.searchParams.delete("lang");
  else switchUrl.searchParams.set("lang", "ar");
  const href = `${switchUrl.pathname}${switchUrl.search}${switchUrl.hash}`;

  const desktopSwitch = document.createElement("a");
  desktopSwitch.className = "language-switch";
  desktopSwitch.dataset.languageSwitch = "true";
  desktopSwitch.href = href;
  desktopSwitch.lang = isArabic ? "en" : "ar";
  desktopSwitch.textContent = isArabic ? "EN" : "العربية";
  desktopSwitch.setAttribute("aria-label", isArabic ? "التبديل إلى الإنجليزية" : "التبديل إلى العربية");
  document.querySelector(".site-nav")?.append(desktopSwitch);

  const mobileSwitch = desktopSwitch.cloneNode(true);
  mobileSwitch.className = "language-switch language-switch--mobile";
  const mobileMenu = document.querySelector(".mobile-menu");
  if (mobileMenu) mobileMenu.insertBefore(mobileSwitch, mobileMenu.querySelector("p"));
}

function persistArabicLinks() {
  if (!isArabic) return;
  document.querySelectorAll('a[href]:not([data-language-switch])').forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("https://wa.me") || href.startsWith("https://www.instagram.com")) return;
    link.setAttribute("href", withLanguage(href));
  });
  document.querySelectorAll('a[href^="https://wa.me"]').forEach((link) => {
    link.href = "https://wa.me/966575646693?text=" + encodeURIComponent("مرحباً هالامسك، أود البدء بمشروع جديد.");
  });
}

addAlternateLinks();
addLanguageSwitches();

if (isArabic) {
  document.documentElement.lang = "ar";
  document.documentElement.dir = "rtl";
  document.body.classList.add("is-arabic");
  translateTextNodes();
  translateAttributes();
  localizeMetadata();
  persistArabicLinks();
}
