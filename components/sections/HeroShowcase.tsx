'use client'

import Image from 'next/image'

// Authentic ACE product photography with GSAP floating motion in HeroHome.
type Device = {
  src: string
  alt: string
  w: number
  h: number
  left: number
  top: number
  width: number
  priority?: boolean
}

const DEVICES: Device[] = [
  { src: '/hero/hp-elitebook-1030-g2.jpg', alt: 'HP EliteBook x360 1030 G2 convertible laptop', w: 519, h: 351, left: 63.6, top: 4.9, width: 30.9 },
  { src: '/hero/hp-elitebook-830-g7.jpg', alt: 'HP EliteBook 830 G7 laptop', w: 697, h: 596, left: 5.5, top: 31.7, width: 56.4, priority: true },
  { src: '/hero/google-pixel-9.jpg', alt: 'Google Pixel 9 smartphone, front and back', w: 549, h: 849, left: 70.5, top: 43.9, width: 19.5 },
]

const SHADOWS = [
  { left: 63, top: 33, width: 32, height: 3 },
  { left: 10, top: 90, width: 52, height: 5 },
  { left: 70, top: 92, width: 19, height: 3 },
]

export default function HeroShowcase() {
  return (
    <div
      className="relative w-full max-w-[640px] mx-auto lg:max-w-none"
      style={{ aspectRatio: '1100 / 820' }}
      role="group"
      aria-label="Laptops and smartphones available at ACE Electronics"
    >
      <div aria-hidden="true" className="absolute inset-[6%] rounded-full bg-white/70 blur-3xl pointer-events-none" />

      {SHADOWS.map((shadow, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="hero-shadow hero-anim absolute rounded-[50%] pointer-events-none"
          style={{
            left: `${shadow.left}%`,
            top: `${shadow.top}%`,
            width: `${shadow.width}%`,
            height: `${shadow.height}%`,
            background: 'radial-gradient(closest-side, rgba(20,30,50,0.22), rgba(20,30,50,0))',
          }}
        />
      ))}

      {DEVICES.map((device) => (
        <div
          key={device.src}
          className="absolute"
          style={{ left: `${device.left}%`, top: `${device.top}%`, width: `${device.width}%` }}
        >
          <Image
            src={device.src}
            alt={device.alt}
            width={device.w}
            height={device.h}
            priority={device.priority}
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="hero-device hero-anim block w-full h-auto select-none will-change-transform"
            style={{ mixBlendMode: 'multiply' }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}
