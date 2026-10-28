interface SwipeHintProps {
  isLastSlide: boolean;
}

export function SwipeHint({ isLastSlide }: SwipeHintProps) {
  return (
    <div className="text-text-muted mt-4 text-center text-sm">
      {isLastSlide ? 'Swipe left for the next topic' : 'Swipe left to continue'}
    </div>
  );
}
