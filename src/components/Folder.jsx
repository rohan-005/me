import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return (
    '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const Folder = ({ color = '#5227FF', size = 1, className = '' }) => {
  const maxItems = 3;
  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );
  const navigate = useNavigate();
  const location = useLocation();

  const folderBackColor = darkenColor(color, 0.08);

  const paperImages = ['/projects/2.png', '/projects/3.png', '/projects/1.png'];

  const handleClick = () => {
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (index) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const handleImageClick = () => {
    // 🧭 Navigate based on current route
    if (location.pathname === '/gamedev') {
      navigate('/projectsgame');
    } else {
      navigate('/projectsfull');
    }
  };

  const scaleStyle = { transform: `scale(${size})` };

  const getOpenTransform = index => {
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)';
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
    return '';
  };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={`group relative transition-all duration-200 ease-in cursor-pointer ${
          !open ? 'hover:-translate-y-2' : ''
        }`}
        style={{
          transform: open ? 'translateY(-8px)' : undefined
        }}
        onClick={handleClick}
      >
        <div
          className="relative w-[100px] h-20 rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-2.5 rounded-tl-[5px] rounded-tr-[5px]"
            style={{ backgroundColor: folderBackColor }}
          ></span>

          {/* 🧾 Papers replaced with clickable images */}
          {paperImages.map((src, i) => {
            let sizeClasses = '';
            if (i === 0) sizeClasses = 'w-[70%] h-[80%]';
            if (i === 1) sizeClasses = 'w-[80%] h-[80%]';
            if (i === 2) sizeClasses = 'w-[90%] h-[80%]';

            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : undefined;

            return (
              <img
                key={i}
                src={src}
                alt={`Project ${i + 1}`}
                onClick={handleImageClick}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={() => handlePaperMouseLeave(i)}
                className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out rounded-lg object-cover ${
                  !open
                    ? 'transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0'
                    : 'hover:scale-110'
                } ${sizeClasses}`}
                style={{
                  ...(!open ? {} : { transform: transformStyle }),
                  cursor: 'pointer'
                }}
              />
            );
          })}

          {/* Folder cover layers */}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:transform-[skew(15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              ...(open && { transform: 'skew(15deg) scaleY(0.6)' })
            }}
          ></div>
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:transform-[skew(-15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              ...(open && { transform: 'skew(-15deg) scaleY(0.6)' })
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
