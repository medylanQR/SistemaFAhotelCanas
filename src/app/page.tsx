"use client";
import React, { useState } from 'react';
import { 
  BarChart3, CheckCircle, Send, User, Zap, Bot, TrendingUp, Briefcase, ChevronRight,
  Database, FileSpreadsheet, Layers, PieChart, Sparkles, Maximize2, Minimize2, 
  List, LayoutDashboard, Search, Filter, ArrowRight, XCircle, Clock, 
  BrainCircuit, Target, LineChart as LineIcon, ShieldCheck, Microscope, Calculator, Download, Calendar
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATASET MAESTRO ---
const masterFacturas = [
  { id: '00100001010000000552', fecha: '2026-03-11 08:30', cliente: 'Hotel Cañas Corp', total: 1412500, tipo: 'FE', estado: 'Aceptado' },
  { id: '00100001040000000123', fecha: '2026-03-11 09:15', cliente: 'Juan Diego Quiros', total: 50850, tipo: 'TE', estado: 'Aceptado' },
  { id: '00100001010000000553', fecha: '2026-03-11 10:05', cliente: 'Inversiones del Norte', total: 960500, tipo: 'FE', estado: 'Rechazado' },
  { id: '00100001040000000124', fecha: '2026-03-11 11:20', cliente: 'Pasajero Contado', total: 13560, tipo: 'TE', estado: 'Aceptado' },
];

const dailyData = [
  { name: 'Lun', ventas: 4200000, iva13: 546000, ocupacion: 65, gastos: 2100000 },
  { name: 'Mar', ventas: 3800000, iva13: 494000, ocupacion: 60, gastos: 1900000 },
  { name: 'Mie', ventas: 5600000, iva13: 728000, ocupacion: 75, gastos: 2400000 },
  { name: 'Jue', ventas: 3100000, iva13: 403000, ocupacion: 50, gastos: 1500000 },
  { name: 'Vie', ventas: 7400000, iva13: 962000, ocupacion: 85, gastos: 3100000 },
  { name: 'Sab', ventas: 9200000, iva13: 1196000, ocupacion: 98, gastos: 3800000 },
  { name: 'Dom', ventas: 6900000, iva13: 897000, ocupacion: 80, gastos: 2800000 },
];

const radarData = [
  { subject: 'Limpieza', A: 120, fullMark: 150 },
  { subject: 'Mantenimiento', A: 98, fullMark: 150 },
  { subject: 'Personal', A: 140, fullMark: 150 },
  { subject: 'Marketing', A: 85, fullMark: 150 },
  { subject: 'Servicios', A: 110, fullMark: 150 },
];

export default function DemoHotelFinalMax() {
  const [activeTab, setActiveTab] = useState('facturacion');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [aiFocus, setAiFocus] = useState('general');
  const [step, setStep] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', content: '¡Hola! Soy QR-Insight. ¿En qué área del Hotel Cañas deseas profundizar hoy?' }
  ]);

  const handleEmitir = () => {
    setIsProcessing(true);
    setStep(1);
    setTimeout(() => setShowActivityModal(true), 1000);
  };

  const confirmarActividad = (act: string) => {
    setShowActivityModal(false);
    setStep(2);
    setTimeout(() => setStep(3), 1500);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(0);
      setChatMessages([...chatMessages, { role: 'ai', content: `Comprobante aceptado bajo la actividad ${act}. Todo en orden con Hacienda v4.4.` }]);
    }, 3000);
  };

  const enviarChat = (e: any) => {
    e.preventDefault();
    if (!chatInput) return;
    const newMessages = [...chatMessages, { role: 'user', content: chatInput }];
    setChatMessages(newMessages);
    setChatInput("");
    setTimeout(() => {
      setChatMessages([...newMessages, { role: 'ai', content: "Análisis QR-Insight: Detecto que el flujo de caja del sábado superó la media mensual en un 15%. Recomiendo exportar el reporte de conciliación bancaria." }]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans text-slate-900 overflow-hidden text-sm">
      
      {/* MODAL ACTIVIDADES */}
      <AnimatePresence>
        {showActivityModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm text-slate-800 font-bold">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl">
              <h3 className="text-xl font-black mb-6 italic">Actividad Hacienda</h3>
              <div className="space-y-3">
                {["551001 - Hoteles", "561001 - Restaurantes", "791101 - Agencias"].map((act, i) => (
                  <button key={i} onClick={() => confirmarActividad(act)} className="w-full flex justify-between p-4 rounded-2xl border-2 hover:border-blue-500 transition-all">{act} <ChevronRight/></button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CHAT EXPANDIDO */}
      <AnimatePresence>
        {isChatExpanded && (
          <div className="fixed inset-0 z-[130] bg-slate-900/95 backdrop-blur-2xl flex items-center justify-center p-4 lg:p-12">
            <motion.div layoutId="chat-ui" className="bg-[#020617] w-full max-w-6xl h-[85vh] rounded-[3.5rem] border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/30"><Bot className="text-white" size={28}/></div>
                  <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">QR-Insight Intelligence</h3>
                </div>
                <button onClick={() => setIsChatExpanded(false)} className="bg-slate-800 p-3 rounded-full text-white hover:bg-slate-700 transition-colors"><Minimize2/></button>
              </div>
              <div className="px-10 py-6 border-b border-slate-800 flex gap-4 overflow-x-auto no-scrollbar">
                {['General', 'Tributaria', 'Ventas', 'Auditoría'].map((label) => (
                  <button key={label} onClick={() => setAiFocus(label.toLowerCase())} className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${aiFocus === label.toLowerCase() ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400'}`}>
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto p-10 space-y-6">
                 {chatMessages.map((msg, i) => (
                   <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[75%] p-6 rounded-[2.2rem] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white shadow-xl' : 'bg-slate-800/80 text-slate-200 border border-slate-700 shadow-xl'}`}>{msg.content}</div>
                   </div>
                 ))}
              </div>
              <form onSubmit={enviarChat} className="p-8 bg-slate-900/80 border-t border-slate-800 flex gap-4">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={`Consultar sobre ${aiFocus}...`} className="flex-1 bg-slate-800/50 border-none rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                <button className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg transition-all hover:scale-105 active:scale-95"><Send/></button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#020617] text-white p-6 hidden lg:flex flex-col border-r border-slate-800 shadow-2xl">
        <div className="flex items-center gap-3 mb-10 px-2 font-black italic">
          <Zap size={22} className="text-blue-500" fill="currentColor"/> 
          <span className="text-xl tracking-tighter">QR Innovations</span>
        </div>
        <nav className="space-y-3 flex-1">
          <button onClick={() => setActiveTab('facturacion')} className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all font-bold ${activeTab === 'facturacion' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:text-slate-300'}`}>
            <LayoutDashboard size={18}/> Panel de Emisión
          </button>
          <button onClick={() => setActiveTab('auditoria')} className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all font-bold ${activeTab === 'auditoria' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:text-slate-300'}`}>
            <List size={18}/> Auditoría v4.4
          </button>
          <button onClick={() => setActiveTab('reportes')} className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all font-bold ${activeTab === 'reportes' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:text-slate-300'}`}>
            <BarChart3 size={18}/> Inteligencia IA
          </button>
        </nav>
        {!isChatExpanded && (
          <motion.div layoutId="chat-ui" className="bg-[#0f172a] rounded-[2rem] p-5 border border-slate-800 flex flex-col h-72 shadow-2xl">
            <div className="flex justify-between items-center mb-4 text-[10px] font-black text-blue-400 uppercase tracking-widest">
              <span><Sparkles size={12} className="inline mr-1"/> QR-INSIGHT</span>
              <button onClick={() => setIsChatExpanded(true)} className="text-slate-500 hover:text-white"><Maximize2 size={16}/></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 text-[11px] text-slate-400 italic leading-snug">
               {chatMessages.slice(-1).map((msg, i) => (<div key={i}>"{msg.content}"</div>))}
            </div>
          </motion.div>
        )}
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b p-6 flex justify-between items-center font-black italic">
          <h2 className="text-xl tracking-tighter uppercase">Hotel Cañas <span className="text-sm font-normal text-slate-400 ml-2">/ {activeTab.toUpperCase()}</span></h2>
          <div className="bg-green-50 px-5 py-2 rounded-full text-[10px] text-green-600 border border-green-100 uppercase tracking-widest flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"/> v4.4 Conectado
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
          
          {/* PESTAÑA EMISIÓN */}
          {activeTab === 'facturacion' && (
            <div className="bg-white p-10 rounded-[3rem] border shadow-xl relative overflow-hidden">
               <h3 className="text-3xl font-black italic tracking-tighter text-slate-800 mb-10">Módulo de Emisión Express</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-slate-700">
                 <div className="p-6 bg-slate-50 rounded-3xl border-2 border-transparent focus-within:border-blue-500 transition-all shadow-sm font-bold">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Huésped / Razón Social</label>
                   <input type="text" defaultValue="Juan Diego Quiros" className="w-full bg-transparent font-black text-xl outline-none mt-1" />
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl border-2 border-transparent focus-within:border-blue-500 transition-all shadow-sm font-bold">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Identificación Jurídica / Física</label>
                   <input type="text" placeholder="3-101-XXXXXX" className="w-full bg-transparent font-black text-xl outline-none mt-1" />
                 </div>
               </div>
               <div className="p-10 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] text-white flex justify-between items-center shadow-2xl mb-8 border-4 border-white/10">
                 <div><p className="text-[11px] font-bold uppercase opacity-70 tracking-widest mb-1">Total Liquidación</p><p className="text-5xl font-black italic tracking-tighter tabular-nums">₡125,000.00</p></div>
                 <div className="text-right font-bold italic"><p className="text-[11px] font-bold uppercase opacity-70 tracking-widest mb-1">IVA (13%)</p><p className="text-2xl text-blue-100">₡16,250.00</p></div>
               </div>
               <button onClick={handleEmitir} disabled={isProcessing} className="w-full bg-slate-900 text-white font-black py-6 rounded-3xl text-xl hover:bg-black transition-all flex justify-center gap-3 uppercase italic tracking-tighter shadow-xl">
                 {isProcessing ? "Validando Hacienda..." : "Emitir Comprobante v4.4"} <ArrowRight/>
               </button>
               {isProcessing && !showActivityModal && (
                 <div className="mt-8 flex gap-6 text-[10px] font-black uppercase text-blue-600 italic font-bold">
                   <div className={step >= 1 ? 'opacity-100' : 'opacity-30'}><CheckCircle size={14} className="inline mr-1"/> Validando Datos</div>
                   <div className={step >= 2 ? 'opacity-100' : 'opacity-30'}><CheckCircle size={14} className="inline mr-1"/> Firmando XML</div>
                   <div className={step >= 3 ? 'opacity-100' : 'opacity-30'}><CheckCircle size={14} className="inline mr-1"/> Hacienda OK</div>
                 </div>
               )}
            </div>
          )}

          {/* AUDITORÍA */}
          {activeTab === 'auditoria' && (
            <div className="bg-white rounded-[3rem] border shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 font-bold">
               <div className="p-10 border-b bg-slate-50/50 flex justify-between items-center font-black italic tracking-tighter uppercase">
                 <h3 className="text-3xl text-slate-800">Auditoría de Documentos</h3>
                 <div className="flex gap-4">
                   <div className="relative font-bold"><Search className="absolute left-4 top-4 text-slate-400" size={18}/><input type="text" className="pl-12 pr-6 py-3.5 bg-white border rounded-2xl text-xs font-bold w-64 shadow-sm" placeholder="Buscar..."/></div>
                   <button className="bg-slate-900 text-white p-4 rounded-2xl shadow-lg"><Filter/></button>
                 </div>
               </div>
               <table className="w-full text-left text-xs font-bold italic">
                 <thead><tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b"><th className="px-8 py-6">ID Hacienda</th><th className="px-8 py-6">Fecha</th><th className="px-8 py-6">Cliente</th><th className="px-8 py-6 text-center font-black">Tipo</th><th className="px-8 py-6 text-center">Estado</th></tr></thead>
                 <tbody className="divide-y text-slate-700">
                   {masterFacturas.map((f, i) => (
                     <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                       <td className="px-8 py-6 font-mono text-[10px] text-blue-600 font-black tracking-widest">{f.id}</td>
                       <td className="px-8 py-6 text-slate-400">{f.fecha}</td>
                       <td className="px-8 py-6 font-black italic">{f.cliente}</td>
                       <td className="px-8 py-6 text-center font-black uppercase"><span className="px-2 py-1 rounded bg-slate-100 text-[9px]">{f.tipo}</span></td>
                       <td className="px-8 py-6 text-center"><span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${f.estado === 'Aceptado' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{f.estado}</span></td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          )}

          {/* INTELIGENCIA Y REPORTES AVANZADOS */}
          {activeTab === 'reportes' && (
            <div className="space-y-10 animate-in fade-in duration-700 font-bold">
               
               {/* KPI CARDS */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-black">
                  {[
                    {l: "Total Facturado Hoy", v: "₡2,769,710", c: "text-blue-600"},
                    {l: "IVA 13% Recaudado", v: "₡360,062", c: "text-slate-900"},
                    {l: "IVA 4% Hospedaje", v: "₡49,800", c: "text-orange-600"},
                    {l: "Tasa Aceptación", v: "99.2%", c: "text-green-600"},
                  ].map((k, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border shadow-sm hover:shadow-xl transition-all">
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{k.l}</p>
                      <h4 className={`text-3xl font-black tracking-tighter italic ${k.c}`}>{k.v}</h4>
                    </div>
                  ))}
               </div>

               {/* GENERADOR DE REPORTES DINÁMICO */}
               <div className="bg-[#020617] text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5"><Database size={150}/></div>
                  <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
                    <div>
                      <h3 className="text-3xl font-black italic italic flex items-center gap-3">Generador de Reportes "Slicer" <Sparkles className="text-blue-500"/></h3>
                      <p className="text-slate-400 font-bold italic mt-1 uppercase text-xs tracking-widest opacity-60">Control tributario absoluto sobre el Hotel Cañas</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg transition-all active:scale-95 shadow-blue-600/30">
                      <Download size={16}/> Exportar XLSX Ejecutivo
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                    {[
                      { l: "Periodo", v: "30 días", i: <Calendar/> },
                      { l: "Terminal", v: "Recepción 01", i: <Layers/> },
                      { l: "Actividad", v: "551001", i: <Briefcase/> },
                      { l: "Tributos", v: "IVA 13% & 4%", i: <PieChart/> }
                    ].map((f, i) => (
                      <div key={i} className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 text-xs font-bold text-slate-400 flex justify-between items-center cursor-pointer hover:border-blue-500 hover:bg-slate-800 transition-all group">
                        <div>
                           <p className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-1">{f.l}</p>
                           <span className="text-white group-hover:text-blue-100 transition-colors font-black">{f.v}</span>
                        </div>
                        <div className="text-slate-700 group-hover:text-blue-500 transition-colors">{f.i}</div>
                      </div>
                    ))}
                  </div>
               </div>
               
               {/* ÁREA ANALÍTICA CRUZADA */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 italic">
                  <div className="bg-white p-10 rounded-[3rem] border shadow-sm h-[480px]">
                    <div className="flex justify-between items-center mb-8">
                       <h4 className="font-black text-xl italic tracking-tighter uppercase italic">Distribución Tributaria Diaria</h4>
                       <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Live Sinc v4.4</span>
                    </div>
                    <ResponsiveContainer width="100%" height="80%">
                      <AreaChart data={dailyData}>
                        <defs><linearGradient id="cI" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} />
                        <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                        <Area type="monotone" dataKey="iva13" stroke="#2563eb" fill="url(#cI)" strokeWidth={6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white p-10 rounded-[3rem] border shadow-sm h-[480px]">
                    <h4 className="font-black text-xl italic mb-8 tracking-tighter uppercase italic">Rendimiento: Ingresos vs Gastos</h4>
                    <ResponsiveContainer width="100%" height="80%">
                      <LineChart data={dailyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="ventas" stroke="#2563eb" strokeWidth={5} dot={{r: 6, fill: '#2563eb', strokeWidth: 4, stroke: '#fff'}} />
                        <Line type="monotone" dataKey="gastos" stroke="#f43f5e" strokeWidth={3} strokeDasharray="5 5" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-[#0f172a] text-white p-10 rounded-[3rem] shadow-xl h-[480px]">
                    <h4 className="font-black text-xl italic mb-8 tracking-tighter uppercase italic text-blue-400">Eficiencia Operativa / Radar</h4>
                    <ResponsiveContainer width="100%" height="80%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#1e293b" />
                        <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} />
                        <Radar name="Hotel Cañas" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white p-10 rounded-[3rem] border shadow-sm h-[480px]">
                    <h4 className="font-black text-xl italic mb-8 tracking-tighter uppercase italic">Métrica de Ocupación por Día %</h4>
                    <ResponsiveContainer width="100%" height="80%">
                      <BarChart data={dailyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip cursor={{fill: '#f8fafc'}} />
                        <Bar dataKey="ocupacion" fill="#0f172a" radius={[15, 15, 0, 0]} barSize={45} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}