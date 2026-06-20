/* Pure SVG charts — zero dependencies */

export function BarChart({ data=[], width=400, height=200, color='#2563EB', labelKey='label', valueKey='count' }) {
  if (!data.length) return null
  const max    = Math.max(...data.map(d=>d[valueKey]), 1)
  const PL=44, PB=34, PT=16
  const barW   = Math.floor((width-PL-10)/data.length)-6
  const chartH = height-PB-PT

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{maxHeight:height}}>
      {[0,0.25,0.5,0.75,1].map(f=>{
        const y=PT+chartH*(1-f)
        return (
          <g key={f}>
            <line x1={PL} y1={y} x2={width-8} y2={y} stroke="currentColor" strokeOpacity=".07" strokeWidth="1"/>
            <text x={PL-6} y={y+4} textAnchor="end" fontSize="9" fill="currentColor" opacity=".4">{Math.round(max*f)}</text>
          </g>
        )
      })}
      {data.map((d,i)=>{
        const h=Math.max(3,(d[valueKey]/max)*chartH)
        const x=PL+i*(barW+6), y=PT+chartH-h
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} rx="4" fill={color} opacity=".85"/>
            <text x={x+barW/2} y={height-5} textAnchor="middle" fontSize="9" fill="currentColor" opacity=".45">
              {String(d[labelKey]).slice(0,5)}
            </text>
            {d[valueKey]>0&&<text x={x+barW/2} y={y-4} textAnchor="middle" fontSize="9" fill="currentColor" opacity=".6" fontWeight="700">{d[valueKey]}</text>}
          </g>
        )
      })}
    </svg>
  )
}

export function LineChart({ data=[], width=400, height=160, color='#2563EB', labelKey='date', valueKey='count' }) {
  if (data.length<2) return null
  const max=Math.max(...data.map(d=>d[valueKey]),1)
  const PL=38, PB=26, PT=12
  const cW=width-PL-8, cH=height-PB-PT

  const pts=data.map((d,i)=>({
    x: PL+(i/(data.length-1))*cW,
    y: PT+(1-d[valueKey]/max)*cH,
    v: d[valueKey], l: d[labelKey],
  }))
  const path  = pts.map((p,i)=>`${i===0?'M':'L'}${p.x},${p.y}`).join(' ')
  const area  = `${path} L${pts[pts.length-1].x},${PT+cH} L${pts[0].x},${PT+cH} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{maxHeight:height}}>
      <defs>
        <linearGradient id={`lg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity=".2"/>
          <stop offset="100%" stopColor={color} stopOpacity=".02"/>
        </linearGradient>
      </defs>
      {[0,0.5,1].map(f=>{
        const y=PT+cH*(1-f)
        return (
          <g key={f}>
            <line x1={PL} y1={y} x2={width-8} y2={y} stroke="currentColor" strokeOpacity=".06" strokeWidth="1"/>
            <text x={PL-5} y={y+4} textAnchor="end" fontSize="9" fill="currentColor" opacity=".4">{Math.round(max*f)}</text>
          </g>
        )
      })}
      <path d={area} fill={`url(#lg-${color.replace('#','')})`}/>
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p,i)=>(
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill={color}/>
          <circle cx={p.x} cy={p.y} r="6" fill={color} opacity=".12"/>
          <text x={p.x} y={height-4} textAnchor="middle" fontSize="9" fill="currentColor" opacity=".4">{String(p.l).slice(0,3)}</text>
        </g>
      ))}
    </svg>
  )
}

export function DonutChart({ data=[], size=140 }) {
  const total = data.reduce((s,d)=>s+d.value,0)||1
  const r=50, cx=size/2, cy=size/2, strokeW=20
  let cum=-90

  function xy(angle,radius) {
    const rad=angle*Math.PI/180
    return { x:cx+radius*Math.cos(rad), y:cy+radius*Math.sin(rad) }
  }
  function arc(start,sweep) {
    const large=sweep>180?1:0
    const s=xy(start,r), e=xy(start+sweep-0.3,r)
    return `M${s.x},${s.y} A${r},${r} 0 ${large} 1 ${e.x},${e.y}`
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
      {data.map((d,i)=>{
        const sweep=(d.value/total)*360
        const p=arc(cum,sweep); cum+=sweep
        return <path key={i} d={p} fill="none" stroke={d.color} strokeWidth={strokeW} strokeLinecap="butt" opacity=".9"/>
      })}
      <text x={cx} y={cy-5} textAnchor="middle" fontSize="20" fontWeight="800" fill="currentColor">{total}</text>
      <text x={cx} y={cy+13} textAnchor="middle" fontSize="9"  fill="currentColor" opacity=".4">Total</text>
    </svg>
  )
}

export function ProgressBar({ value, max, color='#2563EB', label, showPct=true }) {
  const pct=Math.min(100,Math.round((value/Math.max(max,1))*100))
  return (
    <div>
      {(label||showPct)&&(
        <div className="flex justify-between text-xs mb-1.5">
          {label&&<span className="font-semibold text-gray-600 dark:text-gray-300">{label}</span>}
          {showPct&&<span className="text-gray-400 font-medium">{pct}%</span>}
        </div>
      )}
      <div className="h-2 bg-gray-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width:`${pct}%`, backgroundColor:color }}/>
      </div>
    </div>
  )
}
