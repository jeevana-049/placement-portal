export const themes = {
  home: {
    bg: "linear-gradient(135deg,#f8fafc,#e2e8f0)",
    glow: "rgba(0,0,0,0.1)"
  },
  study: {
    bg: "linear-gradient(135deg,#f1f5f9,#e2e8f0)",
    glow: "rgba(0,0,0,0.08)"
  },
  upload: {
    bg: "linear-gradient(135deg,#fdf2f8,#f8fafc)",
    glow: "rgba(0,0,0,0.08)"
  },
  admin: {
    bg: "linear-gradient(135deg,#f1f5f9,#cbd5f5)",
    glow: "rgba(0,0,0,0.12)"
  },
  dashboard: {
    bg: "linear-gradient(135deg,#f8fafc,#e2e8f0)",
    glow: "rgba(0,0,0,0.1)"
  }
};

export const cardStyle = (glow) => ({
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  margin: "20px auto",
  width: "60%",
  color: "#1e293b",
  boxShadow: `0 4px 12px ${glow}`
});