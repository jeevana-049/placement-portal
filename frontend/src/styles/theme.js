export const themes = {
  home: {
    bg: "linear-gradient(135deg,#1e3c72,#2a5298)",
    glow: "#00c6ff"
  },
  study: {
    bg: "linear-gradient(135deg,#134e5e,#71b280)",
    glow: "#00ff9f"
  },
  upload: {
    bg: "linear-gradient(135deg,#42275a,#734b6d)",
    glow: "#ff00ff"
  },
  admin: {
    bg: "linear-gradient(135deg,#000000,#434343)",
    glow: "#ff4d4d"
  },
  dashboard: {
    bg: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    glow: "#00ffff"
  }
};
export const cardStyle = (glow) => ({
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "15px",
  padding: "20px",
  margin: "20px auto",
  width: "60%",
  color: "white",
  boxShadow: `0 0 20px ${glow}`
});