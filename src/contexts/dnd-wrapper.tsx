'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export function DndWrapper({ children }: { children: React.ReactNode }) {
  const backend = isTouchDevice() ? TouchBackend : HTML5Backend;

  return (
    <DndProvider
      backend={backend}
      options={{
        enableMouseEvents: true,
        delayTouchStart: 180,
        delayTouchStartTouchOnly: true,
        touchSlop: 10,
        ignoreContextMenu: true,
      }}
    >
      {children}
    </DndProvider>
  );
}
