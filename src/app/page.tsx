"use client";
import React, { useState } from 'react';
import { 
  BarChart3, CheckCircle, Send, User, Zap, Bot, TrendingUp, Briefcase, ChevronRight,
  Database, FileSpreadsheet, Layers, PieChart, Sparkles, Maximize2, Minimize2, 
  List, LayoutDashboard, Search, Filter, ArrowRight, XCircle, Clock, 
  BrainCircuit, Target, ShieldCheck, Microscope, Calculator, Download, Calendar, Mail, Plus, Edit3, RefreshCw
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATASETS MAESTROS ---
const masterFacturasInit = [
  { id: '00100001010000000552', fecha: '2026-03-11 08:30', cliente: 'Hotel Cañas Corp', total: 1412500, tipo: 'FE', estado: 'Aceptado', error: '' },
  { id: '00100001040000000123', fecha: '2026-03-11 09:15', cliente: 'Juan Diego Quiros', total: 50850, tipo: 'TE', estado: 'Aceptado', error: '' },
  { id: '00100001010000000553', fecha: '2026-03-11 10:05', cliente: 'Inversiones del Norte', total: 960500, tipo: 'FE', estado: 'Rechazado', error: 'Cédula del receptor no coincide con padrón de Hacienda.' },
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
  { subject: 'Limpieza', A: 120 }, { subject: 'Mantenimiento', A: 98 }, { subject: 'Personal', A: 140 }, { subject: 'Marketing', A: 85 }, { subject: 'Servicios', A: 110 },
];

export default function DemoHotelFinalMax() {
  const [activeTab, setActiveTab] = useState('facturacion');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showEditErrorModal, setShowEditErrorModal] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [aiFocus, setAiFocus] = useState('general');
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("dquiros@qrinnovations.com");
  const [errorField, setErrorField] = useState("3-102-998877");
  const [aiAnalysis, setAiAnalysis] = useState("QR-Insight conectado. Analizando comportamiento v4.4...");
  
  // VARIABLES DEL CHAT (LAS QUE DABAN ERROR)
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', content: '¡Hola! Soy QR-Insight. ¿En qué área deseas profundizar hoy?' }
  ]);

  // --- LÓGICA DE EMISIÓN ---
  const handleEmitir = () => {
    setIsProcessing(true);
    setStep(1);
    setTimeout(() => setShowActivityModal(true), 800);
  };

  const confirmarActividad = (act: string) => {
    setShowActivityModal(false);
    setTimeout(() => setShowEmailModal(true), 500);
  };

  const finalizarEnvioExitoso = () => {
    setShowEmailModal(false);
    setStep(2);
    setTimeout(() => setStep(3), 1200);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(0);
      setAiAnalysis(`¡Factura enviada con éxito a ${email} y aceptada por Hacienda!`);
    }, 2500);
  };

  const handleReenviar = () => {
    setShowEditErrorModal(false);
    setIsProcessing(true);
    setStep(1);
    setTimeout(() => {
      setStep(2);
      setTimeout(() => {
        setStep(3);
        setTimeout(() => {
          setIsProcessing(false);
          setStep(0);
          setAiAnalysis("¡Corrección aceptada! El documento ha sido validado satisfactoriamente.");
        }, 1500);
      }, 1000);
    }, 1000);
  };

  const enviarChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMessages = [...chatMessages, { role: 'user', content: chatInput }];
    setChatMessages(newMessages);
    setChatInput("");
    
    setTimeout(() => {
      let response = "";
      if (aiFocus === 'tributaria') response = "Análisis Tributario: He revisado las retenciones del 13% de hoy. El tiquete TE-123 ya fue conciliado satisfactoriamente.";
      else if (aiFocus === 'ventas') response = "Análisis de Ventas: Se detecta un ticket promedio de ₡480k, un 12% superior al miércoles pasado.";
      else response = "Análisis QR-Insight: El flujo de caja actual es saludable. Recomiendo descargar el reporte XLSX para cierre de caja.";

      setChatMessages([...newMessages, { role: 'ai', content: response }]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans text-slate-900 overflow-hidden text-sm">
      
      {/* MODAL 1: ACTIVIDAD */}
      <AnimatePresence>
        {showActivityModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm text-slate-800 font-bold italic">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl">
              <h3 className="text-xl font-black mb-6 uppercase italic">Actividad v4.4</h3>
              <div className="space-y-3 text-slate-700">
                {["551001 - Hoteles", "561001 - Restaurantes"].map((act) => (
                  <button key={act} onClick={() => confirmarActividad(act)} className="w-full flex justify-between p-4 rounded-2xl border-2 hover:border-blue-500 transition-all">{act} <ChevronRight/></button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: CORREO (SMART MAILER) */}
      <AnimatePresence>
        {showEmailModal && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl border-4 border-blue-50 text-slate-800">
              <div className="bg-blue-100 w-16 h-16 rounded-3xl flex items-center justify-center text-blue-600 mb-6 mx-auto"><Mail size={32}/></div>
              <h3 className="text-2xl font-black text-center mb-2 uppercase italic">Destino de Factura</h3>
              <p className="text-slate-400 text-center mb-8 font-bold italic text-xs uppercase tracking-widest">Reconocimiento Automático QR-Innovations</p>
              <div className="space-y-4 text-slate-700">
                <div className="p-5 bg-slate-50 rounded-2xl border-2 border-blue-200">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-2">Email Principal</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent w-full font-black text-slate-700 outline-none" />
                </div>
                <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-black text-[10px] uppercase flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"><Plus size={14}/> Agregar CC</button>
              </div>
              <button onClick={finalizarEnvioExitoso} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl mt-10 shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all uppercase italic tracking-widest flex items-center justify-center gap-3">Confirmar y Despachar <Send size={18}/></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: RE-ENVÍO POR ERROR */}
      <AnimatePresence>
        {showEditErrorModal && (
          <div className="fixed inset-0 z-[170] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl">
               <div className="flex items-center gap-4 mb-6">
                 <div className="bg-red-100 p-3 rounded-2xl text-red-600"><Edit3 size={24}/></div>
                 <h3 className="text-2xl font-black italic text-slate-800 tracking-tighter uppercase">Corregir Hacienda</h3>
               </div>
               <div className="bg-red-50 p-4 rounded-2xl border border-red-100 mb-6 text-red-700">
                 <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Error Detectado:</p>
                 <p className="text-xs font-bold italic">"Cédula del receptor no coincide con padrón."</p>
               </div>
               <div className="p-5 bg-slate-50 rounded-2xl border-2 border-blue-500 mb-8">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-2 font-bold">Modificar ID Fiscal:</label>
                  <input value={errorField} onChange={(e)=>setErrorField(e.target.value)} className="w-full bg-transparent font-black text-xl text-slate-800 outline-none" />
               </div>
               <div className="flex gap-4">
                  <button onClick={()=>setShowEditErrorModal(false)} className="flex-1 py-4 font-black text-slate-400 uppercase text-xs">Cancelar</button>
                  <button onClick={handleReenviar} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2 shadow-xl">RE-PROCESAR <RefreshCw size={14}/></button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CHAT EXPANDIDO (MODO INTELIGENCIA) */}
      <AnimatePresence>
        {isChatExpanded && (
          <div className="fixed inset-0 z-[180] bg-slate-900/95 backdrop-blur-2xl flex items-center justify-center p-8">
            <motion.div layoutId="chat-ui" className="bg-[#020617] w-full max-w-6xl h-[85vh] rounded-[3.5rem] border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-4"><div className="bg-blue-600 p-3 rounded-2xl"><Bot className="text-white" size={28}/></div><h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">QR-Insight Intelligence Center</h3></div>
                <button onClick={() => setIsChatExpanded(false)} className="bg-slate-800 p-3 rounded-full text-white hover:bg-slate-700 transition-colors"><Minimize2/></button>
              </div>
              <div className="px-10 py-6 border-b border-slate-800 flex gap-4 overflow-x-auto no-scrollbar">
                {['General', 'Tributaria', 'Ventas', 'Auditoría'].map((l) => (
                  <button key={l} onClick={() => setAiFocus(l.toLowerCase())} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest ${aiFocus === l.toLowerCase() ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400'}`}>{l}</button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto p-10 space-y-6">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-6 rounded-[2.2rem] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white shadow-xl' : 'bg-slate-800/80 text-slate-200 border border-slate-700'}`}>{msg.content}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={enviarChat} className="p-8 bg-slate-900/80 border-t border-slate-800 flex gap-4">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={`Escribe tu consulta sobre ${aiFocus}...`} className="flex-1 bg-slate-800/50 border-none rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
                <button type="submit" className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg"><Send size={20}/></button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#020617] text-white p-6 hidden lg:flex flex-col border-r border-slate-800 shadow-2xl">
        <div className="flex items-center gap-3 mb-10 px-2 font-black italic text-xl tracking-tighter"><Zap size={22} className="text-blue-500" fill="currentColor"/> QR Innovations</div>
        <nav className="space-y-3 flex-1 font-bold">
          <button onClick={() => setActiveTab('facturacion')} className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all ${activeTab === 'facturacion' ? 'bg-blue-600 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}><LayoutDashboard size={18}/> Emisión</button>
          <button onClick={() => setActiveTab('auditoria')} className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all ${activeTab === 'auditoria' ? 'bg-blue-600 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}><List size={18}/> Auditoría</button>
          <button onClick={() => setActiveTab('reportes')} className={`flex items-center gap-3 w-full p-4 rounded-2xl transition-all ${activeTab === 'reportes' ? 'bg-blue-600 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}><BarChart3 size={18}/> Inteligencia</button>
        </nav>
        {!isChatExpanded && (
          <motion.div layoutId="chat-ui" className="bg-[#0f172a] rounded-[2rem] p-5 border border-slate-800 flex flex-col h-64 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 text-[10px] font-black text-blue-400 uppercase tracking-widest"><span><Sparkles size={12} className="inline mr-1"/> QR-INSIGHT</span><button onClick={() => setIsChatExpanded(true)} className="text-slate-500 hover:text-white"><Maximize2 size={16}/></button></div>
            <p className="text-[11px] text-slate-400 italic leading-relaxed">"{aiAnalysis}"</p>
          </motion.div>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b p-6 flex justify-between items-center font-black italic shadow-sm">
          <h2 className="text-xl tracking-tighter uppercase text-slate-800">Hotel Cañas</h2>
          <div className="bg-green-50 px-5 py-2 rounded-full text-[10px] text-green-600 border border-green-100 uppercase font-black italic flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"/> v4.4 Conectado
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
          
          {/* PESTAÑA EMISIÓN */}
          {activeTab === 'facturacion' && (
            <div className="bg-white p-10 rounded-[3rem] border shadow-xl relative overflow-hidden">
               <h3 className="text-3xl font-black italic tracking-tighter text-slate-800 mb-10 uppercase">Emisión Express</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-slate-700 font-bold">
                 <div className="p-6 bg-slate-50 rounded-3xl border-2 border-transparent focus-within:border-blue-500 transition-all shadow-sm">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Huésped / Razón Social</label>
                   <input type="text" defaultValue="Juan Diego Quiros" className="w-full bg-transparent font-black text-xl outline-none mt-1" />
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl border-2 border-transparent focus-within:border-blue-500 transition-all shadow-sm">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identificación</label>
                   <input type="text" placeholder="3-101-XXXXXX" className="w-full bg-transparent font-black text-xl outline-none mt-1" />
                 </div>
               </div>
               <div className="p-10 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] text-white flex justify-between items-center shadow-2xl mb-8 border-4 border-white/10">
                 <div><p className="text-[11px] font-bold uppercase opacity-70 tracking-widest mb-1">Total</p><p className="text-5xl font-black italic tracking-tighter">₡125,000.00</p></div>
                 <div className="text-right font-bold italic font-black uppercase"><p className="text-[11px] font-bold opacity-70 tracking-widest mb-1 tracking-widest">IVA (13%)</p><p className="text-2xl text-blue-100">₡16,250.00</p></div>
               </div>
               <button onClick={handleEmitir} disabled={isProcessing} className="w-full bg-slate-900 text-white font-black py-6 rounded-3xl text-xl hover:bg-black transition-all flex justify-center items-center gap-3 shadow-xl uppercase italic tracking-tighter">
                 {isProcessing ? "Procesando..." : "Emitir Comprobante v4.4"} <ArrowRight/>
               </button>
               {isProcessing && !showActivityModal && !showEmailModal && (
                 <div className="mt-8 flex gap-6 text-[10px] font-black uppercase text-blue-600 italic">
                   <div className={step >= 1 ? 'opacity-100' : 'opacity-30'}><CheckCircle size={14} className="inline mr-1"/> Validando Datos</div>
                   <div className={step >= 2 ? 'opacity-100' : 'opacity-30'}><CheckCircle size={14} className="inline mr-1"/> Firmando XML</div>
                   <div className={step >= 3 ? 'opacity-100' : 'opacity-30'}><CheckCircle size={14} className="inline mr-1"/> Hacienda OK</div>
                 </div>
               )}
            </div>
          )}

          {/* AUDITORÍA */}
          {activeTab === 'auditoria' && (
            <div className="bg-white rounded-[3rem] border shadow-xl overflow-hidden font-bold italic">
               <div className="p-10 border-b bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 uppercase">
                  <h3 className="text-3xl font-black italic tracking-tighter text-slate-800 tracking-tighter italic">Auditoría de Documentos</h3>
                  <div className="flex gap-3 relative font-bold"><Search className="absolute left-4 top-3 text-slate-400" size={16}/><input type="text" className="pl-12 pr-6 py-2.5 bg-white border rounded-2xl text-xs font-bold w-64 shadow-sm" placeholder="Buscar..."/></div>
               </div>
               <table className="w-full text-left text-xs font-bold italic">
                 <thead><tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b italic font-black"><th className="px-8 py-6">ID Hacienda</th><th className="px-8 py-6">Fecha</th><th className="px-8 py-6">Cliente</th><th className="px-8 py-6 text-center">Respuesta</th></tr></thead>
                 <tbody className="divide-y text-slate-700">
                   {masterFacturasInit.map((f, i) => (
                     <tr key={i} className="hover:bg-blue-50/40 transition-all group">
                       <td className="px-8 py-6 font-mono text-[10px] text-blue-600 font-black italic">{f.id}</td>
                       <td className="px-8 py-6 text-slate-400">{f.fecha}</td>
                       <td className="px-8 py-6 font-black italic uppercase">{f.cliente}</td>
                       <td className="px-8 py-6 text-center">
                          <div className="flex flex-col items-center gap-1">
                             <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${f.estado === 'Aceptado' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700 shadow-xl shadow-red-100'}`}>{f.estado}</span>
                             {f.estado === 'Rechazado' && (
                               <button onClick={()=>setShowEditErrorModal(true)} className="text-[9px] text-blue-600 underline font-black uppercase tracking-widest mt-2 flex items-center gap-1"><Edit3 size={10}/> Corregir y Re-enviar</button>
                             )}
                          </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          )}

          {/* REPORTES */}
          {activeTab === 'reportes' && (
            <div className="space-y-10 animate-in fade-in duration-700 font-bold italic">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-black tracking-tight uppercase italic">
                  {[{l:"Ventas",v:"₡24.5M",c:"text-blue-600"},{l:"IVA 13%",v:"₡2.1M",c:"text-slate-900"},{l:"IVA 4%",v:"₡845k",c:"text-orange-600"},{l:"Cumplimiento",v:"99.2%",c:"text-green-600"}].map((k, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border shadow-sm hover:shadow-xl transition-all border-b-8 border-b-blue-600/5">
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 italic tracking-[0.2em]">{k.l}</p>
                      <h4 className={`text-3xl font-black tracking-tighter ${k.c}`}>{k.v}</h4>
                    </div>
                  ))}
               </div>

               <div className="bg-[#020617] text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group border-4 border-blue-500/20">
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-all"><Database size={150}/></div>
                  <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
                    <div><h3 className="text-3xl font-black italic flex items-center gap-3 uppercase italic tracking-tighter">Generador de Reportes "Slicer" <Sparkles className="text-blue-500 shadow-blue-500"/></h3><p className="text-slate-400 font-bold italic mt-1 uppercase text-xs opacity-60">Filtros dinámicos Hacienda v4.4</p></div>
                    <button className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-all active:scale-95 shadow-xl font-black italic"><Download size={16}/> EXPORTAR XLSX</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10 text-slate-400">
                    {[{l:"Periodo",v:"30 días",i:<Calendar/>},{l:"Terminal",v:"01",i:<Layers/>},{l:"Actividad",v:"551001",i:<Briefcase/>},{l:"Tributos",v:"13% & 4%",i:<PieChart/>}].map((f, i) => (
                      <div key={i} className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 text-xs font-bold flex justify-between items-center cursor-pointer hover:border-blue-500 hover:bg-slate-800 transition-all shadow-inner">
                        <div><p className="text-[9px] font-black uppercase text-blue-400 mb-1 italic font-bold">Filtrar por {f.l}</p><span className="text-white font-black uppercase italic tracking-tighter">{f.v}</span></div>
                        <div className="text-slate-700">{f.i}</div>
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 italic">
                  <div className="bg-white p-10 rounded-[3rem] border shadow-sm h-[480px]">
                    <h4 className="font-black text-xl italic mb-8 tracking-tighter uppercase text-slate-800 italic">Recaudación IVA Semanal</h4>
                    <ResponsiveContainer width="100%" height="80%"><AreaChart data={dailyData}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} /><YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} /><Tooltip /><Area type="monotone" dataKey="iva13" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} strokeWidth={6} /></AreaChart></ResponsiveContainer>
                  </div>
                  <div className="bg-[#0f172a] text-white p-10 rounded-[3rem] shadow-xl h-[480px] border-4 border-slate-800 font-bold uppercase italic font-black">
                    <h4 className="font-black text-xl italic mb-8 tracking-tighter uppercase text-blue-400 italic">Eficiencia Operativa / Radar</h4>
                    <ResponsiveContainer width="100%" height="100%"><RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}><PolarGrid stroke="#1e293b" /><PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} /><Radar name="Hotel" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} /></RadarChart></ResponsiveContainer>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}