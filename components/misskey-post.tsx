"use client";

import { useEffect, useRef } from "react";

interface MisskeyPostProps {
  url: string;
  height?: number;
}

interface MisskeyEmbedProps {
  src: string;
  embedId?: string;
  height?: number;
  maxWidth?: number;
  instanceUrl?: string;
}

/**
 * Misskeyの投稿を埋め込むコンポーネント（シンプル版）
 * フルURL、または埋め込みURLを渡して使用する
 * 例: <Misskey url="https://misskey.io/@user/notes/xxxxx" />
 * 例: <Misskey url="https://misskey.io/notes/xxxxx" />
 */
export function MisskeyPost({ url, height = 550 }: MisskeyPostProps) {
  // URLに /embed が含まれていない場合は追加
  const embedUrl = url.includes("/embed") ? url : `${url}/embed`;

  return (
    <div className="my-6 flex justify-center">
      <iframe
        src={embedUrl}
        width="100%"
        height={height}
        style={{
          maxWidth: "400px",
          border: "1px solid #e1e8ed",
          borderRadius: "12px",
        }}
        loading="lazy"
        title="Misskey post"
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
}

/**
 * Misskeyの埋め込みコードをそのまま使用するコンポーネント
 * Misskey側が生成した埋め込みコードのパラメータを渡して使用する
 *
 * 例:
 * <MisskeyEmbed
 *   src="https://post.yourein.net/embed/notes/al3iy6m0c7"
 *   embedId="v1_al5zvyjd6j"
 *   instanceUrl="https://post.yourein.net"
 *   height={300}
 *   maxWidth={500}
 * />
 */
export function MisskeyEmbed({
  src,
  embedId,
  height = 300,
  maxWidth = 500,
  instanceUrl,
}: MisskeyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Misskey埋め込みスクリプトが既に読み込まれているかチェック
    if (instanceUrl && !document.querySelector(`script[src="${instanceUrl}/embed.js"]`)) {
      const script = document.createElement("script");
      script.src = `${instanceUrl}/embed.js`;
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        // クリーンアップ: スクリプトを削除（オプション）
        // 通常は削除しない方が良い（他の埋め込みでも使用される可能性があるため）
      };
    }
  }, [instanceUrl]);

  return (
    <div className="my-6 flex justify-center" ref={containerRef}>
      <iframe
        src={src}
        data-misskey-embed-id={embedId}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          border: "none",
          width: "100%",
          maxWidth: `${maxWidth}px`,
          height: `${height}px`,
          colorScheme: "light dark",
        }}
        title="Misskey embed post"
      />
    </div>
  );
}
