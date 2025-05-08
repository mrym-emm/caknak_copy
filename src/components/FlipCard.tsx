import React from 'react';
import type { ReactNode } from 'react';

interface FlipCardProps {
  frontContent: ReactNode;
  backContent: ReactNode;
  width?: string;
  height?: string;
}

export default function FlipCard({ frontContent, backContent, width = 'w-24', height = 'h-24' }: FlipCardProps) {
  return (
    <>
      <div className={`flip-card ${width} ${height}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            {frontContent}
          </div>
          <div className="flip-card-back">
            {backContent}
          </div>
        </div>
      </div>

      <style jsx>{`
        .flip-card {
          perspective: 1000px;
          cursor: pointer;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </>
  );
}
