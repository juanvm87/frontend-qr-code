import React from "react";
import { Canvg } from "canvg";
import jsPDF from "jspdf";

export const handleDownload = (downloadType, qrCodeSvgElement) => {
  if (downloadType === "pdf") {
    const pdf = new jsPDF();
    const width = qrCodeSvgElement.offsetWidth;
    const height = qrCodeSvgElement.offsetHeight;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    Canvg.from(context, qrCodeSvgElement.outerHTML).then((canvg) => {
      canvg.start();
      const svgData = canvas.toDataURL("image/svg+xml");
      pdf.addImage(svgData, "SVG", 10, 10, width, height);
      pdf.save("qrcode.pdf");
    });
  } else if (downloadType === "png") {
    // Handle PNG download
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const width = qrCodeSvgElement.offsetWidth;
    const height = qrCodeSvgElement.offsetHeight;
    console.log("Width:", width);
    console.log("Height:", height);

    canvas.width = width;
    canvas.height = height;

    Canvg.from(context, qrCodeSvgElement.outerHTML).then((canvg) => {
      canvg.start();
      const pngData = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngData;
      a.download = "qrcode.png";
      a.click();
    });
  } else if (downloadType === "svg") {
    // Handle SVG download
    const svgData = new XMLSerializer().serializeToString(qrCodeSvgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  }
};
