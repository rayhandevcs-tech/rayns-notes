

export async function POST(request) {
  try {
    const { text } = await request.json();
    if (!text) return Response.json({ error: "text required" }, { status: 400 });

    const token = process.env.HF_TOKEN; // server-side — no NEXT_PUBLIC_ prefix
    if (!token) return Response.json({ error: "HF_TOKEN not set in .env.local" }, { status: 500 });

    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/facebook/mms-tts-ben",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (hfRes.status === 503) {
      return Response.json({ error: "model_loading" }, { status: 503 });
    }

    if (!hfRes.ok) {
      const err = await hfRes.json().catch(() => ({}));
      return Response.json({ error: err?.error || `HF error ${hfRes.status}` }, { status: hfRes.status });
    }

    const audioBuffer = await hfRes.arrayBuffer();
    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/wav",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
