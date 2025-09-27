const Mascot = () => {
  return (
    <div className="mascot-container">
      <svg className="mascot" viewBox="0 0 200 200">
        {/* Cabeza */}
        <circle cx="100" cy="100" r="95" fill="#FFD700" stroke="#333" strokeWidth="2"/>
        
        {/* Ojos */}
        <ellipse cx="80" cy="80" rx="15" ry="20" fill="#FFFFFF"/>
        <ellipse cx="120" cy="80" rx="15" ry="20" fill="#FFFFFF"/>
        <circle cx="80" cy="80" r="8" fill="#333"/>
        <circle cx="120" cy="80" r="8" fill="#333"/>
        
        {/* Boca */}
        <path d="M60 130 Q100 160 140 130" stroke="#333" strokeWidth="4" fill="none"/>
        
        {/* Mejillas */}
        <circle cx="60" cy="110" r="10" fill="#FF8A80" opacity="0.6"/>
        <circle cx="140" cy="110" r="10" fill="#FF8A80" opacity="0.6"/>
      </svg>
    </div>
  );
};

export default Mascot;