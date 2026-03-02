"use client";

interface Mixi2PostProps {
  id: string;
  height?: number;
}

/**
 * mixi2の投稿を埋め込むコンポーネント
 * 公式の埋め込み方法を使用
 */
export function Mixi2Post({ id, height = 500 }: Mixi2PostProps) {
  return (
    <div className="my-6 flex justify-center">
      <iframe
        src={`https://mixi2.jp/embed/posts/${id}`}
        width="100%"
        height={height}
        style={{
          maxWidth: "550px",
          border: "1px solid #e1e8ed",
          borderRadius: "12px",
        }}
        loading="lazy"
        title={`mixi2 post ${id}`}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
