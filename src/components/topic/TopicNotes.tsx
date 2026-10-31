'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Loader2 } from 'lucide-react';

import { createClient } from '@/lib/supabase/client';

interface TopicNotesProps {
  topicId: string;
}

export function TopicNotes({
  topicId,
}: TopicNotesProps) {
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [signedIn, setSignedIn] =
    useState(false);

  const [content, setContent] =
    useState('');

  const [message, setMessage] =
    useState('');

  useEffect(() => {
    async function loadNote() {
      const supabase =
        createClient();

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setSignedIn(true);

      const { data } =
        await supabase
          .from('notes')
          .select('content')
          .eq('user_id', user.id)
          .eq('topic_id', topicId)
          .maybeSingle();

      if (data) {
        setContent(
          data.content
        );
      }

      setLoading(false);
    }

    loadNote();
  }, [topicId]);

  async function saveNote() {
    setSaving(true);

    setMessage('');

    try {
      const supabase =
        createClient();

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { error } =
        await supabase
          .from('notes')
          .upsert({
            user_id: user.id,
            topic_id: topicId,
            content,
            updated_at:
              new Date().toISOString(),
          });

      if (!error) {
        setMessage(
          'Saved successfully.'
        );
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section
        className="
          mb-16
          rounded-2xl
          border
          border-border
          p-8
        "
      >
        <Loader2 className="h-5 w-5 animate-spin" />
      </section>
    );
  }

  if (!signedIn) {
    return (
      <section
        className="
          mb-16
          rounded-2xl
          border
          border-border
          p-8
        "
      >
        <h2 className="text-3xl font-bold">
          My Notes
        </h2>

        <p
          className="
            mt-4
            text-text-secondary
          "
        >
          Sign in to create personal
          notes for this topic.
        </p>

        <Link
          href="/signin"
          className="
            mt-6
            inline-flex
            font-medium
            text-accent
          "
        >
          Sign In →
        </Link>
      </section>
    );
  }

  return (
    <section
      className="
        mb-16
        rounded-2xl
        border
        border-border
        bg-bg-secondary/30
        p-8
      "
    >
      <h2 className="text-3xl font-bold">
        My Notes
      </h2>

      <p
        className="
          mt-3
          text-text-secondary
        "
      >
        Personal notes for this topic.
      </p>

      <textarea
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value
          )
        }
        rows={10}
        className="
          mt-6
          w-full
          rounded-xl
          border
          border-border
          bg-bg-card
          p-4
        "
        placeholder="Write your notes here..."
      />

      <div
        className="
          mt-4
          flex
          items-center
          gap-4
        "
      >
        <button
          onClick={saveNote}
          disabled={saving}
          className="
            rounded-xl
            bg-accent
            px-6
            py-3
            text-white
          "
        >
          {saving
            ? 'Saving...'
            : 'Save Note'}
        </button>

        {message && (
          <span
            className="
              text-sm
              text-text-secondary
            "
          >
            {message}
          </span>
        )}
      </div>
    </section>
  );
}