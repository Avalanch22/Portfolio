'use client';

import { useRef, ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to exactly 95vw and 85vh using motion templates
  const widthVw = useTransform(
    scrollYProgress, 
    [0, 1], 
    [isMobileState ? 80 : 30, 95]
  );
  
  const heightVh = useTransform(
    scrollYProgress, 
    [0, 1], 
    [isMobileState ? 50 : 50, 85]
  );

  const mediaWidth = useMotionTemplate`${widthVw}vw`;
  const mediaHeight = useMotionTemplate`${heightVh}vh`;

  const textTranslateX = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, isMobileState ? 180 : 150]
  );

  const textTranslateXNegative = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, isMobileState ? -180 : -150]
  );

  const bgOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const innerOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 0.35]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <>
      <div
        ref={sectionRef}
        className='relative h-[175vh] w-full bg-[#0a0a0a]'
      >
        <div className='sticky top-0 h-[100dvh] w-full flex flex-col items-center overflow-hidden'>
        
        {/* Background Image */}
        {bgImageSrc && (
          <motion.div
            className='absolute inset-0 z-0 h-full w-full'
            style={{ opacity: bgOpacity }}
          >
            <Image
              src={bgImageSrc}
              alt='Background'
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>
        )}

        <div className='container mx-auto flex flex-col items-center justify-start relative z-10 w-full h-full'>
          <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
            
            {/* The Expanding Media Container */}
            <motion.div
              className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl'
              style={{
                width: mediaWidth,
                height: mediaHeight,
                boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
              }}
            >
              {mediaType === 'video' ? (
                mediaSrc.includes('youtube.com') ? (
                  <div className='relative w-full h-full pointer-events-none'>
                    <iframe
                      width='100%'
                      height='100%'
                      src={
                        mediaSrc.includes('embed')
                          ? mediaSrc +
                            (mediaSrc.includes('?') ? '&' : '?') +
                            'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                          : mediaSrc.replace('watch?v=', 'embed/') +
                            '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                            mediaSrc.split('v=')[1]
                      }
                      className='w-full h-full rounded-xl'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    />
                    <div className='absolute inset-0 z-10 pointer-events-none' />
                    <motion.div
                      className='absolute inset-0 bg-black/30 rounded-xl'
                      style={{ opacity: innerOpacity }}
                    />
                  </div>
                ) : (
                  <div className='relative w-full h-full pointer-events-none'>
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload='auto'
                      className='w-full h-full object-cover rounded-xl'
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <div className='absolute inset-0 z-10 pointer-events-none' />
                    <motion.div
                      className='absolute inset-0 bg-black/30 rounded-xl'
                      style={{ opacity: innerOpacity }}
                    />
                  </div>
                )
              ) : (
                <div className='relative w-full h-full'>
                  <Image
                    src={mediaSrc}
                    alt={title || 'Media content'}
                    fill
                    className='object-cover rounded-xl'
                  />
                  <motion.div
                    className='absolute inset-0 bg-black/50 rounded-xl'
                    style={{ opacity: innerOpacity }}
                  />
                </div>
              )}

              {/* Subtitle / Date sliding out from beneath the image */}
              <div className='absolute -bottom-16 w-full flex flex-col items-center text-center'>
                {date && (
                  <motion.p
                    className='text-2xl text-blue-200'
                    style={{ x: textTranslateXNegative }}
                  >
                    {date}
                  </motion.p>
                )}
                {scrollToExpand && (
                  <motion.p
                    className='text-blue-200 font-medium text-center'
                    style={{ x: textTranslateX }}
                  >
                    {scrollToExpand}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* Main Title blending OVER the media */}
            <div
              className={`flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col ${
                textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
              }`}
            >
              <motion.h2
                className='text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200'
                style={{ x: textTranslateXNegative }}
              >
                {firstWord}
              </motion.h2>
              <motion.h2
                className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-blue-200'
                style={{ x: textTranslateX }}
              >
                {restOfTitle}
              </motion.h2>
            </div>
            
          </div>
        </div>
      </div>
      </div>

      {/* Children content (appears natively when you scroll past the expansion animation) */}
      <div className='relative z-20 w-full bg-[#0a0a0a] pb-24 pt-8'>
        {children}
      </div>
    </>
  );
}
