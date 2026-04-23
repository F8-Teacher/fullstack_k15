"use client";

import { useState } from "react";
function getVideoId(url) {
  var code = url.match(/v=([^&#]{5,})/);
  return typeof code[1] == "string" ? code[1] : false;
}
const backendContent = `
<h2>Hello anh em</h2>
<p>Học <b style="color: red">lập trình</b> <i>không khó</i></p>
<ul>
<li>Bước 1</li>
<li>Bước 2</li>
<li>Bước 3</li>
</ul>
`;
export default function Youtube() {
  const [videoId, setVideoId] = useState("");
  const [url, setUrl] = useState("");
  return (
    <>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: backendContent }}
      />
      <input
        type="text"
        className="px-3 py-1 outline-0 border border-[#ccc] w-full"
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="px-3 py-1 bg-green-600"
        onClick={() => {
          if (!url) {
            return;
          }
          const videoId = getVideoId(url);
          setVideoId(videoId);
        }}
      >
        Submit
      </button>
      <div id="player">
        {videoId && (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="mt-3 flex gap-3">
        <button className="px-3 py-1 bg-green-600">Play</button>
        <button className="px-3 py-1 bg-green-600">Stop</button>
      </div>
    </>
  );
}

//backend trả về html
