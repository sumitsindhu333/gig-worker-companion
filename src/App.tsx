import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight, ArrowLeft, Languages, ShieldCheck, Wallet, FileText, Landmark,
  MessageSquareText, Home, ChartNoAxesCombined, Settings, LogOut, Check,
  CarFront, HardHat, Bike, Plus, X, ChevronRight, CircleHelp, Sparkles,
  Clock3, IndianRupee, TrendingUp, Upload, Copy, Menu, Send, CloudRain,
  FileCheck2, BadgeCheck, AlertCircle
} from 'lucide-react'

type Lang = 'en' | 'hi'
type Profession = 'driver' | 'daily' | 'delivery'
type Page = 'login' | 'language' | 'profession' | 'app'
type Feature = 'home' | 'earnings' | 'assistant' | 'schemes' | 'documents' | 'complaints' | 'settings'
type Entry = { id: number; date: string; kind: 'income' | 'expense'; category: string; amount: number; note: string }

const copy = {
  en: {
    brand: 'KaamSaathi', tagline: 'Your work. Your wellbeing. One companion.',
    loginTitle: 'Good to have you here', loginSub: 'Your everyday companion for work and earnings.',
    email: 'Email address', password: 'Password', login: 'Log in to continue',
    demo: 'Demo access', demoEmail: 'Email', demoPassword: 'Password', demoNote: 'Use these credentials to explore the prototype.',
    invalid: 'Please enter the demo email and password shown below.',
    languageTitle: 'Choose your language', languageSub: 'You can change this any time in Settings.',
    english: 'English', englishSub: 'Continue in English', hindi: 'हिंदी', hindiSub: 'हिंदी में आगे बढ़ें',
    continue: 'Continue', professionTitle: 'What kind of work do you do?', professionSub: 'Select all that apply. We’ll personalize your companion around your work.',
    driver: 'Cab Driver', driverDesc: 'Cab, taxi and app-based drivers', daily: 'Daily-Wage Worker', dailyDesc: 'Daily-wage and informal workers',
    delivery: 'Delivery Partner', deliveryDesc: 'Food, grocery and parcel delivery',
    selected: 'selected', chooseOne: 'Choose at least one profession to continue.',
    greeting: 'Good morning', welcome: 'How can we make your workday easier?',
    dashboard: 'Your companion', today: "Today's overview", income: 'Earnings', expenses: 'Expenses', net: 'Net earnings',
    quickActions: 'How can we help today?', viewAll: 'View all', weekly: 'This week', activity: 'Recent activity',
    earningsTitle: 'Earnings tracker', earningsSub: 'Know what you earn and what you spend.',
    addRecord: 'Add record', incomeLabel: 'Income', expenseLabel: 'Expense', amount: 'Amount (₹)', category: 'Category',
    date: 'Date', note: 'Note (optional)', save: 'Save record', cancel: 'Cancel', noRecords: 'No records yet. Add your first income or expense.',
    netCalc: 'Net earnings', totalIncome: 'Total income', totalExpenses: 'Total expenses',
    assistantTitle: 'AI companion', assistantSub: 'Ask a question in your own words. I’ll help you find a next step.',
    typeMessage: 'Type your question…', send: 'Send', suggested: 'Try asking', q1: 'How do I calculate net earnings?', q2: 'My payment is delayed', q3: 'What safety steps should I take in rain?',
    assistantWelcome: 'Namaste! I’m your KaamSaathi companion. I can help with earnings, safety, worker schemes, documents and complaints. What would you like help with today?',
    schemesTitle: 'Schemes & worker rights', schemesSub: 'Explore useful starting points. Always verify eligibility with the official department.',
    scheme1: 'e-Shram registration', scheme1Desc: 'A national database initiative for eligible unorganised workers. Check the official portal for current eligibility and registration steps.',
    scheme2: 'Building and construction worker welfare', scheme2Desc: 'Some states provide welfare benefits to eligible registered construction workers. Rules vary by state.',
    scheme3: 'State worker welfare resources', scheme3Desc: 'Find the relevant labour department or welfare board for your state and occupation.',
    official: 'Official portal', verifiedNote: 'These are starting points, not a confirmation of eligibility. Scheme rules may change.',
    documentsTitle: 'Document assistant', documentsSub: 'Choose a file to prepare it for explanation in simple language.',
    upload: 'Choose document or image', uploadHint: 'PDF, JPG or PNG · Demo interface', noFile: 'No file selected',
    docNotice: 'Document analysis is not connected in this prototype. No information will be extracted until an OCR/AI service is configured.',
    complaintsTitle: 'Complaint assistant', complaintsSub: 'Tell us what happened and prepare a draft you can review.',
    issue: 'What is the issue?', organization: 'Platform or organization', expected: 'Expected amount (₹)', actual: 'Amount received (₹)', incidentDate: 'Incident date', details: 'Additional details',
    draft: 'Generate draft', draftTitle: 'Your complaint draft', editDraft: 'You can edit this draft before using it.', copyDraft: 'Copy draft', copied: 'Draft copied',
    complaintPlaceholder: 'e.g. Payment was short or delayed', orgPlaceholder: 'e.g. Delivery platform or employer', detailPlaceholder: 'Add order ID, dates, or other details',
    settingsTitle: 'Settings', settingsSub: 'Manage your preferences and selected work types.',
    languageSetting: 'App language', professionsSetting: 'Your professions', update: 'Update preferences', logout: 'Log out',
    navHome: 'Home', navEarnings: 'Earnings', navAssistant: 'AI assistant', navSchemes: 'Schemes & rights', navDocuments: 'Documents', navComplaints: 'Complaints', navSettings: 'Settings',
    help: 'Help centre', demoMode: 'Prototype demo', online: 'Here to help', back: 'Back', soon: 'Coming soon',
    safetyTitle: 'Safety guidance', safetySub: 'Practical reminders for safer workdays.',
    safety1: 'Before you start', safety1Desc: 'Check your vehicle or tools, phone battery, and required protective equipment.',
    safety2: 'Bad weather', safety2Desc: 'Slow down, improve visibility, avoid flooded roads, and stop somewhere safe if conditions become dangerous.',
    safety3: 'Fatigue', safety3Desc: 'Take breaks when tired. Do not drive or operate equipment when you cannot do so safely.',
    demoData: 'Demo data', delete: 'Remove', professionContext: 'Your selected work', workContexts: 'Work profiles',
    emptyChat: 'Start a conversation by choosing a question below or typing your own.',
    complaintIntro: 'To help prepare a useful draft, share the key details below. Check the draft carefully before sending it.',
    amountError: 'Enter a valid amount greater than zero.', saved: 'Record added successfully.',
    switchProfession: 'Edit professions', backDashboard: 'Back to dashboard', profile: 'Worker profile',
  },
  hi: {
    brand: 'कामसाथी', tagline: 'आपका काम। आपकी सुरक्षा। आपका साथी।',
    loginTitle: 'आपका स्वागत है', loginSub: 'काम और कमाई के लिए आपका रोज़ का साथी।',
    email: 'ईमेल पता', password: 'पासवर्ड', login: 'लॉग इन करें',
    demo: 'डेमो लॉगिन', demoEmail: 'ईमेल', demoPassword: 'पासवर्ड', demoNote: 'इस प्रोटोटाइप को देखने के लिए ये जानकारी इस्तेमाल करें।',
    invalid: 'कृपया नीचे दिया गया डेमो ईमेल और पासवर्ड दर्ज करें।',
    languageTitle: 'अपनी भाषा चुनें', languageSub: 'आप इसे सेटिंग्स में कभी भी बदल सकते हैं।',
    english: 'English', englishSub: 'अंग्रेज़ी में आगे बढ़ें', hindi: 'हिंदी', hindiSub: 'हिंदी में आगे बढ़ें',
    continue: 'आगे बढ़ें', professionTitle: 'आप किस तरह का काम करते हैं?', professionSub: 'एक या एक से अधिक विकल्प चुनें। हम आपके काम के अनुसार मदद दिखाएँगे।',
    driver: 'कैब ड्राइवर', driverDesc: 'कैब, टैक्सी और ऐप से चलने वाले ड्राइवर', daily: 'दिहाड़ी मजदूर', dailyDesc: 'दिहाड़ी और असंगठित क्षेत्र के कामगार',
    delivery: 'डिलीवरी पार्टनर', deliveryDesc: 'खाना, किराना और पार्सल पहुँचाने वाले',
    selected: 'चुने गए', chooseOne: 'आगे बढ़ने के लिए कम से कम एक काम चुनें।',
    greeting: 'नमस्ते', welcome: 'आज आपका काम आसान बनाने में हम कैसे मदद करें?',
    dashboard: 'आपका साथी', today: 'आज का सारांश', income: 'कमाई', expenses: 'खर्च', net: 'शुद्ध कमाई',
    quickActions: 'आज हम आपकी क्या मदद करें?', viewAll: 'सभी देखें', weekly: 'इस सप्ताह', activity: 'हाल की गतिविधियाँ',
    earningsTitle: 'कमाई का हिसाब', earningsSub: 'जानें कि आपने कितना कमाया और कितना खर्च किया।',
    addRecord: 'रिकॉर्ड जोड़ें', incomeLabel: 'कमाई', expenseLabel: 'खर्च', amount: 'राशि (₹)', category: 'श्रेणी',
    date: 'तारीख', note: 'नोट (ज़रूरी नहीं)', save: 'रिकॉर्ड सेव करें', cancel: 'रद्द करें', noRecords: 'अभी कोई रिकॉर्ड नहीं है। पहली कमाई या खर्च जोड़ें।',
    netCalc: 'शुद्ध कमाई', totalIncome: 'कुल कमाई', totalExpenses: 'कुल खर्च',
    assistantTitle: 'AI साथी', assistantSub: 'अपने शब्दों में सवाल पूछें। मैं अगला कदम समझने में मदद करूँगा।',
    typeMessage: 'अपना सवाल लिखें…', send: 'भेजें', suggested: 'ये सवाल पूछ सकते हैं', q1: 'शुद्ध कमाई कैसे निकालें?', q2: 'मेरी पेमेंट देर से आई है', q3: 'बारिश में सुरक्षा के लिए क्या करें?',
    assistantWelcome: 'नमस्ते! मैं आपका कामसाथी हूँ। मैं कमाई, सुरक्षा, सरकारी योजनाओं, दस्तावेज़ों और शिकायतों में मदद कर सकता हूँ। आज आपको किस चीज़ में मदद चाहिए?',
    schemesTitle: 'योजनाएँ और कामगारों के अधिकार', schemesSub: 'यहाँ से जानकारी लेना शुरू करें। पात्रता की पुष्टि संबंधित सरकारी विभाग से करें।',
    scheme1: 'ई-श्रम पंजीकरण', scheme1Desc: 'पात्र असंगठित कामगारों के लिए राष्ट्रीय डेटाबेस पहल। पात्रता और पंजीकरण की मौजूदा जानकारी आधिकारिक पोर्टल पर देखें।',
    scheme2: 'निर्माण कामगार कल्याण', scheme2Desc: 'कुछ राज्यों में पंजीकृत और पात्र निर्माण कामगारों को लाभ मिलते हैं। नियम राज्य के अनुसार अलग हो सकते हैं।',
    scheme3: 'राज्य के कामगार कल्याण संसाधन', scheme3Desc: 'अपने राज्य और काम के अनुसार श्रम विभाग या कल्याण बोर्ड की जानकारी खोजें।',
    official: 'आधिकारिक पोर्टल', verifiedNote: 'ये शुरुआती जानकारी है, पात्रता की पुष्टि नहीं। योजनाओं के नियम बदल सकते हैं।',
    documentsTitle: 'दस्तावेज़ सहायक', documentsSub: 'दस्तावेज़ चुनें ताकि उसे आसान भाषा में समझाने की तैयारी की जा सके।',
    upload: 'दस्तावेज़ या तस्वीर चुनें', uploadHint: 'PDF, JPG या PNG · डेमो इंटरफ़ेस', noFile: 'कोई फ़ाइल नहीं चुनी गई',
    docNotice: 'इस प्रोटोटाइप में दस्तावेज़ विश्लेषण जुड़ा नहीं है। OCR/AI सेवा जोड़ने तक कोई जानकारी निकाली नहीं जाएगी।',
    complaintsTitle: 'शिकायत सहायक', complaintsSub: 'बताएँ कि क्या हुआ, फिर शिकायत का मसौदा तैयार करें।',
    issue: 'समस्या क्या है?', organization: 'प्लेटफ़ॉर्म या संस्था', expected: 'उम्मीद की गई राशि (₹)', actual: 'मिली हुई राशि (₹)', incidentDate: 'घटना की तारीख', details: 'अन्य जानकारी',
    draft: 'मसौदा बनाएँ', draftTitle: 'आपकी शिकायत का मसौदा', editDraft: 'भेजने से पहले आप इस मसौदे को बदल सकते हैं।', copyDraft: 'मसौदा कॉपी करें', copied: 'मसौदा कॉपी हो गया',
    complaintPlaceholder: 'जैसे पेमेंट कम आई या देर से आई', orgPlaceholder: 'जैसे डिलीवरी प्लेटफ़ॉर्म या नियोक्ता', detailPlaceholder: 'ऑर्डर आईडी, तारीख या अन्य जानकारी लिखें',
    settingsTitle: 'सेटिंग्स', settingsSub: 'अपनी पसंद और काम के प्रकार बदलें।',
    languageSetting: 'ऐप की भाषा', professionsSetting: 'आपके काम', update: 'पसंद अपडेट करें', logout: 'लॉग आउट',
    navHome: 'होम', navEarnings: 'कमाई', navAssistant: 'AI सहायक', navSchemes: 'योजनाएँ और अधिकार', navDocuments: 'दस्तावेज़', navComplaints: 'शिकायतें', navSettings: 'सेटिंग्स',
    help: 'सहायता केंद्र', demoMode: 'प्रोटोटाइप डेमो', online: 'मदद के लिए तैयार', back: 'वापस', soon: 'जल्द आ रहा है',
    safetyTitle: 'सुरक्षा मार्गदर्शन', safetySub: 'काम के दौरान सुरक्षित रहने के लिए उपयोगी सुझाव।',
    safety1: 'काम शुरू करने से पहले', safety1Desc: 'वाहन या औज़ार, फ़ोन की बैटरी और ज़रूरी सुरक्षा उपकरण जाँचें।',
    safety2: 'खराब मौसम', safety2Desc: 'धीरे चलें, दिखाई देने की व्यवस्था रखें, भरी हुई सड़कों से बचें और ख़तरा होने पर सुरक्षित जगह रुकें।',
    safety3: 'थकान', safety3Desc: 'थकने पर आराम करें। जब सुरक्षित रूप से काम न कर सकें, तब वाहन न चलाएँ और मशीन न चलाएँ।',
    demoData: 'डेमो डेटा', delete: 'हटाएँ', professionContext: 'आपका चुना हुआ काम', workContexts: 'काम की प्रोफ़ाइल',
    emptyChat: 'नीचे दिए गए सवाल चुनकर या अपना सवाल लिखकर बातचीत शुरू करें।',
    complaintIntro: 'शिकायत का उपयोगी मसौदा बनाने के लिए नीचे जानकारी दें। भेजने से पहले मसौदे को ध्यान से जाँचें।',
    amountError: 'शून्य से अधिक सही राशि दर्ज करें।', saved: 'रिकॉर्ड जोड़ दिया गया।',
    switchProfession: 'काम बदलें', backDashboard: 'डैशबोर्ड पर जाएँ', profile: 'कामगार प्रोफ़ाइल',
  }
}

const professions: { id: Profession; image: string; icon: typeof CarFront }[] = [
  { id: 'driver', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=85', icon: CarFront },
  { id: 'daily', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85', icon: HardHat },
  { id: 'delivery', image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=85', icon: Bike },
]

const featureMeta: { id: Feature; icon: typeof Wallet; color: string; bg: string }[] = [
  { id: 'earnings', icon: Wallet, color: '#16836b', bg: '#e5f5ef' },
  { id: 'assistant', icon: MessageSquareText, color: '#5d63d7', bg: '#eeedff' },
  { id: 'schemes', icon: Landmark, color: '#b17a28', bg: '#fff3dd' },
  { id: 'documents', icon: FileText, color: '#377bb7', bg: '#e8f3ff' },
  { id: 'complaints', icon: ShieldCheck, color: '#bf5c50', bg: '#fff0ed' },
]

function money(n: number) { return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n) }

export default function App() {
  const [page, setPage] = useState<Page>(() => localStorage.getItem('kwc-session') === 'yes' ? (localStorage.getItem('kwc-onboarded') === 'yes' ? 'app' : (localStorage.getItem('kwc-lang') ? 'profession' : 'language')) : 'login')
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('kwc-lang') as Lang) || 'en')
  const [selected, setSelected] = useState<Profession[]>(() => JSON.parse(localStorage.getItem('kwc-professions') || '[]'))
  const [feature, setFeature] = useState<Feature>('home')
  const [email, setEmail] = useState('demo@kaamsaathi.in')
  const [password, setPassword] = useState('Worker@123')
  const [loginError, setLoginError] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const [records, setRecords] = useState<Entry[]>(() => JSON.parse(localStorage.getItem('kwc-records') || '[]'))
  const [showAdd, setShowAdd] = useState(false)
  const [entryKind, setEntryKind] = useState<'income' | 'expense'>('income')
  const [entryAmount, setEntryAmount] = useState('')
  const [entryCategory, setEntryCategory] = useState('Work payment')
  const [entryDate, setEntryDate] = useState(new Date().toISOString().slice(0, 10))
  const [entryNote, setEntryNote] = useState('')
  const [entryError, setEntryError] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [chat, setChat] = useState<{ role: 'assistant' | 'user'; text: string }[]>([])
  const [issue, setIssue] = useState('')
  const [organization, setOrganization] = useState('')
  const [expected, setExpected] = useState('')
  const [actual, setActual] = useState('')
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().slice(0, 10))
  const [details, setDetails] = useState('')
  const [draft, setDraft] = useState('')
  const [docName, setDocName] = useState('')
  const [toast, setToast] = useState('')

  const t = copy[lang]
  const professionNames: Record<Profession, string> = { driver: t.driver, daily: t.daily, delivery: t.delivery }
  const totalIncome = records.filter(r => r.kind === 'income').reduce((s, r) => s + r.amount, 0)
  const totalExpenses = records.filter(r => r.kind === 'expense').reduce((s, r) => s + r.amount, 0)
  const net = totalIncome - totalExpenses
  const navItems: { id: Feature; icon: typeof Home; label: string }[] = [
    { id: 'home', icon: Home, label: t.navHome },
    { id: 'earnings', icon: Wallet, label: t.navEarnings },
    { id: 'assistant', icon: MessageSquareText, label: t.navAssistant },
    { id: 'schemes', icon: Landmark, label: t.navSchemes },
    { id: 'documents', icon: FileText, label: t.navDocuments },
    { id: 'complaints', icon: ShieldCheck, label: t.navComplaints },
  ]

  useEffect(() => { localStorage.setItem('kwc-records', JSON.stringify(records)) }, [records])
  useEffect(() => { localStorage.setItem('kwc-lang', lang); document.documentElement.lang = lang === 'hi' ? 'hi' : 'en' }, [lang])
  useEffect(() => { localStorage.setItem('kwc-professions', JSON.stringify(selected)) }, [selected])
  useEffect(() => { if (toast) { const id = window.setTimeout(() => setToast(''), 2600); return () => clearTimeout(id) } }, [toast])

  const startLogin = () => {
    if (email.trim().toLowerCase() !== 'demo@kaamsaathi.in' || password !== 'Worker@123') { setLoginError(t.invalid); return }
    setLoginError('')
    localStorage.setItem('kwc-session', 'yes')
    setPage(localStorage.getItem('kwc-lang') ? (localStorage.getItem('kwc-onboarded') === 'yes' ? 'app' : 'profession') : 'language')
  }
  const chooseLanguage = (next: Lang) => setLang(next)
  const toggleProfession = (id: Profession) => setSelected(old => old.includes(id) ? old.filter(p => p !== id) : [...old, id])
  const finishProfessions = () => {
    if (!selected.length) { setToast(t.chooseOne); return }
    localStorage.setItem('kwc-onboarded', 'yes')
    setPage('app'); setFeature('home')
  }
  const logout = () => { localStorage.removeItem('kwc-session'); setPage('login'); setFeature('home'); setLoginError('') }
  const navigate = (id: Feature) => { setFeature(id); setMobileNav(false) }

  const addRecord = () => {
    const amount = Number(entryAmount)
    if (!Number.isFinite(amount) || amount <= 0) { setEntryError(t.amountError); return }
    setRecords(old => [{ id: Date.now(), date: entryDate, kind: entryKind, category: entryCategory, amount, note: entryNote }, ...old])
    setEntryAmount(''); setEntryNote(''); setEntryError(''); setShowAdd(false); setToast(t.saved)
  }

  const responseFor = (question: string) => {
    const q = question.toLowerCase()
    if (/earning|income|expense|कमाई|खर्च|पेसे|पैसे/.test(q)) return lang === 'hi'
      ? `आपके दर्ज रिकॉर्ड के अनुसार कुल कमाई ${money(totalIncome)} है और कुल खर्च ${money(totalExpenses)} है। आपकी शुद्ध कमाई ${money(net)} है। यह हिसाब केवल ऐप में दर्ज रिकॉर्ड पर आधारित है।`
      : `Based on the records you've entered, total income is ${money(totalIncome)} and total expenses are ${money(totalExpenses)}. Your net earnings are ${money(net)}. This calculation only includes records saved in the app.`
    if (/rain|weather|safety|road|बारिश|मौसम|सुरक्षा|सड़क/.test(q)) return lang === 'hi'
      ? 'खराब मौसम में गति कम रखें, हेलमेट या सीट बेल्ट का उपयोग करें, फ़ोन का इस्तेमाल करते हुए वाहन न चलाएँ और जलभराव वाली सड़कों से बचें। स्थिति असुरक्षित लगे तो सुरक्षित जगह रुकें।'
      : 'In poor weather, slow down, use a helmet or seat belt, never use your phone while driving, and avoid flooded roads. If conditions feel unsafe, stop in a safe place.'
    if (/complaint|payment|deduct|पेमेंट|शिकायत|कट|वेतन/.test(q)) return lang === 'hi'
      ? 'मैं शिकायत का मसौदा बनाने में मदद कर सकता हूँ। कृपया प्लेटफ़ॉर्म या नियोक्ता का नाम, घटना की तारीख, अपेक्षित और मिली हुई राशि, और कोई संदर्भ नंबर बताएं। भेजने से पहले मसौदे को जाँचें।'
      : 'I can help prepare a complaint draft. Please share the platform or employer name, incident date, expected and received amounts, and any reference number. Review the draft before sending.'
    if (/scheme|benefit|welfare|योजना|लाभ|सरकारी/.test(q)) return lang === 'hi'
      ? 'योजना की पात्रता आपके काम, राज्य और पंजीकरण पर निर्भर कर सकती है। ई-श्रम और अपने राज्य के श्रम विभाग के आधिकारिक पोर्टल से वर्तमान नियम जाँचें। यह डेमो लाइव पात्रता की पुष्टि नहीं करता।'
      : 'Eligibility can depend on your work, state, and registration. Check current rules through the official e-Shram and state labour department portals. This demo does not verify live eligibility.'
    if (/document|notice|दस्तावेज़|कागज|नोटिस/.test(q)) return lang === 'hi'
      ? 'आप दस्तावेज़ सहायक में फ़ाइल चुन सकते हैं। अभी इस डेमो में OCR या AI दस्तावेज़ विश्लेषण जुड़ा नहीं है, इसलिए मैं फ़ाइल की सामग्री का दावा नहीं करूँगा।'
      : 'You can select a file in the Document Assistant. OCR or AI document analysis is not connected in this demo, so I won’t claim to have read the file.'
    return lang === 'hi'
      ? 'मैं मदद करने की कोशिश करूँगा। कृपया थोड़ा और बताएँ कि यह कमाई, सुरक्षा, सरकारी योजना, दस्तावेज़ या शिकायत से जुड़ा है?'
      : 'I’ll do my best to help. Could you share a little more detail and tell me whether this is about earnings, safety, a government scheme, a document, or a complaint?'
  }
  const sendMessage = (text = chatInput) => {
    const value = text.trim()
    if (!value) return
    setChat(old => [...old, { role: 'user', text: value }, { role: 'assistant', text: responseFor(value) }])
    setChatInput('')
  }

  const generateDraft = () => {
    if (!issue.trim()) { setToast(lang === 'hi' ? 'कृपया समस्या का विवरण लिखें।' : 'Please describe the issue first.'); return }
    const draftText = lang === 'hi'
      ? `सेवा में,\nसंबंधित सहायता टीम,\n${organization || '[प्लेटफ़ॉर्म / संस्था का नाम]'}\n\nविषय: ${issue}\n\nमहोदय/महोदया,\nमैं ${incidentDate} को हुई निम्न समस्या के संबंध में सहायता का अनुरोध कर रहा/रही हूँ।\n\nसमस्या: ${issue}\n${expected ? `अपेक्षित राशि: ₹${expected}\n` : ''}${actual ? `प्राप्त राशि: ₹${actual}\n` : ''}${details ? `अतिरिक्त जानकारी: ${details}\n` : ''}\nकृपया मामले की जाँच करके मुझे लिखित रूप में जानकारी दें और उचित समाधान प्रदान करें। आवश्यकता होने पर मैं संबंधित प्रमाण साझा कर सकता/सकती हूँ।\n\nधन्यवाद,\n[आपका नाम]\n[संपर्क विवरण]`
      : `To the Support Team,\n${organization || '[Platform / Organization Name]'}\n\nSubject: ${issue}\n\nDear Sir/Madam,\nI am requesting assistance regarding an issue that occurred on ${incidentDate}.\n\nIssue: ${issue}\n${expected ? `Expected amount: ₹${expected}\n` : ''}${actual ? `Amount received: ₹${actual}\n` : ''}${details ? `Additional details: ${details}\n` : ''}\nPlease investigate this matter, explain the reason for the issue, and provide an appropriate resolution. I can share supporting evidence if required.\n\nRegards,\n[Your name]\n[Contact details]`
    setDraft(draftText)
  }

  const featureTitle: Record<Feature, string> = {
    home: t.dashboard, earnings: t.earningsTitle, assistant: t.assistantTitle,
    schemes: t.schemesTitle, documents: t.documentsTitle, complaints: t.complaintsTitle, settings: t.settingsTitle
  }
  const featureSub: Record<Feature, string> = {
    home: t.welcome, earnings: t.earningsSub, assistant: t.assistantSub,
    schemes: t.schemesSub, documents: t.documentsSub, complaints: t.complaintsSub, settings: t.settingsSub
  }

  const getProfessionDesc = (id: Profession) => id === 'driver' ? t.driverDesc : id === 'daily' ? t.dailyDesc : t.deliveryDesc

  if (page === 'login') return (
    <div className="login-page">
      <div className="login-visual">
        <div className="brand brand-light"><span className="brand-mark"><Sparkles size={21}/></span><span>{t.brand}</span></div>
        <div className="visual-copy">
          <span className="eyebrow">GIG WORKER COMPANION</span>
          <h1>{lang === 'hi' ? 'आपकी मेहनत के साथ, हर कदम पर।' : 'A little support for the work you do every day.'}</h1>
          <p>{t.tagline}</p>
          <div className="visual-pills"><span><Wallet size={15}/>{t.navEarnings}</span><span><ShieldCheck size={15}/>{t.safetyTitle}</span><span><MessageSquareText size={15}/>{t.navAssistant}</span></div>
        </div>
        <div className="visual-bottom"><span>✦</span> {lang === 'hi' ? 'आपके लिए बनाया गया। आपके साथ आगे बढ़ने के लिए।' : 'Built around you. Here to help you move forward.'}</div>
      </div>
      <div className="login-main">
        <div className="login-top"><button className="text-button" onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}><Languages size={17}/>{lang === 'en' ? 'हिंदी' : 'English'}</button><span className="secure-note"><ShieldCheck size={15}/> {t.demoMode}</span></div>
        <div className="login-form-wrap">
          <div className="brand brand-dark"><span className="brand-mark"><Sparkles size={21}/></span><span>{t.brand}</span></div>
          <h2>{t.loginTitle}</h2><p className="muted">{t.loginSub}</p>
          <form onSubmit={e => { e.preventDefault(); startLogin() }} className="login-form">
            <label>{t.email}<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="username" /></label>
            <label>{t.password}<input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" /></label>
            {loginError && <div className="error-line"><AlertCircle size={16}/>{loginError}</div>}
            <button className="primary-btn full-btn" type="submit">{t.login}<ArrowRight size={18}/></button>
          </form>
          <div className="demo-box"><div className="demo-heading"><span className="demo-icon"><CircleHelp size={18}/></span><div><strong>{t.demo}</strong><small>{t.demoNote}</small></div></div><div className="credential-row"><span>{t.demoEmail}</span><code>demo@kaamsaathi.in</code><button aria-label="Use demo email" onClick={() => setEmail('demo@kaamsaathi.in')}><Copy size={14}/></button></div><div className="credential-row"><span>{t.demoPassword}</span><code>Worker@123</code><button aria-label="Use demo password" onClick={() => setPassword('Worker@123')}><Copy size={14}/></button></div></div>
          <p className="privacy-note"><ShieldCheck size={14}/> {lang === 'hi' ? 'डेमो प्रोटोटाइप · असली व्यक्तिगत डेटा दर्ज न करें।' : 'Demo prototype · Please do not enter real sensitive personal data.'}</p>
        </div>
      </div>
    </div>
  )

  if (page === 'language') return (
    <div className="onboarding-page">
      <header className="onboard-top"><div className="brand brand-dark"><span className="brand-mark"><Sparkles size={21}/></span><span>{t.brand}</span></div><span className="step-label">01 / 02</span></header>
      <main className="onboard-content language-content">
        <div className="step-progress"><span className="active"/><span/></div>
        <span className="eyebrow">LET'S GET STARTED</span>
        <h1>{t.languageTitle}</h1><p className="muted">{t.languageSub}</p>
        <div className="language-grid">
          <button className={`language-card ${lang === 'en' ? 'chosen' : ''}`} onClick={() => chooseLanguage('en')}><span className="language-symbol">Aa</span><span className="language-name">English</span><span className="language-description">{copy.en.englishSub}</span>{lang === 'en' && <span className="chosen-check"><Check size={16}/></span>}</button>
          <button className={`language-card ${lang === 'hi' ? 'chosen' : ''}`} onClick={() => chooseLanguage('hi')}><span className="language-symbol devanagari">अ</span><span className="language-name devanagari">हिंदी</span><span className="language-description devanagari">{copy.hi.hindiSub}</span>{lang === 'hi' && <span className="chosen-check"><Check size={16}/></span>}</button>
        </div>
        <button className="primary-btn continue-btn" onClick={() => { localStorage.setItem('kwc-lang', lang); setPage('profession') }}>{t.continue}<ArrowRight size={18}/></button>
        <p className="step-foot"><ShieldCheck size={15}/> {lang === 'hi' ? 'आपकी पसंद आपके अनुभव को बेहतर बनाएगी।' : 'Your choice helps us make the experience yours.'}</p>
      </main>
    </div>
  )

  if (page === 'profession') return (
    <div className="onboarding-page profession-page">
      <header className="onboard-top"><div className="brand brand-dark"><span className="brand-mark"><Sparkles size={21}/></span><span>{t.brand}</span></div><button className="text-button" onClick={() => setPage('language')}><ArrowLeft size={16}/>{t.back}</button></header>
      <main className="profession-content">
        <div className="step-progress"><span className="active"/><span className="active"/></div>
        <span className="eyebrow">YOUR WORK, YOUR WAY</span>
        <h1>{t.professionTitle}</h1><p className="muted">{t.professionSub}</p>
        <div className="profession-grid">
          {professions.map(({ id, image, icon: Icon }) => (
            <button key={id} className={`profession-card ${selected.includes(id) ? 'selected' : ''}`} onClick={() => toggleProfession(id)} aria-pressed={selected.includes(id)}>
              <div className="profession-image" style={{ backgroundImage: `linear-gradient(180deg, rgba(9,25,37,.02) 35%, rgba(9,25,37,.70) 100%), url("${image}")` }}>
                <span className="profession-image-icon"><Icon size={21}/></span>
                <span className={`selection-check ${selected.includes(id) ? 'checked' : ''}`}>{selected.includes(id) && <Check size={15}/>}</span>
                <div className="profession-image-text"><h3>{t[id]}</h3><p>{getProfessionDesc(id)}</p></div>
              </div>
              <div className="profession-card-foot"><span>{t[id]}</span><span className={`selection-dot ${selected.includes(id) ? 'dot-checked' : ''}`}>{selected.includes(id) && <Check size={12}/>}</span></div>
            </button>
          ))}
        </div>
        <div className="profession-bottom"><span className="selected-count">{selected.length} {t.selected}</span><button className="primary-btn" disabled={!selected.length} onClick={finishProfessions}>{t.continue}<ArrowRight size={18}/></button></div>
        {!selected.length && <p className="selection-hint">{t.chooseOne}</p>}
      </main>
    </div>
  )

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand"><div className="brand brand-dark"><span className="brand-mark"><Sparkles size={21}/></span><span>{t.brand}</span></div><button className="mobile-close" onClick={() => setMobileNav(false)}><X size={19}/></button></div>
        <div className="sidebar-profile"><div className="avatar">KS</div><div><strong>{lang === 'hi' ? 'डेमो कामगार' : 'Demo Worker'}</strong><small>{selected.map(p => professionNames[p]).join(' · ')}</small></div><BadgeCheck size={17} className="profile-check"/></div>
        <div className="nav-caption">{t.dashboard.toUpperCase()}</div>
        <nav className="main-nav">
          {navItems.map(item => <button key={item.id} className={`nav-item ${feature === item.id ? 'nav-active' : ''}`} onClick={() => navigate(item.id)}><item.icon size={19}/><span>{item.label}</span>{feature === item.id && <ChevronRight size={16} className="nav-chevron"/>}</button>)}
          <button className={`nav-item ${feature === 'settings' ? 'nav-active' : ''}`} onClick={() => navigate('settings')}><Settings size={19}/><span>{t.navSettings}</span>{feature === 'settings' && <ChevronRight size={16} className="nav-chevron"/>}</button>
        </nav>
        <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={18}/></div><strong>{t.help}</strong><p>{lang === 'hi' ? 'अपने काम के लिए सही जानकारी पाएँ।' : 'Find the right guidance for your work.'}</p><button onClick={() => navigate('assistant')}>{lang === 'hi' ? 'सवाल पूछें' : 'Ask a question'}<ArrowRight size={14}/></button></div><button className="logout-btn" onClick={logout}><LogOut size={17}/>{t.logout}</button></div>
      </aside>
      {mobileNav && <button className="mobile-scrim" onClick={() => setMobileNav(false)} aria-label="Close navigation"/>}
      <main className="main-area">
        <header className="topbar"><div className="topbar-left"><button className="mobile-menu" onClick={() => setMobileNav(true)}><Menu size={20}/></button><div className="breadcrumb">{t.brand}<ChevronRight size={14}/><span>{featureTitle[feature]}</span></div></div><div className="topbar-right"><span className="demo-pill"><span/> {t.demoMode}</span><button className="language-switch" onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}><Languages size={16}/>{lang === 'en' ? 'हिंदी' : 'English'}</button><button className="top-avatar" onClick={() => navigate('settings')}>KS</button></div></header>
        <div className="page-content">
          {feature === 'home' && <>
            <div className="welcome-row"><div><div className="greeting-line"><span className="greeting-dot"/>{t.greeting}</div><h1>{t.welcome}</h1><p className="muted">{t.professionContext}: <strong>{selected.map(p => professionNames[p]).join(' · ')}</strong></p></div><div className="welcome-art"><div className="art-circle"><Sparkles size={29}/></div><span className="art-star star-a">✦</span><span className="art-star star-b">✧</span></div></div>
            <section className="summary-section"><div className="section-heading"><div><h2>{t.today}</h2><p>{t.demoData} · {new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</p></div><button className="subtle-btn" onClick={() => navigate('earnings')}>{t.viewAll}<ArrowRight size={15}/></button></div>
              <div className="stats-grid"><div className="stat-card stat-income"><div className="stat-top"><span className="stat-icon"><Wallet size={18}/></span><span className="stat-label">{t.totalIncome}</span></div><strong>{money(totalIncome)}</strong><small><TrendingUp size={13}/>{lang === 'hi' ? 'आपके दर्ज रिकॉर्ड' : 'From your saved records'}</small></div><div className="stat-card stat-expense"><div className="stat-top"><span className="stat-icon"><IndianRupee size={18}/></span><span className="stat-label">{t.totalExpenses}</span></div><strong>{money(totalExpenses)}</strong><small>{lang === 'hi' ? 'काम से जुड़े खर्च' : 'Work-related expenses'}</small></div><div className="stat-card stat-net"><div className="stat-top"><span className="stat-icon"><ChartNoAxesCombined size={18}/></span><span className="stat-label">{t.netCalc}</span></div><strong>{money(net)}</strong><small>{lang === 'hi' ? 'कमाई घटा खर्च' : 'Income minus expenses'}</small></div></div>
            </section>
            <section className="feature-section"><div className="section-heading"><div><h2>{t.quickActions}</h2><p>{lang === 'hi' ? 'शुरू करने के लिए कोई विकल्प चुनें।' : 'Choose a place to get started.'}</p></div></div><div className="feature-grid">{featureMeta.map(({ id, icon: Icon, color, bg }) => <button key={id} className="feature-card" onClick={() => navigate(id)}><div className="feature-icon" style={{ color, background: bg }}><Icon size={22}/></div><div className="feature-copy"><h3>{featureTitle[id]}</h3><p>{featureSub[id]}</p></div><span className="feature-arrow"><ArrowRight size={17}/></span></button>)}</div></section>
            <section className="bottom-grid"><div className="activity-card"><div className="section-heading"><div><h2>{t.activity}</h2><p>{lang === 'hi' ? 'आपके हाल के रिकॉर्ड' : 'Your latest saved records'}</p></div><button className="subtle-btn" onClick={() => navigate('earnings')}>{t.viewAll}<ArrowRight size={15}/></button></div>{records.length ? records.slice(0, 3).map(r => <div className="activity-row" key={r.id}><span className={`activity-icon ${r.kind}`}><Wallet size={17}/></span><div className="activity-desc"><strong>{r.category}</strong><small>{r.date}{r.note ? ` · ${r.note}` : ''}</small></div><strong className={r.kind === 'income' ? 'positive-amount' : 'negative-amount'}>{r.kind === 'income' ? '+' : '−'}{money(r.amount)}</strong></div>) : <div className="empty-activity"><div className="empty-icon"><Clock3 size={20}/></div><p>{t.noRecords}</p><button className="subtle-btn" onClick={() => { navigate('earnings'); setShowAdd(true) }}>{t.addRecord}<ArrowRight size={14}/></button></div>}</div><div className="assistant-promo"><div className="promo-orb"><Sparkles size={22}/></div><span className="eyebrow">{t.online}</span><h2>{t.assistantTitle}</h2><p>{lang === 'hi' ? 'कमाई, सुरक्षा या किसी परेशानी के बारे में पूछें।' : 'Ask about earnings, safety, or a problem at work.'}</p><button className="primary-btn" onClick={() => navigate('assistant')}>{lang === 'hi' ? 'बातचीत शुरू करें' : 'Start a conversation'}<ArrowRight size={16}/></button></div></section>
          </>}
          {feature === 'earnings' && <section className="module-page"><div className="module-header"><div><span className="eyebrow">YOUR MONEY, MADE CLEAR</span><h1>{t.earningsTitle}</h1><p className="muted">{t.earningsSub}</p></div><button className="primary-btn" onClick={() => setShowAdd(true)}><Plus size={18}/>{t.addRecord}</button></div><div className="stats-grid compact-stats"><div className="stat-card stat-income"><span className="stat-label">{t.totalIncome}</span><strong>{money(totalIncome)}</strong></div><div className="stat-card stat-expense"><span className="stat-label">{t.totalExpenses}</span><strong>{money(totalExpenses)}</strong></div><div className="stat-card stat-net"><span className="stat-label">{t.netCalc}</span><strong>{money(net)}</strong></div></div><div className="table-card"><div className="table-title"><div><h2>{t.activity}</h2><p>{t.demoData}</p></div></div>{records.length ? <div className="record-list">{records.map(r => <div className="record-row" key={r.id}><span className={`activity-icon ${r.kind}`}><Wallet size={17}/></span><div className="record-main"><strong>{r.category}</strong><small>{r.date}{r.note ? ` · ${r.note}` : ''}</small></div><strong className={r.kind === 'income' ? 'positive-amount' : 'negative-amount'}>{r.kind === 'income' ? '+' : '−'}{money(r.amount)}</strong><button className="icon-button danger-icon" title={t.delete} onClick={() => setRecords(old => old.filter(x => x.id !== r.id))}><X size={16}/></button></div>)}</div> : <div className="empty-state"><div className="empty-icon"><Wallet size={23}/></div><h3>{t.noRecords}</h3><button className="primary-btn" onClick={() => setShowAdd(true)}><Plus size={17}/>{t.addRecord}</button></div>}</div>{showAdd && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setShowAdd(false) }}><div className="modal-card"><div className="modal-header"><div><h2>{t.addRecord}</h2><p className="muted">{t.demoData}</p></div><button className="icon-button" onClick={() => setShowAdd(false)}><X size={19}/></button></div><div className="kind-toggle"><button className={entryKind === 'income' ? 'kind-active income-kind' : ''} onClick={() => { setEntryKind('income'); setEntryCategory('Work payment') }}>{t.incomeLabel}</button><button className={entryKind === 'expense' ? 'kind-active expense-kind' : ''} onClick={() => { setEntryKind('expense'); setEntryCategory('Fuel') }}>{t.expenseLabel}</button></div><div className="form-grid"><label>{t.amount}<input type="number" min="1" value={entryAmount} onChange={e => setEntryAmount(e.target.value)} placeholder="0"/></label><label>{t.category}<select value={entryCategory} onChange={e => setEntryCategory(e.target.value)}>{(entryKind === 'income' ? ['Work payment', 'Incentive', 'Tips', 'Other income'] : ['Fuel', 'Food', 'Vehicle maintenance', 'Phone / data', 'Other expense']).map(c => <option key={c}>{c}</option>)}</select></label><label>{t.date}<input type="date" value={entryDate} onChange={e => setEntryDate(e.target.value)}/></label><label>{t.note}<input value={entryNote} onChange={e => setEntryNote(e.target.value)} placeholder={lang === 'hi' ? 'वैकल्पिक विवरण' : 'Optional details'}/></label></div>{entryError && <div className="error-line"><AlertCircle size={16}/>{entryError}</div>}<div className="modal-actions"><button className="secondary-btn" onClick={() => setShowAdd(false)}>{t.cancel}</button><button className="primary-btn" onClick={addRecord}>{t.save}<ArrowRight size={16}/></button></div></div></div>}</section>}
          {feature === 'assistant' && <section className="module-page assistant-page"><div className="module-header"><div><span className="eyebrow">HERE WHEN YOU NEED A HAND</span><h1>{t.assistantTitle}</h1><p className="muted">{t.assistantSub}</p></div><div className="ai-status"><span/> {t.demoMode}</div></div><div className="chat-layout"><div className="chat-card"><div className="chat-header"><div className="ai-avatar"><Sparkles size={20}/></div><div><strong>{t.brand} AI</strong><small><span className="online-dot"/> {t.online}</small></div><span className="demo-pill">{t.demoMode}</span></div><div className="chat-messages">{<div className="chat-line assistant-line"><div className="chat-avatar"><Sparkles size={15}/></div><div className="chat-bubble">{t.assistantWelcome}</div></div>}{chat.map((m, i) => <div className={`chat-line ${m.role === 'user' ? 'user-line' : 'assistant-line'}`} key={i}>{m.role === 'assistant' && <div className="chat-avatar"><Sparkles size={15}/></div>}<div className="chat-bubble">{m.text}</div></div>)}{!chat.length && <p className="chat-empty">{t.emptyChat}</p>}</div><form className="chat-input-row" onSubmit={e => { e.preventDefault(); sendMessage() }}><input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder={t.typeMessage}/><button className="send-btn" type="submit" aria-label={t.send}><Send size={18}/></button></form><p className="chat-disclaimer">{lang === 'hi' ? 'डेमो जवाब उदाहरण के लिए हैं। ज़रूरी निर्णय से पहले आधिकारिक जानकारी जाँचें।' : 'Demo responses are illustrative. Verify official information before making important decisions.'}</p></div><aside className="suggestion-panel"><h3>{t.suggested}</h3>{[t.q1, t.q2, t.q3].map(q => <button className="suggestion-button" key={q} onClick={() => sendMessage(q)}>{q}<ArrowRight size={15}/></button>)}<div className="context-card"><div className="context-icon"><BadgeCheck size={18}/></div><strong>{t.professionContext}</strong><div className="context-tags">{selected.map(p => <span key={p}>{professionNames[p]}</span>)}</div><p>{lang === 'hi' ? 'आपकी चुनी हुई प्रोफ़ाइल के अनुसार उदाहरण और सुझाव दिखाए जाएँगे।' : 'Examples and suggestions are tailored to your selected work profiles.'}</p></div></aside></div></section>}
          {feature === 'schemes' && <section className="module-page"><div className="module-header"><div><span className="eyebrow">INFORMATION TO HELP YOU MOVE FORWARD</span><h1>{t.schemesTitle}</h1><p className="muted">{t.schemesSub}</p></div><div className="scheme-icon-large"><Landmark size={25}/></div></div><div className="notice-banner"><ShieldCheck size={19}/><span>{t.verifiedNote}</span></div><div className="scheme-grid"><article className="scheme-card"><div className="scheme-card-icon green"><FileCheck2 size={22}/></div><span className="scheme-category">{lang === 'hi' ? 'राष्ट्रीय पहल' : 'NATIONAL INITIATIVE'}</span><h2>{t.scheme1}</h2><p>{t.scheme1Desc}</p><a href="https://eshram.gov.in/" target="_blank" rel="noreferrer">{t.official}<ArrowRight size={15}/></a></article><article className="scheme-card"><div className="scheme-card-icon amber"><HardHat size={22}/></div><span className="scheme-category">{lang === 'hi' ? 'राज्य के अनुसार' : 'STATE-DEPENDENT'}</span><h2>{t.scheme2}</h2><p>{t.scheme2Desc}</p><a href="https://labour.gov.in/" target="_blank" rel="noreferrer">{t.official}<ArrowRight size={15}/></a></article><article className="scheme-card"><div className="scheme-card-icon blue"><Landmark size={22}/></div><span className="scheme-category">{lang === 'hi' ? 'स्थानीय संसाधन' : 'LOCAL RESOURCES'}</span><h2>{t.scheme3}</h2><p>{t.scheme3Desc}</p><a href="https://labour.gov.in/" target="_blank" rel="noreferrer">{t.official}<ArrowRight size={15}/></a></article></div><div className="scheme-help"><div className="help-icon"><MessageSquareText size={20}/></div><div><strong>{lang === 'hi' ? 'पात्रता समझने में मदद चाहिए?' : 'Need help understanding eligibility?'}</strong><p>{lang === 'hi' ? 'AI साथी से अपने काम और राज्य के बारे में पूछें।' : 'Ask the AI companion about your work type and state.'}</p></div><button className="secondary-btn" onClick={() => navigate('assistant')}>{lang === 'hi' ? 'सवाल पूछें' : 'Ask a question'}<ArrowRight size={15}/></button></div></section>}
          {feature === 'documents' && <section className="module-page narrow-module"><div className="module-header"><div><span className="eyebrow">MAKE PAPERWORK LESS CONFUSING</span><h1>{t.documentsTitle}</h1><p className="muted">{t.documentsSub}</p></div><div className="scheme-icon-large blue-large"><FileText size={25}/></div></div><div className="document-upload-card"><div className="upload-illustration"><Upload size={28}/></div><h2>{t.upload}</h2><p>{t.uploadHint}</p><label className="upload-button"><Upload size={17}/>{t.upload}<input type="file" accept=".pdf,image/*" onChange={e => setDocName(e.target.files?.[0]?.name || '')}/></label><span className="file-name">{docName || t.noFile}</span><div className="notice-banner document-notice"><AlertCircle size={18}/><span>{t.docNotice}</span></div></div><div className="document-tips"><h3>{lang === 'hi' ? 'दस्तावेज़ तैयार करने के सुझाव' : 'Before you upload'}</h3><div><Check size={16}/>{lang === 'hi' ? 'साफ़ और पूरी तस्वीर चुनें।' : 'Choose a clear, complete image.'}</div><div><Check size={16}/>{lang === 'hi' ? 'ज़रूरी निजी जानकारी साझा करने से पहले सोचें।' : 'Consider removing sensitive details you do not need to share.'}</div><div><Check size={16}/>{lang === 'hi' ? 'महत्वपूर्ण तारीखें और निर्देश स्वयं भी जाँचें।' : 'Double-check important dates and instructions yourself.'}</div></div></section>}
          {feature === 'complaints' && <section className="module-page"><div className="module-header"><div><span className="eyebrow">YOUR VOICE MATTERS</span><h1>{t.complaintsTitle}</h1><p className="muted">{t.complaintsSub}</p></div><div className="scheme-icon-large red-large"><ShieldCheck size={25}/></div></div><div className="complaint-layout"><div className="form-card"><div className="form-card-heading"><div className="step-number">01</div><div><h2>{lang === 'hi' ? 'समस्या के बारे में बताएँ' : 'Tell us what happened'}</h2><p>{t.complaintIntro}</p></div></div><div className="form-grid complaint-fields"><label>{t.issue} *<input value={issue} onChange={e => setIssue(e.target.value)} placeholder={t.complaintPlaceholder}/></label><label>{t.organization}<input value={organization} onChange={e => setOrganization(e.target.value)} placeholder={t.orgPlaceholder}/></label><label>{t.expected}<input type="number" min="0" value={expected} onChange={e => setExpected(e.target.value)}/></label><label>{t.actual}<input type="number" min="0" value={actual} onChange={e => setActual(e.target.value)}/></label><label>{t.incidentDate}<input type="date" value={incidentDate} onChange={e => setIncidentDate(e.target.value)}/></label><label className="wide-field">{t.details}<textarea rows={3} value={details} onChange={e => setDetails(e.target.value)} placeholder={t.detailPlaceholder}/></label></div><button className="primary-btn" onClick={generateDraft}><Sparkles size={17}/>{t.draft}</button></div>{draft ? <div className="draft-card"><div className="draft-header"><div className="draft-icon"><FileText size={20}/></div><div><h2>{t.draftTitle}</h2><p>{t.editDraft}</p></div></div><textarea className="draft-textarea" value={draft} onChange={e => setDraft(e.target.value)} rows={15}/><button className="secondary-btn" onClick={() => { navigator.clipboard?.writeText(draft); setToast(t.copied) }}><Copy size={16}/>{t.copyDraft}</button></div> : <div className="draft-placeholder"><div className="draft-placeholder-icon"><FileText size={26}/></div><h3>{lang === 'hi' ? 'आपका मसौदा यहाँ दिखेगा' : 'Your draft will appear here'}</h3><p>{lang === 'hi' ? 'जानकारी भरें और शिकायत का मसौदा बनाने के लिए बटन दबाएँ।' : 'Fill in the details and generate a complaint draft to review it here.'}</p></div>}</div></section>}
          {feature === 'settings' && <section className="module-page narrow-module"><div className="module-header"><div><span className="eyebrow">MAKE IT YOURS</span><h1>{t.settingsTitle}</h1><p className="muted">{t.settingsSub}</p></div><div className="scheme-icon-large"><Settings size={25}/></div></div><div className="settings-card"><div className="settings-row"><div className="settings-icon"><Languages size={20}/></div><div className="settings-copy"><strong>{t.languageSetting}</strong><p>{lang === 'hi' ? 'अपनी पसंद की भाषा चुनें।' : 'Choose the language you prefer.'}</p></div><div className="settings-options"><button className={lang === 'en' ? 'option-selected' : ''} onClick={() => setLang('en')}>English</button><button className={lang === 'hi' ? 'option-selected' : ''} onClick={() => setLang('hi')}>हिंदी</button></div></div><div className="settings-row"><div className="settings-icon"><BadgeCheck size={20}/></div><div className="settings-copy"><strong>{t.professionsSetting}</strong><p>{selected.map(p => professionNames[p]).join(' · ')}</p></div><button className="secondary-btn" onClick={() => setPage('profession')}>{t.switchProfession}<ArrowRight size={15}/></button></div><div className="settings-row"><div className="settings-icon"><ShieldCheck size={20}/></div><div className="settings-copy"><strong>{t.demoMode}</strong><p>{lang === 'hi' ? 'यह एक फ्रंटएंड प्रोटोटाइप है। कमाई के रिकॉर्ड इस ब्राउज़र में सेव होते हैं।' : 'This is a frontend prototype. Earnings records are stored in this browser.'}</p></div><span className="status-badge">Active</span></div><div className="settings-logout"><button className="secondary-btn" onClick={logout}><LogOut size={16}/>{t.logout}</button></div></div></section>}
        </div>
        <footer className="app-footer"><span>© 2026 {t.brand}</span><span>{t.demoMode} · {lang === 'hi' ? 'सभी राशि उदाहरण के लिए हैं।' : 'Amounts and interactions are for demonstration.'}</span></footer>
      </main>
      {toast && <div className="toast"><Check size={17}/>{toast}</div>}
    </div>
  )
}