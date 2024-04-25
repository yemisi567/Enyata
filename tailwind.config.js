module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#031434",
        borderlight: "#A4A7B7",
        borderdark: "#E5E5E5",
        blue: "#0A74DC",
        darkgray: "#303B54",
        green: "#00992B",
        textgray: "#434854",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      fontSize: {
        xs: [
          "1rem",
          {
            letterSpacing: "0.024rem",
          },
        ],
        smm: [
          "1.2rem",
          {
            letterSpacing: "0.024rem",
            lineHeight: "2.4rem",
          },
        ],
        sm: [
          "1.4rem",
          {
            letterSpacing: "0.028rem",
            lineHeight: "2rem",
          },
        ],
        base: [
          "1.6rem",
          {
            letterSpacing: "0.032rem",
          },
        ],
        xl: "2rem",
        xxl: "4.8rem",
      },
      borderRadius: {
        r4: "4px",
        r5: "5px",
        r6: "6px",
        r8: "8px",
      },
      boxShadow: {
        tableshadow:
          "0px 0px 30px 0px rgba(13, 47, 161, 0.07), 0px 0px 0px 0px rgba(0, 0, 0, 0.06)",
      },
      padding: {
        4: "4px",
        8: "8px",
        10: "10px",
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        28: "28px",
        32: "32px",
        36: "36px",
        40: "40px",
        44: "44px",
        48: "48px",
      },
      margin: {
        4: "0.4rem",
        8: "0.8rem",
        10: "1rem",
        12: "1.2rem",
        16: "1.6rem",
        20: "2rem",
        24: "2.4rem",
        28: "2.8rem",
        32: "3.2rem",
        36: "3.6rem",
        40: "4rem",
        44: "4.4rem",
        48: "4.8rem",
      },
      gap: {
        4: "0.4rem",
        8: "0.8rem",
        10: "1rem",
        12: "1.2rem",
        16: "1.6rem",
        20: "2rem",
        24: "2.4rem",
        28: "2.8rem",
        32: "3.2rem",
        36: "3.6rem",
        40: "4rem",
        44: "4.4rem",
        48: "4.8rem",
      },
    },
  },
  variants: {},
};
