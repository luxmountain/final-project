import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFile = join(__dirname, "..", "UC-09-16_Activity_Diagrams.md");
const outputDir = join(__dirname, "output");

mkdirSync(outputDir, { recursive: true });

const content = readFileSync(inputFile, "utf-8");
const sections = content.split(/^## /m).filter(Boolean);

// Config cho output đẹp hơn khi in docs
const CONFIG = {
  width: 4096,       // width lớn hơn → ảnh nét hơn khi scale down trong docs
  scale: 3,          // scale factor cao → text rõ ràng
  backgroundColor: "white",
  theme: "default",  // default theme dễ đọc hơn neutral
};

let count = 0;
for (const section of sections) {
  const mermaidMatch = section.match(/```mermaid\n([\s\S]*?)```/);
  if (!mermaidMatch) continue;

  const ucMatch = section.match(/UC-(\d+)/);
  if (!ucMatch) continue;

  const ucNum = ucMatch[1];
  const headerLine = section.split('\n')[0];
  const isSequence = headerLine.toLowerCase().includes("sequence");
  const type = isSequence ? "sequence" : "activity";
  const ucId = `UC-${ucNum}`;

  const mermaidCode = mermaidMatch[1].trim();
  const mmdFile = join(outputDir, `${ucId}_${type}.mmd`);
  const pngFile = join(outputDir, `${ucId}_${type}.png`);

  writeFileSync(mmdFile, mermaidCode);
  count++;
  console.log(`[${count}] Rendering ${ucId} (${type})...`);

  try {
    execSync(
      `npx mmdc -i "${mmdFile}" -o "${pngFile}" -t ${CONFIG.theme} -b ${CONFIG.backgroundColor} -w ${CONFIG.width} -s ${CONFIG.scale}`,
      { cwd: __dirname, stdio: "inherit" }
    );
    console.log(`  ✓ ${ucId}_${type}.png`);
  } catch (e) {
    console.error(`  ✗ Failed: ${ucId}_${type}`);
  }
}

console.log(`\nDone! ${count} diagrams rendered to: ${outputDir}`);
console.log(`\nTip: Ảnh xuất ra ${CONFIG.width}px width, scale ${CONFIG.scale}x → rõ nét khi chèn vào Google Docs/Word.`);
