'use client';

/* eslint-disable @next/next/no-img-element */
import { MouseEvent, WheelEvent, useCallback, useEffect, useRef, useState } from 'react';
import styles from '@/styles/SuccessStories.module.css';

interface Story {
  id: number;
  name: string;
  image: string;
  shortWriteup: string;
  fullWriteup: string;
  shape: string;
}

const stories: Story[] = [
  {
    id: 1,
    name: "Dabota's Proof",
    image: '/images/dabotaa.png',
    shortWriteup: 'Transforming beauty products into trusted brands.',
    fullWriteup:
      'The P.R. Lab tested and certified my beauty products, adding credibility, premium value, and the proof my brand needed to earn customer confidence.',
    shape: 'story-shape-orb',
  },
  {
    id: 2,
    name: "Amara's Glow",
    image: '/images/amara d.png',
    shortWriteup: 'A damaged barrier became calm, balanced, and easy to maintain.',
    fullWriteup:
      "Tomi arrived with reactive skin that made every product feel like a risk. The P.R. Lab stripped the routine back, rebuilt the barrier, and introduced treatment only when her skin was ready. Within weeks, redness reduced, comfort returned, and her routine finally felt steady instead of stressful.",
    shape: 'story-shape-pebble',
  },
  {
    id: 3,
    name: "Clarisse Ndayishimiye",
    image: '/images/ptncoffee.png',
    shortWriteup: "A trusted coffee partner serving exceptional Burundian coffee to The P.R. Lab's clients every day.",
    fullWriteup:
      'Clarisse\'s specialty coffee stands out. Today, our carefully sourced Burundian coffee is served to clients and guests visiting The P.R. Lab, creating a warm and memorable experience that reflects excellence, authenticity, and premium African craftsmanship.',
    shape: 'story-shape-pebble',
  },
  {
    id: 4,
    name: "Sandrine Irakoze",
    image: '/images/sandrine_beauty.png',
    shortWriteup:
      "A beauty founder whose products gained greater credibility through partnership with The P.R. Lab.",
    fullWriteup:
      "Sandrine needed   a partner that believed in building African beauty brands. Working with The P.R. Lab gave her access to a professional environment where science, quality, and brand excellence come together. From the welcoming atmosphere to the rigorous standards.",
    shape: "story-shape-arch",
  },
  {
    id: 5,
    name: "ZNiyonkuru Amina",
    image: '/images/success3.png',
    shortWriteup: 'Founder, Divine\'s Glow Bujumbura, Burundi...',
    fullWriteup:
      "The P.R. Lab tested and certified my beauty products, giving my brand the credibility, premium value, and proof needed to earn customer trust home and abroad.",
    shape: 'story-shape-orb',
  },
];

const loopedStories = [...stories, ...stories, ...stories, ...stories];

type MouseDragState = {
  active: boolean;
  hasDragged: boolean;
  scrollLeft: number;
  startX: number;
};

const SuccessStories = () => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const isReadyRef = useRef(false);
  const expandedKeyRef = useRef<string | null>(null);
  const isPausedRef = useRef(false);
  const mouseDragRef = useRef<MouseDragState>({
    active: false,
    hasDragged: false,
    scrollLeft: 0,
    startX: 0,
  });

  const getLoopWidth = useCallback(() => {
    const rail = railRef.current;

    return rail ? rail.scrollWidth / 3 : 0;
  }, []);

  const normalizeScrollPosition = useCallback(() => {
    const rail = railRef.current;
    const loopWidth = getLoopWidth();

    if (!rail || !loopWidth) {
      return;
    }

    if (rail.scrollLeft >= loopWidth * 2) {
      rail.scrollLeft -= loopWidth;
    } else if (rail.scrollLeft <= 0) {
      rail.scrollLeft += loopWidth;
    }
  }, [getLoopWidth]);

  const centerRail = useCallback(() => {
    const rail = railRef.current;
    const loopWidth = getLoopWidth();

    if (!rail || !loopWidth) {
      return false;
    }

    if (!isReadyRef.current || rail.scrollLeft <= 0) {
      rail.scrollLeft = loopWidth;
      isReadyRef.current = true;
    }

    return true;
  }, [getLoopWidth]);

  const setPausedState = (value: boolean) => {
    isPausedRef.current = value;
    setIsPaused(value);
  };

  const setExpandedState = (value: string | null) => {
    expandedKeyRef.current = value;
    setExpandedKey(value);
  };

  useEffect(() => {
    let retryId = 0;

    const prepareRail = () => {
      if (isReadyRef.current) {
        return;
      }

      if (!centerRail()) {
        retryId = window.setTimeout(prepareRail, 80);
      }
    };

    prepareRail();

    return () => window.clearTimeout(retryId);
  }, [centerRail]);

  useEffect(() => {
    let frameId = 0;

    const animate = () => {
      const rail = railRef.current;

      if (rail && !isPausedRef.current && expandedKeyRef.current === null) {
        centerRail();
        rail.scrollLeft += 0.85;
        normalizeScrollPosition();
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [centerRail, normalizeScrollPosition]);

  const toggleStory = (storyKey: string, isExpanded: boolean) => {
    if (mouseDragRef.current.hasDragged) {
      window.setTimeout(() => {
        mouseDragRef.current.hasDragged = false;
      }, 0);
      return;
    }

    setExpandedState(isExpanded ? null : storyKey);
    setPausedState(!isExpanded);
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const rail = railRef.current;

    if (!rail || event.button !== 0) {
      return;
    }

    mouseDragRef.current = {
      active: true,
      hasDragged: false,
      scrollLeft: rail.scrollLeft,
      startX: event.clientX,
    };
    setPausedState(true);
    setIsDragging(true);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rail = railRef.current;

    if (!rail || !mouseDragRef.current.active) {
      return;
    }

    const deltaX = event.clientX - mouseDragRef.current.startX;

    if (Math.abs(deltaX) < 6) {
      return;
    }

    event.preventDefault();
    mouseDragRef.current.hasDragged = true;

    if (expandedKeyRef.current !== null) {
      setExpandedState(null);
    }

    rail.scrollLeft = mouseDragRef.current.scrollLeft - deltaX;
    normalizeScrollPosition();
  };

  const endMouseDrag = () => {
    if (!mouseDragRef.current.active) {
      return;
    }

    mouseDragRef.current.active = false;
    setIsDragging(false);
    setPausedState(expandedKeyRef.current !== null);
    normalizeScrollPosition();
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const desktopWheelScroll = Math.abs(event.deltaY) > 0 && window.innerWidth >= 768;

    if (!horizontalIntent && !desktopWheelScroll) {
      return;
    }

    event.preventDefault();

    if (expandedKeyRef.current !== null) {
      setExpandedState(null);
    }

    rail.scrollLeft += horizontalIntent ? event.deltaX : event.deltaY;
    normalizeScrollPosition();
  };

  return (
    <section id="success-stories" className={styles.section}>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 max-w-2xl md:mb-12">
          <p className="mb-4 font-body text-[0.65rem] uppercase tracking-[0.32em] text-pr-grey/60">
            Success Stories
          </p>
          <h2 className="font-editorial text-3xl leading-tight text-pr-dark md:text-5xl">
            Real journeys, told in soft little thoughts.
          </h2>
        </div>
      </div>

      <div
        ref={railRef}
        className={`${styles.rail} ${isDragging ? styles.dragging : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endMouseDrag}
        onMouseLeave={endMouseDrag}
        onTouchStart={() => {
          setPausedState(true);
          if (expandedKeyRef.current !== null) {
            setExpandedState(null);
          }
        }}
        onTouchEnd={() => expandedKeyRef.current === null && setPausedState(false)}
        onWheel={handleWheel}
        onScroll={normalizeScrollPosition}
      >
        <div className={styles.track}>
          {loopedStories.map((story, index) => {
            const storyKey = `${story.id}-${index}`;
            const isExpanded = expandedKey === storyKey;
            const bubbleText = isExpanded ? story.fullWriteup : story.shortWriteup;

            return (
              <article
                key={`${story.id}-${index}`}
                className={`${styles.item} ${isExpanded ? styles.expandedItem : ''}`}
              >
                <button
                  type="button"
                  className={`${styles.imageButton} ${styles[story.shape]}`}
                  onClick={() => toggleStory(storyKey, isExpanded)}
                  // aria-expanded={isExpanded === true}
                  aria-label={`${isExpanded ? 'Collapse' : 'Read'} ${story.name}`}
                >
                  <img
                    src={story.image}
                    alt={story.name}
                    className={styles.storyImage}
                    draggable="false"
                  />
                  <div className={styles.imageOverlay} />
                </button>

                <button
                  type="button"
                  className={styles.thoughtBubble}
                  onClick={() => toggleStory(storyKey, isExpanded)}
                  // aria-expanded={!!isExpanded}
                >
                  <span className="mb-2 block font-body text-[0.62rem] uppercase tracking-[0.24em] text-pr-grey/65">
                    {story.name}
                  </span>
                  <span className="block max-h-[12.5rem] overflow-y-auto pr-1 font-editorial text-[0.98rem] leading-snug text-pr-dark md:text-[1.04rem]">
                    {bubbleText}
                  </span>
                  <span className="mt-3 block font-body text-[0.62rem] uppercase tracking-[0.22em] text-pr-grey/55">
                    {isExpanded ? 'Tap to close' : 'Tap to read'}
                  </span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
