"use client";

interface Mixi2PostProps {
  url: string;
  height?: number;
}

/**
 * mixi2の投稿を埋め込むコンポーネント
 * フルURLを渡して使用する
 * 例: <Mixi2 url="https://mixi.social/@user/posts/xxx" />
 */
export function Mixi2Post({ url, height = 500 }: Mixi2PostProps) {
  return (
    <div className="my-6 flex justify-center">
      <iframe
        src={url}
        width="100%"
        height={height}
        style={{
          maxWidth: "550px",
          border: "1px solid #e1e8ed",
          borderRadius: "12px",
        }}
        loading="lazy"
        title="mixi2 post"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
