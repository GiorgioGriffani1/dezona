import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Topbar from './components/Topbar'
import Card from './components/Card'
import AddForm from './components/AddForm'

export default function App() {
  const [page, setPage] = useState('discover')
  const [places, setPlaces] = useState([])
  const [interests, setInterests] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('tutti')
  const [modal, setModal] = useState(null)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    const { data: p } = await supabase.from('places').select('*').eq('zone_id', 1)
    const { data: i } = await supabase.from('community_interests').select('*').eq('zone_id', 1).eq('active', true).order('created_at', { ascending: false })
    setPlaces(p || [])
    setInterests(i || [])
    setLoading(false)
  }

  async function addInterest(formData) {
    const { error } = await supabase.from('community_interests').insert([{ ...formData, zone_id: 1 }])
    if (!error) { fetchData(); setPage('discover') }
    return error
  }

  const allItems = [
    ...places.map(p => ({ ...p, source:'maps' })),
    ...interests.map(i => ({ ...i, source:'community' }))
  ]

  const filtered = allItems.filter(item => {
    const matchFilter =
      filter === 'tutti' ? true :
      filter === 'community' ? item.source === 'community' :
      item.category === filter
    const matchSearch = search === '' ? true :
      [item.name, item.title, item.description, item.category]
        .filter(Boolean)
        .some(f => f.toLowerCase().includes(search.toLowerCase()))
    return matchFilter && matchSearch
  })

  const filteredMaps = filtered.filter(i => i.source === 'maps')
  const filteredCommunity = filtered.filter(i => i.source === 'community')

  const FILTERS = [
    { id:'tutti',     label:'Tutti' },
    { id:'sport',     label:'🏃 Sport' },
    { id:'cibo',      label:'🍽️ Cibo' },
    { id:'servizi',   label:'🔧 Servizi' },
    { id:'cultura',   label:'🎨 Cultura' },
    { id:'community', label:'🌿 Community' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#F0F9FF', fontFamily:'Nunito Sans,sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Nunito+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      <Topbar page={page} setPage={setPage} />

      {/* ══ DISCOVER ══ */}
      {page === 'discover' && (
        <div>
          {/* HERO */}
          <div style={{ background:'linear-gradient(160deg,#e0f5ff 0%,#d6f5ec 50%,#e8f7ff 100%)', padding:'4rem 1.8rem 3rem', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', width:420, height:420, background:'radial-gradient(circle,rgba(59,191,239,.15),transparent 70%)', top:-100, right:-80, borderRadius:'50%' }} />
            <div style={{ maxWidth:820, margin:'0 auto', position:'relative' }}>

              <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'white', border:'1.5px solid rgba(59,191,239,.25)', color:'#3BBFEF', fontFamily:'Nunito,sans-serif', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.3rem 0.9rem', borderRadius:'50px', marginBottom:'1.2rem' }}>
                <span style={{ width:6, height:6, background:'#5DD9B0', borderRadius:'50%', display:'inline-block' }} />
                Live ora · Casalpalocco
              </div>

              <h1 style={{ fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'3rem', color:'#1A2D35', lineHeight:1.1, letterSpacing:'-0.03em', marginBottom:'1rem' }}>
                Scopri cosa c'è<br />
                <span style={{ background:'linear-gradient(135deg,#3BBFEF,#5DD9B0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>vicino a te</span> 🌿
              </h1>

              <p style={{ color:'#6B8EA0', fontSize:'1rem', lineHeight:1.65, maxWidth:460, marginBottom:'2rem' }}>
                Attività consolidate e tutto quello che la community condivide ogni giorno.
              </p>

              {/* SEARCH */}
              <div style={{ display:'flex', background:'white', border:'2px solid rgba(59,191,239,.25)', borderRadius:50, padding:'0.5rem 0.5rem 0.5rem 1.4rem', gap:'0.6rem', maxWidth:560, boxShadow:'0 6px 30px rgba(59,191,239,.15)', alignItems:'center', marginBottom:'1.2rem' }}>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="yoga, calcetto, bar, artigiani…"
                  style={{ flex:1, border:'none', outline:'none', fontFamily:'Nunito Sans,sans-serif', fontSize:'0.95rem', color:'#1A2D35', background:'transparent' }}
                />
                <button style={{ background:'linear-gradient(135deg,#3BBFEF,#5DD9B0)', color:'white', border:'none', padding:'0.65rem 1.4rem', borderRadius:50, fontFamily:'Nunito,sans-serif', fontWeight:800, fontSize:'0.85rem', cursor:'pointer' }}>
                  Cerca ✦
                </button>
              </div>

              {/* PILLS */}
              <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                {['yoga','calcetto','colazione','pilates','musica','artigiano'].map(q => (
                  <button key={q} onClick={() => setSearch(q)} style={{ background:'white', border:'1.5px solid rgba(59,191,239,.2)', color:'#2E4855', padding:'0.35rem 0.9rem', borderRadius:50, fontSize:'0.79rem', fontWeight:600, cursor:'pointer', fontFamily:'Nunito,sans-serif' }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STATS */}
          <div style={{ background:'white', display:'flex', borderBottom:'1.5px solid rgba(59,191,239,.18)' }}>
            {[
              { icon:'📍', num: places.length, label:'Da Google Maps' },
              { icon:'🌿', num: interests.length, label:'Dalla community' },
              { icon:'⚡', num: 1, label:'Zona attiva' },
              { icon:'🗺️', num: 14, label:'Zone in arrivo' },
            ].map((s,i) => (
              <div key={i} style={{ flex:1, padding:'1.2rem 1.5rem', borderRight: i<3 ? '1.5px solid rgba(59,191,239,.18)' : 'none', display:'flex', alignItems:'center', gap:'1rem' }}>
                <div style={{ width:40, height:40, background:'linear-gradient(135deg,#E3F6FD,#E0FAF2)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem' }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily:'Nunito,sans-serif', fontSize:'1.6rem', fontWeight:900, color:'#1A2D35', lineHeight:1 }}>{s.num}</div>
                  <div style={{ fontSize:'0.7rem', color:'#6B8EA0', textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:600 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CONTENT */}
          <div style={{ maxWidth:1100, margin:'0 auto', padding:'2rem 1.8rem 5rem' }}>

            {/* FILTRI */}
            <div style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap', marginBottom:'1.6rem' }}>
              {FILTERS.map(f => (
                <button key={f.id} onClick={() => setFilter(f.id)} style={{
                  background: filter===f.id ? '#E3F6FD' : 'white',
                  border: `1.5px solid ${filter===f.id ? 'rgba(59,191,239,.5)' : 'rgba(59,191,239,.18)'}`,
                  color: filter===f.id ? '#3BBFEF' : '#6B8EA0',
                  padding:'0.38rem 0.9rem', borderRadius:50,
                  fontFamily:'Nunito,sans-serif', fontSize:'0.79rem',
                  fontWeight:700, cursor:'pointer'
                }}>{f.label}</button>
              ))}
            </div>

            {loading ? (
              <div style={{ textAlign:'center', padding:'4rem', color:'#6B8EA0', fontFamily:'Nunito,sans-serif' }}>
                Caricamento... 🌊
              </div>
            ) : (
              <>
                {/* MAPS */}
                {filteredMaps.length > 0 && (
                  <div style={{ marginBottom:'2.5rem' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.2rem' }}>
                      <h2 style={{ fontFamily:'Nunito,sans-serif', fontSize:'1.05rem', fontWeight:800, color:'#1A2D35', display:'flex', alignItems:'center', gap:'0.6rem' }}>
                        📍 Realtà consolidate
                        <span style={{ background:'#E6F4FB', color:'#6B8EA0', fontSize:'0.68rem', fontWeight:800, padding:'0.2rem 0.55rem', borderRadius:50 }}>{filteredMaps.length}</span>
                      </h2>
                      <span style={{ fontSize:'0.72rem', color:'#9BB8C8' }}>da Google Maps · alto rating</span>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.1rem' }}>
                      {filteredMaps.map(item => <Card key={item.id} item={item} onContact={setModal} />)}
                    </div>
                  </div>
                )}

                {/* COMMUNITY */}
                {filteredCommunity.length > 0 && (
                  <div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.2rem' }}>
                      <h2 style={{ fontFamily:'Nunito,sans-serif', fontSize:'1.05rem', fontWeight:800, color:'#1A2D35', display:'flex', alignItems:'center', gap:'0.6rem' }}>
                        🌿 Dalla community
                        <span style={{ background:'#E6F4FB', color:'#6B8EA0', fontSize:'0.68rem', fontWeight:800, padding:'0.2rem 0.55rem', borderRadius:50 }}>{filteredCommunity.length}</span>
                      </h2>
                      <button onClick={() => setPage('add')} style={{ fontSize:'0.78rem', color:'#3BBFEF', fontWeight:700, background:'none', border:'none', cursor:'pointer', fontFamily:'Nunito,sans-serif' }}>+ Aggiungi →</button>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.1rem' }}>
                      {filteredCommunity.map(item => <Card key={item.id} item={item} onContact={setModal} />)}
                    </div>
                  </div>
                )}

                {/* EMPTY STATE */}
                {filtered.length === 0 && (
                  <div style={{ textAlign:'center', padding:'4rem 2rem', background:'white', borderRadius:28, border:'1.5px solid rgba(59,191,239,.18)' }}>
                    <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🔍</div>
                    <h3 style={{ fontFamily:'Nunito,sans-serif', fontWeight:800, color:'#1A2D35', marginBottom:'0.5rem' }}>Nessun risultato</h3>
                    <p style={{ color:'#6B8EA0', fontSize:'0.88rem', marginBottom:'1.5rem' }}>
                      Non ho trovato nulla per <strong>"{search}"</strong> a Casalpalocco.<br />Potresti essere il primo a inserirlo!
                    </p>
                    <button onClick={() => setPage('add')} style={{ background:'linear-gradient(135deg,#3BBFEF,#5DD9B0)', color:'white', border:'none', padding:'0.7rem 1.5rem', borderRadius:50, fontFamily:'Nunito,sans-serif', fontWeight:800, cursor:'pointer' }}>
                      + Aggiungi questo interesse
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ══ ADD PAGE ══ */}
      {page === 'add' && <AddForm onSubmit={addInterest} />}

      {/* ══ MODAL ══ */}
      {modal && (
        <div onClick={() => setModal(null)} style={{ position:'fixed', inset:0, background:'rgba(26,45,53,.45)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'white', border:'1.5px solid rgba(59,191,239,.18)', borderRadius:36, padding:'2rem', maxWidth:430, width:'93%', position:'relative', boxShadow:'0 24px 60px rgba(59,191,239,.2)' }}>
            <button onClick={() => setModal(null)} style={{ position:'absolute', top:'1rem', right:'1rem', width:32, height:32, background:'#F0F9FF', border:'1.5px solid rgba(59,191,239,.18)', borderRadius:50, color:'#6B8EA0', cursor:'pointer', fontSize:'0.85rem' }}>✕</button>

            <div style={{ width:56, height:56, background:'linear-gradient(135deg,#E3F6FD,#E0FAF2)', borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.7rem', marginBottom:'1rem', border:'1.5px solid rgba(59,191,239,.2)' }}>
              {modal.emoji || '📌'}
            </div>

            <h3 style={{ fontFamily:'Nunito,sans-serif', fontSize:'1.2rem', fontWeight:900, color:'#1A2D35', marginBottom:'0.35rem' }}>{modal.name || modal.title}</h3>
            <p style={{ fontSize:'0.82rem', color:'#6B8EA0', lineHeight:1.55, marginBottom:'1.2rem' }}>{modal.description}</p>

            <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem', marginBottom:'1.4rem' }}>
              {modal.source === 'maps' ? <>
                <Row label="⭐ Rating" val={`${modal.rating}/5 · ${modal.reviews} recensioni`} />
                <Row label="📍 Dove"  val={modal.address} />
                <Row label="⏰ Orari" val={modal.hours} />
                {modal.phone && <Row label="📞 Tel" val={modal.phone} />}
              </> : <>
                <Row label="👤 Chi"     val={modal.user_name} />
                <Row label="📅 Giorni"  val={modal.days} />
                <Row label="⏰ Orario"  val={modal.time_slot} />
                <Row label="📍 Dove"    val={modal.place_name} />
                <Row label="✉️ Contatto" val={modal.contact} />
              </>}
            </div>

            <div style={{ display:'flex', gap:'0.7rem' }}>
              <button style={{ flex:1, padding:'0.65rem', borderRadius:50, border:'none', background:'linear-gradient(135deg,#3BBFEF,#5DD9B0)', color:'white', fontFamily:'Nunito,sans-serif', fontWeight:800, fontSize:'0.82rem', cursor:'pointer' }}>
                <button onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(modal.name + ' ' + modal.address)}`, '_blank')} style={{
  flex:1, padding:'0.65rem', borderRadius:50, border:'none',
  background:'linear-gradient(135deg,#3BBFEF,#5DD9B0)', color:'white',
  fontFamily:'Nunito,sans-serif', fontWeight:800, fontSize:'0.82rem', cursor:'pointer'
}}>
  🗺️ Apri in Maps
</button>
              </button>
              <button onClick={() => setModal(null)} style={{ flex:1, padding:'0.65rem', borderRadius:50, border:'1.5px solid rgba(59,191,239,.18)', background:'#F0F9FF', color:'#6B8EA0', fontFamily:'Nunito,sans-serif', fontWeight:800, fontSize:'0.82rem', cursor:'pointer' }}>
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, val }) {
  if (!val) return null
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:'0.6rem', fontSize:'0.82rem' }}>
      <span style={{ color:'#9BB8C8', minWidth:70, fontSize:'0.73rem', fontWeight:700 }}>{label}</span>
      <span style={{ color:'#2E4855', fontWeight:600 }}>{val}</span>
    </div>
  )
}