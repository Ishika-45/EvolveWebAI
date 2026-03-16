import React from "react";

const LiveWebsitePreview = ({ code }) => {
  if (!code) return null;

  // Wrap AI code inside a minimal React runtime page
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<script src="https://cdn.tailwindcss.com"></script>

<!-- React Runtime -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<title>AI Website Preview</title>

<style>
body{
margin:0;
font-family:sans-serif;
background:#f9fafb;
}
</style>

</head>

<body>

<div id="root"></div>

<script>

${code}

try {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(App));
} catch(err){
  document.body.innerHTML =
  "<div style='padding:40px;font-family:sans-serif'>" +
  "<h2>⚠️ AI Code Error</h2>" +
  "<pre>" + err + "</pre>" +
  "</div>";
}

</script>

</body>
</html>
`;

  return (
    <div className="mt-12 border border-gray-700 rounded-xl overflow-hidden">

      <div className="bg-gray-900 text-white px-4 py-2 text-sm">
        🌐 Live AI Website Preview
      </div>

      <iframe
        title="AI Website"
        sandbox="allow-scripts allow-same-origin"
        style={{
          width: "100%",
          height: "650px",
          border: "none"
        }}
        srcDoc={html}
      />

    </div>
  );
};

export default LiveWebsitePreview;