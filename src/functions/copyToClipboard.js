export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Text copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };
  