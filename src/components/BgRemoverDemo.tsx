import { useCallback, useEffect, useRef, useState } from "react";
import { Upload, Download, Loader2, ImageIcon, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadImageFromFile, removeBackground } from "@/lib/bg-remover";

type HistoryEntry = {
  id: string;
  original: string;
  processed: string;
  filename?: string;
  date: number;
};

const HISTORY_KEY = "bgcut-ai-history";

export function BgRemoverDemo() {
  const [original, setOriginal] = useState<string | null>(null);
  const [processed, setProcessed] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [tab, setTab] = useState<"editor" | "history">("editor");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (!savedHistory) return;

    try {
      const parsed = JSON.parse(savedHistory) as HistoryEntry[];
      if (parsed && parsed.length > 0) {
        setHistory(parsed);
        setOriginal(parsed[0].original);
        setProcessed(parsed[0].processed);
      }
    } catch {
      localStorage.removeItem(HISTORY_KEY);
    }
  }, []);

  const saveHistory = useCallback((entry: HistoryEntry) => {
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, 20);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setError(null);
    setProcessed(null);
    try {
      const reader = new FileReader();
      const originalDataUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      await loadImageFromFile(file);
      setOriginal(originalDataUrl);
      setUploadedFile(file);
    } catch (e) {
      console.error(e);
      setError("Something went wrong. Try a different image.");
    }
  }, []);

  const handleRemoveBackground = useCallback(async () => {
    if (!original) return;

    setBusy(true);
    setError(null);
    try {
      setStatus("Sending to webhook...");

      const sourceBuffer = uploadedFile
        ? await uploadedFile.arrayBuffer()
        : await fetch(original).then((res) => res.arrayBuffer());

      const contentType =
        uploadedFile?.type || original.match(/^data:(image\/[a-zA-Z0-9.+-]+);/)?.[1] || "image/png";

      const response = await fetch("https://betuser.app.n8n.cloud/webhook/remove-background", {
        method: "POST",
        headers: {
          "Content-Type": contentType,
        },
        body: sourceBuffer,
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.url) {
        throw new Error("No URL in webhook response");
      }

      const processedUrl = data.url;
      setStatus("Processing complete...");
      setProcessed(processedUrl);
      setStatus("");

      saveHistory({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        original,
        processed: processedUrl,
        filename: uploadedFile?.name,
        date: Date.now(),
      });
    } catch (e) {
      console.error(e);
      setError("Something went wrong. Try a different image.");
    } finally {
      setBusy(false);
    }
  }, [original, uploadedFile, saveHistory]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const reset = () => {
    setOriginal(null);
    setProcessed(null);
    setUploadedFile(null);
    setError(null);
    setStatus("");
  };

  const downloadImage = useCallback(async (url: string, filename = "bgcut-ai-transparent.png") => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (e) {
      console.error(e);
      setError("Unable to download image. Try again.");
    }
  }, []);

  const viewHistoryEntry = (entry: HistoryEntry) => {
    setOriginal(entry.original);
    setProcessed(entry.processed);
    setUploadedFile(null);
    setTab("editor");
    setError(null);
    setStatus("");
  };

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={tab === "editor" ? "secondary" : "ghost"}
            onClick={() => setTab("editor")}
          >
            Editor
          </Button>
          <Button
            variant={tab === "history" ? "secondary" : "ghost"}
            onClick={() => setTab("history")}
          >
            History {history.length > 0 ? `(${history.length})` : ""}
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {history.length > 0 ? "Saved locally in browser storage." : "History will appear here after first removal."}
        </div>
      </div>

      {tab === "history" ? (
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-6 py-10 text-center text-sm text-muted-foreground">
              No history yet. Remove a background to save it locally.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {history.map((entry) => (
                <div key={entry.id} className="overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <span>{entry.filename ?? "Uploaded image"}</span>
                    <span>{new Date(entry.date).toLocaleString()}</span>
                  </div>
                  <div className="grid gap-3 rounded-2xl bg-white/5 p-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Original</p>
                      <img src={entry.original} alt="Original history" className="h-32 w-full rounded-xl object-cover" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Result</p>
                      <img src={entry.processed} alt="Processed history" className="h-32 w-full rounded-xl object-cover" />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Button variant="ghost" onClick={() => viewHistoryEntry(entry)}>
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => downloadImage(entry.processed, entry.filename ? `bgcut-${entry.filename}` : "bgcut-result.png")}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : !original ? (
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
                  {busy && <Loader2 className="h-8 w-8 animate-spin text-purple-400" />}
                  {status && <p className="text-sm">{status}</p>}
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
            {!processed && !busy && (
              <Button 
                onClick={handleRemoveBackground}
                className="bg-brand-gradient text-white hover:opacity-90 border-0"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Remove Background
              </Button>
            )}
            {processed && (
              <Button
                onClick={() => downloadImage(processed, uploadedFile?.name ? `bgcut-${uploadedFile.name}` : "bgcut-ai-transparent.png")}
                className="bg-brand-gradient text-white hover:opacity-90 border-0"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PNG
              </Button>
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
