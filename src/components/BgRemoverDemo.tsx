import { useCallback, useRef, useState } from "react";
import { Upload, Download, Loader2, ImageIcon, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadImageFromFile, removeBackground } from "@/lib/bg-remover";

export function BgRemoverDemo() {
  const [original, setOriginal] = useState<string | null>(null);
  const [processed, setProcessed] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setError(null);
    setProcessed(null);
    setBusy(true);
    try {
      const img = await loadImageFromFile(file);
      setOriginal(img.src);
      const result = await removeBackground(img, setStatus);
      setProcessed(result);
      setStatus("");
    } catch (e) {
      console.error(e);
      setError("Something went wrong. Try a different image.");
    } finally {
      setBusy(false);
    }
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const reset = () => {
    setOriginal(null);
    setProcessed(null);
    setError(null);
    setStatus("");
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      {!original ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="cursor-pointer rounded-2xl border-2 border-dashed border-white/15 bg-white/5 px-8 py-16 text-center transition hover:border-white/30 hover:bg-white/10"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient shadow-lg shadow-purple-500/30">
            <Upload className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold">Drop an image to remove its background</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            PNG, JPG or WEBP — processed instantly in your browser
          </p>
          <Button className="mt-6 bg-brand-gradient text-white hover:opacity-90 border-0">
            <ImageIcon className="mr-2 h-4 w-4" />
            Choose image
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Panel title="Original">
              <img src={original} alt="Original" className="h-full w-full object-contain" />
            </Panel>
            <Panel title="Background removed" checker>
              {processed ? (
                <img src={processed} alt="Result" className="h-full w-full object-contain" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                  <p className="text-sm">{status || "Processing…"}</p>
                </div>
              )}
            </Panel>
          </div>

          {error && (
            <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button variant="ghost" onClick={reset} disabled={busy}>
              <X className="mr-2 h-4 w-4" /> Try another
            </Button>
            {processed && (
              <a href={processed} download="bgcut-ai-transparent.png">
                <Button className="bg-brand-gradient text-white hover:opacity-90 border-0">
                  <Download className="mr-2 h-4 w-4" />
                  Download PNG
                </Button>
              </a>
            )}
          </div>
        </div>
      )}

      <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <Sparkles className="h-3 w-3 text-purple-400" />
        Runs locally with on-device AI — your images never leave your browser.
      </p>
    </div>
  );
}

function Panel({
  title,
  children,
  checker = false,
}: {
  title: string;
  children: React.ReactNode;
  checker?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
      <div className="border-b border-white/10 px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <div className={`relative aspect-square ${checker ? "checker" : "bg-black/30"}`}>
        {children}
      </div>
    </div>
  );
}
