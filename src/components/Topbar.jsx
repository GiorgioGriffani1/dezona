export default function Topbar({ page, setPage }) {
  return (
    <nav style={{
      position:'sticky', top:0, zIndex:300,
      background:'rgba(255,255,255,0.92)',
      backdropFilter:'blur(20px)',
      borderBottom:'1.5px solid rgba(59,191,239,0.18)',
      height:'64px', display:'flex', alignItems:'center',
      padding:'0 1.8rem', gap:'1.2rem',
      fontFamily:'Nunito, sans-serif'
    }}>
      <div style={{
        fontWeight:900, fontSize:'1.55rem',
        letterSpacing:'-0.04em',
        background:'linear-gradient(135deg,#3BBFEF,#5DD9B0)',
        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
      }}>Dezona</div>

      <div style={{
        background:'#E3F6FD', border:'1.5px solid rgba(59,191,239,0.3)',
        color:'#3BBFEF', fontSize:'0.72rem', fontWeight:700,
        letterSpacing:'0.06em', textTransform:'uppercase',
        padding:'0.28rem 0.85rem', borderRadius:'50px'
      }}>📍 Casalpalocco</div>

      <div style={{flex:1}} />

      <div style={{display:'flex', gap:'0.3rem'}}>
        <button onClick={() => setPage('discover')} style={{
          background: page==='discover' ? '#E3F6FD' : 'none',
          color: page==='discover' ? '#3BBFEF' : '#6B8EA0',
          border:'none', fontFamily:'Nunito,sans-serif',
          fontSize:'0.85rem', fontWeight:700,
          padding:'0.45rem 1rem', borderRadius:'50px', cursor:'pointer'
        }}>🏘️ Scopri</button>

        <button onClick={() => setPage('add')} style={{
          background: page==='add' ? '#E3F6FD' : 'none',
          color: page==='add' ? '#3BBFEF' : '#6B8EA0',
          border:'none', fontFamily:'Nunito,sans-serif',
          fontSize:'0.85rem', fontWeight:700,
          padding:'0.45rem 1rem', borderRadius:'50px', cursor:'pointer'
        }}>✨ Inserisci</button>
      </div>

      <button onClick={() => setPage('add')} style={{
        background:'linear-gradient(135deg,#3BBFEF,#5DD9B0)',
        color:'white', border:'none',
        fontFamily:'Nunito,sans-serif', fontSize:'0.85rem', fontWeight:800,
        padding:'0.5rem 1.2rem', borderRadius:'50px', cursor:'pointer',
        boxShadow:'0 4px 14px rgba(59,191,239,0.3)'
      }}>+ Aggiungi</button>
    </nav>
  )
}