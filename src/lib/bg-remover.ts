import { pipeline, env, type PreTrainedModel, type Processor } from "@huggingface/transformers";

env.allowLocalModels = false;
env.useBrowserCache = true;

type Segmenter = {
  model: PreTrainedModel;
  processor: Processor;
  (image: HTMLCanvasElement | string): Promise<unknown>;
};

let segmenterPromise: Promise<Segmenter> | null = null;

async function getSegmenter() {
  if (!segmenterPromise) {
    segmenterPromise = pipeline("background-removal", "briaai/RMBG-1.4", {
      device: "webgpu",
    }).catch(() =>
      pipeline("background-removal", "briaai/RMBG-1.4")
    ) as Promise<Segmenter>;
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
  const scale = Math.min(1, MAX / Math.max(imageElement.naturalWidth, imageElement.naturalHeight));
  const w = Math.round(imageElement.naturalWidth * scale);
  const h = Math.round(imageElement.naturalHeight * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(imageElement, 0, 0, w, h);

  onProgress?.("Detecting subject…");
  const result = (await segmenter(canvas)) as Array<{ mask: { data: Uint8Array; width: number; height: number } }> | { mask: { data: Uint8Array; width: number; height: number } };

  const mask = Array.isArray(result) ? result[0].mask : result.mask;

  onProgress?.("Applying transparency…");
  const imageData = ctx.getImageData(0, 0, w, h);
  for (let i = 0; i < mask.data.length; i++) {
    imageData.data[i * 4 + 3] = mask.data[i];
  }
  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL("image/png");
}
