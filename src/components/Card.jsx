export default function Card({ item, onContact }) {
  const isMaps = item.source === 'maps'

  return (
    <div onClick={() => onContact(item)} style={{
      background:'white',
      border:'1.5px solid rgba(59,191,239,0.18)',
      borderRadius:'28px',
      overflow:'hidden',
      cursor:'pointer',
      boxShadow:'0 2px 12px rgba(59,191,239,0.06)',
      transition:'all 0.22s',
      fontFamily:'Nunito Sans, sans-serif'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform='translateY(-4px)'
      e.currentTarget.style.boxShadow='0 10px 36px rgba(59,191,239,0.18)'
      e.currentTarget.style.borderColor='#7DD8F7'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform=''
      e.currentTarget.style.boxShadow='0 2px 12px rgba(59,191,239,0.06)'
      e.currentTarget.style.borderColor='rgba(59,191,239,0.18)'
    }}>

      {/* TOP */}
      <div style={{padding:'1rem 1rem 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span style={{
          background: isMaps ? '#E3F6FD' : '#E0FAF2',
          color: isMaps ? '#3BBFEF' : '#1A9E8F',
          border: `1px solid ${isMaps ? 'rgba(59,191,239,0.3)' : 'rgba(93,217,176,0.3)'}`,
          fontSize:'0.65rem', fontWeight:800,
          letterSpacing:'0.08em', textTransform:'uppercase',
          padding:'0.22rem 0.6rem', borderRadius:'50px',
          fontFamily:'Nunito, sans-serif'
        }}>
          {isMaps ? '📍 Maps' : '🌿 Community'}
        </span>
        {isMaps
          ? <span style={{fontSize:'0.75rem', color:'#F9C846'}}>★ {item.rating} <small style={{color:'#9BB8C8', fontSize:'0.67rem'}}>({item.reviews})</small></span>
          : <span style={{fontSize:'0.67rem', color:'#1A9E8F', fontWeight:700}}>✦ community</span>
        }
      </div>

      {/* BODY */}
      <div style={{padding:'0.9rem 1rem 1.1rem'}}>
        <div style={{
          width:46, height:46,
          background:'linear-gradient(135deg,#E3F6FD,#E0FAF2)',
          borderRadius:14, display:'flex', alignItems:'center',
          justifyContent:'center', fontSize:'1.4rem',
          marginBottom:'0.75rem',
          border:'1px solid rgba(59,191,239,0.15)'
        }}>{item.emoji || '📌'}</div>

        <h3 style={{
          fontFamily:'Nunito,sans-serif', fontSize:'0.96rem',
          fontWeight:800, color:'#1A2D35',
          marginBottom:'0.35rem', lineHeight:1.3
        }}>{item.name || item.title}</h3>

        <p style={{
          fontSize:'0.78rem', color:'#6B8EA0',
          lineHeight:1.55, marginBottom:'0.8rem',
          display:'-webkit-box', WebkitLineClamp:2,
          WebkitBoxOrient:'vertical', overflow:'hidden'
        }}>{item.description}</p>

        {/* CHIPS */}
        <div style={{display:'flex', gap:'0.35rem', flexWrap:'wrap', marginBottom:'0.9rem'}}>
          {isMaps ? <>
            <Chip icon="⏰" text={item.hours} />
            <Chip icon="📍" text={item.address?.split(',')[0]} />
          </> : <>
            <Chip icon="📅" text={item.days} />
            <Chip icon="⏰" text={item.time_slot} />
            <Chip icon="📍" text={item.place_name} />
          </>}
        </div>

        <button style={{
          width:'100%', background:'#F0F9FF',
          border:'1.5px solid rgba(59,191,239,0.18)',
          color:'#2E4855', padding:'0.55rem',
          borderRadius:'50px', fontFamily:'Nunito,sans-serif',
          fontSize:'0.79rem', fontWeight:700, cursor:'pointer'
        }}>
          {isMaps ? 'Vedi dettagli →' : 'Entra in contatto →'}
        </button>
      </div>
    </div>
  )
}

function Chip({ icon, text }) {
  if (!text) return null
  return (
    <span style={{
      fontSize:'0.67rem', color:'#2E4855',
      background:'#F0F9FF', padding:'0.18rem 0.55rem',
      borderRadius:'50px', fontWeight:600,
      display:'flex', alignItems:'center', gap:'0.2rem',
      border:'1px solid rgba(59,191,239,0.18)'
    }}>
      <span style={{color:'#3BBFEF'}}>{icon}</span>{text}
    </span>
  )
}