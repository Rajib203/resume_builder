// src/utils/colors.js
export const fixTailwindColors = (element) => {
  if (!element) return null;
  const clone = element.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.top = '-9999px';
  clone.style.left = '0px';
  const width = element.offsetWidth || 800;
  clone.style.width = `${width}px`;
  document.body.appendChild(clone);

  const allElements = [clone, ...clone.querySelectorAll('*')];
  allElements.forEach(el => {
    const computed = window.getComputedStyle(el);
    if (computed.backgroundColor && computed.backgroundColor.includes('oklch')) {
      el.style.backgroundColor = '#ffffff';
    }
    if (computed.color && computed.color.includes('oklch')) {
      el.style.color = '#1e293b';
    }
    if (computed.borderColor && computed.borderColor.includes('oklch')) {
      el.style.borderColor = '#cbd5e1';
    }
  });

  return clone;
};