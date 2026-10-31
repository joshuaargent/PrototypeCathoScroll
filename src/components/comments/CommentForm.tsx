'use client';

import { useState } from 'react';

interface CommentFormProps {
  initialValue?: string;

  submitLabel?: string;

  onSubmit: (content: string) => Promise<void>;

  onCancel?: () => void;
}

export function CommentForm({
  initialValue = '',
  submitLabel = 'Post Comment',
  onSubmit,
  onCancel,
}: CommentFormProps) {
  const [content, setContent] = useState(initialValue);

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    const trimmed = content.trim();

    if (!trimmed) {
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit(trimmed);

      setContent('');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="border-border rounded-2xl border p-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={2000}
        rows={5}
        autoFocus={!!onCancel}
        placeholder="Add your thoughts..."
        className="border-border bg-background w-full resize-none rounded-xl border p-4 outline-none"
      />

      <div className="text-text-muted mt-2 text-right text-xs">{content.length}/2000</div>

      <div className="mt-4 flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border-border rounded-xl border px-4 py-2"
          >
            Cancel
          </button>
        )}

        <button
          type="button"
          disabled={submitting || !content.trim()}
          onClick={handleSubmit}
          className="bg-accent rounded-xl px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
