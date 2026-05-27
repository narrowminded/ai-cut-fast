import { pipeline, env, RawImage } from "@huggingface/transformers";

env.allowLocalModels = false;
env.useBrowserCache = true;

let segmenterPromise: Promise<any> | null = null;

async function getSegmenter() {
  if (!segmenterPromise) {
    segmenterPromise = (pipeline as any)("background-removal", "briaai/RMBG-1.4", {
      device: "webgpu",
    }).catch(() => (pipeline as any)("background-removal", "briaai/RMBG-1.4"));
  }
  return segmenterPromise;
}

export async function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export async function removeBackground(
  imageElement: HTMLImageElement,
  onProgress?: (msg: string) => void
): Promise<string> {
  onProgress?.("Loading AI model…");
  const segmenter = await getSegmenter();

  const MAX = 1024;
  const scale = Math.min(
    1,
    MAX / Math.max(imageElement.naturalWidth, imageElement.naturalHeight)
  );
  const w = Math.max(1, Math.round(imageElement.naturalWidth * scale));
  const h = Math.max(1, Math.round(imageElement.naturalHeight * scale));

  const srcCanvas = document.createElement("canvas");
  srcCanvas.width = w;
  srcCanvas.height = h;
  const sctx = srcCanvas.getContext("2d")!;
  sctx.drawImage(imageElement, 0, 0, w, h);

  onProgress?.("Detecting subject…");
  const dataUrl = srcCanvas.toDataURL("image/png");
  const result = await segmenter(dataUrl);

  // background-removal pipeline returns RawImage[] (RGBA with alpha applied)
  const raw: RawImage = Array.isArray(result) ? result[0] : result;

  onProgress?.("Rendering transparent PNG…");
  const out = document.createElement("canvas");
  out.width = raw.width;
  out.height = raw.height;
  const octx = out.getContext("2d")!;

  // Convert RawImage data to ImageData
  let rgba: Uint8ClampedArray;
  if (raw.channels === 4) {
    rgba = new Uint8ClampedArray(raw.data);
  } else if (raw.channels === 3) {
    rgba = new Uint8ClampedArray(raw.width * raw.height * 4);
    for (let i = 0, j = 0; i < raw.data.length; i += 3, j += 4) {
      rgba[j] = raw.data[i];
      rgba[j + 1] = raw.data[i + 1];
      rgba[j + 2] = raw.data[i + 2];
      rgba[j + 3] = 255;
    }
  } else {
    // single-channel mask: composite onto original
    const mask = raw.data;
    sctx.drawImage(imageElement, 0, 0, raw.width, raw.height);
    const id = sctx.getImageData(0, 0, raw.width, raw.height);
    for (let i = 0; i < mask.length; i++) id.data[i * 4 + 3] = mask[i];
    out.width = raw.width;
    out.height = raw.height;
    out.getContext("2d")!.putImageData(id, 0, 0);
    return out.toDataURL("image/png");
  }

  octx.putImageData(new ImageData(rgba, raw.width, raw.height), 0, 0);
  return out.toDataURL("image/png");
}
