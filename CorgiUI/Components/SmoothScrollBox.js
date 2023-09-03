import { useState, useEffect, useRef } from 'react';

const ScrollableComponent = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = (event) => {
      // Check if the scroll event occurred within the scroll container
      if (event.target === scrollContainer) {
        // Handle your custom scroll behavior here
      }
    };

    if (scrollContainer) {
      setIsScrollable(true);
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        width: '300px',
        height: '300px',
        border: '1px solid black',
        overflow: 'scroll',
      }}
    >
      {isScrollable ? (
        <div style={{ height: '600px' }}>
          {/* Content that can be scrolled */}
        </div>
      ) : (
        <p>This component is not scrollable.</p>
      )}
    </div>
  );
};