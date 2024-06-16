import convert from 'ansi-to-html';
const ansiToHtml = new convert();
export default function ({ content }: { content: string }) {
  content = content.replace(/(",)/g, '$1\n');
  return (
    <code
      dangerouslySetInnerHTML={{
        __html: content
          .split(/\\r\\n|\n/)
          .map((s) => ansiToHtml.toHtml(s))
          .join('<br/>'),
      }}
    />
  );
}
