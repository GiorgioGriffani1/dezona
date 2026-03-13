import { useState } from 'react'

const CATEGORIES = [
  { id:'sport',   emoji:'🏃', name:'Sport & Attività',    sub:'calcetto, yoga, tennis…' },
  { id:'cibo',    emoji:'🍽️', name:'Cibo & Ristorazione', sub:'aperitivi, cene, merende…' },
  { id:'servizi', emoji:'🔧', name:'Commercio & Servizi',  sub:'negozi, artigiani…' },
  { id:'cultura', emoji:'🎨', name:'Cultura & Hobby',      sub:'musica, pittura, lettura…' },
]

const DAYS = ['LUN','MAR','MER','GIO','VEN','SAB','DOM']

const SLOTS = [
  { id:'mattina',    icon:'🌅', name:'Mattina',    time:'7–12' },
  { id:'pranzo',     icon:'☀️', name:'Pranzo',     time:'12–15' },
  { id:'pomeriggio', icon:'🌤️', name:'Pomeriggio', time:'15–19' },
  { id:'aperitivo',  icon:'🌆', name:'Aperitivo',  time:'19–21' },
  { id:'sera',       icon:'🌙', name:'Sera',       time:'21–24' },
  { id:'sempre',     icon:'🔁', name:'Sempre',     time:'flessibile' },
]

export default function AddForm({ onSubmit }) {
  const [form, setForm] = useState({
    user_name:'', contact:'', title:'', description:'',
    category:'', place_name:'', max_people:'', hour:'', duration:''
  })
  const [days, setDays] = useState([])
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function toggleDay(d) {
    setDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }

  function toggleSlot(s) {
    setSlots(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  async function handleSubmit() {
    if (!form.user_name || !form.title || !form.category) {
      alert('Compila Nome, Titolo e scegli una Categoria.')
      return
    }
    setLoading(true)
    const error = await onSubmit({
      ...form,
      emoji: CATEGORIES.find(c => c.id === form.category)?.emoji || '⭐',
      days: days.join(', '),
      time_slot: slots.join(' / '),
      max_people: form.max_people ? parseInt(form.max_people) : null,
    })
    setLoading(false)
    if (!error) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      setForm({ user_name:'', contact:'', title:'', description:'',
        category:'', place_name:'', max_people:'', hour:'', duration:'' })
      setDays([])
      setSlots([])
    }
  }

  const s = {
    card: {
      background:'white',
      border:'1.5px solid rgba(59,191,239,0.18)',
      borderRadius:36, padding:'1.8rem',
      marginBottom:'1.2rem',
      boxShadow:'0 2px 14px rgba(59,191,239,0.06)'
    },
    title: {
      fontFamily:'Nunito,sans-serif', fontSize:'0.68rem',
      fontWeight:800, color:'#3BBFEF',
      textTransform:'uppercase', letterSpacing:'0.14em',
      marginBottom:'1.4rem', paddingBottom:'0.8rem',
      borderBottom:'1.5px solid rgba(59,191,239,0.18)',
      display:'block'
    },
    label: {
      fontFamily:'Nunito,sans-serif', fontSize:'0.78rem',
      fontWeight:700, color:'#2E4855',
      display:'block', marginBottom:'0.4rem'
    },
    input: {
      background:'#F0F9FF',
      border:'1.5px solid rgba(59,191,239,0.18)',
      borderRadius:50, padding:'0.7rem 1.1rem',
      fontFamily:'Nunito Sans,sans-serif',
      fontSize:'0.88rem', color:'#1A2D35',
      outline:'none', width:'100%',
      boxSizing:'border-box'
    },
    textarea: {
      background:'#F0F9FF',
      border:'1.5px solid rgba(59,191,239,0.18)',
      borderRadius:20, padding:'0.7rem 1.1rem',
      fontFamily:'Nunito Sans,sans-serif',
      fontSize:'0.88rem', color:'#1A2D35',
      outline:'none', width:'100%',
      minHeight:90, resize:'vertical',
      boxSizing:'border-box'
    },
  }

  return (
    <div style={{ maxWidth:680, margin:'0 auto', padding:'3rem 1.8rem 5rem', fontFamily:'Nunito Sans,sans-serif' }}>

      {/* HEADER */}
      <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
        <div style={{ width:70, height:70, background:'linear-gradient(135deg,#E3F6FD,#E0FAF2)', borderRadius:24, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', margin:'0 auto 1.2rem', border:'2px solid rgba(59,191,239,0.2)' }}>✨</div>
        <h2 style={{ fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'1.9rem', color:'#1A2D35', letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>Condividi il tuo interesse</h2>
        <p style={{ color:'#6B8EA0', fontSize:'0.9rem' }}>Fai sapere al quartiere cosa fai, cosa offri o cosa cerchi. Gratis, sempre.</p>
      </div>

      {/* STEP 1 — CHI SEI */}
      <div style={s.card}>
        <span style={s.title}>👤 Chi sei</span>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          <div>
            <label style={s.label}>Nome / Nickname *</label>
            <input style={s.input} placeholder="Marco R." value={form.user_name} onChange={e => set('user_name', e.target.value)} />
          </div>
          <div>
            <label style={s.label}>Contatto (tel o email)</label>
            <input style={s.input} placeholder="320 000 0000" value={form.contact} onChange={e => set('contact', e.target.value)} />
          </div>
        </div>
      </div>

      {/* STEP 2 — INTERESSE */}
      <div style={s.card}>
        <span style={s.title}>💡 Il tuo interesse</span>

        <div style={{ marginBottom:'1rem' }}>
          <label style={s.label}>Titolo *</label>
          <input style={s.input} placeholder="Es: Yoga nel parco, Calcetto domenicale…" value={form.title} onChange={e => set('title', e.target.value)} />
        </div>

        <div style={{ marginBottom:'1rem' }}>
          <label style={s.label}>Descrizione</label>
          <textarea style={s.textarea} placeholder="Chi può partecipare? Costo, livello, dettagli utili…" value={form.description} onChange={e => set('description', e.target.value)} />
        </div>

        <div style={{ marginBottom:'1rem' }}>
          <label style={s.label}>Categoria *</label>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.7rem' }}>
            {CATEGORIES.map(cat => (
              <div key={cat.id} onClick={() => set('category', cat.id)} style={{
                background: form.category === cat.id ? 'linear-gradient(135deg,#E3F6FD,#E0FAF2)' : '#F0F9FF',
                border: `2px solid ${form.category === cat.id ? '#3BBFEF' : 'rgba(59,191,239,0.18)'}`,
                borderRadius:28, padding:'1rem 0.9rem',
                cursor:'pointer', display:'flex',
                alignItems:'center', gap:'0.7rem', transition:'all 0.2s'
              }}>
                <div style={{ width:38, height:38, background:'white', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', flexShrink:0 }}>{cat.emoji}</div>
                <div>
                  <div style={{ fontFamily:'Nunito,sans-serif', fontSize:'0.82rem', fontWeight:800, color: form.category === cat.id ? '#3BBFEF' : '#2E4855' }}>{cat.name}</div>
                  <div style={{ fontSize:'0.67rem', color:'#6B8EA0', marginTop:'0.1rem' }}>{cat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          <div>
            <label style={s.label}>Luogo / zona</label>
            <input style={s.input} placeholder="Parco Europa, Via dei Pini…" value={form.place_name} onChange={e => set('place_name', e.target.value)} />
          </div>
          <div>
            <label style={s.label}>Max partecipanti</label>
            <input style={s.input} type="number" placeholder="0 = illimitato" value={form.max_people} onChange={e => set('max_people', e.target.value)} />
          </div>
        </div>
      </div>

      {/* STEP 3 — QUANDO */}
      <div style={s.card}>
        <span style={s.title}>📅 Quando</span>

        <div style={{ marginBottom:'1rem' }}>
          <label style={s.label}>Giorni della settimana</label>
          <div style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap' }}>
            {DAYS.map(d => (
              <button key={d} onClick={() => toggleDay(d)} style={{
                width:44, height:44, borderRadius:14,
                border: `1.5px solid ${days.includes(d) ? 'transparent' : 'rgba(59,191,239,0.18)'}`,
                background: days.includes(d) ? 'linear-gradient(135deg,#3BBFEF,#5DD9B0)' : '#F0F9FF',
                color: days.includes(d) ? 'white' : '#6B8EA0',
                fontFamily:'Nunito,sans-serif', fontSize:'0.7rem',
                fontWeight:800, cursor:'pointer', transition:'all 0.18s'
              }}>{d}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:'1rem' }}>
          <label style={s.label}>Fascia oraria</label>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.6rem' }}>
            {SLOTS.map(slot => (
              <div key={slot.id} onClick={() => toggleSlot(slot.name)} style={{
                background: slots.includes(slot.name) ? 'linear-gradient(135deg,#E3F6FD,#E0FAF2)' : '#F0F9FF',
                border: `1.5px solid ${slots.includes(slot.name) ? '#3BBFEF' : 'rgba(59,191,239,0.18)'}`,
                borderRadius:20, padding:'0.75rem 0.5rem',
                textAlign:'center', cursor:'pointer', transition:'all 0.18s'
              }}>
                <span style={{ fontSize:'1.1rem', display:'block', marginBottom:'0.25rem' }}>{slot.icon}</span>
                <span style={{ fontFamily:'Nunito,sans-serif', fontSize:'0.74rem', fontWeight:800, color: slots.includes(slot.name) ? '#3BBFEF' : '#2E4855', display:'block' }}>{slot.name}</span>
                <span style={{ fontSize:'0.61rem', color:'#9BB8C8' }}>{slot.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          <div>
            <label style={s.label}>Ora precisa (opz.)</label>
            <input style={s.input} type="time" value={form.hour} onChange={e => set('hour', e.target.value)} />
          </div>
          <div>
            <label style={s.label}>Durata stimata</label>
            <select style={s.input} value={form.duration} onChange={e => set('duration', e.target.value)}>
              <option value="">—</option>
              <option>30 min</option>
              <option>1 ora</option>
              <option>1.5 ore</option>
              <option>2 ore</option>
              <option>Mezza giornata</option>
              <option>Tutto il giorno</option>
            </select>
          </div>
        </div>
      </div>

      {/* SUBMIT */}
      <button onClick={handleSubmit} disabled={loading} style={{
        width:'100%',
        background: loading ? '#9BB8C8' : 'linear-gradient(135deg,#3BBFEF,#5DD9B0)',
        color:'white', border:'none', padding:'1.1rem',
        borderRadius:50, fontFamily:'Nunito,sans-serif',
        fontSize:'1rem', fontWeight:900,
        cursor: loading ? 'not-allowed' : 'pointer',
        boxShadow:'0 6px 24px rgba(59,191,239,0.3)',
        marginTop:'0.5rem', transition:'all 0.22s'
      }}>
        {loading ? 'Pubblicazione...' : '🚀 Pubblica su Dezona'}
      </button>

      {/* SUCCESS */}
      {success && (
        <div style={{
          background:'linear-gradient(135deg,#E3F6FD,#E0FAF2)',
          border:'1.5px solid rgba(59,191,239,0.3)',
          borderRadius:28, padding:'1.2rem 1.5rem',
          textAlign:'center', marginTop:'1rem',
          fontFamily:'Nunito,sans-serif', fontWeight:800,
          color:'#1A9E8F', fontSize:'1rem'
        }}>
          🎉 Pubblicato con successo!
          <div style={{ fontFamily:'Nunito Sans,sans-serif', fontWeight:400, fontSize:'0.8rem', color:'#6B8EA0', marginTop:'0.3rem' }}>
            Il tuo interesse è ora visibile a tutta Casalpalocco.
          </div>
        </div>
      )}

    </div>
  )
}