'use client';
import { useEffect, useRef, useState } from 'react';

interface GlobeProps {
  className?: string;
}

const Globe: React.FC<GlobeProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let width = 0;
    let phi = 0;
    let globe: { destroy: () => void } | null = null;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener('resize', onResize);
    onResize();

    import('cobe').then(({ default: createGlobe }) => {
      if (!canvasRef.current) return;

      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.25,
        dark: 1,
        scale: 1.1,
        diffuse: 1.2,
        mapSamples: 40000,
        mapBrightness: 6,
        baseColor: [0.4, 0.6509, 1],
        markerColor: [1, 0, 0],
        glowColor: [0.2745, 0.5765, 0.898],
        offset: [0, 0],
        markers: [],
        onRender: (state: Record<string, unknown>) => {
          state.phi = phi;
          phi += 0.003;
        },
      });

      setOpacity(1);
    });

    return () => {
      globe?.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={`flex items-center justify-center z-10 w-full max-w-[350px] mx-auto ${className}`}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          aspectRatio: '1',
          opacity,
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  );
};

export default Globe;