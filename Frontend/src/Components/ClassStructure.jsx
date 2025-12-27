import React, { useState } from 'react';
import { 
  Clock, Users, BookOpen, Brain, MonitorPlay, 
  MessageCircle, PenTool, FlaskConical, Calculator, 
  CheckCircle, Shield, Star, Smile, Lightbulb, 
  CalendarClock, GraduationCap, Layers, Languages,
  Music, Dumbbell, Globe, Cpu, Palette, Trophy,
  HeartHandshake, ChevronDown, ChevronUp, Download,
  HelpCircle, BookMarked
} from 'lucide-react';

export default function ClassStructure() {
  
  // State for Grade Level Tabs
  const [activeTab, setActiveTab] = useState('middle');
  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // --- DATA: SCHEDULE ---
  const schedule = [
    { time: "8:45 - 9:00 AM", activity: "Arrival & Assembly", type: "assembly" },
    { time: "9:00 - 9:15 AM", activity: "Moral Instruction / News", type: "assembly" },
    { time: "9:15 - 10:00 AM", activity: "Period 1 (Mathematics)", type: "class" },
    { time: "10:00 - 10:45 AM", activity: "Period 2 (Science/Physics)", type: "class" },
    { time: "10:45 - 11:00 AM", activity: "Refreshment Break", type: "break" },
    { time: "11:00 - 11:45 AM", activity: "Period 3 (English)", type: "class" },
    { time: "11:45 - 12:30 PM", activity: "Period 4 (Tamil)", type: "class" },
    { time: "12:30 - 1:15 PM", activity: "Lunch Break & Relax", type: "break" },
    { time: "1:15 - 2:00 PM", activity: "Period 5 (Social Science)", type: "class" },
    { time: "2:00 - 2:45 PM", activity: "Period 6 (Computer/Library)", type: "lab" },
    { time: "2:45 - 3:00 PM", activity: "Short Break", type: "break" },
    { time: "3:00 - 3:45 PM", activity: "Period 7 (PET / Art / Music)", type: "activity" },
    { time: "3:45 - 4:15 PM", activity: "Remedial / Diary Signing", type: "closing" },
  ];

  // --- DATA: GRADE LEVELS ---
  const gradeLevels = {
    middle: {
      title: "Middle School (Class VI - VIII)",
      desc: "Focus on building a strong foundation in core subjects while introducing life skills.",
      features: [
        "Transition from activity-based to subject-based learning.",
        "Introduction to Lab activities in Science.",
        "Basic Computer Literacy (MS Office, Paint).",
        "Language enrichment programs (Spoken English)."
      ],
      color: "bg-blue-500"
    },
    high: {
      title: "High School (Class IX - X)",
      desc: "Preparation for board exams with a focus on conceptual depth and analytical thinking.",
      features: [
        "In-depth subject specialization.",
        "Regular cycle tests and analytical reasoning.",
        "Career guidance initiation.",
        "Project-based assessment for internal marks."
      ],
      color: "bg-purple-500"
    },
    higher: {
      title: "Higher Secondary (Class XI - XII)",
      desc: "Stream-based specialized education preparing students for higher studies and entrance exams.",
      features: [
        "Choice of Streams: Bio-Maths, CS-Maths, Commerce.",
        "NEET / JEE foundation basics integration.",
        "Practical Laboratory expertise.",
        "Leadership roles in Student Council."
      ],
      color: "bg-indigo-500"
    }
  };

  // --- DATA: METHODOLOGIES ---
  const methodologies = [
    { icon: <MonitorPlay className="w-6 h-6" />, title: "Smart Classrooms", desc: "Every concept is visualized using digital boards and animated modules to ensure long-term retention." },
    { icon: <Brain className="w-6 h-6" />, title: "Experiential Learning", desc: "We move beyond rote memorization. Students learn laws of physics and chemistry through live experiments." },
    { icon: <Users className="w-6 h-6" />, title: "Peer-to-Peer Learning", desc: "Group projects and study circles allow students to learn from each other, fostering teamwork." },
    { icon: <Lightbulb className="w-6 h-6" />, title: "Inquiry-Based Approach", desc: "Teachers encourage the 'Why' and 'How' questions, making students active thinkers rather than passive listeners." },
  ];

  // --- DATA: CLUBS ---
  const clubs = [
    { name: "Science Club", icon: <FlaskConical />, desc: "Experiments & Exhibitions" },
    { name: "Literary Association", icon: <BookOpen />, desc: "Debates, Elocution, Drama" },
    { name: "Eco Club", icon: <Globe />, desc: "Tree plantation & Recycling" },
    { name: "Tech / AI Club", icon: <Cpu />, desc: "Coding & Digital Skills" },
    { name: "Art & Culture", icon: <Palette />, desc: "Painting, Dance, Music" },
    { name: "Sports Academy", icon: <Dumbbell />, desc: "Athletics & Team Sports" },
  ];

  // --- DATA: FAQS ---
  const faqs = [
    { q: "What is the student-teacher ratio?", a: "We maintain an optimal ratio of 30:1 to ensure every student gets individual attention from the teacher." },
    { q: "How are slow learners supported?", a: "We have a dedicated 'Remedial Class' session every day from 3:45 PM to 4:15 PM where teachers revisit concepts for students needing extra help." },
    { q: "Is digital learning part of the daily curriculum?", a: "Yes, we have Smart Class hours integrated into the weekly timetable for Science, Social Studies, and English." },
    { q: "How often are parents updated?", a: "We send daily updates via the school app/diary. Detailed Parent-Teacher Meetings (PTM) are held after every assessment cycle." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 mt-16 pb-20 font-sans">

      {/* --- HERO HEADER --- */}
      <div className="bg-gradient-to-r from-indigo-900 via-violet-900 to-purple-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent w-full h-full"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-xs md:text-sm font-semibold border border-white/20 tracking-wide uppercase">
            Holistic Education Model
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-6 mb-6 leading-tight">
            Structure, Strategy & <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400">Student Success</span>
          </h1>
          <p className="text-indigo-200 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Our academic framework is designed to balance rigorous state-board curriculum with modern skill-building activities, ensuring students are future-ready.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">

        {/* --- OVERVIEW STATS CARDS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: <GraduationCap />, label: "Academic Range", value: "Class VI – XII", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: <BookOpen />, label: "Curriculum", value: "State Board", color: "text-purple-600", bg: "bg-purple-50" },
            { icon: <Languages />, label: "Instruction", value: "Tamil & English", color: "text-pink-600", bg: "bg-pink-50" },
            { icon: <Users />, label: "Class Strength", value: "Max 35", color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-b-4 border-indigo-500 flex flex-col items-center text-center transform hover:-translate-y-1 transition-all duration-300">
              <div className={`p-4 rounded-full mb-3 ${item.bg} ${item.color}`}>
                {React.cloneElement(item.icon, { className: "w-6 h-6" })}
              </div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{item.label}</p>
              <p className="text-lg font-extrabold text-gray-800 mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid lg:grid-cols-12 gap-10">

          {/* LEFT CONTENT AREA (8 Cols) */}
          <div className="lg:col-span-8 space-y-16">

            {/* 1. GRADE WISE PROGRESSION */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-7 h-7 text-indigo-600" />
                <h2 className="text-3xl font-bold text-gray-800">Academic Progression</h2>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex border-b border-gray-100 bg-gray-50/50">
                  {Object.keys(gradeLevels).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`flex-1 py-4 text-sm md:text-base font-bold transition-all duration-300 ${
                        activeTab === key 
                          ? 'bg-white text-indigo-600 border-t-4 border-indigo-600 shadow-sm' 
                          : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-100'
                      }`}
                    >
                      {key === 'middle' ? 'Middle School' : key === 'high' ? 'High School' : 'Higher Secondary'}
                    </button>
                  ))}
                </div>
                <div className="p-8">
                  <div className="flex items-start gap-6 animate-fadeIn">
                    <div className={`hidden md:flex p-4 rounded-xl shrink-0 ${gradeLevels[activeTab].color}`}>
                      <BookMarked className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{gradeLevels[activeTab].title}</h3>
                      <p className="text-gray-600 mb-6 text-lg">{gradeLevels[activeTab].desc}</p>
                      <ul className="grid sm:grid-cols-2 gap-4">
                        {gradeLevels[activeTab].features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. TEACHING METHODOLOGY */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-7 h-7 text-indigo-600" />
                <h2 className="text-3xl font-bold text-gray-800">Pedagogy & Methodology</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {methodologies.map((m, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-5 hover:shadow-md transition-shadow group">
                    <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {m.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{m.title}</h3>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. SUBJECT APPROACH */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-7 h-7 text-pink-600" />
                <h2 className="text-3xl font-bold text-gray-800">Subject-Wise Strategy</h2>
              </div>
              <div className="space-y-5">
                <SubjectCard 
                  title="Mathematics" 
                  icon={<Calculator />} 
                  desc="Focus on logical reasoning, mental math, and problem-solving techniques."
                  tags={["Worksheets", "Concept Drills", "Real-world Logic"]} 
                  color="bg-blue-50 text-blue-700"
                />
                <SubjectCard 
                  title="Science (Physics, Chem, Bio)" 
                  icon={<FlaskConical />} 
                  desc="Learning through observation, lab experiments, diagram drawing, and project work."
                  tags={["Lab Sessions", "Record Note", "Practical Exam"]} 
                  color="bg-emerald-50 text-emerald-700"
                />
                <SubjectCard 
                  title="Languages (Tamil & English)" 
                  icon={<PenTool />} 
                  desc="Enhancing LSRW skills (Listening, Speaking, Reading, Writing) through library and activities."
                  tags={["Grammar", "Elocution", "Creative Writing"]} 
                  color="bg-orange-50 text-orange-700"
                />
                <SubjectCard 
                  title="Social Science & Humanities" 
                  icon={<Globe />} 
                  desc="Understanding history, geography, and civic responsibilities through maps and projects."
                  tags={["Map Work", "Current Affairs", "Field Trips"]} 
                  color="bg-rose-50 text-rose-700"
                />
              </div>
            </section>

            {/* 4. STUDENT SUPPORT ECOSYSTEM */}
            <section className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <HeartHandshake className="w-7 h-7 text-pink-400" />
                  Student Support Ecosystem
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <SupportItem 
                      title="Remedial Classes" 
                      desc="Special evening classes for students who need extra support in core subjects."
                    />
                    <SupportItem 
                      title="Counseling & Mentorship" 
                      desc="Dedicated teachers act as mentors to guide students through academic or personal stress."
                    />
                  </div>
                  <div className="space-y-6">
                    <SupportItem 
                      title="Career Guidance" 
                      desc="Sessions for Class 10 & 12 students to help them choose the right path for higher education."
                    />
                    <SupportItem 
                      title="Scholarship Assistance" 
                      desc="Helping eligible students apply for government and private scholarships."
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 5. CO-CURRICULAR ACTIVITIES */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-7 h-7 text-yellow-600" />
                <h2 className="text-3xl font-bold text-gray-800">Co-Curricular Clubs</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {clubs.map((club, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 p-4 rounded-xl text-center hover:border-indigo-300 transition-all hover:shadow-md cursor-default">
                    <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-indigo-600 mb-3">
                      {club.icon}
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm">{club.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{club.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. FAQ ACCORDION */}
            <section className="bg-indigo-50/50 rounded-2xl p-8 border border-indigo-100">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-7 h-7 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button 
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      {faq.q}
                      {openFaq === index ? <ChevronUp className="w-5 h-5 text-indigo-600"/> : <ChevronDown className="w-5 h-5 text-gray-400"/>}
                    </button>
                    {openFaq === index && (
                      <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed bg-gray-50/50 border-t border-gray-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT SIDEBAR (4 Cols) - FIXED: REMOVED STICKY TO PREVENT OVERLAP */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* SCHEDULE CARD - Fixed: Removed 'sticky' class */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <CalendarClock className="w-5 h-5 text-indigo-600" />
                  Daily Routine
                </h2>
                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full uppercase tracking-wide">
                  Mon - Fri
                </span>
              </div>

              {/* Timeline Style Schedule */}
              <div className="space-y-0 relative pl-2">
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-200 rounded-full"></div>
                {schedule.map((s, i) => (
                  <div key={i} className="relative flex gap-4 pb-6 last:pb-0 group">
                    <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 mt-1 shrink-0 transition-transform group-hover:scale-125 ${
                      s.type === 'break' ? 'bg-orange-400' : 
                      s.type === 'assembly' ? 'bg-indigo-600' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 font-mono">{s.time}</p>
                      <p className={`text-sm font-bold ${s.type === 'break' ? 'text-orange-600' : 'text-gray-700'}`}>
                        {s.activity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DISCIPLINE & VALUES - Now scrolls correctly */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-yellow-300" />
                Core Values & Discipline
              </h3>
              <ul className="space-y-3 text-sm text-indigo-100">
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 mt-0.5 text-yellow-400 shrink-0" />
                  <span><strong>Punctuality:</strong> Students must be inside the campus by 8:45 AM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 mt-0.5 text-yellow-400 shrink-0" />
                  <span><strong>Uniform:</strong> Neat and clean uniform is mandatory on all days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 mt-0.5 text-yellow-400 shrink-0" />
                  <span><strong>Respect:</strong> Greeting teachers and elders is a part of our culture.</span>
                </li>
              </ul>
            </div>

            {/* DOWNLOADS WIDGET */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-gray-500" />
                Quick Downloads
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-indigo-50 text-sm font-medium text-gray-700 transition-colors group">
                  School Calendar 2024-25
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-indigo-50 text-sm font-medium text-gray-700 transition-colors group">
                  Exam Schedule (Term 1)
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-indigo-50 text-sm font-medium text-gray-700 transition-colors group">
                  Syllabus Breakdown
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SubjectCard({ title, icon, desc, tags, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-5 hover:border-indigo-200 transition-all">
      <div className={`p-4 rounded-xl h-fit ${color}`}>
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 mt-1 leading-relaxed">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-100 font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupportItem({ title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="w-1.5 h-full min-h-[50px] bg-indigo-500 rounded-full"></div>
      <div>
        <h4 className="font-bold text-lg text-white">{title}</h4>
        <p className="text-sm text-indigo-200 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}