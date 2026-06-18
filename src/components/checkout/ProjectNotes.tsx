'use client';

interface ProjectNotesProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectNotes({ value, onChange }: ProjectNotesProps) {
  return (
    <section className="flex flex-col gap-2">
      <label
        htmlFor="project-notes"
        className="text-xs font-semibold tracking-wider uppercase text-ink/80"
      >
        Project Name / Notes:
      </label>
      <textarea
        id="project-notes"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="sketch-border w-full resize-none bg-transparent p-2 font-sketch text-base leading-8 outline-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(transparent, transparent 31px, rgba(26,26,26,0.2) 31px, rgba(26,26,26,0.2) 32px)',
        }}
      />
    </section>
  );
}
